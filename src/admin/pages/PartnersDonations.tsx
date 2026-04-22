import { useEffect, useMemo, useRef, useState } from 'react'
import {
  CircleCheck,
  CloudUpload,
  ExternalLink,
  Eye,
  Link2,
  ListFilter,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import { AdminSuccessModal } from '../components/AdminSuccessModal'
import { adminInput, adminLabelCaps, adminModalBackdrop, adminModalPanelWide } from '../lib/adminUi'
import {
  PARTNERS_TABS,
  type CampaignRow,
  type CharityRow,
  type PartnersTab,
  type SponsorPartnerRow,
  buildCampaignRows,
  buildCharityRows,
  buildSponsorRows,
} from '../data/partnersDonationsMock'

const PAGE_SIZE = 4
const TOTAL_ENTRIES = 1284

/** Figma bronze / tan primary */
const FIGMA_BRONZE = '#A89677'
const FIGMA_BRONZE_HOVER = '#978566'

const FIGMA_SHELL =
  'w-full min-w-0 overflow-hidden rounded-2xl border border-[#E6E2DB] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)]'

const TAB_ACTIVE =
  'rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm ring-1 ring-black/[0.06] transition-colors'
const TAB_INACTIVE =
  'rounded-lg px-5 py-2.5 text-[13px] font-medium text-[#4B5563] transition-colors hover:bg-[#F3F1ED] hover:text-[#111827]'

function statusBadgeClass(active: boolean) {
  return active
    ? 'rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-medium text-[#1D4ED8]'
    : 'rounded-full bg-[#FEF9C3] px-3 py-1 text-[12px] font-medium text-[#854D0E]'
}

function ToggleRow({
  label,
  description,
  checked,
  onChange,
}: {
  label: string
  description: string
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
      <div className="min-w-0">
        <p className="text-[14px] font-semibold text-[#111827]">{label}</p>
        <p className="mt-0.5 text-[12px] text-[#6B7280]">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? '' : 'bg-[#D1D5DB]'}`}
        style={checked ? { backgroundColor: FIGMA_BRONZE } : undefined}
      >
        <span
          className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${checked ? 'left-5' : 'left-0.5'}`}
        />
      </button>
    </div>
  )
}

function StatCard({
  label,
  value,
  accent = false,
  sub,
}: {
  label: string
  value: string
  accent?: boolean
  sub?: string
}) {
  return (
    <div className="rounded-[10px] border border-[#E8E4DC] bg-[#F4F3F0] px-4 py-4 sm:px-5 sm:py-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">{label}</p>
      {value ? (
        <p className={`mt-2.5 text-[28px] font-bold leading-none tracking-tight sm:text-[30px] ${accent ? '' : 'text-[#6B7280]'}`} style={accent ? { color: FIGMA_BRONZE } : undefined}>
          {value}
        </p>
      ) : null}
      {sub ? (
        <p className={`font-semibold leading-snug ${accent ? '' : 'text-[#6B7280]'} ${value ? 'mt-2 text-[12px]' : 'mt-3 text-[14px]'}`} style={accent ? { color: FIGMA_BRONZE } : undefined}>
          {sub}
        </p>
      ) : null}
    </div>
  )
}

export function PartnersDonations() {
  const [tab, setTab] = useState<PartnersTab>('charities')

  const [charities, setCharities] = useState<CharityRow[]>(() => buildCharityRows(TOTAL_ENTRIES))
  const [charityPage, setCharityPage] = useState(1)
  const [viewCharity, setViewCharity] = useState<CharityRow | null>(null)
  const [deleteCharityId, setDeleteCharityId] = useState<string | null>(null)

  const [campaigns, setCampaigns] = useState<CampaignRow[]>(() => buildCampaignRows(TOTAL_ENTRIES))
  const [campaignPage, setCampaignPage] = useState(1)
  const [campaignSearch, setCampaignSearch] = useState('')
  const [campaignStatusFilter, setCampaignStatusFilter] = useState<'all' | 'Active' | 'Inactive'>('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const [addCampaignOpen, setAddCampaignOpen] = useState(false)
  const [editCampaign, setEditCampaign] = useState<CampaignRow | null>(null)
  const [deleteCampaignId, setDeleteCampaignId] = useState<string | null>(null)

  const [sponsors, setSponsors] = useState<SponsorPartnerRow[]>(() => buildSponsorRows(TOTAL_ENTRIES))
  const [sponsorPage, setSponsorPage] = useState(1)
  const [addPartnerOpen, setAddPartnerOpen] = useState(false)
  const [editPartner, setEditPartner] = useState<SponsorPartnerRow | null>(null)
  const [deletePartnerId, setDeletePartnerId] = useState<string | null>(null)

  const [addCharityOpen, setAddCharityOpen] = useState(false)
  const [charityName, setCharityName] = useState('')
  const [charityDesc, setCharityDesc] = useState('')
  const [charityAdminActive, setCharityAdminActive] = useState(false)

  const [campTitle, setCampTitle] = useState('')
  const [campGoal, setCampGoal] = useState('')
  const [campVisible, setCampVisible] = useState(false)
  const [campStart, setCampStart] = useState('')
  const [campEnd, setCampEnd] = useState('')

  const [partnerName, setPartnerName] = useState('')
  const [partnerLink, setPartnerLink] = useState('')
  const [partnerLive, setPartnerLive] = useState(false)
  const [partnerLogoName, setPartnerLogoName] = useState<string | null>(null)

  const [success, setSuccess] = useState<{ title: string; subtitle: string } | null>(null)

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const t = e.target as Node
      if (filterRef.current && !filterRef.current.contains(t)) setFilterOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  useEffect(() => {
    setCharityPage(1)
    setCampaignPage(1)
    setSponsorPage(1)
    setCampaignSearch('')
    setCampaignStatusFilter('all')
  }, [tab])

  useEffect(() => {
    setCampaignPage(1)
  }, [campaignSearch, campaignStatusFilter])

  const charitySlice = useMemo(() => {
    const start = (charityPage - 1) * PAGE_SIZE
    return charities.slice(start, start + PAGE_SIZE)
  }, [charities, charityPage])

  const filteredCampaigns = useMemo(() => {
    let rows = campaigns
    const q = campaignSearch.trim().toLowerCase()
    if (q) rows = rows.filter((r) => `${r.title} ${r.subtitle}`.toLowerCase().includes(q))
    if (campaignStatusFilter !== 'all') rows = rows.filter((r) => r.status === campaignStatusFilter)
    return rows
  }, [campaigns, campaignSearch, campaignStatusFilter])

  const campaignSlice = useMemo(() => {
    const start = (campaignPage - 1) * PAGE_SIZE
    return filteredCampaigns.slice(start, start + PAGE_SIZE)
  }, [filteredCampaigns, campaignPage])

  const sponsorSlice = useMemo(() => {
    const start = (sponsorPage - 1) * PAGE_SIZE
    return sponsors.slice(start, start + PAGE_SIZE)
  }, [sponsors, sponsorPage])

  const charityTotalPages = Math.max(1, Math.ceil(charities.length / PAGE_SIZE))
  const campaignTotalPages = Math.max(1, Math.ceil(filteredCampaigns.length / PAGE_SIZE))
  const sponsorTotalPages = Math.max(1, Math.ceil(sponsors.length / PAGE_SIZE))

  function showSuccess(title: string, subtitle: string) {
    setSuccess({ title, subtitle })
  }

  function saveCharity() {
    setAddCharityOpen(false)
    const row: CharityRow = {
      id: `c${Date.now()}`,
      name: charityName.trim() || 'New Charity',
      partnerSince: 'PARTNER SINCE 2026',
      description: charityDesc.trim() || 'Architectural sustainability and community impact.',
      impactFocus: 'Urban Reform',
      status: charityAdminActive ? 'Active' : 'Inactive',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&q=80',
    }
    setCharities((prev) => [row, ...prev])
    setCharityName('')
    setCharityDesc('')
    setCharityAdminActive(false)
    setCharityPage(1)
    showSuccess('Successfully', 'Charity Add Successfully')
  }

  function saveCampaign(isEdit: boolean) {
    if (isEdit && editCampaign) {
      setCampaigns((prev) =>
        prev.map((c) =>
          c.id === editCampaign.id
            ? {
                ...c,
                title: campTitle.trim() || c.title,
                goal: campGoal.trim() ? `$${Number(campGoal.replace(/[^0-9.]/g, '') || 0).toLocaleString()}` : c.goal,
                status: campVisible ? 'Active' : 'Inactive',
                duration:
                  campStart && campEnd
                    ? `${new Date(campStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(campEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
                    : c.duration,
              }
            : c
        )
      )
      setEditCampaign(null)
      showSuccess('Successfully', 'Campaign updated successfully')
    } else {
      setAddCampaignOpen(false)
      const row: CampaignRow = {
        id: `camp${Date.now()}`,
        title: campTitle.trim() || 'New Campaign Portfolio',
        subtitle: 'Heritage Preservation • London',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80',
        goal: campGoal.trim() ? `$${Number(campGoal.replace(/[^0-9.]/g, '') || 0).toLocaleString()}` : '$500,000',
        raisedPct: 12,
        duration:
          campStart && campEnd
            ? `${new Date(campStart).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${new Date(campEnd).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`
            : 'Apr 20 - Apr 25, 2026',
        status: campVisible ? 'Active' : 'Inactive',
      }
      setCampaigns((prev) => [row, ...prev])
      showSuccess('Successfully', 'Campaign Create Successfully')
    }
    setCampTitle('')
    setCampGoal('')
    setCampVisible(false)
    setCampStart('')
    setCampEnd('')
    setCampaignPage(1)
  }

  function openEditCampaign(row: CampaignRow) {
    setEditCampaign(row)
    setCampTitle(row.title)
    setCampGoal(row.goal.replace(/[$,]/g, ''))
    setCampVisible(row.status === 'Active')
    setCampStart('')
    setCampEnd('')
  }

  function savePartner(isEdit: boolean) {
    if (isEdit && editPartner) {
      setSponsors((prev) =>
        prev.map((p) =>
          p.id === editPartner.id
            ? {
                ...p,
                title: partnerName.trim() || p.title,
                link: partnerLink.replace(/^https?:\/\//i, '').replace(/\/$/, '') || p.link,
                status: partnerLive ? 'Active' : 'Inactive',
              }
            : p
        )
      )
      setEditPartner(null)
      showSuccess('Successfully', 'Partner updated successfully')
    } else {
      setAddPartnerOpen(false)
      const row: SponsorPartnerRow = {
        id: `s${Date.now()}`,
        title: partnerName.trim() || 'New Partner',
        subtitle: 'Heritage Preservation • London',
        logo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&q=80',
        link: partnerLink.replace(/^https?:\/\//i, '').replace(/\/$/, '') || 'example.com',
        status: partnerLive ? 'Active' : 'Inactive',
      }
      setSponsors((prev) => [row, ...prev])
      showSuccess('Successfully', 'Partner Add Successfully')
    }
    setPartnerName('')
    setPartnerLink('')
    setPartnerLive(false)
    setPartnerLogoName(null)
    setSponsorPage(1)
  }

  function openEditPartner(p: SponsorPartnerRow) {
    setEditPartner(p)
    setPartnerName(p.title)
    setPartnerLink(`https://${p.link}`)
    setPartnerLive(p.status === 'Active')
    setPartnerLogoName(null)
  }

  function paginationFooter(
    page: number,
    totalPages: number,
    setPage: (n: number) => void,
    totalCount: number
  ) {
    const from = totalCount === 0 ? 0 : (page - 1) * PAGE_SIZE + 1
    const to = Math.min(page * PAGE_SIZE, totalCount)
    return (
      <div className="mt-0 flex flex-wrap items-center justify-between gap-3 border-t border-[#ECEAE6] px-4 py-4 text-[13px] text-[#6B7280] sm:px-5">
        <span>
          Showing {from}-{to} of {totalCount.toLocaleString()} entries
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            disabled={page <= 1}
            className="rounded-lg border border-[#E5E7EB] bg-white px-3 py-1.5 disabled:opacity-40"
            onClick={() => setPage(Math.max(1, page - 1))}
          >
            Previous
          </button>
          {[1, 2, 3].map((n) => (
            <button
              key={n}
              type="button"
              className={`min-w-[38px] rounded-lg border px-2 py-1.5 text-[13px] ${
                page === n
                  ? 'border-[#C5D5E8] bg-[#E8EDF4] font-semibold text-[#1F2937]'
                  : 'border-[#E5E7EB] bg-[#FAFAFA] font-medium text-[#4B5563] hover:bg-white'
              }`}
              onClick={() => setPage(Math.min(totalPages, n))}
            >
              {n}
            </button>
          ))}
          <button
            type="button"
            disabled={page >= totalPages}
            className="rounded-lg px-3 py-1.5 text-[13px] font-semibold text-white shadow-sm transition-colors hover:opacity-95 disabled:opacity-40"
            style={{ backgroundColor: FIGMA_BRONZE }}
            onClick={() => setPage(Math.min(totalPages, page + 1))}
          >
            Next
          </button>
        </div>
      </div>
    )
  }

  const registrySubtitle =
    'Manage institutional relationships and social impact partnerships across the curated real estate portfolio.'

  return (
    <AdminLayout title="Partners & Donations">
      <div className="mx-auto w-full pb-8">
        <div className={FIGMA_SHELL}>
          <div className="border-b border-[#EDE9E3] bg-[#FAF9F7] px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex flex-wrap gap-2">
              {PARTNERS_TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={tab === t.key ? TAB_ACTIVE : TAB_INACTIVE}
                  style={tab === t.key ? { backgroundColor: FIGMA_BRONZE } : undefined}
                  onClick={() => setTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white px-4 py-6 sm:px-8 sm:py-8">
        {tab === 'charities' ? (
          <>
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="font-serif text-[24px] font-bold leading-tight tracking-tight text-[#111827] sm:text-[26px]">
                  Global Charity Registry
                </h2>
                <p className="mt-2 max-w-[540px] text-[13px] leading-relaxed text-[#6B7280]">{registrySubtitle}</p>
              </div>
              <button
                type="button"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-colors hover:opacity-95"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                }}
                onClick={() => setAddCharityOpen(true)}
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                + ADD CHARITY
              </button>
            </div>

            <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
              <StatCard label="Active partners" value="24" />
              <StatCard label="Annual goal" value="$1.2M" accent />
              <StatCard label="Impact reached" value="12k+" accent />
              <StatCard label="Open campaigns" value="08" />
            </div>

            <div className="overflow-hidden rounded-xl border border-[#E8E4DC] bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-[720px] w-full border-collapse text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-[#ECEAE6] bg-[#FAFAF9] text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
                      <th className="px-5 py-3.5 font-bold">Name</th>
                      <th className="px-5 py-3.5 font-bold">Description</th>
                      <th className="px-5 py-3.5 font-bold">Impact focus</th>
                      <th className="px-5 py-3.5 font-bold">Status</th>
                      <th className="px-5 py-3.5 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {charitySlice.map((row) => (
                      <tr key={row.id} className="border-b border-[#F3F2EF] last:border-0">
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <img src={row.avatar} alt="" className="h-11 w-11 rounded-full object-cover ring-2 ring-[#F59E0B]/90" />
                            <div className="min-w-0">
                              <p className="truncate font-bold text-[#111827]">{row.name}</p>
                              <p className="text-[10px] font-bold uppercase tracking-wide text-[#9CA3AF]">{row.partnerSince}</p>
                            </div>
                          </div>
                        </td>
                        <td className="max-w-[220px] px-5 py-5 text-[#6B7280]">
                          <p className="line-clamp-2 leading-relaxed">{row.description}</p>
                        </td>
                        <td className="px-5 py-5 font-medium text-[#374151]">{row.impactFocus}</td>
                        <td className="px-5 py-5">
                          <span className={statusBadgeClass(row.status === 'Active')}>{row.status}</span>
                        </td>
                        <td className="px-5 py-5">
                          <div className="flex justify-end gap-2">
                            <button
                              type="button"
                              className="rounded-lg p-2 text-[#111827] hover:bg-[#F3F4F6]"
                              aria-label="View charity"
                              onClick={() => setViewCharity(row)}
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              className="rounded-lg p-2 text-[#EF4444] hover:bg-red-50"
                              aria-label="Delete charity"
                              onClick={() => setDeleteCharityId(row.id)}
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
              {paginationFooter(charityPage, charityTotalPages, setCharityPage, charities.length)}
            </div>
          </>
        ) : null}

        {tab === 'campaigns' ? (
          <>
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="font-serif text-[24px] font-bold leading-tight tracking-tight text-[#111827] sm:text-[26px]">
                  Active Campaigns Portfolio
                </h2>
                <p className="mt-2 max-w-[540px] text-[13px] leading-relaxed text-[#6B7280]">{registrySubtitle}</p>
              </div>
              <button
                type="button"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-colors hover:opacity-95"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                }}
                onClick={() => setAddCampaignOpen(true)}
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                + ADD CAMPAIGN
              </button>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <div className="rounded-[10px] border border-[#E8E4DC] bg-[#F4F3F0] px-5 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">Active funding</p>
                <p className="mt-2.5 text-[26px] font-bold tracking-tight text-[#111827] sm:text-[28px]">$4,850,000</p>
                <p className="mt-2 text-[12px] font-semibold text-[#16A34A]">+12.5% from last quarter</p>
              </div>
              <div className="rounded-[10px] border border-[#E8E4DC] bg-[#F4F3F0] px-5 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">Active projects</p>
                <p className="mt-2.5 text-[26px] font-bold tracking-tight sm:text-[28px]" style={{ color: FIGMA_BRONZE }}>
                  18
                </p>
                <p className="mt-2 text-[12px] text-[#6B7280]">4 concluding this month</p>
              </div>
              <div className="rounded-[10px] border border-[#E8E4DC] bg-[#F4F3F0] px-5 py-5">
                <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">Total partners</p>
                <p className="mt-2.5 text-[26px] font-bold tracking-tight sm:text-[28px]" style={{ color: FIGMA_BRONZE }}>
                  142
                </p>
                <p className="mt-2 text-[12px] text-[#6B7280]">Across 12 regions</p>
              </div>
            </div>

            <div className="overflow-hidden rounded-xl border border-[#E8E4DC] bg-white">
              <div className="flex flex-col gap-3 border-b border-[#ECEAE6] bg-[#FAFAF9] px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-3.5">
                <div className="relative w-full min-w-0 sm:max-w-[320px]">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  <input
                    type="search"
                    placeholder="Search campaigns..."
                    className={`${adminInput} border-[#E5E2DC] bg-white pl-9`}
                    value={campaignSearch}
                    onChange={(e) => setCampaignSearch(e.target.value)}
                  />
                </div>
                <div className="relative shrink-0" ref={filterRef}>
                  <button
                    type="button"
                    className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-lg border border-[#E5E2DC] bg-white px-4 text-[13px] font-medium text-[#374151] shadow-sm hover:bg-[#F9FAFB] sm:w-auto"
                    onClick={() => setFilterOpen((o) => !o)}
                  >
                    <ListFilter className="h-4 w-4 text-[#6B7280]" />
                    Filter
                  </button>
                  {filterOpen ? (
                    <div className="absolute right-0 z-20 mt-1 w-48 rounded-xl border border-[#E8E4DC] bg-white py-1 shadow-lg">
                      {(['all', 'Active', 'Inactive'] as const).map((opt) => (
                        <button
                          key={opt}
                          type="button"
                          className="block w-full px-4 py-2.5 text-left text-[13px] text-[#374151] hover:bg-[#FAF9F7]"
                          onClick={() => {
                            setCampaignStatusFilter(opt === 'all' ? 'all' : opt)
                            setFilterOpen(false)
                          }}
                        >
                          {opt === 'all' ? 'All statuses' : opt}
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
              <div className="overflow-x-auto">
                <table className="min-w-[900px] w-full border-collapse text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-[#ECEAE6] bg-white text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
                      <th className="px-5 py-3.5 font-bold">Title</th>
                      <th className="px-5 py-3.5 font-bold">Goal amount</th>
                      <th className="px-5 py-3.5 font-bold">Duration</th>
                      <th className="px-5 py-3.5 font-bold">Status</th>
                      <th className="px-5 py-3.5 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {campaignSlice.map((row) => (
                      <tr key={row.id} className="border-b border-[#F3F2EF] last:border-0">
                        <td className="px-5 py-5">
                          <div className="flex items-center gap-3">
                            <img src={row.image} alt="" className="h-[52px] w-[76px] shrink-0 rounded-lg object-cover shadow-sm" />
                            <div className="min-w-0">
                              <p className="truncate font-bold text-[#111827]">{row.title}</p>
                              <p className="truncate text-[12px] text-[#6B7280]">{row.subtitle}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5">
                          <p className="font-semibold text-[#111827]">{row.goal}</p>
                          <div className="mt-2.5 h-2 w-full max-w-[200px] overflow-hidden rounded-full bg-[#E8E4DC]">
                            <div
                              className="h-full rounded-full transition-all"
                              style={{ width: `${row.raisedPct}%`, backgroundColor: FIGMA_BRONZE }}
                            />
                          </div>
                        </td>
                        <td className="whitespace-nowrap px-5 py-5 text-[#374151]">{row.duration}</td>
                        <td className="px-5 py-5">
                          <span className={statusBadgeClass(row.status === 'Active')}>{row.status}</span>
                        </td>
                        <td className="px-5 py-5">
                          <div className="flex justify-end gap-0.5">
                            <button
                              type="button"
                              className="rounded-lg p-2 transition-colors hover:bg-[#FAF6F0]"
                              style={{ color: FIGMA_BRONZE }}
                              aria-label="Edit campaign"
                              onClick={() => openEditCampaign(row)}
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              className="rounded-lg p-2 text-[#111827] hover:bg-[#F3F4F6]"
                              aria-label="View campaign"
                              onClick={() => showSuccess('Successfully', `Opened “${row.title}” (preview)`)}
                            >
                              <Eye className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              className="rounded-lg p-2 text-[#EF4444] hover:bg-red-50"
                              aria-label="Delete campaign"
                              onClick={() => setDeleteCampaignId(row.id)}
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
              {paginationFooter(campaignPage, campaignTotalPages, setCampaignPage, filteredCampaigns.length)}
            </div>
          </>
        ) : null}

        {tab === 'sponsors' ? (
          <>
            <div className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">
              <div className="min-w-0">
                <h2 className="font-serif text-[24px] font-bold leading-tight tracking-tight text-[#111827] sm:text-[26px]">
                  Global Charity Registry
                </h2>
                <p className="mt-2 max-w-[540px] text-[13px] leading-relaxed text-[#6B7280]">{registrySubtitle}</p>
              </div>
              <button
                type="button"
                className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-lg px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-colors hover:opacity-95"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                }}
                onClick={() => setAddPartnerOpen(true)}
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                + ADD PARTNER
              </button>
            </div>

            <div className="mb-8 grid grid-cols-1 gap-3 sm:grid-cols-3 sm:gap-4">
              <StatCard label="Active sponsors" value="24" accent />
              <StatCard label="Total valuation" value="$1.2M" accent />
              <StatCard label="Upcoming renewals" value="" accent sub="3 contracts expiring this month" />
            </div>

            <div className="overflow-hidden rounded-xl border border-[#E8E4DC] bg-white">
              <div className="overflow-x-auto">
                <table className="min-w-[800px] w-full border-collapse text-left text-[13px]">
                  <thead>
                    <tr className="border-b border-[#ECEAE6] bg-[#FAFAF9] text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
                      <th className="px-5 py-3.5 font-bold">Name &amp; identity</th>
                      <th className="px-5 py-3.5 font-bold text-center">Logo</th>
                      <th className="px-5 py-3.5 font-bold">Access link</th>
                      <th className="px-5 py-3.5 font-bold">Status</th>
                      <th className="px-5 py-3.5 text-right font-bold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {sponsorSlice.map((row) => (
                      <tr key={row.id} className="border-b border-[#F3F2EF] last:border-0">
                        <td className="px-5 py-5">
                          <p className="font-bold text-[#111827]">{row.title}</p>
                          <p className="text-[12px] text-[#6B7280]">{row.subtitle}</p>
                        </td>
                        <td className="px-5 py-5">
                          <div className="flex justify-center">
                            <div className="rounded-lg bg-[#FFEDD5] p-0.5 ring-1 ring-[#FDBA74]/60">
                              <img src={row.logo} alt="" className="h-11 w-11 rounded-md object-cover" />
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-5">
                          <a
                            href={`https://${row.link}`}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#111827] underline decoration-[#D1D5DB] underline-offset-2 transition-colors hover:decoration-[#A89677]"
                          >
                            {row.link}
                            <ExternalLink className="h-3.5 w-3.5 shrink-0 text-[#6B7280]" />
                          </a>
                        </td>
                        <td className="px-5 py-5">
                          <span className={statusBadgeClass(row.status === 'Active')}>{row.status}</span>
                        </td>
                        <td className="px-5 py-5">
                          <div className="flex justify-end gap-0.5">
                            <button
                              type="button"
                              className="rounded-lg border border-[#E8DCC8] bg-[#FAF6F0] p-2 transition-colors hover:bg-[#F5EBDD]"
                              style={{ color: FIGMA_BRONZE }}
                              aria-label="Edit partner"
                              onClick={() => openEditPartner(row)}
                            >
                              <Pencil className="h-4 w-4" />
                            </button>
                            <button
                              type="button"
                              className="rounded-lg p-2 text-[#EF4444] hover:bg-red-50"
                              aria-label="Delete partner"
                              onClick={() => setDeletePartnerId(row.id)}
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
              {paginationFooter(sponsorPage, sponsorTotalPages, setSponsorPage, sponsors.length)}
            </div>
          </>
        ) : null}
          </div>
        </div>
      </div>

      {/* Add charity */}
      {addCharityOpen ? (
        <div className={adminModalBackdrop} role="presentation" onClick={() => setAddCharityOpen(false)}>
          <div className={adminModalPanelWide} onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-start justify-between gap-4">
              <h3 className="text-left text-xl font-bold text-[#111827]">Add Charity</h3>
              <button type="button" className="rounded-lg p-1 text-[#6B7280] hover:bg-[#F3F4F6]" onClick={() => setAddCharityOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 text-left">
              <div>
                <label className={adminLabelCaps}>Charity name</label>
                <input
                  className={adminInput}
                  placeholder="e.g. The Metropolitan Conservatory"
                  value={charityName}
                  onChange={(e) => setCharityName(e.target.value)}
                />
              </div>
              <div>
                <label className={adminLabelCaps}>Description</label>
                <textarea
                  className={`${adminInput} min-h-[100px] resize-y`}
                  placeholder="Briefly describe the architectural impact and community focus of the charity..."
                  value={charityDesc}
                  onChange={(e) => setCharityDesc(e.target.value)}
                />
              </div>
              <ToggleRow
                label="Administrative Status"
                description="Active charities appear in donor portfolios."
                checked={charityAdminActive}
                onChange={setCharityAdminActive}
              />
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button type="button" className="px-2 py-2 text-[14px] font-semibold text-[#6B7280]" onClick={() => setAddCharityOpen(false)}>
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-colors hover:opacity-95"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                }}
                onClick={saveCharity}
              >
                Save Charity
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* View charity */}
      {viewCharity ? (
        <div className={adminModalBackdrop} role="presentation" onClick={() => setViewCharity(null)}>
          <div className={adminModalPanelWide} onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-start justify-between">
              <div className="flex items-center gap-3">
                <img src={viewCharity.avatar} alt="" className="h-14 w-14 rounded-full object-cover ring-2 ring-[#FDBA74]" />
                <div>
                  <h3 className="text-left text-lg font-bold text-[#111827]">{viewCharity.name}</h3>
                  <p className="text-[11px] font-bold uppercase text-[#9CA3AF]">{viewCharity.partnerSince}</p>
                </div>
              </div>
              <button type="button" onClick={() => setViewCharity(null)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <p className="text-left text-[14px] leading-relaxed text-[#374151]">{viewCharity.description}</p>
            <div className="mt-4 flex flex-wrap gap-2 text-left">
              <span className="rounded-full bg-[#F3F4F6] px-3 py-1 text-[12px] font-medium">{viewCharity.impactFocus}</span>
              <span className={statusBadgeClass(viewCharity.status === 'Active')}>{viewCharity.status}</span>
            </div>
          </div>
        </div>
      ) : null}

      {/* Delete charity */}
      {deleteCharityId ? (
        <div className={adminModalBackdrop} role="presentation" onClick={() => setDeleteCharityId(null)}>
          <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-lg font-bold text-[#111827]">Remove charity?</p>
            <p className="mt-2 text-[14px] text-[#6B7280]">This action removes the row from the mock registry.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" className="rounded-lg border border-[#E5E7EB] px-5 py-2 font-medium" onClick={() => setDeleteCharityId(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-[#EF4444] px-5 py-2 font-semibold text-white"
                onClick={() => {
                  setCharities((c) => c.filter((x) => x.id !== deleteCharityId))
                  setDeleteCharityId(null)
                  showSuccess('Successfully', 'Charity removed')
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* New / edit campaign */}
      {addCampaignOpen || editCampaign ? (
        <div
          className={adminModalBackdrop}
          role="presentation"
          onClick={() => {
            setAddCampaignOpen(false)
            setEditCampaign(null)
            setCampTitle('')
            setCampGoal('')
            setCampVisible(false)
            setCampStart('')
            setCampEnd('')
          }}
        >
          <div className={adminModalPanelWide} onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 text-left">
              <h3 className="text-xl font-bold text-[#111827]">{editCampaign ? 'Edit campaign' : 'New Campaign Portfolio'}</h3>
              {!editCampaign ? (
                <p className="mt-1 text-[13px] text-[#6B7280]">Define the parameters for your architectural preservation initiative.</p>
              ) : null}
            </div>
            <div className="space-y-4 text-left">
              <div>
                <label className={adminLabelCaps}>Campaign title</label>
                <input className={adminInput} placeholder="e.g. Victorian Estate Restoration" value={campTitle} onChange={(e) => setCampTitle(e.target.value)} />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className={adminLabelCaps}>Goal amount</label>
                  <div className="relative">
                    <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#6B7280]">$</span>
                    <input
                      className={`${adminInput} pl-7`}
                      placeholder="0.00"
                      value={campGoal}
                      onChange={(e) => setCampGoal(e.target.value)}
                    />
                  </div>
                </div>
                <div className="flex items-end pb-1">
                  <ToggleRow
                    label="Visible to Public"
                    description="Toggle active visibility for donors."
                    checked={campVisible}
                    onChange={setCampVisible}
                  />
                </div>
              </div>
              <div>
                <label className={adminLabelCaps}>Duration period</label>
                <div className="grid gap-3 sm:grid-cols-2">
                  <input className={adminInput} type="date" value={campStart} onChange={(e) => setCampStart(e.target.value)} />
                  <input className={adminInput} type="date" value={campEnd} onChange={(e) => setCampEnd(e.target.value)} />
                </div>
              </div>
            </div>
            <div className="mt-8 flex justify-between gap-3">
              <button
                type="button"
                className="px-2 py-2 text-[14px] font-semibold text-[#6B7280]"
                onClick={() => {
                  setAddCampaignOpen(false)
                  setEditCampaign(null)
                  setCampTitle('')
                  setCampGoal('')
                  setCampVisible(false)
                  setCampStart('')
                  setCampEnd('')
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-colors hover:opacity-95"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                }}
                onClick={() => saveCampaign(Boolean(editCampaign))}
              >
                {editCampaign ? 'Save changes' : 'Create Campaign'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteCampaignId ? (
        <div className={adminModalBackdrop} role="presentation" onClick={() => setDeleteCampaignId(null)}>
          <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-lg font-bold text-[#111827]">Delete campaign?</p>
            <p className="mt-2 text-[14px] text-[#6B7280]">This removes the campaign from the mock list.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" className="rounded-lg border border-[#E5E7EB] px-5 py-2 font-medium" onClick={() => setDeleteCampaignId(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-[#EF4444] px-5 py-2 font-semibold text-white"
                onClick={() => {
                  setCampaigns((c) => c.filter((x) => x.id !== deleteCampaignId))
                  setDeleteCampaignId(null)
                  showSuccess('Successfully', 'Campaign deleted')
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Add / edit partner */}
      {addPartnerOpen || editPartner ? (
        <div
          className={adminModalBackdrop}
          role="presentation"
          onClick={() => {
            setAddPartnerOpen(false)
            setEditPartner(null)
            setPartnerName('')
            setPartnerLink('')
            setPartnerLive(false)
            setPartnerLogoName(null)
          }}
        >
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xl sm:p-8" onClick={(e) => e.stopPropagation()}>
            <div className="mb-6 flex items-start justify-between gap-4 text-left">
              <div>
                <h3 className="text-xl font-bold text-[#111827]">{editPartner ? 'Edit partner' : 'Add Partner'}</h3>
                {!editPartner ? (
                  <p className="mt-1 text-[13px] text-[#6B7280]">Configure a new architectural sponsorship node.</p>
                ) : null}
              </div>
              <button
                type="button"
                className="rounded-lg p-1 text-[#6B7280] hover:bg-[#F3F4F6]"
                onClick={() => {
                  setAddPartnerOpen(false)
                  setEditPartner(null)
                  setPartnerName('')
                  setPartnerLink('')
                  setPartnerLive(false)
                  setPartnerLogoName(null)
                }}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-4 text-left">
              <div>
                <label className={adminLabelCaps}>Partner name</label>
                <input className={adminInput} placeholder="e.g. Modernist Group" value={partnerName} onChange={(e) => setPartnerName(e.target.value)} />
              </div>
              <div>
                <label className={adminLabelCaps}>Link</label>
                <div className="relative">
                  <Link2 className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                  <input className={`${adminInput} pl-9`} placeholder="https://..." value={partnerLink} onChange={(e) => setPartnerLink(e.target.value)} />
                </div>
              </div>
              <div>
                <label className={adminLabelCaps}>Logo &amp; branding</label>
                <label className="mt-1 flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E5E7EB] bg-[#FAFAFA] px-4 py-10 text-center hover:border-[#B89F7C]/50">
                  <CloudUpload className="mb-2 h-10 w-10 text-[#9CA3AF]" />
                  <span className="text-[14px] font-semibold text-[#111827]">Drop logo file here</span>
                  <span className="mt-1 text-[12px] text-[#6B7280]">SVG, PNG or JPG (min 400×400px)</span>
                  <input
                    type="file"
                    accept="image/*,.svg"
                    className="sr-only"
                    onChange={(e) => {
                      const f = e.target.files?.[0]
                      setPartnerLogoName(f?.name ?? null)
                    }}
                  />
                  {partnerLogoName ? <span className="mt-2 text-[12px] font-medium text-[#B89F7C]">{partnerLogoName}</span> : null}
                </label>
              </div>
              <ToggleRow
                label="Live Status"
                description="Enable this partner on public directories immediately."
                checked={partnerLive}
                onChange={setPartnerLive}
              />
            </div>
            <div className="mt-8 flex justify-end gap-3">
              <button
                type="button"
                className="px-2 py-2 text-[14px] font-semibold text-[#6B7280]"
                onClick={() => {
                  setAddPartnerOpen(false)
                  setEditPartner(null)
                  setPartnerName('')
                  setPartnerLink('')
                  setPartnerLive(false)
                  setPartnerLogoName(null)
                }}
              >
                Cancel
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-lg px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition-colors hover:opacity-95"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                }}
                onClick={() => savePartner(Boolean(editPartner))}
              >
                <CircleCheck className="h-4 w-4" />
                {editPartner ? 'Save partner' : 'Add Partner'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deletePartnerId ? (
        <div className={adminModalBackdrop} role="presentation" onClick={() => setDeletePartnerId(null)}>
          <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-lg font-bold text-[#111827]">Delete partner?</p>
            <p className="mt-2 text-[14px] text-[#6B7280]">This removes the partner from the mock list.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" className="rounded-lg border border-[#E5E7EB] px-5 py-2 font-medium" onClick={() => setDeletePartnerId(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-[#EF4444] px-5 py-2 font-semibold text-white"
                onClick={() => {
                  setSponsors((p) => p.filter((x) => x.id !== deletePartnerId))
                  setDeletePartnerId(null)
                  showSuccess('Successfully', 'Partner deleted')
                }}
              >
                Delete
              </button>
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
}
