import { useCallback, useEffect, useMemo, useState } from 'react'
import { Bell, Menu, Calendar, Check, X, Info, ChevronLeft, ChevronRight } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { BrokerSidebar } from '../components/BrokerSidebar'

const accent = '#A49776'

const rows = [
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    customerName: 'John Doe',
    showingDate: '19/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Schedule',
    statusColor: { bg: '#FFF9C4', text: '#F57F17' },
  },
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    customerName: 'John Williams',
    showingDate: '19/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Expired',
    statusColor: { bg: '#C8E6C9', text: '#388E3C' },
  },
  {
    requestId: '2455675',
    property: 'Urban Loft Studio',
    customerName: 'Den Williams',
    showingDate: '19/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Completed',
    statusColor: { bg: '#BBDEFB', text: '#1976D2' },
  },
  {
    requestId: '2455675',
    property: 'Cozy Family Home',
    customerName: 'David Johnson',
    showingDate: '19/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Completed',
    statusColor: { bg: '#BBDEFB', text: '#1976D2' },
  },
  {
    requestId: '2455675',
    property: 'Luxury Villa in Suburbs',
    customerName: 'FSBO',
    showingDate: '19/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Rescheduled',
    statusColor: { bg: '#B2DFDB', text: '#00796B' },
  },
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    customerName: 'FSBO',
    showingDate: '19/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Failed',
    statusColor: { bg: '#FFCDD2', text: '#D32F2F' },
  },
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    customerName: 'MLS',
    showingDate: '19/05/2026',
    assignedAgent: 'Kim Martin',
    status: 'Active',
    statusColor: { bg: '#E1BEE7', text: '#7B1FA2' },
  },
]

const WEEKDAYS = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa']

function buildMonthCells(year: number, month: number) {
  const first = new Date(year, month, 1)
  const last = new Date(year, month + 1, 0)
  const daysInMonth = last.getDate()
  const startPad = first.getDay()
  const cells: { day: number; inMonth: boolean; full: Date }[] = []
  const prevLast = new Date(year, month, 0).getDate()
  for (let i = 0; i < startPad; i++) {
    const d = prevLast - startPad + i + 1
    cells.push({ day: d, inMonth: false, full: new Date(year, month - 1, d) })
  }
  for (let d = 1; d <= daysInMonth; d++) {
    cells.push({ day: d, inMonth: true, full: new Date(year, month, d) })
  }
  let next = 1
  while (cells.length % 7 !== 0) {
    cells.push({ day: next, inMonth: false, full: new Date(year, month + 1, next) })
    next += 1
  }
  return cells
}

function sameDay(a: Date, b: Date) {
  return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate()
}

/** Parses `dd/MM/yyyy` from row data for calendar default. */
function parseShowingDate(s: string): Date | null {
  const parts = s.split('/').map((p) => p.trim())
  if (parts.length !== 3) return null
  const day = Number(parts[0])
  const month = Number(parts[1]) - 1
  const year = Number(parts[2])
  if (!Number.isFinite(day) || !Number.isFinite(month) || !Number.isFinite(year)) return null
  const d = new Date(year, month, day)
  if (d.getFullYear() !== year || d.getMonth() !== month || d.getDate() !== day) return null
  return d
}

export function TotalShowingRequests() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  const [calendarRow, setCalendarRow] = useState<number | null>(null)
  const [popupPos, setPopupPos] = useState({ top: 0, left: 0 })
  const [viewDate, setViewDate] = useState(() => new Date(2026, 5, 1))
  const [selectedDates, setSelectedDates] = useState<Record<number, Date>>({})

  const effectiveShowingDate = useCallback(
    (rowIndex: number): Date | null =>
      selectedDates[rowIndex] ?? parseShowingDate(rows[rowIndex].showingDate),
    [selectedDates]
  )

  const [infoRow, setInfoRow] = useState<number | null>(null)
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((msg: string) => {
    setToast(msg)
    window.setTimeout(() => setToast(null), 2800)
  }, [])

  useEffect(() => {
    if (calendarRow === null) return
    const onDoc = (e: MouseEvent) => {
      const t = e.target as HTMLElement
      if (t.closest('[data-calendar-popup]')) return
      if (t.closest('[data-calendar-trigger]')) return
      setCalendarRow(null)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [calendarRow])

  const openCalendar = (e: React.MouseEvent, rowIndex: number) => {
    e.stopPropagation()
    const rect = (e.currentTarget as HTMLElement).getBoundingClientRect()
    const width = 280
    let left = rect.left
    if (left + width > window.innerWidth - 16) left = window.innerWidth - width - 16
    if (left < 16) left = 16
    setPopupPos({ top: rect.bottom + 8, left })
    setCalendarRow((prev) => (prev === rowIndex ? null : rowIndex))
    const base = selectedDates[rowIndex] ?? parseShowingDate(rows[rowIndex].showingDate)
    if (base) {
      setViewDate(new Date(base.getFullYear(), base.getMonth(), 1))
    }
  }

  const monthCells = useMemo(
    () => buildMonthCells(viewDate.getFullYear(), viewDate.getMonth()),
    [viewDate]
  )

  const monthLabel = viewDate.toLocaleString('en-US', { month: 'long', year: 'numeric' })

  const pickDay = (cell: { day: number; inMonth: boolean; full: Date }, rowIndex: number) => {
    if (!cell.inMonth) {
      setViewDate(new Date(cell.full.getFullYear(), cell.full.getMonth(), 1))
      return
    }
    setSelectedDates((prev) => ({ ...prev, [rowIndex]: cell.full }))
  }

  const handleApprove = (rowIndex: number) => {
    showToast(`Request #${rows[rowIndex].requestId} approved.`)
  }

  const handleReject = (rowIndex: number) => {
    showToast(`Request #${rows[rowIndex].requestId} rejected.`)
  }

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0 bg-white">
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Total Showing Requests" />

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
                Total Showing Requests
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-white relative pb-[max(1.5rem,env(safe-area-inset-bottom,0px))]">
          {toast && (
            <div
              className="fixed bottom-6 left-1/2 z-[70] -translate-x-1/2 rounded-lg bg-[#111827] px-4 py-2 text-sm text-white shadow-lg"
              role="status"
            >
              {toast}
            </div>
          )}

          <div className="w-full px-4 sm:px-6 lg:px-8">
            <div className="w-full overflow-x-auto">
              <div className="w-full min-w-0">
                <div
                  className="grid w-full items-center gap-x-4 border-b border-[#E5E7EB] bg-[#F9FAFB] px-4 sm:px-5"
                  style={{
                    gridTemplateColumns:
                      'minmax(88px, 0.85fr) minmax(140px, 1.35fr) minmax(120px, 1.2fr) minmax(100px, 0.95fr) minmax(110px, 1fr) minmax(96px, 0.9fr) minmax(152px, 1.15fr)',
                  }}
                >
                  <div className="py-4 text-[14px] font-bold text-[#374151]">Request ID</div>
                  <div className="py-4 text-[14px] font-bold text-[#374151]">Property</div>
                  <div className="py-4 text-[14px] font-bold text-[#374151]">Customer Name</div>
                  <div className="py-4 text-[14px] font-bold text-[#374151]">Showing Date</div>
                  <div className="py-4 text-[14px] font-bold text-[#374151]">Assigned Agent</div>
                  <div className="py-4 text-[14px] font-bold text-[#374151]">Status</div>
                  <div className="py-4 text-[14px] font-bold text-[#374151] text-right pr-1">Actions</div>
                </div>

                {rows.map((row, index) => (
                  <div
                    key={`${row.requestId}-${index}`}
                    className="grid w-full items-center gap-x-4 border-b border-[#E5E7EB] bg-white px-4 sm:px-5"
                    style={{
                      gridTemplateColumns:
                        'minmax(88px, 0.85fr) minmax(140px, 1.35fr) minmax(120px, 1.2fr) minmax(100px, 0.95fr) minmax(110px, 1fr) minmax(96px, 0.9fr) minmax(152px, 1.15fr)',
                    }}
                  >
                    <div className="py-5 text-[14px] text-[#6B7280]">{row.requestId}</div>
                    <div className="py-5 text-[15px] text-[#111827] min-w-0 truncate" title={row.property}>
                      {row.property}
                    </div>
                    <div className="py-5 text-[15px] text-[#111827] min-w-0 truncate" title={row.customerName}>
                      {row.customerName}
                    </div>
                    <div className="py-5 text-[14px] text-[#4B5563]">
                      {selectedDates[index]
                        ? selectedDates[index].toLocaleDateString('en-GB')
                        : row.showingDate}
                    </div>
                    <div className="py-5 text-[14px] text-[#111827]">{row.assignedAgent}</div>
                    <div className="py-5">
                      <span
                        className="inline-flex items-center px-3 py-1 rounded-md text-[13px] font-medium whitespace-nowrap"
                        style={{ backgroundColor: row.statusColor.bg, color: row.statusColor.text }}
                      >
                        {row.status}
                      </span>
                    </div>
                    <div className="py-5 flex items-center justify-end gap-2 flex-wrap relative">
                      <button
                        type="button"
                        data-calendar-trigger
                        className="w-7 h-7 shrink-0 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-center text-[#A49776] hover:bg-gray-100"
                        aria-label="Pick showing date"
                        onClick={(e) => openCalendar(e, index)}
                      >
                        <Calendar className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="w-7 h-7 shrink-0 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-center text-gray-500 hover:bg-gray-100"
                        aria-label="Approve"
                        onClick={() => handleApprove(index)}
                      >
                        <Check className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="w-7 h-7 shrink-0 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-center text-gray-500 hover:bg-gray-100"
                        aria-label="Reject"
                        onClick={() => handleReject(index)}
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        className="w-7 h-7 shrink-0 rounded-full border border-[#E5E7EB] bg-[#F9FAFB] flex items-center justify-center text-gray-500 hover:bg-gray-100"
                        aria-label="Details"
                        onClick={() => setInfoRow(index)}
                      >
                        <Info className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {calendarRow !== null && (
            <div
              data-calendar-popup
              className="fixed z-[60] w-[280px] rounded-xl border border-[#F0F0F0] bg-white p-3 shadow-lg"
              style={{ top: popupPos.top, left: popupPos.left }}
              role="dialog"
              aria-label="Select date"
            >
              <div className="mb-2 flex items-center justify-between px-1">
                <button
                  type="button"
                  className="rounded p-1 text-gray-600 hover:bg-gray-100"
                  aria-label="Previous month"
                  onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() - 1, 1))}
                >
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <span className="text-[15px] font-semibold text-[#111827]" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {monthLabel}
                </span>
                <button
                  type="button"
                  className="rounded p-1 text-gray-600 hover:bg-gray-100"
                  aria-label="Next month"
                  onClick={() => setViewDate((d) => new Date(d.getFullYear(), d.getMonth() + 1, 1))}
                >
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
              <div className="mb-1 grid grid-cols-7 gap-0 text-center text-[11px] font-medium text-[#9CA3AF]">
                {WEEKDAYS.map((w) => (
                  <div key={w} className="py-1">
                    {w}
                  </div>
                ))}
              </div>
              <div className="grid grid-cols-7 gap-y-1 text-center text-[13px]">
                {monthCells.map((cell, i) => {
                  const sel = calendarRow !== null ? effectiveShowingDate(calendarRow) : null
                  const isSelected = Boolean(sel && cell.inMonth && sameDay(cell.full, sel))
                  return (
                    <button
                      key={`${cell.full.getTime()}-${i}`}
                      type="button"
                      onClick={() => pickDay(cell, calendarRow)}
                      className={`mx-auto flex h-8 w-8 items-center justify-center rounded-full transition-colors ${
                        !cell.inMonth ? 'text-[#D1D5DB]' : 'text-[#111827]'
                      } ${isSelected ? 'text-white shadow-sm' : 'hover:bg-gray-100'}`}
                      style={isSelected ? { backgroundColor: accent } : undefined}
                    >
                      {cell.day}
                    </button>
                  )
                })}
              </div>
            </div>
          )}

          {infoRow !== null && (
            <div
              className="fixed inset-0 z-[65] flex items-center justify-center bg-black/30 px-4"
              role="presentation"
              onClick={() => setInfoRow(null)}
            >
              <div
                className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
                role="dialog"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-lg font-bold text-[#111827]">Showing request details</h3>
                <dl className="mt-4 space-y-2 text-sm text-[#374151]">
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Request ID</dt>
                    <dd className="font-medium">{rows[infoRow].requestId}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Property</dt>
                    <dd className="text-right font-medium">{rows[infoRow].property}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Customer</dt>
                    <dd className="font-medium">{rows[infoRow].customerName}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Assigned agent</dt>
                    <dd className="font-medium">{rows[infoRow].assignedAgent}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Status</dt>
                    <dd className="font-medium">{rows[infoRow].status}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="text-gray-500">Showing date</dt>
                    <dd className="font-medium">
                      {effectiveShowingDate(infoRow)?.toLocaleDateString('en-GB') ?? rows[infoRow].showingDate}
                    </dd>
                  </div>
                </dl>
                <button
                  type="button"
                  className="mt-6 w-full rounded-lg py-2 text-sm font-semibold text-white"
                  style={{ backgroundColor: accent }}
                  onClick={() => setInfoRow(null)}
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
