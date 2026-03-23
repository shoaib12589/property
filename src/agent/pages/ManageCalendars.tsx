import { useMemo, useState, useCallback } from 'react'
import {
  Bell,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Clock,
  Lock,
  MapPin,
  Menu,
  Phone,
  Mail,
  RefreshCw,
  User,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { getAvatarUrl } from '@/lib/utils'
import { AgentSidebar } from '../components/AgentSidebar'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#A3906D',
  accentLight: '#C4955D',
} as const

const font = { fontFamily: 'Arial, sans-serif' } as const

type ActionTab = 'add-showing' | 'block-time' | 'edit-schedule' | 'reset'

type ShowingCard = {
  id: string
  image: string
  title: string
  address: string
  date: string
  time: string
  agentName: string
  agentPhone: string
  agentEmail: string
}

type ListingEvent = {
  id: string
  title: string
  subtitle: string
  time: string
}

type Meeting = {
  id: string
  title: string
  description: string
  active: boolean
}

const SHOWINGS: ShowingCard[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop',
    title: 'Luxury Villa in Suburbs',
    address: '456 Oak Avenue, Los Angeles, CA',
    date: 'Dec 20, 2025',
    time: '2:00 PM',
    agentName: 'Sarah Johnson',
    agentPhone: '+1 234 567 8901',
    agentEmail: 'sarah@estatehub.com',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=400&h=300&fit=crop',
    title: 'Modern Downtown Condo',
    address: '789 Main Street, New York, NY',
    date: 'Dec 22, 2025',
    time: '',
    agentName: 'Mike Chen',
    agentPhone: '+1 234 567 8989',
    agentEmail: 'mike@estatehub.com',
  },
]

const LISTING_EVENTS: ListingEvent[] = [
  { id: '1', title: 'New Event Upcoming', subtitle: 'New Madleton LLC.', time: '05:48AM' },
  { id: '2', title: 'New Project Discussion', subtitle: 'New Madleton LLC.', time: '05:48AM' },
  { id: '3', title: 'New Project Discussion', subtitle: 'New Madleton LLC.', time: '05:48AM' },
]

const MEETINGS: Meeting[] = [
  { id: '1', title: 'Meeting with a client', description: 'My team generated $7,000 to $8,000...', active: true },
  { id: '2', title: 'Meeting From Admin', description: 'My team generated $7,000 to $8,000...', active: true },
  { id: '3', title: 'Meeting with a client', description: 'My team generated $7,000 to $8,000...', active: true },
]

const DAYS_OF_WEEK = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate()
}

function getFirstDayOffset(year: number, month: number) {
  const day = new Date(year, month, 1).getDay()
  return day === 0 ? 6 : day - 1
}

function TimeSpinner({
  value,
  onChange,
  max,
  step = 1,
}: {
  value: number
  onChange: (v: number) => void
  max: number
  step?: number
}) {
  const display = String(value).padStart(2, '0')
  return (
    <div className="flex items-center justify-between px-3">
      <button
        type="button"
        onClick={() => onChange((value - step + max + 1) % (max + 1))}
        className="p-1 rounded hover:bg-[#E5E0D8] text-[#9CA3AF] transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
      </button>
      <span className="text-xl font-semibold text-[#111827] w-12 text-center" style={font}>
        {display}
      </span>
      <button
        type="button"
        onClick={() => onChange((value + step) % (max + 1))}
        className="p-1 rounded hover:bg-[#E5E0D8] text-[#9CA3AF] transition-colors"
      >
        <ChevronRight className="w-5 h-5" />
      </button>
    </div>
  )
}

function TimePicker({
  title,
  onSetTime,
}: {
  title: string
  onSetTime: (h: number, m: number, s: number) => void
}) {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(5)
  const [seconds, setSeconds] = useState(30)

  return (
    <div
      className="absolute top-14 left-0 z-20 w-[260px] bg-[#F5F3EF] border rounded-2xl shadow-xl overflow-hidden"
      style={{ borderColor: '#E8E4DC' }}
    >
      <div className="px-4 pt-4 pb-3">
        <p className="text-xs text-[#A3906D] mb-3" style={font}>{title}</p>
        <div className="space-y-2 pb-2">
          <TimeSpinner value={hours} onChange={setHours} max={23} />
          <TimeSpinner value={minutes} onChange={setMinutes} max={59} step={5} />
          <TimeSpinner value={seconds} onChange={setSeconds} max={59} step={5} />
        </div>
      </div>
      <button
        type="button"
        onClick={() => onSetTime(hours, minutes, seconds)}
        className="w-full py-3 text-sm font-medium text-[#A3906D] hover:text-[#8A7A5C] transition-colors bg-[#EDE9E3]"
        style={font}
      >
        Set time
      </button>
    </div>
  )
}

function MiniCalendar({ onPickDate }: { onPickDate: (d: Date) => void }) {
  const today = new Date()
  const [year, setYear] = useState(today.getFullYear())
  const [month, setMonth] = useState(today.getMonth())

  const daysInMonth = getDaysInMonth(year, month)
  const firstDay = getFirstDayOffset(year, month)
  const prevMonthDays = getDaysInMonth(year, month - 1)

  const prevMonth = () => {
    if (month === 0) { setYear(year - 1); setMonth(11) } else setMonth(month - 1)
  }
  const nextMonth = () => {
    if (month === 11) { setYear(year + 1); setMonth(0) } else setMonth(month + 1)
  }

  const monthLabel = new Date(year, month).toLocaleString('default', { month: 'long', year: 'numeric' })

  const isToday = (d: number) =>
    year === today.getFullYear() && month === today.getMonth() && d === today.getDate()

  const leadingBlanks = Array.from({ length: firstDay }, (_, i) => (
    <span key={`prev-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-300">
      {prevMonthDays - firstDay + 1 + i}
    </span>
  ))

  const dayCells = Array.from({ length: daysInMonth }, (_, i) => {
    const d = i + 1
    return (
      <button
        key={d}
        type="button"
        onClick={() => onPickDate(new Date(year, month, d))}
        className={[
          'w-8 h-8 flex items-center justify-center text-xs rounded-full transition-colors',
          isToday(d) ? 'text-white' : 'text-[#374151] hover:bg-gray-100',
        ].join(' ')}
        style={isToday(d) ? { backgroundColor: tokens.accent } : undefined}
      >
        {d}
      </button>
    )
  })

  const totalCells = firstDay + daysInMonth
  const trailingCount = totalCells % 7 === 0 ? 0 : 7 - (totalCells % 7)
  const trailingBlanks = Array.from({ length: trailingCount }, (_, i) => (
    <span key={`next-${i}`} className="w-8 h-8 flex items-center justify-center text-xs text-gray-300">
      {i + 1}
    </span>
  ))

  return (
    <div
      className="absolute top-14 left-0 z-20 w-[290px] bg-white border rounded-xl shadow-lg p-4"
      style={{ borderColor: tokens.cardBorder }}
    >
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={prevMonth} className="p-1 rounded hover:bg-gray-100 text-gray-500">
          <ChevronLeft className="w-4 h-4" />
        </button>
        <span className="text-sm font-medium text-[#111827]" style={font}>{monthLabel}</span>
        <button type="button" onClick={nextMonth} className="p-1 rounded hover:bg-gray-100 text-gray-500">
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0 mb-1">
        {DAYS_OF_WEEK.map((wd) => (
          <span key={wd} className="w-8 h-7 flex items-center justify-center text-[11px] font-medium text-[#9CA3AF]">
            {wd}
          </span>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0">
        {leadingBlanks}
        {dayCells}
        {trailingBlanks}
      </div>
    </div>
  )
}

export function ManageCalendars() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeAction, setActiveAction] = useState<ActionTab | null>(null)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  const toggleAction = useCallback((tab: ActionTab) => {
    setActiveAction((prev) => (prev === tab ? null : tab))
  }, [])

  const handleSetTime = useCallback((_h: number, _m: number, _s: number) => {
    setActiveAction(null)
  }, [])

  const handlePickDate = useCallback((_d: Date) => {
    setActiveAction(null)
  }, [])

  const handleReset = useCallback(() => {
    setActiveAction(null)
  }, [])

  const ACTION_BUTTONS: { key: ActionTab; label: string; icon: React.ReactNode }[] = [
    {
      key: 'add-showing',
      label: 'Add showing time',
      icon: <Clock className="w-4 h-4" />,
    },
    {
      key: 'block-time',
      label: 'Block Time',
      icon: <Lock className="w-4 h-4" />,
    },
    {
      key: 'edit-schedule',
      label: 'Edit schedule',
      icon: <Calendar className="w-4 h-4" />,
    },
    {
      key: 'reset',
      label: 'Reset availability',
      icon: <RefreshCw className="w-4 h-4" />,
    },
  ]

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
          {/* Action buttons */}
          <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6 relative">
            {ACTION_BUTTONS.map((btn) => {
              const isActive = activeAction === btn.key
              return (
                <div key={btn.key} className="relative">
                  <button
                    type="button"
                    onClick={() => btn.key === 'reset' ? handleReset() : toggleAction(btn.key)}
                    className={[
                      'flex items-center gap-2 px-5 py-2.5 rounded-lg border text-sm font-medium transition-colors',
                      isActive
                        ? 'text-white border-transparent'
                        : 'bg-white text-[#374151] border-[#E5E7EB] hover:bg-gray-50',
                    ].join(' ')}
                    style={
                      isActive
                        ? { backgroundColor: tokens.accent, ...font }
                        : font
                    }
                  >
                    {btn.icon}
                    {btn.label}
                  </button>

                  {isActive && btn.key === 'add-showing' && (
                    <TimePicker title="Add Showing time" onSetTime={handleSetTime} />
                  )}
                  {isActive && btn.key === 'block-time' && (
                    <TimePicker title="Slide to set required block time" onSetTime={handleSetTime} />
                  )}
                  {isActive && btn.key === 'edit-schedule' && (
                    <MiniCalendar onPickDate={handlePickDate} />
                  )}
                </div>
              )
            })}
          </div>

          {/* Property showing cards */}
          <div className="space-y-6 mb-8">
            {SHOWINGS.map((s) => (
              <div
                key={s.id}
                className="border rounded-xl overflow-hidden"
                style={{ borderColor: tokens.cardBorder }}
              >
                <div className="flex flex-col md:flex-row">
                  {/* Image */}
                  <div className="w-full md:w-[240px] shrink-0">
                    <img
                      src={s.image}
                      alt={s.title}
                      className="w-full h-48 md:h-full object-cover"
                    />
                  </div>

                  {/* Details */}
                  <div className="flex-1 p-5">
                    <h3 className="text-lg font-semibold text-[#111827] mb-1" style={font}>
                      {s.title}
                    </h3>
                    <div className="flex items-center gap-1.5 text-sm text-[#6B7280] mb-4">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <span style={font}>{s.address}</span>
                    </div>

                    <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                      {/* Showing details */}
                      <div>
                        <p className="text-sm font-medium text-[#374151] mb-2" style={font}>
                          Showing Details
                        </p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <Calendar className="w-4 h-4 shrink-0 text-[#9CA3AF]" />
                            <span style={font}>{s.date}</span>
                          </div>
                          {s.time && (
                            <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                              <Clock className="w-4 h-4 shrink-0 text-[#9CA3AF]" />
                              <span style={font}>{s.time}</span>
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Agent Information */}
                      <div>
                        <p className="text-sm font-medium text-[#374151] mb-2" style={font}>
                          Agent Information
                        </p>
                        <div className="space-y-1.5">
                          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <User className="w-4 h-4 shrink-0 text-[#9CA3AF]" />
                            <span style={font}>{s.agentName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <Phone className="w-4 h-4 shrink-0 text-[#9CA3AF]" />
                            <span style={font}>{s.agentPhone}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-[#6B7280]">
                            <Mail className="w-4 h-4 shrink-0 text-[#9CA3AF]" />
                            <span style={font}>{s.agentEmail}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom section: Listing events + Meeting */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Listing events */}
            <div
              className="border rounded-xl p-5"
              style={{ borderColor: tokens.cardBorder }}
            >
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-[#111827]" style={font}>
                  Listing events
                </h2>
                <Link
                  to="/agent/listing-events"
                  className="text-sm text-[#6B7280] hover:text-[#111827] transition-colors"
                  style={font}
                >
                  See All
                </Link>
              </div>
              <div className="space-y-3">
                {LISTING_EVENTS.map((evt) => (
                  <div
                    key={evt.id}
                    className="flex items-center gap-3 p-3 rounded-lg bg-[#F9FAFB]"
                  >
                    <div className="w-10 h-10 rounded-lg bg-[#F3F4F6] flex items-center justify-center shrink-0">
                      <Calendar className="w-5 h-5 text-[#6B7280]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-[#111827] truncate" style={font}>
                        {evt.title}
                      </p>
                      <p className="text-xs text-[#9CA3AF] truncate" style={font}>
                        {evt.subtitle}
                      </p>
                    </div>
                    <div className="flex items-center gap-1.5 shrink-0">
                      <span className="w-2 h-2 rounded-full bg-[#22C55E]" />
                      <span className="text-xs text-[#6B7280]" style={font}>
                        {evt.time}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Meeting */}
            <div
              className="border rounded-xl p-5"
              style={{ borderColor: tokens.cardBorder }}
            >
              <h2 className="text-lg font-semibold text-[#111827] mb-4" style={font}>
                Meeting
              </h2>
              <div className="space-y-3">
                {MEETINGS.map((m) => (
                  <div
                    key={m.id}
                    className="flex items-center justify-between p-3 rounded-lg bg-[#F9FAFB]"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-[#111827] truncate" style={font}>
                        {m.title}
                      </p>
                      <p className="text-xs text-[#9CA3AF] truncate" style={font}>
                        {m.description}
                      </p>
                    </div>
                    <span
                      className={[
                        'w-3 h-3 rounded-full shrink-0 ml-3',
                        m.active ? 'bg-[#22C55E]' : 'bg-gray-300',
                      ].join(' ')}
                    />
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
