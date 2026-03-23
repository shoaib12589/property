import { useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Bell, ChevronDown, Menu } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { BrokerSidebar } from '../components/BrokerSidebar'

const tokens = { pageBg: '#ffffff', cardBorder: '#E5E7EB', accent: '#A49776' }
const font = { fontFamily: 'Arial, sans-serif' } as const

export function AddAgent() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  const [form, setForm] = useState({
    fullName: '',
    email: '',
    phone: '',
    license: '',
    role: '',
    status: 'Pending',
  })

  const [showInviteToast, setShowInviteToast] = useState(false)

  const patch = (k: keyof typeof form, v: string) => setForm((p) => ({ ...p, [k]: v }))

  const sendInvitation = () => {
    setShowInviteToast(true)
    window.setTimeout(() => setShowInviteToast(false), 4000)
  }

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0" style={{ backgroundColor: tokens.pageBg }}>
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Agents Management" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 w-full">
        <header className="shrink-0 bg-white border-b" style={{ borderColor: tokens.cardBorder }}>
          <div className="px-4 sm:px-8 min-h-[76px] py-3 sm:py-0 sm:h-[76px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 shrink-0"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-xl sm:text-2xl font-normal text-[#0a0a0a] truncate" style={{ ...font, lineHeight: '32px' }}>
                Add New Agent
              </h1>
            </div>
            <div className="flex items-center gap-0 shrink-0">
              <button type="button" className="relative p-2 rounded-[10px] hover:bg-gray-50" aria-label="Notifications">
                <Bell className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fb2c36]" />
              </button>
              <div className="flex items-center h-11 pl-4 ml-2 border-l" style={{ borderColor: tokens.cardBorder }}>
                <span className="text-base text-[#0a0a0a]" style={font}>
                  John Doe
                </span>
                <img
                  src={headerAvatar}
                  alt=""
                  className="w-9 h-9 rounded-full object-cover border ml-3 hidden sm:block"
                  style={{ borderColor: tokens.cardBorder }}
                />
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pb-8 bg-white relative">
          <div className="w-full bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-10 shadow-sm">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-5">
              <div>
                <label className="text-[14px] text-[#374151] mb-1.5 block" style={font}>
                  Full Name
                </label>
                <input
                  value={form.fullName}
                  onChange={(e) => patch('fullName', e.target.value)}
                  placeholder="Charlie Den"
                  className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] px-3 text-[14px] outline-none focus:border-[#A49776]"
                  style={font}
                />
              </div>
              <div>
                <label className="text-[14px] text-[#374151] mb-1.5 block" style={font}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => patch('email', e.target.value)}
                  placeholder="info@charlieden.com"
                  className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] px-3 text-[14px] outline-none focus:border-[#A49776]"
                  style={font}
                />
              </div>
              <div>
                <label className="text-[14px] text-[#374151] mb-1.5 block" style={font}>
                  Phone Number
                </label>
                <input
                  value={form.phone}
                  onChange={(e) => patch('phone', e.target.value)}
                  placeholder="+123 456 7890"
                  className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] px-3 text-[14px] outline-none focus:border-[#A49776]"
                  style={font}
                />
              </div>
              <div>
                <label className="text-[14px] text-[#374151] mb-1.5 block" style={font}>
                  License Number
                </label>
                <input
                  value={form.license}
                  onChange={(e) => patch('license', e.target.value)}
                  placeholder="D3-393739"
                  className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] px-3 text-[14px] outline-none focus:border-[#A49776]"
                  style={font}
                />
              </div>
              <div>
                <label className="text-[14px] text-[#374151] mb-1.5 block" style={font}>
                  Assign Role
                </label>
                <input
                  value={form.role}
                  onChange={(e) => patch('role', e.target.value)}
                  placeholder="Agent"
                  className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] px-3 text-[14px] outline-none focus:border-[#A49776]"
                  style={font}
                />
              </div>
              <div>
                <label className="text-[14px] text-[#374151] mb-1.5 block" style={font}>
                  Assign Initial Status
                </label>
                <div className="relative">
                  <select
                    value={form.status}
                    onChange={(e) => patch('status', e.target.value)}
                    className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] pl-3 pr-10 text-[14px] appearance-none outline-none focus:border-[#A49776] bg-white"
                    style={font}
                  >
                    <option value="Pending">Pending</option>
                    <option value="Active">Active</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-3 mt-8">
              <button
                type="button"
                onClick={sendInvitation}
                className="h-10 px-8 rounded-[10px] text-white text-[14px] font-normal hover:opacity-95"
                style={{ backgroundColor: tokens.accent, ...font }}
              >
                Send Invitation
              </button>
              <button
                type="button"
                onClick={() => navigate('/broker/agents-management')}
                className="h-10 px-8 rounded-[10px] border border-[#D1D5DB] bg-white text-[#111827] text-[14px] hover:bg-gray-50"
                style={font}
              >
                Cancel
              </button>
            </div>
          </div>

          {showInviteToast ? (
            <div
              className="fixed bottom-6 left-1/2 z-[70] w-[min(92vw,520px)] -translate-x-1/2 rounded-2xl px-6 py-5 text-center shadow-xl"
              style={{ backgroundColor: 'rgba(164, 151, 118, 0.96)' }}
              role="status"
            >
              <div className="mx-auto mb-2 flex h-11 w-11 items-center justify-center rounded-full bg-white/25">
                <span className="text-xl text-white">✓</span>
              </div>
              <p className="text-lg font-semibold text-white mb-1" style={font}>
                Invitation Successfully
              </p>
              <p className="text-sm text-white/95" style={font}>
                Kindly check your email
              </p>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}
