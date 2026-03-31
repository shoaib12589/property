import { useRef, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Upload } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import { AdminSuccessModal } from '../components/AdminSuccessModal'

const inputClass =
  'w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-[14px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B89F7C] focus:ring-2 focus:ring-[#B89F7C]/20'

const labelClass = 'mb-1.5 block text-[13px] font-medium text-[#374151]'

function DropZone({ label }: { label: string }) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [name, setName] = useState<string | null>(null)

  return (
    <div>
      <p className={labelClass}>{label}</p>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        onDragOver={(e) => {
          e.preventDefault()
          e.stopPropagation()
        }}
        onDrop={(e) => {
          e.preventDefault()
          const f = e.dataTransfer.files[0]
          if (f) setName(f.name)
        }}
        className="flex min-h-[140px] w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#E5E7EB] bg-[#F9FAFB] px-4 py-6 text-center transition hover:border-[#B89F7C]/50 hover:bg-[#FAF8F5]"
      >
        <input
          ref={inputRef}
          type="file"
          className="hidden"
          onChange={(e) => {
            const f = e.target.files?.[0]
            setName(f?.name ?? null)
          }}
        />
        <Upload className="mb-2 h-10 w-10 text-[#9CA3AF]" strokeWidth={1.25} />
        <span className="text-[14px] font-medium text-[#374151]">Drag and Upload File</span>
        {name ? <span className="mt-2 text-[12px] text-[#B89F7C]">{name}</span> : null}
      </button>
    </div>
  )
}

export function DisputeExtended() {
  const { transactionId } = useParams<{ transactionId: string }>()
  const navigate = useNavigate()
  const [showSuccess, setShowSuccess] = useState(false)
  const slug = transactionId ?? '2455679'

  return (
    <AdminLayout title="Transactions">
      <div
        className="w-full min-w-0 rounded-[10px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-8"
        data-transaction-id={slug}
      >
        <h2 className="mb-6 text-[20px] font-bold text-[#111827]">Dispute Details</h2>

        <div className="grid gap-8 lg:grid-cols-2">
          <div className="space-y-5">
            <div>
              <label htmlFor="tx-ref" className={labelClass}>
                Transaction Reference:
              </label>
              <input id="tx-ref" className={inputClass} placeholder="Add reference" />
            </div>
            <div>
              <label htmlFor="reason-refund" className={labelClass}>
                Reason for Refund:
              </label>
              <input id="reason-refund" className={inputClass} placeholder="Type here" />
            </div>
            <div>
              <label htmlFor="service-issue" className={labelClass}>
                Service Issue Description:
              </label>
              <textarea
                id="service-issue"
                rows={4}
                placeholder="Type here"
                className={`${inputClass} min-h-[100px] resize-y`}
              />
            </div>
            <DropZone label="Upload Conversation Proof:" />
          </div>

          <div className="space-y-5">
            <div>
              <label htmlFor="prop-id" className={labelClass}>
                Property ID
              </label>
              <input id="prop-id" className={inputClass} defaultValue="#3048" />
            </div>
            <div>
              <label htmlFor="req-date" className={labelClass}>
                Requested Date:
              </label>
              <input id="req-date" type="date" className={inputClass} />
            </div>
            <DropZone label="Upload Screenshot:" />
            <DropZone label="Upload Payment Proof:" />
          </div>
        </div>

        <div className="mt-10">
          <button
            type="button"
            onClick={() => setShowSuccess(true)}
            className="rounded-lg bg-[#B89F7C] px-8 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:opacity-95"
          >
            Submit Resolution
          </button>
        </div>
      </div>

      <AdminSuccessModal
        open={showSuccess}
        title="Submitted Successfully"
        subtitle="Your Request has been submitted successfully"
        onClose={() => {
          setShowSuccess(false)
          navigate('/admin/transactions')
        }}
      />
    </AdminLayout>
  )
}
