import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Bell, ChevronLeft, Menu } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { BrokerSidebar } from '../components/BrokerSidebar'
import { getAgentById, type BrokerAgentStatus } from '../data/agentsData'

const tokens = { pageBg: '#ffffff', cardBorder: '#E5E7EB', accent: '#A49776' }
const font = { fontFamily: 'Arial, sans-serif' } as const

function StatusBadge({ status }: { status: BrokerAgentStatus }) {
  if (status === 'Active') {
    return (
      <span
        className="inline-flex items-center justify-center px-3 min-h-[28px] rounded-sm text-[12px] font-normal whitespace-nowrap"
        style={{ backgroundColor: '#E8F5E9', color: '#2E7D32', ...font }}
      >
        Active
      </span>
    )
  }
  if (status === 'Pending') {
    return (
      <span
        className="inline-flex items-center justify-center px-3 min-h-[28px] rounded-sm text-[12px] font-normal whitespace-nowrap"
        style={{ backgroundColor: '#FFF8E1', color: '#C49000', ...font }}
      >
        Pending
      </span>
    )
  }
  return (
    <span
      className="inline-flex items-center justify-center px-3 min-h-[28px] rounded-sm text-[12px] font-normal whitespace-nowrap"
      style={{ backgroundColor: '#E8EAF6', color: '#3949AB', ...font }}
    >
      Offline
    </span>
  )
}

/** View agent profile — distinct from Agent Performance (metrics). */
export function AgentDetail() {
  const navigate = useNavigate()
  const { agentId } = useParams<{ agentId: string }>()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  const agent = getAgentById(agentId)
  const displayName = agent?.name ?? 'Agent'
  const avatar = useMemo(() => getAvatarUrl(displayName, 96), [displayName])

  if (!agent) {
    return (
      <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0" style={{ backgroundColor: tokens.pageBg }}>
        <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Agents Management" />
        <div className="flex-1 flex flex-col lg:ml-64 min-w-0 w-full">
          <main className="flex-1 flex items-center justify-center p-8">
            <div className="text-center space-y-4">
              <p className="text-[#374151]" style={font}>
                Agent not found.
              </p>
              <button
                type="button"
                onClick={() => navigate('/broker/agents-management')}
                className="h-10 px-6 rounded-[10px] text-white text-[14px] hover:opacity-95"
                style={{ backgroundColor: tokens.accent, ...font }}
              >
                Back to Agent Management
              </button>
            </div>
          </main>
        </div>
      </div>
    )
  }

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0" style={{ backgroundColor: tokens.pageBg }}>
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Agents Management" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 w-full">
        <header className="shrink-0 bg-white border-b" style={{ borderColor: tokens.cardBorder }}>
          <div className="px-4 sm:px-8 min-h-[76px] py-3 sm:py-0 sm:h-[76px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 sm:gap-3 flex-wrap min-w-0">
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 shrink-0"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <button
                type="button"
                onClick={() => navigate('/broker/agents-management')}
                className="inline-flex items-center gap-1.5 h-9 px-3 border border-[#D1D5DB] rounded-none bg-white text-[13px] text-[#374151] hover:bg-gray-50 shrink-0"
                style={font}
              >
                <ChevronLeft className="w-4 h-4" />
                Back
              </button>
              <h1 className="text-xl sm:text-2xl font-normal text-[#0a0a0a] truncate" style={{ ...font, lineHeight: '32px' }}>
                Agent profile
              </h1>
            </div>
            <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap justify-end">
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pb-8 bg-white">
          <div className="w-full bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="flex flex-col sm:flex-row sm:items-start gap-6">
              <img src={avatar} alt="" className="w-24 h-24 rounded-full object-cover border shrink-0" style={{ borderColor: tokens.cardBorder }} />
              <div className="flex-1 min-w-0 space-y-4">
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="text-xl font-semibold text-[#111827]" style={font}>
                    {agent.name}
                  </h2>
                  <StatusBadge status={agent.status} />
                </div>
                <dl className="grid gap-3 text-[14px]" style={font}>
                  <div>
                    <dt className="text-[#6B7280] mb-0.5">Email</dt>
                    <dd className="text-[#111827] break-all">{agent.email}</dd>
                  </div>
                  <div>
                    <dt className="text-[#6B7280] mb-0.5">Phone</dt>
                    <dd className="text-[#111827]">{agent.phone}</dd>
                  </div>
                  <div>
                    <dt className="text-[#6B7280] mb-0.5">License No.</dt>
                    <dd className="text-[#111827]">{agent.license}</dd>
                  </div>
                </dl>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => navigate(`/broker/agents-management/performance/${agent.id}`)}
                    className="h-10 px-6 rounded-[10px] text-white text-[14px] font-normal hover:opacity-95"
                    style={{ backgroundColor: tokens.accent, ...font }}
                  >
                    View performance
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate(`/broker/agents-management/assign-listings?agentId=${encodeURIComponent(agent.id)}`)}
                    className="h-10 px-6 rounded-[10px] border border-[#D1D5DC] bg-white text-[#111827] text-[14px] hover:bg-gray-50"
                    style={font}
                  >
                    Assign listings
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
