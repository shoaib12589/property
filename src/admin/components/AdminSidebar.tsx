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
  PieChart,
  MessageCircle,
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
  { label: 'Partnerships & Donations', slug: 'partnerships-donations', icon: HeartHandshake },
  { label: 'Charts & Insights', slug: 'charts-insights', icon: PieChart },
  { label: 'Messages', slug: 'messages', icon: MessageCircle },
  { label: 'Registration & Enrollment', slug: 'registration-enrollment', icon: UserPlus },
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
        <div className="font-inter fixed inset-0 z-[60] flex items-center justify-center bg-black/10 px-4 backdrop-blur-[8px]">
          <div className="w-full max-w-[320px] rounded-xl bg-white px-6 py-6 shadow-lg">
            <p className="mb-4 text-center text-[14px] font-normal leading-relaxed text-[#6B7280]">
              Are you sure you want to logout?
            </p>
            <div className="flex justify-center gap-2">
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
                className="h-9 min-w-[70px] rounded-md bg-[#B89F7C] px-4 text-[14px] font-semibold text-white"
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
