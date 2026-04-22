import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { ChevronDown, Hand, KeyRound, ReceiptText, Wallet, X } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import { AdminSuccessModal } from '../components/AdminSuccessModal'
import { adminInput, adminLabelCaps, adminModalBackdrop } from '../lib/adminUi'
import {
  CURRENCY_OPTIONS,
  FREQUENCY_OPTIONS,
  PASSWORD_RESET_DEFAULT,
  PAYMENT_CONFIRM_DEFAULT,
  WELCOME_DEFAULT,
} from '../data/adminSettingsDefaults'

const FIGMA_BRONZE = '#A89677'
const FIGMA_BRONZE_HOVER = '#978566'

/** `overflow-visible` so custom dropdowns are not clipped; elevate card `z-index` while menu open so later cards do not paint over the menu. */
const FIGMA_SHELL =
  'w-full min-w-0 overflow-visible rounded-2xl border border-[#E6E2DB] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)]'

type TemplateKey = 'welcome' | 'password' | 'payment'

type Template = { subject: string; body: string }

type SettingsDraft = {
  emailMaster: boolean
  smsMaster: boolean
  welcome: Template
  passwordReset: Template
  paymentConfirm: Template
  priceDrop: boolean
  listingExpiry: boolean
  showingReminders: boolean
  frequency: (typeof FREQUENCY_OPTIONS)[number] | ''
  enableOnlinePayments: boolean
  currency: (typeof CURRENCY_OPTIONS)[number]
  taxPercent: string
  autoRefunds: boolean
}

function defaultDraft(): SettingsDraft {
  return {
    emailMaster: true,
    smsMaster: false,
    welcome: { ...WELCOME_DEFAULT },
    passwordReset: { ...PASSWORD_RESET_DEFAULT },
    paymentConfirm: { ...PAYMENT_CONFIRM_DEFAULT },
    priceDrop: true,
    listingExpiry: true,
    showingReminders: false,
    frequency: 'Instant',
    enableOnlinePayments: true,
    currency: 'USD ($)',
    taxPercent: '15.00',
    autoRefunds: true,
  }
}

function Toggle({
  checked,
  onChange,
  large,
  lightKnob,
  disabled,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  large?: boolean
  /** White knob on semi-transparent track (payment bronze bar) */
  lightKnob?: boolean
  disabled?: boolean
}) {
  const h = large ? 'h-8 w-[3.25rem]' : 'h-7 w-12'
  const knob = large ? 'h-7 w-7 top-0.5' : 'h-6 w-6 top-0.5'
  const onPos = large ? 'left-6' : 'left-5'
  const trackOff = lightKnob ? 'bg-white/20' : 'bg-[#D1D5DB]'
  const trackOn = lightKnob ? 'bg-white/30' : ''
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative shrink-0 rounded-full transition-colors ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${h} ${
        checked ? (lightKnob ? trackOn : '') : trackOff
      }`}
      style={checked && !lightKnob ? { backgroundColor: FIGMA_BRONZE } : undefined}
    >
      <span className={`absolute rounded-full bg-white shadow transition-transform ${knob} ${checked ? onPos : 'left-0.5'}`} />
    </button>
  )
}

function insertAtCursor(
  el: HTMLTextAreaElement | null,
  snippet: string,
  text: string,
  setText: (s: string) => void,
) {
  if (!el) {
    setText(text + snippet)
    return
  }
  const start = el.selectionStart ?? text.length
  const end = el.selectionEnd ?? text.length
  const next = text.slice(0, start) + snippet + text.slice(end)
  setText(next)
  requestAnimationFrame(() => {
    el.focus()
    const pos = start + snippet.length
    el.setSelectionRange(pos, pos)
  })
}

export function Settings() {
  const [saved, setSaved] = useState<SettingsDraft>(() => defaultDraft())
  const [draft, setDraft] = useState<SettingsDraft>(() => defaultDraft())

  const [editModal, setEditModal] = useState<TemplateKey | null>(null)
  const [modalSubject, setModalSubject] = useState('')
  const [modalBody, setModalBody] = useState('')
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  const [freqOpen, setFreqOpen] = useState(false)
  const [currencyOpen, setCurrencyOpen] = useState(false)
  const freqRef = useRef<HTMLDivElement>(null)
  const currencyRef = useRef<HTMLDivElement>(null)

  const [successOpen, setSuccessOpen] = useState(false)

  const openModal = useCallback((key: TemplateKey) => {
    const t =
      key === 'welcome' ? draft.welcome : key === 'password' ? draft.passwordReset : draft.paymentConfirm
    setModalSubject(t.subject)
    setModalBody(t.body)
    setEditModal(key)
    setFreqOpen(false)
    setCurrencyOpen(false)
  }, [draft.welcome, draft.passwordReset, draft.paymentConfirm])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const n = e.target as Node
      if (freqRef.current && !freqRef.current.contains(n)) setFreqOpen(false)
      if (currencyRef.current && !currencyRef.current.contains(n)) setCurrencyOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const frequencyLabel = useMemo(() => {
    if (!draft.frequency) return 'Select option'
    return draft.frequency
  }, [draft.frequency])

  function saveModal() {
    if (!editModal) return
    setDraft((d) => {
      if (editModal === 'welcome') return { ...d, welcome: { subject: modalSubject, body: modalBody } }
      if (editModal === 'password') return { ...d, passwordReset: { subject: modalSubject, body: modalBody } }
      return { ...d, paymentConfirm: { subject: modalSubject, body: modalBody } }
    })
    setEditModal(null)
  }

  function discardPage() {
    setDraft(structuredClone(saved))
  }

  function savePage() {
    setSaved(structuredClone(draft))
    setSuccessOpen(true)
  }

  const tagPillsWelcome = ['{{client_name}}', '{{agent_name}}']
  const tagPillsPassword = ['{{user_name}}', '{{reset_link}}', '{{expiry_time}}', '{{support_email}}']
  const tagPillsPayment = ['{{client_name}}', '{{transaction_amount}}', '{{property_address}}']

  return (
    <AdminLayout title="Settings">
      <div className="relative z-0 mx-auto w-full space-y-6 pb-8">
        {/* Global Notifications */}
        <div className={`${FIGMA_SHELL} relative z-0`}>
          <div className="flex flex-col gap-4 border-b border-[#ECEAE6] p-5 sm:flex-row sm:items-start sm:justify-between">
            <div>
              <h2 className="text-[18px] font-bold text-[#111827]">Global Notifications</h2>
              <p className="mt-1 max-w-xl text-[13px] leading-relaxed text-[#6B7280]">
                Configure how you and your team receive system updates.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-6 sm:justify-end">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6B7280]">Email</span>
                <Toggle checked={draft.emailMaster} onChange={(v) => setDraft((d) => ({ ...d, emailMaster: v }))} />
              </div>
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-bold uppercase tracking-[0.1em] text-[#6B7280]">SMS</span>
                <Toggle checked={draft.smsMaster} onChange={(v) => setDraft((d) => ({ ...d, smsMaster: v }))} />
              </div>
            </div>
          </div>
          <div className="divide-y divide-[#F3F4F6]">
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#6B7280]">
                  <Hand className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#111827]">Welcome Message</p>
                  <p className="mt-0.5 text-[13px] text-[#6B7280]">Sent to new clients upon account activation.</p>
                </div>
              </div>
              <button
                type="button"
                className="shrink-0 self-start text-[13px] font-semibold sm:self-center"
                style={{ color: FIGMA_BRONZE }}
                onClick={() => openModal('welcome')}
              >
                Edit
              </button>
            </div>
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#6B7280]">
                  <KeyRound className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#111827]">Password Reset</p>
                  <p className="mt-0.5 text-[13px] text-[#6B7280]">System-generated security verification links.</p>
                </div>
              </div>
              <button
                type="button"
                className="shrink-0 self-start text-[13px] font-semibold sm:self-center"
                style={{ color: FIGMA_BRONZE }}
                onClick={() => openModal('password')}
              >
                Edit
              </button>
            </div>
            <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#F3F4F6] text-[#6B7280]">
                  <ReceiptText className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-[15px] font-semibold text-[#111827]">Payment Confirmation</p>
                  <p className="mt-0.5 text-[13px] text-[#6B7280]">Transaction receipts for listing renewals.</p>
                </div>
              </div>
              <button
                type="button"
                className="shrink-0 self-start text-[13px] font-semibold sm:self-center"
                style={{ color: FIGMA_BRONZE }}
                onClick={() => openModal('payment')}
              >
                Edit
              </button>
            </div>
          </div>
        </div>

        {/* Activity Alerts */}
        <div className={FIGMA_SHELL}>
          <div className="border-b border-[#ECEAE6] p-5">
            <h2 className="text-[18px] font-bold text-[#111827]">Activity Alerts</h2>
            <p className="mt-1 text-[13px] text-[#6B7280]">Monitor market shifts and listing performance.</p>
          </div>
          <div className="flex flex-col gap-6 p-5 lg:flex-row lg:items-stretch">
            <div className="min-w-0 flex-1 space-y-0 divide-y divide-[#F3F4F6]">
              <div className="flex items-center justify-between gap-4 py-4 first:pt-0">
                <span className="text-[14px] font-medium text-[#374151]">Price Drop Alerts</span>
                <Toggle checked={draft.priceDrop} onChange={(v) => setDraft((d) => ({ ...d, priceDrop: v }))} />
              </div>
              <div className="flex items-center justify-between gap-4 py-4">
                <span className="text-[14px] font-medium text-[#374151]">Listing Expiry</span>
                <Toggle checked={draft.listingExpiry} onChange={(v) => setDraft((d) => ({ ...d, listingExpiry: v }))} />
              </div>
              <div className="flex items-center justify-between gap-4 py-4 last:pb-0">
                <span className="text-[14px] font-medium text-[#374151]">Showing Reminders</span>
                <Toggle
                  checked={draft.showingReminders}
                  onChange={(v) => setDraft((d) => ({ ...d, showingReminders: v }))}
                />
              </div>
            </div>
            <div className="flex shrink-0 flex-col justify-center border-t border-[#F3F4F6] pt-4 lg:w-56 lg:border-l lg:border-t-0 lg:pl-6 lg:pt-0">
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">Notification frequency</p>
              <div className="relative mt-2" ref={freqRef}>
                <button
                  type="button"
                  onClick={() => {
                    setFreqOpen((o) => !o)
                    setCurrencyOpen(false)
                  }}
                  className="flex h-11 w-full min-w-[200px] items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-left text-[13px] font-medium text-[#111827] hover:bg-white"
                >
                  {frequencyLabel}
                  <ChevronDown className={`h-4 w-4 shrink-0 text-[#9CA3AF] transition ${freqOpen ? 'rotate-180' : ''}`} />
                </button>
                {freqOpen ? (
                  <div className="absolute left-0 right-0 top-full z-[110] mt-1 max-h-56 overflow-auto rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-xl ring-1 ring-black/5">
                    <button
                      type="button"
                      className="block w-full px-3 py-2 text-left text-[13px] text-[#9CA3AF] hover:bg-[#F9FAFB]"
                      onClick={() => {
                        setDraft((d) => ({ ...d, frequency: '' }))
                        setFreqOpen(false)
                      }}
                    >
                      Select option
                    </button>
                    {FREQUENCY_OPTIONS.map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                        onClick={() => {
                          setDraft((d) => ({ ...d, frequency: opt }))
                          setFreqOpen(false)
                        }}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </div>

        {/* Payment Gateway */}
        <div className={`${FIGMA_SHELL} relative ${currencyOpen ? 'z-[100]' : 'z-0'}`}>
          <div className="border-b border-[#ECEAE6] p-5">
            <h2 className="text-[18px] font-bold text-[#111827]">Payment Gateway</h2>
            <p className="mt-1 text-[13px] text-[#6B7280]">Manage billing, taxation, and regional settings.</p>
          </div>
          <div className="p-5">
            <div
              className="flex items-center justify-between gap-4 rounded-xl px-4 py-4 text-white sm:px-5 sm:py-5"
              style={{ backgroundColor: FIGMA_BRONZE }}
            >
              <div className="flex min-w-0 items-center gap-3">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-white/20">
                  <Wallet className="h-5 w-5" />
                </div>
                <p className="text-[15px] font-semibold">Enable Online Payments</p>
              </div>
              <Toggle
                checked={draft.enableOnlinePayments}
                onChange={(v) => setDraft((d) => ({ ...d, enableOnlinePayments: v }))}
                large
                lightKnob
              />
            </div>

            <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:items-end">
              <div className="sm:col-span-1">
                <label className={adminLabelCaps}>Currency</label>
                <div className="relative" ref={currencyRef}>
                  <button
                    type="button"
                    disabled={!draft.enableOnlinePayments}
                    onClick={() => {
                      if (!draft.enableOnlinePayments) return
                      setCurrencyOpen((o) => !o)
                      setFreqOpen(false)
                    }}
                    className="flex h-11 w-full items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-left text-[13px] font-medium text-[#111827] hover:bg-white disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {draft.currency}
                    <ChevronDown className={`h-4 w-4 shrink-0 text-[#9CA3AF] ${currencyOpen ? 'rotate-180' : ''}`} />
                  </button>
                  {currencyOpen && draft.enableOnlinePayments ? (
                    <div className="absolute left-0 right-0 top-full z-[110] mt-1 max-h-60 overflow-auto rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-xl ring-1 ring-black/5">
                      <button
                        type="button"
                        className="block w-full px-3 py-2 text-left text-[13px] text-[#9CA3AF] hover:bg-[#F9FAFB]"
                        onClick={() => setCurrencyOpen(false)}
                      >
                        Select option
                      </button>
                      {CURRENCY_OPTIONS.map((c) => (
                        <button
                          key={c}
                          type="button"
                          className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                          onClick={() => {
                            setDraft((d) => ({ ...d, currency: c }))
                            setCurrencyOpen(false)
                          }}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              <div>
                <label className={adminLabelCaps} htmlFor="tax-pct">
                  Tax (%)
                </label>
                <input
                  id="tax-pct"
                  type="text"
                  inputMode="decimal"
                  disabled={!draft.enableOnlinePayments}
                  className={adminInput}
                  value={draft.taxPercent}
                  onChange={(e) => setDraft((d) => ({ ...d, taxPercent: e.target.value }))}
                />
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-[#ECEAE6] bg-[#FAFAF9] px-4 py-3 sm:col-span-2 lg:col-span-1">
                <span className="text-[14px] font-medium text-[#374151]">Automatic Refunds</span>
                <Toggle
                  checked={draft.autoRefunds}
                  onChange={(v) => setDraft((d) => ({ ...d, autoRefunds: v }))}
                  disabled={!draft.enableOnlinePayments}
                />
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-0 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={discardPage}
            className="rounded-lg border border-[#D1D5DB] bg-white px-5 py-2.5 text-[13px] font-semibold text-[#6B7280] transition hover:bg-[#F9FAFB]"
          >
            Discard Changes
          </button>
          <button
            type="button"
            onClick={savePage}
            className="rounded-lg px-6 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors"
            style={{ backgroundColor: FIGMA_BRONZE }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = FIGMA_BRONZE
            }}
          >
            Save System Config
          </button>
        </div>
      </div>

      {/* Edit template modals */}
      {editModal === 'welcome' ? (
        <div className={adminModalBackdrop} onClick={() => setEditModal(null)} role="presentation">
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-welcome-title"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 id="edit-welcome-title" className="text-[20px] font-bold text-[#111827]">
                  Edit Welcome Message
                </h2>
                <p className="mt-1 text-[13px] text-[#6B7280]">
                  Configure the automated response for new client registrations.
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg p-1 text-[#6B7280] hover:bg-[#F3F4F6]"
                onClick={() => setEditModal(null)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div>
              <label className={adminLabelCaps} htmlFor="wm-subject">
                Subject
              </label>
              <input id="wm-subject" className={adminInput} value={modalSubject} onChange={(e) => setModalSubject(e.target.value)} />
            </div>
            <div className="mt-4">
              <label className={adminLabelCaps} htmlFor="wm-body">
                Message body
              </label>
              <textarea
                id="wm-body"
                ref={bodyRef}
                rows={12}
                className={`${adminInput} min-h-[200px] resize-y font-mono text-[13px] leading-relaxed`}
                value={modalBody}
                onChange={(e) => setModalBody(e.target.value)}
              />
              <p className="mt-2 text-[12px] italic text-[#9CA3AF]">
                Use dynamic tags like {'{{client_name}}'} or {'{{agent_name}}'} for personalization.
              </p>
            </div>
            <div className="mt-4">
              <p className={adminLabelCaps}>Available dynamic tags</p>
              <div className="flex flex-wrap gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3">
                {tagPillsWelcome.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[12px] font-medium text-[#6B7280] hover:border-[#D1D5DB]"
                    onClick={() => insertAtCursor(bodyRef.current, tag, modalBody, setModalBody)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button type="button" className="text-[13px] font-semibold text-[#6B7280]" onClick={() => setEditModal(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onClick={saveModal}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {editModal === 'password' ? (
        <div className={adminModalBackdrop} onClick={() => setEditModal(null)} role="presentation">
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-2 flex items-start justify-between gap-4">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9CA3AF]">Templates / Notification</p>
                <h2 className="mt-2 text-[20px] font-bold text-[#111827]">Edit Password Reset</h2>
              </div>
              <button
                type="button"
                className="rounded-lg p-1 text-[#6B7280] hover:bg-[#F3F4F6]"
                onClick={() => setEditModal(null)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4">
              <div className="mb-1 flex flex-wrap items-end justify-between gap-2">
                <label className={`${adminLabelCaps} mb-0`} htmlFor="pr-subject">
                  Email subject
                </label>
              </div>
              <input id="pr-subject" className={adminInput} value={modalSubject} onChange={(e) => setModalSubject(e.target.value)} />
            </div>
            <div className="mt-4">
              <div className="mb-1 flex flex-wrap items-end justify-between gap-2">
                <label className={`${adminLabelCaps} mb-0`} htmlFor="pr-body">
                  Message content
                </label>
                <span className="text-[11px] text-[#9CA3AF]">Supports Markdown &amp; HTML</span>
              </div>
              <textarea
                id="pr-body"
                ref={bodyRef}
                rows={12}
                className={`${adminInput} min-h-[200px] resize-y font-mono text-[13px] leading-relaxed`}
                value={modalBody}
                onChange={(e) => setModalBody(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <p className={adminLabelCaps}>Available dynamic tags</p>
              <div className="flex flex-wrap gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3">
                {tagPillsPassword.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 text-[12px] font-medium text-[#6B7280] hover:border-[#D1D5DB]"
                    onClick={() => insertAtCursor(bodyRef.current, tag, modalBody, setModalBody)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                className="text-[12px] font-bold uppercase tracking-wide text-[#6B7280]"
                onClick={() => setEditModal(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg px-5 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onClick={saveModal}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {editModal === 'payment' ? (
        <div className={adminModalBackdrop} onClick={() => setEditModal(null)} role="presentation">
          <div
            className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-[20px] font-bold text-[#111827]">Edit Template</h2>
                <p className="mt-1 text-[13px] text-[#6B7280]">Notification: Payment Confirmation</p>
              </div>
              <button
                type="button"
                className="rounded-lg p-1 text-[#6B7280] hover:bg-[#F3F4F6]"
                onClick={() => setEditModal(null)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div>
              <label className={adminLabelCaps} htmlFor="pay-subject">
                Subject
              </label>
              <input id="pay-subject" className={adminInput} value={modalSubject} onChange={(e) => setModalSubject(e.target.value)} />
            </div>
            <div className="mt-4">
              <label className={adminLabelCaps} htmlFor="pay-body">
                Message content
              </label>
              <textarea
                id="pay-body"
                ref={bodyRef}
                rows={10}
                className={`${adminInput} min-h-[180px] resize-y font-mono text-[13px] leading-relaxed`}
                value={modalBody}
                onChange={(e) => setModalBody(e.target.value)}
              />
            </div>
            <div className="mt-4">
              <p className={adminLabelCaps}>Available dynamic tags</p>
              <div className="flex flex-wrap gap-2 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-3">
                {tagPillsPayment.map((tag) => (
                  <button
                    key={tag}
                    type="button"
                    className="rounded-full border border-[#E5E7EB] bg-white px-3 py-1 font-mono text-[11px] font-medium text-[#6B7280] hover:border-[#D1D5DB]"
                    onClick={() => insertAtCursor(bodyRef.current, tag, modalBody, setModalBody)}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button type="button" className="text-[13px] font-semibold text-[#6B7280]" onClick={() => setEditModal(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onClick={saveModal}
              >
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <AdminSuccessModal
        open={successOpen}
        title="Successfully"
        subtitle="Setting Successfully saved"
        variant="prominent"
        hideButton
        autoCloseMs={2200}
        onClose={() => setSuccessOpen(false)}
      />
    </AdminLayout>
  )
}
