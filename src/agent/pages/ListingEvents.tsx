import { useMemo, useState } from 'react'
import { Bell, MapPin, Menu, Star, Ticket } from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAvatarUrl } from '@/lib/utils'
import { AgentSidebar } from '../components/AgentSidebar'
import { LISTING_EVENTS } from '../data/listingEventsData'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#A3906D',
} as const

const font = { fontFamily: 'Arial, sans-serif' } as const

export function ListingEvents() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden" style={{ backgroundColor: tokens.pageBg }}>
      <AgentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Calendars" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 bg-white">
        {/* Header */}
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
              <h1 className="text-2xl font-semibold text-[#0a0a0a]" style={{ ...font, lineHeight: '32px' }}>
                Manage Calenders
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

        {/* Main */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-6 sm:pb-8 bg-white">
          <h2 className="text-lg sm:text-xl font-semibold text-[#111827] mb-4 sm:mb-6" style={font}>
            Events
          </h2>

          {/* Events Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 mb-6 sm:mb-8">
            {LISTING_EVENTS.map((event) => (
              <Link
                key={event.id}
                to={`/agent/listing-events/${event.id}`}
                className="rounded-xl overflow-hidden border bg-white group cursor-pointer hover:shadow-lg transition-shadow block"
                style={{ borderColor: tokens.cardBorder }}
              >
                {/* Image with date badge */}
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Date badge */}
                  <div className="absolute top-3 right-3 text-center">
                    <div className="text-white text-sm font-bold leading-tight" style={font}>
                      {event.dateMonth}
                    </div>
                    <div className="text-white text-2xl font-bold leading-tight" style={font}>
                      {event.dateDay}
                    </div>
                  </div>
                  {/* Label tag */}
                  <div
                    className="absolute bottom-0 left-0 px-3 py-1.5 rounded-tr-lg text-white text-xs font-medium"
                    style={{ backgroundColor: event.labelColor, ...font }}
                  >
                    {event.label}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4">
                  <h3 className="text-base font-semibold text-[#111827] mb-2 line-clamp-2" style={font}>
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-1.5 text-sm text-[#6B7280] mb-2">
                    <MapPin className="w-4 h-4 shrink-0 text-[#9CA3AF]" />
                    <span style={font}>
                      Venue: {event.venue}
                    </span>
                  </div>

                  <p className="text-sm text-[#6B7280] mb-3" style={font}>
                    {event.startTime} - {event.endTime}
                  </p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1.5 text-sm font-medium text-[#111827]">
                      <Ticket className="w-4 h-4 shrink-0 text-[#A3906D]" />
                      <span style={font}>{event.price}</span>
                    </div>
                    <div className="flex items-center gap-1.5 text-sm text-[#6B7280]">
                      <Star className="w-4 h-4 shrink-0 fill-[#F59E0B] text-[#F59E0B]" />
                      <span style={font}>{event.interestedCount} interested</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Bottom CTA Banner */}
          <div
            className="w-full py-3 px-6 text-center rounded-lg"
            style={{ backgroundColor: tokens.accent }}
          >
            <p className="text-sm text-white font-medium" style={font}>
              Register now to explore premium properties and secure the best deals before they are gone!
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
