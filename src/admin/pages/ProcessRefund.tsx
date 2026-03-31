import { useEffect, useRef, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminLayout } from '../components/AdminLayout'
import { AdminSuccessModal } from '../components/AdminSuccessModal'

const inputClass =
  'w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-[14px] text-[#111827] outline-none transition focus:border-[#B89F7C] focus:ring-2 focus:ring-[#B89F7C]/20'

const labelClass = 'mb-1.5 block text-[13px] font-medium text-[#374151]'

export function ProcessRefund() {
  const { transactionId } = useParams<{ transactionId: string }>()
  const navigate = useNavigate()
  const txSlug = transactionId ?? '2455675'
  const displayId = '#3048'

  const [refundType, setRefundType] = useState<'full' | 'partial'>('full')
  const [partialAmount, setPartialAmount] = useState('350.00')
  const [price, setPrice] = useState('50.00')
  const [reason, setReason] = useState('')
  const [notifyUser, setNotifyUser] = useState<'yes' | 'no'>('yes')
  const [showSuccess, setShowSuccess] = useState(false)

  const reasonRef = useRef<HTMLTextAreaElement>(null)

  useEffect(() => {
    if (showSuccess) reasonRef.current?.blur()
  }, [showSuccess])

  return (
    <AdminLayout title="Transactions">
      <div className="w-full min-w-0 rounded-[10px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-8">
        <h2 className="mb-6 text-[20px] font-bold text-[#111827]">Process Refund</h2>

        <div className="space-y-6">
          <div className="max-w-xl">
            <label htmlFor="tx-id" className={labelClass}>
              Transaction ID:
            </label>
            <input id="tx-id" readOnly className={`${inputClass} bg-[#FAFAFA]`} value={displayId} />
          </div>

          <div className="max-w-xl">
            <label htmlFor="price" className={labelClass}>
              Price
            </label>
            <div className="relative">
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-medium text-[#6B7280]">
                $
              </span>
                <input
                  id="price"
                  className={`${inputClass} pl-8`}
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                />
            </div>
          </div>

          <div>
            <p className={`${labelClass}`}>Refund Type:</p>
            <div className="rounded-xl border border-[#E5E7EB] bg-[#FAF8F5] p-4 sm:inline-flex sm:flex-wrap sm:gap-6">
              {(['full', 'partial'] as const).map((k) => (
                <label
                  key={k}
                  className="flex cursor-pointer items-center gap-2 py-2 sm:py-0"
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      refundType === k ? 'border-[#B89F7C] bg-[#B89F7C]' : 'border-[#D1D5DB] bg-white'
                    }`}
                  >
                    {refundType === k ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
                  </span>
                  <input
                    type="radio"
                    name="refundType"
                    className="sr-only"
                    checked={refundType === k}
                    onChange={() => setRefundType(k)}
                  />
                  <span className="text-[14px] font-medium text-[#111827]">
                    {k === 'full' ? 'Full Refund' : 'Partial Refund'}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {refundType === 'partial' ? (
            <div className="max-w-xl">
              <label htmlFor="partial" className={labelClass}>
                If Partial:
              </label>
              <div className="relative">
                <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[14px] font-medium text-[#6B7280]">
                  $
                </span>
                <input
                  id="partial"
                  className={`${inputClass} pl-8`}
                  value={partialAmount}
                  onChange={(e) => setPartialAmount(e.target.value)}
                />
              </div>
            </div>
          ) : null}

          <div>
            <label htmlFor="reason" className={labelClass}>
              Reason:
            </label>
            <textarea
              ref={reasonRef}
              id="reason"
              rows={4}
              placeholder="Describe your reason..."
              className={`${inputClass} min-h-[120px] resize-y`}
              value={reason}
              onChange={(e) => setReason(e.target.value)}
            />
          </div>

          <div>
            <p className={labelClass}>Notify User:</p>
            <div className="flex flex-wrap gap-4">
              {(['yes', 'no'] as const).map((k) => (
                <label key={k} className="flex cursor-pointer items-center gap-2">
                  <span
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                      notifyUser === k ? 'border-[#B89F7C] bg-[#B89F7C]' : 'border-[#D1D5DB] bg-white'
                    }`}
                  >
                    {notifyUser === k ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
                  </span>
                  <input
                    type="radio"
                    name="notify"
                    className="sr-only"
                    checked={notifyUser === k}
                    onChange={() => setNotifyUser(k)}
                  />
                  <span className="text-[14px] font-medium capitalize text-[#111827]">{k}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-end gap-3">
          <Link
            to={`/admin/transactions/${txSlug}`}
            className="rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-[14px] font-medium text-[#374151] transition hover:bg-[#F9FAFB]"
          >
            Cancel
          </Link>
          <button
            type="button"
            onClick={() => setShowSuccess(true)}
            className="rounded-lg bg-[#B89F7C] px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Confirm Refund
          </button>
        </div>
      </div>

      <AdminSuccessModal
        open={showSuccess}
        title="Successfully"
        subtitle="Your amount has been refunded"
        onClose={() => {
          setShowSuccess(false)
          navigate('/admin/transactions')
        }}
      />
    </AdminLayout>
  )
}
