import { useMemo, useState } from 'react'
import { Check } from 'lucide-react'
import {
  DEFAULT_PERMS_BY_ROLE,
  PERMISSION_GROUPS,
  ROLE_DEFS,
  type RoleKey,
} from '../../data/settingsPageMock'
import { FIGMA_BRONZE, FIGMA_BRONZE_HOVER, FIGMA_SHELL } from './theme'

type Props = { onSave: () => void }

function clonePerms() {
  const o: Record<RoleKey, Set<string>> = {} as Record<RoleKey, Set<string>>
  for (const k of Object.keys(DEFAULT_PERMS_BY_ROLE) as RoleKey[]) {
    o[k] = new Set(DEFAULT_PERMS_BY_ROLE[k])
  }
  return o
}

export function RolesTab({ onSave }: Props) {
  const [role, setRole] = useState<RoleKey>('super_admin')
  const [perms, setPerms] = useState(clonePerms)

  const currentSet = perms[role]
  const groups = useMemo(() => PERMISSION_GROUPS, [])

  function togglePerm(id: string) {
    setPerms((p) => {
      const s = new Set(p[role])
      if (s.has(id)) s.delete(id)
      else s.add(id)
      return { ...p, [role]: s }
    })
  }

  function saveConfig() {
    onSave()
  }

  return (
    <div className="space-y-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h2 className="text-[20px] font-bold text-[#111827]">Roles &amp; Permissions</h2>
          <p className="mt-1 max-w-2xl text-[13px] leading-relaxed text-[#6B7280]">
            Configure organizational hierarchies, manage access protocols, and curate the administrative experience for
            your global real estate portfolio.
          </p>
        </div>
        <button
          type="button"
          onClick={saveConfig}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg px-4 py-2.5 text-[13px] font-semibold text-white shadow-sm"
          style={{ backgroundColor: FIGMA_BRONZE }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = FIGMA_BRONZE
          }}
        >
          <Check className="h-4 w-4" /> Save configuration
        </button>
      </div>

      <div className="grid gap-5 lg:grid-cols-[minmax(260px,320px)_1fr]">
        <div className={FIGMA_SHELL + ' p-0'}>
          <div className="border-b border-[#ECEAE6] p-4">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">Access roles</p>
            <p className="mt-1 text-[12px] text-[#6B7280]">Select a role to view and edit its permissions.</p>
          </div>
          <div className="p-2">
            {ROLE_DEFS.map((r) => {
              const isSel = role === r.key
              return (
                <button
                  key={r.key}
                  type="button"
                  onClick={() => setRole(r.key)}
                  className={`relative mb-1 w-full rounded-lg p-3 text-left transition ${
                    isSel ? 'bg-[#F9FAFB]' : 'hover:bg-[#FAFAFA]'
                  }`}
                >
                  {isSel ? (
                    <span
                      className="absolute left-0 top-1/2 h-8 w-1 -translate-y-1/2 rounded-full"
                      style={{ backgroundColor: FIGMA_BRONZE }}
                    />
                  ) : null}
                  <div className="pl-2">
                    <div className="flex items-center justify-between gap-2">
                      <span className="text-[14px] font-bold text-[#111827]">{r.label}</span>
                      {r.level ? (
                        <span className="rounded bg-[#F3F4F6] px-2 py-0.5 text-[10px] font-bold text-[#6B7280]">
                          {r.level}
                        </span>
                      ) : null}
                    </div>
                    <p className="mt-0.5 text-[12px] text-[#6B7280]">{r.description}</p>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="space-y-4">
          {groups.map((g) => (
            <div key={g.id} className={FIGMA_SHELL + ' p-5'}>
              <h3 className="text-[15px] font-bold text-[#111827]">{g.title}</h3>
              <p className="mt-1 text-[12px] text-[#6B7280]">{g.description}</p>
              <ul className="mt-4 space-y-2">
                {g.items.map((it) => {
                  const on = currentSet.has(it.id)
                  return (
                    <li
                      key={it.id}
                      className="flex items-center justify-between gap-3 rounded-lg border border-[#F3F4F6] bg-[#FAFAFA] px-3 py-2.5"
                    >
                      <span className="text-[13px] font-medium text-[#374151]">{it.label}</span>
                      <button
                        type="button"
                        onClick={() => togglePerm(it.id)}
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full border transition ${
                          on
                            ? 'border-[#A89677] text-white'
                            : 'border-[#E5E7EB] bg-white text-transparent'
                        }`}
                        style={on ? { backgroundColor: FIGMA_BRONZE } : undefined}
                        aria-pressed={on}
                      >
                        {on ? <Check className="h-4 w-4" strokeWidth={2.5} /> : <span className="h-3 w-3 rounded-full bg-[#E5E7EB]" />}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col gap-2 text-[12px] text-[#6B7280] sm:flex-row sm:items-center sm:justify-between">
        <p className="inline-flex items-center gap-1">
          <span className="inline-block h-2 w-2 rounded-full bg-[#22C55E]" aria-hidden />
          SYSTEM AUDIT LOG ACTIVE
        </p>
        <p>Last modified by Admin at 14:22 GMT</p>
      </div>
    </div>
  )
}
