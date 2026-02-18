import { useState } from 'react'
import {
  Settings,
  TrendingDown,
  Home,
  Calendar,
  MessageCircle,
  Eye,
  Trash2,
  ChevronRight,
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
  activeBg: '#FEF3C7',
  activeColor: '#92400E',
}

const summaryCards = [
  { label: 'Total Alerts', value: '6', valueGreen: false },
  { label: 'Unread', value: '3', valueGreen: false },
  { label: 'Price Drops', value: '2', valueGreen: true },
  { label: 'New Listings', value: '1', valueGreen: true },
]

const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'unread', label: 'Unread' },
  { key: 'price-drops', label: 'Price Drops' },
  { key: 'new-listings', label: 'New Listings' },
  { key: 'showings', label: 'Showings' },
  { key: 'messages', label: 'Messages' },
]

type AlertType = 'price-drop' | 'new-listings' | 'showing' | 'message' | 'listing-activity'

interface AlertItem {
  id: string
  type: AlertType
  title: string
  description: string
  showDot?: boolean
  tags?: string[]
  agentName?: string
  time: string
  unread?: boolean
}

const alertsData: AlertItem[] = [
  {
    id: '1',
    type: 'price-drop',
    title: 'Price Drop Alert',
    description: 'Properties in your saved searches have reduced their prices.',
    showDot: true,
    tags: ['Modern Downtown Apartment', 'Beach House Paradise', 'Urban Loft Studio'],
    time: '2 hours ago',
    unread: true,
  },
  {
    id: '2',
    type: 'new-listings',
    title: 'New Listings',
    description: 'New properties matching your criteria are now available.',
    showDot: true,
    time: '5 hours ago',
    unread: true,
  },
  {
    id: '3',
    type: 'showing',
    title: 'Showing Reminder',
    description: 'Your showing for Luxury Villa in Suburbs is scheduled for tomorrow at 2:00 PM.',
    agentName: 'Sarah Johnson',
    time: '1 day ago',
    unread: true,
  },
  {
    id: '4',
    type: 'message',
    title: 'New Message',
    description: 'You have a new message from your agent regarding your inquiry.',
    agentName: 'Mike Chen',
    time: '1 day ago',
  },
  {
    id: '5',
    type: 'listing-activity',
    title: 'Listing Activity',
    description: 'Your saved property "Modern Downtown Apartment" received 15 new views.',
    time: '2 days ago',
  },
  {
    id: '6',
    type: 'price-drop',
    title: 'Price Drop Alert',
    description: 'A property you viewed has reduced its price.',
    tags: ['Beach House Paradise'],
    time: '3 days ago',
  },
]

function getAlertIcon(type: AlertType) {
  const base = 'w-8 h-8 rounded-lg flex items-center justify-center shrink-0'
  switch (type) {
    case 'price-drop':
      return (
        <div className={cn(base, 'bg-green-100 text-green-700')}>
          <TrendingDown className="w-4 h-4" strokeWidth={2} />
        </div>
      )
    case 'new-listings':
      return (
        <div className={cn(base, 'bg-sky-100 text-sky-700')}>
          <Home className="w-4 h-4" strokeWidth={1.5} />
        </div>
      )
    case 'showing':
      return (
        <div className={cn(base, 'bg-violet-100 text-violet-700')}>
          <Calendar className="w-4 h-4" strokeWidth={1.5} />
        </div>
      )
    case 'message':
      return (
        <div className={cn(base, 'bg-orange-100 text-orange-700')}>
          <MessageCircle className="w-4 h-4" strokeWidth={1.5} />
        </div>
      )
    case 'listing-activity':
      return (
        <div className={cn(base, 'bg-indigo-100 text-indigo-700')}>
          <Eye className="w-4 h-4" strokeWidth={1.5} />
        </div>
      )
    default:
      return null
  }
}

export function Alerts() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')

  return (
    <div
      className="h-screen max-h-[100dvh] flex overflow-hidden"
      style={{ backgroundColor: tokens.background, fontFamily: "'Gilroy', sans-serif" }}
    >
      <CustomerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={cn('flex-1 flex flex-col min-w-0', CUSTOMER_SIDEBAR_OFFSET, 'h-screen max-h-[100dvh] overflow-hidden')}
      >
        <CustomerHeader title="Alerts" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {/* Header: title, subtitle, actions */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Alerts & Notifications</h2>
              <p className="text-sm font-medium text-gray-500 mt-1">Stay updated with your property activities</p>
            </div>
            <div className="flex items-center gap-2 shrink-0">
              <Button
                type="button"
                variant="outline"
                className="rounded-lg h-10 px-4 font-semibold text-gray-700"
                style={{ borderColor: tokens.border }}
              >
                Mark All as Read
              </Button>
              <button
                type="button"
                className="p-2.5 rounded-lg border hover:bg-gray-50"
                style={{ borderColor: tokens.border }}
                aria-label="Settings"
              >
                <Settings className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border bg-white p-4"
                style={{ borderColor: tokens.border }}
              >
                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                <p
                  className={cn(
                    'text-xl font-bold mt-1',
                    card.valueGreen ? 'text-green-600' : 'text-gray-900'
                  )}
                >
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filterTabs.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => setActiveTab(tab.key)}
                className={cn(
                  'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                  activeTab === tab.key
                    ? 'text-white'
                    : 'bg-white text-gray-700 border hover:bg-gray-50'
                )}
                style={{
                  ...(activeTab === tab.key ? { backgroundColor: tokens.goldenDark } : { borderColor: tokens.border }),
                }}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Alert list */}
          <div className="space-y-4">
            {alertsData.map((alert) => (
              <div
                key={alert.id}
                className="rounded-xl border bg-white p-4 sm:p-5 flex flex-col sm:flex-row sm:items-start gap-4"
                style={{ borderColor: tokens.border }}
              >
                <div className="flex gap-4 flex-1 min-w-0">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-gray-900">{alert.title}</h3>
                      {alert.showDot && (
                        <span
                          className="w-1.5 h-1.5 rounded-full shrink-0"
                          style={{ backgroundColor: tokens.goldenDark }}
                        />
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-600 mt-1">{alert.description}</p>
                    {alert.tags && alert.tags.length > 0 && (
                      <div className="flex flex-wrap gap-2 mt-2">
                        {alert.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-700"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                    {alert.agentName && (
                      <p className="text-sm font-medium text-gray-500 mt-2">Agent: {alert.agentName}</p>
                    )}
                    <p className="text-xs font-medium text-gray-400 mt-2">{alert.time}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 sm:gap-4 shrink-0 sm:pl-2">
                  <button type="button" className="text-sm font-semibold text-gray-600 hover:text-gray-900">
                    Mark as read
                  </button>
                  <button
                    type="button"
                    className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-red-600"
                    aria-label="Delete alert"
                  >
                    <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                  </button>
                  <button
                    type="button"
                    className="text-sm font-semibold flex items-center gap-1 hover:underline"
                    style={{ color: tokens.goldenDark }}
                  >
                    View Details
                    <ChevronRight className="w-4 h-4" strokeWidth={2} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
