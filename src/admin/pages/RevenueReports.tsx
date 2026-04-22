import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Funnel } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'

const cards = [
  { label: 'Daily Revenue', sub: 'Week comparison', value: '1.345', trend: '↑', line: '#B89F7C' },
  { label: 'Monthly Revenue', sub: 'Month comparison', value: '3.820', trend: '↓', line: '#60A5FA' },
  { label: 'Monthly Revenue', sub: 'Monthly comparison', value: '$69.00', trend: '↑', line: '#FCA5A5' },
] as const

export function RevenueReports() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [exportMenuOpen, setExportMenuOpen] = useState(false)
  const [trendYear, setTrendYear] = useState<'2025' | '2026'>('2026')
  const [rangeMode, setRangeMode] = useState<'Week' | 'Month'>('Week')
  const [growthHover, setGrowthHover] = useState<number | null>(null)
  const [donutHover, setDonutHover] = useState<number | null>(null)
  const [customHover, setCustomHover] = useState(false)

  const filterRef = useRef<HTMLDivElement>(null)
  const exportRef = useRef<HTMLDivElement>(null)

  const donutSlices = useMemo(
    () => [
      { color: '#F6C85F', label: 'Listing', val: '$45k' },
      { color: '#60A5FA', label: 'Service', val: '$25k' },
      { color: '#A7F3D0', label: 'Charity', val: '$15k' },
    ],
    []
  )

  useEffect(() => {
    function closeOnOutside(e: MouseEvent) {
      const t = e.target as Node
      if (filterRef.current && !filterRef.current.contains(t)) setFilterOpen(false)
      if (exportRef.current && !exportRef.current.contains(t)) setExportMenuOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutside)
    return () => document.removeEventListener('mousedown', closeOnOutside)
  }, [])

  return (
    <AdminLayout title="Revenue Management">
      <div className="space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h2 className="text-[34px] font-bold leading-none text-[#111827]">Revenue Reports</h2>
          <div className="flex items-center gap-2">
            <Link to="/admin/revenue-management" className="rounded-md border border-[#E5E7EB] bg-white px-4 py-2 text-[14px] font-semibold text-[#111827]">Back</Link>
            <Link to="/admin/revenue-management/details" className="rounded-md border border-[#E5E7EB] bg-white px-4 py-2 text-[14px] font-semibold text-[#111827]">Details</Link>
            <div className="relative" ref={filterRef}>
              <button type="button" onClick={() => setFilterOpen((v) => !v)} className={`rounded-lg border border-[#E5E7EB] p-2 text-[#6B7280] ${filterOpen ? 'bg-[#F9FAFB]' : ''}`}>
                <Funnel className="h-4 w-4" />
              </button>
              {filterOpen ? (
                <div className="absolute right-0 top-full z-40 mt-2 w-44 rounded-lg border border-[#E5E7EB] bg-white p-2 shadow-lg">
                  {['This Week', 'This Month', 'Last Month'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => {
                        setRangeMode(opt === 'This Month' ? 'Month' : 'Week')
                        setFilterOpen(false)
                      }}
                      className="w-full rounded-md px-2 py-1.5 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
            <div className="relative" ref={exportRef}>
              <button type="button" onClick={() => setExportMenuOpen((v) => !v)} className="rounded-md border border-[#E5E7EB] bg-white px-4 py-2 text-[14px] font-semibold text-[#111827]">Export Excel</button>
              {exportMenuOpen ? (
                <div className="absolute right-0 top-full z-40 mt-2 w-40 rounded-lg border border-[#E5E7EB] bg-white p-2 shadow-lg">
                  <button type="button" className="w-full rounded-md px-2 py-1.5 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]">Excel .xlsx</button>
                  <button type="button" className="w-full rounded-md px-2 py-1.5 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]">CSV .csv</button>
                </div>
              ) : null}
            </div>
            <button type="button" className="rounded-md bg-[#B89F7C] px-4 py-2 text-[14px] font-semibold text-white">Export CSV</button>
          </div>
        </div>

        <section className="grid gap-3 md:grid-cols-3">
          {cards.map((card) => (
            <div key={`${card.label}-${card.value}`} className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-[14px] font-semibold text-[#111827]">{card.label}</p>
                  <p className="text-[12px] text-[#8D88A8]">{card.sub}</p>
                </div>
                <p className="text-[32px] font-bold leading-none text-[#111827]">{card.value} <span className="text-[18px]">{card.trend}</span></p>
              </div>
              <div className="mt-3 h-[3px] rounded-full bg-[#ECECEC]">
                <div className="h-full rounded-full" style={{ width: '70%', backgroundColor: card.line }} />
              </div>
            </div>
          ))}
        </section>

        <section className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[34px] font-bold leading-none text-[#111827]">Revenue Trend</h3>
            <button
              type="button"
              onClick={() => setTrendYear((y) => (y === '2026' ? '2025' : '2026'))}
              className="text-[26px] font-semibold text-[#111827] hover:text-[#B89F7C]"
            >
              {trendYear}
            </button>
          </div>
          <p className="mb-2 text-[14px] text-[#6B7280]">Monthly Views</p>
          <svg viewBox="0 0 1200 180" className="h-[150px] w-full">
            <path d="M0 120 L100 100 L200 70 L300 88 L400 78 L500 55 L600 60 L700 34 L800 52 L900 44 L1000 58 L1100 42 L1200 52" fill="none" stroke="#B89F7C" strokeWidth="3" />
            <path d="M0 160 L1200 160" stroke="#EEE" strokeWidth="1" />
          </svg>
          <div className="mt-2 grid grid-cols-12 text-center text-[14px] text-[#6B7280]">
            {['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'].map((m) => (
              <span key={m}>{m}</span>
            ))}
          </div>
        </section>

        <section className="grid gap-3 xl:grid-cols-12">
          <div className="relative rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm xl:col-span-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[30px] font-bold leading-none text-[#111827]">Category Distribution</h3>
              <button className="rounded-lg border border-[#E5E7EB] p-2 text-[#9CA3AF]"><Calendar className="h-4 w-4" /></button>
            </div>
            <div
              className="mx-auto h-[180px] w-[180px] cursor-pointer rounded-full bg-[conic-gradient(#F6C85F_0_55%,#60A5FA_55%_75%,#A7F3D0_75%_100%)] p-[28px]"
              onMouseLeave={() => setDonutHover(null)}
            >
              <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-[38px] font-bold text-[#111827]">$85k</div>
            </div>
            <div className="mt-3 flex items-center gap-3 text-[13px]">
              {donutSlices.map((s, i) => (
                <button key={s.label} type="button" onMouseEnter={() => setDonutHover(i)} className="text-[#111827]">
                  <span className="mr-1.5 inline-block h-2 w-2 rounded-full" style={{ backgroundColor: s.color }} />
                  {s.label}
                </button>
              ))}
            </div>
            {donutHover !== null ? (
              <div className="pointer-events-none absolute right-3 top-3 rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-[12px] shadow">
                <p className="font-semibold text-[#111827]">{donutSlices[donutHover].label}</p>
                <p className="font-bold text-[#B89F7C]">{donutSlices[donutHover].val}</p>
              </div>
            ) : null}
          </div>

          <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm xl:col-span-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[30px] font-bold leading-none text-[#111827]">Monthly Growth</h3>
              <button className="rounded-lg border border-[#E5E7EB] p-2 text-[#9CA3AF]"><Calendar className="h-4 w-4" /></button>
            </div>
            <div className="mt-4 flex h-[200px] items-end justify-center gap-4">
              {[80, 130, 105, 160, 120, 90, 70].map((h, i) => (
                <button
                  key={h}
                  type="button"
                  onMouseEnter={() => setGrowthHover(i)}
                  onMouseLeave={() => setGrowthHover(null)}
                  className={`w-7 rounded-t bg-[#B89F7C]/90 transition-opacity ${growthHover === i ? 'opacity-100' : 'opacity-80 hover:opacity-100'}`}
                  style={{ height: `${h}px` }}
                />
              ))}
            </div>
            {growthHover !== null ? (
              <p className="mt-2 text-[12px] text-[#6B7280]">Month {growthHover + 1}: <span className="font-semibold text-[#111827]">{[80,130,105,160,120,90,70][growthHover]}k</span></p>
            ) : null}
            <p className="mt-3 text-[14px] text-[#111827]"><span className="mr-2 inline-block h-2 w-2 rounded-full bg-[#B89F7C]" />Monthly</p>
          </div>

          <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm xl:col-span-4">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-[30px] font-bold leading-none text-[#111827]">Custom Range</h3>
              <button className="rounded-lg border border-[#E5E7EB] p-2 text-[#9CA3AF]" onClick={() => setRangeMode((r) => (r === 'Week' ? 'Month' : 'Week'))}><Calendar className="h-4 w-4" /></button>
            </div>
            <svg viewBox="0 0 320 190" className="h-[250px] w-full" onMouseEnter={() => setCustomHover(true)} onMouseLeave={() => setCustomHover(false)}>
              <path d="M0 110 C 35 130, 60 40, 90 70 C 120 100, 145 46, 175 60 C 200 72, 235 96, 260 78 C 285 58, 300 82, 320 90" fill="none" stroke="#B89F7C" strokeWidth="2.4" />
              <circle cx="175" cy="60" r="6" fill="#B89F7C" />
              <line x1="175" y1="30" x2="175" y2="170" stroke="#D4D4D4" strokeDasharray="4 4" />
            </svg>
            {customHover ? (
              <div className="rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-[12px] shadow">
                <p className="font-semibold text-[#111827]">March</p>
                <p className="font-bold text-[#B89F7C]">$48.2k</p>
                <p className="text-[#6B7280]">Mode: {rangeMode}</p>
              </div>
            ) : null}
            <div className="mt-1 grid grid-cols-6 text-center text-[14px] text-[#6B7280]">
              {['Jan', 'Feb', 'Mar', 'Apr', 'Jun', 'Jul'].map((m) => (
                <span key={m}>{m}</span>
              ))}
            </div>
          </div>
        </section>
      </div>
    </AdminLayout>
  )
}
