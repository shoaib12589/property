import { LogOut } from 'lucide-react'

const styles = {
  overlay: 'fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm',
  modal: 'rounded-2xl w-full max-w-md text-center shadow-xl',
  modalBg: '#F5EFE3',
  iconCircleBg: '#D4C9BF',
  title: 'text-xl font-bold text-gray-900 mt-4',
  message: 'text-base font-normal text-gray-800 mt-2',
  cancelBtn: 'rounded-xl border-2 border-gray-800 bg-transparent px-6 py-2.5 font-bold text-gray-900 hover:bg-gray-100',
  confirmBtn: 'rounded-xl bg-[#EF645B] px-6 py-2.5 font-bold text-white hover:opacity-95',
}

interface LogoutModalProps {
  open: boolean
  onClose: () => void
  onConfirm: () => void
}

export function LogoutModal({ open, onClose, onConfirm }: LogoutModalProps) {
  if (!open) return null

  return (
    <div
      className={styles.overlay}
      style={{ fontFamily: "'Gilroy', sans-serif" }}
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="logout-title"
    >
      <div
        className={styles.modal}
        style={{ backgroundColor: styles.modalBg }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="px-8 pt-8 pb-6">
          <div
            className="w-14 h-14 rounded-full flex items-center justify-center mx-auto"
            style={{ backgroundColor: styles.iconCircleBg }}
          >
            <LogOut className="w-7 h-7 text-white" strokeWidth={2.5} />
          </div>
          <h2 id="logout-title" className={styles.title}>
            Logout
          </h2>
          <p className={styles.message}>
            Are you sure you want to log out?
          </p>
          <div className="flex items-center justify-center gap-3 mt-8">
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={onConfirm}
              className={styles.confirmBtn}
            >
              Yes Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
