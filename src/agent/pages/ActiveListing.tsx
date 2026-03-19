import { useMemo, useState } from 'react'
import { AgentSidebar } from '../components/AgentSidebar'
import {
  Bell,
  Menu,
} from 'lucide-react'
import { getAvatarUrl } from '@/lib/utils'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#A49776',
  sidebarMuted: '#364153',
}

// Figma node 126:9331 thumbnails
const imgRectangle161123853 = 'https://www.figma.com/api/mcp/asset/3fdd0961-82fa-41c5-8b96-1d4e0803b44a'
const imgRectangle161123854 = 'https://www.figma.com/api/mcp/asset/bb17bb0d-8d50-42fd-bf67-2855de71d872'
const imgRectangle161123855 = 'https://www.figma.com/api/mcp/asset/519cd15e-ab8b-4239-9267-882867d1b4da'
const imgRectangle161123856 = 'https://www.figma.com/api/mcp/asset/64e9a0be-285c-4b37-b19e-9bf53ba23f79'
const imgRectangle161123857 = 'https://www.figma.com/api/mcp/asset/6cf5572c-f6e5-4649-9e4c-6ba3f0c4c9fd'

type ListingStatus = 'Active' | 'Pending' | 'Expire'

type ListingRow = {
  id: string
  title: string
  type: 'MLS' | 'FSBO'
  created: string
  status: ListingStatus
  image: string
}

/** 7 rows matching Figma / attachment */
const ALL_ROWS: ListingRow[] = [
  {
    id: '2455675',
    title: 'Modern Downtown Apartment',
    type: 'MLS',
    created: 'Dec 1, 2025',
    status: 'Active',
    image: imgRectangle161123853,
  },
  {
    id: '2455675',
    title: 'Modern Downtown Apartment',
    type: 'FSBO',
    created: 'Dec 1, 2025',
    status: 'Active',
    image: imgRectangle161123854,
  },
  {
    id: '2455675',
    title: 'Urban Loft Studio',
    type: 'MLS',
    created: 'Dec 1, 2025',
    status: 'Active',
    image: imgRectangle161123855,
  },
  {
    id: '2455675',
    title: 'Cozy Family Home',
    type: 'FSBO',
    created: 'Dec 1, 2025',
    status: 'Active',
    image: imgRectangle161123856,
  },
  {
    id: '2455675',
    title: 'Luxury Villa in Suburbs',
    type: 'FSBO',
    created: 'Dec 1, 2025',
    status: 'Active',
    image: imgRectangle161123857,
  },
  {
    id: '2455675',
    title: 'Modern Downtown Apartment',
    type: 'FSBO',
    created: 'Dec 1, 2025',
    status: 'Active',
    image: imgRectangle161123857,
  },
  {
    id: '2455675',
    title: 'Modern Downtown Apartment',
    type: 'MLS',
    created: 'Dec 1, 2025',
    status: 'Active',
    image: imgRectangle161123856,
  },
]

type FilterTab = 'All' | 'Active' | 'Pending' | 'Expire'


export function ActiveListing() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [tab, setTab] = useState<FilterTab>('Active')

  const avatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  const rows = useMemo(() => {
    if (tab === 'All') return ALL_ROWS
    return ALL_ROWS.filter((r) => r.status === tab)
  }, [tab])

  const filterOrder: FilterTab[] = ['All', 'Active', 'Pending', 'Expire']

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden bg-white">
      <AgentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Dashboard" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 bg-white">
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
              <h1 className="text-2xl font-normal text-[#0a0a0a]" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '32px' }}>
                Active Listing
              </h1>
            </div>

            <div className="flex items-center gap-0">
              <button type="button" className="relative p-2 rounded-[10px] hover:bg-gray-50" aria-label="Notifications">
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
                  src={avatar}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover border ml-3 hidden sm:block"
                  style={{ borderColor: tokens.cardBorder }}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-8 pt-6 pb-8 bg-white">
          {/* Filter tabs: inactive = grey text only; Active selected = gold pill + white text */}
          <div className="flex items-center gap-10 mb-6">
            {filterOrder.map((t) => {
              const selected = tab === t
               return (
                <button
                  key={t}
                  type="button"
                  onClick={() => setTab(t)}
                  className="text-base font-bold border-none cursor-pointer transition-colors"
                  style={{
                    fontFamily: 'Arial, sans-serif',
                    ...(selected
                      ? {
                          backgroundColor: tokens.accent,
                          color: '#ffffff',
                          borderRadius: 8,
                          padding: '8px 24px',
                          border: '1px solid #ececf2',
                        }
                      : {
                          backgroundColor: 'transparent',
                          color: '#8181a5',
                          padding: 0,
                        }),
                  }}
                >
                  {t}
                </button>
              )
            })}
          </div>

          {/* Table — full width, grey header, row dividers */}
          <div className="w-full border border-[#e5e7eb] rounded-none overflow-hidden bg-white">
            <div className="bg-[#f9fafb] border-b border-[#e5e7eb] h-[53px] flex items-center px-8">
              <div className="grid w-full grid-cols-[100px_1fr_1fr_1fr_160px] gap-4 items-center text-sm font-bold text-[#0a0a0a]" style={{ fontFamily: 'Arial, sans-serif' }}>
                <span className="text-left pl-2">Image</span>
                <span className="text-center">Listing ID</span>
                <span className="text-center">Property Title</span>
                <span className="text-center">Property Type</span>
                <span className="text-right pr-2">Date Created</span>
              </div>
            </div>

            <div>
              {rows.map((r, idx) => (
                <div
                  key={`${r.id}-${idx}`}
                  className="border-b border-[#e5e7eb] last:border-b-0"
                >
                  <div className="grid w-full grid-cols-[100px_1fr_1fr_1fr_160px] gap-4 items-center px-8 py-6">
                    <div className="flex justify-start pl-2">
                      <img src={r.image} alt="" className="w-[78px] h-[78px] rounded-[14px] object-cover" />
                    </div>
                    <div className="text-center text-sm text-[#6a7282]" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {r.id}
                    </div>
                    <div className="text-center text-base text-[#0a0a0a]" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {r.title}
                    </div>
                    <div className="text-center text-base text-[#0a0a0a]" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {r.type}
                    </div>
                    <div className="text-right text-base text-[#4a5565] pr-2" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {r.created}
                    </div>
                  </div>
                </div>
              ))}
              {rows.length === 0 && (
                <div className="p-8 text-center text-sm text-gray-500">No listings found.</div>
              )}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
