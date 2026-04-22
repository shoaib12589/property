import { useEffect } from 'react'
import { SuccessBadgeIcon } from './SuccessBadgeIcon'

type AdminSuccessModalProps = {
  open: boolean
  title: string
  subtitle: string
  onClose: () => void
  /** @default OK */
  buttonLabel?: string
  /** Hide footer action button for auto-dismiss usage */
  hideButton?: boolean
  /** Optional auto close timeout in milliseconds */
  autoCloseMs?: number
  /** Wider card + larger title (CMS / System Management Figma) */
  variant?: 'default' | 'prominent'
}

export function AdminSuccessModal({
  open,
  title,
  subtitle,
  onClose,
  buttonLabel = 'OK',
  hideButton = false,
  autoCloseMs,
  variant = 'default',
}: AdminSuccessModalProps) {
  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  useEffect(() => {
    if (!open || !autoCloseMs) return
    const id = window.setTimeout(onClose, autoCloseMs)
    return () => window.clearTimeout(id)
  }, [open, autoCloseMs, onClose])

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
        className={`rounded-2xl bg-[#B89F7C] text-center text-white shadow-2xl ${
          variant === 'prominent' ? 'w-full max-w-[440px] px-10 py-11' : 'w-full max-w-[380px] px-8 py-10'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={`mx-auto flex justify-center text-white ${variant === 'prominent' ? 'mb-6' : 'mb-5'}`}>
          <SuccessBadgeIcon className={`shrink-0 text-white ${variant === 'prominent' ? 'h-[72px] w-[72px]' : 'h-[65px] w-[65px]'}`} />
        </div>
        <p
          id="admin-success-title"
          className={variant === 'prominent' ? 'text-[26px] font-bold leading-tight tracking-tight' : 'text-[22px] font-bold tracking-tight'}
        >
          {title}
        </p>
        <p className={`font-normal text-white/95 ${variant === 'prominent' ? 'mt-3 text-[16px] leading-snug' : 'mt-2 text-[15px]'}`}>{subtitle}</p>
        {!hideButton ? (
          <button
            type="button"
            className="mt-8 w-full rounded-lg bg-white py-2.5 text-[14px] font-semibold text-[#B89F7C] transition hover:bg-white/95"
            onClick={onClose}
          >
            {buttonLabel}
          </button>
        ) : null}
      </div>
    </div>
  )
}
