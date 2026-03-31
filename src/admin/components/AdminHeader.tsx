import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { Bell, Menu, User } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'

type AdminHeaderProps = {
  title: string
  onOpenSidebar: () => void
}

export function AdminHeader({ title, onOpenSidebar }: AdminHeaderProps) {
  const [notificationsOpen, setNotificationsOpen] = useState(false)
  const [profileOpen, setProfileOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function closeOnOutside(e: MouseEvent) {
      const t = e.target as Node
      if (notifRef.current && !notifRef.current.contains(t)) setNotificationsOpen(false)
      if (profileRef.current && !profileRef.current.contains(t)) setProfileOpen(false)
    }
    document.addEventListener('mousedown', closeOnOutside)
    return () => document.removeEventListener('mousedown', closeOnOutside)
  }, [])

  return (
    <header className="shrink-0 border-b border-[#E5E7EB] bg-white">
      <div className="flex min-h-[76px] flex-col gap-3 px-4 py-3 sm:h-[76px] sm:flex-row sm:items-center sm:justify-between sm:py-0 sm:px-8">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            className="flex min-h-[44px] min-w-[44px] shrink-0 items-center justify-center rounded-lg p-2 hover:bg-gray-100 lg:hidden"
            aria-label="Open menu"
            onClick={onOpenSidebar}
          >
            <Menu className="h-6 w-6 text-[#6B7280]" />
          </button>
          <h1 className="truncate text-2xl font-bold leading-8 text-[#111827]">{title}</h1>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <div className="relative" ref={notifRef}>
            <button
              type="button"
              className={`relative rounded-[10px] p-2 ${notificationsOpen ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              aria-expanded={notificationsOpen}
              aria-label="Notifications"
              onClick={() => {
                setNotificationsOpen((v) => !v)
                setProfileOpen(false)
              }}
            >
              <Bell className="h-6 w-6 text-[#6B7280]" strokeWidth={1.5} />
              <span className="absolute right-1 top-1 h-2 w-2 rounded-full bg-[#fb2c36]" />
            </button>
            {notificationsOpen ? (
              <div className="absolute right-0 top-full z-50 mt-2 w-[min(100vw-2rem,320px)] rounded-lg border border-[#E5E7EB] bg-white py-2 shadow-lg">
                <p className="border-b border-[#F3F4F6] px-4 py-2 text-[13px] font-semibold text-[#111827]">Notifications</p>
                <button
                  type="button"
                  className="w-full px-4 py-3 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                  onClick={() => setNotificationsOpen(false)}
                >
                  New listing approval request
                </button>
                <button
                  type="button"
                  className="w-full px-4 py-3 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                  onClick={() => setNotificationsOpen(false)}
                >
                  Weekly report is ready
                </button>
              </div>
            ) : null}
          </div>

          <div className="relative flex items-center border-l border-[#E5E7EB] pl-2" ref={profileRef}>
            <button
              type="button"
              className={`flex items-center gap-2 rounded-lg py-1 pl-2 pr-1 ${profileOpen ? 'bg-gray-100' : 'hover:bg-gray-50'}`}
              aria-expanded={profileOpen}
              onClick={() => {
                setProfileOpen((v) => !v)
                setNotificationsOpen(false)
              }}
            >
              <span className="text-[14px] font-medium text-[#111827]">John Doe</span>
              <img
                src={headerAvatar}
                alt=""
                className="hidden h-9 w-9 rounded-full border border-[#E5E7EB] object-cover sm:block"
              />
            </button>
            {profileOpen ? (
              <div className="absolute right-0 top-full z-50 mt-2 w-48 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
                <Link
                  to="/admin/dashboard"
                  className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                  onClick={() => setProfileOpen(false)}
                >
                  <User className="h-4 w-4" /> Profile
                </Link>
                <Link
                  to="/admin/settings"
                  className="flex items-center gap-2 px-4 py-2.5 text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                  onClick={() => setProfileOpen(false)}
                >
                  Settings
                </Link>
                <Link
                  to="/admin/login"
                  className="block border-t border-[#F3F4F6] px-4 py-2.5 text-[13px] text-[#DC2626] hover:bg-red-50"
                  onClick={() => setProfileOpen(false)}
                >
                  Log out
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </header>
  )
}
