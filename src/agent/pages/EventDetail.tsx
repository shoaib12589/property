import { useMemo, useState } from 'react'
import { Bell, Menu, Star, Ticket } from 'lucide-react'
import { useParams } from 'react-router-dom'
import { getAvatarUrl } from '@/lib/utils'
import { AgentSidebar } from '../components/AgentSidebar'
import {
  EVENT_DETAIL_HERO_IMAGE,
  EVENT_DETAIL_PARAGRAPHS,
  getListingEventById,
} from '../data/listingEventsData'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#A3906D',
} as const

const font = { fontFamily: 'Arial, sans-serif' } as const

export function EventDetail() {
  const { id } = useParams<{ id: string }>()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  const event = useMemo(() => getListingEventById(id), [id])

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden" style={{ backgroundColor: tokens.pageBg }}>
      <AgentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Calendars" />

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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-8 sm:pb-10 bg-white">
          <h2 className="text-2xl sm:text-[28px] font-bold text-[#111827] mb-4 leading-tight" style={font}>
            {event.title}
          </h2>

          <p className="text-base mb-3" style={font}>
            <span className="text-[#A3906D] font-medium">Venue: {event.venue}</span>
            <span className="text-[#6B7280]"> | </span>
            <span className="text-[#111827]">
              {event.startTime} - {event.endTime}
            </span>
          </p>

          <div className="flex flex-wrap items-center gap-6 mb-8 text-[#6B7280]">
            <div className="flex items-center gap-2">
              <Ticket className="w-5 h-5 shrink-0 text-[#9CA3AF]" strokeWidth={1.5} />
              <span className="text-base font-semibold text-[#111827]" style={font}>
                {event.price}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Star className="w-5 h-5 shrink-0 fill-[#F59E0B] text-[#F59E0B]" />
              <span className="text-base" style={font}>
                {event.interestedCount} interested
              </span>
            </div>
          </div>

          <div className="space-y-4 mb-8">
            {EVENT_DETAIL_PARAGRAPHS.map((paragraph, idx) => (
              <p key={idx} className="text-[15px] leading-relaxed text-[#111827]" style={font}>
                {paragraph}
              </p>
            ))}
          </div>

          <div className="rounded-xl overflow-hidden border w-full" style={{ borderColor: tokens.cardBorder }}>
            <img
              src={EVENT_DETAIL_HERO_IMAGE}
              alt=""
              className="w-full h-auto object-cover"
            />
          </div>
        </main>
      </div>
    </div>
  )
}
