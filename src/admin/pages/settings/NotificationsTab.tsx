import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Bell,
  ChevronDown,
  Filter,
  Mail,
  MessageSquare,
  Pencil,
  Plus,
  Search,
  Smartphone,
  Trash2,
  X,
} from 'lucide-react'
import { adminInput, adminLabelCaps, adminModalBackdrop } from '../../lib/adminUi'
import {
  FREQUENCY_OPTIONS,
  LISTING_APPROVED_DEFAULT,
  PASSWORD_RESET_DEFAULT,
  PAYMENT_CONFIRM_DEFAULT,
  WELCOME_DEFAULT,
} from '../../data/adminSettingsDefaults'
import {
  INITIAL_NOTIF_TEMPLATES,
  TRIGGER_EVENT_OPTIONS,
  type NotifTemplateRow,
} from '../../data/settingsPageMock'
import { FIGMA_BRONZE, FIGMA_SHELL } from './theme'
import { SettingsToggle } from './Toggle'

type Props = { onSave: () => void }

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

type EditorMode =
  | { type: 'create' }
  | { type: 'edit'; id: string; kind: NotifTemplateRow['kind'] }

export function NotificationsTab({ onSave: onSaveProp }: Props) {
  const [emailOn, setEmailOn] = useState(true)
  const [smsOn, setSmsOn] = useState(false)
  const [pushOn, setPushOn] = useState(true)
  const [rows, setRows] = useState<NotifTemplateRow[]>(() => [...INITIAL_NOTIF_TEMPLATES])
  const [templateQ, setTemplateQ] = useState('')

  const [priceDrop, setPriceDrop] = useState(true)
  const [listingExpiry, setListingExpiry] = useState(true)
  const [showingRem, setShowingRem] = useState(false)
  const [frequency, setFrequency] = useState<(typeof FREQUENCY_OPTIONS)[number] | ''>('Instant')
  const [freqOpen, setFreqOpen] = useState(false)
  const freqRef = useRef<HTMLDivElement>(null)

  const [editor, setEditor] = useState<EditorMode | null>(null)
  const [subj, setSubj] = useState('')
  const [body, setBody] = useState('')
  const [tActive, setTActive] = useState(true)
  const [createName, setCreateName] = useState('')
  const [createTrigger, setCreateTrigger] = useState<(typeof TRIGGER_EVENT_OPTIONS)[number]>(TRIGGER_EVENT_OPTIONS[0]!)
  const [createBodyView, setCreateBodyView] = useState<'email' | 'sms'>('email')
  const bodyRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (freqRef.current && !freqRef.current.contains(e.target as Node)) setFreqOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const filteredRows = useMemo(() => {
    const q = templateQ.trim().toLowerCase()
    if (!q) return rows
    return rows.filter((r) => r.name.toLowerCase().includes(q) || r.trigger.toLowerCase().includes(q))
  }, [rows, templateQ])

  const openEdit = useCallback(
    (row: NotifTemplateRow) => {
      if (row.kind === 'welcome') {
        setSubj(WELCOME_DEFAULT.subject)
        setBody(WELCOME_DEFAULT.body)
      } else if (row.kind === 'password') {
        setSubj(PASSWORD_RESET_DEFAULT.subject)
        setBody(PASSWORD_RESET_DEFAULT.body)
      } else if (row.kind === 'listing') {
        setSubj(LISTING_APPROVED_DEFAULT.subject)
        setBody(LISTING_APPROVED_DEFAULT.body)
      } else if (row.kind === 'payment') {
        setSubj(PAYMENT_CONFIRM_DEFAULT.subject)
        setBody(PAYMENT_CONFIRM_DEFAULT.body)
      } else {
        setSubj('Maintenance notice')
        setBody('')
      }
      setTActive(row.status === 'ACTIVE')
      setEditor({ type: 'edit', id: row.id, kind: row.kind })
    },
    [],
  )

  function openCreate() {
    setCreateName('')
    setCreateTrigger(TRIGGER_EVENT_OPTIONS[0]!)
    setSubj('')
    setBody('')
    setTActive(false)
    setCreateBodyView('email')
    setEditor({ type: 'create' })
  }

  function closeEditor() {
    setEditor(null)
  }

  function saveEditor() {
    if (editor?.type === 'create') {
      setRows((r) => [
        ...r,
        {
          id: `t${Date.now()}`,
          name: createName.trim() || 'New template',
          icon: Mail,
          trigger: createTrigger,
          status: tActive ? 'ACTIVE' : 'DRAFTING',
          kind: 'other',
        },
      ])
    } else if (editor?.type === 'edit') {
      setRows((r) => r.map((x) => (x.id === editor.id ? { ...x, status: tActive ? 'ACTIVE' : 'DRAFTING' } : x)))
    }
    onSaveProp()
    closeEditor()
  }

  function deleteRow(id: string) {
    setRows((r) => r.filter((x) => x.id !== id))
    onSaveProp()
  }

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-[18px] font-bold text-[#111827]">Delivery channels</h2>
        <p className="mt-1 text-[13px] text-[#6B7280]">Configure how administrators and clients receive system updates.</p>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          {[
            { id: 'em', label: 'Email', desc: 'Daily digests, receipts, and long-form communication.', on: emailOn, set: setEmailOn, Icon: Mail },
            { id: 'sm', label: 'SMS', desc: 'Short alerts and listing approvals to mobile numbers.', on: smsOn, set: setSmsOn, Icon: MessageSquare },
            { id: 'pu', label: 'Push notifications', desc: 'Real-time in-browser and device alerts.', on: pushOn, set: setPushOn, Icon: Bell },
          ].map((c) => (
            <div key={c.id} className="rounded-2xl border border-[#E6E2DB] bg-white p-4 shadow-sm">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#6B7280]">
                <c.Icon className="h-5 w-5" />
              </div>
              <p className="mt-2 text-[15px] font-bold text-[#111827]">{c.label}</p>
              <p className="mt-1 min-h-[40px] text-[12px] text-[#6B7280]">{c.desc}</p>
              <div className="mt-3 flex justify-end">
                <SettingsToggle checked={c.on} onChange={c.set} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <div className="mb-3 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-[18px] font-bold text-[#111827]">System templates</h2>
            <p className="text-[13px] text-[#6B7280]">Customize the messaging for automated platform events.</p>
          </div>
          <button
            type="button"
            onClick={openCreate}
            className="inline-flex items-center gap-2 self-start rounded-lg px-4 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white"
            style={{ backgroundColor: FIGMA_BRONZE }}
          >
            <Plus className="h-4 w-4" /> Create template
          </button>
        </div>

        <div className={FIGMA_SHELL + ' p-0'}>
          <div className="flex flex-wrap items-center justify-end gap-2 border-b border-[#ECEAE6] p-3">
            <div className="relative w-full min-w-0 sm:max-w-xs sm:flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                className={adminInput + ' pl-9'}
                placeholder="Search templates…"
                value={templateQ}
                onChange={(e) => setTemplateQ(e.target.value)}
              />
            </div>
            <button type="button" className="rounded-lg border border-[#E5E7EB] p-2.5 text-[#6B7280]">
              <Filter className="h-4 w-4" />
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-[800px] w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#ECEAE6] bg-[#FAFAF9] text-[10px] font-bold uppercase tracking-wide text-[#9CA3AF]">
                  <th className="px-4 py-3">Template name</th>
                  <th className="px-4 py-3">Trigger event</th>
                  <th className="px-4 py-3">Status</th>
                  <th className="px-4 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredRows.map((r) => {
                  const Ic = r.icon
                  return (
                    <tr key={r.id} className="border-b border-[#F3F4F6]">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <Ic className="h-4 w-4 text-[#6B7280]" />
                          <span className="font-medium text-[#111827]">{r.name}</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-[#6B7280]">{r.trigger}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`rounded-md px-2.5 py-0.5 text-[11px] font-bold ${
                            r.status === 'ACTIVE' ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#FFEDD5] text-[#9A3412]'
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <div className="inline-flex justify-end gap-1">
                          <button type="button" className="rounded p-1.5 text-[#6B7280] hover:bg-[#F3F4F6]" onClick={() => openEdit(r)}>
                            <Pencil className="h-4 w-4" />
                          </button>
                          <button
                            type="button"
                            className="rounded p-1.5 text-red-500 hover:bg-red-50"
                            onClick={() => deleteRow(r.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <div
        className={`${FIGMA_SHELL} relative ${freqOpen ? 'z-[100]' : 'z-0'} p-0`}
      >
        <div className="p-4 sm:p-5">
          <h2 className="text-[18px] font-bold text-[#111827]">Activity alerts</h2>
          <p className="mt-1 text-[13px] text-[#6B7280]">Monitor market shifts and listing performance.</p>
        </div>
        <div className="flex flex-col gap-4 border-t border-[#ECEAE6] p-4 sm:p-5 lg:flex-row">
          <div className="min-w-0 flex-1 space-y-0 divide-y divide-[#F3F4F6]">
            {[
              ['Price drop alerts', priceDrop, setPriceDrop] as const,
              ['Listing expiry', listingExpiry, setListingExpiry] as const,
              ['Showing reminders', showingRem, setShowingRem] as const,
            ].map(([label, on, set]) => (
              <div key={label} className="flex items-center justify-between gap-3 py-3 first:pt-0 last:pb-0">
                <span className="text-[14px] text-[#374151]">{label}</span>
                <SettingsToggle checked={on} onChange={set} />
              </div>
            ))}
          </div>
          <div className="w-full shrink-0 border-t border-[#ECEAE6] pt-4 sm:w-56 sm:border-l sm:border-t-0 sm:pl-6 sm:pt-0">
            <p className="text-[10px] font-bold uppercase tracking-wide text-[#9CA3AF]">Notification frequency</p>
            <div className="relative mt-2" ref={freqRef}>
              <button
                type="button"
                onClick={() => setFreqOpen((o) => !o)}
                className="flex h-10 w-full items-center justify-between rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] px-3 text-left text-[13px]"
              >
                {!frequency ? 'Select option' : frequency}
                <ChevronDown className={`h-4 w-4 text-[#9CA3AF] ${freqOpen ? 'rotate-180' : ''}`} />
              </button>
              {freqOpen ? (
                <div className="absolute left-0 right-0 top-full z-[110] mt-1 max-h-56 overflow-auto rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-xl">
                  {(['' as const, ...FREQUENCY_OPTIONS] as const).map((opt) => (
                    <button
                      key={String(opt)}
                      type="button"
                      className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                      onClick={() => {
                        setFrequency(opt)
                        setFreqOpen(false)
                      }}
                    >
                      {opt === '' ? 'Select option' : opt}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>
      </div>

      {editor ? (
        <div className={adminModalBackdrop} onClick={closeEditor} role="presentation">
          <div
            className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {editor.type === 'create' ? (
              <>
                <div className="mb-4 flex justify-between">
                  <div>
                    <h2 className="text-[20px] font-bold">Create new notification template</h2>
                    <p className="mt-1 text-[13px] text-[#6B7280]">Set up automated messaging protocols for platform events.</p>
                  </div>
                  <button type="button" onClick={closeEditor} className="p-1 text-[#6B7280]">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className={adminLabelCaps}>Template name</label>
                    <input className={adminInput} placeholder="e.g., Maintenance update" value={createName} onChange={(e) => setCreateName(e.target.value)} />
                  </div>
                  <div>
                    <label className={adminLabelCaps}>Trigger event</label>
                    <select className={adminInput} value={createTrigger} onChange={(e) => setCreateTrigger(e.target.value as typeof createTrigger)}>
                      {TRIGGER_EVENT_OPTIONS.map((t) => (
                        <option key={t} value={t}>
                          {t}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className={adminLabelCaps}>Message subject</label>
                    <input className={adminInput} value={subj} onChange={(e) => setSubj(e.target.value)} placeholder="Email or message header" />
                  </div>
                  <div>
                    <div className="mb-1 flex justify-between">
                      <span className={adminLabelCaps + ' mb-0'}>Message content</span>
                      <span className="text-[10px] font-bold text-[#9CA3AF]">INSERT VARIABLES</span>
                    </div>
                    <textarea
                      ref={bodyRef}
                      className={adminInput + ' min-h-[120px]'}
                      value={body}
                      onChange={(e) => setBody(e.target.value)}
                      placeholder="Draft the body of your message here…"
                    />
                    <div className="mt-2 flex gap-1">
                      <button
                        type="button"
                        onClick={() => setCreateBodyView('email')}
                        className={`rounded-md px-3 py-1 text-[12px] font-bold ${createBodyView === 'email' ? 'bg-[#374151] text-white' : 'border border-[#E5E7EB]'}`}
                      >
                        @ Email body
                      </button>
                      <button
                        type="button"
                        onClick={() => setCreateBodyView('sms')}
                        className={`inline-flex items-center gap-1 rounded-md px-3 py-1 text-[12px] font-bold ${
                          createBodyView === 'sms' ? 'bg-[#374151] text-white' : 'border border-[#E5E7EB]'
                        }`}
                      >
                        <Smartphone className="h-3.5 w-3.5" /> SMS preview
                      </button>
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#9CA3AF]">
                    <span>INACTIVE</span>
                    <SettingsToggle checked={tActive} onChange={setTActive} />
                    <span>ACTIVE</span>
                  </div>
                  <div className="flex justify-end gap-2">
                    <button type="button" className="px-2 text-[13px]" onClick={closeEditor}>
                      Cancel
                    </button>
                    <button type="button" className="rounded-lg px-4 py-2 text-[13px] font-semibold text-white" style={{ backgroundColor: FIGMA_BRONZE }} onClick={saveEditor}>
                      Create template
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {editor.kind === 'listing' ? (
                  <p className="text-[10px] font-bold uppercase tracking-wide text-[#9CA3AF]">Templates / notification</p>
                ) : null}
                <div className="mb-4 flex justify-between">
                  <div>
                    <h2 className="text-[20px] font-bold text-[#111827]">
                      {editor.kind === 'welcome' && 'Edit welcome message'}
                      {editor.kind === 'password' && 'Edit password reset'}
                      {editor.kind === 'payment' && 'Edit payment received'}
                      {editor.kind === 'listing' && 'Edit listing approved'}
                      {editor.kind === 'other' && 'Edit template'}
                    </h2>
                    {editor.kind === 'welcome' ? (
                      <p className="mt-1 text-[13px] text-[#6B7280]">Configure the automated response for new client registrations.</p>
                    ) : null}
                  </div>
                  <button type="button" onClick={closeEditor} className="p-1">
                    <X className="h-5 w-5" />
                  </button>
                </div>
                {editor.kind !== 'listing' && (
                  <div>
                    <label className={adminLabelCaps}>
                      {editor.kind === 'password' ? 'Email subject' : 'Subject'}
                    </label>
                    <input className={adminInput} value={subj} onChange={(e) => setSubj(e.target.value)} />
                  </div>
                )}
                {editor.kind === 'listing' && (
                  <div>
                    <label className={adminLabelCaps}>Message subject</label>
                    <input className={adminInput} value={subj} onChange={(e) => setSubj(e.target.value)} />
                  </div>
                )}
                <div className={editor.kind === 'password' || editor.kind === 'listing' || editor.kind === 'payment' ? 'mt-4' : 'mt-4'}>
                  <div className="mb-1 flex flex-wrap items-end justify-between gap-1">
                    <span className={adminLabelCaps + ' mb-0'}>Message content</span>
                    {editor.kind === 'listing' ? <span className="text-[11px] text-[#9CA3AF]">Markdown supported</span> : null}
                    {editor.kind === 'password' ? <span className="text-[11px] text-[#9CA3AF]">Supports markdown &amp; HTML</span> : null}
                  </div>
                  <textarea
                    ref={bodyRef}
                    className={adminInput + ' min-h-[180px] font-mono text-[12px]'}
                    value={body}
                    onChange={(e) => setBody(e.target.value)}
                  />
                  {editor.kind === 'welcome' ? (
                    <p className="mt-2 text-[12px] italic text-[#9CA3AF]">Use dynamic tags like {'{{client_name}}'} for personalization.</p>
                  ) : null}
                </div>
                {editor.kind === 'listing' && (
                  <div className="mt-3">
                    <p className={adminLabelCaps}>Insert variables</p>
                    <div className="flex flex-wrap gap-2">
                      {['{property_title}', '{owner_name}', '{approval_date}', '{agent_contact}'].map((tag) => (
                        <button
                          key={tag}
                          type="button"
                          className="inline-flex items-center gap-0.5 rounded-full border border-[#E5E7EB] px-2 py-1 text-[11px] font-mono text-[#4B5563] hover:bg-[#F9FAFB]"
                          onClick={() => insertAtCursor(bodyRef.current, tag, body, setBody)}
                        >
                          <span>⊕</span> {tag}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-2 text-[10px] font-bold text-[#9CA3AF]">
                    <span>INACTIVE</span>
                    <SettingsToggle checked={tActive} onChange={setTActive} />
                    <span>ACTIVE</span>
                  </div>
                  <div className="flex gap-2">
                    <button type="button" onClick={closeEditor} className="text-[12px] font-bold uppercase text-[#6B7280]">
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="rounded-lg px-4 py-2 text-[12px] font-bold uppercase text-white"
                      style={{ backgroundColor: FIGMA_BRONZE }}
                      onClick={saveEditor}
                    >
                      Save {editor.kind === 'password' || editor.kind === 'payment' || editor.kind === 'listing' ? 'changes' : 'changes'}
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      ) : null}

    </div>
  )
}
