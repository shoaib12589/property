import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Bell, ChevronDown, ChevronLeft, ChevronRight, Menu } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { BrokerSidebar } from '../components/BrokerSidebar'

const tokens = { pageBg: '#ffffff', cardBorder: '#E5E7EB', accent: '#A49776' }
const font = { fontFamily: 'Arial, sans-serif' } as const

type EventColor = 'green' | 'blue' | 'gold' | 'red'

type CalendarEvent = {
  id: string
  title: string
  date: string
  hour: number
  minute: number
  color: EventColor
}

const DOT_COLORS: Record<EventColor, string> = {
  green: '#22C55E',
  blue: '#3B82F6',
  gold: '#D4A017',
  red: '#EF4444',
}

const TIMEZONES = [
  { label: 'UK Timezone', tz: 'Europe/London' },
  { label: 'US Eastern', tz: 'America/New_York' },
  { label: 'US Central', tz: 'America/Chicago' },
  { label: 'US Pacific', tz: 'America/Los_Angeles' },
  { label: 'EU Central', tz: 'Europe/Berlin' },
  { label: 'India (IST)', tz: 'Asia/Kolkata' },
  { label: 'Australia (AEST)', tz: 'Australia/Sydney' },
]

type ViewMode = 'This week' | 'This day' | 'This month'

const MONTH_NAMES = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
const DAY_NAMES = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
const DAY_NAMES_SHORT = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']

const HOUR_START = 7
const HOUR_END = 21

function dateKey(d: Date): string {
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

function getMonday(d: Date): Date {
  const copy = new Date(d)
  const day = copy.getDay()
  const diff = day === 0 ? -6 : 1 - day
  copy.setDate(copy.getDate() + diff)
  copy.setHours(0, 0, 0, 0)
  return copy
}

function addDays(d: Date, n: number): Date {
  const copy = new Date(d)
  copy.setDate(copy.getDate() + n)
  return copy
}

function isSameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

function generateSampleEvents(): CalendarEvent[] {
  const today = new Date()
  const monday = getMonday(today)
  const events: CalendarEvent[] = []
  const colors: EventColor[] = ['green', 'blue', 'gold', 'red']
  const titles = [
    'Meeting with client',
    'Meeting with agent',
    'Meeting review',
    'Meeting standup',
    'Meeting with seller',
    'Meeting follow-up',
    'Meeting inspection',
    'Meeting with buyer',
    'Meeting closing',
    'Meeting planning',
  ]

  let id = 1
  for (let w = -2; w <= 4; w++) {
    const weekStart = addDays(monday, w * 7)
    const dayOffsets = [0, 3, 4, 5]
    for (const offset of dayOffsets) {
      const day = addDays(weekStart, offset)
      const dk = dateKey(day)
      const count = 1 + Math.floor(Math.abs(((day.getDate() * 7 + w * 3) % 4)))
      for (let e = 0; e < count; e++) {
        const hour = HOUR_START + 1 + ((id * 3 + e * 5) % (HOUR_END - HOUR_START - 2))
        const minute = (id * 17 + e * 23) % 60
        events.push({
          id: `evt-${id}`,
          title: titles[(id - 1) % titles.length],
          date: dk,
          hour,
          minute,
          color: colors[(id + e) % colors.length],
        })
        id++
      }
    }
  }
  return events
}

const ALL_EVENTS = generateSampleEvents()

function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: () => void) {
  useEffect(() => {
    const listener = (e: MouseEvent) => {
      if (!ref.current || ref.current.contains(e.target as Node)) return
      handler()
    }
    document.addEventListener('mousedown', listener)
    return () => document.removeEventListener('mousedown', listener)
  }, [ref, handler])
}

function useLiveClock(tz: string) {
  const [now, setNow] = useState(new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 10_000)
    return () => clearInterval(id)
  }, [])

  const formatted = useMemo(() => {
    try {
      return now.toLocaleTimeString('en-GB', {
        timeZone: tz,
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
      }).toUpperCase()
    } catch {
      return now.toLocaleTimeString('en-GB', { hour: 'numeric', minute: '2-digit', hour12: true }).toUpperCase()
    }
  }, [now, tz])

  return { now, formatted }
}

function Dropdown({
  value,
  options,
  onChange,
}: {
  value: string
  options: { label: string; value: string }[]
  onChange: (v: string) => void
}) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, () => setOpen(false))

  const selected = options.find((o) => o.value === value)

  return (
    <div className="relative" ref={ref}>
      <button
        type="button"
        onClick={() => setOpen((p) => !p)}
        className="inline-flex items-center gap-1 h-9 pl-3 pr-7 rounded-lg border border-[#D1D5DB] bg-white text-[13px] text-[#374151] hover:bg-gray-50"
        style={font}
      >
        {selected?.label ?? value}
      </button>
      <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
      {open && (
        <div className="absolute top-full left-0 mt-1 z-30 min-w-full w-max bg-white border border-[#E5E7EB] rounded-lg shadow-lg py-1 max-h-60 overflow-y-auto">
          {options.map((o) => (
            <button
              key={o.value}
              type="button"
              onClick={() => {
                onChange(o.value)
                setOpen(false)
              }}
              className={`w-full text-left px-3 py-2 text-[13px] hover:bg-gray-50 ${o.value === value ? 'text-[#A49776] font-semibold bg-gray-50' : 'text-[#374151]'}`}
              style={font}
            >
              {o.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

function MiniCalendar({
  selected,
  onSelect,
  onClose,
}: {
  selected: Date
  onSelect: (d: Date) => void
  onClose: () => void
}) {
  const [viewMonth, setViewMonth] = useState(selected.getMonth())
  const [viewYear, setViewYear] = useState(selected.getFullYear())
  const ref = useRef<HTMLDivElement>(null)
  useClickOutside(ref, onClose)

  const firstDay = new Date(viewYear, viewMonth, 1)
  const startDay = firstDay.getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()

  const prevMonth = () => {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear((y) => y - 1)
    } else {
      setViewMonth((m) => m - 1)
    }
  }

  const nextMonth = () => {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear((y) => y + 1)
    } else {
      setViewMonth((m) => m + 1)
    }
  }

  const cells: (number | null)[] = []
  for (let i = 0; i < startDay; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(d)
  while (cells.length % 7 !== 0) cells.push(null)

  const today = new Date()

  return (
    <div ref={ref} className="absolute top-full left-0 mt-1 z-40 bg-white border border-[#E5E7EB] rounded-xl shadow-lg p-4 w-[280px]" style={font}>
      <div className="flex items-center justify-between mb-3">
        <button type="button" onClick={prevMonth} className="p-1 rounded hover:bg-gray-100">
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <span className="text-[14px] font-semibold text-[#111827]">
          {MONTH_NAMES[viewMonth]} {viewYear}
        </span>
        <button type="button" onClick={nextMonth} className="p-1 rounded hover:bg-gray-100">
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>
      </div>
      <div className="grid grid-cols-7 gap-0 text-center text-[11px] text-[#9CA3AF] mb-1">
        {DAY_NAMES_SHORT.map((d) => (
          <div key={d} className="py-1">{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-0 text-center text-[13px]">
        {cells.map((day, idx) => {
          if (day === null) return <div key={`e-${idx}`} />
          const cellDate = new Date(viewYear, viewMonth, day)
          const isSelected = isSameDay(cellDate, selected)
          const isToday = isSameDay(cellDate, today)
          return (
            <button
              key={`d-${day}`}
              type="button"
              onClick={() => {
                onSelect(cellDate)
                onClose()
              }}
              className={`w-8 h-8 mx-auto rounded-full flex items-center justify-center transition-colors
                ${isSelected ? 'bg-[#A49776] text-white' : isToday ? 'bg-[#F3F4F6] text-[#A49776] font-semibold' : 'text-[#374151] hover:bg-gray-100'}`}
            >
              {day}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function EventPill({ event }: { event: CalendarEvent }) {
  const topPx = ((event.hour - HOUR_START) * 60 + event.minute) / ((HOUR_END - HOUR_START) * 60) * 100
  return (
    <div
      className="absolute left-2 right-2 flex items-center gap-1.5 h-[26px] px-2.5 rounded-md bg-white border border-[#E5E7EB] text-[11px] text-[#374151] truncate shadow-sm cursor-pointer hover:shadow-md transition-shadow z-[5]"
      style={{ top: `${topPx}%`, ...font }}
      title={`${event.title} — ${event.hour}:${String(event.minute).padStart(2, '0')}`}
    >
      <span className="w-2 h-2 rounded-full shrink-0" style={{ backgroundColor: DOT_COLORS[event.color] }} />
      <span className="truncate">Meetin...</span>
    </div>
  )
}

export function ManageCalendars() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  const [selectedDate, setSelectedDate] = useState(() => new Date())
  const [viewMode, setViewMode] = useState<ViewMode>('This week')
  const [tzIdx, setTzIdx] = useState('0')
  const tz = TIMEZONES[Number(tzIdx)] ?? TIMEZONES[0]
  const { now, formatted: liveTime } = useLiveClock(tz.tz)

  const [datePickerOpen, setDatePickerOpen] = useState(false)

  const goToday = useCallback(() => setSelectedDate(new Date()), [])

  const goPrev = useCallback(() => {
    setSelectedDate((d) => {
      if (viewMode === 'This day') return addDays(d, -1)
      if (viewMode === 'This month') {
        const copy = new Date(d)
        copy.setMonth(copy.getMonth() - 1)
        return copy
      }
      return addDays(d, -7)
    })
  }, [viewMode])

  const goNext = useCallback(() => {
    setSelectedDate((d) => {
      if (viewMode === 'This day') return addDays(d, 1)
      if (viewMode === 'This month') {
        const copy = new Date(d)
        copy.setMonth(copy.getMonth() + 1)
        return copy
      }
      return addDays(d, 7)
    })
  }, [viewMode])

  const weekDays = useMemo(() => {
    if (viewMode === 'This day') {
      return [selectedDate]
    }
    if (viewMode === 'This month') {
      const y = selectedDate.getFullYear()
      const m = selectedDate.getMonth()
      const daysInMonth = new Date(y, m + 1, 0).getDate()
      const monday = getMonday(new Date(y, m, 1))
      const endSunday = addDays(new Date(y, m, daysInMonth), (7 - new Date(y, m, daysInMonth).getDay()) % 7)
      const days: Date[] = []
      let cur = new Date(monday)
      while (cur <= endSunday) {
        days.push(new Date(cur))
        cur = addDays(cur, 1)
      }
      return days
    }
    const monday = getMonday(selectedDate)
    return Array.from({ length: 6 }, (_, i) => addDays(monday, i))
  }, [selectedDate, viewMode])

  const visibleEvents = useMemo(() => {
    const keys = new Set(weekDays.map((d) => dateKey(d)))
    return ALL_EVENTS.filter((e) => keys.has(e.date))
  }, [weekDays])

  const dateLabel = useMemo(() => {
    return `${MONTH_NAMES[selectedDate.getMonth()].slice(0, 3)} ${selectedDate.getDate()}`
  }, [selectedDate])

  const tzLabel = useMemo(() => {
    try {
      const short = now.toLocaleTimeString('en-GB', { timeZone: tz.tz, timeZoneName: 'short' }).split(' ').pop() ?? ''
      return short
    } catch {
      return ''
    }
  }, [now, tz.tz])

  const nowMarkerPercent = useMemo(() => {
    try {
      const parts = now.toLocaleTimeString('en-GB', { timeZone: tz.tz, hour12: false, hour: '2-digit', minute: '2-digit' }).split(':')
      const h = parseInt(parts[0], 10)
      const m = parseInt(parts[1], 10)
      if (h < HOUR_START || h >= HOUR_END) return null
      return ((h - HOUR_START) * 60 + m) / ((HOUR_END - HOUR_START) * 60) * 100
    } catch {
      return null
    }
  }, [now, tz.tz])

  const today = new Date()

  if (viewMode === 'This month') {
    return (
      <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0" style={{ backgroundColor: tokens.pageBg }}>
        <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Calendars" />
        <div className="flex-1 flex flex-col lg:ml-64 min-w-0 w-full">
          <CalendarHeader
            setSidebarOpen={setSidebarOpen}
            headerAvatar={headerAvatar}
          />
          <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pb-8 bg-white">
            <Toolbar
              dateLabel={`${MONTH_NAMES[selectedDate.getMonth()]} ${selectedDate.getFullYear()}`}
              liveTime={liveTime}
              tzLabel={tzLabel}
              tzIdx={tzIdx}
              setTzIdx={setTzIdx}
              viewMode={viewMode}
              setViewMode={setViewMode}
              goToday={goToday}
              goPrev={goPrev}
              goNext={goNext}
              datePickerOpen={datePickerOpen}
              setDatePickerOpen={setDatePickerOpen}
              selectedDate={selectedDate}
              setSelectedDate={setSelectedDate}
            />
            <MonthGrid
              selectedDate={selectedDate}
              events={visibleEvents}
              today={today}
              onDayClick={(d) => {
                setSelectedDate(d)
                setViewMode('This day')
              }}
            />
          </main>
        </div>
      </div>
    )
  }

  const colCount = weekDays.length

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0" style={{ backgroundColor: tokens.pageBg }}>
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Calendars" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 w-full">
        <CalendarHeader
          setSidebarOpen={setSidebarOpen}
          headerAvatar={headerAvatar}
        />

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pb-8 bg-white">
          <Toolbar
            dateLabel={dateLabel}
            liveTime={liveTime}
            tzLabel={tzLabel}
            tzIdx={tzIdx}
            setTzIdx={setTzIdx}
            viewMode={viewMode}
            setViewMode={setViewMode}
            goToday={goToday}
            goPrev={goPrev}
            goNext={goNext}
            datePickerOpen={datePickerOpen}
            setDatePickerOpen={setDatePickerOpen}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />

          <div className="border border-[#E5E7EB] rounded-xl bg-[#FAF9F6] overflow-x-auto">
            <div className="min-w-[600px] lg:min-w-0">
            <div className="grid border-b border-[#E5E7EB] bg-white" style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))` }}>
              {weekDays.map((d, i) => {
                const isToday = isSameDay(d, today)
                return (
                  <div
                    key={dateKey(d)}
                    className={`px-3 py-3 text-[13px] font-medium ${i < colCount - 1 ? 'border-r border-[#E5E7EB]' : ''} ${isToday ? 'text-[#A49776]' : 'text-[#374151]'}`}
                    style={font}
                  >
                    {DAY_NAMES[d.getDay()]} {d.getDate()}
                  </div>
                )
              })}
            </div>

            <div
              className="grid"
              style={{ gridTemplateColumns: `repeat(${colCount}, minmax(0, 1fr))`, height: 'calc(100vh - 300px)', minHeight: 520 }}
            >
              {weekDays.map((d, i) => {
                const dk = dateKey(d)
                const dayEvents = visibleEvents.filter((e) => e.date === dk)
                const isToday = isSameDay(d, today)

                return (
                  <div
                    key={dk}
                    className={`relative ${i < colCount - 1 ? 'border-r border-[#E5E7EB]' : ''}`}
                  >
                    {isToday && nowMarkerPercent !== null && (
                      <div className="absolute left-0 right-0 z-10 flex items-center" style={{ top: `${nowMarkerPercent}%` }}>
                        <span className="w-2.5 h-2.5 rounded-full shrink-0 -ml-[5px]" style={{ backgroundColor: tokens.accent }} />
                        <div className="flex-1 h-[1.5px]" style={{ backgroundColor: tokens.accent }} />
                      </div>
                    )}

                    {dayEvents.map((ev) => (
                      <EventPill key={ev.id} event={ev} />
                    ))}
                  </div>
                )
              })}
            </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

function CalendarHeader({
  setSidebarOpen,
  headerAvatar,
}: {
  setSidebarOpen: (v: boolean) => void
  headerAvatar: string
}) {
  return (
    <header className="shrink-0 bg-white border-b" style={{ borderColor: tokens.cardBorder }}>
      <div className="px-4 sm:px-8 min-h-[76px] py-3 sm:py-0 sm:h-[76px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <div className="flex items-center gap-3 min-w-0">
          <button
            type="button"
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100 shrink-0"
            aria-label="Open menu"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu className="w-6 h-6 text-gray-700" />
          </button>
          <h1 className="text-xl sm:text-2xl font-normal text-[#0a0a0a] truncate" style={{ ...font, lineHeight: '32px' }}>
            Manage Calenders
          </h1>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap justify-end">
          <button type="button" className="relative p-2 rounded-[10px] hover:bg-gray-50" aria-label="Notifications">
            <Bell className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
            <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fb2c36]" />
          </button>
          <div className="flex items-center h-11 pl-4 ml-2 border-l" style={{ borderColor: tokens.cardBorder }}>
            <span className="text-base text-[#0a0a0a]" style={font}>John Doe</span>
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
  )
}

function Toolbar({
  dateLabel,
  liveTime,
  tzLabel,
  tzIdx,
  setTzIdx,
  viewMode,
  setViewMode,
  goToday,
  goPrev,
  goNext,
  datePickerOpen,
  setDatePickerOpen,
  selectedDate,
  setSelectedDate,
}: {
  dateLabel: string
  liveTime: string
  tzLabel: string
  tzIdx: string
  setTzIdx: (v: string) => void
  viewMode: ViewMode
  setViewMode: (v: ViewMode) => void
  goToday: () => void
  goPrev: () => void
  goNext: () => void
  datePickerOpen: boolean
  setDatePickerOpen: (v: boolean) => void
  selectedDate: Date
  setSelectedDate: (d: Date) => void
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
      <div className="flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={goToday}
          className="h-9 px-4 rounded-lg border border-[#D1D5DB] bg-white text-[13px] text-[#374151] hover:bg-gray-50"
          style={font}
        >
          Today
        </button>

        <div className="relative">
          <button
            type="button"
            onClick={() => setDatePickerOpen(!datePickerOpen)}
            className="inline-flex items-center gap-1 h-9 pl-3 pr-7 rounded-lg border border-[#D1D5DB] bg-white text-[13px] text-[#374151] hover:bg-gray-50"
            style={font}
          >
            {dateLabel}
          </button>
          <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-500 pointer-events-none" />
          {datePickerOpen && (
            <MiniCalendar
              selected={selectedDate}
              onSelect={(d) => setSelectedDate(d)}
              onClose={() => setDatePickerOpen(false)}
            />
          )}
        </div>

        <div className="flex items-center gap-1.5 h-9 px-3 rounded-lg border border-[#D1D5DB] bg-white text-[13px] text-[#374151]" style={font}>
          <span className="w-2 h-2 rounded-full bg-[#EF4444] shrink-0" />
          <span className="whitespace-nowrap">{liveTime} {tzLabel}</span>
        </div>

        <Dropdown
          value={tzIdx}
          options={TIMEZONES.map((t, i) => ({ label: t.label, value: String(i) }))}
          onChange={setTzIdx}
        />
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={goPrev}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#D1D5DB] bg-white hover:bg-gray-50"
          aria-label="Previous"
        >
          <ChevronLeft className="w-4 h-4 text-gray-600" />
        </button>
        <button
          type="button"
          onClick={goNext}
          className="w-8 h-8 flex items-center justify-center rounded-lg border border-[#D1D5DB] bg-white hover:bg-gray-50"
          aria-label="Next"
        >
          <ChevronRight className="w-4 h-4 text-gray-600" />
        </button>

        <Dropdown
          value={viewMode}
          options={[
            { label: 'This week', value: 'This week' },
            { label: 'This day', value: 'This day' },
            { label: 'This month', value: 'This month' },
          ]}
          onChange={(v) => setViewMode(v as ViewMode)}
        />
      </div>
    </div>
  )
}

function MonthGrid({
  selectedDate,
  events,
  today,
  onDayClick,
}: {
  selectedDate: Date
  events: CalendarEvent[]
  today: Date
  onDayClick: (d: Date) => void
}) {
  const y = selectedDate.getFullYear()
  const m = selectedDate.getMonth()
  const firstDay = new Date(y, m, 1)
  const daysInMonth = new Date(y, m + 1, 0).getDate()

  const startPad = firstDay.getDay()
  const cells: (Date | null)[] = []
  for (let i = 0; i < startPad; i++) cells.push(null)
  for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(y, m, d))
  while (cells.length % 7 !== 0) cells.push(null)

  const eventsByDate = useMemo(() => {
    const map: Record<string, CalendarEvent[]> = {}
    for (const ev of events) {
      if (!map[ev.date]) map[ev.date] = []
      map[ev.date].push(ev)
    }
    return map
  }, [events])

  return (
    <div className="border border-[#E5E7EB] rounded-xl overflow-hidden bg-[#FAF9F6]">
      <div className="grid grid-cols-7 border-b border-[#E5E7EB] bg-white">
        {DAY_NAMES_SHORT.map((d, i) => (
          <div
            key={d}
            className={`px-2 py-2.5 text-[12px] font-semibold text-[#6B7280] text-center ${i < 6 ? 'border-r border-[#E5E7EB]' : ''}`}
            style={font}
          >
            {d}
          </div>
        ))}
      </div>
      <div className="grid grid-cols-7">
        {cells.map((cell, idx) => {
          if (!cell) {
            return (
              <div
                key={`pad-${idx}`}
                className={`min-h-[90px] border-b border-[#E5E7EB] bg-[#F9FAFB] ${idx % 7 < 6 ? 'border-r border-[#E5E7EB]' : ''}`}
              />
            )
          }
          const dk = dateKey(cell)
          const dayEvts = eventsByDate[dk] ?? []
          const isToday = isSameDay(cell, today)
          return (
            <div
              key={dk}
              onClick={() => onDayClick(cell)}
              className={`min-h-[90px] border-b border-[#E5E7EB] p-1.5 cursor-pointer hover:bg-white/80 transition-colors ${idx % 7 < 6 ? 'border-r border-[#E5E7EB]' : ''}`}
            >
              <div className={`text-[12px] mb-1 ${isToday ? 'w-6 h-6 rounded-full bg-[#A49776] text-white flex items-center justify-center font-semibold' : 'text-[#374151] pl-1'}`} style={font}>
                {cell.getDate()}
              </div>
              <div className="space-y-0.5">
                {dayEvts.slice(0, 3).map((ev) => (
                  <div
                    key={ev.id}
                    className="flex items-center gap-1 h-[18px] px-1.5 rounded text-[10px] text-[#374151] truncate bg-white border border-[#E5E7EB]"
                    style={font}
                    title={`${ev.title} — ${ev.hour}:${String(ev.minute).padStart(2, '0')}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: DOT_COLORS[ev.color] }} />
                    <span className="truncate">Meetin...</span>
                  </div>
                ))}
                {dayEvts.length > 3 && (
                  <div className="text-[10px] text-[#6B7280] pl-1" style={font}>+{dayEvts.length - 3} more</div>
                )}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
