import { useMemo, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AdminSidebar } from './AdminSidebar'
import { AdminHeader } from './AdminHeader'
import { getAdminActiveLabel } from '../lib/adminNav'

type AdminLayoutProps = {
  title: string
  children: React.ReactNode
}

export function AdminLayout({ title, children }: AdminLayoutProps) {
  const location = useLocation()
  const activeLabel = useMemo(() => getAdminActiveLabel(location.pathname), [location.pathname])
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="font-inter flex h-screen max-h-[100dvh] min-w-0 overflow-hidden bg-white">
      <AdminSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel={activeLabel} />

      <div className="flex min-w-0 w-full flex-1 flex-col lg:ml-64">
        <AdminHeader title={title} onOpenSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 min-h-0 overflow-x-hidden overflow-y-auto bg-[#F9FAFB] px-4 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] pt-4 sm:px-6 sm:pt-6 sm:pb-8 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  )
}
