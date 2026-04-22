import { useEffect, useMemo, useRef, useState } from 'react'
import { Funnel, Search } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import {
  MOCK_LISTING,
  MOCK_RECRUITMENT,
  MOCK_REGISTRATION,
  MOCK_SERVICES,
  MOCK_TRAFFIC,
  REPORT_TABS,
  type ReportTab,
} from '../data/reportsMock'

const TAB_INACTIVE = 'bg-[#F5F4F0] text-[#111827] border border-[#E8E6E1] hover:border-[#B89F7C]/35'
const TAB_ACTIVE = 'bg-[#B89F7C] text-white border border-[#B89F7C] shadow-sm'

function badgeApproved() {
  return 'inline-flex rounded-full bg-[#DCFCE7] px-3 py-1 text-[12px] font-medium text-[#166534]'
}
function badgePending() {
  return 'inline-flex rounded-full bg-[#FEF9C3] px-3 py-1 text-[12px] font-medium text-[#854D0E]'
}
function badgeActive() {
  return 'inline-flex rounded-full bg-[#DCFCE7] px-3 py-1 text-[12px] font-medium text-[#14532D]'
}
export function ReportsAnalytics() {
  const [tab, setTab] = useState<ReportTab>('recruitment')
  const [search, setSearch] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<string>('All')
  const [toast, setToast] = useState<string | null>(null)

  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function close(e: MouseEvent) {
      const t = e.target as Node
      if (filterRef.current && !filterRef.current.contains(t)) setFilterOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  useEffect(() => {
    if (!toast) return
    const id = window.setTimeout(() => setToast(null), 2200)
    return () => window.clearTimeout(id)
  }, [toast])

  const filteredRegistration = useMemo(() => {
    let rows = MOCK_REGISTRATION
    if (statusFilter === 'Active') rows = rows.filter((r) => r.status === 'Active')
    const q = search.trim().toLowerCase()
    if (q) rows = rows.filter((r) => [r.id, r.name, r.email, r.phone, r.status, r.date].some((c) => c.toLowerCase().includes(q)))
    return rows
  }, [search, statusFilter])

  const filteredRecruitment = useMemo(() => {
    let rows = MOCK_RECRUITMENT
    if (statusFilter === 'Pending') rows = rows.filter((r) => r.status === 'Pending')
    if (statusFilter === 'Approved') rows = rows.filter((r) => r.status === 'Approved')
    const q = search.trim().toLowerCase()
    if (q) rows = rows.filter((r) => [r.id, r.name, r.role, r.license, r.status, r.joinDate].some((c) => String(c).toLowerCase().includes(q)))
    return rows
  }, [search, statusFilter])

  const filteredListing = useMemo(() => {
    let rows = MOCK_LISTING
    if (statusFilter === 'Active') rows = rows.filter((r) => r.status === 'Active')
    const q = search.trim().toLowerCase()
    if (q) rows = rows.filter((r) => [r.listingId, r.property, r.type, r.category, r.status, r.joinDate, r.views].some((c) => c.toLowerCase().includes(q)))
    return rows
  }, [search, statusFilter])

  const filteredServices = useMemo(() => {
    let rows = MOCK_SERVICES
    if (statusFilter === 'Active') rows = rows.filter((r) => r.status === 'Active')
    const q = search.trim().toLowerCase()
    if (q) rows = rows.filter((r) => [r.listingId, r.property, r.serviceType, r.status, r.date].some((c) => c.toLowerCase().includes(q)))
    return rows
  }, [search, statusFilter])

  const filteredTraffic = useMemo(() => {
    let rows = MOCK_TRAFFIC
    if (statusFilter !== 'All' && ['Customer', 'Agent', 'Broker'].includes(statusFilter)) {
      rows = rows.filter((r) => r.userType === statusFilter)
    }
    const q = search.trim().toLowerCase()
    if (q) rows = rows.filter((r) => [r.userType, r.visits, r.pageViews, r.duration, r.date].some((c) => c.toLowerCase().includes(q)))
    return rows
  }, [search, statusFilter])

  function filterOptionsForTab(): { value: string; label: string }[] {
    switch (tab) {
      case 'registration':
        return [
          { value: 'All', label: 'All statuses' },
          { value: 'Active', label: 'Active only' },
        ]
      case 'recruitment':
        return [
          { value: 'All', label: 'All statuses' },
          { value: 'Approved', label: 'Approved' },
          { value: 'Pending', label: 'Pending' },
        ]
      case 'listing':
      case 'services':
        return [
          { value: 'All', label: 'All statuses' },
          { value: 'Active', label: 'Active' },
        ]
      case 'traffic':
        return [
          { value: 'All', label: 'All user types' },
          { value: 'Customer', label: 'Customer' },
          { value: 'Agent', label: 'Agent' },
          { value: 'Broker', label: 'Broker' },
        ]
      default:
        return [{ value: 'All', label: 'All' }]
    }
  }

  useEffect(() => {
    setStatusFilter('All')
  }, [tab])

  return (
    <AdminLayout title="Reports & Analytics">
      {toast ? (
        <div className="fixed bottom-6 left-1/2 z-[80] -translate-x-1/2 rounded-lg border border-[#E5E7EB] bg-white px-4 py-2 text-[13px] font-medium text-[#111827] shadow-lg">
          {toast}
        </div>
      ) : null}

      <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">
        {REPORT_TABS.map(({ key, label }) => (
          <button
            key={key}
            type="button"
            onClick={() => setTab(key)}
            className={`w-full rounded-xl px-4 py-2.5 text-center text-[14px] font-semibold transition sm:px-5 sm:py-3 sm:text-[15px] ${tab === key ? TAB_ACTIVE : TAB_INACTIVE}`}
          >
            {label}
          </button>
        ))}
      </div>

      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" strokeWidth={1.75} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full rounded-full border border-[#E5E7EB] bg-[#F3F4F6] py-3 pl-12 pr-4 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#B89F7C] focus:bg-white focus:ring-2 focus:ring-[#B89F7C]/20"
          />
        </div>
        <div className="relative" ref={filterRef}>
          <button
            type="button"
            onClick={() => setFilterOpen((v) => !v)}
            className={`flex h-12 w-12 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:bg-[#F9FAFB] ${filterOpen ? 'ring-2 ring-[#B89F7C]/25' : ''}`}
            aria-label="Filter"
          >
            <Funnel className="h-5 w-5" />
          </button>
          {filterOpen ? (
            <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-[#E5E7EB] bg-white py-2 shadow-lg">
              {filterOptionsForTab().map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  className={`w-full px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB] ${statusFilter === opt.value ? 'font-semibold text-[#B89F7C]' : 'text-[#374151]'}`}
                  onClick={() => {
                    setStatusFilter(opt.value)
                    setFilterOpen(false)
                  }}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="overflow-x-auto rounded-[10px] border border-[#E5E7EB] bg-white shadow-sm">
        {tab === 'registration' ? (
          <table className="w-full min-w-[720px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                {['ID', 'Name', 'Email', 'Phone', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRegistration.map((row, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] transition-colors hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3 text-[#6B7280]">{row.id}</td>
                  <td className="px-4 py-3 font-medium text-[#111827]">{row.name}</td>
                  <td className="px-4 py-3 text-[#374151]">{row.email}</td>
                  <td className="px-4 py-3 text-[#374151]">{row.phone}</td>
                  <td className="px-4 py-3">
                    <span className={badgeActive()}>{row.status}</span>
                  </td>
                  <td className="px-4 py-3 text-[#374151]">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {tab === 'recruitment' ? (
          <table className="w-full min-w-[800px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                {['ID', 'Name', 'Role', 'License', 'Status', 'Join Date'].map((h) => (
                  <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRecruitment.map((row, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] transition-colors hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3 text-[#6B7280]">{row.id}</td>
                  <td className="px-4 py-3 font-medium text-[#111827]">{row.name}</td>
                  <td className="px-4 py-3 text-[#374151]">{row.role}</td>
                  <td className="px-4 py-3 text-[#374151]">{row.license}</td>
                  <td className="px-4 py-3">
                    <span className={row.status === 'Pending' ? badgePending() : badgeApproved()}>{row.status}</span>
                  </td>
                  <td className="px-4 py-3 text-[#374151]">{row.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {tab === 'listing' ? (
          <table className="w-full min-w-[900px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                {['Listing ID', 'Property', 'Type', 'Category', 'Status', 'Join Date', 'Views'].map((h) => (
                  <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredListing.map((row, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] transition-colors hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3 text-[#6B7280]">{row.listingId}</td>
                  <td className="px-4 py-3 font-medium text-[#111827]">{row.property}</td>
                  <td className="px-4 py-3 text-[#374151]">{row.type}</td>
                  <td className="px-4 py-3 text-[#374151]">{row.category}</td>
                  <td className="px-4 py-3">
                    <span className={badgeActive()}>{row.status}</span>
                  </td>
                  <td className="px-4 py-3 text-[#374151]">{row.joinDate}</td>
                  <td className="px-4 py-3 font-medium text-[#111827]">{row.views}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {tab === 'services' ? (
          <table className="w-full min-w-[720px] text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                {['Listing ID', 'Property', 'Service Type', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredServices.map((row, i) => (
                <tr key={i} className="border-b border-[#E5E7EB] transition-colors hover:bg-[#FAFAFA]">
                  <td className="px-4 py-3 text-[#6B7280]">{row.listingId}</td>
                  <td className="px-4 py-3 font-medium text-[#111827]">{row.property}</td>
                  <td className="px-4 py-3 text-[#374151]">{row.serviceType}</td>
                  <td className="px-4 py-3">
                    <span className={badgeActive()}>{row.status}</span>
                  </td>
                  <td className="px-4 py-3 text-[#374151]">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : null}

        {tab === 'traffic' ? (
          <>
            <table className="w-full min-w-[800px] text-left text-[14px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                  {['User Type', 'Visits', 'Page Views', 'Page Views', 'Date'].map((h) => (
                    <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredTraffic.map((row, i) => (
                  <tr key={i} className="border-b border-[#E5E7EB] transition-colors hover:bg-[#FAFAFA]">
                    <td className="px-4 py-3 font-medium text-[#111827]">{row.userType}</td>
                    <td className="px-4 py-3 text-[#374151]">{row.visits}</td>
                    <td className="px-4 py-3 text-[#374151]">{row.pageViews}</td>
                    <td className="px-4 py-3 text-[#374151]">{row.duration}</td>
                    <td className="px-4 py-3 text-[#374151]">{row.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        ) : null}
      </div>
    </AdminLayout>
  )
}
