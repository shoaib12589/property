import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Plus, Eye, Bell, Calendar, Search, Heart, Home, Menu } from 'lucide-react'
import { getAvatarUrl } from '@/lib/utils'
import { CustomerSidebar, CUSTOMER_SIDEBAR_OFFSET } from '@customer/components/CustomerSidebar'

const tokens = {
  border: '#E5E7EB',
}

const metrics = [
  { label: 'Active Listings', value: '12', icon: Home },
  { label: 'Total Views', value: '2,543', icon: Eye },
  { label: 'Upcoming Showings', value: '5', icon: Calendar },
  { label: 'Saved Properties', value: '28', icon: Heart },
]

const quickActions = [
  { icon: Plus, title: 'Create New Listing', subtitle: 'List a property' },
  { icon: Search, title: 'Search Properties', subtitle: 'Find your dream home' },
  { icon: Heart, title: 'Saved Searches', subtitle: 'Manage alerts' },
]

const recentActivities = [
  { text: 'Your listing "Modern Downtown Apartment" received 23 new views', time: '2 hours ago' },
  { text: 'Showing scheduled for "Luxury Villa in Suburbs" on Dec 20, 2025', time: '4 hours ago' },
  { text: 'Price drop alert: 3 properties matching your search', time: '1 day ago' },
  { text: 'New message from Agent Sarah Johnson', time: '1 day ago' },
  { text: 'Your listing "Cozy Family Home" was updated successfully', time: '2 days ago' },
]

const upcomingShowings = [
  { property: 'Luxury Villa in Suburbs', date: 'Dec 20, 2025 2:00 PM', agent: 'Sarah Johnson' },
  { property: 'Modern Downtown Condo', date: 'Dec 22, 2025 10:00 AM', agent: 'Mike Chen' },
  { property: 'Beach House Paradise', date: 'Dec 23, 2025 3:30 PM', agent: 'Emma Davis' },
]

const alerts = [
  { text: '3 properties in your saved searches had price reductions', count: '3 items' },
  { text: 'New listings matching "Downtown Apartments" search', count: '8 items' },
  { text: 'Your listing expires in 7 days', count: '1 items' },
]

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden bg-[#F8F9FA]" style={{ fontFamily: "'Gilroy', sans-serif" }}>
      <CustomerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Main content - only this area scrolls */}
      <div className={`flex-1 flex flex-col min-w-0 ${CUSTOMER_SIDEBAR_OFFSET} h-screen max-h-[100dvh] overflow-hidden`}>
        {/* Top Bar */}
        <header className="shrink-0 z-20 bg-white border-b px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4" style={{ borderColor: tokens.border }}>
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <div className="hidden lg:flex items-center gap-2">
              <span className="font-semibold text-gray-800">Dashboard</span>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <button className="relative p-2 rounded-lg hover:bg-gray-100" aria-label="Notifications">
              <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <span className="text-sm font-normal text-gray-700 hidden sm:inline">John Doe</span>
            <img src={getAvatarUrl('John Doe')} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <h1 className="text-xl font-bold text-gray-900 mb-6 sm:hidden">Dashboard</h1>

          {/* Key Metrics */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8">
            {metrics.map((m) => (
              <div
                key={m.label}
                className="bg-white rounded-xl p-5 shadow-sm border flex items-center justify-between"
                style={{ borderColor: tokens.border }}
              >
                <div>
                  <p className="text-sm font-normal text-gray-500 mb-0.5">{m.label}</p>
                  <p className="text-2xl sm:text-3xl font-extrabold text-gray-900">{m.value}</p>
                </div>
                <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                  <m.icon className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                </div>
              </div>
            ))}
          </section>

          {/* Quick Actions */}
          <section className="mb-8">
            <h2 className="text-base font-bold text-gray-900 mb-4">Quick Actions</h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {quickActions.map((a) => (
                <button
                  key={a.title}
                  className="bg-white rounded-xl p-5 border text-left hover:bg-gray-50 transition-colors flex items-start gap-4"
                  style={{ borderColor: tokens.border }}
                >
                  <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center shrink-0">
                    <a.icon className="w-6 h-6 text-gray-600" strokeWidth={1.5} />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">{a.title}</p>
                    <p className="text-sm font-normal text-gray-500">{a.subtitle}</p>
                  </div>
                </button>
              ))}
            </div>
          </section>

          {/* Recent Activities & Upcoming Showings */}
          <section className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
            <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: tokens.border }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900">Recent Activities</h2>
                <Link to="#" className="text-sm font-normal text-gray-500 hover:text-gray-700">View All</Link>
              </div>
              <ul className="space-y-3">
                {recentActivities.map((a, i) => (
                  <li key={i} className="flex gap-3 text-sm">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-400 mt-1.5 shrink-0" />
                    <div>
                      <p className="font-normal text-gray-800">{a.text}</p>
                      <p className="text-xs font-normal text-gray-500 mt-0.5">{a.time}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-white rounded-xl p-5 shadow-sm border" style={{ borderColor: tokens.border }}>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-base font-bold text-gray-900">Upcoming Showings</h2>
                <Link to="#" className="text-sm font-normal text-gray-500 hover:text-gray-700">View All</Link>
              </div>
              <div className="space-y-4">
                {upcomingShowings.map((s, i) => (
                  <div
                    key={i}
                    className={`flex flex-col gap-1 ${i < upcomingShowings.length - 1 ? 'pb-4 border-b' : ''}`}
                    style={{ borderColor: tokens.border }}
                  >
                    <p className="font-bold text-gray-900">{s.property}</p>
                    <div className="flex items-center gap-2 text-sm font-normal text-gray-600">
                      <Calendar className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                      {s.date}
                    </div>
                    <p className="text-sm font-normal text-gray-500">Agent: {s.agent}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Alerts Summary */}
          <section>
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-base font-bold text-gray-900">Alerts Summary</h2>
              <Link to="#" className="text-sm font-normal text-gray-500 hover:text-gray-700">View All Alerts</Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {alerts.map((a, i) => (
                <div
                  key={i}
                  className="rounded-xl p-4 border flex gap-3"
                  style={{ borderColor: tokens.border, backgroundColor: '#FEFCE8' }}
                >
                  <div className="w-8 h-8 rounded-full bg-amber-200 flex items-center justify-center shrink-0 mt-0.5">
                    <Bell className="w-4 h-4 text-amber-800" strokeWidth={2} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-800">{a.text}</p>
                    <p className="text-xs font-normal text-gray-500 mt-1">{a.count}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
