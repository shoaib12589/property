import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  Archive,
  ChevronLeft,
  FolderOpen,
  Mail,
  MoreVertical,
  Paperclip,
  Phone,
  Reply,
  Search,
  Send,
  Trash2,
  Video,
} from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import {
  buildInitialMessagesState,
  buildInitialSelectedByRole,
  buildInitialUnreadByRole,
  DATA_BY_ROLE,
  ROLE_TABS,
  type ChatMessage,
  type RoleTab,
  threadKey,
} from '../data/adminMessagesMock'
import { getAvatarUrl } from '../../frontend/lib/utils'

const FIGMA_BRONZE = '#A89677'
const FIGMA_BRONZE_HOVER = '#978566'
const CARD_BORDER = '#E5E7EB'
const BUBBLE_IN = '#F3F4F6'
const SELECTED_INBOX = '#EFF6FF'

const FIGMA_SHELL =
  'flex min-h-0 w-full min-w-0 flex-1 flex-col overflow-hidden rounded-2xl border border-[#E6E2DB] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)]'

function emptyDeleted(): Record<RoleTab, string[]> {
  return { Customers: [], Agent: [], Admin: [] }
}

export function Messages() {
  const [mobileChatOpen, setMobileChatOpen] = useState(false)
  const [roleTab, setRoleTab] = useState<RoleTab>('Customers')
  const [selectedByRole, setSelectedByRole] = useState<Record<RoleTab, string>>(buildInitialSelectedByRole)
  const [search, setSearch] = useState('')
  const [draft, setDraft] = useState('')
  const [messagesByThread, setMessagesByThread] = useState<Record<string, ChatMessage[]>>(buildInitialMessagesState)
  const [unreadByRole, setUnreadByRole] = useState<Record<RoleTab, Record<string, number>>>(buildInitialUnreadByRole)
  const [deletedIds, setDeletedIds] = useState<Record<RoleTab, string[]>>(emptyDeleted)
  const [archivedByRole, setArchivedByRole] = useState<Record<RoleTab, Record<string, boolean>>>({
    Customers: {},
    Agent: {},
    Admin: {},
  })
  const [moreMenuOpen, setMoreMenuOpen] = useState(false)
  const moreRef = useRef<HTMLDivElement>(null)
  const listEndRef = useRef<HTMLDivElement>(null)

  const selectedId = selectedByRole[roleTab]
  const roleData = DATA_BY_ROLE[roleTab]
  const unreadMap = unreadByRole[roleTab]
  const deleted = deletedIds[roleTab]
  const archived = archivedByRole[roleTab]

  const baseConversations = useMemo(
    () => roleData.conversations.filter((c) => !deleted.includes(c.id)),
    [roleData.conversations, deleted],
  )

  const conversations = useMemo(
    () =>
      baseConversations.map((c) => ({
        ...c,
        unread: unreadMap[c.id],
      })),
    [baseConversations, unreadMap],
  )

  const selected = useMemo(() => {
    const found = conversations.find((c) => c.id === selectedId)
    if (found) return found
    return conversations[0] ?? null
  }, [conversations, selectedId])

  const effectiveSelectedId = selected?.id ?? selectedId

  useEffect(() => {
    setSelectedByRole((prev) => {
      const cur = prev[roleTab]
      if (conversations.length === 0) return { ...prev, [roleTab]: '' }
      if (conversations.some((c) => c.id === cur)) return prev
      return { ...prev, [roleTab]: conversations[0]!.id }
    })
  }, [conversations, roleTab])

  const messages = messagesByThread[threadKey(roleTab, effectiveSelectedId)] ?? []

  useEffect(() => {
    listEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages.length, effectiveSelectedId, roleTab])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      if (moreRef.current && !moreRef.current.contains(e.target as Node)) setMoreMenuOpen(false)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

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

  const selectConversation = useCallback((id: string) => {
    setSelectedByRole((prev) => ({ ...prev, [roleTab]: id }))
    setMobileChatOpen(true)
    setUnreadByRole((prev) => {
      const map = prev[roleTab]
      if (!(id in map)) return prev
      const nextMap = { ...map }
      delete nextMap[id]
      return { ...prev, [roleTab]: nextMap }
    })
  }, [roleTab])

  const switchRoleTab = useCallback((tab: RoleTab) => {
    setRoleTab(tab)
    setSearch('')
    setMobileChatOpen(false)
    setMoreMenuOpen(false)
  }, [])

  const sendMessage = useCallback(() => {
    const text = draft.trim()
    if (!text || !selected) return
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
  }, [draft, selected, roleTab, effectiveSelectedId])

  const markSelectedUnread = useCallback(() => {
    setUnreadByRole((prev) => ({
      ...prev,
      [roleTab]: {
        ...prev[roleTab],
        [effectiveSelectedId]: Math.max(1, prev[roleTab][effectiveSelectedId] ?? 1),
      },
    }))
  }, [roleTab, effectiveSelectedId])

  const archiveSelected = useCallback(() => {
    setArchivedByRole((prev) => ({
      ...prev,
      [roleTab]: {
        ...prev[roleTab],
        [effectiveSelectedId]: !prev[roleTab][effectiveSelectedId],
      },
    }))
  }, [roleTab, effectiveSelectedId])

  const trashSelected = useCallback(() => {
    const nextDeleted = [...deletedIds[roleTab], effectiveSelectedId]
    setDeletedIds((prev) => ({
      ...prev,
      [roleTab]: nextDeleted,
    }))
    const remaining = roleData.conversations.filter((c) => !nextDeleted.includes(c.id))
    const nextId = remaining[0]?.id
    if (nextId) setSelectedByRole((p) => ({ ...p, [roleTab]: nextId }))
    else setSelectedByRole((p) => ({ ...p, [roleTab]: '' }))
    setMobileChatOpen(false)
  }, [roleTab, effectiveSelectedId, roleData.conversations, deletedIds])

  return (
    <AdminLayout title="Messages">
      <div className="relative z-0 mx-auto flex h-[calc(100dvh-5.5rem)] w-full flex-col">
        <div className={FIGMA_SHELL}>
          <div className="flex shrink-0 flex-wrap items-center justify-between gap-3 border-b border-[#ECEAE6] px-4 py-3 sm:px-5">
            <div className="flex flex-wrap gap-2">
              {ROLE_TABS.map((tab) => (
                <button
                  key={tab}
                  type="button"
                  onClick={() => switchRoleTab(tab)}
                  className={`rounded-lg border px-4 py-2 text-[13px] font-semibold transition-colors ${
                    roleTab === tab
                      ? 'border-transparent text-white shadow-sm'
                      : 'border-[#E5E7EB] bg-white text-[#6B7280] hover:bg-[#F9FAFB]'
                  }`}
                  style={roleTab === tab ? { backgroundColor: FIGMA_BRONZE } : undefined}
                >
                  {tab}
                </button>
              ))}
            </div>
            <div className="flex items-center gap-0.5">
              <button
                type="button"
                className="rounded-lg p-2 text-[#6B7280] transition hover:bg-[#F3F4F6] disabled:opacity-40"
                aria-label="Delete conversation"
                disabled={!selected}
                onClick={trashSelected}
              >
                <Trash2 className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-[#6B7280] transition hover:bg-[#F3F4F6] disabled:opacity-40"
                aria-label="Archive"
                disabled={!selected}
                onClick={archiveSelected}
              >
                <FolderOpen className="h-5 w-5" strokeWidth={1.5} />
              </button>
              <button
                type="button"
                className="rounded-lg p-2 text-[#6B7280] transition hover:bg-[#F3F4F6] disabled:opacity-40"
                aria-label="Mark as unread"
                disabled={!selected}
                onClick={markSelectedUnread}
              >
                <Mail className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </div>
          </div>

          <div className="flex min-h-0 flex-1 flex-col border-t border-[#ECEAE6] lg:flex-row">
            {/* Inbox */}
            <div
              className={`flex min-h-0 w-full shrink-0 flex-col border-[#E5E7EB] bg-white lg:max-w-[380px] lg:border-r ${
                mobileChatOpen ? 'hidden max-h-[45vh] lg:flex lg:max-h-none' : 'flex max-h-[50vh] lg:max-h-none'
              }`}
            >
              <div className="shrink-0 px-4 pb-2 pt-4 sm:px-5">
                <h2 className="mb-3 text-[16px] font-bold text-[#111827]">Inbox</h2>
                <div className="relative">
                  <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" strokeWidth={2} />
                  <input
                    type="search"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search conversations..."
                    className="h-10 w-full rounded-lg border border-[#E5E7EB] bg-white pl-10 pr-3 text-[13px] text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#A89677]/25"
                  />
                </div>
              </div>
              <div className="min-h-0 flex-1 overflow-y-auto px-2 pb-4 sm:px-3">
                {filteredConversations.length === 0 ? (
                  <p className="px-3 py-8 text-center text-[13px] text-[#6B7280]">No conversations match your search.</p>
                ) : (
                  filteredConversations.map((c) => {
                    const isSel = c.id === effectiveSelectedId
                    const avatar = getAvatarUrl(c.name, 80)
                    const isArchived = archived[c.id]
                    return (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => selectConversation(c.id)}
                        className={`group relative mb-1 w-full rounded-lg p-3 text-left transition-colors ${
                          isSel ? '' : 'hover:bg-[#F9FAFB]'
                        }`}
                        style={isSel ? { backgroundColor: SELECTED_INBOX } : undefined}
                      >
                        <div className="flex gap-3">
                          <div className="relative shrink-0">
                            <img
                              src={avatar}
                              alt=""
                              className="h-11 w-11 rounded-full border object-cover"
                              style={{ borderColor: CARD_BORDER }}
                            />
                            {c.online ? (
                              <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#22C55E]" />
                            ) : null}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="truncate text-sm font-semibold text-[#111827]">{c.name}</span>
                              <span className="shrink-0 text-xs text-[#9CA3AF]">{c.time}</span>
                            </div>
                            <div className="mt-0.5 flex items-start justify-between gap-2">
                              <p className="line-clamp-2 flex-1 text-xs text-[#6B7280]">{c.preview}</p>
                              {c.unread ? (
                                <span
                                  className="flex h-[22px] min-w-[22px] shrink-0 items-center justify-center rounded-full px-1.5 text-[11px] font-semibold text-white"
                                  style={{ backgroundColor: FIGMA_BRONZE }}
                                >
                                  {c.unread}
                                </span>
                              ) : null}
                            </div>
                            <div className="mt-1 flex items-center gap-2">
                              <p className="truncate text-[11px] text-[#9CA3AF]">{c.property}</p>
                              {isArchived ? (
                                <span className="shrink-0 rounded bg-[#F3F4F6] px-1.5 py-0.5 text-[10px] font-bold uppercase text-[#6B7280]">
                                  Archived
                                </span>
                              ) : null}
                            </div>
                          </div>
                        </div>
                        <div className="pointer-events-none absolute right-2 top-1/2 flex -translate-y-1/2 items-center gap-0.5 opacity-0 transition-opacity group-hover:pointer-events-auto group-hover:opacity-100">
                          <span className="rounded bg-white/90 p-0.5 shadow-sm">
                            <button
                              type="button"
                              className="pointer-events-auto rounded p-1 text-[#9CA3AF] hover:text-[#111827]"
                              title="Reply"
                              onClick={(e) => {
                                e.stopPropagation()
                                selectConversation(c.id)
                              }}
                            >
                              <Reply className="h-4 w-4" />
                            </button>
                          </span>
                          <span className="rounded bg-white/90 p-0.5 shadow-sm">
                            <button
                              type="button"
                              className="pointer-events-auto rounded p-1 text-[#9CA3AF] hover:text-[#111827]"
                              title="Archive"
                              onClick={(e) => {
                                e.stopPropagation()
                                setSelectedByRole((p) => ({ ...p, [roleTab]: c.id }))
                                setArchivedByRole((p) => ({
                                  ...p,
                                  [roleTab]: { ...p[roleTab], [c.id]: !p[roleTab][c.id] },
                                }))
                              }}
                            >
                              <Archive className="h-4 w-4" />
                            </button>
                          </span>
                          <span className="rounded bg-white/90 p-0.5 shadow-sm">
                            <button
                              type="button"
                              className="pointer-events-auto rounded p-1 text-[#9CA3AF] hover:text-red-600"
                              title="Delete"
                              onClick={(e) => {
                                e.stopPropagation()
                                setDeletedIds((p) => ({ ...p, [roleTab]: [...p[roleTab], c.id] }))
                                if (c.id === effectiveSelectedId) setMobileChatOpen(false)
                              }}
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </span>
                        </div>
                      </button>
                    )
                  })
                )}
              </div>
            </div>

            {/* Chat */}
            <div className={`min-h-0 flex-1 flex-col bg-white ${mobileChatOpen ? 'flex' : 'hidden lg:flex'}`}>
              {selected ? (
                <>
                  <div className="flex shrink-0 items-center justify-between gap-2 border-b border-[#E5E7EB] px-4 py-3 sm:px-6">
                    <div className="flex min-w-0 flex-1 items-center gap-2 sm:gap-3">
                      <button
                        type="button"
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg hover:bg-[#F3F4F6] lg:hidden"
                        aria-label="Back to inbox"
                        onClick={() => setMobileChatOpen(false)}
                      >
                        <ChevronLeft className="h-5 w-5 text-[#374151]" />
                      </button>
                      <div className="relative shrink-0">
                        <img
                          src={getAvatarUrl(selected.name, 80)}
                          alt=""
                          className="h-11 w-11 rounded-full border object-cover"
                          style={{ borderColor: CARD_BORDER }}
                        />
                        {selected.online ? (
                          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-white bg-[#22C55E]" />
                        ) : null}
                      </div>
                      <div className="min-w-0">
                        <p className="truncate font-semibold text-[#111827]">{selected.name}</p>
                        <p className="truncate text-xs text-[#6B7280]">{selected.property}</p>
                      </div>
                    </div>
                    <div className="relative flex shrink-0 items-center gap-0.5" ref={moreRef}>
                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6]"
                        aria-label="Call"
                      >
                        <Phone className="h-5 w-5" strokeWidth={1.5} />
                      </button>
                      <button
                        type="button"
                        className="hidden h-10 w-10 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6] sm:flex"
                        aria-label="Video"
                      >
                        <Video className="h-5 w-5" strokeWidth={1.5} />
                      </button>
                      <button
                        type="button"
                        className="flex h-10 w-10 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6]"
                        aria-label="More options"
                        onClick={() => setMoreMenuOpen((o) => !o)}
                      >
                        <MoreVertical className="h-5 w-5" strokeWidth={1.5} />
                      </button>
                      {moreMenuOpen ? (
                        <div className="absolute right-0 top-full z-[80] mt-1 w-44 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                          <button
                            type="button"
                            className="block w-full px-4 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                            onClick={() => {
                              markSelectedUnread()
                              setMoreMenuOpen(false)
                            }}
                          >
                            Mark unread
                          </button>
                          <button
                            type="button"
                            className="block w-full px-4 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                            onClick={() => {
                              archiveSelected()
                              setMoreMenuOpen(false)
                            }}
                          >
                            Archive
                          </button>
                          <button
                            type="button"
                            className="block w-full px-4 py-2 text-left text-[13px] text-red-600 hover:bg-red-50"
                            onClick={() => {
                              trashSelected()
                              setMoreMenuOpen(false)
                            }}
                          >
                            Delete thread
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </div>

                  <div className="min-h-0 flex-1 space-y-4 overflow-y-auto bg-[#FAFAFA] px-4 py-4 sm:px-6">
                    {messages.map((m) => (
                      <div key={m.id} className={m.fromMe ? 'flex flex-col items-end' : 'flex flex-col items-start'}>
                        <div
                          className="max-w-[85%] rounded-xl px-4 py-2.5 text-sm sm:max-w-[70%]"
                          style={
                            m.fromMe
                              ? { backgroundColor: FIGMA_BRONZE, color: '#fff' }
                              : { backgroundColor: BUBBLE_IN, color: '#374151' }
                          }
                        >
                          {m.text}
                        </div>
                        <span className="mt-1 px-1 text-[11px] text-[#9CA3AF]">{m.time}</span>
                      </div>
                    ))}
                    <div ref={listEndRef} />
                  </div>

                  <div className="flex shrink-0 items-end gap-2 border-t border-[#E5E7EB] bg-white px-4 py-3 sm:px-6">
                    <button
                      type="button"
                      className="mb-0.5 flex h-11 w-11 shrink-0 items-center justify-center rounded-lg text-[#6B7280] hover:bg-[#F3F4F6]"
                      aria-label="Attach file"
                    >
                      <Paperclip className="h-5 w-5" strokeWidth={1.5} />
                    </button>
                    <input
                      type="text"
                      value={draft}
                      onChange={(e) => setDraft(e.target.value)}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                          e.preventDefault()
                          sendMessage()
                        }
                      }}
                      placeholder="Type your message..."
                      className="h-11 min-w-0 flex-1 rounded-xl border border-[#E5E7EB] px-4 text-[13px] text-[#111827] outline-none placeholder:text-[#9CA3AF] focus:ring-2 focus:ring-[#A89677]/25"
                    />
                    <button
                      type="button"
                      onClick={sendMessage}
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-colors"
                      style={{ backgroundColor: FIGMA_BRONZE }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                      }}
                      aria-label="Send"
                    >
                      <Send className="h-5 w-5" strokeWidth={2} />
                    </button>
                  </div>
                </>
              ) : (
                <div className="flex flex-1 flex-col items-center justify-center gap-2 p-8 text-center text-[#6B7280]">
                  <p className="text-[15px] font-semibold text-[#111827]">No conversations</p>
                  <p className="max-w-sm text-[13px]">Restore tabs or clear filters — all threads in this role are hidden.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  )
}
