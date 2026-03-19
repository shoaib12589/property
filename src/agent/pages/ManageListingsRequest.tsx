import { useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import { Bell, CalendarDays, Check, ChevronLeft, ChevronRight, Eye, Menu, X } from 'lucide-react'
import { getAvatarUrl } from '@/lib/utils'
import { AgentSidebar } from '../components/AgentSidebar'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
}

type RequestStatus =
  | 'Schedule'
  | 'Expired'
  | 'Completed'
  | 'Rescheduled'
  | 'Failed'
  | 'Active'

type RequestRow = {
  requestId: string
  property: string
  customerName: string
  showingDate: string
  status: RequestStatus
}

const STATUS_STYLE: Record<RequestStatus, { bg: string; color: string }> = {
  Schedule: { bg: '#FFF8E1', color: '#A49776' },
  Expired: { bg: '#E8F5E9', color: '#4CAF50' },
  Completed: { bg: '#E3F2FD', color: '#2196F3' },
  Rescheduled: { bg: '#DCFCE7', color: '#22C55E' },
  Failed: { bg: '#FFEBEE', color: '#F44336' },
  Active: { bg: '#EDE9FE', color: '#8B5CF6' },
}

const rows: RequestRow[] = [
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    customerName: 'John Doe',
    showingDate: '19/05/2026',
    status: 'Schedule',
  },
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    customerName: 'John Williams',
    showingDate: '19/05/2026',
    status: 'Expired',
  },
  {
    requestId: '2455675',
    property: 'Urban Loft Studio',
    customerName: 'Den Williams',
    showingDate: '19/05/2026',
    status: 'Completed',
  },
  {
    requestId: '2455675',
    property: 'Cozy Family Home',
    customerName: 'David Johnson',
    showingDate: '19/05/2026',
    status: 'Completed',
  },
  {
    requestId: '2455675',
    property: 'Luxury Villa in Suburbs',
    customerName: 'FSBO',
    showingDate: '19/05/2026',
    status: 'Rescheduled',
  },
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    customerName: 'FSBO',
    showingDate: '19/05/2026',
    status: 'Failed',
  },
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    customerName: 'MLS',
    showingDate: '19/05/2026',
    status: 'Active',
  },
]

const font = { fontFamily: 'Arial, sans-serif' } as const

function StatusBadge({ status }: { status: RequestStatus }) {
  const s = STATUS_STYLE[status]
  return (
    <span
      className="inline-flex items-center justify-center min-w-[86px] px-3 h-[28px] rounded-none text-[12px] font-normal"
      style={{ ...font, backgroundColor: s.bg, color: s.color }}
    >
      {status}
    </span>
  )
}

function IconAction({
  title,
  children,
  onClick,
  active,
}: {
  title: string
  children: ReactNode
  onClick?: () => void
  active?: boolean
}) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      className={`w-7 h-7 rounded-full border text-gray-400 flex items-center justify-center ${
        active
          ? 'border-[#B3A16F] bg-[#B3A16F]/20 text-[#8E7A49]'
          : 'border-[#D1D5DB] bg-[#F9FAFB] hover:bg-gray-100'
      }`}
    >
      {children}
    </button>
  )
}

export function ManageListingsRequest() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])
  const [rowsData, setRowsData] = useState<RequestRow[]>(rows)
  const [openScheduleRow, setOpenScheduleRow] = useState<number | null>(null)

  // Calendar shown in screenshot: June 2026
  const monthName = 'June 2026'
  const weekdayShort = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
  const monthCells = [
    '', '28', '29', '30', '31', '1', '2',
    '3', '4', '5', '6', '7', '8', '9',
    '10', '11', '12', '13', '14', '15', '16',
    '17', '18', '19', '20', '21', '22', '23',
    '24', '25', '26', '27', '28', '29', '30',
  ]

  const onPickDate = (rowIdx: number, day: string) => {
    if (!day) return
    setRowsData((prev) =>
      prev.map((row, idx) =>
        idx === rowIdx ? { ...row, showingDate: `${day.padStart(2, '0')}/06/2026` } : row
      )
    )
    setOpenScheduleRow(null)
  }

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden" style={{ backgroundColor: tokens.pageBg }}>
      <AgentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Listing Requests" />

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
                Manage Listing Requests
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-8 pt-4 pb-8 bg-white">
          <div className="border-b border-[#E5E7EB]" />

          <div
            className="grid items-center mt-2 border-b border-[#E5E7EB]"
            style={{ gridTemplateColumns: '115px 1.6fr 1.1fr 1fr 140px 130px' }}
          >
            <div className="py-3 pl-2 text-[12px] font-bold text-[#111827]" style={font}>
              Request ID
            </div>
            <div className="py-3 text-[12px] font-bold text-[#111827] text-center" style={font}>
              Property
            </div>
            <div className="py-3 text-[12px] font-bold text-[#111827] text-center" style={font}>
              Customer Name
            </div>
            <div className="py-3 text-[12px] font-bold text-[#111827] text-center" style={font}>
              Showing Date
            </div>
            <div className="py-3 text-[12px] font-bold text-[#111827] text-center" style={font}>
              Status
            </div>
            <div className="py-3 pr-2 text-[12px] font-bold text-[#111827] text-center" style={font}>
              Actions
            </div>
          </div>

          <div className="divide-y divide-transparent">
            {rowsData.map((r, idx) => (
              <div
                key={`${r.requestId}-${idx}`}
                className="grid items-center"
                style={{ gridTemplateColumns: '115px 1.6fr 1.1fr 1fr 140px 130px' }}
              >
                <div className="py-6 pl-2 text-[13px] text-[#6B7280]" style={font}>
                  {r.requestId}
                </div>
                <div className="py-6 text-[13px] text-[#111827] text-center" style={font}>
                  {r.property}
                </div>
                <div className="py-6 text-[13px] text-[#111827] text-center" style={font}>
                  {r.customerName}
                </div>
                <div className="py-6 text-[13px] text-[#111827] text-center" style={font}>
                  {r.showingDate}
                </div>
                <div className="py-6 flex items-center justify-center">
                  <StatusBadge status={r.status} />
                </div>
                <div className="py-6 pr-2 flex items-center justify-center gap-2 relative">
                  <IconAction title="View">
                    <Eye className="w-3.5 h-3.5" />
                  </IconAction>
                  <IconAction title="Cancel">
                    <X className="w-3.5 h-3.5" />
                  </IconAction>
                  <IconAction
                    title="Schedule"
                    active={openScheduleRow === idx}
                    onClick={() => setOpenScheduleRow(openScheduleRow === idx ? null : idx)}
                  >
                    <CalendarDays className="w-3.5 h-3.5" />
                  </IconAction>
                  <IconAction title="Complete">
                    <Check className="w-3.5 h-3.5" />
                  </IconAction>

                  {openScheduleRow === idx ? (
                    <div className="absolute top-[52px] right-0 z-20 w-[180px] rounded-md border border-[#E5E7EB] bg-white shadow-lg p-2">
                      <div className="flex items-center justify-between px-1 py-1 mb-1">
                        <button type="button" className="text-gray-400 hover:text-gray-600">
                          <ChevronLeft className="w-3.5 h-3.5" />
                        </button>
                        <span className="text-[10px] text-[#374151] font-semibold" style={font}>
                          {monthName}
                        </span>
                        <button type="button" className="text-gray-400 hover:text-gray-600">
                          <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      <div className="grid grid-cols-7 gap-y-1 text-center mb-1">
                        {weekdayShort.map((d) => (
                          <span key={d} className="text-[8px] text-gray-400" style={font}>
                            {d}
                          </span>
                        ))}
                      </div>

                      <div className="grid grid-cols-7 gap-y-1 text-center">
                        {monthCells.map((day, i) => (
                          <button
                            key={`${day}-${i}`}
                            type="button"
                            disabled={!day}
                            onClick={() => onPickDate(idx, day)}
                            className={`h-5 text-[9px] rounded ${
                              day ? 'text-[#111827] hover:bg-[#F3F4F6]' : 'text-transparent cursor-default'
                            }`}
                            style={font}
                          >
                            {day || '.'}
                          </button>
                        ))}
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}

