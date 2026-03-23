import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Bell, ChevronDown, ChevronLeft, Menu, Star } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { BrokerSidebar } from '../components/BrokerSidebar'
import { getAgentById, PERFORMANCE_TABLE_ROWS } from '../data/agentsData'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#A49776',
  chartFill: 'rgba(164, 151, 118, 0.35)',
  chartLine: '#A49776',
}
const font = { fontFamily: 'Arial, sans-serif' } as const

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

/** ~4 data points per month to create the detailed jagged line visible in the Figma chart. Values in k (100–400). */
const WEEKLY_SERIES = [
  160, 175, 185, 170,
  240, 260, 250, 215,
  210, 220, 200, 195,
  190, 175, 120, 140,
  195, 230, 270, 265,
  280, 290, 275, 310,
  330, 355, 290, 280,
  275, 310, 305, 290,
  280, 320, 380, 340,
  310, 295, 280, 290,
  285, 290, 280, 295,
  290, 300, 310, 320,
]

function PerformanceChart({ year }: { year: string }) {
  const w = 720
  const h = 260
  const pad = { t: 32, r: 16, b: 36, l: 48 }
  const innerW = w - pad.l - pad.r
  const innerH = h - pad.t - pad.b
  const vmin = 100
  const vmax = 400

  const vals = WEEKLY_SERIES

  const points = vals.map((v, i) => {
    const x = pad.l + i * (innerW / Math.max(vals.length - 1, 1))
    const y = pad.t + innerH - ((v - vmin) / (vmax - vmin)) * innerH
    return { x, y }
  })

  const lineD = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ')
  const areaD =
    points.length > 0
      ? `M ${points[0].x} ${pad.t + innerH} L ${points.map((p) => `${p.x} ${p.y}`).join(' L ')} L ${points[points.length - 1].x} ${pad.t + innerH} Z`
      : ''

  const yTicks = [100, 200, 300, 400]

  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-auto" preserveAspectRatio="xMidYMid meet">
      {/* Year dropdown label (top-right inside chart) */}
      <text
        x={w - pad.r - 4}
        y={18}
        textAnchor="end"
        fill="#6B7280"
        style={{ fontFamily: 'Arial, sans-serif', fontSize: 11 }}
      >
        {year} ▾
      </text>

      {/* Horizontal grid lines + Y-axis labels */}
      {yTicks.map((t) => {
        const y = pad.t + innerH - ((t - vmin) / (vmax - vmin)) * innerH
        return (
          <g key={t}>
            <line x1={pad.l} y1={y} x2={w - pad.r} y2={y} stroke="#E5E7EB" strokeWidth="1" />
            <text x={8} y={y + 4} fill="#9CA3AF" style={{ fontFamily: 'Arial, sans-serif', fontSize: 10 }}>
              {t}k
            </text>
          </g>
        )
      })}

      {/* Filled area */}
      {areaD ? <path d={areaD} fill="rgba(164, 151, 118, 0.2)" /> : null}
      {/* Line */}
      {lineD ? <path d={lineD} fill="none" stroke={tokens.chartLine} strokeWidth="1.5" /> : null}

      {/* Month labels — evenly spaced along x-axis */}
      {MONTHS.map((m, i) => {
        const x = pad.l + (i / 11) * innerW
        return (
          <text
            key={m}
            x={x}
            y={h - 8}
            textAnchor="middle"
            fill="#6B7280"
            style={{ fontFamily: 'Arial, sans-serif', fontSize: 10 }}
          >
            {m}
          </text>
        )
      })}
    </svg>
  )
}

export function AgentPerformance() {
  const navigate = useNavigate()
  const { agentId } = useParams<{ agentId: string }>()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])
  const [year, setYear] = useState('2026')

  const agent = getAgentById(agentId)
  const displayName = agent?.name ?? 'Den Williams'

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0" style={{ backgroundColor: tokens.pageBg }}>
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Agents Management" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 w-full">
        <header className="shrink-0 bg-white border-b" style={{ borderColor: tokens.cardBorder }}>
          <div className="px-4 sm:px-8 min-h-[76px] py-2 sm:py-0 sm:h-[76px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 sm:gap-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 shrink-0"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/broker/agents-management')}
                className="inline-flex items-center gap-1.5 h-9 px-3 border border-[#D1D5DB] rounded-none bg-white text-[13px] text-[#374151] hover:bg-gray-50 shrink-0"
                style={font}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <h1 className="text-xl sm:text-2xl font-normal text-[#0a0a0a] truncate" style={{ ...font, lineHeight: '32px' }}>
                Agent Performance
              </h1>
            </div>
            <div className="flex items-center gap-0 sm:ml-auto shrink-0">
              <button type="button" className="relative p-2 rounded-[10px] hover:bg-gray-50" aria-label="Notifications">
                <Bell className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fb2c36]" />
              </button>
              <div className="flex items-center h-11 pl-4 ml-2 border-l" style={{ borderColor: tokens.cardBorder }}>
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pb-8 bg-white space-y-6">
          <div className="bg-white border border-[#E5E7EB] rounded-xl p-5 sm:p-6 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-4">
              <p className="text-[16px] font-semibold text-[#111827]" style={font}>
                Agent: {displayName}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <div className="relative">
                  <select
                    value={year}
                    onChange={(e) => setYear(e.target.value)}
                    className="h-8 pl-3 pr-8 rounded-lg border border-[#E5E7EB] text-[13px] bg-white appearance-none outline-none"
                    style={font}
                  >
                    <option value="2026">2026</option>
                    <option value="2025">2025</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>
            <div className="border border-[#E5E7EB] rounded-lg p-4 bg-[#FAFAFA]">
              <PerformanceChart year={year} />
            </div>
          </div>

          <div className="flex flex-wrap gap-3">
            {[
              { label: 'Total Listings:', value: '25' },
              { label: 'Active Listings', value: '18' },
              { label: 'Sold Listings:', value: '10' },
              { label: 'Completed Showings:', value: '40' },
              { label: 'Client Rating:', value: '4.5', star: true },
            ].map((m) => (
              <div
                key={m.label}
                className="inline-flex items-center gap-1.5 h-10 px-4 border border-[#E5E7EB] rounded-lg bg-white text-[13px] text-[#111827] whitespace-nowrap"
                style={font}
              >
                <span className="font-medium">{m.label}</span>
                {m.star ? <Star className="w-4 h-4 text-amber-400 fill-amber-400" /> : null}
                <span className="font-semibold">{m.value}</span>
              </div>
            ))}
          </div>

          <div className="overflow-x-auto">
            <div className="min-w-[700px]">
              <div
                className="grid border-b border-[#E5E7EB] bg-[#F9FAFB] text-[12px] font-bold text-[#111827]"
                style={{ gridTemplateColumns: '0.8fr 1.6fr 1.1fr 0.9fr 0.7fr', ...font }}
              >
                {['Request ID', 'Property', 'Agent Name', 'Showing Date', 'Status'].map((h) => (
                  <div key={h} className="px-4 py-3 text-center">{h}</div>
                ))}
              </div>
              <div className="divide-y divide-[#E5E7EB]">
                {PERFORMANCE_TABLE_ROWS.map((row, i) => (
                  <div
                    key={`${row.requestId}-${i}`}
                    className="grid items-center text-[13px] bg-white hover:bg-gray-50"
                    style={{ gridTemplateColumns: '0.8fr 1.6fr 1.1fr 0.9fr 0.7fr' }}
                  >
                    <div className="px-4 py-3 text-center text-[#6B7280]" style={font}>{row.requestId}</div>
                    <div className="px-4 py-3 text-center text-[#111827] truncate" style={font}>{row.property}</div>
                    <div className="px-4 py-3 text-center text-[#111827] truncate" style={font}>{row.agentCell}</div>
                    <div className="px-4 py-3 text-center text-[#4B5563]" style={font}>{row.showingDate}</div>
                    <div className="px-4 py-3 flex items-center justify-center">
                      <span
                        className="inline-flex items-center justify-center px-3 min-h-[26px] rounded-full text-[11px] font-medium"
                        style={{ backgroundColor: row.statusStyle.bg, color: row.statusStyle.text, ...font }}
                      >
                        {row.status}
                      </span>
                    </div>
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
