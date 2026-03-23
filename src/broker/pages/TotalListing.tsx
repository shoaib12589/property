import { useMemo, useState } from 'react'
import { Bell, Menu } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { BrokerSidebar } from '../components/BrokerSidebar'

const rows = [
  {
    image: 'https://www.figma.com/api/mcp/asset/3fdd0961-82fa-41c5-8b96-1d4e0803b44a',
    listingId: '2455675',
    title: 'Modern Downtown Apartment',
    type: 'MLS',
    created: 'Dec 1, 2025',
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/bb17bb0d-8d50-42fd-bf67-2855de71d872',
    listingId: '2455675',
    title: 'Modern Downtown Apartment',
    type: 'FSBO',
    created: 'Dec 1, 2025',
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/519cd15e-ab8b-4239-9267-882867d1b4da',
    listingId: '2455675',
    title: 'Urban Loft Studio',
    type: 'MLS',
    created: 'Dec 1, 2025',
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/64e9a0be-285c-4b37-b19e-9bf53ba23f79',
    listingId: '2455675',
    title: 'Cozy Family Home',
    type: 'FSBO',
    created: 'Dec 1, 2025',
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/6cf5572c-f6e5-4649-9e4c-6ba3f0c4c9fd',
    listingId: '2455675',
    title: 'Luxury Villa in Suburbs',
    type: 'FSBO',
    created: 'Dec 1, 2025',
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/bb17bb0d-8d50-42fd-bf67-2855de71d872',
    listingId: '2455675',
    title: 'Modern Downtown Apartment',
    type: 'FSBO',
    created: 'Dec 1, 2025',
  },
  {
    image: 'https://www.figma.com/api/mcp/asset/64e9a0be-285c-4b37-b19e-9bf53ba23f79',
    listingId: '2455675',
    title: 'Modern Downtown Apartment',
    type: 'MLS',
    created: 'Dec 1, 2025',
  },
]

const tabs = ['Total', 'Active', 'Pending', 'Expire'] as const
type ListingTab = (typeof tabs)[number]

export function TotalListing() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<ListingTab>('Total')
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  const pageTitle = useMemo(() => {
    if (activeTab === 'Total') return 'Total Listing'
    if (activeTab === 'Active') return 'Active Listing'
    if (activeTab === 'Pending') return 'Pending Listing'
    return 'Expired Listing'
  }, [activeTab])

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0 bg-white">
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Listings" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 w-full">
        <header className="shrink-0 bg-white border-b border-[#E5E7EB]">
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
              <h1 className="text-xl sm:text-2xl font-normal text-[#0a0a0a]" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '32px' }}>
                {pageTitle}
              </h1>
            </div>

            <div className="flex items-center gap-0">
              <button type="button" className="relative p-2 rounded-[10px] hover:bg-gray-50" aria-label="Notifications">
                <Bell className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fb2c36]" />
              </button>
              <div className="flex items-center h-11 pl-4 ml-2 border-l border-[#E5E7EB]">
                <span className="text-base text-[#0a0a0a]" style={{ fontFamily: 'Arial, sans-serif' }}>
                  John Doe
                </span>
                <img
                  src={headerAvatar}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover border ml-3 hidden sm:block"
                  style={{ borderColor: '#E5E7EB' }}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-white pb-[max(1rem,env(safe-area-inset-bottom,0px))]">
          <div className="px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center gap-3 mb-4">
              {tabs.map((tab) => {
                const selected = tab === activeTab
                return (
                  <button
                    key={tab}
                    type="button"
                    onClick={() => setActiveTab(tab)}
                    className={`h-8 px-4 rounded-md text-[16px] leading-none font-semibold ${
                      selected ? 'bg-[#A49776] text-white' : 'text-[#8D8D8D]'
                    }`}
                  >
                    {tab}
                  </button>
                )
              })}
            </div>
          </div>

          <div className="border-t border-[#E9E9E9]" />

          <div className="overflow-x-auto">
            <div className="min-w-[900px]">
              <div
                className="grid items-center border-b border-[#E9E9E9] bg-white px-6"
                style={{ gridTemplateColumns: '100px 200px 1fr 220px 180px' }}
              >
                <div className="py-4 text-[14px] font-bold text-[#1f1f1f]">Image</div>
                <div className="py-4 text-[14px] font-bold text-[#1f1f1f]">Listing ID</div>
                <div className="py-4 text-[14px] font-bold text-[#1f1f1f]">Property Title</div>
                <div className="py-4 text-[14px] font-bold text-[#1f1f1f]">Property Type</div>
                <div className="py-4 text-[14px] font-bold text-[#1f1f1f]">Date Created</div>
              </div>

              {rows.map((row, index) => (
                <div
                  key={`${row.listingId}-${index}`}
                  className="grid items-center border-b border-[#E9E9E9] bg-white px-6"
                  style={{ gridTemplateColumns: '100px 200px 1fr 220px 180px' }}
                >
                  <div className="py-4">
                    <img src={row.image} alt="" className="w-[52px] h-[52px] rounded-xl object-cover" />
                  </div>
                  <div className="py-4 text-[16px] text-[#6B7280]">{row.listingId}</div>
                  <div className="py-4 text-[18px] text-[#1f1f1f]">{row.title}</div>
                  <div className="py-4 text-[18px] text-[#1f1f1f]">{row.type}</div>
                  <div className="py-4 text-[18px] text-[#4B5563]">{row.created}</div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

