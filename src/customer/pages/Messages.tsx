import { useState } from 'react'
import {
  Search,
  Phone,
  Video,
  MoreVertical,
  Paperclip,
  Send,
} from 'lucide-react'
import { CustomerSidebar, CUSTOMER_SIDEBAR_OFFSET } from '@customer/components/CustomerSidebar'
import { CustomerHeader } from '@customer/components/CustomerHeader'
import { cn, getAvatarUrl } from '@/lib/utils'

const tokens = {
  border: '#E5E7EB',
  goldenDark: '#A49776',
  background: '#F8F7F4',
}

interface Conversation {
  id: string
  name: string
  property: string
  lastMessage: string
  time: string
  unread: number
  online: boolean
  avatar?: string
}

interface ChatMessage {
  id: string
  text: string
  time: string
  fromMe: boolean
}

const conversations: Conversation[] = [
  {
    id: '1',
    name: 'Sarah Johnson',
    property: 'Luxury Villa in Suburbs',
    lastMessage: 'The showing is confirmed for tomorrow at Luxury Villa in Suburbs',
    time: '10 min ago',
    unread: 2,
    online: true,
  },
  {
    id: '2',
    name: 'Mike Chen',
    property: 'Modern Downtown Condo',
    lastMessage: 'I have some additional photos to share for Modern Downtown Condo',
    time: '1 hour ago',
    unread: 0,
    online: false,
  },
  {
    id: '3',
    name: 'Emma Davis',
    property: 'Beach House Paradise',
    lastMessage: 'Let me know when you\'d like to schedule a visit.',
    time: '2 hours ago',
    unread: 0,
    online: false,
  },
  {
    id: '4',
    name: 'Tom Wilson',
    property: 'Cozy Family Home',
    lastMessage: 'The contract has been sent for your review.',
    time: '1 day ago',
    unread: 0,
    online: false,
  },
]

const initialMessages: ChatMessage[] = [
  { id: '1', text: 'Hi! Thank you for your interest in the Luxury Villa.', time: '10:30 AM', fromMe: false },
  { id: '2', text: 'Hello! I would like to schedule a showing', time: '10:32 AM', fromMe: true },
  { id: '3', text: 'Of course! What time works best for you?', time: '10:33 AM', fromMe: false },
  { id: '4', text: 'Would tomorrow at 2 PM be possible?', time: '10:35 AM', fromMe: true },
  { id: '5', text: 'Yes, tomorrow at 2 PM works perfectly! I\'ll see you there.', time: '10:36 AM', fromMe: false },
  { id: '6', text: 'The showing is confirmed for tomorrow at 2 PM', time: '10:37 AM', fromMe: false },
]

export function Messages() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [selectedId, setSelectedId] = useState<string>(conversations[0].id)
  const [searchQuery, setSearchQuery] = useState('')
  const [messageInput, setMessageInput] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>(initialMessages)

  const selected = conversations.find((c) => c.id === selectedId) ?? conversations[0]

  const filteredConversations = searchQuery.trim()
    ? conversations.filter(
        (c) =>
          c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.property.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : conversations

  const handleSend = () => {
    if (!messageInput.trim()) return
    setMessages((prev) => [
      ...prev,
      { id: String(prev.length + 1), text: messageInput.trim(), time: 'Now', fromMe: true },
    ])
    setMessageInput('')
  }

  return (
    <div
      className="h-screen max-h-[100dvh] flex overflow-hidden"
      style={{ backgroundColor: tokens.background, fontFamily: "'Gilroy', sans-serif" }}
    >
      <CustomerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={cn('flex-1 flex flex-col min-w-0', CUSTOMER_SIDEBAR_OFFSET, 'h-screen max-h-[100dvh] overflow-hidden')}
      >
        <CustomerHeader title="Messages" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 min-h-0 flex overflow-hidden">
          {/* Left pane - Conversations list */}
          <div
            className="w-full sm:w-80 lg:w-96 shrink-0 flex flex-col border-r bg-white"
            style={{ borderColor: tokens.border }}
          >
            <div className="p-4 border-b shrink-0" style={{ borderColor: tokens.border }}>
              <h2 className="text-base font-bold text-gray-900 mb-3">Messages</h2>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Search conversations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 rounded-lg border text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  style={{ borderColor: tokens.border }}
                />
              </div>
            </div>
            <div className="flex-1 min-h-0 overflow-y-auto">
              {filteredConversations.map((conv) => (
                <button
                  key={conv.id}
                  type="button"
                  onClick={() => setSelectedId(conv.id)}
                  className={cn(
                    'w-full flex items-start gap-3 p-4 text-left hover:bg-gray-50 transition-colors border-b',
                    selectedId === conv.id && 'bg-amber-50/50'
                  )}
                  style={{ borderColor: tokens.border }}
                >
                  <div className="relative shrink-0">
                    <img src={getAvatarUrl(conv.name)} alt="" className="w-12 h-12 rounded-full object-cover" />
                    {conv.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <span className="font-bold text-gray-900 truncate">{conv.name}</span>
                      <div className="flex items-center gap-2 shrink-0">
                        {conv.unread > 0 && (
                          <span
                            className="inline-flex items-center justify-center min-w-[1.25rem] h-5 px-1.5 rounded-full text-xs font-bold text-white"
                            style={{ backgroundColor: tokens.goldenDark }}
                          >
                            {conv.unread}
                          </span>
                        )}
                        <span className="text-xs font-medium text-gray-500">{conv.time}</span>
                      </div>
                    </div>
                    <p className="text-sm font-medium text-gray-600 truncate mt-0.5">{conv.lastMessage}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right pane - Active chat */}
          <div className="flex-1 flex flex-col min-w-0 bg-gray-50/50">
            {/* Chat header */}
            <div
              className="shrink-0 flex items-center justify-between gap-4 px-4 sm:px-6 py-3 bg-white border-b"
              style={{ borderColor: tokens.border }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <img src={getAvatarUrl(selected.name)} alt="" className="w-10 h-10 rounded-full object-cover shrink-0" />
                <div className="min-w-0">
                  <p className="font-bold text-gray-900 truncate">{selected.name}</p>
                  <p className="text-sm font-medium text-gray-500 truncate">{selected.property}</p>
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                  aria-label="Call"
                >
                  <Phone className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                  aria-label="Video call"
                >
                  <Video className="w-5 h-5" strokeWidth={1.5} />
                </button>
                <button
                  className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                  aria-label="More options"
                >
                  <MoreVertical className="w-5 h-5" strokeWidth={1.5} />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 min-h-0 overflow-y-auto p-4 sm:p-6 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn('flex', msg.fromMe ? 'justify-end' : 'justify-start')}
                >
                  <div className="flex flex-col max-w-[85%] sm:max-w-[75%]">
                    <div
                      className={cn(
                        'rounded-xl px-4 py-2.5',
                        msg.fromMe
                          ? 'bg-[#6B7B5C] text-white'
                          : 'bg-gray-200 text-gray-900'
                      )}
                    >
                      <p className="text-sm font-medium leading-relaxed">{msg.text}</p>
                    </div>
                    <span className={cn(
                      'text-xs font-medium text-gray-500 mt-1',
                      msg.fromMe ? 'text-right' : 'text-left'
                    )}>
                      {msg.time}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Message input */}
            <div
              className="shrink-0 p-4 bg-white border-t flex items-center gap-3"
              style={{ borderColor: tokens.border }}
            >
              <button
                type="button"
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 shrink-0"
                aria-label="Attach"
              >
                <Paperclip className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <input
                type="text"
                placeholder="Type your message..."
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                className="flex-1 min-w-0 px-4 py-2.5 rounded-lg border text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                style={{ borderColor: tokens.border }}
              />
              <button
                type="button"
                onClick={handleSend}
                className="p-2.5 rounded-lg shrink-0 text-white hover:opacity-90 transition-opacity"
                style={{ backgroundColor: tokens.goldenDark }}
                aria-label="Send"
              >
                <Send className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
