import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  Filter,
  MoreVertical,
  Pencil,
  X,
} from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import { adminInput, adminLabelCaps, adminModalBackdrop } from '../lib/adminUi'
import { FIGMA_BRONZE, FIGMA_BRONZE_HOVER, FIGMA_SHELL } from './settings/theme'
import { SettingsToggle } from './settings/Toggle'
import {
  AUDIENCE_OPTIONS,
  DEFAULT_EDIT_HTML,
  DEFAULT_NEW_HTML,
  INITIAL_CAMPAIGNS,
  INITIAL_DISPATCH_LOG,
  NEWSLETTER_METRICS,
  TRIGGER_OPTIONS_EDIT,
  TRIGGER_OPTIONS_NEW,
  type NewsletterCampaign,
  type OpenRateQuality,
} from '../data/newslettersMock'

type AudienceOption = (typeof AUDIENCE_OPTIONS)[number]

function openDotClass(q: OpenRateQuality) {
  if (q === 'good') return 'bg-emerald-500'
  if (q === 'mid') return 'bg-amber-400'
  return 'bg-red-500'
}

function MetricCard({
  label,
  value,
  suffix,
  delta,
  positive,
  barPct,
}: {
  label: string
  value: string
  suffix?: string
  delta: number
  positive: boolean
  barPct: number
}) {
  const [hover, setHover] = useState(false)
  return (
    <div
      className={`${FIGMA_SHELL} relative overflow-hidden p-5 transition-shadow ${hover ? 'shadow-md' : ''}`}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <div className="absolute left-0 top-0 h-full w-1 rounded-r-full" style={{ backgroundColor: FIGMA_BRONZE }} aria-hidden />
      <p className="pl-3 text-[11px] font-bold uppercase tracking-wide text-[#6B7280]">{label}</p>
      <div className="mt-2 flex items-baseline gap-2 pl-3">
        <span className="text-[28px] font-bold leading-none text-[#111827]">{value}</span>
        {suffix ? <span className="text-[14px] font-medium text-[#6B7280]">{suffix}</span> : null}
      </div>
      <p className={`mt-1 pl-3 text-[13px] font-semibold ${positive ? 'text-emerald-600' : 'text-red-600'}`}>
        {positive ? '+' : '−'}
        {Math.abs(delta)}%
      </p>
      <div className="mt-4 h-1.5 overflow-hidden rounded-full bg-[#E5E7EB] pl-3 pr-3">
        <div
          className="h-full rounded-full transition-all duration-700 ease-out"
          style={{
            width: `${barPct}%`,
            backgroundColor: FIGMA_BRONZE,
            transform: hover ? 'scaleX(1.02)' : 'scaleX(1)',
            transformOrigin: 'left',
          }}
        />
      </div>
    </div>
  )
}

type ModalMode = 'new' | 'edit' | null

export function Newsletters() {
  const [campaigns, setCampaigns] = useState<NewsletterCampaign[]>(() => [...INITIAL_CAMPAIGNS])
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'all' | 'active' | 'inactive'>('all')
  const [toast, setToast] = useState<string | null>(null)
  const [modal, setModal] = useState<ModalMode>(null)
  const [previewOpen, setPreviewOpen] = useState(false)
  const [rowMenuId, setRowMenuId] = useState<string | null>(null)

  const [newForm, setNewForm] = useState<{
    name: string
    subject: string
    audience: AudienceOption
    trigger: string
    html: string
  }>({
    name: '',
    subject: '',
    audience: AUDIENCE_OPTIONS[0],
    trigger: TRIGGER_OPTIONS_NEW[0],
    html: DEFAULT_NEW_HTML,
  })

  const [editForm, setEditForm] = useState<{
    id: string
    name: string
    subject: string
    audience: AudienceOption
    trigger: string
    html: string
  }>({
    id: '' as string,
    name: 'Monthly Market Digest',
    subject: 'Your Exclusive Market Update for {{month}}',
    audience: AUDIENCE_OPTIONS[1],
    trigger: TRIGGER_OPTIONS_EDIT[0],
    html: DEFAULT_EDIT_HTML,
  })

  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const el = e.target as HTMLElement
      if (filterRef.current && !filterRef.current.contains(el)) setFilterOpen(false)
      if (!el.closest('[data-newsletter-row-menu]')) setRowMenuId(null)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(id)
  }, [toast])

  const filteredCampaigns = useMemo(() => {
    let rows = campaigns
    if (statusFilter === 'active') rows = rows.filter((c) => c.active)
    if (statusFilter === 'inactive') rows = rows.filter((c) => !c.active)
    return rows
  }, [campaigns, statusFilter])

  function setCampaignActive(id: string, active: boolean) {
    setCampaigns((c) => c.map((row) => (row.id === id ? { ...row, active } : row)))
  }

  function openNew() {
    setNewForm({
      name: '',
      subject: '',
      audience: AUDIENCE_OPTIONS[0],
      trigger: TRIGGER_OPTIONS_NEW[0],
      html: DEFAULT_NEW_HTML,
    })
    setModal('new')
  }

  function openEdit(c: NewsletterCampaign) {
    setEditForm({
      id: c.id,
      name: c.name,
      subject: `Your Exclusive Market Update for {{month}}`,
      audience: AUDIENCE_OPTIONS[1],
      trigger: TRIGGER_OPTIONS_EDIT[0],
      html: DEFAULT_EDIT_HTML,
    })
    setModal('edit')
    setRowMenuId(null)
  }

  function saveNew() {
    const id = `c${Date.now()}`
    const row: NewsletterCampaign = {
      id,
      name: newForm.name.trim() || 'Untitled Template',
      subtitle: 'Custom automation',
      recipients: 0,
      openRate: 0,
      openRateQuality: 'mid',
      ctr: 0,
      active: true,
    }
    setCampaigns((c) => [row, ...c])
    setModal(null)
    setToast('Template saved successfully')
  }

  function saveEdit() {
    setCampaigns((c) =>
      c.map((row) =>
        row.id === editForm.id
          ? { ...row, name: editForm.name.trim() || row.name, subtitle: row.subtitle }
          : row,
      ),
    )
    setModal(null)
    setToast('Changes saved successfully')
  }

  function exportCsv() {
    setToast('Newsletter list exported (CSV)')
  }

  const newLineCount = newForm.html.split('\n').length
  const editLineCount = editForm.html.split('\n').length

  return (
    <AdminLayout title="Newsletters">
      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-[90] -translate-x-1/2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[13px] font-medium text-[#111827] shadow-lg">
          {toast}
        </div>
      ) : null}

      <div className="mx-auto w-full space-y-6 pb-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div>
            <h1 className="text-[22px] font-bold text-[#111827]">Email Automations</h1>
            <p className="mt-2 max-w-2xl text-[14px] leading-relaxed text-[#6B7280]">
              Manage your automated touchpoints and editorial broadcasts. Review subscriber health and optimize conversion
              triggers from a single interface.
            </p>
          </div>
          <button
            type="button"
            onClick={openNew}
            className="shrink-0 rounded-lg px-5 py-2.5 text-[14px] font-semibold text-white transition-colors"
            style={{ backgroundColor: FIGMA_BRONZE }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = FIGMA_BRONZE
            }}
          >
            + Create New Template
          </button>
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <MetricCard
            label="Total Subscribers"
            value={NEWSLETTER_METRICS.subscribers.value.toLocaleString()}
            delta={NEWSLETTER_METRICS.subscribers.delta}
            positive={NEWSLETTER_METRICS.subscribers.positive}
            barPct={NEWSLETTER_METRICS.subscribers.barPct}
          />
          <MetricCard
            label="Daily Emails Sent"
            value={NEWSLETTER_METRICS.dailySent.value.toLocaleString()}
            delta={NEWSLETTER_METRICS.dailySent.delta}
            positive={NEWSLETTER_METRICS.dailySent.positive}
            barPct={NEWSLETTER_METRICS.dailySent.barPct}
          />
          <MetricCard
            label="Average Open Rate"
            value={String(NEWSLETTER_METRICS.openRate.value)}
            suffix="%"
            delta={NEWSLETTER_METRICS.openRate.delta}
            positive={NEWSLETTER_METRICS.openRate.positive}
            barPct={NEWSLETTER_METRICS.openRate.barPct}
          />
        </div>

        <div className={FIGMA_SHELL}>
          <div className="flex flex-col gap-3 border-b border-[#E5E7EB] px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-[16px] font-bold text-[#111827]">Active Newsletter Campaigns</h2>
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative" ref={filterRef}>
                <button
                  type="button"
                  onClick={() => setFilterOpen((v) => !v)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[13px] font-semibold text-[#374151] hover:bg-[#F9FAFB]"
                >
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
                {filterOpen ? (
                  <div className="absolute right-0 z-30 mt-1 w-48 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                    {(
                      [
                        ['all', 'All campaigns'],
                        ['active', 'Active only'],
                        ['inactive', 'Inactive only'],
                      ] as const
                    ).map(([value, label]) => (
                      <button
                        key={value}
                        type="button"
                        className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[#F3F4F6]"
                        onClick={() => {
                          setStatusFilter(value)
                          setFilterOpen(false)
                        }}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={exportCsv}
                className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[13px] font-semibold text-[#374151] hover:bg-[#F9FAFB]"
              >
                <Download className="h-4 w-4" />
                Export
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA] text-[11px] font-bold uppercase tracking-wide text-[#6B7280]">
                  <th className="px-5 py-3">Campaign Name</th>
                  <th className="px-3 py-3">Recipients</th>
                  <th className="px-3 py-3">Open Rate</th>
                  <th className="px-3 py-3">CTR</th>
                  <th className="px-3 py-3">Status</th>
                  <th className="px-5 py-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCampaigns.map((c) => (
                  <tr key={c.id} className="border-b border-[#F3F4F6] last:border-0 hover:bg-[#FAFAFA]/80">
                    <td className="px-5 py-4">
                      <div className="font-semibold text-[#111827]">{c.name}</div>
                      <div className="text-[12px] text-[#9CA3AF]">{c.subtitle}</div>
                    </td>
                    <td className="px-3 py-4 font-medium text-[#374151]">{c.recipients.toLocaleString()}</td>
                    <td className="px-3 py-4">
                      <span className="inline-flex items-center gap-1.5 font-semibold text-[#111827]">
                        <span className={`h-2 w-2 rounded-full ${openDotClass(c.openRateQuality)}`} />
                        {c.openRate.toFixed(1)}%
                      </span>
                    </td>
                    <td className="px-3 py-4 font-medium text-[#374151]">{c.ctr.toFixed(1)}%</td>
                    <td className="px-3 py-4">
                      <SettingsToggle checked={c.active} onChange={(v) => setCampaignActive(c.id, v)} />
                    </td>
                    <td className="relative px-5 py-4 text-right">
                      <div className="inline-flex items-center justify-end gap-1">
                        <button
                          type="button"
                          onClick={() => openEdit(c)}
                          className="rounded-lg p-2 text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]"
                          aria-label="Edit campaign"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <div className="relative" data-newsletter-row-menu>
                          <button
                            type="button"
                            onClick={() => setRowMenuId((id) => (id === c.id ? null : c.id))}
                            className="rounded-lg p-2 text-[#6B7280] hover:bg-[#F3F4F6]"
                            aria-label="More actions"
                          >
                            <MoreVertical className="h-4 w-4" />
                          </button>
                          {rowMenuId === c.id ? (
                            <div className="absolute right-0 z-20 mt-1 w-44 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                              <button
                                type="button"
                                className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[#F3F4F6]"
                                onClick={() => {
                                  setToast('Duplicate queued (mock)')
                                  setRowMenuId(null)
                                }}
                              >
                                Duplicate template
                              </button>
                              <button
                                type="button"
                                className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[#F3F4F6]"
                                onClick={() => {
                                  setToast('Performance snapshot sent')
                                  setRowMenuId(null)
                                }}
                              >
                                View performance
                              </button>
                              <button
                                type="button"
                                className="block w-full px-3 py-2 text-left text-[13px] text-red-600 hover:bg-red-50"
                                onClick={() => {
                                  setCampaigns((rows) => rows.filter((x) => x.id !== c.id))
                                  setRowMenuId(null)
                                  setToast('Campaign archived')
                                }}
                              >
                                Archive
                              </button>
                            </div>
                          ) : null}
                        </div>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="relative py-6">
          <div className="absolute inset-x-0 top-1/2 h-px bg-[#E5E7EB]" aria-hidden />
          <p className="relative mx-auto w-max bg-[#F9FAFB] px-4 text-center text-[11px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
            System Log &amp; Recent Dispatches
          </p>
        </div>

        <div className={`${FIGMA_SHELL} divide-y divide-[#F3F4F6]`}>
          {INITIAL_DISPATCH_LOG.map((log) => (
            <button
              key={log.id}
              type="button"
              onClick={() => setToast('Log detail (mock)')}
              className="flex w-full items-center gap-4 px-5 py-4 text-left transition hover:bg-[#FAFAFA]"
            >
              <span
                className={`h-2.5 w-2.5 shrink-0 rounded-full ${
                  log.tone === 'green' ? 'bg-emerald-500' : log.tone === 'bronze' ? '' : 'bg-[#9CA3AF]'
                }`}
                style={log.tone === 'bronze' ? { backgroundColor: FIGMA_BRONZE } : undefined}
              />
              <span className="w-20 shrink-0 text-[12px] font-semibold text-[#6B7280]">{log.time}</span>
              <span className="min-w-0 flex-1 text-[13px] text-[#374151]">{log.message}</span>
              <ChevronRight className="h-4 w-4 shrink-0 text-[#D1D5DB]" />
            </button>
          ))}
        </div>
      </div>

      {modal === 'new' ? (
        <div
          className={adminModalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-new-title"
          onClick={() => setModal(null)}
        >
          <div
            className="max-h-[min(92vh,880px)] w-full max-w-[960px] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#F3F4F6] px-6 py-5">
              <div>
                <h2 id="news-new-title" className="text-[20px] font-bold text-[#111827]">
                  New Email Template
                </h2>
                <p className="mt-1 text-[13px] text-[#6B7280]">Craft a bespoke communication for your elite clientele.</p>
              </div>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="rounded-lg p-2 text-[#6B7280] hover:bg-[#F3F4F6]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid max-h-[calc(92vh-200px)] grid-cols-1 gap-6 overflow-y-auto p-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className={adminLabelCaps}>Template Name</label>
                  <input
                    className={adminInput}
                    placeholder="e.g. Waterfront Collection Intro"
                    value={newForm.name}
                    onChange={(e) => setNewForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={adminLabelCaps}>Subject Line</label>
                  <input
                    className={adminInput}
                    placeholder="Curating your next great investment..."
                    value={newForm.subject}
                    onChange={(e) => setNewForm((f) => ({ ...f, subject: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={adminLabelCaps}>Target Users (Audience)</label>
                  <div className="relative">
                    <select
                      className={`${adminInput} appearance-none pr-10`}
                      value={newForm.audience}
                      onChange={(e) => setNewForm((f) => ({ ...f, audience: e.target.value as AudienceOption }))}
                    >
                      {AUDIENCE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  </div>
                </div>
                <div>
                  <label className={adminLabelCaps}>Trigger Event</label>
                  <div className="relative">
                    <select
                      className={`${adminInput} appearance-none pr-10`}
                      value={newForm.trigger}
                      onChange={(e) => setNewForm((f) => ({ ...f, trigger: e.target.value }))}
                    >
                      {TRIGGER_OPTIONS_NEW.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  </div>
                </div>
                <div className="rounded-xl border border-amber-100 bg-amber-50/80 px-4 py-3 text-[12px] leading-relaxed text-amber-900">
                  <span className="mr-1 font-bold">ⓘ</span>
                  Use <code className="rounded bg-amber-100/80 px-1">{`{{client_name}}`}</code> or{' '}
                  <code className="rounded bg-amber-100/80 px-1">{`{{property_title}}`}</code> to dynamically inject property details.
                </div>
              </div>

              <div className="flex min-h-[320px] flex-col">
                <label className={adminLabelCaps}>HTML Content</label>
                <div className="flex min-h-0 flex-1 overflow-hidden rounded-xl border border-[#1F2937] bg-[#0B0F14]">
                  <div className="select-none border-r border-white/10 px-2 py-3 text-right font-mono text-[11px] leading-[1.6] text-[#6B7280]">
                    {Array.from({ length: Math.max(newLineCount, 1) }, (_, i) => (
                      <div key={i}>{i + 1}</div>
                    ))}
                  </div>
                  <textarea
                    value={newForm.html}
                    onChange={(e) => setNewForm((f) => ({ ...f, html: e.target.value }))}
                    className="min-h-[280px] w-full resize-y bg-transparent p-3 font-mono text-[12px] leading-[1.6] text-emerald-300/95 outline-none placeholder:text-[#4B5563]"
                    spellCheck={false}
                  />
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 border-t border-[#F3F4F6] px-6 py-4">
              <button
                type="button"
                onClick={() => setModal(null)}
                className="rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-[14px] font-semibold text-[#374151] hover:bg-[#F9FAFB]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={saveNew}
                className="rounded-lg px-5 py-2.5 text-[14px] font-semibold text-white"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                }}
              >
                Save Template
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {modal === 'edit' ? (
        <div
          className={adminModalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="news-edit-title"
          onClick={() => setModal(null)}
        >
          <div
            className="max-h-[min(92vh,900px)] w-full max-w-[960px] overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-start justify-between gap-3 border-b border-[#F3F4F6] px-6 py-5">
              <div>
                <h2 id="news-edit-title" className="text-[20px] font-bold text-[#111827]">
                  Edit Email Template
                </h2>
                <p className="mt-1 text-[13px] text-[#6B7280]">
                  Refine the architecture of your &apos;Monthly Market Digest&apos; communication.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setModal(null)}
                className="rounded-lg p-2 text-[#6B7280] hover:bg-[#F3F4F6]"
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid max-h-[calc(92vh-220px)] grid-cols-1 gap-6 overflow-y-auto p-6 lg:grid-cols-2">
              <div className="space-y-4">
                <div>
                  <label className={adminLabelCaps}>Template Name</label>
                  <input
                    className={adminInput}
                    value={editForm.name}
                    onChange={(e) => setEditForm((f) => ({ ...f, name: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={adminLabelCaps}>Subject Line</label>
                  <input
                    className={adminInput}
                    value={editForm.subject}
                    onChange={(e) => setEditForm((f) => ({ ...f, subject: e.target.value }))}
                  />
                </div>
                <div>
                  <label className={adminLabelCaps}>Target Users (Audience)</label>
                  <div className="relative">
                    <select
                      className={`${adminInput} appearance-none pr-10`}
                      value={editForm.audience}
                      onChange={(e) => setEditForm((f) => ({ ...f, audience: e.target.value as AudienceOption }))}
                    >
                      {AUDIENCE_OPTIONS.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  </div>
                </div>
                <div>
                  <label className={adminLabelCaps}>Trigger Event</label>
                  <div className="relative">
                    <select
                      className={`${adminInput} appearance-none pr-10`}
                      value={editForm.trigger}
                      onChange={(e) => setEditForm((f) => ({ ...f, trigger: e.target.value }))}
                    >
                      {TRIGGER_OPTIONS_EDIT.map((o) => (
                        <option key={o} value={o}>
                          {o}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  </div>
                </div>
                <div className="rounded-xl border border-orange-100 bg-orange-50/90 px-4 py-3 text-[12px] leading-relaxed text-orange-950">
                  <span className="mr-1 font-bold">ⓘ</span>
                  Use <code className="rounded bg-orange-100 px-1 font-mono text-[11px]">{`{{user_name}}`}</code> or{' '}
                  <code className="rounded bg-orange-100 px-1 font-mono text-[11px]">{`{{month}}`}</code> to inject personalized data into
                  your template.
                </div>
              </div>

              <div className="flex min-h-[320px] flex-col">
                <label className={adminLabelCaps}>HTML Code Editor</label>
                <div className="flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border border-[#1F2937] bg-[#111827] shadow-inner">
                  <div className="flex items-center gap-2 border-b border-white/10 px-3 py-2">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FF5F57]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#FEBC2E]" />
                    <span className="h-2.5 w-2.5 rounded-full bg-[#28C840]" />
                    <span className="ml-2 font-mono text-[10px] font-medium uppercase tracking-wider text-[#9CA3AF]">
                      index.template.html
                    </span>
                  </div>
                  <div className="flex min-h-0 flex-1 overflow-hidden">
                    <div className="select-none border-r border-white/10 px-2 py-3 text-right font-mono text-[11px] leading-[1.6] text-[#6B7280]">
                      {Array.from({ length: Math.max(editLineCount, 1) }, (_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>
                    <textarea
                      value={editForm.html}
                      onChange={(e) => setEditForm((f) => ({ ...f, html: e.target.value }))}
                      className="min-h-[260px] w-full flex-1 resize-y bg-transparent p-3 font-mono text-[12px] leading-[1.6] text-sky-300 outline-none"
                      spellCheck={false}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#F3F4F6] px-6 py-4">
              <button type="button" onClick={() => setModal(null)} className="text-[14px] font-semibold text-[#6B7280] hover:text-[#111827]">
                Cancel
              </button>
              <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  onClick={() => setPreviewOpen(true)}
                  className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-[#F3F4F6] px-4 py-2.5 text-[14px] font-semibold text-[#374151] hover:bg-[#E5E7EB]"
                >
                  <Eye className="h-4 w-4" />
                  Preview
                </button>
                <button
                  type="button"
                  onClick={saveEdit}
                  className="rounded-lg px-5 py-2.5 text-[14px] font-semibold text-white"
                  style={{ backgroundColor: FIGMA_BRONZE }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                  }}
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {previewOpen ? (
        <div
          className={adminModalBackdrop}
          role="dialog"
          aria-modal="true"
          aria-labelledby="preview-title"
          onClick={() => setPreviewOpen(false)}
        >
          <div
            className="flex max-h-[min(88vh,720px)] w-full max-w-2xl flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[#F3F4F6] px-5 py-4">
              <h2 id="preview-title" className="text-[16px] font-bold text-[#111827]">
                Email preview
              </h2>
              <button type="button" onClick={() => setPreviewOpen(false)} className="rounded-lg p-2 text-[#6B7280] hover:bg-[#F3F4F6]">
                <X className="h-5 w-5" />
              </button>
            </div>
            <iframe
              title="HTML preview"
              className="min-h-[400px] flex-1 w-full border-0 bg-white"
              srcDoc={editForm.html.replace(/\{\{user_name\}\}/g, 'Alexandra').replace(/\{\{month\}\}/g, 'May 2026')}
              sandbox="allow-same-origin"
            />
          </div>
        </div>
      ) : null}
    </AdminLayout>
  )
}
