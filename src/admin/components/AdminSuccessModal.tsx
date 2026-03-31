import { useEffect } from 'react'
import { SuccessBadgeIcon } from './SuccessBadgeIcon'

type AdminSuccessModalProps = {
  open: boolean
  title: string
  subtitle: string
  onClose: () => void
  /** @default OK */
  buttonLabel?: string
}

export function AdminSuccessModal({ open, title, subtitle, onClose, buttonLabel = 'OK' }: AdminSuccessModalProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/25 px-4 backdrop-blur-[8px]"
      role="dialog"
      aria-modal="true"
      aria-labelledby="admin-success-title"
      onClick={onClose}
    >
      <div
        className="w-full max-w-[380px] rounded-2xl bg-[#B89F7C] px-8 py-10 text-center text-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mx-auto mb-5 flex justify-center text-white">
          <SuccessBadgeIcon className="h-[65px] w-[65px] shrink-0" />
        </div>
        <p id="admin-success-title" className="text-[22px] font-bold tracking-tight">
          {title}
        </p>
        <p className="mt-2 text-[15px] font-normal text-white/95">{subtitle}</p>
        <button
          type="button"
          className="mt-8 w-full rounded-lg bg-white py-2.5 text-[14px] font-semibold text-[#B89F7C] transition hover:bg-white/95"
          onClick={onClose}
        >
          {buttonLabel}
        </button>
      </div>
    </div>
  )
}
