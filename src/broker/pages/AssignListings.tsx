import { useMemo, useState } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { Bell, ChevronDown, Menu, Search } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { BrokerSidebar } from '../components/BrokerSidebar'
import { ASSIGN_LISTING_OPTIONS, BROKER_AGENTS, getAgentById } from '../data/agentsData'

const tokens = { pageBg: '#ffffff', cardBorder: '#E5E7EB', accent: '#A49776' }
const font = { fontFamily: 'Arial, sans-serif' } as const

export function AssignListings() {
  const navigate = useNavigate()
  const [searchParams] = useSearchParams()
  const agentIdParam = searchParams.get('agentId') ?? 'den-williams'

  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])
  const [query, setQuery] = useState('')
  const [selected, setSelected] = useState<Record<string, boolean>>({ '1023': true, '1024': false, '1025': false })
  const [assignTo, setAssignTo] = useState(agentIdParam)
  const [successToast, setSuccessToast] = useState(false)

  const agent = getAgentById(assignTo)
  const agentLabel = agent?.name ?? 'Den Williams'

  const filtered = useMemo(() => {
    if (!query.trim()) return ASSIGN_LISTING_OPTIONS
    const q = query.toLowerCase()
    return ASSIGN_LISTING_OPTIONS.filter((l) => l.label.toLowerCase().includes(q))
  }, [query])

  const toggle = (id: string) => {
    setSelected((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  const handleAssign = () => {
    setSuccessToast(true)
    window.setTimeout(() => setSuccessToast(false), 4000)
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
                Assign Listings
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
          <div className="w-full bg-white border border-[#E5E7EB] rounded-xl p-6 sm:p-8 shadow-sm">
            <div className="relative mb-6">
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search Listings"
                className="w-full h-11 rounded-lg border border-[#D1D5DC] bg-white pl-4 pr-11 text-[14px] text-[#111827] placeholder:text-gray-400 outline-none focus:border-[#A49776]"
                style={font}
              />
              <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 pointer-events-none" />
            </div>

            <div className="flex flex-col sm:flex-row sm:flex-wrap gap-3 mb-8">
              {filtered.map((l) => (
                <button
                  key={l.id}
                  type="button"
                  onClick={() => toggle(l.id)}
                  className={`flex-1 min-w-[200px] flex items-center gap-3 rounded-lg border px-4 py-3 text-left transition-colors ${
                    selected[l.id] ? 'border-[#A49776] bg-[#FAF8F5]' : 'border-[#E5E7EB] bg-white hover:bg-gray-50'
                  }`}
                >
                  <span
                    className={`flex h-5 w-5 shrink-0 rounded border ${
                      selected[l.id] ? 'bg-[#4B5563] border-[#4B5563]' : 'border-[#D1D5DC] bg-white'
                    }`}
                    aria-hidden
                  />
                  <span className="text-[14px] text-[#111827]" style={font}>
                    {l.label}
                  </span>
                </button>
              ))}
            </div>

            <div className="mb-8">
              <label className="text-[14px] font-bold text-[#111827] mb-2 block" style={font}>
                Assign To:
              </label>
              <div className="relative">
                <select
                  value={assignTo}
                  onChange={(e) => setAssignTo(e.target.value)}
                  className="w-full h-11 rounded-lg border border-[#D1D5DC] bg-white pl-3 pr-10 text-[14px] text-[#111827] appearance-none outline-none focus:border-[#A49776]"
                  style={font}
                >
                  {BROKER_AGENTS.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name}
                    </option>
                  ))}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500 pointer-events-none" />
              </div>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                onClick={handleAssign}
                className="h-10 px-6 rounded-[10px] text-white text-[14px] font-normal hover:opacity-95"
                style={{ backgroundColor: tokens.accent, ...font }}
              >
                Assign Listings
              </button>
              <button
                type="button"
                onClick={() => navigate('/broker/agents-management')}
                className="h-10 px-6 rounded-[10px] border border-[#D1D5DC] bg-white text-[#111827] text-[14px] hover:bg-gray-50"
                style={font}
              >
                Cancel
              </button>
            </div>
          </div>

          {successToast ? (
            <div
              className="fixed bottom-6 left-1/2 z-[70] w-[min(92vw,480px)] -translate-x-1/2 rounded-2xl px-6 py-5 text-center shadow-xl"
              style={{ backgroundColor: 'rgba(164, 151, 118, 0.95)' }}
              role="status"
            >
              <div className="mx-auto mb-2 flex h-12 w-12 items-center justify-center rounded-full bg-white/25">
                <span className="text-2xl text-white">✓</span>
              </div>
              <p className="text-xl font-semibold text-white mb-1" style={font}>
                Successfully
              </p>
              <p className="text-sm text-white/95" style={font}>
                Your listing was assigned successfully to agent {agentLabel}
              </p>
            </div>
          ) : null}
        </main>
      </div>
    </div>
  )
}
