import { useState } from 'react'
import {
  Calendar,
  Clock,
  User,
  Phone,
  Mail,
} from 'lucide-react'
import { CustomerSidebar, CUSTOMER_SIDEBAR_OFFSET } from '@customer/components/CustomerSidebar'
import { CustomerHeader } from '@customer/components/CustomerHeader'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const tokens = {
  border: '#E5E7EB',
  golden: '#D4AF37',
  goldenDark: '#A49776',
  background: '#F8F7F4',
}

type ShowingStatus = 'Requested' | 'Upcoming' | 'Completed' | 'Cancelled'

interface Showing {
  id: string
  title: string
  address: string
  image: string
  date: string
  time: string
  agentName: string
  agentPhone: string
  agentEmail: string
  status: ShowingStatus
  waitingNote?: boolean
}

const showings: Showing[] = [
  {
    id: '1',
    title: 'Luxury Villa in Suburbs',
    address: '456 Oak Avenue, Los Angeles, CA',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=300&fit=crop',
    date: 'Dec 20, 2025',
    time: '2:00 PM',
    agentName: 'Sarah Johnson',
    agentPhone: '+1 234 567 8901',
    agentEmail: 'sarah@estatehub.com',
    status: 'Requested',
    waitingNote: true,
  },
  {
    id: '2',
    title: 'Modern Downtown Condo',
    address: '123 Main Street, New York, NY',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=300&fit=crop',
    date: 'Dec 22, 2025',
    time: '10:00 AM',
    agentName: 'Mike Chen',
    agentPhone: '+1 345 678 9012',
    agentEmail: 'mike@estatehub.com',
    status: 'Upcoming',
  },
  {
    id: '3',
    title: 'Beach House Paradise',
    address: '321 Ocean View, Miami, FL',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=300&h=300&fit=crop',
    date: 'Dec 23, 2025',
    time: '3:30 PM',
    agentName: 'Emma Davis',
    agentPhone: '+1 456 789 0123',
    agentEmail: 'emma@estatehub.com',
    status: 'Upcoming',
  },
  {
    id: '4',
    title: 'Cozy Family Home',
    address: '789 Pine Road, Chicago, IL',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=300&h=300&fit=crop',
    date: 'Dec 15, 2025',
    time: '1:00 PM',
    agentName: 'Tom Wilson',
    agentPhone: '+1 567 890 1234',
    agentEmail: 'tom@estatehub.com',
    status: 'Completed',
  },
  {
    id: '5',
    title: 'Mountain Retreat Cabin',
    address: '654 Forest Trail, Denver, CO',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=300&h=300&fit=crop',
    date: 'Oct 10, 2025',
    time: '11:00 AM',
    agentName: 'Lisa Brown',
    agentPhone: '+1 678 901 2345',
    agentEmail: 'lisa@estatehub.com',
    status: 'Cancelled',
  },
]

const tabs: { key: string; label: string; count: number }[] = [
  { key: 'all', label: 'All', count: 5 },
  { key: 'requested', label: 'Requested', count: 1 },
  { key: 'upcoming', label: 'Upcoming', count: 2 },
  { key: 'completed', label: 'Completed', count: 1 },
  { key: 'cancelled', label: 'Cancelled', count: 1 },
]

function statusBadgeClass(status: ShowingStatus): string {
  switch (status) {
    case 'Requested':
      return 'bg-amber-100 text-amber-800'
    case 'Upcoming':
      return 'bg-sky-100 text-sky-800'
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'Cancelled':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

function filterShowings(list: Showing[], tab: string): Showing[] {
  if (tab === 'all') return list
  return list.filter((s) => s.status.toLowerCase() === tab)
}

export function Showings() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const filtered = filterShowings(showings, activeTab)

  return (
    <div
      className="h-screen max-h-[100dvh] flex overflow-hidden"
      style={{ backgroundColor: tokens.background, fontFamily: "'Gilroy', sans-serif" }}
    >
      <CustomerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={cn('flex-1 flex flex-col min-w-0', CUSTOMER_SIDEBAR_OFFSET, 'h-screen max-h-[100dvh] overflow-hidden')}
      >
        <CustomerHeader title="Showings" onMenuClick={() => setSidebarOpen(true)} showUserDropdown />

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Showings</h2>
            <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
              Manage your property showing appointments.
            </p>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                    isActive ? 'text-gray-900' : 'text-gray-700 bg-white border hover:bg-gray-50'
                  )}
                  style={
                    isActive
                      ? { backgroundColor: tokens.goldenDark }
                      : { borderColor: tokens.border }
                  }
                >
                  {tab.label} ({tab.count})
                </button>
              )
            })}
          </div>

          {/* Showing cards */}
          <div className="space-y-4">
            {filtered.map((showing) => (
              <div
                key={showing.id}
                className="rounded-xl border bg-white overflow-hidden flex flex-col sm:flex-row"
                style={{ borderColor: tokens.border }}
              >
                <div className="sm:w-48 shrink-0 aspect-square sm:aspect-auto sm:h-auto">
                  <img
                    src={showing.image}
                    alt={showing.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0 p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="space-y-3 min-w-0">
                    <div>
                      <h3 className="text-base font-bold text-gray-900">{showing.title}</h3>
                      <p className="text-sm font-medium text-gray-500 mt-0.5">{showing.address}</p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Showing Details</p>
                      <div className="flex flex-wrap items-center gap-4 text-sm font-medium text-gray-700">
                        <span className="flex items-center gap-1.5">
                          <Calendar className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                          {showing.date}
                        </span>
                        <span className="flex items-center gap-1.5">
                          <Clock className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                          {showing.time}
                        </span>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1.5">Agent Information</p>
                      <div className="space-y-1 text-sm font-medium text-gray-700">
                        <p className="flex items-center gap-2">
                          <User className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                          {showing.agentName}
                        </p>
                        <p className="flex items-center gap-2">
                          <Phone className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                          {showing.agentPhone}
                        </p>
                        <p className="flex items-center gap-2">
                          <Mail className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                          {showing.agentEmail}
                        </p>
                      </div>
                    </div>
                    {showing.waitingNote && (
                      <p className="text-sm font-medium text-amber-700">Waiting for agent confirmation...</p>
                    )}
                    <div className="flex flex-wrap gap-2 pt-1">
                      {showing.status === 'Requested' && (
                        <Button variant="outline" size="sm" className="rounded-lg font-semibold border-gray-300 text-gray-800 hover:bg-gray-50">
                          View Details
                        </Button>
                      )}
                      {showing.status === 'Upcoming' && (
                        <>
                          <Button size="sm" className="rounded-lg font-semibold text-white" style={{ backgroundColor: tokens.goldenDark }}>
                            Reschedule
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-lg font-semibold border-gray-300 text-gray-800 hover:bg-gray-50">
                            Cancel Showing
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-lg font-semibold border-gray-300 text-gray-800 hover:bg-gray-50">
                            Contact Agent
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-lg font-semibold border-gray-300 text-gray-800 hover:bg-gray-50">
                            View Details
                          </Button>
                        </>
                      )}
                      {showing.status === 'Completed' && (
                        <>
                          <Button size="sm" variant="destructive" className="rounded-lg font-semibold">
                            Report No-Show
                          </Button>
                          <Button variant="outline" size="sm" className="rounded-lg font-semibold border-gray-300 text-gray-800 hover:bg-gray-50">
                            View Details
                          </Button>
                        </>
                      )}
                      {showing.status === 'Cancelled' && (
                        <Button variant="outline" size="sm" className="rounded-lg font-semibold border-gray-300 text-gray-800 hover:bg-gray-50">
                          View Details
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="shrink-0 sm:pt-0">
                    <span
                      className={cn(
                        'inline-flex px-3 py-1.5 rounded-lg text-sm font-semibold',
                        statusBadgeClass(showing.status)
                      )}
                    >
                      {showing.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
