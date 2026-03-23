import { useMemo, useState } from 'react'
import {
  Archive,
  Bell,
  ChevronLeft,
  FolderOpen,
  Mail,
  Menu,
  MoreVertical,
  Paperclip,
  Phone,
  Search,
  Send,
  Trash2,
  Video,
  Reply,
} from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { broker } from '../brokerLayout'
import { BrokerSidebar } from '../components/BrokerSidebar'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#A49776',
  bubbleIncoming: '#F3F4F6',
  selectedInbox: '#EFF6FF',
} as const

const font = { fontFamily: 'Arial, sans-serif' } as const

const ROLE_TABS = ['Customers', 'Agent', 'Admin'] as const
type RoleTab = (typeof ROLE_TABS)[number]

type Conversation = {
  id: string
  name: string
  time: string
  preview: string
  property: string
  unread?: number
  online?: boolean
}

type ChatMessage = {
  id: string
  fromMe: boolean
  text: string
  time: string
}

type RoleInboxData = {
  conversations: Omit<Conversation, 'unread'>[]
  threads: Record<string, ChatMessage[]>
  initialUnread: Record<string, number>
}

const DATA_BY_ROLE: Record<RoleTab, RoleInboxData> = {
  Customers: {
    conversations: [
      {
        id: '1',
        name: 'Sarah Johnson',
        time: '10 min ago',
        preview: 'The showing is confirmed for tomorrow a...',
        property: 'Luxury Villa in Suburbs',
        online: true,
      },
      {
        id: '2',
        name: 'Mike Chen',
        time: '1 hour ago',
        preview: 'Thanks for the quick response on the...',
        property: 'Modern Downtown Condo',
        online: true,
      },
      {
        id: '3',
        name: 'Emma Davis',
        time: 'Yesterday',
        preview: 'Can we reschedule the viewing to Friday?',
        property: 'Beach House Paradise',
      },
      {
        id: '4',
        name: 'Tom Wilson',
        time: '2 days ago',
        preview: 'I submitted an offer through the portal.',
        property: 'Urban Studio',
      },
    ],
    threads: {
      '1': [
        { id: 'm1', fromMe: false, text: 'Hi! I wanted to confirm the showing time for the Luxury Villa.', time: '10:15 AM' },
        { id: 'm2', fromMe: true, text: 'Hello Sarah, yes — we have you down for tomorrow at 2:00 PM.', time: '10:22 AM' },
        { id: 'm3', fromMe: false, text: 'Perfect, thank you. Will the seller be present?', time: '10:28 AM' },
        { id: 'm4', fromMe: true, text: 'The seller prefers not to attend. I will meet you at the property.', time: '10:30 AM' },
      ],
      '2': [
        { id: 'm1', fromMe: false, text: 'Thanks for the quick response on the listing.', time: '9:00 AM' },
        { id: 'm2', fromMe: true, text: 'Happy to help! Let me know if you need anything else.', time: '9:05 AM' },
      ],
      '3': [{ id: 'm1', fromMe: false, text: 'Can we reschedule the viewing to Friday?', time: '4:00 PM' }],
      '4': [
        { id: 'm1', fromMe: false, text: 'I submitted an offer through the portal.', time: '11:00 AM' },
        { id: 'm2', fromMe: true, text: 'Received — I will review and get back to you shortly.', time: '11:30 AM' },
      ],
    },
    initialUnread: { '1': 2 },
  },
  Agent: {
    conversations: [
      {
        id: '1',
        name: 'James Rivera',
        time: '15 min ago',
        preview: 'Can we co-broke on the Riverside listing? Spl...',
        property: 'Co-broke · Riverside Estates',
        online: true,
      },
      {
        id: '2',
        name: 'Lisa Park',
        time: '45 min ago',
        preview: 'Referral fee structure for the downtown tower...',
        property: 'Referral · Metro Tower',
        online: true,
      },
      {
        id: '3',
        name: 'David Okonkwo',
        time: '3 hours ago',
        preview: 'MLS photos didn’t sync — can you re-push?',
        property: 'MLS sync · Oak Lane Townhome',
      },
      {
        id: '4',
        name: 'Maria Santos',
        time: 'Yesterday',
        preview: 'Buyer tour overlap at 4pm — are you free to swap?',
        property: 'Showing overlap · Garden District',
      },
    ],
    threads: {
      '1': [
        { id: 'm1', fromMe: false, text: 'Hey John — are you open to a 50/50 co-broke on Riverside Estates?', time: '2:10 PM' },
        { id: 'm2', fromMe: true, text: 'Yes, standard split works. I’ll send the agreement template.', time: '2:18 PM' },
        { id: 'm3', fromMe: false, text: 'Perfect. I’ll have my client ready for a walkthrough Thursday.', time: '2:22 PM' },
      ],
      '2': [
        { id: 'm1', fromMe: false, text: 'Quick question on the Metro Tower referral — is 25% still your floor?', time: '1:40 PM' },
        { id: 'm2', fromMe: true, text: 'For qualified leads, yes. Happy to discuss on a call.', time: '1:55 PM' },
      ],
      '3': [
        { id: 'm1', fromMe: false, text: 'Listing Oak Lane shows old photos in MLS after your update.', time: '11:05 AM' },
        { id: 'm2', fromMe: true, text: 'Thanks for flagging — I’ll refresh the media feed now.', time: '11:12 AM' },
      ],
      '4': [{ id: 'm1', fromMe: false, text: 'We both have showings at 4pm tomorrow — can one of us slide?', time: '5:30 PM' }],
    },
    initialUnread: { '1': 1, '2': 3 },
  },
  Admin: {
    conversations: [
      {
        id: '1',
        name: 'Platform Support',
        time: '20 min ago',
        preview: 'Scheduled maintenance window this Sunday 2–4 AM...',
        property: 'System notice · Gehard App',
        online: true,
      },
      {
        id: '2',
        name: 'Billing',
        time: '2 hours ago',
        preview: 'Your February invoice is ready for review.',
        property: 'Billing · Agent subscription',
      },
      {
        id: '3',
        name: 'Compliance',
        time: '1 day ago',
        preview: 'Please upload the missing ID verification doc...',
        property: 'Compliance · KYC review',
      },
      {
        id: '4',
        name: 'Product Updates',
        time: '3 days ago',
        preview: 'New lead routing rules are live in your dashboard.',
        property: 'Release notes · v2.4',
      },
    ],
    threads: {
      '1': [
        { id: 'm1', fromMe: false, text: 'Heads up: brief downtime Sunday 2–4 AM for database upgrades.', time: '9:40 AM' },
        { id: 'm2', fromMe: true, text: 'Thanks for the notice — I’ll warn my active clients.', time: '9:48 AM' },
        { id: 'm3', fromMe: false, text: 'We’ll post a banner in-app 24h before.', time: '9:50 AM' },
      ],
      '2': [
        { id: 'm1', fromMe: false, text: 'Your February invoice #INV-2041 is available in Billing.', time: '8:00 AM' },
        { id: 'm2', fromMe: true, text: 'Got it — I’ll process payment today.', time: '8:15 AM' },
      ],
      '3': [
        { id: 'm1', fromMe: false, text: 'We still need a government-issued ID to finish your profile review.', time: 'Yesterday 3:00 PM' },
      ],
      '4': [
        { id: 'm1', fromMe: false, text: 'Lead routing now supports round-robin by zip code. Check Settings.', time: 'Mon 10:00 AM' },
        { id: 'm2', fromMe: true, text: 'Nice — I’ll test with my downtown zip tonight.', time: 'Mon 10:22 AM' },
      ],
    },
    initialUnread: { '1': 1 },
  },
}

function threadKey(role: RoleTab, id: string) {
  return `${role}:${id}` as const
}

function buildInitialMessagesState(): Record<string, ChatMessage[]> {
  const out: Record<string, ChatMessage[]> = {}
  for (const role of ROLE_TABS) {
    const { threads } = DATA_BY_ROLE[role]
    for (const [id, msgs] of Object.entries(threads)) {
      out[threadKey(role, id)] = msgs.map((m) => ({ ...m }))
    }
  }
  return out
}

function buildInitialUnreadByRole(): Record<RoleTab, Record<string, number>> {
  return {
    Customers: { ...DATA_BY_ROLE.Customers.initialUnread },
    Agent: { ...DATA_BY_ROLE.Agent.initialUnread },
    Admin: { ...DATA_BY_ROLE.Admin.initialUnread },
  }
}

function buildInitialSelectedByRole(): Record<RoleTab, string> {
  return {
    Customers: DATA_BY_ROLE.Customers.conversations[0]?.id ?? '1',
    Agent: DATA_BY_ROLE.Agent.conversations[0]?.id ?? '1',
    Admin: DATA_BY_ROLE.Admin.conversations[0]?.id ?? '1',
  }
}

export function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  /** On small screens: show inbox list OR chat (split view on lg+) */
  const [mobileChatOpen, setMobileChatOpen] = useState(false)
  const [roleTab, setRoleTab] = useState<RoleTab>('Customers')
  const [selectedByRole, setSelectedByRole] = useState<Record<RoleTab, string>>(buildInitialSelectedByRole)
  const [search, setSearch] = useState('')
  const [draft, setDraft] = useState('')
  const [messagesByThread, setMessagesByThread] = useState<Record<string, ChatMessage[]>>(buildInitialMessagesState)
  const [unreadByRole, setUnreadByRole] = useState<Record<RoleTab, Record<string, number>>>(buildInitialUnreadByRole)

  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  const selectedId = selectedByRole[roleTab]
  const roleData = DATA_BY_ROLE[roleTab]
  const unreadMap = unreadByRole[roleTab]

  const conversations = useMemo(
    () =>
      roleData.conversations.map((c) => ({
        ...c,
        unread: unreadMap[c.id],
      })),
    [roleData.conversations, unreadMap],
  )

  const selected = conversations.find((c) => c.id === selectedId) ?? conversations[0]
  const effectiveSelectedId = selected?.id ?? selectedId
  const messages = messagesByThread[threadKey(roleTab, effectiveSelectedId)] ?? []

  const filteredConversations = useMemo(() => {
    const q = search.trim().toLowerCase()
    if (!q) return conversations
    return conversations.filter(
      (c) =>
        c.name.toLowerCase().includes(q) ||
        c.preview.toLowerCase().includes(q) ||
        c.property.toLowerCase().includes(q),
    )
  }, [search, conversations])

  const selectConversation = (id: string) => {
    setSelectedByRole((prev) => ({ ...prev, [roleTab]: id }))
    setMobileChatOpen(true)
    setUnreadByRole((prev) => {
      const map = prev[roleTab]
      if (!(id in map)) return prev
      const nextMap = { ...map }
      delete nextMap[id]
      return { ...prev, [roleTab]: nextMap }
    })
  }

  const switchRoleTab = (tab: RoleTab) => {
    setRoleTab(tab)
    setSearch('')
    setMobileChatOpen(false)
  }

  const sendMessage = () => {
    const text = draft.trim()
    if (!text) return
    const now = new Date()
    const time = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
    const newMsg: ChatMessage = {
      id: `local-${Date.now()}`,
      fromMe: true,
      text,
      time,
    }
    const key = threadKey(roleTab, effectiveSelectedId)
    setMessagesByThread((prev) => ({
      ...prev,
      [key]: [...(prev[key] ?? []), newMsg],
    }))
    setDraft('')
  }

  return (
    <div className={`${broker.shell} bg-white`}>
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Messages" />

      <div className={`${broker.contentColumn} bg-white`}>
        <header className="shrink-0 bg-white border-b" style={{ borderColor: tokens.cardBorder }}>
          <div className="px-4 sm:px-6 lg:px-8 min-h-[76px] py-3 sm:py-0 sm:h-[76px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 shrink-0 min-h-[44px] min-w-[44px] flex items-center justify-center"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className={`${broker.titleSemibold} truncate`} style={{ ...font, lineHeight: '32px' }}>
                Messages
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

        <div className="flex-1 min-h-0 flex flex-col border-b bg-white" style={{ borderColor: tokens.cardBorder }}>
          <div className="shrink-0 px-4 sm:px-6 lg:px-8 pt-4 pb-3 flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap gap-2">
              {ROLE_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => switchRoleTab(tab)}
                  className={[
                    'px-4 py-2 text-sm font-medium rounded-lg border transition-colors',
                    roleTab === tab
                      ? 'text-white border-transparent'
                      : 'bg-white text-[#6B7280] border-[#E5E7EB] hover:bg-gray-50',
                  ].join(' ')}
                  style={roleTab === tab ? { ...font, backgroundColor: tokens.accent } : font}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-1">
              <button type="button" className="p-2 rounded-lg text-[#6B7280] hover:bg-gray-100" aria-label="Delete">
                <Trash2 className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button type="button" className="p-2 rounded-lg text-[#6B7280] hover:bg-gray-100" aria-label="Archive">
                <FolderOpen className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button type="button" className="p-2 rounded-lg text-[#6B7280] hover:bg-gray-100" aria-label="Mark as unread">
                <Mail className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="flex-1 min-h-0 flex flex-col lg:flex-row border-t min-h-0" style={{ borderColor: tokens.cardBorder }}>
            {/* Inbox column */}
            <div
              className={`w-full lg:max-w-[380px] shrink-0 flex flex-col border-r bg-white min-h-0 ${
                mobileChatOpen ? 'hidden lg:flex' : 'flex max-h-[55vh] lg:max-h-none'
              }`}
              style={{ borderColor: tokens.cardBorder }}
            >
              <div className="px-4 pt-4 pb-2">
                <h2 className="text-lg font-semibold text-[#111827] mb-3" style={font}>
                  Inbox
                </h2>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-[#9CA3AF]" strokeWidth={2} />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search conversations..."
                    className="w-full h-10 pl-10 pr-3 rounded-lg border text-sm text-[#111827] placeholder:text-[#9CA3AF] bg-white outline-none focus:ring-2 focus:ring-[#A49776]/30"
                    style={{ borderColor: tokens.cardBorder, ...font }}
                  />
                </div>
              </div>
              <div className="flex-1 min-h-0 overflow-y-auto px-2 pb-4">
                {filteredConversations.map((c) => {
                  const isSel = c.id === effectiveSelectedId
                  const avatar = getAvatarUrl(c.name, 80)
                  return (
                    <button
                      key={c.id}
                      type="button"
                      onClick={() => selectConversation(c.id)}
                      className={[
                        'w-full text-left rounded-lg p-3 mb-1 transition-colors group relative',
                        isSel ? '' : 'hover:bg-gray-50',
                      ].join(' ')}
                      style={isSel ? { backgroundColor: tokens.selectedInbox } : undefined}
                    >
                      <div className="flex gap-3">
                        <div className="relative shrink-0">
                          <img
                            src={avatar}
                            alt=""
                            className="w-11 h-11 rounded-full object-cover border"
                            style={{ borderColor: tokens.cardBorder }}
                          />
                          {c.online ? (
                            <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-white" />
                          ) : null}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="font-semibold text-sm text-[#111827] truncate" style={font}>
                              {c.name}
                            </span>
                            <span className="text-xs text-[#9CA3AF] shrink-0" style={font}>
                              {c.time}
                            </span>
                          </div>
                          <div className="flex items-start justify-between gap-2 mt-0.5">
                            <p className="text-xs text-[#6B7280] line-clamp-2 flex-1" style={font}>
                              {c.preview}
                            </p>
                            {c.unread ? (
                              <span
                                className="shrink-0 min-w-[22px] h-[22px] px-1.5 rounded-full text-[11px] font-semibold text-white flex items-center justify-center"
                                style={{ backgroundColor: tokens.accent }}
                              >
                                {c.unread}
                              </span>
                            ) : null}
                          </div>
                          <p className="text-[11px] text-[#9CA3AF] mt-1 truncate" style={font}>
                            {c.property}
                          </p>
                        </div>
                      </div>
                      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity bg-inherit pl-1">
                        <button
                          type="button"
                          className="p-1 rounded text-[#9CA3AF] hover:text-[#111827]"
                          title="Reply"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Reply className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded text-[#9CA3AF] hover:text-[#111827]"
                          title="Archive"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Archive className="w-4 h-4" />
                        </button>
                        <button
                          type="button"
                          className="p-1 rounded text-[#9CA3AF] hover:text-red-600"
                          title="Delete"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </button>
                  )
                })}
              </div>
            </div>

            {/* Chat column */}
            <div
              className={`flex-1 flex-col min-w-0 min-h-0 bg-white flex ${
                mobileChatOpen ? 'flex' : 'hidden lg:flex'
              }`}
            >
              <div
                className="shrink-0 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between border-b gap-2"
                style={{ borderColor: tokens.cardBorder }}
              >
                <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
                  <button
                    type="button"
                    className="lg:hidden shrink-0 p-2 rounded-lg hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center"
                    aria-label="Back to inbox"
                    onClick={() => setMobileChatOpen(false)}
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <div className="relative shrink-0">
                    <img
                      src={getAvatarUrl(selected.name, 80)}
                      alt=""
                      className="w-11 h-11 rounded-full object-cover border"
                      style={{ borderColor: tokens.cardBorder }}
                    />
                    {selected.online ? (
                      <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-[#22C55E] border-2 border-white" />
                    ) : null}
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold text-[#111827] truncate" style={font}>
                      {selected.name}
                    </p>
                    <p className="text-xs text-[#6B7280] truncate" style={font}>
                      {selected.property}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-0.5 sm:gap-1 shrink-0">
                  <button type="button" className="p-2 rounded-lg text-[#6B7280] hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="Call">
                    <Phone className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  <button type="button" className="hidden sm:flex p-2 rounded-lg text-[#6B7280] hover:bg-gray-100 min-h-[44px] min-w-[44px] items-center justify-center" aria-label="Video">
                    <Video className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                  <button type="button" className="p-2 rounded-lg text-[#6B7280] hover:bg-gray-100 min-h-[44px] min-w-[44px] flex items-center justify-center" aria-label="More">
                    <MoreVertical className="w-5 h-5" strokeWidth={1.5} />
                  </button>
                </div>
              </div>

              <div className="flex-1 min-h-0 overflow-y-auto px-4 sm:px-6 py-4 space-y-4 bg-[#FAFAFA]">
                {messages.map((m) => (
                  <div key={m.id} className={m.fromMe ? 'flex flex-col items-end' : 'flex flex-col items-start'}>
                    <div
                      className="max-w-[85%] sm:max-w-[70%] px-4 py-2.5 rounded-xl text-sm"
                      style={
                        m.fromMe
                          ? { backgroundColor: tokens.accent, color: '#fff', ...font }
                          : { backgroundColor: tokens.bubbleIncoming, color: '#374151', ...font }
                      }
                    >
                      {m.text}
                    </div>
                    <span className="text-[11px] text-[#9CA3AF] mt-1 px-1" style={font}>
                      {m.time}
                    </span>
                  </div>
                ))}
              </div>

              <div
                className="shrink-0 px-4 sm:px-6 py-3 sm:py-4 border-t bg-white flex items-end gap-2"
                style={{ borderColor: tokens.cardBorder }}
              >
                <button
                  type="button"
                  className="p-2.5 rounded-lg text-[#6B7280] hover:bg-gray-100 shrink-0 mb-0.5 min-h-[44px] min-w-[44px] flex items-center justify-center"
                  aria-label="Attach file"
                >
                  <Paperclip className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <input
                  type="text"
                  value={draft}
                  onChange={(e) => setDraft(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && !e.shiftKey && (e.preventDefault(), sendMessage())}
                  placeholder="Type your message..."
                  className="flex-1 min-w-0 h-11 px-4 rounded-xl border text-sm text-[#111827] placeholder:text-[#9CA3AF] outline-none focus:ring-2 focus:ring-[#A49776]/30"
                  style={{ borderColor: tokens.cardBorder, ...font }}
                />
                <button
                  type="button"
                  onClick={sendMessage}
                  className="shrink-0 w-11 h-11 rounded-xl flex items-center justify-center text-white"
                  style={{ backgroundColor: tokens.accent }}
                  aria-label="Send"
                >
                  <Send className="w-5 h-5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
