import { Link, useParams } from 'react-router-dom'
import { AdminLayout } from '../components/AdminLayout'

const inputClass =
  'w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-[14px] text-[#111827] outline-none'

const labelClass = 'mb-1.5 block text-[13px] font-medium text-[#374151]'

export function RevenueDetailRecord() {
  const { revenueId } = useParams<{ revenueId: string }>()

  return (
    <AdminLayout title="Revenue Management">
      <div className="w-full min-w-0 rounded-[10px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-8">
        <div className="mb-4">
          <Link to="/admin/revenue-management/details" className="inline-flex rounded-md bg-[#B89F7C] px-6 py-2.5 text-[15px] font-semibold text-white">
            Back
          </Link>
        </div>
        <h2 className="mb-6 text-[34px] font-bold leading-none text-[#111827]">Revenue Details</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Transaction ID:</label>
            <div className={inputClass}>#{revenueId?.slice(-4) ?? '3048'}</div>
          </div>
          <div>
            <label className={labelClass}>User:</label>
            <div className={inputClass}>Modern Downtown Apartment</div>
          </div>
          <div>
            <label className={labelClass}>Amount:</label>
            <div className={inputClass}>$ 5500</div>
          </div>
          <div>
            <label className={labelClass}>Type:</label>
            <div className={inputClass}>Listing Plan Purchase</div>
          </div>
          <div>
            <label className={labelClass}>Date:</label>
            <div className={inputClass}>16/Mar/2026</div>
          </div>
          <div>
            <label className={labelClass}>Status:</label>
            <div className={inputClass}>Completed</div>
          </div>
        </div>

        <h3 className="mb-4 mt-7 text-[34px] font-bold leading-none text-[#111827]">Payment Info:</h3>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className={inputClass}>Visa Credit Card</div>
          <div className={inputClass}>Stripe</div>
        </div>
      </div>
    </AdminLayout>
  )
}
