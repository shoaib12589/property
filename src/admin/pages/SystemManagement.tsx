import { useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronDown,
  Download,
  ExternalLink,
  Eye,
  ListFilter,
  RefreshCw,
  Search,
  Trash2,
  Upload,
  X,
  Link2,
} from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import { AdminSuccessModal } from '../components/AdminSuccessModal'
import {
  ADMIN_ACCENT,
  ADMIN_ACCENT_MUTED,
  adminInput,
  adminLabelCaps,
  adminModalBackdrop,
  adminModalPanel,
  adminModalPanelWide,
} from '../lib/adminUi'
import {
  MOCK_ADVERTISEMENTS,
  MOCK_AUDIT_LOGS,
  MOCK_DOCUMENTS,
  MOCK_PROMOTIONS,
  MOCK_WATCHLISTS,
  SYSTEM_MAIN_TABS,
  auditActionBadgeClass,
  type AdvertisementCard,
  type AuditLogRow,
  type AuditSubFilter,
  type DocumentVaultRow,
  type PromotionRow,
  type SystemMainTab,
} from '../data/systemManagementMock'

const TAB_ACTIVE = 'border-[#B89F7C] bg-[#B89F7C] text-white shadow-sm'
const TAB_INACTIVE = 'border-[#E5E7EB] bg-white text-[#111827] hover:border-[#D1D5DB]'

const PAGE_SIZE = 4
const TOTAL_ENTRIES = 1284

function promotionStatusClass(s: PromotionRow['status']) {
  return s === 'Active'
    ? 'rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-medium text-[#1D4ED8]'
    : 'rounded-full bg-[#FEF9C3] px-3 py-1 text-[12px] font-medium text-[#854D0E]'
}

function intentClass(intent: 'Referral Link' | 'Direct Search') {
  return intent === 'Referral Link'
    ? 'rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-medium text-[#1D4ED8]'
    : 'rounded-full bg-[#FEF9C3] px-3 py-1 text-[12px] font-medium text-[#854D0E]'
}

function expandRows<T>(template: T[], total: number, mapFn: (item: T, idx: number) => T): T[] {
  return Array.from({ length: total }, (_, i) => mapFn(template[i % template.length], i))
}

export function SystemManagement() {
  const [mainTab, setMainTab] = useState<SystemMainTab>('promotions')

  const [promotions, setPromotions] = useState<PromotionRow[]>(() =>
    expandRows(MOCK_PROMOTIONS, TOTAL_ENTRIES, (row, i) => ({ ...row, id: `p${i + 1}` }))
  )
  const [promoPage, setPromoPage] = useState(1)
  const [addPromoOpen, setAddPromoOpen] = useState(false)
  const [promoTitle, setPromoTitle] = useState('')
  const [promoDiscount, setPromoDiscount] = useState('')
  const [promoDuration, setPromoDuration] = useState('')
  const [promoStatus, setPromoStatus] = useState<'Active' | 'Inactive'>('Active')
  const [deletePromoId, setDeletePromoId] = useState<string | null>(null)

  const [ads, setAds] = useState<AdvertisementCard[]>(MOCK_ADVERTISEMENTS)
  const [addAdOpen, setAddAdOpen] = useState(false)
  const [editAd, setEditAd] = useState<AdvertisementCard | null>(null)
  const [adTitle, setAdTitle] = useState('')
  const [adLink, setAdLink] = useState('')
  const [adStatus, setAdStatus] = useState<'Active' | 'Paused'>('Active')

  const [watchRows] = useState(() =>
    expandRows(MOCK_WATCHLISTS, TOTAL_ENTRIES, (row, i) => ({ ...row, id: `w${i + 1}` }))
  )
  const [watchPage, setWatchPage] = useState(1)

  const [docs, setDocs] = useState<DocumentVaultRow[]>(MOCK_DOCUMENTS)
  const [docSearch, setDocSearch] = useState('')
  const [docTypeOpen, setDocTypeOpen] = useState(false)
  const [docFilterOpen, setDocFilterOpen] = useState(false)
  const [docType, setDocType] = useState('All types')
  const [previewDoc, setPreviewDoc] = useState<DocumentVaultRow | null>(null)
  const [deleteDocId, setDeleteDocId] = useState<string | null>(null)

  const [auditLogs] = useState<AuditLogRow[]>(() =>
    expandRows(MOCK_AUDIT_LOGS, TOTAL_ENTRIES, (row, i) => ({ ...row, id: `al${i + 1}` }))
  )
  const [auditFilter, setAuditFilter] = useState<AuditSubFilter>('all')
  const [auditPage, setAuditPage] = useState(1)
  const [sortOpen, setSortOpen] = useState(false)
  const [sortLabel, setSortLabel] = useState('LATEST FIRST')
  const [activityDetail, setActivityDetail] = useState<AuditLogRow | null>(null)
  const [auditFloatOpen, setAuditFloatOpen] = useState(false)

  const [success, setSuccess] = useState<{ title: string; subtitle: string } | null>(null)

  const sortRef = useRef<HTMLDivElement>(null)
  const docTypeRef = useRef<HTMLDivElement>(null)
  const docFilterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const t = e.target as Node
      if (sortRef.current && !sortRef.current.contains(t)) setSortOpen(false)
      if (docTypeRef.current && !docTypeRef.current.contains(t)) setDocTypeOpen(false)
      if (docFilterRef.current && !docFilterRef.current.contains(t)) setDocFilterOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    setPromoPage(1)
    setWatchPage(1)
    setAuditPage(1)
  }, [mainTab])

  useEffect(() => {
    setAuditPage(1)
  }, [auditFilter])

  useEffect(() => {
    if (editAd) {
      setAdTitle(editAd.title)
      setAdLink(editAd.targetUrl)
      setAdStatus(editAd.status === 'Paused' ? 'Paused' : 'Active')
    }
  }, [editAd])

  useEffect(() => {
    if (mainTab !== 'audit-logs') {
      setAuditFloatOpen(false)
      return
    }
    const id = window.setTimeout(() => setAuditFloatOpen(true), 600)
    return () => window.clearTimeout(id)
  }, [mainTab, auditFilter])

  const promoSlice = useMemo(() => {
    const start = (promoPage - 1) * PAGE_SIZE
    return promotions.slice(start, start + PAGE_SIZE)
  }, [promotions, promoPage])

  const filteredDocs = useMemo(() => {
    const q = docSearch.trim().toLowerCase()
    let rows = docs
    if (q) rows = rows.filter((d) => `${d.fileName} ${d.property}`.toLowerCase().includes(q))
    if (docType === 'PDF') rows = rows.filter((d) => d.fileName.toLowerCase().endsWith('.pdf'))
    if (docType === 'Agreements') rows = rows.filter((d) => d.fileName.toLowerCase().includes('agreement'))
    return rows
  }, [docs, docSearch, docType])

  const filteredAudit = useMemo(() => {
    let rows = auditLogs
    if (auditFilter !== 'all') rows = rows.filter((r) => r.subFilter.includes(auditFilter))
    if (sortLabel === 'OLDEST FIRST') rows = [...rows].reverse()
    return rows
  }, [auditLogs, auditFilter, sortLabel])

  const auditSlice = useMemo(() => {
    const start = (auditPage - 1) * PAGE_SIZE
    return filteredAudit.slice(start, start + PAGE_SIZE)
  }, [filteredAudit, auditPage])

  const watchSlice = useMemo(() => {
    const start = (watchPage - 1) * PAGE_SIZE
    return watchRows.slice(start, start + PAGE_SIZE)
  }, [watchRows, watchPage])

  const promoTotalPages = Math.max(1, Math.ceil(promotions.length / PAGE_SIZE))
  const auditTotalPages = Math.max(1, Math.ceil(filteredAudit.length / PAGE_SIZE))
  const watchTotalPages = Math.max(1, Math.ceil(watchRows.length / PAGE_SIZE))
  const auditTotalDisplay = filteredAudit.length

  function showSuccess(title: string, subtitle: string) {
    setSuccess({ title, subtitle })
  }

  function saveNewPromotion() {
    setAddPromoOpen(false)
    const newRow: PromotionRow = {
      id: `p${Date.now()}`,
      title: promoTitle || 'New Campaign',
      subtitle: 'LUXURY RESIDENTIAL',
      discount: promoDiscount ? `${promoDiscount}%` : '10%',
      duration: promoDuration || 'Apr 20 - Apr 25, 2026',
      status: promoStatus,
      usageCount: '0',
    }
    setPromotions((prev) => [newRow, ...prev])
    setPromoTitle('')
    setPromoDiscount('')
    setPromoDuration('')
    setPromoStatus('Active')
    showSuccess('Successfully', 'Promotion Created Successfully')
  }

  function saveNewAd() {
    setAddAdOpen(false)
    const newAd: AdvertisementCard = {
      id: `a${Date.now()}`,
      title: adTitle || 'New Campaign',
      image: MOCK_ADVERTISEMENTS[0].image,
      targetUrl: adLink || 'https://estate.com/',
      status: 'Active',
    }
    setAds((prev) => [newAd, ...prev])
    setAdTitle('')
    setAdLink('')
    showSuccess('Successfully', 'Campaign Add Done Successfully')
  }

  function saveEditAd() {
    if (!editAd) return
    setAds((prev) => prev.map((a) => (a.id === editAd.id ? { ...a, title: adTitle || a.title, targetUrl: adLink || a.targetUrl, status: adStatus } : a)))
    setEditAd(null)
    showSuccess('Successfully', 'Changes Saved Successfully')
  }

  return (
    <AdminLayout title="System Management">
      <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">
        {SYSTEM_MAIN_TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setMainTab(key)}
            className={`w-full rounded-xl border px-3 py-2.5 text-center text-[14px] font-semibold transition sm:py-3 sm:text-[15px] ${mainTab === key ? TAB_ACTIVE : TAB_INACTIVE}`}
          >
            {label}
          </button>
        ))}
      </div>

      {mainTab === 'promotions' ? (
        <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#111827]">Active Campaign Registry</h2>
              <p className="mt-1 max-w-xl text-[14px] text-[#6B7280]">
                Refining global visibility and financial incentives across the estate portfolio.
              </p>
            </div>
            <button
              type="button"
              onClick={() => setAddPromoOpen(true)}
              className="shrink-0 rounded-lg px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-white"
              style={{ backgroundColor: ADMIN_ACCENT }}
            >
              + Add New Promotion
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                  {['Promotion Title', 'Discount (%)', 'Duration', 'Status', 'Usage Count', 'Action'].map((h) => (
                    <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {promoSlice.map((row) => (
                  <tr key={row.id} className="border-b border-[#E5E7EB] hover:bg-[#FAFAFA]">
                    <td className="px-4 py-4">
                      <p className="font-semibold text-[#111827]">{row.title}</p>
                      <p className="text-[12px] text-[#9CA3AF]">{row.subtitle}</p>
                    </td>
                    <td className="px-4 py-4 text-[#374151]">{row.discount}</td>
                    <td className="px-4 py-4 text-[#374151]">{row.duration}</td>
                    <td className="px-4 py-4">
                      <span className={promotionStatusClass(row.status)}>{row.status}</span>
                    </td>
                    <td className="px-4 py-4 font-medium text-[#111827]">{row.usageCount}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="View"
                          className="rounded-full border border-[#E5E7EB] p-2 text-[#6B7280] hover:bg-white"
                          onClick={() => showSuccess('Successfully', 'Promotion details opened')}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          aria-label="Delete"
                          className="rounded-full border border-[#FEE2E2] bg-[#FEF2F2] p-2 text-[#DC2626] hover:bg-red-50"
                          onClick={() => setDeletePromoId(row.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {paginationFooter(promoPage, promoTotalPages, setPromoPage, promotions.length)}
        </div>
      ) : null}

      {mainTab === 'advertisement' ? (
        <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-[18px] font-bold text-[#111827]">Campaign advertisements</h2>
            <button
              type="button"
              onClick={() => {
                setAdTitle('')
                setAdLink('')
                setAddAdOpen(true)
              }}
              className="rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white"
              style={{ backgroundColor: ADMIN_ACCENT }}
            >
              + Add New Advertisement
            </button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {ads.map((ad) => (
              <div key={ad.id} className="overflow-hidden rounded-xl border border-[#E5E7EB] bg-white shadow-sm">
                <button type="button" className="relative block w-full" onClick={() => setEditAd(ad)}>
                  <img src={ad.image} alt="" className="h-44 w-full object-cover" />
                  <span className="absolute right-2 top-2 rounded-full bg-black/50 px-2 py-0.5 text-[11px] text-white">{ad.status}</span>
                </button>
                <div className="p-3">
                  <p className="font-semibold text-[#111827]">{ad.title}</p>
                  <p className="mt-1 truncate text-[12px] text-[#6B7280]">{ad.targetUrl}</p>
                <button type="button" className="mt-2 text-[13px] font-medium text-[#B89F7C] hover:underline" onClick={() => setEditAd(ad)}>
                  Edit
                </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : null}

      {mainTab === 'watchlists' ? (
        <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#111827]">Users Watchlists</h2>
              <p className="mt-1 text-[14px] text-[#6B7280]">Monitor high-intent property activity in real time.</p>
            </div>
            <button
              type="button"
              className="shrink-0 rounded-lg px-4 py-2.5 text-[13px] font-semibold uppercase tracking-wide text-white"
              style={{ backgroundColor: ADMIN_ACCENT }}
              onClick={() => showSuccess('Successfully', 'Watchlist entry added')}
            >
              + Add New Promotion
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                  {['Users', 'Saved Asset', 'Intent Signal', 'Date Logged', 'Action'].map((h) => (
                    <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {watchSlice.map((row) => (
                  <tr key={row.id} className="border-b border-[#E5E7EB] hover:bg-[#FAFAFA]">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img src={row.userAvatar} alt="" className="h-10 w-10 rounded-full object-cover" />
                        <div>
                          <p className="font-semibold text-[#111827]">{row.userName}</p>
                          <p className="text-[12px] text-[#9CA3AF]">{row.userTier}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <img src={row.assetImage} alt="" className="h-12 w-16 rounded object-cover" />
                        <span className="font-medium text-[#111827]">{row.assetName}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className={intentClass(row.intent)}>{row.intent}</span>
                    </td>
                    <td className="px-4 py-4 text-[#374151]">{row.dateLogged}</td>
                    <td className="px-4 py-4">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-full border border-[#E5E7EB] p-2 text-[#6B7280]"
                          onClick={() => showSuccess('Successfully', 'Watchlist viewed')}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-[#FEE2E2] bg-[#FEF2F2] p-2 text-[#DC2626]"
                          onClick={() => showSuccess('Successfully', 'Entry removed')}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {paginationFooter(watchPage, watchTotalPages, setWatchPage, watchRows.length)}
        </div>
      ) : null}

      {mainTab === 'document-vault' ? (
        <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <div className="relative min-w-[200px] flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                type="search"
                value={docSearch}
                onChange={(e) => setDocSearch(e.target.value)}
                placeholder="Find by document name or Property type..."
                className="w-full rounded-lg border border-[#E5E7EB] bg-[#F9FAFB] py-2.5 pl-10 pr-3 text-[14px] outline-none focus:border-[#B89F7C] focus:ring-2 focus:ring-[#B89F7C]/20"
              />
            </div>
            <div className="relative" ref={docFilterRef}>
              <button
                type="button"
                onClick={() => setDocFilterOpen((o) => !o)}
                className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-[13px] font-medium text-[#374151]"
              >
                <ListFilter className="h-4 w-4" />
                Filter by type
              </button>
              {docFilterOpen ? (
                <div className="absolute left-0 top-full z-40 mt-1 w-48 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
                  {(['All', 'Agreements', 'Deeds', 'Invoices'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="w-full px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                      onClick={() => {
                        setDocFilterOpen(false)
                        showSuccess('Successfully', `Filter: ${opt}`)
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="relative" ref={docTypeRef}>
              <button
                type="button"
                onClick={() => setDocTypeOpen((o) => !o)}
                className="inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2.5 text-[13px] font-medium text-[#374151]"
              >
                Document Type: {docType}
                <ChevronDown className="h-4 w-4" />
              </button>
              {docTypeOpen ? (
                <div className="absolute right-0 top-full z-40 mt-1 w-48 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
                  {(['All types', 'PDF', 'Agreements'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="w-full px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                      onClick={() => {
                        setDocType(opt)
                        setDocTypeOpen(false)
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[800px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                  {['Name', 'Property', 'Type', 'Date', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredDocs.map((row) => (
                  <tr key={row.id} className="border-b border-[#E5E7EB] hover:bg-[#FAFAFA]">
                    <td className="px-4 py-3 font-medium text-[#111827]">{row.fileName}</td>
                    <td className="px-4 py-3 text-[#374151]">{row.property}</td>
                    <td className="px-4 py-3 text-[#374151]">{row.sizeLabel}</td>
                    <td className="px-4 py-3 text-[#374151]">{row.date}</td>
                    <td className="px-4 py-3">
                      <div className="flex gap-2">
                        <button
                          type="button"
                          className="rounded-full border border-[#E5E7EB] p-2 text-[#6B7280]"
                          onClick={() => setPreviewDoc(row)}
                        >
                          <Eye className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-[#E5E7EB] p-2 text-[#6B7280]"
                          onClick={() => showSuccess('Successfully', 'Download started')}
                        >
                          <Download className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded-full border border-[#FEE2E2] bg-[#FEF2F2] p-2 text-[#DC2626]"
                          onClick={() => setDeleteDocId(row.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : null}

      {mainTab === 'audit-logs' ? (
        <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6">
          <div className="mb-4 flex flex-wrap items-start justify-between gap-4">
            <div>
              <h2 className="text-[18px] font-bold text-[#111827]">Audit Logs</h2>
              <p className="mt-1 max-w-2xl text-[14px] text-[#6B7280]">
                A comprehensive historical record of all administrative activities within the Curated Estate ecosystem.
              </p>
            </div>
            <button
              type="button"
              className="inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold uppercase text-white"
              style={{ backgroundColor: ADMIN_ACCENT }}
              onClick={() => showSuccess('Successfully', 'CSV export queued')}
            >
              <Download className="h-4 w-4" />
              Export CSV
            </button>
          </div>

          <div className="mb-4 flex flex-wrap items-center justify-between gap-3 border-b border-[#E5E7EB] pb-3">
            <div className="flex flex-wrap gap-4 text-[14px]">
              {(
                [
                  { key: 'all' as const, label: 'All Activities', badge: '1,284' },
                  { key: 'security' as const, label: 'Security Alerts' },
                  { key: 'listing-updates' as const, label: 'Listing Updates' },
                  { key: 'document-history' as const, label: 'Document History' },
                ] satisfies { key: AuditSubFilter; label: string; badge?: string }[]
              ).map((item) => (
                <button
                  key={item.key}
                  type="button"
                  onClick={() => setAuditFilter(item.key)}
                  className={`relative pb-2 font-medium ${
                    auditFilter === item.key ? 'text-[#111827]' : 'text-[#6B7280] hover:text-[#111827]'
                  }`}
                >
                  {item.label}
                  {item.badge ? (
                    <span className="ml-1.5 rounded-md bg-[#F3F0EA] px-2 py-0.5 text-[12px] font-semibold text-[#6B7280]">{item.badge}</span>
                  ) : null}
                  {auditFilter === item.key ? (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full" style={{ backgroundColor: ADMIN_ACCENT }} />
                  ) : null}
                </button>
              ))}
            </div>
            <div className="relative" ref={sortRef}>
              <button
                type="button"
                onClick={() => setSortOpen((o) => !o)}
                className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#374151]"
              >
                <span className="text-[#9CA3AF]">SORT BY:</span> {sortLabel}
                <ListFilter className="h-4 w-4" />
              </button>
              {sortOpen ? (
                <div className="absolute right-0 top-full z-40 mt-2 w-44 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
                  {(['LATEST FIRST', 'OLDEST FIRST'] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="w-full px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                      onClick={() => {
                        setSortLabel(opt)
                        setSortOpen(false)
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                  {['ADMINISTRATOR', 'User Role', 'TARGET ENTITY', 'TARGET DATE TIME', 'ACTION TYPE', 'REFERENCE'].map((h) => (
                    <th key={h} className="px-3 py-3 text-[11px] font-bold uppercase tracking-wide text-[#111827]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {auditSlice.map((row) => (
                  <tr key={row.id} className="border-b border-[#E5E7EB] hover:bg-[#FAFAFA]">
                    <td className="px-3 py-4">
                      <p className="font-semibold text-[#111827]">{row.adminName}</p>
                      <p className="text-[12px] text-[#9CA3AF]">{row.adminEmail}</p>
                    </td>
                    <td className="px-3 py-4 text-[#374151]">{row.role}</td>
                    <td className="px-3 py-4">
                      <p className="font-semibold text-[#111827]">{row.entityTitle}</p>
                      <p className="text-[12px] text-[#9CA3AF]">{row.entitySub}</p>
                    </td>
                    <td className="px-3 py-4 text-[#374151]">{row.dateTime}</td>
                    <td className="px-3 py-4">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${auditActionBadgeClass(row.action)}`}>
                        {row.action}
                      </span>
                    </td>
                    <td className="px-3 py-4">
                      <button
                        type="button"
                        className="rounded-md border border-[#E5E7EB] p-2 text-[#6B7280] hover:bg-white"
                        aria-label="Open activity"
                        onClick={() => setActivityDetail(row)}
                      >
                        <ExternalLink className="h-4 w-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {paginationFooter(auditPage, auditTotalPages, setAuditPage, auditTotalDisplay)}

          {auditFloatOpen ? (
            <div className="fixed bottom-6 right-6 z-[65] w-[280px] rounded-xl border border-[#E5E7EB] bg-white p-4 shadow-xl">
              <div className="mb-2 flex items-center justify-between">
                <span className="text-[11px] font-semibold uppercase text-[#9CA3AF]">Administrator</span>
                <button type="button" className="text-green-600" aria-label="Dismiss" onClick={() => setAuditFloatOpen(false)}>
                  ✓
                </button>
              </div>
              <p className="font-bold text-[#111827]">Updated Listing</p>
              <p className="text-[12px] text-[#9CA3AF]">4m ago</p>
              <div className="mt-2 h-1 w-full rounded-full bg-[#E5E7EB]">
                <div className="h-1 w-2/3 rounded-full bg-[#B89F7C]" />
              </div>
              <p className="mt-2 text-[11px] text-[#9CA3AF]">The Obsidian Heights (PROPERTY ID: #EST-8921)</p>
            </div>
          ) : null}
        </div>
      ) : null}

      {/* Add Promotion Modal */}
      {addPromoOpen ? (
        <div className={adminModalBackdrop} onClick={() => setAddPromoOpen(false)} role="presentation">
          <div className={`${adminModalPanelWide} text-left`} onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#111827]">Add New Promotion</h3>
              <button type="button" aria-label="Close" onClick={() => setAddPromoOpen(false)}>
                <X className="h-5 w-5 text-[#6B7280]" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className={adminLabelCaps}>Promotion Title</label>
                <input
                  className={adminInput}
                  value={promoTitle}
                  onChange={(e) => setPromoTitle(e.target.value)}
                  placeholder="e.g. Autumn Penthouse Series"
                />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={adminLabelCaps}>Discount (%)</label>
                  <input className={adminInput} value={promoDiscount} onChange={(e) => setPromoDiscount(e.target.value)} placeholder="15" />
                </div>
                <div>
                  <label className={adminLabelCaps}>Duration</label>
                  <input
                    className={adminInput}
                    value={promoDuration}
                    onChange={(e) => setPromoDuration(e.target.value)}
                    placeholder="Apr 20 - Apr 25, 2026"
                  />
                </div>
              </div>
              <div>
                <label className={adminLabelCaps}>Status</label>
                <select className={adminInput} value={promoStatus} onChange={(e) => setPromoStatus(e.target.value as 'Active' | 'Inactive')}>
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
                </select>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3 border-t border-[#F3F4F6] pt-5">
              <button type="button" className="rounded-lg border border-[#E5E7EB] px-4 py-2.5 text-[14px] font-medium text-[#374151]" onClick={() => setAddPromoOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg px-5 py-2.5 text-[14px] font-semibold text-white shadow-sm"
                style={{ backgroundColor: ADMIN_ACCENT }}
                onClick={saveNewPromotion}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deletePromoId ? (
        <div className={adminModalBackdrop} onClick={() => setDeletePromoId(null)} role="presentation">
          <div className={adminModalPanel} onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#FECACA] bg-[#FEE2E2]">
              <Trash2 className="h-7 w-7 text-[#EF4444]" strokeWidth={2} />
            </div>
            <p className="text-xl font-bold text-[#111827]">Are You Sure?</p>
            <p className="mt-2 text-[14px] text-[#6B7280]">Delete this promotion? This action cannot be undone.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" className="min-w-[100px] rounded-lg border border-[#E5E7EB] px-5 py-2.5 text-[14px] font-medium" onClick={() => setDeletePromoId(null)}>
                No
              </button>
              <button
                type="button"
                className="min-w-[100px] rounded-lg px-5 py-2.5 text-[14px] font-semibold text-white"
                style={{ backgroundColor: ADMIN_ACCENT_MUTED }}
                onClick={() => {
                  setPromotions((p) => p.filter((x) => x.id !== deletePromoId))
                  setDeletePromoId(null)
                  showSuccess('Successfully', 'Promotion removed')
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Add Advertisement */}
      {addAdOpen ? (
        <div className={adminModalBackdrop} onClick={() => setAddAdOpen(false)} role="presentation">
          <div className={`max-h-[90vh] w-full max-w-lg overflow-y-auto text-left ${adminModalPanelWide}`} onClick={(e) => e.stopPropagation()}>
            <div className="mb-2 flex items-start justify-between">
              <div>
                <h3 className="text-lg font-bold text-[#111827]">Add New Advertisement</h3>
                <p className="mt-1 text-[13px] text-[#6B7280]">Upload a new campaign image and set the destination URL.</p>
              </div>
              <button type="button" onClick={() => setAddAdOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="mt-4 space-y-4">
              <div>
                <label className={adminLabelCaps}>Campaign title</label>
                <input
                  className={adminInput}
                  placeholder="e.g. Winter Luxury Collection 2024"
                  value={adTitle}
                  onChange={(e) => setAdTitle(e.target.value)}
                />
              </div>
              <div>
                <label className={adminLabelCaps}>Target link</label>
                <div className="relative">
                  <input
                    className={`${adminInput} pr-10`}
                    placeholder="https://estate.com/..."
                    value={adLink}
                    onChange={(e) => setAdLink(e.target.value)}
                  />
                  <Link2 className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                </div>
              </div>
              <div>
                <label className={adminLabelCaps}>Image upload</label>
                <button
                  type="button"
                  className="flex w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E5E7EB] py-10"
                  onClick={() => showSuccess('Successfully', 'Image selected')}
                >
                  <Upload className="mb-2 h-8 w-8 text-[#9CA3AF]" />
                  <p className="font-semibold text-[#111827]">Click or drag to upload image</p>
                  <p className="mt-1 text-[12px] text-[#9CA3AF]">High-resolution JPEG or PNG preferred (Max 5MB)</p>
                </button>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-3">
              <button type="button" className="rounded-lg border border-[#E5E7EB] px-4 py-2" onClick={() => setAddAdOpen(false)}>
                Cancel
              </button>
              <button type="button" className="rounded-lg px-5 py-2 font-semibold text-white" style={{ backgroundColor: ADMIN_ACCENT }} onClick={saveNewAd}>
                Add Advertisement
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {editAd ? (
        <div className={adminModalBackdrop} onClick={() => setEditAd(null)} role="presentation">
          <div
            className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white p-6 text-left shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-[#111827]">Edit Advertisement</h3>
              <button type="button" onClick={() => setEditAd(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="grid gap-6 lg:grid-cols-1">
              <div className="space-y-4">
                <div>
                  <label className={adminLabelCaps}>Campaign title</label>
                  <input
                    className={adminInput}
                    value={adTitle}
                    onChange={(e) => setAdTitle(e.target.value)}
                  />
                </div>
                <div>
                  <label className={adminLabelCaps}>Target link</label>
                  <input
                    className={adminInput}
                    value={adLink}
                    onChange={(e) => setAdLink(e.target.value)}
                  />
                </div>
                <div>
                  <label className={adminLabelCaps}>Campaign status</label>
                  <select
                    className={adminInput}
                    value={adStatus}
                    onChange={(e) => setAdStatus(e.target.value as 'Active' | 'Paused')}
                  >
                    <option value="Active">Active</option>
                    <option value="Paused">Paused</option>
                  </select>
                </div>
                <div>
                  <div className="mb-1 flex items-center justify-between">
                    <label className={adminLabelCaps}>Image upload</label>
                    <button type="button" className="inline-flex items-center gap-1 text-[13px] font-medium text-[#B89F7C]" onClick={() => showSuccess('Successfully', 'Image updated')}>
                      <RefreshCw className="h-4 w-4" />
                      Change Image
                    </button>
                  </div>
                  <img src={editAd.image} alt="" className="h-56 w-full rounded-xl object-cover" />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-between gap-3">
              <button type="button" className="text-[14px] font-medium text-[#374151]" onClick={() => setEditAd(null)}>
                Cancel
              </button>
              <button type="button" className="rounded-lg px-6 py-2.5 font-semibold text-white" style={{ backgroundColor: ADMIN_ACCENT }} onClick={saveEditAd}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Document preview */}
      {previewDoc ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 px-4 backdrop-blur-[10px]"
          role="presentation"
          onClick={() => setPreviewDoc(null)}
        >
          <div
            className="flex max-h-[90vh] w-full max-w-5xl flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl lg:flex-row"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex flex-1 flex-col border-b border-[#E5E7EB] p-6 lg:border-b-0 lg:border-r">
              <div className="mb-4 flex items-start justify-between">
                <div>
                  <p className="font-bold text-[#111827]">John Doe</p>
                  <p className="text-[11px] font-semibold uppercase text-[#9CA3AF]">
                    {previewDoc.fileName} • Submitted 25 May
                  </p>
                </div>
                <button type="button" onClick={() => setPreviewDoc(null)}>
                  <X className="h-5 w-5" />
                </button>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center rounded-xl bg-[#F9FAFB] py-12">
                <p className="text-4xl font-serif italic text-[#9CA3AF]">PDF</p>
                <p className="mt-2 font-medium text-[#111827]">{previewDoc.fileName}</p>
                <p className="mt-1 text-[11px] font-semibold uppercase text-[#9CA3AF]">Secure view mode active</p>
              </div>
            </div>
            <div className="w-full shrink-0 p-4 lg:w-80">
              <label className="mb-2 block text-[12px] font-medium text-[#374151]">Select Property:</label>
              <select className="mb-4 w-full rounded-lg border border-[#E5E7EB] px-3 py-2 text-[14px]">
                <option>Sunset Villa Purchase</option>
                <option>The Obsidian Heights</option>
              </select>
              <div className="max-h-[240px] space-y-2 overflow-y-auto">
                {filteredDocs.map((d, idx) => (
                  <button
                    key={d.id}
                    type="button"
                    className={`flex w-full items-center gap-2 rounded-lg border px-2 py-2 text-left text-[13px] ${
                      idx === 0 ? 'border-[#B89F7C] bg-[#FAF6F0]' : 'border-transparent hover:bg-[#F9FAFB]'
                    }`}
                  >
                    <span className="text-lg">📄</span>
                    <span className="truncate">{d.fileName}</span>
                  </button>
                ))}
              </div>
              <button
                type="button"
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold uppercase text-white"
                style={{ backgroundColor: ADMIN_ACCENT }}
                onClick={() => showSuccess('Successfully', 'Download all started')}
              >
                <Download className="h-4 w-4" />
                Download all
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Delete document */}
      {deleteDocId ? (
        <div className="fixed inset-0 z-[80] flex items-center justify-center bg-black/30 px-4 backdrop-blur-md" role="presentation">
          <div className={adminModalPanel} onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#FECACA] bg-[#FEE2E2]">
              <Trash2 className="h-7 w-7 text-[#EF4444]" />
            </div>
            <p className="text-xl font-bold text-[#111827]">Are You Sure?</p>
            <p className="mt-2 text-[14px] text-[#6B7280]">Are you sure want to delete this file?</p>
            <div className="mt-8 flex justify-center gap-3">
              <button type="button" className="min-w-[100px] rounded-lg border border-[#E5E7EB] py-2.5 font-medium" onClick={() => setDeleteDocId(null)}>
                No
              </button>
              <button
                type="button"
                className="min-w-[100px] rounded-lg py-2.5 font-semibold text-white"
                style={{ backgroundColor: ADMIN_ACCENT }}
                onClick={() => {
                  setDocs((d) => d.filter((x) => x.id !== deleteDocId))
                  setDeleteDocId(null)
                  setPreviewDoc(null)
                  setSuccess({ title: 'Deleted', subtitle: 'Document Deleted Successfully' })
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Activity details */}
      {activityDetail ? (
        <div className={adminModalBackdrop} onClick={() => setActivityDetail(null)} role="presentation">
          <div className="w-full max-w-lg rounded-2xl border border-[#E5E7EB] bg-white text-left shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <div className="flex items-center justify-between border-b border-[#E5E7EB] px-6 py-4">
              <h3 className="font-bold text-[#111827]">Activity Details</h3>
              <button type="button" onClick={() => setActivityDetail(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 p-6">
              <div className="flex gap-3">
                <img src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64" alt="" className="h-12 w-12 rounded-lg object-cover" />
                <div>
                  <p className="text-[11px] font-bold uppercase text-[#9CA3AF]">Administrator</p>
                  <p className="font-bold text-[#111827]">{activityDetail.adminName}</p>
                  <p className="text-[13px] text-[#6B7280]">{activityDetail.adminEmail}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-[#E5E7EB] pt-4 text-[13px]">
                <div>
                  <p className="text-[11px] font-bold uppercase text-[#9CA3AF]">Action type</p>
                  <p className="mt-1 font-medium">{activityDetail.action}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase text-[#9CA3AF]">Target property</p>
                  <p className="mt-1 font-medium">{activityDetail.entityTitle}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase text-[#9CA3AF]">Timestamp</p>
                  <p className="mt-1 font-medium">{activityDetail.dateTime.replace('•', '-')}</p>
                </div>
                <div>
                  <p className="text-[11px] font-bold uppercase text-[#9CA3AF]">Entity ID</p>
                  <span className="mt-1 inline-block rounded-full bg-[#F3F4F6] px-2 py-0.5 text-[12px]">#EST-8921</span>
                </div>
              </div>
              <div className="border-t border-[#E5E7EB] pt-4">
                <p className="text-[11px] font-bold uppercase text-[#9CA3AF]">Change summary</p>
                <ul className="mt-2 list-disc space-y-2 pl-5 text-[14px] text-[#374151]">
                  <li>
                    <span className="font-medium">Portfolio Status:</span> Changed from <span className="line-through">Pending</span> to Active
                  </li>
                  <li>
                    <span className="font-medium">Market Valuation:</span> Updated listing price to $12,450,000
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      <AdminSuccessModal
        open={Boolean(success)}
        title={success?.title ?? 'Successfully'}
        subtitle={success?.subtitle ?? ''}
        variant="prominent"
        hideButton
        autoCloseMs={2200}
        onClose={() => setSuccess(null)}
      />
    </AdminLayout>
  )

  function paginationFooter(page: number, totalPages: number, setPage: (n: number) => void, totalCount: number = TOTAL_ENTRIES) {
    const from = (page - 1) * PAGE_SIZE + 1
    const to = Math.min(page * PAGE_SIZE, totalCount)
    return (
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-[#E5E7EB] pt-4 text-[13px] text-[#6B7280]">
        <span>
          Showing {from}-{to} of {totalCount.toLocaleString()} entries
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            className="rounded-lg border border-[#E5E7EB] px-3 py-1.5 disabled:opacity-40"
            onClick={() => setPage(Math.max(1, page - 1))}
          >
            Previous
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              className={`min-w-[36px] rounded-lg border px-2 py-1.5 ${
                page === n ? 'border-[#3B82F6] bg-white font-semibold text-[#111827]' : 'border-[#E5E7EB] bg-white'
              }`}
              onClick={() => setPage(Math.min(totalPages, n))}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            disabled={page >= totalPages}
            className="rounded-lg px-3 py-1.5 font-semibold text-white disabled:opacity-40"
            style={{ backgroundColor: ADMIN_ACCENT }}
            onClick={() => setPage(Math.min(totalPages, page + 1))}
          >
            Next
          </button>
        </div>
      </div>
    )
  }
}
