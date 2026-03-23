import { useMemo, useState } from 'react'
import { Bell, ChevronRight, Menu, TrendingDown, Home, Calendar, MessageCircle, Eye, Trash2 } from 'lucide-react'
import { getAvatarUrl } from '@/lib/utils'
import { AgentSidebar } from '../components/AgentSidebar'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#C4955D',
}

const font = { fontFamily: 'Arial, sans-serif' } as const

const FILTER_TABS = ['All', 'Unread', 'Price Drops', 'New Listings', 'Showings', 'Messages']

type AlertType = 'price-drop' | 'new-listing' | 'showing' | 'message' | 'activity'

type AlertItem = {
  id: string
  type: AlertType
  title: string
  description: string
  time: string
  tags?: string[]
  read: boolean
}

const INITIAL_ALERTS: AlertItem[] = [
  {
    id: '1',
    type: 'price-drop',
    title: 'Price Drop Alert',
    description: '3 properties in your saved searches had price reductions',
    time: '2 hours ago',
    tags: ['Modern Downtown Apartment', 'Beach House Paradise', 'Urban Loft Studio'],
    read: false,
  },
  {
    id: '2',
    type: 'new-listing',
    title: 'New Listings',
    description: '8 new properties match your "Downtown Apartments" search',
    time: '5 hours ago',
    read: false,
  },
  {
    id: '3',
    type: 'showing',
    title: 'Showing Reminder',
    description: 'Your showing for "Luxury Villa in Suburbs" is tomorrow at 2:00 PM',
    time: '1 day ago',
    read: false,
  },
  {
    id: '4',
    type: 'message',
    title: 'New Message',
    description: 'Agent Sarah Johnson sent you a message',
    time: '1 day ago',
    read: true,
  },
  {
    id: '5',
    type: 'activity',
    title: 'Listing Activity',
    description: 'Your listing "Modern Downtown Apartment" received 23 new views',
    time: '2 days ago',
    read: true,
  },
]

const ALERT_ICONS: Record<AlertType, React.ReactNode> = {
  'price-drop': (
    <div className="w-10 h-10 rounded-lg bg-[#DCFCE7] flex items-center justify-center">
      <TrendingDown className="w-5 h-5 text-[#16A34A]" strokeWidth={2} />
    </div>
  ),
  'new-listing': (
    <div className="w-10 h-10 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
      <Home className="w-5 h-5 text-[#2563EB]" strokeWidth={2} />
    </div>
  ),
  'showing': (
    <div className="w-10 h-10 rounded-lg bg-[#F3E8FF] flex items-center justify-center">
      <Calendar className="w-5 h-5 text-[#9333EA]" strokeWidth={2} />
    </div>
  ),
  'message': (
    <div className="w-10 h-10 rounded-lg bg-[#FEE2E2] flex items-center justify-center">
      <MessageCircle className="w-5 h-5 text-[#EF4444]" strokeWidth={2} />
    </div>
  ),
  'activity': (
    <div className="w-10 h-10 rounded-lg bg-[#DBEAFE] flex items-center justify-center">
      <Eye className="w-5 h-5 text-[#3B82F6]" strokeWidth={2} />
    </div>
  ),
}

export function Alerts() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('All')
  const [alerts, setAlerts] = useState(INITIAL_ALERTS)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  const filteredAlerts = useMemo(() => {
    if (activeTab === 'All') return alerts
    if (activeTab === 'Unread') return alerts.filter(a => !a.read)
    if (activeTab === 'Price Drops') return alerts.filter(a => a.type === 'price-drop')
    if (activeTab === 'New Listings') return alerts.filter(a => a.type === 'new-listing')
    if (activeTab === 'Showings') return alerts.filter(a => a.type === 'showing')
    if (activeTab === 'Messages') return alerts.filter(a => a.type === 'message')
    return alerts
  }, [alerts, activeTab])

  const markAsRead = (id: string) => {
    setAlerts(prev => prev.map(a => a.id === id ? { ...a, read: true } : a))
  }

  const deleteAlert = (id: string) => {
    setAlerts(prev => prev.filter(a => a.id !== id))
  }

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden" style={{ backgroundColor: tokens.pageBg }}>
      <AgentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Alerts" />

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
              <h1
                className="text-2xl font-normal text-[#0a0a0a]"
                style={{ ...font, lineHeight: '32px' }}
              >
                Alerts
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
                <span className="text-base text-[#0a0a0a]" style={font}>
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-6 sm:pb-8 bg-white">
          <div className="flex flex-wrap gap-2 mb-4 sm:mb-6">
            {FILTER_TABS.map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={[
                  'px-4 py-2 text-sm font-medium rounded-full transition-colors',
                  activeTab === tab
                    ? 'bg-[#4B5563] text-white'
                    : 'bg-[#F3F4F6] text-[#6B7280] hover:bg-gray-200',
                ].join(' ')}
                style={font}
              >
                {tab}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            {filteredAlerts.map((alert) => (
              <div
                key={alert.id}
                className="border rounded-lg bg-white overflow-hidden"
                style={{
                  borderColor: tokens.cardBorder,
                  borderLeftWidth: '3px',
                  borderLeftColor: tokens.accent,
                }}
              >
                <div className="p-4">
                  <div className="flex items-start gap-4">
                    {ALERT_ICONS[alert.type]}

                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="flex items-center gap-2">
                          <h3 className="text-base font-medium text-[#111827]" style={font}>
                            {alert.title}
                          </h3>
                          {!alert.read && (
                            <span className="w-2 h-2 rounded-full bg-[#C4955D]" />
                          )}
                        </div>

                        <div className="flex items-center gap-3 shrink-0">
                          {!alert.read && (
                            <button
                              type="button"
                              onClick={() => markAsRead(alert.id)}
                              className="text-xs text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                              style={font}
                            >
                              Mark as read
                            </button>
                          )}
                          <button
                            type="button"
                            onClick={() => deleteAlert(alert.id)}
                            className="text-[#9CA3AF] hover:text-[#6B7280] transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>

                      <p className="text-sm text-[#6B7280] mt-1 mb-2" style={font}>
                        {alert.description}
                      </p>

                      {alert.tags && alert.tags.length > 0 && (
                        <div className="flex flex-wrap gap-2 mb-3">
                          {alert.tags.map((tag, idx) => (
                            <span
                              key={idx}
                              className="px-2 py-1 text-xs bg-[#F3F4F6] text-[#6B7280] rounded"
                              style={font}
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="flex items-center justify-between">
                        <span className="text-xs text-[#9CA3AF]" style={font}>
                          {alert.time}
                        </span>

                        <a
                          href="#"
                          className="flex items-center text-xs text-[#9CA3AF] hover:text-[#C4955D] transition-colors"
                          style={font}
                        >
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}

            {filteredAlerts.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#6B7280]" style={font}>
                  No alerts found
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
