import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'

const inputReadOnly =
  'w-full cursor-default rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-2.5 text-[14px] text-[#111827] outline-none'

const labelClass = 'mb-1.5 block text-[13px] font-medium text-[#374151]'

export function TransactionDetail() {
  const { transactionId } = useParams<{ transactionId: string }>()
  const navigate = useNavigate()
  const [timelineOpen, setTimelineOpen] = useState(false)
  const [timeline, setTimeline] = useState('Payment Initiated')
  const timelineRef = useRef<HTMLDivElement>(null)

  const txSlug = transactionId ?? '2455675'
  const displayId = '#3048'

  useEffect(() => {
    function close(e: MouseEvent) {
      if (timelineRef.current && !timelineRef.current.contains(e.target as Node)) setTimelineOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <AdminLayout title="Transactions">
      <div className="w-full min-w-0 space-y-6 rounded-[10px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-8">
        <section>
          <h2 className="mb-4 text-[18px] font-bold text-[#111827]">Transaction Details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <span className={labelClass}>Transaction ID:</span>
              <div className={inputReadOnly}>{displayId}</div>
            </div>
            <div>
              <span className={labelClass}>Type:</span>
              <div className={inputReadOnly}>Listing Plan Purchase</div>
            </div>
            <div>
              <span className={labelClass}>Status:</span>
              <div className={inputReadOnly}>Completed</div>
            </div>
            <div>
              <span className={labelClass}>Price:</span>
              <div className={inputReadOnly}>$ 450,000</div>
            </div>
            <div className="sm:col-span-2">
              <span className={labelClass}>Date:</span>
              <div className={inputReadOnly}>16 Mar 2026</div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="mb-4 text-[18px] font-bold text-[#111827]">User Details</h2>
          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <span className={labelClass}>Name:</span>
              <div className={inputReadOnly}>John Williams</div>
            </div>
            <div>
              <span className={labelClass}>Email Address:</span>
              <div className={inputReadOnly}>johnwilliams@gmail.com</div>
            </div>
            <div>
              <span className={labelClass}>Listing Plan:</span>
              <div className={inputReadOnly}>Premium</div>
            </div>
            <div>
              <span className={labelClass}>Property Details:</span>
              <div className={inputReadOnly}>3 Bed Apartment</div>
            </div>
            <div className="relative sm:col-span-2" ref={timelineRef}>
              <span className={labelClass}>Activity Timeline:</span>
              <button
                type="button"
                onClick={() => setTimelineOpen((v) => !v)}
                className="flex w-full cursor-pointer items-center justify-between rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-left text-[14px] text-[#111827] outline-none transition focus:border-[#B89F7C] focus:ring-2 focus:ring-[#B89F7C]/20"
              >
                {timeline}
                <ChevronDown className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
              </button>
              {timelineOpen ? (
                <div className="absolute left-0 right-0 top-full z-40 mt-1 rounded-lg border border-[#E5E7EB] bg-white py-2 shadow-lg">
                  {['Payment Initiated', 'Payment Confirmed', 'Service Delivered'].map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      className="w-full px-3 py-2 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                      onClick={() => {
                        setTimeline(opt)
                        setTimelineOpen(false)
                      }}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        </section>

        <div className="flex flex-wrap justify-end gap-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/admin/transactions')}
            className="rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-[14px] font-medium text-[#374151] transition hover:bg-[#F9FAFB]"
          >
            Back
          </button>
          <Link
            to={`/admin/transactions/${txSlug}/refund`}
            className="rounded-lg bg-[#B89F7C] px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Refund
          </Link>
        </div>
      </div>
    </AdminLayout>
  )
}
