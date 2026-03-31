import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronDown, Filter, MoreVertical, Search } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import { MOCK_LISTINGS, type ListingStatus } from '../data/listingsMock'

type Tab = 'all' | ListingStatus

function statusLabel(s: ListingStatus) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function statusBadgeClass(s: ListingStatus) {
  switch (s) {
    case 'pending':
      return 'bg-[#FEF9C3] text-[#854D0E]'
    case 'active':
      return 'bg-[#DBEAFE] text-[#1E40AF]'
    case 'expired':
      return 'bg-[#DCFCE7] text-[#166534]'
    default:
      return 'bg-[#F3F4F6] text-[#374151]'
  }
}

const tabs: { key: Tab; label: string }[] = [
  { key: 'all', label: 'All' },
  { key: 'pending', label: 'Pending' },
  { key: 'active', label: 'Active' },
  { key: 'expired', label: 'Expired' },
]

export function ManageListings() {
  const [tab, setTab] = useState<Tab>('all')
  const [search, setSearch] = useState('')
  const [filterOpen, setFilterOpen] = useState(false)
  const [listingStatusOpen, setListingStatusOpen] = useState(false)
  const [listingStatusExtra, setListingStatusExtra] = useState<'all' | ListingStatus>('all')
  const [openRowMenu, setOpenRowMenu] = useState<number | null>(null)

  const filterRef = useRef<HTMLDivElement>(null)
  const listingStatusRef = useRef<HTMLDivElement>(null)
  const rowMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function closeOnOutside(e: MouseEvent) {
      const t = e.target as Node
      if (filterRef.current && !filterRef.current.contains(t)) setFilterOpen(false)
      if (listingStatusRef.current && !listingStatusRef.current.contains(t)) setListingStatusOpen(false)
      if (rowMenuRef.current && !rowMenuRef.current.contains(t)) setOpenRowMenu(null)
    }
    document.addEventListener('mousedown', closeOnOutside)
    return () => document.removeEventListener('mousedown', closeOnOutside)
  }, [])

  const filtered = useMemo(() => {
    let rows = MOCK_LISTINGS
    if (tab !== 'all') rows = rows.filter((r) => r.status === tab)
    if (listingStatusExtra !== 'all') rows = rows.filter((r) => r.status === listingStatusExtra)
    const q = search.trim().toLowerCase()
    if (q) {
      rows = rows.filter(
        (r) =>
          r.id.includes(q) ||
          r.title.toLowerCase().includes(q) ||
          r.owner.toLowerCase().includes(q) ||
          r.propertyType.toLowerCase().includes(q)
      )
    }
    return rows
  }, [tab, search, listingStatusExtra])

  return (
    <AdminLayout title="Manage Listings">
      <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-4 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex flex-wrap gap-2">
            {tabs.map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`rounded-full px-4 py-2 text-[14px] font-medium transition-colors ${
                  tab === key
                    ? 'bg-[#B89F7C] text-white shadow-sm'
                    : 'text-[#6B7280] hover:bg-[#F3F4F6] hover:text-[#111827]'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative" ref={filterRef}>
              <button
                type="button"
                onClick={() => {
                  setFilterOpen((v) => !v)
                  setListingStatusOpen(false)
                }}
                className={`inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[14px] font-medium text-[#374151] transition-colors hover:border-[#D1D5DB] ${
                  filterOpen ? 'border-[#B89F7C]/50 ring-1 ring-[#B89F7C]/20' : ''
                }`}
              >
                <Filter className="h-4 w-4 text-[#6B7280]" strokeWidth={1.75} />
                Filter
                <ChevronDown className="h-4 w-4 text-[#9CA3AF]" />
              </button>
              {filterOpen ? (
                <div className="absolute right-0 top-full z-40 mt-2 w-56 rounded-lg border border-[#E5E7EB] bg-white py-2 shadow-lg">
                  <p className="px-3 pb-2 text-[12px] font-semibold text-[#111827]">Quick filters</p>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                    onClick={() => {
                      setFilterOpen(false)
                    }}
                  >
                    Newest first
                  </button>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                    onClick={() => {
                      setFilterOpen(false)
                    }}
                  >
                    Oldest first
                  </button>
                  <button
                    type="button"
                    className="w-full px-3 py-2 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                    onClick={() => {
                      setFilterOpen(false)
                    }}
                  >
                    By property type
                  </button>
                </div>
              ) : null}
            </div>

            <div className="relative" ref={listingStatusRef}>
              <button
                type="button"
                onClick={() => {
                  setListingStatusOpen((v) => !v)
                  setFilterOpen(false)
                }}
                className={`inline-flex items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2 text-[14px] font-medium text-[#374151] transition-colors hover:border-[#D1D5DB] ${
                  listingStatusOpen ? 'border-[#B89F7C]/50 ring-1 ring-[#B89F7C]/20' : ''
                }`}
              >
                Listing Status:
                <ChevronDown className="h-4 w-4 text-[#9CA3AF]" />
              </button>
              {listingStatusOpen ? (
                <div className="absolute right-0 top-full z-40 mt-2 w-52 rounded-lg border border-[#E5E7EB] bg-white py-2 shadow-lg">
                  {(['all', 'pending', 'active', 'expired'] as const).map((k) => (
                    <button
                      key={k}
                      type="button"
                      className={`w-full px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB] ${
                        listingStatusExtra === k ? 'font-semibold text-[#B89F7C]' : 'text-[#374151]'
                      }`}
                      onClick={() => {
                        setListingStatusExtra(k)
                        setListingStatusOpen(false)
                      }}
                    >
                      {k === 'all' ? 'All statuses' : statusLabel(k)}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </div>

        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" strokeWidth={1.75} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full rounded-full border border-[#E5E7EB] bg-[#F9FAFB] py-3 pl-12 pr-4 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#B89F7C] focus:bg-white focus:ring-2 focus:ring-[#B89F7C]/20"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#E5E7EB]">
                {['Listing ID', 'Property Title', 'Owner', 'Property Type', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="pb-3 pr-4 font-bold text-[#111827]">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filtered.map((row, i) => (
                <tr
                  key={row.id}
                  className="border-b border-[#E5E7EB] transition-colors hover:bg-[#FAFAFA]"
                >
                  <td className="py-3 pr-4 tabular-nums text-[#6B7280]">{row.id}</td>
                  <td className="py-3 pr-4 font-bold text-[#111827]">
                    <Link
                      to={`/admin/listings-management/property/${row.id}`}
                      className="hover:text-[#B89F7C] hover:underline"
                    >
                      {row.title}
                    </Link>
                  </td>
                  <td className="py-3 pr-4 text-[#374151]">{row.owner}</td>
                  <td className="py-3 pr-4 text-[#374151]">{row.propertyType}</td>
                  <td className="py-3 pr-4">
                    <span className={`inline-block rounded-full px-3 py-1 text-[12px] font-medium ${statusBadgeClass(row.status)}`}>
                      {statusLabel(row.status)}
                    </span>
                  </td>
                  <td className="py-3 pr-4">
                    <div className="relative inline-flex" ref={openRowMenu === i ? rowMenuRef : undefined}>
                      <button
                        type="button"
                        aria-label="Row actions"
                        className={`flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-[#F9FAFB] text-[#6B7280] transition hover:border-[#E5E7EB] hover:bg-white ${
                          openRowMenu === i ? 'border-[#B89F7C]/40 bg-white' : ''
                        }`}
                        onClick={() => setOpenRowMenu(openRowMenu === i ? null : i)}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {openRowMenu === i ? (
                        <div className="absolute right-0 top-full z-50 mt-1 w-40 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
                          <Link
                            to={`/admin/listings-management/property/${row.id}`}
                            className="block px-3 py-2 text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                            onClick={() => setOpenRowMenu(null)}
                          >
                            View
                          </Link>
                          <Link
                            to={`/admin/listings-management/property/${row.id}/edit`}
                            className="block px-3 py-2 text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                            onClick={() => setOpenRowMenu(null)}
                          >
                            Edit
                          </Link>
                          <button
                            type="button"
                            className="w-full px-3 py-2 text-left text-[13px] text-[#DC2626] hover:bg-red-50"
                            onClick={() => setOpenRowMenu(null)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filtered.length === 0 ? (
            <p className="py-8 text-center text-[14px] text-[#6B7280]">No listings match your filters.</p>
          ) : null}
        </div>
      </div>
    </AdminLayout>
  )
}
