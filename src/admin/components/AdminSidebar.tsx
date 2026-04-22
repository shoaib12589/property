import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  List,
  ArrowLeftRight,
  Wallet,
  BarChart3,
  FileText,
  Server,
  HeartHandshake,
  MessageCircle,
  Users,
  UserPlus,
  Settings,
  LogOut,
} from 'lucide-react'
import logo from '../assets/login-logo.png'

export const ADMIN_NAV_SLUGS = [
  { label: 'Dashboard', slug: 'dashboard', icon: LayoutDashboard },
  { label: 'Listings Management', slug: 'listings-management', icon: List },
  { label: 'Transactions', slug: 'transactions', icon: ArrowLeftRight },
  { label: 'Revenue Management', slug: 'revenue-management', icon: Wallet },
  { label: 'Reports & Analytics', slug: 'reports-analytics', icon: BarChart3 },
  { label: 'Content Management (CMS)', slug: 'content-management', icon: FileText },
  { label: 'System Management', slug: 'system-management', icon: Server },
  { label: 'User Management', slug: 'user-management', icon: Users },
  { label: 'Partners & Donations', slug: 'partnerships-donations', icon: HeartHandshake },
  { label: 'Registration & Enrollment', slug: 'registration-enrollment', icon: UserPlus },
  { label: 'Messages', slug: 'messages', icon: MessageCircle },
  { label: 'Settings', slug: 'settings', icon: Settings },
] as const

type AdminSidebarProps = {
  open: boolean
  onClose: () => void
  activeLabel?: string
}

export function AdminSidebar({ open, onClose, activeLabel = 'Dashboard' }: AdminSidebarProps) {
  const navigate = useNavigate()
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  return (
    <>
      <div
        className={`fixed inset-0 z-30 bg-black/40 transition-opacity lg:hidden ${open ? 'opacity-100' : 'pointer-events-none opacity-0'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`font-inter fixed left-0 top-0 z-40 h-full w-64 transform border-r bg-white shadow-lg transition-transform duration-200 ease-out lg:translate-x-0 lg:shadow-none ${
          open ? 'translate-x-0' : '-translate-x-full'
        }`}
        style={{ borderColor: '#E5E7EB' }}
      >
        <div className="border-b p-3" style={{ borderColor: '#E5E7EB' }}>
          <div className="flex h-11 w-11 items-center justify-center overflow-hidden rounded-lg border-2 bg-white p-0.5" style={{ borderColor: '#B89F7C' }}>
            <img src={logo} alt="Logo" className="h-full w-full object-contain" />
          </div>
        </div>

        <nav className="h-[calc(100%-64px)] space-y-1 overflow-y-auto p-3 pb-[max(0.75rem,env(safe-area-inset-bottom,0px))]">
          {ADMIN_NAV_SLUGS.map((item) => {
            const Icon = item.icon
            const isActive = item.label === activeLabel
            return (
              <Link
                key={item.slug}
                to={`/admin/${item.slug}`}
                onClick={onClose}
                className={`flex items-center gap-3 rounded-[10px] px-3 py-2.5 text-[14px] leading-snug ${
                  isActive
                    ? 'bg-[#F3F4F6] font-bold text-[#B89F7C]'
                    : 'font-normal text-[#374151] hover:bg-gray-100'
                }`}
              >
                <Icon className="h-4 w-4 shrink-0" strokeWidth={isActive ? 2 : 1.6} />
                <span>{item.label}</span>
              </Link>
            )
          })}

          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="mt-2 flex w-full items-center gap-3 rounded-[10px] px-3 py-2.5 text-left text-[14px] font-normal text-[#D32F2F] hover:bg-red-50"
          >
            <LogOut className="h-4 w-4 shrink-0" strokeWidth={1.6} />
            Logout
          </button>
        </nav>
      </aside>

      {showLogoutConfirm ? (
        <div
          className="font-inter fixed inset-0 z-[100] flex items-center justify-center bg-black/20 px-4 backdrop-blur-[10px]"
          onClick={() => setShowLogoutConfirm(false)}
          role="presentation"
        >
          <div
            className="w-full max-w-[320px] rounded-xl bg-white px-6 py-7 shadow-xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="admin-logout-title"
          >
            <div className="mx-auto mb-3 flex h-[70px] w-[70px] items-center justify-center">
              <svg width="70" height="70" viewBox="0 0 115 113" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                <path
                  d="M109.999 46.2318L105.498 41.7922C101.831 38.1762 99.767 33.2415 99.767 28.0919C99.767 20.3571 93.3832 14.0606 85.5389 14.0606C80.3082 14.0606 75.2877 12.002 71.5626 8.33L67.1436 3.97397C61.7635 -1.32466 52.3922 -1.32466 47.0168 3.97397L42.5979 8.33001C38.8728 12.002 33.8523 14.0606 28.6216 14.0606C20.7726 14.0606 14.3934 20.3524 14.3934 28.0919C14.3934 33.2414 12.3288 38.1758 8.66152 41.7909L4.15641 46.2318C-1.38547 51.7038 -1.38547 60.6005 4.15641 66.0724L8.65807 70.5121C12.3246 74.128 14.3887 79.0628 14.3887 84.2124C14.3887 91.9472 20.7726 98.2437 28.6168 98.2437C33.8475 98.2437 38.8681 100.302 42.5931 103.974L47.0121 108.33C49.6998 110.977 53.277 112.439 57.0779 112.439C60.8787 112.439 64.4512 110.977 67.1389 108.33L71.5578 103.974C75.2829 100.302 80.3035 98.2437 85.5341 98.2437C93.3832 98.2437 99.7623 91.9519 99.7623 84.2124C99.7623 79.0629 101.827 74.1284 105.494 70.5134L109.999 66.0724C115.541 60.6005 115.541 51.7038 109.999 46.2318Z"
                  fill="#F9D4D6"
                />
                <path
                  d="M54.1332 70.4413C54.1085 69.5399 54.0962 68.8638 54.0962 68.4131C54.0962 65.759 54.4662 63.4679 55.2061 61.5399C55.7488 60.0876 56.6244 58.6228 57.833 57.1455C58.7209 56.0689 60.3118 54.5039 62.6057 52.4507C64.9242 50.3725 66.4288 48.7199 67.1194 47.493C67.8101 46.266 68.1554 44.9264 68.1554 43.4742C68.1554 40.8451 67.1441 38.5415 65.1216 36.5634C63.099 34.5603 60.6202 33.5587 57.685 33.5587C54.8485 33.5587 52.4806 34.4601 50.5814 36.2629C48.6822 38.0657 47.4366 40.8826 46.8446 44.7136L40 43.8873C40.6166 38.7543 42.4419 34.8232 45.4757 32.0939C48.5342 29.3646 52.5669 28 57.574 28C62.877 28 67.1071 29.4648 70.2643 32.3944C73.4214 35.3239 75 38.867 75 43.0235C75 45.4272 74.445 47.6432 73.3351 49.6714C72.2252 51.6995 70.0546 54.1659 66.8235 57.0704C64.6529 59.0235 63.2347 60.4632 62.5687 61.3897C61.9027 62.3161 61.4094 63.3803 61.0888 64.5822C60.7681 65.784 60.5832 67.7371 60.5338 70.4413H54.1332ZM53.7262 84V76.3005H61.3108V84H53.7262Z"
                  fill="#FF2424"
                />
              </svg>
            </div>

            <h3 id="admin-logout-title" className="mb-2 text-center text-[24px] font-bold leading-tight text-[#111827]">
              Are You Sure?
            </h3>
            <p className="mb-6 text-center text-[15px] text-[#4B5563]">Are you sure want to Logout?</p>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="h-9 min-w-[70px] rounded-md border border-[#D1D5DB] bg-white px-4 text-[14px] font-medium text-[#111827]"
              >
                No
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false)
                  onClose()
                  navigate('/admin/login')
                }}
                className="h-9 min-w-[70px] rounded-md px-4 text-[14px] font-semibold text-white"
                style={{ backgroundColor: '#A89677' }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  )
}
