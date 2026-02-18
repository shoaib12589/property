import { useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  User,
  CreditCard,
  Home,
  ClipboardList,
  Calendar,
  Search,
  Heart,
  Bell,
  MessageCircle,
  FileStack,
  HelpCircle,
  LogOut,
  X,
} from 'lucide-react'
import logo from '@/assets/logo.png'
import { LogoutModal } from '@customer/components/LogoutModal'

const tokens = {
  border: '#E5E7EB',
  activeBg: '#FEF3C7',
  activeColor: '#92400E',
  danger: '#DC2626',
}

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', path: '/user/dashboard' },
  { icon: User, label: 'My Profile', path: '/user/profile' },
  { icon: CreditCard, label: 'Payment Methods', path: '/user/payment-methods' },
  { icon: Home, label: 'My Listings', path: '/user/listings' },
  { icon: ClipboardList, label: 'Orders History', path: '/user/orders' },
  { icon: Calendar, label: 'Showings', path: '/user/showings' },
  { icon: Search, label: 'Saved Searches', path: '/user/saved-searches' },
  { icon: Heart, label: 'Favorite Properties', path: '/user/favorites' },
  { icon: Bell, label: 'Alerts', path: '/user/alerts' },
  { icon: MessageCircle, label: 'Messages', path: '/user/messages' },
  { icon: FileStack, label: 'Documents', path: '/user/documents' },
  { icon: HelpCircle, label: 'Support', path: '/user/support' },
]

/** Use this class on the main content wrapper so it doesn't sit under the fixed sidebar on desktop */
export const CUSTOMER_SIDEBAR_OFFSET = 'lg:ml-64'

export const CUSTOMER_SIDEBAR_WIDTH = 'w-64'

interface CustomerSidebarProps {
  open: boolean
  onClose: () => void
}

export function CustomerSidebar({ open, onClose }: CustomerSidebarProps) {
  const location = useLocation()
  const navigate = useNavigate()
  const [logoutModalOpen, setLogoutModalOpen] = useState(false)

  const handleLogoutConfirm = () => {
    setLogoutModalOpen(false)
    onClose()
    navigate('/user/login')
  }

  return (
    <>
      <LogoutModal
        open={logoutModalOpen}
        onClose={() => setLogoutModalOpen(false)}
        onConfirm={handleLogoutConfirm}
      />
      {/* Overlay (mobile) */}
      <div
        className={`fixed inset-0 bg-black/50 z-30 lg:hidden transition-opacity ${open ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar - fixed, never scrolls with page */}
      <aside
        className={`fixed top-0 left-0 z-40 h-full ${CUSTOMER_SIDEBAR_WIDTH} bg-white border-r flex flex-col shadow-lg transform transition-transform duration-200 ease-out lg:translate-x-0 lg:shadow-none ${open ? 'translate-x-0' : '-translate-x-full'}`}
        style={{ borderColor: tokens.border }}
      >
        <div
          className="p-4 flex items-center justify-between border-b shrink-0"
          style={{ borderColor: tokens.border }}
        >
          <Link to="/user/dashboard" className="flex items-center gap-2" onClick={onClose}>
            <img src={logo} alt="Dashboard" className="h-12 w-12 object-contain" />
          </Link>
          <button
            onClick={onClose}
            className="p-2 rounded-lg hover:bg-gray-100 lg:hidden"
            aria-label="Close sidebar"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-3 space-y-0.5">
          {navItems.map((item) => {
            const isActive =
              location.pathname === item.path ||
              (item.path === '/user/listings' && location.pathname.startsWith('/user/listings'))
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={onClose}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                  isActive
                    ? 'bg-amber-100 text-amber-900 font-bold'
                    : 'text-gray-700 hover:bg-gray-100 font-semibold'
                }`}
                style={isActive ? { backgroundColor: tokens.activeBg, color: tokens.activeColor } : undefined}
              >
                <item.icon className="w-5 h-5 shrink-0" strokeWidth={1.5} />
                {item.label}
              </Link>
            )
          })}
          <button
            type="button"
            onClick={() => setLogoutModalOpen(true)}
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold mt-2 w-full text-left"
            style={{ color: tokens.danger }}
          >
            <LogOut className="w-5 h-5 shrink-0" strokeWidth={1.5} />
            Logout
          </button>
        </nav>
      </aside>
    </>
  )
}
