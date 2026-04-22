import { useMemo, useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Funnel } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'

const rows = [
  { id: '2455675', user: 'John Williams', type: 'Listing Plan', category: 'Listing', amount: '$300', status: 'Pending', date: '16/Mar/2026' },
  { id: '2455676', user: 'David', type: 'Showing', category: 'Service', amount: '$900', status: 'Paid', date: '12/Mar/2026' },
  { id: '2455677', user: 'Copper Johns', type: 'Donation', category: 'Charity', amount: '$450', status: 'Pending', date: '10/Mar/2026' },
  { id: '2455678', user: 'John Williams', type: 'Listing Plan', category: 'Service', amount: '$356', status: 'Paid', date: '16/Mar/2026' },
  { id: '2455679', user: 'David', type: 'Listing Plan', category: 'Charity', amount: '$128', status: 'Paid', date: '16/Mar/2026' },
  { id: '2455680', user: 'John Williams', type: 'Showing', category: 'Listing', amount: '$467', status: 'Pending', date: '16/Mar/2026' },
] as const

export function RevenueDetails() {
  const [filterOpen, setFilterOpen] = useState(false)
  const [statusFilter, setStatusFilter] = useState<'All' | 'Pending' | 'Paid'>('All')
  const filterRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function closeOnOutside(e: MouseEvent) {
      if (filterRef.current && !filterRef.current.contains(e.target as Node)) setFilterOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutside)
    return () => document.removeEventListener('mousedown', closeOnOutside)
  }, [])

  const filteredRows = useMemo(() => {
    if (statusFilter === 'All') return rows
    return rows.filter((row) => row.status === statusFilter)
  }, [statusFilter])

  return (
    <AdminLayout title="Revenue Management">
      <div className="mb-3 flex flex-wrap items-center justify-between gap-2">
        <Link to="/admin/revenue-management" className="rounded-md bg-[#B89F7C] px-4 py-2 text-[14px] font-semibold text-white hover:opacity-95">
          Back
        </Link>
        <Link to="/admin/revenue-management/reports" className="rounded-md border border-[#E5E7EB] bg-white px-4 py-2 text-[14px] font-semibold text-[#111827] hover:bg-[#F9FAFB]">
          Revenue Reports
        </Link>
      </div>

      <div className="w-full min-w-0 rounded-[10px] border border-[#E5E7EB] bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-[#E5E7EB] px-5 py-4">
          <h2 className="text-[34px] font-bold leading-none text-[#111827]">Revenue Details</h2>
          <div className="relative" ref={filterRef}>
            <button
              type="button"
              onClick={() => setFilterOpen((v) => !v)}
              className={`rounded-lg border border-[#E5E7EB] p-2 text-[#6B7280] hover:bg-[#F9FAFB] ${filterOpen ? 'bg-[#F9FAFB]' : ''}`}
            >
              <Funnel className="h-5 w-5" />
            </button>
            {filterOpen ? (
              <div className="absolute right-0 top-full z-40 mt-2 w-36 rounded-lg border border-[#E5E7EB] bg-white p-2 shadow-lg">
                {(['All', 'Pending', 'Paid'] as const).map((f) => (
                  <button
                    key={f}
                    type="button"
                    onClick={() => {
                      setStatusFilter(f)
                      setFilterOpen(false)
                    }}
                    className={`w-full rounded-md px-2 py-1.5 text-left text-[13px] ${statusFilter === f ? 'bg-[#FAF5EE] font-semibold text-[#B89F7C]' : 'text-[#374151] hover:bg-[#F9FAFB]'}`}
                  >
                    {f}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[920px]">
            <thead>
              <tr className="border-b border-[#E5E7EB] text-left text-[14px] font-semibold text-[#111827]">
                {['ID', 'User', 'Type', 'Category', 'Amount', 'Status', 'Date'].map((h) => (
                  <th key={h} className="px-5 py-3">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredRows.map((row) => (
                <tr key={row.id} className="border-b border-[#E5E7EB] text-[15px] text-[#111827]">
                  <td className="px-5 py-4 text-[#6B7280]">
                    <Link to={`/admin/revenue-management/details/${row.id}`} className="hover:text-[#B89F7C] hover:underline">{row.id}</Link>
                  </td>
                  <td className="px-5 py-4">{row.user}</td>
                  <td className="px-5 py-4">{row.type}</td>
                  <td className="px-5 py-4">{row.category}</td>
                  <td className="px-5 py-4 font-medium">{row.amount}</td>
                  <td className="px-5 py-4">
                    <span className={`inline-flex rounded-full px-3 py-1 text-[12px] font-medium ${row.status === 'Pending' ? 'bg-[#FEF9C3] text-[#854D0E]' : 'bg-[#86EFAC] text-[#14532D]'}`}>
                      {row.status}
                    </span>
                  </td>
                  <td className="px-5 py-4">{row.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  )
}
