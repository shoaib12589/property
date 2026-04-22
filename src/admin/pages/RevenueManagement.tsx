import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Calendar, Eye, MoreVertical, Pencil, Trash2 } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'

const cards = [
  { label: 'Total Revenue', value: '124', pct: 82 },
  { label: 'Monthly Revenue', value: '124', pct: 74 },
  { label: 'Pending Payments', value: '$123', pct: 68 },
  { label: 'Refunded Amount', value: '$124', pct: 86 },
] as const

const recentRows = [
  { id: '2455675', user: 'John Williams', type: 'Listing Plan Purchase', amount: '$300', status: 'Pending' },
  { id: '2455676', user: 'David', type: 'Showing Request', amount: '$900', status: 'Already Ref' },
  { id: '2455677', user: 'Copper Johns', type: 'Donation', amount: '$450', status: 'Pending' },
] as const

export function RevenueManagement() {
  const [miniRange, setMiniRange] = useState<'Week' | 'Month'>('Week')
  const [mainRange, setMainRange] = useState<'Day' | 'Week' | 'Month'>('Day')
  const [miniCalOpen, setMiniCalOpen] = useState(false)
  const [mainCalOpen, setMainCalOpen] = useState(false)
  const [openRowMenu, setOpenRowMenu] = useState<number | null>(null)
  const [hoveredLinePoint, setHoveredLinePoint] = useState<number | null>(null)
  const [hoveredTrendPoint, setHoveredTrendPoint] = useState<number | null>(null)
  const [activeAction, setActiveAction] = useState<'listings' | 'export' | 'review'>('listings')

  const miniCalRef = useRef<HTMLDivElement>(null)
  const mainCalRef = useRef<HTMLDivElement>(null)
  const rowMenuRef = useRef<HTMLDivElement>(null)

  const linePoints = useMemo(
    () => [
      { x: 68, y: 70, label: 'Jan', value: '$32.4k' },
      { x: 138, y: 39, label: 'Feb', value: '$48.2k' },
      { x: 223, y: 74, label: 'Mar', value: '$37.8k' },
      { x: 302, y: 58, label: 'Apr', value: '$42.5k' },
    ],
    []
  )

  const trendPoints = useMemo(
    () => [
      { x: 145, y: 58, label: 'Mar', value: '$48.2k' },
      { x: 292, y: 74, label: 'Apr', value: '$37.9k' },
      { x: 444, y: 61, label: 'May', value: '$42.4k' },
    ],
    []
  )

  useEffect(() => {
    function closeOnOutside(e: MouseEvent) {
      const t = e.target as Node
      if (miniCalRef.current && !miniCalRef.current.contains(t)) setMiniCalOpen(false)
      if (mainCalRef.current && !mainCalRef.current.contains(t)) setMainCalOpen(false)
      if (rowMenuRef.current && !rowMenuRef.current.contains(t)) setOpenRowMenu(null)
    }
    document.addEventListener('mousedown', closeOnOutside)
    return () => document.removeEventListener('mousedown', closeOnOutside)
  }, [])

  return (
    <AdminLayout title="Revenue Management">
      <div className="mb-3 flex flex-wrap items-center justify-end gap-2">
        <Link to="/admin/revenue-management/reports" className="rounded-md border border-[#E5E7EB] bg-white px-4 py-2 text-[14px] font-semibold text-[#111827] hover:bg-[#F9FAFB]">
          Revenue Reports
        </Link>
        <Link to="/admin/revenue-management/details" className="rounded-md bg-[#B89F7C] px-4 py-2 text-[14px] font-semibold text-white hover:opacity-95">
          Revenue Details
        </Link>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <Link
            key={c.label}
            to={c.label === 'Monthly Revenue' ? '/admin/revenue-management/reports' : '/admin/revenue-management/details'}
            className="rounded-[10px] border border-[#E5E7EB] bg-white p-3 shadow-sm transition hover:border-[#B89F7C]/40 hover:shadow-md"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="text-[14px] font-semibold text-[#111827]">{c.label}</p>
              <span className="text-[28px] font-bold leading-none text-[#111827]">{c.value}</span>
            </div>
            <div className="mt-3 h-[3px] w-full rounded-full bg-[#ECECEC]">
              <div className="h-full rounded-full bg-[#B89F7C]" style={{ width: `${c.pct}%` }} />
            </div>
          </Link>
        ))}
      </section>

      <section className="mt-3 grid gap-3 xl:grid-cols-12">
        <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm xl:col-span-4">
          <p className="text-[28px] font-bold leading-tight text-[#111827]">$5000</p>
          <p className="text-[14px] text-[#8D88A8]">Revenue Analytics</p>
          <svg viewBox="0 0 340 90" className="mt-2 h-[90px] w-full">
            <path d="M0 58 C 30 86, 65 20, 95 38 C 125 56, 162 10, 194 44 C 225 70, 255 25, 285 38 C 312 50, 330 22, 340 60" fill="none" stroke="#B89F7C" strokeWidth="2.6" />
          </svg>
        </div>
        <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm xl:col-span-8">
          <div className="mb-3 flex items-center justify-between">
            <h2 className="text-[30px] font-bold leading-none text-[#111827]">$12,000</h2>
            <span className="text-[14px] text-[#8D88A8]">Expected Revenue Next Month:</span>
          </div>
          <svg viewBox="0 0 620 100" className="h-[90px] w-full">
            <path d="M0 62 C 45 72, 90 24, 130 48 C 170 72, 220 14, 270 56 C 330 98, 370 22, 420 44 C 470 66, 535 20, 620 54" fill="none" stroke="#B89F7C" strokeWidth="2.6" />
            <circle cx="500" cy="20" r="5" fill="#F97393" />
          </svg>
        </div>
      </section>

      <section className="mt-3 grid gap-3 xl:grid-cols-12">
        <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm xl:col-span-4">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-[32px] font-bold leading-none text-[#111827]">$142.00</h3>
            <div className="flex items-center gap-2">
              {(['Week', 'Month'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setMiniRange(r)}
                  className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold ${
                    miniRange === r ? 'bg-[#B89F7C] text-white' : 'text-[#8D88A8] hover:bg-[#F3F4F6]'
                  }`}
                >
                  {r}
                </button>
              ))}
              <div className="relative" ref={miniCalRef}>
                <button
                  type="button"
                  onClick={() => setMiniCalOpen((v) => !v)}
                  className={`rounded-lg border border-[#E5E7EB] p-2 text-[#9CA3AF] ${miniCalOpen ? 'bg-[#F9FAFB]' : 'hover:bg-[#F9FAFB]'}`}
                >
                  <Calendar className="h-4 w-4" />
                </button>
                {miniCalOpen ? (
                  <div className="absolute right-0 top-full z-40 mt-2 w-52 rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-lg">
                    <p className="text-[12px] font-semibold text-[#111827]">Quick date range</p>
                    <p className="mt-1 text-[12px] text-[#6B7280]">Apply this range for Revenue Reports.</p>
                    <button
                      type="button"
                      onClick={() => setMiniCalOpen(false)}
                      className="mt-3 w-full rounded-md bg-[#B89F7C] py-2 text-[12px] font-semibold text-white"
                    >
                      Apply
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <p className="-mt-2 text-[14px] text-[#8D88A8]">Total income</p>
          <div className="relative">
            <svg viewBox="0 0 350 130" className="h-[120px] w-full">
            <path d="M0 70 C 28 104, 62 12, 92 40 C 120 67, 170 26, 206 72 C 236 110, 270 40, 310 52 C 330 58, 344 72, 350 84" fill="none" stroke="#B89F7C" strokeWidth="2.6" />
              {linePoints.map((p, i) => (
                <circle
                  key={p.label}
                  cx={p.x}
                  cy={p.y}
                  r={hoveredLinePoint === i ? 7 : 5}
                  fill="#B89F7C"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredLinePoint(i)}
                  onMouseLeave={() => setHoveredLinePoint(null)}
                />
              ))}
            </svg>
            {hoveredLinePoint !== null ? (
              <div className="pointer-events-none absolute left-1/2 top-[50%] z-20 -translate-x-1/2 -translate-y-1/2 rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-center shadow">
                <p className="text-[12px] font-semibold text-[#111827]">{linePoints[hoveredLinePoint].label}</p>
                <p className="text-[13px] font-bold text-[#B89F7C]">{linePoints[hoveredLinePoint].value}</p>
              </div>
            ) : null}
          </div>
        </div>

        <div className="rounded-[10px] border border-[#E5E7EB] bg-white shadow-sm xl:col-span-8">
          <div className="flex items-center justify-between border-b border-[#E5E7EB] px-4 py-3">
            <h3 className="text-[28px] font-bold leading-none text-[#111827]">Recent Transactions</h3>
            <Link to="/admin/revenue-management/details" className="rounded-md bg-[#B89F7C] px-4 py-2 text-[14px] font-semibold text-white">See All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px]">
              <thead>
                <tr className="border-b border-[#E5E7EB] text-left text-[13px] font-semibold text-[#111827]">
                  {['ID', 'User', 'Type', 'Amount', 'Status', 'Actions'].map((h) => (
                    <th key={h} className="px-4 py-2.5">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {recentRows.map((row) => (
                  <tr key={row.id} className="border-b border-[#E5E7EB] text-[14px]">
                    <td className="px-4 py-3 text-[#6B7280]">{row.id}</td>
                    <td className="px-4 py-3 text-[#111827]">{row.user}</td>
                    <td className="px-4 py-3 text-[#111827]">{row.type}</td>
                    <td className="px-4 py-3 font-medium text-[#111827]">{row.amount}</td>
                    <td className="px-4 py-3">
                      <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${row.status === 'Pending' ? 'bg-[#FEF9C3] text-[#854D0E]' : 'bg-[#DCFCE7] text-[#166534]'}`}>
                        {row.status}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative inline-flex" ref={openRowMenu === Number(row.id) ? rowMenuRef : undefined}>
                        <button
                          type="button"
                          onClick={() => setOpenRowMenu((m) => (m === Number(row.id) ? null : Number(row.id)))}
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full border border-[#E5E7EB] bg-[#F9FAFB] text-[#6B7280] hover:bg-white ${openRowMenu === Number(row.id) ? 'bg-white' : ''}`}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openRowMenu === Number(row.id) ? (
                          <div className="absolute right-0 top-full z-50 mt-1 w-36 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
                            <Link to={`/admin/revenue-management/details/${row.id}`} className="flex items-center gap-2 px-3 py-2 text-[13px] text-[#374151] hover:bg-[#F9FAFB]">
                              <Eye className="h-4 w-4" /> View
                            </Link>
                            <button type="button" className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]">
                              <Pencil className="h-4 w-4" /> Edit
                            </button>
                            <button type="button" className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-[#DC2626] hover:bg-red-50">
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
      </section>

      <section className="mt-3 grid gap-3 xl:grid-cols-12">
        <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm xl:col-span-8">
          <div className="mb-2 flex items-center justify-between">
            <h3 className="text-[28px] font-bold leading-none text-[#111827]">Revenue Trend Chart</h3>
            <div className="flex items-center gap-2">
              {(['Day', 'Week', 'Month'] as const).map((r) => (
                <button
                  key={r}
                  type="button"
                  onClick={() => setMainRange(r)}
                  className={`rounded-lg px-3 py-1.5 text-[13px] font-semibold ${
                    mainRange === r ? 'bg-[#B89F7C] text-white' : 'text-[#8D88A8] hover:bg-[#F3F4F6]'
                  }`}
                >
                  {r}
                </button>
              ))}
              <div className="relative" ref={mainCalRef}>
                <button
                  type="button"
                  onClick={() => setMainCalOpen((v) => !v)}
                  className={`rounded-lg border border-[#E5E7EB] p-2 text-[#9CA3AF] ${mainCalOpen ? 'bg-[#F9FAFB]' : 'hover:bg-[#F9FAFB]'}`}
                >
                  <Calendar className="h-4 w-4" />
                </button>
                {mainCalOpen ? (
                  <div className="absolute right-0 top-full z-40 mt-2 w-52 rounded-lg border border-[#E5E7EB] bg-white p-3 shadow-lg">
                    <p className="text-[12px] font-semibold text-[#111827]">Custom chart window</p>
                    <p className="mt-1 text-[12px] text-[#6B7280]">Set a custom range for trend chart.</p>
                    <button
                      type="button"
                      onClick={() => setMainCalOpen(false)}
                      className="mt-3 w-full rounded-md bg-[#B89F7C] py-2 text-[12px] font-semibold text-white"
                    >
                      Apply
                    </button>
                  </div>
                ) : null}
              </div>
            </div>
          </div>
          <p className="text-[14px] text-[#8D88A8]">Total income</p>
          <div className="relative">
            <svg viewBox="0 0 760 170" className="h-[160px] w-full">
            <path d="M0 104 C 45 140, 88 20, 130 52 C 170 82, 230 30, 280 86 C 333 142, 390 26, 440 62 C 495 100, 550 36, 620 72 C 690 108, 732 60, 760 84" fill="none" stroke="#B89F7C" strokeWidth="2.6" />
              {trendPoints.map((p, i) => (
                <circle
                  key={p.label}
                  cx={p.x}
                  cy={p.y}
                  r={hoveredTrendPoint === i ? 7 : 5}
                  fill="#B89F7C"
                  className="cursor-pointer transition-all"
                  onMouseEnter={() => setHoveredTrendPoint(i)}
                  onMouseLeave={() => setHoveredTrendPoint(null)}
                />
              ))}
            </svg>
            {hoveredTrendPoint !== null ? (
              <div className="pointer-events-none absolute left-[56%] top-[48%] z-20 -translate-x-1/2 -translate-y-1/2 rounded-md border border-[#E5E7EB] bg-white px-3 py-2 text-center shadow">
                <p className="text-[12px] font-semibold text-[#111827]">{trendPoints[hoveredTrendPoint].label}</p>
                <p className="text-[13px] font-bold text-[#B89F7C]">{trendPoints[hoveredTrendPoint].value}</p>
              </div>
            ) : null}
          </div>
        </div>
        <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm xl:col-span-4">
          <h3 className="mb-3 text-[28px] font-bold leading-none text-[#111827]">Actions</h3>
          <div className="space-y-2">
            <Link
              to="/admin/listings-management"
              onClick={() => setActiveAction('listings')}
              className={`block w-full rounded-xl border py-3 text-center text-[20px] font-semibold transition ${activeAction === 'listings' ? 'border-[#B89F7C]/40 bg-[#FAF5EE] text-[#B89F7C]' : 'border-[#E5E7EB] bg-[#FAF9F6] text-[#111827] hover:bg-white'}`}
            >
              Listings
            </Link>
            <Link
              to="/admin/revenue-management/reports"
              onClick={() => setActiveAction('export')}
              className={`block w-full rounded-xl border py-3 text-center text-[20px] font-semibold transition ${activeAction === 'export' ? 'border-[#B89F7C]/40 bg-[#FAF5EE] text-[#B89F7C]' : 'border-[#E5E7EB] bg-[#FAF9F6] text-[#111827] hover:bg-white'}`}
            >
              Export Record
            </Link>
            <Link
              to="/admin/revenue-management/details"
              onClick={() => setActiveAction('review')}
              className={`block w-full rounded-xl border py-3 text-center text-[20px] font-semibold transition ${activeAction === 'review' ? 'border-[#B89F7C]/40 bg-[#FAF5EE] text-[#B89F7C]' : 'border-[#E5E7EB] bg-[#FAF9F6] text-[#111827] hover:bg-white'}`}
            >
              Mark as Reviewed
            </Link>
          </div>
        </div>
      </section>
    </AdminLayout>
  )
}
