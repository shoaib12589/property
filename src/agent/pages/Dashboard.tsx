import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Bell,
  Calendar,
  MapPin,
  Clock,
  ChevronUp,
  Menu,
} from 'lucide-react'
import { getAvatarUrl } from '@/lib/utils'
import { AgentSidebar } from '../components/AgentSidebar'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  activeBg: '#F3F4F6',
  activeText: '#111827',
  mutedText: '#6B7280',
  secondary: '#A49776',
  accent: '#B39C75',
  // Manage Listing badges (match Figma Tags colors)
  successBg: '#E9FFF2',
  successText: '#7ce7ac',
  warningBg: '#FFF5E0',
  warningText: '#f4be5e',
}

const metrics = [
  { label: 'Active Listing', value: '124', underlineWidthPct: 68 },
  { label: 'Pending Listing', value: '1,345', showUp: true, underlineWidthPct: 72 },
  { label: 'Expired Listing', value: '1,345', underlineWidthPct: 60 },
  { label: 'Showing Request', value: '04', underlineWidthPct: 63 },
]

const upcomingShowings = [
  { property: 'Urban Loft Studio', location: '987 City Center, Seattle, WA', date: '16/07/2025', time: '19:23' },
  { property: 'Urban Loft Studio', location: '987 City Center, Seattle, WA', date: '16/07/2025', time: '19:23' },
  { property: 'Urban Loft Studio', location: '987 City Center, Seattle, WA', date: '16/07/2025', time: '19:23' },
  { property: 'Urban Loft Studio', location: '987 City Center, Seattle, WA', date: '16/07/2025', time: '19:23' },
]

const manageListings = [
  {
    title: 'Urban Loft Studio',
    address: '193 Cole Plains Suite 649, 891203',
    status: { text: 'Active', bg: tokens.successBg, color: tokens.successText },
    thumb:
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=120&h=80&fit=crop&auto=format&sat=200',
  },
  {
    title: 'Urban Loft Studio',
    address: '193 Cole Plains Suite 649, 891203',
    status: { text: 'Processing', bg: tokens.warningBg, color: tokens.warningText },
    thumb:
      'https://images.unsplash.com/photo-1502005229762-cf1b2da7c5d6?w=120&h=80&fit=crop&auto=format&sat=200',
  },
]

const messages = [
  {
    title: 'New Message From Client',
    sub: 'My team generated $7,000 to $8,000...',
    dot: 'success' as const,
  },
  {
    title: 'New Message From Admin',
    sub: 'My team generated $7,000 to $8,000...',
    dot: 'danger' as const,
  },
  {
    title: 'New Message From Admin',
    sub: 'My team generated $7,000 to $8,000...',
    dot: 'danger' as const,
  },
]

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])
  const [statsRange, setStatsRange] = useState<'day' | 'week' | 'month'>('day')
  const [manageRange, setManageRange] = useState<'day' | 'week' | 'month'>('day')

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden" style={{ backgroundColor: tokens.pageBg }}>
      <AgentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Dashboard" />

      {/* Main content - only this area scrolls */}
      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
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
              <h1 className="text-2xl font-normal text-[#0a0a0a]" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '32px' }}>
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-0">
              <button type="button" className="relative p-2 rounded-[10px] hover:bg-gray-50" aria-label="Notifications">
                <Bell className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fb2c36]" />
              </button>
              <div
                className="flex items-center h-11 pl-4 ml-2 border-l"
                style={{ borderColor: tokens.cardBorder }}
              >
                <span className="text-base text-[#0a0a0a]" style={{ fontFamily: 'Arial, sans-serif' }}>
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-6">
          {/* Key Metrics */}
          <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-6">
            {metrics.map((m) => {
              const card = (
                <div
                  className="bg-[#f6f5f2] rounded-xl p-4 border flex flex-col min-h-[86px]"
                  style={{ borderColor: tokens.cardBorder }}
                >
                  <div className="flex items-start justify-between gap-3">
                    <p className="text-sm font-bold text-gray-900 leading-snug">{m.label}</p>
                    <div className="text-sm font-bold text-gray-900 leading-snug whitespace-nowrap flex items-center gap-1">
                      <span>{m.value}</span>
                      {m.showUp && (
                        <ChevronUp className="w-4 h-4 text-gray-900 translate-y-[1px]" strokeWidth={2} />
                      )}
                    </div>
                  </div>

                  <div
                    className="mt-auto h-[4px] rounded-full"
                    style={{
                      backgroundColor: tokens.accent,
                      opacity: 1,
                      width: `${m.underlineWidthPct}%`,
                    }}
                  />
                </div>
              )

              if (m.label === 'Active Listing') {
                return (
                  <Link key={m.label} to="/agent/active-listing" className="block">
                    {card}
                  </Link>
                )
              }

              return (
                <div key={m.label}>
                  {card}
                </div>
              )
            })}
          </section>

          {/* Charts & panels */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-4">
            <div className="xl:col-span-2 bg-[#f6f5f2] rounded-xl border" style={{ borderColor: tokens.cardBorder }}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-4">
                  <h2 className="text-xl font-bold text-gray-900">Performing Stats</h2>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center rounded-lg overflow-hidden border bg-white" style={{ borderColor: '#E5E7EB' }}>
                      {(['day', 'week', 'month'] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setStatsRange(r)}
                          className="px-4 py-2 text-sm font-semibold transition-colors"
                          style={{
                            backgroundColor: statsRange === r ? '#FFFFFF' : 'transparent',
                            color: statsRange === r ? '#1C1D21' : '#8181A5',
                            borderRight: r !== 'month' ? '1px solid #E5E7EB' : undefined,
                          }}
                        >
                          {r === 'day' ? 'Day' : r === 'week' ? 'Week' : 'Month'}
                        </button>
                      ))}
                    </div>
                    <div className="w-9 h-9 rounded-lg border flex items-center justify-center bg-white" style={{ borderColor: '#E5E7EB' }}>
                      <Calendar className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                    </div>
                  </div>
                </div>

                {/* Chart container matching attachment exactly */}
                <div className="relative" style={{ height: 280 }}>
                  {/* Main chart SVG */}
                  <svg
                    viewBox="0 0 800 280"
                    className="absolute inset-0 w-full h-full"
                    preserveAspectRatio="none"
                  >
                    {/* Background areas */}
                    <defs>
                      <linearGradient id="areaGradient1" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#B39C75" stopOpacity="0.3" />
                        <stop offset="100%" stopColor="#B39C75" stopOpacity="0.05" />
                      </linearGradient>
                      <linearGradient id="areaGradient2" x1="0%" y1="0%" x2="0%" y2="100%">
                        <stop offset="0%" stopColor="#D4C4A8" stopOpacity="0.2" />
                        <stop offset="100%" stopColor="#D4C4A8" stopOpacity="0.02" />
                      </linearGradient>
                    </defs>

                    {/* Two line chart paths - darker and lighter beige */}
                    {/* First line (darker) - main data */}
                    <path
                      d="M 0,180 Q 65,160 130,140 T 260,80 T 390,120 T 520,60 T 650,100 T 780,40"
                      fill="none"
                      stroke="#A49776"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0,180 Q 65,160 130,140 T 260,80 T 390,120 T 520,60 T 650,100 T 780,40 L 780,250 L 0,250 Z"
                      fill="url(#areaGradient1)"
                      stroke="none"
                    />

                    {/* Second line (lighter) - secondary data */}
                    <path
                      d="M 0,200 Q 65,190 130,170 T 260,140 T 390,100 T 520,80 T 650,60 T 780,70"
                      fill="none"
                      stroke="#D4C4A8"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0,200 Q 65,190 130,170 T 260,140 T 390,100 T 520,80 T 650,60 T 780,70 L 780,250 L 0,250 Z"
                      fill="url(#areaGradient2)"
                      stroke="none"
                    />
                  </svg>

                  {/* Fixed tooltips at exact positions matching attachment */}
                  {/* Inquiries tooltip - left side */}
                  <div
                    className="absolute bg-white rounded-lg px-4 py-3 shadow-lg border border-gray-100"
                    style={{
                      left: '8%',
                      top: '45%',
                      transform: 'translateY(-50%)',
                      minWidth: 90,
                    }}
                  >
                    <div className="text-sm text-gray-900">Inquiries</div>
                    <div className="text-lg font-bold text-[#A49776]">456</div>
                  </div>
                  {/* Point marker for Inquiries */}
                  <div
                    className="absolute w-3 h-3 bg-white rounded-full border-2 border-[#A49776]"
                    style={{
                      left: '12%',
                      top: '52%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />

                  {/* Views tooltip - center/upper area */}
                  <div
                    className="absolute bg-white rounded-lg px-4 py-3 shadow-lg border border-gray-100"
                    style={{
                      left: '42%',
                      top: '25%',
                      transform: 'translateY(-50%)',
                      minWidth: 90,
                    }}
                  >
                    <div className="text-sm text-gray-900">Views</div>
                    <div className="text-lg font-bold text-[#A49776]">34398</div>
                  </div>
                  {/* Point marker for Views */}
                  <div
                    className="absolute w-3 h-3 bg-white rounded-full border-2 border-[#A49776]"
                    style={{
                      left: '47%',
                      top: '32%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />

                  {/* Sales tooltip - right side */}
                  <div
                    className="absolute bg-white rounded-lg px-4 py-3 shadow-lg border border-gray-100"
                    style={{
                      left: '72%',
                      top: '38%',
                      transform: 'translateY(-50%)',
                      minWidth: 100,
                    }}
                  >
                    <div className="text-sm text-gray-900">Sales</div>
                    <div className="text-lg font-bold text-[#A49776]">$459.67</div>
                  </div>
                  {/* Point marker for Sales */}
                  <div
                    className="absolute w-3 h-3 bg-white rounded-full border-2 border-[#A49776]"
                    style={{
                      left: '77%',
                      top: '45%',
                      transform: 'translate(-50%, -50%)',
                    }}
                  />

                  {/* Month labels at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 flex justify-between px-4 text-xs text-gray-600">
                    <span>Jan</span>
                    <span>Feb</span>
                    <span>Mar</span>
                    <span>Apr</span>
                    <span>Jun</span>
                    <span>Jul</span>
                    <span>Aug</span>
                    <span>Sep</span>
                    <span>Oct</span>
                    <span>Nov</span>
                    <span>Dec</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-[#f6f5f2] rounded-xl border" style={{ borderColor: tokens.cardBorder }}>
              <div className="p-5">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-base font-bold text-gray-900">Upcoming Showing</h2>
                  <button
                    className="px-3 py-2 rounded-none text-sm font-semibold"
                    style={{ backgroundColor: tokens.secondary, color: '#FFFFFF' }}
                  >
                    View Calendar
                  </button>
                </div>

                <div className="flex flex-col gap-3">
                  {upcomingShowings.map((s, i) => (
                    <div
                      key={i}
                      className="bg-white rounded-xl p-4 flex items-start justify-between shadow-sm"
                      style={{ borderColor: tokens.cardBorder }}
                    >
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-4 h-4 rounded-full bg-[#D1D5DB] mt-2 flex-shrink-0" />
                        <div className="min-w-0">
                          <div className="text-base font-semibold text-gray-900 leading-snug">
                            {s.property}
                          </div>
                          <div className="flex items-center gap-2 text-xs text-gray-600 mt-1">
                            <MapPin className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                            <span className="truncate">{s.location}</span>
                          </div>
                        </div>
                      </div>

                      <div className="text-right shrink-0 ml-4">
                        <div className="text-xs font-medium text-gray-900">{s.date}</div>
                        <div className="flex items-center justify-end gap-2 text-xs text-gray-700 mt-1">
                          <Clock className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                          <span>{s.time}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Bottom row: Manage Listing + Messages */}
          <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
            <div className="xl:col-span-2 bg-[#f6f5f2] rounded-xl border" style={{ borderColor: tokens.cardBorder }}>
              <div className="p-5">
                <div className="flex items-start justify-between mb-3">
                  <h2 className="text-base font-bold text-gray-900">Manage Listing</h2>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {(['day', 'week', 'month'] as const).map((r) => (
                        <button
                          key={r}
                          type="button"
                          onClick={() => setManageRange(r)}
                          className="h-[40px] text-[14px] font-bold transition-colors px-0"
                          style={{
                            width: r === 'day' ? 62 : r === 'week' ? 64 : 76,
                            backgroundColor: manageRange === r ? '#FFFFFF' : 'transparent',
                            color: manageRange === r ? '#1C1D21' : '#a49776',
                            border: manageRange === r ? '1px solid #ececf2' : '1px solid transparent',
                            borderRadius: manageRange === r ? 8 : 0,
                          }}
                        >
                          {r === 'day' ? 'Day' : r === 'week' ? 'Week' : 'Month'}
                        </button>
                      ))}
                    </div>

                    <button
                      type="button"
                      className="w-[40px] h-[40px] rounded-lg border flex items-center justify-center"
                      style={{ borderColor: tokens.cardBorder, backgroundColor: '#FFFFFF' }}
                      aria-label="Print"
                    >
                      <div className="w-9 h-9 rounded-lg border flex items-center justify-center bg-white" style={{ borderColor: '#E5E7EB' }}>
                      <Calendar className="w-4 h-4 text-gray-400" strokeWidth={1.5} />
                    </div>
                    </button>
                  </div>
                </div>

                <div
                  className="rounded-t-xl overflow-hidden"
                  style={{ borderColor: tokens.cardBorder, backgroundColor: '#f6f5f2', borderBottom: `1px solid ${tokens.cardBorder}` }}
                >
                  <div className="px-4 py-3 flex items-center justify-between">
                    <div className="text-xs font-bold text-gray-900">Delivery</div>
                    <div className="text-xs font-bold text-gray-900">Status</div>
                  </div>
                </div>

                <div className="flex flex-col gap-4 mt-4">
                  {manageListings.map((l, i) => (
                    <div
                      key={i}
                      className="rounded-xl px-5 py-4 flex items-center justify-between gap-4"
                      style={{ borderColor: tokens.cardBorder }}
                    >
                      <div className="flex items-center gap-4 min-w-0">
                        <img
                          src={l.thumb}
                          alt=""
                          className="w-[52px] h-[52px] rounded-[8px] object-cover shrink-0"
                        />
                        <div className="min-w-0">
                          <div className="text-sm font-semibold text-gray-900 leading-tight">
                            {l.title}
                          </div>
                          <div className="text-xs text-gray-500 mt-1">{l.address}</div>
                        </div>
                      </div>

                      <span
                        className="px-5 py-2 rounded-lg text-sm font-semibold whitespace-nowrap"
                        style={{ backgroundColor: l.status.bg, color: l.status.color }}
                      >
                        {l.status.text}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#f6f5f2] rounded-xl border" style={{ borderColor: tokens.cardBorder }}>
              <div className="p-5">
                <h2 className="text-base font-bold text-gray-900 mb-3">Messages</h2>
                <div className="rounded-lg border overflow-hidden" style={{ borderColor: tokens.cardBorder }}>
                  {messages.map((m, i) => (
                    <div
                      key={i}
                      className={`p-4 flex items-start justify-between gap-3 ${i < messages.length - 1 ? 'border-b' : ''}`}
                      style={{ borderColor: tokens.cardBorder }}
                    >
                      <div className="min-w-0 pr-3">
                        <div className="text-sm font-semibold text-gray-900">{m.title}</div>
                        <div className="text-xs text-gray-500 mt-1">{m.sub}</div>
                      </div>
                      <div
                        className="w-3 h-3 rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: m.dot === 'success' ? '#16A34A' : '#DC2626' }}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

