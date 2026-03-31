import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Bell, Calendar, Eye, Menu, MoreVertical, Pencil, Trash2, User } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { AdminSidebar } from '../components/AdminSidebar'
import { getAdminActiveLabel } from '../lib/adminNav'

const summaryStats = [
  { label: 'Total Users', sub: 'Customers / Agents / Brokers', value: '124', href: '/admin/dashboard' },
  { label: 'Total Listings', sub: null, value: '124', href: '/admin/listings-management' },
  { label: 'Active Listings', sub: null, value: '05', href: '/admin/listings-management' },
  { label: 'Pending Listings', sub: null, value: '24', href: '/admin/listings-management' },
  { label: 'Total Revenue', sub: null, value: '$123,083', href: '/admin/revenue-management' },
] as const

const userStats = [
  { label: 'Brokers', value: '58' },
  { label: 'Agent', value: '182' },
  { label: 'Clients', value: '940' },
  { label: 'Visitors Today', value: '1,230', highlight: true },
] as const

const usersRows = [
  {
    name: 'John Harry',
    email: 'john@mail.com',
    role: 'Agent',
    status: 'Completed',
    badge: 'bg-[#FEF9C3] text-[#713F12]',
    lastLogin: '12/08/2026',
  },
  {
    name: 'David Williams',
    email: 'david@mail.com',
    role: 'Agent',
    status: 'Active',
    badge: 'bg-[#DBEAFE] text-[#1E40AF]',
    lastLogin: '12/08/2026',
  },
  {
    name: 'John Harry',
    email: 'harry@mail.com',
    role: 'Agent',
    status: 'Schedule',
    badge: 'bg-[#DCFCE7] text-[#166534]',
    lastLogin: '12/08/2026',
  },
] as const

/** Donut annulus slice: startDeg/endDeg sweep clockwise from top (0° = 12 o’clock). */
function donutSlice(cx: number, cy: number, R: number, r: number, startDeg: number, endDeg: number) {
  const rad = (d: number) => (d * Math.PI) / 180
  const a0 = rad(-90 + startDeg)
  const a1 = rad(-90 + endDeg)
  const x0 = cx + R * Math.cos(a0)
  const y0 = cy + R * Math.sin(a0)
  const x1 = cx + R * Math.cos(a1)
  const y1 = cy + R * Math.sin(a1)
  const x2 = cx + r * Math.cos(a1)
  const y2 = cy + r * Math.sin(a1)
  const x3 = cx + r * Math.cos(a0)
  const y3 = cy + r * Math.sin(a0)
  const sweep = endDeg - startDeg
  const large = sweep > 180 ? 1 : 0
  return `M ${x0} ${y0} A ${R} ${R} 0 ${large} 1 ${x1} ${y1} L ${x2} ${y2} A ${r} ${r} 0 ${large} 0 ${x3} ${y3} Z`
}

const donutSegments = [
  { start: 0, end: 92, fill: '#22c55e', label: 'Organic', value: '$28k' },
  { start: 92, end: 178, fill: '#f97316', label: 'Referral', value: '$19k' },
  { start: 178, end: 268, fill: '#fb7185', label: 'Partners', value: '$18k' },
  { start: 268, end: 360, fill: '#3b82f6', label: 'Marketing', value: '$22.0k', pct: '16%' },
] as const

export function Dashboard() {
  const location = useLocation()
  const activeLabel = useMemo(() => getAdminActiveLabel(location.pathname), [location.pathname])
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chartRange, setChartRange] = useState<'Day' | 'Week' | 'Month'>('Month')
  const [donutRange, setDonutRange] = useState<'Day' | 'Week' | 'Month'>('Day')
  const [chartHovered, setChartHovered] = useState<null | 'total' | 'mon' | 'listing' | 'service'>(null)
  const [donutHovered, setDonutHovered] = useState<number | null>(null)
  const [openRowMenu, setOpenRowMenu] = useState<number | null>(null)
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const [chartCalOpen, setChartCalOpen] = useState(false)
  const [donutCalOpen, setDonutCalOpen] = useState(false)

  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)
  const chartCalRef = useRef<HTMLDivElement>(null)
  const donutCalRef = useRef<HTMLDivElement>(null)
  const rowMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function closeOnOutside(e: MouseEvent) {
      const t = e.target as Node
      if (notifRef.current && !notifRef.current.contains(t)) setNotificationsOpen(false)
      if (profileRef.current && !profileRef.current.contains(t)) setProfileOpen(false)
      if (chartCalRef.current && !chartCalRef.current.contains(t)) setChartCalOpen(false)
      if (donutCalRef.current && !donutCalRef.current.contains(t)) setDonutCalOpen(false)
      if (rowMenuRef.current && !rowMenuRef.current.contains(t)) setOpenRowMenu(null)
    }
    document.addEventListener('mousedown', closeOnOutside)
    return () => document.removeEventListener('mousedown', closeOnOutside)
  }, [])

  return (
    <div className="font-inter flex h-screen max-h-[100dvh] min-w-0 overflow-hidden bg-white">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel={activeLabel} />

      <div className="flex min-w-0 w-full flex-1 flex-col lg:ml-64">
        <header className="shrink-0 border-b border-[#E5E7EB] bg-white">
          <div className="flex min-h-[76px] flex-col gap-3 px-4 py-3 sm:h-[76px] sm:flex-row sm:items-center sm:justify-between sm:py-0 sm:px-8">
            <div className="flex min-w-0 items-center gap-3">
              <button
                type="button"
                className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg p-2 hover:bg-gray-100 lg:hidden"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-6 w-6 text-[#6B7280]" />
              </button>
              <h1 className="truncate text-2xl font-bold leading-8 text-[#111827]">Dashboard</h1>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <div className="relative" ref={notifRef}>
                <button
                  type="button"
                  className={`relative rounded-[10px] p-2 ${notificationsOpen ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  aria-expanded={notificationsOpen}
                  aria-label="Notifications"
                  onClick={() => {
                    setNotificationsOpen((v) => !v)
                    setProfileOpen(false)
                  }}
                >
                  <Bell className="h-6 w-6 text-[#6B7280]" strokeWidth={1.5} />
                  <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#fb2c36]" />
                </button>
                {notificationsOpen ? (
                  <div className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,320px)] rounded-lg border border-[#E5E7EB] bg-white py-2 shadow-lg">
                    <p className="border-b border-[#F3F4F6] px-4 py-2 text-[13px] font-semibold text-[#111827]">Notifications</p>
                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      New listing approval request
                    </button>
                    <button
                      type="button"
                      className="w-full px-4 py-3 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                      onClick={() => setNotificationsOpen(false)}
                    >
                      Weekly report is ready
                    </button>
                  </div>
                ) : null}
              </div>

              <div className="relative flex items-center border-l border-[#E5E7EB] pl-2" ref={profileRef}>
                <button
                  type="button"
                  className={`flex items-center gap-2 rounded-lg py-1 pl-2 pr-1 ${profileOpen ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
                  aria-expanded={profileOpen}
                  onClick={() => {
                    setProfileOpen((v) => !v)
                    setNotificationsOpen(false)
                  }}
                >
                  <span className="text-[14px] font-medium text-[#111827]">John Doe</span>
                  <img
                    src={headerAvatar}
                    alt=""
                    className="hidden h-9 w-9 rounded-full border border-[#E5E7EB] object-cover sm:block"
                  />
                </button>
                {profileOpen ? (
                  <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
                    <Link
                      to="/admin/dashboard"
                      className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                      onClick={() => setProfileOpen(false)}
                    >
                      <User className="h-4 w-4" /> Profile
                    </Link>
                    <Link
                      to="/admin/settings"
                      className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                      onClick={() => setProfileOpen(false)}
                    >
                      Settings
                    </Link>
                    <Link
                      to="/admin/login"
                      className="block border-t border-[#F3F4F6] px-4 py-2.5 text-[13px] text-[#DC2626] hover:bg-red-50"
                      onClick={() => setProfileOpen(false)}
                    >
                      Log out
                    </Link>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto bg-[#F9FAFB] px-4 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pt-4 sm:px-6 sm:pt-6 sm:pb-8 lg:px-8">
          {/* Row 1 */}
          <section className="mb-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
            {summaryStats.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className="group min-h-[86px] rounded-[10px] border border-[#E5E7EB] bg-white p-3 shadow-sm transition-shadow hover:border-[#B89F7C]/40 hover:shadow-md"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold leading-snug text-[#111827]">{item.label}</p>
                    {item.sub ? <p className="mt-0.5 text-[12px] font-normal leading-tight text-[#6B7280]">{item.sub}</p> : null}
                  </div>
                  <span className="shrink-0 text-[18px] font-bold tabular-nums leading-none text-[#111827] transition-colors group-hover:text-[#B89F7C] sm:text-[20px]">
                    {item.value}
                  </span>
                </div>
                <div className="mt-3 h-[3px] w-[78%] rounded-full bg-[#B89F7C]" />
              </Link>
            ))}
          </section>

          {/* Row 2 */}
          <section className="mb-4 grid grid-cols-1 gap-3 xl:grid-cols-3">
            <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm xl:col-span-2">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-[18px] font-bold leading-tight text-[#111827]">User Growth / Revenue Chart</h2>
                <div className="flex flex-wrap items-center gap-2">
                  {(['Day', 'Week', 'Month'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setChartRange(r)}
                      className={`rounded-md px-3 py-1.5 text-[13px] transition-colors ${
                        chartRange === r
                          ? 'bg-[#F5F0E8] font-semibold text-[#B89F7C] shadow-sm ring-1 ring-[#B89F7C]/25'
                          : 'font-normal text-[#6B7280] hover:bg-gray-50'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                  <div className="relative" ref={chartCalRef}>
                    <button
                      type="button"
                      className={`flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E7EB] bg-white transition-colors hover:border-[#B89F7C] hover:bg-[#F5F0E8] ${
                        chartCalOpen ? 'border-[#B89F7C] bg-[#F5F0E8]' : ''
                      }`}
                      aria-label="Date range"
                      onClick={() => {
                        setChartCalOpen((v) => !v)
                        setDonutCalOpen(false)
                      }}
                    >
                      <Calendar className="h-4 w-4 text-[#9CA3AF]" />
                    </button>
                    {chartCalOpen ? (
                      <div className="absolute right-0 top-full z-40 mt-2 w-56 rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-lg">
                        <p className="mb-2 text-[12px] font-semibold text-[#111827]">Chart date range</p>
                        <p className="text-[12px] text-[#6B7280]">Select a range to filter this chart (demo).</p>
                        <button
                          type="button"
                          className="mt-3 w-full rounded-md bg-[#B89F7C] py-2 text-[13px] font-semibold text-white hover:opacity-95"
                          onClick={() => setChartCalOpen(false)}
                        >
                          Apply
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="relative h-[290px] overflow-hidden rounded-lg">
                <svg viewBox="0 0 1000 260" className="absolute inset-0 h-full w-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="adminAreaGold" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#B89F7C" stopOpacity="0.28" />
                      <stop offset="100%" stopColor="#B89F7C" stopOpacity="0.03" />
                    </linearGradient>
                    <linearGradient id="adminAreaBlue" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.22" />
                      <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M20,165 Q80,160 130,145 Q180,130 230,120 Q280,110 340,90 Q400,70 460,95 Q520,120 580,80 Q640,40 700,85 Q760,130 820,100 Q880,70 940,90 Q970,100 980,95"
                    fill="none"
                    stroke="#B89F7C"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M20,165 Q80,160 130,145 Q180,130 230,120 Q280,110 340,90 Q400,70 460,95 Q520,120 580,80 Q640,40 700,85 Q760,130 820,100 Q880,70 940,90 Q970,100 980,95 L980,260 L20,260 Z"
                    fill="url(#adminAreaGold)"
                  />
                  <path
                    d="M20,200 Q80,185 140,170 Q200,155 260,175 Q320,195 380,140 Q440,85 500,120 Q560,155 620,130 Q680,105 740,125 Q800,145 860,110 Q920,75 980,115"
                    fill="none"
                    stroke="#7EB6E8"
                    strokeWidth="2.5"
                  />
                  <path
                    d="M20,200 Q80,185 140,170 Q200,155 260,175 Q320,195 380,140 Q440,85 500,120 Q560,155 620,130 Q680,105 740,125 Q800,145 860,110 Q920,75 980,115 L980,260 L20,260 Z"
                    fill="url(#adminAreaBlue)"
                  />
                </svg>

                {chartHovered === 'total' && (
                  <div className="pointer-events-none absolute left-[20%] top-[38%] z-10 rounded-sm border border-[#EBEAEA] bg-white px-3 py-2 shadow-sm">
                    <div className="text-[14px] font-medium leading-tight text-[#333]">Total Revenue</div>
                    <div className="text-[14px] leading-tight text-[#666]">$43,612</div>
                  </div>
                )}
                {chartHovered === 'mon' && (
                  <div className="pointer-events-none absolute left-[42%] top-[22%] z-10 rounded-sm border border-[#EBEAEA] bg-white px-3 py-2 shadow-sm">
                    <div className="text-[14px] font-medium leading-tight text-[#333]">Mon Revenue</div>
                    <div className="text-[14px] leading-tight text-[#666]">$22,612</div>
                  </div>
                )}
                {chartHovered === 'listing' && (
                  <div className="pointer-events-none absolute left-[58%] top-[45%] z-10 rounded-sm border border-[#EBEAEA] bg-white px-3 py-2 shadow-sm">
                    <div className="text-[14px] font-medium leading-tight text-[#333]">Listing Plan Sales</div>
                    <div className="text-[14px] leading-tight text-[#666]">$78,228</div>
                  </div>
                )}
                {chartHovered === 'service' && (
                  <div className="pointer-events-none absolute right-[8%] top-[38%] z-10 rounded-sm border border-[#EBEAEA] bg-white px-3 py-2 shadow-sm">
                    <div className="text-[14px] font-medium leading-tight text-[#333]">Service Purchases</div>
                    <div className="text-[14px] leading-tight text-[#666]">$459.67</div>
                  </div>
                )}

                <button
                  type="button"
                  aria-label="Data point: Total Revenue"
                  className="absolute left-[20%] top-[46%] z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#B89F7C] bg-white hover:scale-125 hover:shadow-md"
                  onMouseEnter={() => setChartHovered('total')}
                  onMouseLeave={() => setChartHovered(null)}
                  onFocus={() => setChartHovered('total')}
                  onBlur={() => setChartHovered(null)}
                />
                <button
                  type="button"
                  aria-label="Data point: Mon Revenue"
                  className="absolute left-[46%] top-[30%] z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#B89F7C] bg-white hover:scale-125 hover:shadow-md"
                  onMouseEnter={() => setChartHovered('mon')}
                  onMouseLeave={() => setChartHovered(null)}
                  onFocus={() => setChartHovered('mon')}
                  onBlur={() => setChartHovered(null)}
                />
                <button
                  type="button"
                  aria-label="Data point: Listing Plan Sales"
                  className="absolute left-[58%] top-[53%] z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#B89F7C] bg-white hover:scale-125 hover:shadow-md"
                  onMouseEnter={() => setChartHovered('listing')}
                  onMouseLeave={() => setChartHovered(null)}
                  onFocus={() => setChartHovered('listing')}
                  onBlur={() => setChartHovered(null)}
                />
                <button
                  type="button"
                  aria-label="Data point: Service Purchases"
                  className="absolute left-[82%] top-[44%] z-20 h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#B89F7C] bg-white hover:scale-125 hover:shadow-md"
                  onMouseEnter={() => setChartHovered('service')}
                  onMouseLeave={() => setChartHovered(null)}
                  onFocus={() => setChartHovered('service')}
                  onBlur={() => setChartHovered(null)}
                />

                <div className="pointer-events-none absolute bottom-2 left-3 right-3 flex justify-between text-[12px] font-normal text-[#6B7280]">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
                <h2 className="text-[18px] font-bold leading-tight text-[#111827]">Income Breakdown</h2>
                <div className="flex flex-wrap items-center gap-2">
                  {(['Day', 'Week', 'Month'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setDonutRange(r)}
                      className={`rounded-md px-3 py-1.5 text-[13px] transition-colors ${
                        donutRange === r
                          ? 'bg-[#F5F0E8] font-semibold text-[#B89F7C] shadow-sm ring-1 ring-[#B89F7C]/25'
                          : 'font-normal text-[#6B7280] hover:bg-gray-50'
                      }`}
                    >
                      {r}
                    </button>
                  ))}
                  <div className="relative" ref={donutCalRef}>
                    <button
                      type="button"
                      className={`flex h-8 w-8 items-center justify-center rounded-md border border-[#E5E7EB] bg-white transition-colors hover:border-[#B89F7C] hover:bg-[#F5F0E8] ${
                        donutCalOpen ? 'border-[#B89F7C] bg-[#F5F0E8]' : ''
                      }`}
                      aria-label="Date range"
                      onClick={() => {
                        setDonutCalOpen((v) => !v)
                        setChartCalOpen(false)
                      }}
                    >
                      <Calendar className="h-4 w-4 text-[#9CA3AF]" />
                    </button>
                    {donutCalOpen ? (
                      <div className="absolute right-0 top-full z-40 mt-2 w-56 rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-lg">
                        <p className="mb-2 text-[12px] font-semibold text-[#111827]">Income period</p>
                        <p className="text-[12px] text-[#6B7280]">Pick a period for the donut breakdown (demo).</p>
                        <button
                          type="button"
                          className="mt-3 w-full rounded-md bg-[#B89F7C] py-2 text-[13px] font-semibold text-white hover:opacity-95"
                          onClick={() => setDonutCalOpen(false)}
                        >
                          Apply
                        </button>
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>

              <div className="relative mx-auto flex h-[220px] w-[220px] items-center justify-center">
                <svg viewBox="0 0 200 200" className="h-full w-full">
                  {donutSegments.map((seg, i) => (
                    <path
                      key={seg.label}
                      d={donutSlice(100, 100, 90, 54, seg.start, seg.end)}
                      fill={seg.fill}
                      opacity={donutHovered === null || donutHovered === i ? 1 : 0.45}
                      className="cursor-pointer transition-opacity"
                      stroke="white"
                      strokeWidth="2"
                      onMouseEnter={() => setDonutHovered(i)}
                      onMouseLeave={() => setDonutHovered(null)}
                    />
                  ))}
                </svg>
                <div className="pointer-events-none absolute inset-0 z-10 flex flex-col items-center justify-center">
                  <span className="text-2xl font-bold leading-8 text-[#111827]">$85k</span>
                  <span className="text-[14px] font-normal text-[#6B7280]">16%</span>
                </div>
                {donutHovered !== null && donutSegments[donutHovered] ? (
                  <div className="pointer-events-none absolute left-1/2 top-[8%] z-20 -translate-x-1/2 rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-center shadow-md">
                    <p className="text-[12px] font-semibold text-[#111827]">{donutSegments[donutHovered].label}</p>
                    <p className="text-[13px] font-bold text-[#B89F7C]">{donutSegments[donutHovered].value}</p>
                    {'pct' in donutSegments[donutHovered] && donutSegments[donutHovered].pct ? (
                      <p className="text-[11px] text-[#6B7280]">{donutSegments[donutHovered].pct} of total</p>
                    ) : null}
                  </div>
                ) : null}
              </div>

              <div className="mt-4 flex items-center justify-between gap-2 text-[13px] font-normal text-[#374151]">
                <span className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#B89F7C]" />
                  Marketing Channels
                </span>
                <span className="font-semibold text-[#111827]">$22.0k</span>
              </div>
            </div>
          </section>

          {/* Row 3 */}
          <section className="grid grid-cols-1 gap-3 xl:grid-cols-12">
            <div className="xl:col-span-3">
              <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
                <h2 className="mb-4 text-base font-bold leading-[1.25] text-[#111827]">User Stats</h2>
                <ul className="space-y-3">
                  {userStats.map((row) => (
                    <li
                      key={row.label}
                      className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-[14px] transition-colors ${
                        row.highlight
                          ? 'bg-[#B89F7C] font-semibold text-white'
                          : 'cursor-default border border-[#E5E7EB] font-normal text-[#374151] hover:border-[#B89F7C]/50 hover:bg-[#FAFAF9]'
                      }`}
                    >
                      <span>{row.label}</span>
                      <span className="tabular-nums">{row.value}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="xl:col-span-6">
              <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
                <h2 className="mb-4 text-[18px] font-bold leading-tight text-[#111827]">Users Management</h2>
                <div className="overflow-x-auto">
                  <table className="w-full min-w-[640px]">
                    <thead>
                      <tr className="border-b border-[#E5E7EB] text-left text-[13px] font-semibold text-[#6B7280]">
                        <th className="pb-2 pr-3">Name</th>
                        <th className="pb-2 pr-3">Email Address</th>
                        <th className="pb-2 pr-3">Role</th>
                        <th className="pb-2 pr-3">Status</th>
                        <th className="pb-2 pr-3">Last Login</th>
                        <th className="pb-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {usersRows.map((row, i) => (
                        <tr key={`${row.email}-${i}`} className="border-t border-[#ECECEC] text-[13px] font-normal text-[#374151]">
                          <td className="py-3 pr-3 font-medium text-[#111827]">{row.name}</td>
                          <td className="py-3 pr-3">{row.email}</td>
                          <td className="py-3 pr-3">{row.role}</td>
                          <td className="py-3 pr-3">
                            <span className={`rounded-sm px-2.5 py-0.5 text-[12px] font-medium ${row.badge}`}>{row.status}</span>
                          </td>
                          <td className="py-3 pr-3">{row.lastLogin}</td>
                          <td className="py-3">
                            <div className="relative inline-block" ref={i === openRowMenu ? rowMenuRef : undefined}>
                              <button
                                type="button"
                                className={`rounded-md p-1.5 ${openRowMenu === i ? 'bg-gray-100' : 'text-[#6B7280] hover:bg-gray-100'}`}
                                aria-expanded={openRowMenu === i}
                                aria-label={`Actions for ${row.name}`}
                                onClick={() => setOpenRowMenu(openRowMenu === i ? null : i)}
                              >
                                <MoreVertical className="h-5 w-5" />
                              </button>
                              {openRowMenu === i ? (
                                <div className="absolute right-0 top-full z-50 mt-1 w-40 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
                                  <button
                                    type="button"
                                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                                    onClick={() => setOpenRowMenu(null)}
                                  >
                                    <Eye className="h-4 w-4" /> View
                                  </button>
                                  <button
                                    type="button"
                                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                                    onClick={() => setOpenRowMenu(null)}
                                  >
                                    <Pencil className="h-4 w-4" /> Edit
                                  </button>
                                  <button
                                    type="button"
                                    className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#DC2626] hover:bg-red-50"
                                    onClick={() => setOpenRowMenu(null)}
                                  >
                                    <Trash2 className="h-4 w-4" /> Delete
                                  </button>
                                </div>
                              ) : null}
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="xl:col-span-3">
              <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
                <h2 className="mb-4 text-base font-bold leading-[1.25] text-[#111827]">Quick Actions</h2>
                <div className="flex flex-col gap-3">
                  <Link
                    to="/admin/dashboard"
                    className="flex h-11 w-full items-center justify-center rounded-lg border border-[#D1D5DB] bg-white text-[14px] font-medium text-[#374151] transition-all hover:border-[#B89F7C] hover:shadow-md"
                  >
                    Add User
                  </Link>
                  <Link
                    to="/admin/listings-management"
                    className="flex h-11 w-full items-center justify-center rounded-lg border border-[#D1D5DB] bg-white text-[14px] font-medium text-[#374151] transition-all hover:border-[#B89F7C] hover:shadow-md"
                  >
                    Manage Listing
                  </Link>
                  <Link
                    to="/admin/reports-analytics"
                    className="flex h-11 w-full items-center justify-center rounded-lg border border-[#D1D5DB] bg-white text-[14px] font-medium text-[#374151] transition-all hover:border-[#B89F7C] hover:shadow-md"
                  >
                    View Reports
                  </Link>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}
