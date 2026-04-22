import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import {
  ChevronDown,
  Eye,
  Filter,
  LogIn,
  MoreVertical,
  Pencil,
  Plus,
  Search,
  Trash2,
  X,
} from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import { AdminSuccessModal } from '../components/AdminSuccessModal'
import { adminInput, adminLabelCaps, adminModalBackdrop } from '../lib/adminUi'
import {
  INITIAL_USERS,
  type UserRole,
  type UserRow,
  type UserStatus,
} from '../data/userManagementMock'

const FIGMA_BRONZE = '#A89677'
const FIGMA_BRONZE_HOVER = '#978566'

const FIGMA_SHELL =
  'w-full min-w-0 overflow-hidden rounded-2xl border border-[#E6E2DB] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)]'

function statusPillClass(s: UserStatus) {
  if (s === 'Active') return 'rounded-full bg-[#DBEAFE] px-3 py-1 text-[12px] font-semibold text-[#1D4ED8]'
  if (s === 'Suspended') return 'rounded-full bg-[#FEF9C3] px-3 py-1 text-[12px] font-semibold text-[#854D0E]'
  return 'rounded-full bg-[#D1FAE5] px-3 py-1 text-[12px] font-semibold text-[#065F46]'
}

function statusDotClass(s: UserStatus) {
  if (s === 'Active') return 'bg-[#3B82F6]'
  if (s === 'Suspended') return 'bg-[#CA8A04]'
  return 'bg-[#059669]'
}

function ToggleWelcome({
  checked,
  onChange,
}: {
  checked: boolean
  onChange: (v: boolean) => void
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={() => onChange(!checked)}
      className={`relative h-7 w-12 shrink-0 rounded-full transition-colors ${checked ? '' : 'bg-[#D1D5DB]'}`}
      style={checked ? { backgroundColor: FIGMA_BRONZE } : undefined}
    >
      <span
        className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform ${checked ? 'left-5' : 'left-0.5'}`}
      />
    </button>
  )
}

export function UserManagement() {
  const [users, setUsers] = useState<UserRow[]>(() => [...INITIAL_USERS])
  const [search, setSearch] = useState('')
  const [roleFilter, setRoleFilter] = useState<'all' | UserRole>('all')
  const [statusFilter, setStatusFilter] = useState<'all' | UserStatus>('all')
  const [roleOpen, setRoleOpen] = useState(false)
  const [statusOpen, setStatusOpen] = useState(false)
  const roleRef = useRef<HTMLDivElement>(null)
  const statusRef = useRef<HTMLDivElement>(null)

  const [addOpen, setAddOpen] = useState(false)
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newRole, setNewRole] = useState<UserRole>('Customer')
  const [welcomeEmail, setWelcomeEmail] = useState(true)

  const [profileUser, setProfileUser] = useState<UserRow | null>(null)
  const [menuUserId, setMenuUserId] = useState<string | null>(null)
  const menuRef = useRef<HTMLDivElement>(null)

  const [deleteId, setDeleteId] = useState<string | null>(null)
  const [successOpen, setSuccessOpen] = useState(false)

  const closeDropdowns = useCallback(() => {
    setRoleOpen(false)
    setStatusOpen(false)
    setMenuUserId(null)
  }, [])

  useEffect(() => {
    function onDoc(e: MouseEvent) {
      const t = e.target as Node
      if (roleRef.current && !roleRef.current.contains(t)) setRoleOpen(false)
      if (statusRef.current && !statusRef.current.contains(t)) setStatusOpen(false)
      if (menuRef.current && !menuRef.current.contains(t)) setMenuUserId(null)
    }
    document.addEventListener('mousedown', onDoc)
    return () => document.removeEventListener('mousedown', onDoc)
  }, [])

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase()
    return users.filter((u) => {
      if (q && !`${u.name} ${u.email}`.toLowerCase().includes(q)) return false
      if (roleFilter !== 'all' && u.role !== roleFilter) return false
      if (statusFilter !== 'all' && u.status !== statusFilter) return false
      return true
    })
  }, [users, search, roleFilter, statusFilter])

  function openAdd() {
    setNewName('')
    setNewEmail('')
    setNewRole('Customer')
    setWelcomeEmail(true)
    setAddOpen(true)
    closeDropdowns()
  }

  function createUser() {
    const name = newName.trim() || 'New User'
    const email = newEmail.trim() || 'user@curatedestate.com'
    const enc = encodeURIComponent(name || email)
    const row: UserRow = {
      id: `u${Date.now()}`,
      name,
      email,
      role: newRole,
      roleDetail: newRole === 'Customer' ? 'Customer' : `${newRole} — General`,
      lastLogin: 'Just now',
      status: 'Active',
      avatarUrl: `https://ui-avatars.com/api/?name=${enc}&background=A89677&color=fff&size=128`,
      memberSince: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
      lastActivityRel: 'Just now',
      internalNote: '',
      activities: [],
    }
    setUsers((prev) => [row, ...prev])
    setAddOpen(false)
    setSuccessOpen(true)
  }

  function suspendUser(id: string) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: 'Suspended' as const } : u)))
    setProfileUser((p) => (p && p.id === id ? { ...p, status: 'Suspended' } : p))
  }

  function blockUser(id: string) {
    setUsers((prev) => prev.map((u) => (u.id === id ? { ...u, status: 'Blocked' as const } : u)))
    setProfileUser((p) => (p && p.id === id ? { ...p, status: 'Blocked' } : p))
  }

  function deleteUser(id: string) {
    setUsers((prev) => prev.filter((u) => u.id !== id))
    setDeleteId(null)
    setProfileUser((p) => (p?.id === id ? null : p))
  }

  const roleLabel = roleFilter === 'all' ? 'Filter by role' : roleFilter
  const statusLabel = statusFilter === 'all' ? 'All statuses' : statusFilter

  return (
    <AdminLayout title="User Management">
      <div className="mx-auto w-full pb-2">
        <div className={FIGMA_SHELL}>
          <div className="flex flex-col gap-4 border-b border-[#ECEAE6] p-4 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:gap-3 sm:p-5">
            <div className="relative min-w-0 flex-1 sm:max-w-md">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                type="search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Find by name or email..."
                className={`${adminInput} pl-10`}
                aria-label="Search users"
              />
            </div>

            <div className="flex flex-wrap items-center gap-2 sm:justify-end">
              <div className="relative" ref={roleRef}>
                <button
                  type="button"
                  onClick={() => {
                    setRoleOpen((o) => !o)
                    setStatusOpen(false)
                  }}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 text-[13px] font-medium text-[#374151] shadow-sm transition hover:bg-[#F9FAFB]"
                >
                  <Filter className="h-4 w-4 text-[#6B7280]" />
                  {roleLabel}
                  <ChevronDown className="h-4 w-4 text-[#9CA3AF]" />
                </button>
                {roleOpen ? (
                  <div className="absolute left-0 z-30 mt-1 min-w-[180px] rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                    {(['all', 'Broker', 'Agent', 'Customer'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className="block w-full px-4 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                        onClick={() => {
                          setRoleFilter(opt === 'all' ? 'all' : opt)
                          setRoleOpen(false)
                        }}
                      >
                        {opt === 'all' ? 'All roles' : opt}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <div className="relative" ref={statusRef}>
                <button
                  type="button"
                  onClick={() => {
                    setStatusOpen((o) => !o)
                    setRoleOpen(false)
                  }}
                  className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#E5E7EB] bg-white px-3 text-[13px] font-medium text-[#374151] shadow-sm transition hover:bg-[#F9FAFB]"
                >
                  <span className="text-[#6B7280]">User Status:</span>
                  <span>{statusLabel}</span>
                  <ChevronDown className="h-4 w-4 text-[#9CA3AF]" />
                </button>
                {statusOpen ? (
                  <div className="absolute right-0 z-30 mt-1 min-w-[160px] rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                    {(['all', 'Active', 'Suspended', 'Blocked'] as const).map((opt) => (
                      <button
                        key={opt}
                        type="button"
                        className="block w-full px-4 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                        onClick={() => {
                          setStatusFilter(opt === 'all' ? 'all' : opt)
                          setStatusOpen(false)
                        }}
                      >
                        {opt === 'all' ? 'All statuses' : opt}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>

              <button
                type="button"
                onClick={openAdd}
                className="inline-flex h-11 items-center gap-2 rounded-lg px-4 text-[12px] font-bold uppercase tracking-[0.06em] text-white shadow-sm transition-colors hover:opacity-95"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                }}
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                Add User
              </button>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-[880px] w-full text-left text-[13px]">
              <thead>
                <tr className="border-b border-[#ECEAE6] bg-[#FAFAF9] text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
                  <th className="px-5 py-3.5">Name</th>
                  <th className="px-5 py-3.5">Email</th>
                  <th className="px-5 py-3.5">Role</th>
                  <th className="px-5 py-3.5">Last Login</th>
                  <th className="px-5 py-3.5">Status</th>
                  <th className="px-5 py-3.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr
                    key={u.id}
                    className="border-b border-[#F3F4F6] transition-colors hover:bg-[#FAFAFA]"
                  >
                    <td className="px-5 py-4">
                      <button
                        type="button"
                        className="flex items-center gap-3 text-left"
                        onClick={() => {
                          setProfileUser(u)
                          setMenuUserId(null)
                        }}
                      >
                        <img
                          src={u.avatarUrl}
                          alt=""
                          className="h-10 w-10 shrink-0 rounded-lg object-cover"
                        />
                        <span className="font-semibold text-[#111827]">{u.name}</span>
                      </button>
                    </td>
                    <td className="px-5 py-4 text-[#4B5563]">{u.email}</td>
                    <td className="px-5 py-4 text-[#374151]">{u.role}</td>
                    <td className="px-5 py-4 text-[#6B7280]">{u.lastLogin}</td>
                    <td className="px-5 py-4">
                      <span className={statusPillClass(u.status)}>{u.status}</span>
                    </td>
                    <td className="relative px-5 py-4 text-right">
                      <button
                        type="button"
                        className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#E5E7EB] bg-white text-[#6B7280] transition hover:bg-[#F9FAFB]"
                        aria-label="Row actions"
                        onClick={() => setMenuUserId((id) => (id === u.id ? null : u.id))}
                      >
                        <MoreVertical className="h-4 w-4" />
                      </button>
                      {menuUserId === u.id ? (
                        <div
                          ref={menuRef}
                          className="absolute right-4 top-[calc(100%-0.25rem)] z-20 w-44 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg"
                        >
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                            onClick={() => {
                              setProfileUser(u)
                              setMenuUserId(null)
                            }}
                          >
                            <Eye className="h-4 w-4" /> View profile
                          </button>
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                            onClick={() => {
                              setProfileUser(u)
                              setMenuUserId(null)
                            }}
                          >
                            <Pencil className="h-4 w-4" /> Edit
                          </button>
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB] disabled:opacity-40"
                            disabled={u.status === 'Suspended'}
                            onClick={() => {
                              suspendUser(u.id)
                              setMenuUserId(null)
                            }}
                          >
                            Suspend
                          </button>
                          <button
                            type="button"
                            className="flex w-full items-center gap-2 px-3 py-2 text-left text-[13px] text-red-600 hover:bg-red-50"
                            onClick={() => {
                              setDeleteId(u.id)
                              setMenuUserId(null)
                            }}
                          >
                            <Trash2 className="h-4 w-4" /> Delete
                          </button>
                        </div>
                      ) : null}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filtered.length === 0 ? (
              <p className="px-5 py-12 text-center text-[14px] text-[#6B7280]">No users match your filters.</p>
            ) : null}
          </div>
        </div>
      </div>

      {/* Add User modal */}
      {addOpen ? (
        <div className={adminModalBackdrop} onClick={() => setAddOpen(false)} role="presentation">
          <div
            className="w-full max-w-lg rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
            aria-labelledby="add-user-title"
          >
            <div className="mb-6 flex items-start justify-between gap-4">
              <h2 id="add-user-title" className="text-[20px] font-bold text-[#111827]">
                Add New User
              </h2>
              <button
                type="button"
                className="rounded-lg p-1 text-[#6B7280] hover:bg-[#F3F4F6]"
                onClick={() => setAddOpen(false)}
                aria-label="Close"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className={adminLabelCaps} htmlFor="nu-name">
                  Full name
                </label>
                <input
                  id="nu-name"
                  className={adminInput}
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Alistair Sterling"
                />
              </div>
              <div>
                <label className={adminLabelCaps} htmlFor="nu-email">
                  Email address
                </label>
                <input
                  id="nu-email"
                  type="email"
                  className={adminInput}
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  placeholder="alistair@curatedestate.com"
                />
              </div>
              <div>
                <label className={adminLabelCaps} htmlFor="nu-role">
                  Role
                </label>
                <select
                  id="nu-role"
                  className={adminInput}
                  value={newRole}
                  onChange={(e) => setNewRole(e.target.value as UserRole)}
                >
                  <option value="Broker">Broker</option>
                  <option value="Agent">Agent</option>
                  <option value="Customer">Customer</option>
                </select>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] px-4 py-3">
                <div>
                  <p className="text-[14px] font-semibold text-[#111827]">Send Welcome Email</p>
                  <p className="mt-0.5 text-[12px] text-[#6B7280]">Include Login Instructions</p>
                </div>
                <ToggleWelcome checked={welcomeEmail} onChange={setWelcomeEmail} />
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                className="text-[12px] font-bold uppercase tracking-wide text-[#A89677]"
                onClick={() => setAddOpen(false)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg px-6 py-2.5 text-[12px] font-bold uppercase tracking-wide text-white transition-colors"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                }}
                onClick={createUser}
              >
                Create User
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Profile modal */}
      {profileUser ? (
        <div
          className="fixed inset-0 z-[70] flex items-center justify-center bg-black/30 px-4 py-8 backdrop-blur-md"
          onClick={() => setProfileUser(null)}
          role="presentation"
        >
          <div
            className="flex max-h-[92vh] w-full max-w-3xl flex-col overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <div className="relative shrink-0 px-6 pb-10 pt-4" style={{ backgroundColor: FIGMA_BRONZE }}>
              <button
                type="button"
                className="absolute right-4 top-4 rounded-lg p-1 text-white/90 hover:bg-white/10"
                onClick={() => setProfileUser(null)}
                aria-label="Close profile"
              >
                <X className="h-5 w-5" />
              </button>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="flex items-end gap-4">
                  <img
                    src={profileUser.avatarUrl}
                    alt=""
                    className="-mb-6 h-24 w-24 shrink-0 rounded-xl border-4 border-white object-cover shadow-md sm:h-28 sm:w-28"
                  />
                  <div className="pb-1 text-white sm:pb-0">
                    <p className="text-[22px] font-bold leading-tight">{profileUser.name}</p>
                    <p className="mt-1 text-[14px] text-white/90">{profileUser.email}</p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 sm:mb-1">
                  <button
                    type="button"
                    className="rounded-lg border border-white/80 bg-white/10 px-4 py-2 text-[13px] font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                    onClick={() => suspendUser(profileUser.id)}
                  >
                    Suspend
                  </button>
                  <button
                    type="button"
                    className="rounded-lg px-3 py-2 text-[13px] font-semibold text-red-200 underline-offset-2 hover:text-white"
                    onClick={() => blockUser(profileUser.id)}
                  >
                    Block User
                  </button>
                </div>
              </div>
            </div>

            <div className="flex-1 overflow-y-auto px-6 pb-6 pt-10">
              <div className="grid gap-6 lg:grid-cols-2">
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9CA3AF]">Account details</p>
                  <div className="mt-3 grid grid-cols-2 gap-4 rounded-xl border border-[#ECEAE6] bg-[#FAFAF9] p-4">
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">Role</p>
                      <p className="mt-1 text-[14px] font-bold text-[#111827]">{profileUser.roleDetail}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">Status</p>
                      <p className="mt-1 flex items-center gap-2 text-[14px] font-bold text-[#111827]">
                        <span className={`h-2 w-2 rounded-full ${statusDotClass(profileUser.status)}`} aria-hidden />
                        {profileUser.status}
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">Member since</p>
                      <p className="mt-1 text-[14px] font-bold text-[#111827]">{profileUser.memberSince}</p>
                    </div>
                    <div>
                      <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">Last activity</p>
                      <p className="mt-1 text-[14px] font-bold text-[#111827]">{profileUser.lastActivityRel}</p>
                    </div>
                  </div>

                  <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.14em] text-[#9CA3AF]">
                    Recent activity
                  </p>
                  <div className="mt-3 space-y-2">
                    {profileUser.activities.length === 0 ? (
                      <p className="rounded-xl border border-dashed border-[#E5E7EB] px-4 py-6 text-center text-[13px] text-[#9CA3AF]">
                        No recent activity.
                      </p>
                    ) : (
                      profileUser.activities.map((a, i) => (
                        <div
                          key={i}
                          className="flex items-start justify-between gap-3 rounded-xl border border-[#ECEAE6] bg-white px-4 py-3"
                        >
                          <div className="flex gap-3">
                            <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#6B7280]">
                              {a.kind === 'login' ? <LogIn className="h-4 w-4" /> : <Pencil className="h-4 w-4" />}
                            </div>
                            <div>
                              <p className="text-[14px] font-semibold text-[#111827]">{a.title}</p>
                              <p className="mt-0.5 text-[12px] text-[#6B7280]">{a.detail}</p>
                            </div>
                          </div>
                          <span className="shrink-0 text-[12px] text-[#9CA3AF]">{a.when}</span>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="rounded-xl border border-[#E5E7EB] bg-[#F9FAFB] p-4">
                    <p className="text-[13px] font-semibold text-[#111827]">Internal Note</p>
                    {profileUser.internalNote ? (
                      <p className="mt-2 text-[13px] italic leading-relaxed text-[#4B5563]">
                        *{profileUser.internalNote}*
                      </p>
                    ) : (
                      <p className="mt-2 text-[13px] text-[#9CA3AF]">No internal notes.</p>
                    )}
                  </div>

                  <div className="rounded-xl border border-[#E5E7EB] bg-white p-4">
                    <p className="text-[13px] font-semibold text-[#111827]">Block User?</p>
                    <p className="mt-2 text-[13px] leading-relaxed text-[#6B7280]">
                      This will permanently revoke all access to the administrative suite. This action is recorded.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2">
                      <button
                        type="button"
                        className="rounded-lg px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-white"
                        style={{ backgroundColor: FIGMA_BRONZE }}
                        onClick={() => blockUser(profileUser.id)}
                      >
                        Confirm block
                      </button>
                      <button
                        type="button"
                        className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-[11px] font-bold uppercase tracking-wide text-[#111827]"
                        onClick={() => setProfileUser(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <button
                type="button"
                className="mt-8 w-full rounded-xl border-2 border-[#111827] py-3 text-[12px] font-bold uppercase tracking-wide text-[#111827] transition hover:bg-[#F9FAFB]"
                onClick={() => setProfileUser(null)}
              >
                View User Documents
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {/* Delete confirm */}
      {deleteId ? (
        <div className={adminModalBackdrop} onClick={() => setDeleteId(null)} role="presentation">
          <div
            className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <p className="text-center text-[15px] font-semibold text-[#111827]">Delete user?</p>
            <p className="mt-2 text-center text-[13px] text-[#6B7280]">This removes the account from the list (demo).</p>
            <div className="mt-6 flex justify-center gap-2">
              <button
                type="button"
                className="h-10 rounded-lg border border-[#D1D5DB] px-4 text-[14px] font-medium"
                onClick={() => setDeleteId(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="h-10 rounded-lg bg-red-600 px-4 text-[14px] font-semibold text-white hover:bg-red-700"
                onClick={() => deleteUser(deleteId)}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <AdminSuccessModal
        open={successOpen}
        title="Successfully"
        subtitle="User Created Successfully"
        variant="prominent"
        hideButton
        autoCloseMs={2200}
        onClose={() => setSuccessOpen(false)}
      />
    </AdminLayout>
  )
}
