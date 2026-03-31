import { useEffect, useMemo, useRef, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { ChevronDown } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import { SuccessBadgeIcon } from '../components/SuccessBadgeIcon'
import { getListingById, type ListingStatus } from '../data/listingsMock'

const STATUS_OPTIONS: ListingStatus[] = ['active', 'pending', 'expired']

function statusLabel(s: ListingStatus) {
  return s.charAt(0).toUpperCase() + s.slice(1)
}

export function PropertyDetails() {
  const { listingId } = useParams<{ listingId: string }>()
  const location = useLocation()
  const navigate = useNavigate()
  const isEdit = location.pathname.endsWith('/edit')

  const listing = useMemo(() => getListingById(listingId), [listingId])

  const [status, setStatus] = useState<ListingStatus>(listing?.status ?? 'active')
  const [propertyTitle, setPropertyTitle] = useState(listing?.title ?? 'Modern Downtown Apartment')
  const [price, setPrice] = useState('450,000')
  const [ownerName, setOwnerName] = useState(listing?.owner ?? 'John Williams')
  const [agentName, setAgentName] = useState('123 Main Street')
  const [agentPhone, setAgentPhone] = useState('+123 456 7890')
  const [statusOpen, setStatusOpen] = useState(false)
  const [showSuccess, setShowSuccess] = useState(false)
  const statusRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (listing) {
      setStatus(listing.status)
      setPropertyTitle(listing.title)
      setOwnerName(listing.owner)
    }
  }, [listing])

  useEffect(() => {
    function close(e: MouseEvent) {
      if (statusRef.current && !statusRef.current.contains(e.target as Node)) setStatusOpen(false)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  useEffect(() => {
    if (!showSuccess) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') setShowSuccess(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [showSuccess])

  const inputClass =
    'w-full rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-[14px] text-[#111827] outline-none transition placeholder:text-[#9CA3AF] focus:border-[#B89F7C] focus:ring-2 focus:ring-[#B89F7C]/20'

  const labelClass = 'mb-1.5 block text-[13px] font-medium text-[#374151]'

  function handleSave() {
    setShowSuccess(true)
  }

  return (
    <AdminLayout title="Property Details">
      <div className="w-full min-w-0 rounded-[10px] border border-[#E5E7EB] bg-white p-5 shadow-sm sm:p-8">
        {isEdit ? <h2 className="mb-6 text-[18px] font-bold text-[#111827]">Edit Property</h2> : null}

        <div className="mb-6">
          <div className="relative inline-block" ref={statusRef}>
            <button
              type="button"
              onClick={() => setStatusOpen((v) => !v)}
              className={`inline-flex min-w-[180px] items-center justify-between gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 py-2.5 text-[14px] font-medium text-[#111827] transition hover:border-[#D1D5DB] ${
                statusOpen ? 'border-[#B89F7C]/50 ring-2 ring-[#B89F7C]/20' : ''
              }`}
            >
              <span>
                Status: <span className="font-semibold">{statusLabel(status)}</span>
              </span>
              <ChevronDown className="h-4 w-4 shrink-0 text-[#9CA3AF]" />
            </button>
            {statusOpen ? (
              <div className="absolute left-0 top-full z-40 mt-2 w-full min-w-[200px] rounded-lg border border-[#E5E7EB] bg-white py-2 shadow-lg">
                {STATUS_OPTIONS.map((s) => (
                  <button
                    key={s}
                    type="button"
                    className={`w-full px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB] ${
                      status === s ? 'font-semibold text-[#B89F7C]' : 'text-[#374151]'
                    }`}
                    onClick={() => {
                      setStatus(s)
                      setStatusOpen(false)
                    }}
                  >
                    {statusLabel(s)}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>

        <div className="space-y-5">
          <div>
            <label htmlFor="property-title" className={labelClass}>
              Property Title
            </label>
            <input
              id="property-title"
              className={inputClass}
              value={propertyTitle}
              onChange={(e) => setPropertyTitle(e.target.value)}
            />
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
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
              <label htmlFor="owner" className={labelClass}>
                Owner Name
              </label>
              <input id="owner" className={inputClass} value={ownerName} onChange={(e) => setOwnerName(e.target.value)} />
            </div>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="agent-name" className={labelClass}>
                Agent/Broker Name
              </label>
              <input
                id="agent-name"
                className={inputClass}
                value={agentName}
                onChange={(e) => setAgentName(e.target.value)}
              />
            </div>
            <div>
              <label htmlFor="agent-phone" className={labelClass}>
                Agent/Broker Phone
              </label>
              <input
                id="agent-phone"
                className={inputClass}
                value={agentPhone}
                onChange={(e) => setAgentPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="mt-8 flex justify-end gap-3">
          {!isEdit ? (
            <>
              <Link
                to="/admin/listings-management"
                className="rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-[14px] font-medium text-[#374151] transition hover:bg-[#F9FAFB]"
              >
                Back
              </Link>
              <Link
                to={`/admin/listings-management/property/${listingId}/edit`}
                className="rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-[14px] font-medium text-[#374151] transition hover:border-[#B89F7C]/40 hover:bg-[#FFFBF7]"
              >
                Edit
              </Link>
              <button
                type="button"
                onClick={() => navigate('/admin/listings-management')}
                className="rounded-lg bg-[#B89F7C] px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:opacity-95"
              >
                Close Listing
              </button>
            </>
          ) : (
            <>
              <button
                type="button"
                onClick={() => navigate(`/admin/listings-management/property/${listingId}`)}
                className="rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-[14px] font-medium text-[#374151] transition hover:bg-[#F9FAFB]"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="rounded-lg bg-[#B89F7C] px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:opacity-95"
              >
                Save Details
              </button>
            </>
          )}
        </div>
      </div>

      {showSuccess ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/25 px-4 backdrop-blur-[8px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-title"
          onClick={() => setShowSuccess(false)}
        >
          <div
            className="w-full max-w-[380px] rounded-2xl bg-[#B89F7C] px-8 py-10 text-center text-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-5 flex justify-center text-white">
              <SuccessBadgeIcon className="h-[65px] w-[65px] shrink-0" />
            </div>
            <p id="success-title" className="text-[22px] font-bold tracking-tight">
              Successfully
            </p>
            <p className="mt-2 text-[15px] font-normal text-white/95">Details Saved Successfully</p>
            <button
              type="button"
              className="mt-8 w-full rounded-lg bg-white py-2.5 text-[14px] font-semibold text-[#B89F7C] transition hover:bg-white/95"
              onClick={() => setShowSuccess(false)}
            >
              OK
            </button>
          </div>
        </div>
      ) : null}
    </AdminLayout>
  )
}
