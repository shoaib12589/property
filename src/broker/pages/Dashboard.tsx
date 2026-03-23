import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Calendar, Clock3, MapPin, Menu, Eye, Pencil } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { BrokerSidebar } from '../components/BrokerSidebar'

const topStats = [
  { label: 'Total Listing', value: '124', link: '/broker/total-listing' },
  { label: 'Active Listing', value: '124', link: '/broker/total-listing' },
  { label: 'Pending Listing', value: '05', link: '/broker/total-listing' },
  { label: 'Expired Listing', value: '87', link: '/broker/total-listing' },
  { label: 'Total Agents', value: '200', link: '/broker/agents-management' },
  { label: 'Total Showing Requests', value: '20', link: '/broker/total-showing-requests' },
]

const messages = [
  { title: 'New Message From Client', sub: 'My team generated $7,000 to $8,000...', dot: '#16A34A' },
  { title: 'New Message From Admin', sub: 'My team generated $7,000 to $8,000...', dot: '#DC2626' },
  { title: 'New Message From Admin', sub: 'My team generated $7,000 to $8,000...', dot: '#DC2626' },
  { title: 'New Message From Client', sub: 'My team generated $7,000 to $8,000...', dot: '#16A34A' },
  { title: 'New Message From Admin', sub: 'My team generated $7,000 to $8,000...', dot: '#DC2626' },
]

const listings = [
  { id: 'LST-2045', title: 'Urban Loft Studio', agent: 'John Williams', showing: '26/02/2026', status: 'Completed', created: '12/08/2026', badge: 'bg-[#EFF8D8] text-[#8B9A32]' },
  { id: '3433456', title: 'Cozy Family Home', agent: 'David James', showing: '04/03/2026', status: 'Active', created: '12/08/2026', badge: 'bg-[#E4ECFF] text-[#4272C9]' },
  { id: '9800654', title: 'Luxury Villa in Suburbs', agent: 'John Dew', showing: '13/09/2026', status: 'Schedule', created: '12/08/2026', badge: 'bg-[#DAF7DF] text-[#2BA75A]' },
]

const showingRequests = new Array(4).fill(null).map(() => ({
  title: 'Urban Loft Studio',
  location: '987 City Center, WA',
  date: '16/07/2025',
  time: '19:23',
}))

export function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [range, setRange] = useState<'Day' | 'Week' | 'Month'>('Day')
  const [hoveredPoint, setHoveredPoint] = useState<null | 'total' | 'mon' | 'listing' | 'service'>(null)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden bg-white min-w-0">
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Dashboard" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 w-full">
        <header className="shrink-0 bg-white border-b border-[#E5E7EB]">
          <div className="px-4 sm:px-8 min-h-[76px] py-3 sm:py-0 sm:h-[76px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-xl sm:text-2xl font-normal text-[#0a0a0a] truncate" style={{ fontFamily: 'Arial, sans-serif', lineHeight: '32px' }}>
                Dashboard
              </h1>
            </div>

            <div className="flex items-center gap-0 shrink-0">
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pb-8 bg-white">
          <section className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 xl:grid-cols-6 gap-3 mb-4">
            {topStats.map((item) => (
              <Link
                key={item.label}
                to={item.link}
                className="bg-[#f7f6f2] border border-[#E5E7EB] rounded-xl p-3 min-h-[86px] block hover:shadow-sm transition-shadow"
              >
                <div className="flex justify-between items-start gap-2">
                  <p className="text-[14px] font-bold text-[#1f1f1f] leading-snug sm:text-[15px]">{item.label}</p>
                  <span className="text-[18px] font-bold text-[#1f1f1f] leading-none tabular-nums sm:text-[20px]">{item.value}</span>
                </div>
                <div className="mt-3 h-[3px] w-[78%] bg-[#A49776]" />
              </Link>
            ))}
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-3 gap-3 mb-3">
            <div className="xl:col-span-2 bg-[#f7f6f2] border border-[#E5E7EB] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                <h2 className="text-[18px] font-bold text-[#111827] leading-tight">Monthly Revenue Chart</h2>
                <div className="flex items-center gap-2">
                  {(['Day', 'Week', 'Month'] as const).map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => setRange(r)}
                      className={`px-3 py-1.5 rounded-md text-[13px] font-semibold ${range === r ? 'bg-white text-[#1f1f1f] shadow-sm' : 'text-[#8D89A0]'}`}
                    >
                      {r}
                    </button>
                  ))}
                  <button type="button" className="w-8 h-8 rounded-md border border-[#E5E7EB] bg-white flex items-center justify-center">
                    <Calendar className="w-4 h-4 text-[#9CA3AF]" />
                  </button>
                </div>
              </div>

              <div className="relative h-[290px] rounded-lg overflow-hidden">
                <svg viewBox="0 0 1000 260" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
                  <defs>
                    <linearGradient id="bArea1" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#B39C75" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#B39C75" stopOpacity="0.03" />
                    </linearGradient>
                    <linearGradient id="bArea2" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="0%" stopColor="#D6C8AF" stopOpacity="0.25" />
                      <stop offset="100%" stopColor="#D6C8AF" stopOpacity="0.02" />
                    </linearGradient>
                  </defs>
                  {/* Main darker line - curved wave pattern matching screenshot */}
                  <path d="M20,165 Q80,160 130,145 Q180,130 230,120 Q280,110 340,90 Q400,70 460,95 Q520,120 580,80 Q640,40 700,85 Q760,130 820,100 Q880,70 940,90 Q970,100 980,95" fill="none" stroke="#A49776" strokeWidth="2.5" />
                  <path d="M20,165 Q80,160 130,145 Q180,130 230,120 Q280,110 340,90 Q400,70 460,95 Q520,120 580,80 Q640,40 700,85 Q760,130 820,100 Q880,70 940,90 Q970,100 980,95 L980,260 L20,260 Z" fill="url(#bArea1)" />
                  {/* Secondary lighter line */}
                  <path d="M20,200 Q80,185 140,170 Q200,155 260,175 Q320,195 380,140 Q440,85 500,120 Q560,155 620,130 Q680,105 740,125 Q800,145 860,110 Q920,75 980,115" fill="none" stroke="#D6C8AF" strokeWidth="2.5" />
                  <path d="M20,200 Q80,185 140,170 Q200,155 260,175 Q320,195 380,140 Q440,85 500,120 Q560,155 620,130 Q680,105 740,125 Q800,145 860,110 Q920,75 980,115 L980,260 L20,260 Z" fill="url(#bArea2)" />
                </svg>

                {/* Hover tooltips */}
                {hoveredPoint === 'total' && (
                  <div className="absolute left-[20%] top-[38%] bg-white px-3 py-2 border border-[#EBEAEA] shadow-sm pointer-events-none rounded-sm">
                    <div className="text-[14px] text-[#333] font-medium leading-tight">Total Revenue</div>
                    <div className="text-[14px] text-[#666] leading-tight">$43,612</div>
                  </div>
                )}
                {hoveredPoint === 'mon' && (
                  <div className="absolute left-[42%] top-[22%] bg-white px-3 py-2 border border-[#EBEAEA] shadow-sm pointer-events-none rounded-sm">
                    <div className="text-[14px] text-[#333] font-medium leading-tight">Mon Revenue</div>
                    <div className="text-[14px] text-[#666] leading-tight">$22,612</div>
                  </div>
                )}
                {hoveredPoint === 'listing' && (
                  <div className="absolute left-[58%] top-[45%] bg-white px-3 py-2 border border-[#EBEAEA] shadow-sm pointer-events-none rounded-sm">
                    <div className="text-[14px] text-[#333] font-medium leading-tight">Listing Plan Sales</div>
                    <div className="text-[14px] text-[#666] leading-tight">$78.228</div>
                  </div>
                )}
                {hoveredPoint === 'service' && (
                  <div className="absolute right-[8%] top-[38%] bg-white px-3 py-2 border border-[#EBEAEA] shadow-sm pointer-events-none rounded-sm">
                    <div className="text-[14px] text-[#333] font-medium leading-tight">Service Purchases</div>
                    <div className="text-[14px] text-[#666] leading-tight">$459.67</div>
                  </div>
                )}

                {/* Data point markers - small circles on the main line */}
                <button
                  type="button"
                  aria-label="Total Revenue point"
                  className="absolute left-[20%] top-[46%] w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#A49776] bg-white"
                  onMouseEnter={() => setHoveredPoint('total')}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onFocus={() => setHoveredPoint('total')}
                  onBlur={() => setHoveredPoint(null)}
                />
                <button
                  type="button"
                  aria-label="Mon Revenue point"
                  className="absolute left-[46%] top-[30%] w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#A49776] bg-white"
                  onMouseEnter={() => setHoveredPoint('mon')}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onFocus={() => setHoveredPoint('mon')}
                  onBlur={() => setHoveredPoint(null)}
                />
                <button
                  type="button"
                  aria-label="Listing Plan Sales point"
                  className="absolute left-[58%] top-[53%] w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#A49776] bg-white"
                  onMouseEnter={() => setHoveredPoint('listing')}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onFocus={() => setHoveredPoint('listing')}
                  onBlur={() => setHoveredPoint(null)}
                />
                <button
                  type="button"
                  aria-label="Service Purchases point"
                  className="absolute left-[82%] top-[44%] w-3 h-3 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-[#A49776] bg-white"
                  onMouseEnter={() => setHoveredPoint('service')}
                  onMouseLeave={() => setHoveredPoint(null)}
                  onFocus={() => setHoveredPoint('service')}
                  onBlur={() => setHoveredPoint(null)}
                />

                <div className="absolute bottom-2 left-3 right-3 flex justify-between text-[12px] text-[#999]">
                  {['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
                    <span key={m}>{m}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-[#f7f6f2] border border-[#E5E7EB] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                <h2 className="text-[18px] font-bold leading-tight text-[#111827]">Messages</h2>
                <div className="text-[12px] text-[#A49776] font-semibold">Admin &nbsp; Customer &nbsp; Agent</div>
              </div>
              <div className="space-y-2">
                {messages.map((message, index) => (
                  <div key={`${message.title}-${index}`} className="bg-white/70 px-3 py-2 rounded-md flex items-center justify-between">
                    <div>
                      <div className="text-[14px] font-bold text-[#111827]">{message.title}</div>
                      <div className="text-[12px] text-[#6B7280] leading-snug">{message.sub}</div>
                    </div>
                    <span className="w-3 h-3 rounded-full" style={{ backgroundColor: message.dot }} />
                  </div>
                ))}
              </div>
            </div>
          </section>

          <section className="grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-3">
            <div className="bg-[#f7f6f2] border border-[#E5E7EB] rounded-xl p-4">
              <div className="flex items-center justify-between mb-3 gap-2 flex-wrap">
                <h2 className="text-[18px] font-bold leading-tight text-[#111827]">Recent Listing Activity</h2>
                <Link
                  to="/broker/manage-listings"
                  className="inline-flex items-center px-4 h-9 bg-[#A49776] text-white text-[13px] font-semibold rounded-md hover:opacity-95"
                >
                  See All
                </Link>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full min-w-[760px]">
                  <thead>
                    <tr className="text-left text-[13px] font-bold text-[#374151]">
                      <th className="py-2 pr-3">Listing ID</th>
                      <th className="py-2 pr-3">Property Title</th>
                      <th className="py-2 pr-3">Assigned Agent</th>
                      <th className="py-2 pr-3">Showing Date</th>
                      <th className="py-2 pr-3">Status</th>
                      <th className="py-2 pr-3">Date Created</th>
                      <th className="py-2">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {listings.map((row) => (
                      <tr key={row.id} className="text-[13px] text-[#374151] border-t border-[#ECECEC]">
                        <td className="py-3 pr-3">{row.id}</td>
                        <td className="py-3 pr-3 font-medium text-[#111827]">{row.title}</td>
                        <td className="py-3 pr-3">{row.agent}</td>
                        <td className="py-3 pr-3">{row.showing}</td>
                        <td className="py-3 pr-3">
                          <span className={`px-2.5 py-0.5 rounded-sm text-[12px] font-medium ${row.badge}`}>{row.status}</span>
                        </td>
                        <td className="py-3 pr-3">{row.created}</td>
                        <td className="py-3">
                          <div className="flex items-center gap-2">
                            <button type="button" className="w-6 h-6 rounded-full bg-[#F1EFE8] flex items-center justify-center text-[#A49776]"><Eye className="w-4 h-4" /></button>
                            <button type="button" className="w-6 h-6 rounded-full bg-[#F1EFE8] flex items-center justify-center text-[#A49776]"><Pencil className="w-4 h-4" /></button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-[#f7f6f2] border border-[#E5E7EB] rounded-xl p-4">
              <h2 className="text-[18px] font-bold leading-tight text-[#111827] mb-4">Showing Request</h2>
              <div className="space-y-3">
                {showingRequests.map((item, index) => (
                  <div key={index} className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-2 min-w-0">
                      <span className="mt-1.5 w-2.5 h-2.5 rounded-full bg-[#D9D9D9] shrink-0" />
                      <div>
                        <div className="text-[14px] font-bold text-[#111827] leading-snug">{item.title}</div>
                        <div className="flex items-center gap-1 text-[12px] text-[#6B7280] mt-0.5">
                          <MapPin className="w-3 h-3 shrink-0" />
                          <span>{item.location}</span>
                        </div>
                      </div>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-[12px] text-[#6B7280]">{item.date}</div>
                      <div className="flex items-center justify-end gap-1 text-[12px] text-[#6B7280] mt-0.5">
                        <Clock3 className="w-3 h-3 shrink-0" />
                        <span>{item.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

