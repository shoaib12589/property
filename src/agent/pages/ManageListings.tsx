import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { useNavigate } from 'react-router-dom'
import { getAvatarUrl } from '@/lib/utils'
import { AgentSidebar } from '../components/AgentSidebar'
import { Bell, ChevronDown, Eye, Filter, Menu, Pencil, RefreshCw, X } from 'lucide-react'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#A49776',
  placeholder: 'rgba(10,10,10,0.5)',
}

// Reuse the same Figma thumbnail URLs already used in Active Listing
const imgRectangle161123853 =
  'https://www.figma.com/api/mcp/asset/3fdd0961-82fa-41c5-8b96-1d4e0803b44a'
const imgRectangle161123854 =
  'https://www.figma.com/api/mcp/asset/bb17bb0d-8d50-42fd-bf67-2855de71d872'
const imgRectangle161123855 =
  'https://www.figma.com/api/mcp/asset/519cd15e-ab8b-4239-9267-882867d1b4da'
const imgRectangle161123856 =
  'https://www.figma.com/api/mcp/asset/64e9a0be-285c-4b37-b19e-9bf53ba23f79'
const imgRectangle161123857 =
  'https://www.figma.com/api/mcp/asset/6cf5572c-f6e5-4649-9e4c-6ba3f0c4c9fd'

type ListingType = 'MLS' | 'FSBO'
type ListingStatus = 'Pending' | 'Expired' | 'Approved' | 'Active' | 'Cancelled'

type ListingRow = {
  image: string
  listingId: string
  title: string
  type: ListingType
  status: ListingStatus
  created: string
}

// Status badge styles matching the attachment exactly
const STATUS_STYLE: Record<
  ListingStatus,
  { bg: string; color: string }
> = {
  Pending: { bg: '#FFF8E1', color: '#F5A623' },      // Light yellow/cream background
  Expired: { bg: '#E8F5E9', color: '#4CAF50' },     // Light green background
  Approved: { bg: '#E3F2FD', color: '#2196F3' },    // Light blue background
  Active: { bg: '#E3F2FD', color: '#2196F3' },      // Light blue background
  Cancelled: { bg: '#FFEBEE', color: '#F44336' },    // Light red/pink background
}

const ALL_ROWS: ListingRow[] = [
  {
    image: imgRectangle161123853,
    listingId: '2455675',
    title: 'Modern Downtown Apartment',
    type: 'MLS',
    status: 'Pending',
    created: 'Dec 1, 2025',
  },
  {
    image: imgRectangle161123854,
    listingId: '2455675',
    title: 'Modern Downtown Apartment',
    type: 'FSBO',
    status: 'Expired',
    created: 'Dec 1, 2025',
  },
  {
    image: imgRectangle161123855,
    listingId: '2455675',
    title: 'Urban Loft Studio',
    type: 'MLS',
    status: 'Approved',
    created: 'Dec 1, 2025',
  },
  {
    image: imgRectangle161123856,
    listingId: '2455675',
    title: 'Cozy Family Home',
    type: 'FSBO',
    status: 'Active',
    created: 'Dec 1, 2025',
  },
  {
    image: imgRectangle161123857,
    listingId: '2455675',
    title: 'Luxury Villa in Suburbs',
    type: 'FSBO',
    status: 'Expired',
    created: 'Dec 1, 2025',
  },
  {
    image: imgRectangle161123854,
    listingId: '2455675',
    title: 'Modern Downtown Apartment',
    type: 'FSBO',
    status: 'Cancelled',
    created: 'Dec 1, 2025',
  },
  {
    image: imgRectangle161123853,
    listingId: '2455675',
    title: 'Modern Downtown Apartment',
    type: 'MLS',
    status: 'Active',
    created: 'Dec 1, 2025',
  },
]

const FILTER_TYPES = ['All', 'FSBO', 'MLS'] as const
type FilterType = (typeof FILTER_TYPES)[number]

function StatusBadge({ status }: { status: ListingStatus }) {
  const s = STATUS_STYLE[status]
  return (
    <span
      className="inline-flex items-center justify-center px-4 h-[28px] rounded-sm text-[12px] font-normal"
      style={{ 
        backgroundColor: s.bg, 
        color: s.color,
        fontFamily: 'Arial, sans-serif',
      }}
    >
      {status}
    </span>
  )
}

function IconAction({ title, children, onClick }: { title: string; children: ReactNode; onClick?: () => void }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className="w-7 h-7 rounded-full border border-[#D1D5DB] bg-[#F9FAFB] text-gray-400 hover:bg-gray-100 flex items-center justify-center"
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
    return ALL_ROWS.filter((r) => r.type === typeFilter)
  }, [typeFilter])

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden" style={{ backgroundColor: tokens.pageBg }}>
      <AgentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Listings" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        <header className="shrink-0 bg-white border-b" style={{ borderColor: tokens.cardBorder }}>
          <div className="px-8 h-[76px] flex items-center justify-between">
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
                className="text-2xl font-normal text-[#0a0a0a]"
                style={{ fontFamily: 'Arial, sans-serif', lineHeight: '32px' }}
              >
                Manage Listings
              </h1>
            </div>

            <div className="flex items-center gap-0">
              <button
                type="button"
                className="relative p-2 rounded-[10px] hover:bg-gray-50"
                aria-label="Notifications"
              >
                <Bell className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fb2c36]" />
              </button>

              <div
                className="flex items-center h-11 pl-4 ml-2 border-l"
                style={{ borderColor: tokens.cardBorder }}
              >
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-8 pt-6 pb-8 bg-white">
          {/* Filter row */}
          <div className="flex items-center justify-between mb-3">
            {/* Left side - Type filters */}
            <div className="flex items-center gap-5">
              {FILTER_TYPES.map((t) => {
                const selected = typeFilter === t
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setTypeFilter(t)}
                    className="h-[36px] px-4 rounded-[10px] text-[24px] leading-none font-normal"
                    style={{
                      backgroundColor: selected ? tokens.accent : 'transparent',
                      color: selected ? '#ffffff' : '#4B5563',
                      border: 'none',
                      fontFamily: 'Arial, sans-serif',
                      fontSize: '14px',
                    }}
                  >
                    {t}
                  </button>
                )
              })}
            </div>

            {/* Right side - Dropdown filters */}
            <div className="flex items-center gap-2">
              {/* Filter dropdown */}
              <div 
                className="flex items-center gap-2 border border-[#D1D5DB] rounded-xl h-10 px-3 bg-white"
                style={{ minWidth: '142px' }}
              >
                <span className="w-5 h-5 rounded-full bg-[#F3F4F6] text-gray-400 flex items-center justify-center">
                  <Filter className="w-3.5 h-3.5" />
                </span>
                <select
                  value={filterValue}
                  onChange={(e) => setFilterValue(e.target.value)}
                  className="bg-transparent outline-none text-[13px] text-gray-600 cursor-pointer appearance-none flex-1"
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

              {/* Listing Status dropdown */}
              <div 
                className="flex items-center gap-2 border border-[#D1D5DB] rounded-xl h-10 px-3 bg-white"
                style={{ minWidth: '170px' }}
              >
                <select
                  value={listingStatusValue}
                  onChange={(e) => setListingStatusValue(e.target.value)}
                  className="bg-transparent outline-none text-[13px] text-gray-600 cursor-pointer appearance-none flex-1"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  <option value="" disabled>
                    Listing Status
                  </option>
                  <option value="pending">Pending</option>
                  <option value="approved">Approved</option>
                  <option value="active">Active</option>
                  <option value="expired">Expired</option>
                  <option value="cancelled">Cancelled</option>
                </select>
                <ChevronDown className="w-4 h-4 text-gray-500 shrink-0" />
              </div>
            </div>
          </div>

          {/* Table */}
          <div>
            {/* Table Header */}
            <div
              className="grid items-center border-b border-[#E5E7EB] bg-white"
              style={{ gridTemplateColumns: '95px 115px 1fr 130px 120px 135px 150px' }}
            >
              <div className="py-3 pl-3 text-[12px] font-bold text-[#111827]" style={{ fontFamily: 'Arial, sans-serif' }}>Image</div>
              <div className="py-3 text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>Listing ID</div>
              <div className="py-3 text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>Property Title</div>
              <div className="py-3 text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>Property Type</div>
              <div className="py-3 text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>Status</div>
              <div className="py-3 text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>Date Created</div>
              <div className="py-3 pr-4 text-[12px] font-bold text-[#111827] text-center" style={{ fontFamily: 'Arial, sans-serif' }}>Actions</div>
            </div>

            {/* Table Body */}
            <div className="divide-y divide-[#E5E7EB]">
              {rows.map((r, idx) => {
                return (
                  <div
                    key={`${r.listingId}-${idx}`}
                    className="grid items-center bg-white hover:bg-gray-50"
                    style={{ gridTemplateColumns: '95px 115px 1fr 130px 120px 135px 150px' }}
                  >
                    <div className="pl-3 py-4 flex items-center">
                      <img 
                        src={r.image} 
                        alt="" 
                        className="w-[100px] h-[70px] rounded-lg object-cover" 
                      />
                    </div>
                    <div 
                      className="py-4 text-[12px] text-[#6B7280] text-center"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {r.listingId}
                    </div>
                    <div 
                      className="py-4 text-[15px] font-bold text-[#111827] text-center"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {r.title}
                    </div>
                    <div 
                      className="py-4 text-[15px] font-bold text-[#6B7280] text-center"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {r.type}
                    </div>
                    <div className="py-4 flex items-center justify-center">
                      <StatusBadge status={r.status} />
                    </div>
                    <div 
                      className="py-4 text-[12px] text-[#6B7280] text-center"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      {r.created}
                    </div>
                    <div className="py-4 pr-4 flex items-center justify-center gap-2">
                      <IconAction title="View" onClick={() => navigate(`/agent/manage-listings/${r.listingId}`)}>
                        <Eye className="w-4 h-4" />
                      </IconAction>
                      <IconAction title="Edit" onClick={() => navigate(`/agent/manage-listings/${r.listingId}/edit`)}>
                        <Pencil className="w-4 h-4" />
                      </IconAction>
                      <IconAction title="Delete">
                        <X className="w-4 h-4" />
                      </IconAction>
                      <IconAction title="Refresh">
                        <RefreshCw className="w-4 h-4" />
                      </IconAction>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
