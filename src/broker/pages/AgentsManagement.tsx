import { useMemo, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Bell, Menu } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { BrokerSidebar } from '../components/BrokerSidebar'
import { ApproveAgentModal, RemoveAgentModal } from '../components/AgentModals'
import { BROKER_AGENTS, type BrokerAgent, type BrokerAgentStatus } from '../data/agentsData'

import actionList from '../assets/agent-actions/action-list.png'
import actionPerformance from '../assets/agent-actions/action-performance.png'
import actionRemove from '../assets/agent-actions/action-remove.png'
import actionViewAdd from '../assets/agent-actions/action-view-add.png'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#A49776',
}

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

/** Figma action assets — circular artwork, no extra border (per design). */
function AgentActionButton({
  title,
  src,
  alt,
  onClick,
}: {
  title: string
  src: string
  alt: string
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      title={title}
      aria-label={title}
      onClick={onClick}
      className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-0 bg-transparent p-0 shadow-none outline-none ring-0 transition-opacity hover:opacity-85 focus-visible:ring-2 focus-visible:ring-[#A49776]/35 focus-visible:ring-offset-2"
    >
      <img src={src} alt={alt} className="h-9 w-9 select-none object-contain pointer-events-none" draggable={false} />
    </button>
  )
}

export function AgentsManagement() {
  const navigate = useNavigate()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  const [removeOpen, setRemoveOpen] = useState(false)
  const [approveOpen, setApproveOpen] = useState(false)
  const [selectedAgent, setSelectedAgent] = useState<BrokerAgent | null>(null)

  const rows = BROKER_AGENTS

  /** View / approve (person + signal + plus): pending → approve flow; otherwise → agent profile (not duplicate of Performance). */
  const handleViewAgent = (a: BrokerAgent) => {
    if (a.status === 'Pending') {
      setSelectedAgent(a)
      setApproveOpen(true)
    } else {
      navigate(`/broker/agents-management/agent/${a.id}`)
    }
  }

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0" style={{ backgroundColor: tokens.pageBg }}>
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Agents Management" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 w-full">
        <header className="shrink-0 bg-white border-b" style={{ borderColor: tokens.cardBorder }}>
          <div className="px-4 sm:px-8 min-h-[76px] py-3 sm:py-0 sm:h-[76px] flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
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
                Agent Management
              </h1>
            </div>

            <div className="flex items-center gap-2 sm:gap-3 shrink-0 flex-wrap justify-end">
              <Link
                to="/broker/agents-management/add-agent"
                className="inline-flex h-9 px-4 items-center rounded-[10px] text-[13px] text-white hover:opacity-95"
                style={{ backgroundColor: tokens.accent, ...font }}
              >
                Add New Agent
              </Link>
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
          <div className="overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8">
            <div className="min-w-[980px]">
              <div
                className="grid items-center border-b border-[#E5E7EB] bg-[#F9FAFB]"
                style={{
                  gridTemplateColumns: 'minmax(130px,1.15fr) minmax(180px,1.5fr) minmax(120px,1fr) minmax(100px,0.85fr) minmax(100px,0.9fr) minmax(152px,1.1fr)',
                }}
              >
                {['Agent Name', 'Email Address', 'Phone', 'License No.', 'Status', 'Actions'].map((h) => (
                  <div
                    key={h}
                    className={`py-3 text-[11px] sm:text-[12px] font-bold text-[#111827] ${h === 'Agent Name' ? 'pl-3' : ''} ${h === 'Actions' ? 'text-center pr-4' : 'text-center'}`}
                    style={font}
                  >
                    {h}
                  </div>
                ))}
              </div>

              <div className="divide-y divide-[#E5E7EB]">
                {rows.map((a) => (
                  <div
                    key={a.id}
                    className="grid items-center bg-white hover:bg-gray-50"
                    style={{
                      gridTemplateColumns: 'minmax(130px,1.15fr) minmax(180px,1.5fr) minmax(120px,1fr) minmax(100px,0.85fr) minmax(100px,0.9fr) minmax(152px,1.1fr)',
                    }}
                  >
                    <div className="pl-3 py-3 sm:py-4 text-[13px] sm:text-[14px] text-[#111827] font-bold truncate text-left" style={font}>
                      {a.name}
                    </div>
                    <div className="py-3 sm:py-4 text-[12px] sm:text-[13px] text-[#6B7280] truncate text-center px-1" style={font}>
                      {a.email}
                    </div>
                    <div className="py-3 sm:py-4 text-[12px] sm:text-[13px] text-[#374151] text-center" style={font}>
                      {a.phone}
                    </div>
                    <div className="py-3 sm:py-4 text-[12px] sm:text-[13px] text-[#6B7280] text-center" style={font}>
                      {a.license}
                    </div>
                    <div className="py-3 sm:py-4 flex items-center justify-center">
                      <StatusBadge status={a.status} />
                    </div>
                    {/*
                      Figma order (L→R): Performance → Assign listings → View/Approve → Remove
                      - Speedometer → Agent Performance (metrics)
                      - List → Assign listings
                      - Person + plus → Approve (if Pending) or Agent profile
                      - Person + X → Remove
                    */}
                    <div className="py-3 sm:py-4 pr-4 flex items-center justify-center gap-1 sm:gap-1.5 flex-wrap">
                      <AgentActionButton
                        title="Performance"
                        alt=""
                        src={actionPerformance}
                        onClick={() => navigate(`/broker/agents-management/performance/${a.id}`)}
                      />
                      <AgentActionButton
                        title="Assign listings"
                        alt=""
                        src={actionList}
                        onClick={() => navigate(`/broker/agents-management/assign-listings?agentId=${encodeURIComponent(a.id)}`)}
                      />
                      <AgentActionButton
                        title={a.status === 'Pending' ? 'Approve agent' : 'View agent'}
                        alt=""
                        src={actionViewAdd}
                        onClick={() => handleViewAgent(a)}
                      />
                      <AgentActionButton
                        title="Remove agent"
                        alt=""
                        src={actionRemove}
                        onClick={() => {
                          setSelectedAgent(a)
                          setRemoveOpen(true)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </main>
      </div>

      <RemoveAgentModal
        open={removeOpen}
        onClose={() => setRemoveOpen(false)}
        onRemove={() => {
          /* TODO: API */
        }}
      />

      <ApproveAgentModal
        open={approveOpen}
        agentName={selectedAgent?.name ?? ''}
        license={selectedAgent?.license ?? ''}
        onClose={() => setApproveOpen(false)}
        onApprove={() => {
          /* TODO: API */
        }}
      />
    </div>
  )
}
