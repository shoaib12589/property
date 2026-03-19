import type { ReactNode } from 'react'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  BellRing,
  Calendar,
  ClipboardList,
  Home,
  LayoutDashboard,
  LogOut,
  MessageCircle,
  Settings,
  User,
} from 'lucide-react'
import logo from '@/assets/logo.png'

const tokens = {
  cardBorder: '#E5E7EB',
}

type SidebarProps = {
  open: boolean
  onClose: () => void
  activeLabel?: string
  children?: ReactNode
}

const SIDEBAR_ITEMS = [
  { label: 'Dashboard', path: '/agent/dashboard', icon: LayoutDashboard },
  { label: 'Manage Profile', path: '/agent/manage-profile', icon: User },
  { label: 'Manage Listings', path: '/agent/manage-listings', icon: Home },
  { label: 'Manage Listing Requests', path: '/agent/manage-listings-request', icon: ClipboardList },
  { label: 'Manage Calendars', path: '/agent/dashboard', icon: Calendar },
  { label: 'Messages', path: '/agent/messages', icon: MessageCircle },
  { label: 'Alerts', path: '/agent/alerts', icon: BellRing },
  { label: 'Settings', path: '/agent/settings', icon: Settings },
]

export function AgentSidebar({ open, onClose, activeLabel }: SidebarProps) {
  const navigate = useNavigate()
  const effectiveActiveLabel = activeLabel ?? 'Dashboard'
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false)

  return (
    <>
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity ${
          open ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
        aria-hidden="true"
      />

      <aside
        className={`fixed top-0 left-0 z-40 h-full w-64 bg-white border-r shadow-lg lg:shadow-none transform transition-transform duration-200 ease-out ${
          open ? 'translate-x-0' : '-translate-x-full'
        } lg:translate-x-0`}
        style={{ borderColor: tokens.cardBorder }}
      >
        <div
          className="p-4 flex items-center gap-3 border-b"
          style={{ borderColor: tokens.cardBorder }}
        >
          <img src={logo} alt="Logo" className="w-12 h-12 object-contain" />
        </div>

        <nav className="p-3 space-y-0.5 overflow-y-auto h-[calc(100%-64px)]">
          {SIDEBAR_ITEMS.map((item) => {
            const isActive = item.label === effectiveActiveLabel
            const Icon = item.icon
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  item.label === effectiveActiveLabel ? 'font-semibold' : 'font-medium'
                } ${item.label === effectiveActiveLabel ? 'bg-white' : ''} ${
                  isActive
                    ? 'bg-[#F3F4F6] text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                <Icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                {item.label}
              </Link>
            )
          })}

          <button
            type="button"
            onClick={() => setShowLogoutConfirm(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold mt-2 w-full text-left"
            style={{ color: '#DC2626' }}
          >
            <LogOut className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            Logout
          </button>
        </nav>
      </aside>

      {showLogoutConfirm ? (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/10 backdrop-blur-[8px] px-4">
          <div className="w-full max-w-[320px] bg-white shadow-lg px-6 py-6 rounded-xl">
            <div className="mx-auto mb-3 w-[70px] h-[70px] flex items-center justify-center">
              <svg width="70" height="70" viewBox="0 0 115 113" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M109.999 46.2318L105.498 41.7922C101.831 38.1762 99.767 33.2415 99.767 28.0919C99.767 20.3571 93.3832 14.0606 85.5389 14.0606C80.3082 14.0606 75.2877 12.002 71.5626 8.33L67.1436 3.97397C61.7635 -1.32466 52.3922 -1.32466 47.0168 3.97397L42.5979 8.33001C38.8728 12.002 33.8523 14.0606 28.6216 14.0606C20.7726 14.0606 14.3934 20.3524 14.3934 28.0919C14.3934 33.2414 12.3288 38.1758 8.66152 41.7909L4.15641 46.2318C-1.38547 51.7038 -1.38547 60.6005 4.15641 66.0724L8.65807 70.5121C12.3246 74.128 14.3887 79.0628 14.3887 84.2124C14.3887 91.9472 20.7726 98.2437 28.6168 98.2437C33.8475 98.2437 38.8681 100.302 42.5931 103.974L47.0121 108.33C49.6998 110.977 53.277 112.439 57.0779 112.439C60.8787 112.439 64.4512 110.977 67.1389 108.33L71.5578 103.974C75.2829 100.302 80.3035 98.2437 85.5341 98.2437C93.3832 98.2437 99.7623 91.9519 99.7623 84.2124C99.7623 79.0629 101.827 74.1284 105.494 70.5134L109.999 66.0724C115.541 60.6005 115.541 51.7038 109.999 46.2318Z" fill="#F9D4D6"/>
                <path d="M54.1332 70.4413C54.1085 69.5399 54.0962 68.8638 54.0962 68.4131C54.0962 65.759 54.4662 63.4679 55.2061 61.5399C55.7488 60.0876 56.6244 58.6228 57.833 57.1455C58.7209 56.0689 60.3118 54.5039 62.6057 52.4507C64.9242 50.3725 66.4288 48.7199 67.1194 47.493C67.8101 46.266 68.1554 44.9264 68.1554 43.4742C68.1554 40.8451 67.1441 38.5415 65.1216 36.5634C63.099 34.5603 60.6202 33.5587 57.685 33.5587C54.8485 33.5587 52.4806 34.4601 50.5814 36.2629C48.6822 38.0657 47.4366 40.8826 46.8446 44.7136L40 43.8873C40.6166 38.7543 42.4419 34.8232 45.4757 32.0939C48.5342 29.3646 52.5669 28 57.574 28C62.877 28 67.1071 29.4648 70.2643 32.3944C73.4214 35.3239 75 38.867 75 43.0235C75 45.4272 74.445 47.6432 73.3351 49.6714C72.2252 51.6995 70.0546 54.1659 66.8235 57.0704C64.6529 59.0235 63.2347 60.4632 62.5687 61.3897C61.9027 62.3161 61.4094 63.3803 61.0888 64.5822C60.7681 65.784 60.5832 67.7371 60.5338 70.4413H54.1332ZM53.7262 84V76.3005H61.3108V84H53.7262Z" fill="#FF2424"/>
              </svg>
            </div>

            <h3 className="text-center text-[24px] leading-tight font-bold text-[#111827] mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>
              Are You Sure?
            </h3>
            <p className="text-center text-[15px] text-[#4B5563] mb-5" style={{ fontFamily: 'Arial, sans-serif' }}>
              Are you sure want to Logout?
            </p>

            <div className="flex items-center justify-center gap-2">
              <button
                type="button"
                onClick={() => setShowLogoutConfirm(false)}
                className="h-8 min-w-[70px] px-4 border border-[#D1D5DB] bg-white text-[#111827] text-[14px]"
                style={{ fontFamily: 'Arial, sans-serif' }}
              >
                No
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowLogoutConfirm(false)
                  onClose()
                  navigate('/agent/login')
                }}
                className="h-8 min-w-[70px] px-4 text-white text-[14px]"
                style={{ fontFamily: 'Arial, sans-serif', backgroundColor: '#A49776' }}
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

