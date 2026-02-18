import { Bell, Menu, ChevronDown } from 'lucide-react'
import { getAvatarUrl } from '@/lib/utils'

const BORDER_COLOR = '#E5E7EB'

export interface CustomerHeaderProps {
  /** Page title shown in the top bar (e.g. "Dashboard", "Alerts") */
  title: string
  /** Called when the mobile menu button is pressed (open sidebar) */
  onMenuClick: () => void
  /** Show red dot on the notification bell. Default true */
  showNotificationDot?: boolean
  /** User display name. Default "John Doe" */
  userName?: string
  /** Show dropdown chevron next to user name. Default false */
  showUserDropdown?: boolean
  /** Hide title in header on small screens (e.g. when title is repeated in main). Default false */
  hideTitleOnMobile?: boolean
  /** Optional custom avatar URL; otherwise derived from userName */
  avatarUrl?: string
}

/**
 * Reusable dashboard top bar: page title (left), notification bell, user name, avatar (right).
 * Use inside the customer layout next to CustomerSidebar.
 */
export function CustomerHeader({
  title,
  onMenuClick,
  showNotificationDot = true,
  userName = 'John',
  showUserDropdown = false,
  hideTitleOnMobile = false,
  avatarUrl,
}: CustomerHeaderProps) {
  const src = avatarUrl ?? getAvatarUrl(userName)

  return (
    <header
      className="shrink-0 z-20 bg-white border-b px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4"
      style={{ borderColor: BORDER_COLOR }}
    >
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          aria-label="Open menu"
        >
          <Menu className="w-6 h-6" />
        </button>
        <div className={hideTitleOnMobile ? 'hidden lg:flex items-center gap-2' : 'flex items-center gap-2'}>
          <span className={hideTitleOnMobile ? 'font-semibold text-gray-800' : 'text-lg font-bold text-gray-900'}>
            {title}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-3 sm:gap-4 ml-auto">
        <button className="relative p-2 rounded-lg hover:bg-gray-100" aria-label="Notifications">
          <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
          {showNotificationDot && (
            <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
          )}
        </button>
        <div className="flex items-center gap-1.5">
          <span className={`text-sm hidden sm:inline ${hideTitleOnMobile ? 'font-normal text-gray-700' : 'font-medium text-gray-800'}`}>
            {userName}
          </span>
          {showUserDropdown && (
            <button className="p-1 rounded hover:bg-gray-100" aria-label="User menu">
              <ChevronDown className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
            </button>
          )}
        </div>
        <img src={src} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
      </div>
    </header>
  )
}
