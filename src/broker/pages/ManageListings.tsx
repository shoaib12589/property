import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, Eye, Filter, Menu, Pencil, RotateCw, X } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { BrokerSidebar } from '../components/BrokerSidebar'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#A49776',
}

const img1 = 'https://www.figma.com/api/mcp/asset/3fdd0961-82fa-41c5-8b96-1d4e0803b44a'
const img2 = 'https://www.figma.com/api/mcp/asset/bb17bb0d-8d50-42fd-bf67-2855de71d872'
const img3 = 'https://www.figma.com/api/mcp/asset/519cd15e-ab8b-4239-9267-882867d1b4da'
const img4 = 'https://www.figma.com/api/mcp/asset/64e9a0be-285c-4b37-b19e-9bf53ba23f79'
const img5 = 'https://www.figma.com/api/mcp/asset/6cf5572c-f6e5-4649-9e4c-6ba3f0c4c9fd'

type PropertyType = 'MLS' | 'FSBO'
type ListingCategory = 'Residential' | 'Commercial' | 'Industrial' | 'Land'
type DisplayStatus = 'Pending Approval' | 'Expired' | 'Approved' | 'Active' | 'Sold'

type ListingRow = {
  image: string
  listingId: string
  title: string
  propertyType: PropertyType
  listingType: ListingCategory
  status: DisplayStatus
  dateLabel: string
}

const STATUS_STYLE: Record<DisplayStatus, { bg: string; color: string }> = {
  'Pending Approval': { bg: '#FFF8E1', color: '#C49000' },
  Expired: { bg: '#E8F5E9', color: '#2E7D32' },
  Approved: { bg: '#E3F2FD', color: '#1565C0' },
  Active: { bg: '#E1F5FE', color: '#0277BD' },
  Sold: { bg: '#FFEBEE', color: '#C62828' },
}

const ALL_ROWS: ListingRow[] = [
  {
    image: img1,
    listingId: '2455675',
    title: 'Modern Downtown Apartment',
    propertyType: 'MLS',
    listingType: 'Residential',
    status: 'Pending Approval',
    dateLabel: 'Dec 1, 2025',
  },
  {
    image: img2,
    listingId: '2455675',
    title: 'Modern Downtown Apartment',
    propertyType: 'FSBO',
    listingType: 'Commercial',
    status: 'Expired',
    dateLabel: 'Dec 1, 2025',
  },
  {
    image: img3,
    listingId: '2455675',
    title: 'Urban Loft Studio',
    propertyType: 'MLS',
    listingType: 'Industrial',
    status: 'Approved',
    dateLabel: 'Dec 1, 2025',
  },
  {
    image: img4,
    listingId: '2455675',
    title: 'Cozy Family Home',
    propertyType: 'FSBO',
    listingType: 'Land',
    status: 'Active',
    dateLabel: 'Dec 1, 2025',
  },
  {
    image: img5,
    listingId: '2455675',
    title: 'Luxury Villa in Suburbs',
    propertyType: 'FSBO',
    listingType: 'Residential',
    status: 'Sold',
    dateLabel: 'Dec 1, 2025',
  },
  {
    image: img2,
    listingId: '2455675',
    title: 'Modern Downtown Apartment',
    propertyType: 'FSBO',
    listingType: 'Commercial',
    status: 'Pending Approval',
    dateLabel: 'Dec 1, 2025',
  },
  {
    image: img1,
    listingId: '2455675',
    title: 'Modern Downtown Apartment',
    propertyType: 'MLS',
    listingType: 'Residential',
    status: 'Active',
    dateLabel: 'Dec 1, 2025',
  },
]

const FILTER_TYPES = ['All', 'FSBO', 'MLS'] as const
type FilterType = (typeof FILTER_TYPES)[number]

function StatusBadge({ status }: { status: DisplayStatus }) {
  const s = STATUS_STYLE[status]
  return (
    <span
      className="inline-flex items-center justify-center px-3 min-h-[28px] rounded-sm text-[12px] font-normal whitespace-nowrap"
      style={{ backgroundColor: s.bg, color: s.color, fontFamily: 'Arial, sans-serif' }}
    >
      {status}
    </span>
  )
}

/** Ghost icon-only actions — muted gold, no bordered circles (matches Figma). */
function IconAction({ title, children, onClick }: { title: string; children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className="p-1.5 rounded-md text-[#A49776] hover:bg-gray-100 hover:text-[#8B7355] flex items-center justify-center transition-colors"
    >
      {children}
    </button>
  )
}

export function ManageListings() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])
  const [typeFilter, setTypeFilter] = useState<FilterType>('All')
  const [filterValue, setFilterValue] = useState<string>('')
  const [listingStatusValue, setListingStatusValue] = useState<string>('')

  const rows = useMemo(() => {
    if (typeFilter === 'All') return ALL_ROWS
    return ALL_ROWS.filter((r) => r.propertyType === typeFilter)
  }, [typeFilter])

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0" style={{ backgroundColor: tokens.pageBg }}>
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Listings" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 w-full">
        <header className="shrink-0 bg-white border-b" style={{ borderColor: tokens.cardBorder }}>
          <div className="px-4 sm:px-8 min-h-[76px] py-3 sm:py-0 sm:h-[76px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1
                className="text-xl sm:text-2xl font-normal text-[#0a0a0a]"
                style={{ fontFamily: 'Arial, sans-serif', lineHeight: '32px' }}
              >
                Manage Listings
              </h1>
            </div>

            <div className="flex items-center gap-0">
              <button type="button" className="relative p-2 rounded-[10px] hover:bg-gray-50" aria-label="Notifications">
                <Bell className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fb2c36]" />
              </button>
              <div className="flex items-center h-11 pl-4 ml-2 border-l" style={{ borderColor: tokens.cardBorder }}>
                <span className="text-base text-[#0a0a0a]" style={{ fontFamily: 'Arial, sans-serif' }}>
                  John Doe
                </span>
                <img
                  src={headerAvatar}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover border ml-3 hidden sm:block"
                  style={{ borderColor: tokens.cardBorder }}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pb-8 bg-white">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 sm:gap-0 mb-4 sm:mb-3">
            <div className="flex items-center gap-2 sm:gap-5 flex-wrap">
              {FILTER_TYPES.map((t) => {
                const selected = typeFilter === t
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTypeFilter(t)}
                    className="h-[32px] sm:h-[36px] px-3 sm:px-4 rounded-[10px] font-normal whitespace-nowrap"
                    style={{
                      backgroundColor: selected ? tokens.accent : 'transparent',
                      color: selected ? '#ffffff' : '#4B5563',
                      border: 'none',
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '13px',
                    }}
                  >
                    {t}
                  </button>
                )
              })}
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              <div
                className="flex items-center gap-2 border border-[#D1D5DB] rounded-xl h-9 sm:h-10 px-3 bg-white flex-1 sm:flex-none"
                style={{ minWidth: '120px', maxWidth: '160px' }}
              >
                <span className="w-5 h-5 rounded-full bg-[#F3F4F6] text-gray-400 flex items-center justify-center shrink-0">
                  <Filter className="w-3.5 h-3.5" />
                </span>
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="bg-transparent outline-none text-[12px] sm:text-[13px] text-gray-600 cursor-pointer appearance-none flex-1"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  <option value="" disabled>
                    Filter
                  </option>
                  <option value="all">All Listings</option>
                  <option value="newest">Newest First</option>
                  <option value="oldest">Oldest First</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
              </div>

              <div
                className="flex items-center gap-2 border border-[#D1D5DB] rounded-xl h-9 sm:h-10 px-3 bg-white flex-1 sm:flex-none"
                style={{ minWidth: '150px', maxWidth: '200px' }}
              >
                <select
                  value={listingStatusValue}
                  onChange={(e) => setListingStatusValue(e.target.value)}
                  className="bg-transparent outline-none text-[12px] sm:text-[13px] text-gray-600 cursor-pointer appearance-none flex-1"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  <option value="" disabled>
                    Listing Status:
                  </option>
                  <option value="pending">Pending Approval</option>
                  <option value="approved">Approved</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="sold">Sold</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
              </div>
            </div>
          </div>

          <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div className="min-w-[1080px]">
              <div
                className="grid items-center border-b border-[#E5E7EB] bg-[#F9FAFB]"
                style={{ gridTemplateColumns: '88px 88px minmax(0,1fr) 72px 100px 130px 110px 144px' }}
              >
                <div className="py-3 pl-3 text-[11px] sm:text-[12px] font-bold text-[#111827]" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Image
                </div>
                <div className="py-3 text-[11px] sm:text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Listing ID
                </div>
                <div className="py-3 text-[11px] sm:text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Property Title
                </div>
                <div className="py-3 text-[11px] sm:text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Property Type
                </div>
                <div className="py-3 text-[11px] sm:text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Listing Type
                </div>
                <div className="py-3 text-[11px] sm:text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Status
                </div>
                <div className="py-3 text-[11px] sm:text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Date Created
                </div>
                <div className="py-3 pr-4 text-[11px] sm:text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Actions
                </div>
              </div>

              <div className="divide-y divide-[#E5E7EB]">
                {rows.map((r, idx) => (
                  <div
                    key={`${r.listingId}-${idx}`}
                    className="grid items-center bg-white hover:bg-gray-50"
                    style={{ gridTemplateColumns: '88px 88px minmax(0,1fr) 72px 100px 130px 110px 144px' }}
                  >
                    <div className="pl-3 py-3 sm:py-4 flex items-center">
                      <img src={r.image} alt="" className="w-[70px] h-[50px] sm:w-[80px] sm:h-[55px] rounded-lg object-cover" />
                    </div>
                    <div className="py-3 sm:py-4 text-[11px] sm:text-[12px] text-[#6B7280] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {r.listingId}
                    </div>
                    <div
                      className="py-3 sm:py-4 text-[13px] sm:text-[14px] font-bold text-[#111827] text-center px-1"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {r.title}
                    </div>
                    <div
                      className="py-3 sm:py-4 text-[13px] sm:text-[14px] font-bold text-[#6B7280] text-center"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {r.propertyType}
                    </div>
                    <div
                      className="py-3 sm:py-4 text-[12px] sm:text-[13px] text-[#374151] text-center"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {r.listingType}
                    </div>
                    <div className="py-3 sm:py-4 flex items-center justify-center">
                      <StatusBadge status={r.status} />
                    </div>
                    <div className="py-3 sm:py-4 text-[11px] sm:text-[12px] text-[#6B7280] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {r.dateLabel}
                    </div>
                    <div className="py-3 sm:py-4 pr-4 flex items-center justify-center gap-0.5 sm:gap-1">
                      <IconAction
                        title="View listing"
                        onClick={() => navigate(`/broker/manage-listings/${encodeURIComponent(r.listingId)}`)}
                      >
                        <Eye className="w-4 h-4" strokeWidth={1.75} />
                      </IconAction>
                      <IconAction
                        title="Edit listing"
                        onClick={() => navigate(`/broker/manage-listings/edit/${encodeURIComponent(r.listingId)}`)}
                      >
                        <Pencil className="w-4 h-4" strokeWidth={1.75} />
                      </IconAction>
                      <IconAction
                        title="Delete listing"
                        onClick={() => {
                          if (window.confirm('Are you sure you want to delete this listing?')) {
                            // TODO: wire delete API
                          }
                        }}
                      >
                        <X className="w-4 h-4" strokeWidth={1.75} />
                      </IconAction>
                      <IconAction
                        title="Renew listing"
                        onClick={() => navigate(`/broker/manage-listings/renew/${encodeURIComponent(r.listingId)}`)}
                      >
                        <RotateCw className="w-4 h-4" strokeWidth={1.75} />
                      </IconAction>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
