import { useMemo, useState } from 'react'
import { Bell, Menu } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { BrokerSidebar } from '../components/BrokerSidebar'

type ListingRequestRow = {
  requestId: string
  property: string
  customerName: string
  date: string
  assignedAgent: string
  status: string
  statusColor: { bg: string; text: string }
}

/** Status badge colors aligned with Figma / attachment */
const rows: ListingRequestRow[] = [
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    customerName: 'John Williams',
    date: '19/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Scheduled',
    statusColor: { bg: '#C8E6C9', text: '#2E7D32' },
  },
  {
    requestId: '2455676',
    property: 'Urban Loft Studio',
    customerName: 'Den Williams',
    date: '19/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Completed',
    statusColor: { bg: '#BBDEFB', text: '#1565C0' },
  },
  {
    requestId: '2455677',
    property: 'Cozy Family Home',
    customerName: 'David Johnson',
    date: '19/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Completed',
    statusColor: { bg: '#BBDEFB', text: '#1565C0' },
  },
  {
    requestId: '2455678',
    property: 'Luxury Villa in Suburbs',
    customerName: 'Sarah Mitchell',
    date: '21/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Rescheduled',
    statusColor: { bg: '#DCEDC8', text: '#558B2F' },
  },
  {
    requestId: '2455679',
    property: 'Modern Downtown Apartment',
    customerName: 'Alex Turner',
    date: '22/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Failed',
    statusColor: { bg: '#FFCDD2', text: '#C62828' },
  },
  {
    requestId: '2455680',
    property: 'Urban Loft Studio',
    customerName: 'Emma Brooks',
    date: '24/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Cancelled',
    statusColor: { bg: '#FFF9C4', text: '#9E9D24' },
  },
  {
    requestId: '2455681',
    property: 'Cozy Family Home',
    customerName: 'Michael Chen',
    date: '26/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Scheduled',
    statusColor: { bg: '#C8E6C9', text: '#2E7D32' },
  },
]

const gridCols =
  'minmax(88px, 0.9fr) minmax(150px, 1.5fr) minmax(120px, 1.25fr) minmax(96px, 0.9fr) minmax(120px, 1.1fr) minmax(110px, 1fr)'

export function ManageListingRequests() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0 bg-white">
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Listing Requests" />

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
              <h1
                className="text-xl sm:text-2xl font-normal text-[#0a0a0a]"
                style={{ fontFamily: 'Arial, sans-serif', lineHeight: '32px' }}
              >
                Manage Listing Requests
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-white pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full overflow-x-auto">
              <div className="w-full min-w-0">
                <div
                  className="grid w-full items-center gap-x-4 border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 sm:px-5"
                  style={{ gridTemplateColumns: gridCols }}
                >
                  <div className="py-4 text-[14px] font-bold text-[#374151]">Request ID</div>
                  <div className="py-4 text-[14px] font-bold text-[#374151]">Property</div>
                  <div className="py-4 text-[14px] font-bold text-[#374151]">Customer Name</div>
                  <div className="py-4 text-[14px] font-bold text-[#374151]">Date</div>
                  <div className="py-4 text-[14px] font-bold text-[#374151]">Assigned Agent</div>
                  <div className="py-4 text-[14px] font-bold text-[#374151]">Status</div>
                </div>

                {rows.map((row, index) => (
                  <div
                    key={`${row.requestId}-${index}`}
                    className="grid w-full items-center gap-x-4 border-b border-[#E5E7EB] bg-white px-4 sm:px-5"
                    style={{ gridTemplateColumns: gridCols }}
                  >
                    <div className="py-5 text-[14px] text-[#6B7280]">{row.requestId}</div>
                    <div className="py-5 text-[15px] text-[#111827] min-w-0 truncate" title={row.property}>
                      {row.property}
                    </div>
                    <div className="py-5 text-[15px] text-[#111827] min-w-0 truncate" title={row.customerName}>
                      {row.customerName}
                    </div>
                    <div className="py-5 text-[14px] text-[#4B5563]">{row.date}</div>
                    <div className="py-5 text-[14px] text-[#111827]">{row.assignedAgent}</div>
                    <div className="py-5">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-md text-[13px] font-medium whitespace-nowrap"
                        style={{ backgroundColor: row.statusColor.bg, color: row.statusColor.text }}
                      >
                        {row.status}
                      </span>
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
