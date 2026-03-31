import { useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { AdminLayout } from '../components/AdminLayout'
import { AdminSuccessModal } from '../components/AdminSuccessModal'

const inputReadOnly =
  'w-full rounded-lg border border-[#E5E7EB] bg-[#FAFAFA] px-3 py-2.5 text-[14px] text-[#111827] outline-none'

const labelClass = 'mb-1.5 block text-[13px] font-medium text-[#374151]'

const textareaClass =
  'w-full min-h-[140px] resize-y rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-[14px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B89F7C] focus:ring-2 focus:ring-[#B89F7C]/20'

type Resolution = 'approve' | 'reject' | 'request'

export function DisputeDetails() {
  const { transactionId } = useParams<{ transactionId: string }>()
  const navigate = useNavigate()
  const disputeSlug = transactionId ?? '2455679'
  const displayId = '#3048'

  const [adminNotes, setAdminNotes] = useState('')
  const [resolution, setResolution] = useState<Resolution>('approve')
  const [modal, setModal] = useState<null | 'approved' | 'submitted' | 'closed'>(null)

  function submit() {
    if (resolution === 'approve') setModal('approved')
    else if (resolution === 'reject') setModal('closed')
    else setModal('submitted')
  }

  return (
    <AdminLayout title="Transactions">
      <div
        className="w-full min-w-0 rounded-[10px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-8"
        data-transaction-id={disputeSlug}
      >
        <h2 className="mb-6 text-[20px] font-bold text-[#111827]">Dispute Details</h2>

        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <span className={labelClass}>Transaction ID:</span>
            <div className={inputReadOnly}>{displayId}</div>
          </div>
          <div>
            <span className={labelClass}>User:</span>
            <div className={inputReadOnly}>John Williams</div>
          </div>
          <div>
            <span className={labelClass}>Issue:</span>
            <div className={inputReadOnly}>Payment deducted but service not delivered</div>
          </div>
          <div>
            <span className={labelClass}>User Message:</span>
            <div className={inputReadOnly}>Showing request not confirmed</div>
          </div>
        </div>

        <div className="mt-6">
          <label htmlFor="admin-notes" className={labelClass}>
            Admin Notes
          </label>
          <textarea
            id="admin-notes"
            placeholder="Type Here"
            className={textareaClass}
            value={adminNotes}
            onChange={(e) => setAdminNotes(e.target.value)}
          />
        </div>

        <div className="mt-6">
          <p className={`${labelClass} mb-3`}>Resolution</p>
          <div className="flex flex-wrap gap-3">
            {(
              [
                { key: 'approve' as const, label: 'Approve Refund' },
                { key: 'reject' as const, label: 'Reject Claim' },
                { key: 'request' as const, label: 'Request More Info' },
              ] as const
            ).map(({ key, label }) => (
              <button
                key={key}
                type="button"
                onClick={() => setResolution(key)}
                className={`inline-flex items-center gap-2 rounded-xl border px-4 py-2.5 text-[13px] font-semibold transition ${
                  resolution === key
                    ? 'border-[#B89F7C] bg-[#FFFBF7] text-[#B89F7C]'
                    : 'border-[#E5E7EB] bg-white text-[#374151] hover:border-[#D1D5DB]'
                }`}
              >
                <span
                  className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 ${
                    resolution === key ? 'border-[#B89F7C] bg-[#B89F7C]' : 'border-[#D1D5DB] bg-white'
                  }`}
                >
                  {resolution === key ? <span className="h-2 w-2 rounded-full bg-white" /> : null}
                </span>
                {label}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={submit}
            className="rounded-lg bg-[#B89F7C] px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Submit Resolution
          </button>
          <Link
            to={`/admin/transactions/dispute/${disputeSlug}/extended`}
            className="rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-[14px] font-medium text-[#374151] transition hover:border-[#B89F7C]/40 hover:bg-[#FFFBF7]"
          >
            Add Additional Details
          </Link>
          <Link
            to="/admin/transactions"
            className="rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-[14px] font-medium text-[#374151] transition hover:bg-[#F9FAFB]"
          >
            Back
          </Link>
        </div>
      </div>

      <AdminSuccessModal
        open={modal === 'approved'}
        title="Approved"
        subtitle="Your Refund Has Been Approved"
        onClose={() => {
          setModal(null)
          navigate('/admin/transactions')
        }}
      />
      <AdminSuccessModal
        open={modal === 'submitted'}
        title="Submitted Successfully"
        subtitle="Your Request has been submitted successfully"
        onClose={() => {
          setModal(null)
          navigate('/admin/transactions')
        }}
      />
      <AdminSuccessModal
        open={modal === 'closed'}
        title="Closed"
        subtitle="Dispute Has Been Closed"
        onClose={() => {
          setModal(null)
          navigate('/admin/transactions')
        }}
      />
    </AdminLayout>
  )
}
