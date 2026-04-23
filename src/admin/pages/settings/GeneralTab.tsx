import { useState } from 'react'
import { Clock, HelpCircle, Hexagon, Mail, Pencil, Phone, Globe } from 'lucide-react'
import { adminInput, adminLabelCaps } from '../../lib/adminUi'
import { LANGUAGE_OPTIONS, TIMEZONE_OPTIONS } from '../../data/settingsPageMock'
import { FIGMA_BRONZE, FIGMA_BRONZE_HOVER, FIGMA_SHELL } from './theme'
import { SettingsToggle } from './Toggle'
import logo from '../../assets/login-logo.png'

type Props = { onSave: () => void; onDiscard: () => void }

const initial = {
  platformName: 'Gehard Real Estate & Construction',
  language: 'English (Global)' as (typeof LANGUAGE_OPTIONS)[number],
  timezone: '(GMT-05:00) Eastern Time' as (typeof TIMEZONE_OPTIONS)[number],
  darkMode: false,
  adminEmail: 'admin@curatedestate.com',
  supportPhone: '+1 (555) 000-8888',
}

export function GeneralTab({ onSave, onDiscard }: Props) {
  const [draft, setDraft] = useState(initial)
  const [saved, setSaved] = useState(initial)

  function discard() {
    setDraft({ ...saved })
    onDiscard()
  }
  function save() {
    setSaved({ ...draft })
    onSave()
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 lg:grid-cols-2">
        <div className={FIGMA_SHELL + ' p-5 sm:p-6'}>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#6B7280]">
              <Hexagon className="h-5 w-5" />
            </div>
            <h2 className="text-[16px] font-bold text-[#111827]">Site Identity</h2>
          </div>
          <div>
            <label className={adminLabelCaps} htmlFor="platform-name">
              Platform Name
            </label>
            <input
              id="platform-name"
              className={adminInput}
              value={draft.platformName}
              onChange={(e) => setDraft((d) => ({ ...d, platformName: e.target.value }))}
            />
            <p className="mt-1.5 text-[12px] text-[#6B7280]">
              The name visible to your clients and partners across the digital ecosystem.
            </p>
          </div>
          <div className="mt-6">
            <p className={adminLabelCaps}>Brand Logo</p>
            <div className="mt-2 flex flex-wrap items-center gap-4 rounded-xl border border-[#ECEAE6] bg-[#FAFAF9] p-4">
              <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-lg border border-[#E5E7EB] bg-white p-1">
                <img src={logo} alt="" className="h-full w-full object-contain" />
              </div>
              <div className="min-w-0 flex-1">
                <p className="text-[14px] font-medium text-[#111827]">Gehard Real Estate &amp; Construction Logo</p>
                <p className="mt-1 text-[12px] text-[#6B7280]">
                  Upload a high-resolution logo. Recommended size 512×512px in SVG or PNG format.
                </p>
                <button
                  type="button"
                  className="mt-3 inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
                  style={{ backgroundColor: FIGMA_BRONZE }}
                  onClick={() => {}}
                >
                  <Pencil className="h-4 w-4" /> Update Logo
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className={FIGMA_SHELL + ' p-5 sm:p-6'}>
          <div className="mb-4 flex items-center gap-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#6B7280]">
              <Globe className="h-5 w-5" />
            </div>
            <h2 className="text-[16px] font-bold text-[#111827]">Preferences</h2>
          </div>
          <div>
            <label className={adminLabelCaps} htmlFor="lang">
              Regional Language
            </label>
            <select
              id="lang"
              className={adminInput}
              value={draft.language}
              onChange={(e) => setDraft((d) => ({ ...d, language: e.target.value as typeof draft.language }))}
            >
              {LANGUAGE_OPTIONS.map((o) => (
                <option key={o} value={o}>
                  {o}
                </option>
              ))}
            </select>
          </div>
          <div className="mt-4">
            <label className={adminLabelCaps} htmlFor="tz">
              Reference Timezone
            </label>
            <div className="relative">
              <Clock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <select
                id="tz"
                className={`${adminInput} pl-10`}
                value={draft.timezone}
                onChange={(e) => setDraft((d) => ({ ...d, timezone: e.target.value as typeof draft.timezone }))}
              >
                {TIMEZONE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="mt-6 flex items-center justify-between gap-4 border-t border-[#F3F4F6] pt-5">
            <span className="text-[14px] font-medium text-[#374151]">Enable Dark Mode Portfolio</span>
            <SettingsToggle checked={draft.darkMode} onChange={(v) => setDraft((d) => ({ ...d, darkMode: v }))} />
          </div>
        </div>
      </div>

      <div className={FIGMA_SHELL + ' p-5 sm:p-6'}>
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#6B7280]">
            <HelpCircle className="h-5 w-5" />
          </div>
          <h2 className="text-[16px] font-bold text-[#111827]">Administrative Contact</h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <div>
            <label className={adminLabelCaps} htmlFor="a-email">
              Primary Admin Email
            </label>
            <div className="relative">
              <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                id="a-email"
                type="email"
                className={`${adminInput} pl-10`}
                value={draft.adminEmail}
                onChange={(e) => setDraft((d) => ({ ...d, adminEmail: e.target.value }))}
              />
            </div>
            <p className="mt-1.5 text-[12px] text-[#6B7280]">Used for critical system alerts and high-level communications.</p>
          </div>
          <div>
            <label className={adminLabelCaps} htmlFor="a-phone">
              Direct Support Line
            </label>
            <div className="relative">
              <Phone className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                id="a-phone"
                type="tel"
                className={`${adminInput} pl-10`}
                value={draft.supportPhone}
                onChange={(e) => setDraft((d) => ({ ...d, supportPhone: e.target.value }))}
              />
            </div>
            <p className="mt-1.5 text-[12px] text-[#6B7280]">The dedicated line for your most valued residents and clients.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-end gap-3">
        <button type="button" onClick={discard} className="text-[13px] font-semibold text-[#6B7280]">
          Discard Changes
        </button>
        <button
          type="button"
          onClick={save}
          className="rounded-lg px-6 py-2.5 text-[13px] font-semibold text-white shadow-sm transition-colors"
          style={{ backgroundColor: FIGMA_BRONZE }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = FIGMA_BRONZE
          }}
        >
          Save Global Settings
        </button>
      </div>
    </div>
  )
}
