import { useMemo, useState } from 'react'
import { Bell, ChevronDown, ChevronRight, Menu } from 'lucide-react'
import { getAvatarUrl } from '@/lib/utils'
import { AgentSidebar } from '../components/AgentSidebar'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#C4955D',
}

const font = { fontFamily: 'Arial, sans-serif' } as const

type ToggleOption = {
  key: string
  label: string
  enabled: boolean
}

type AccordionItem = {
  id: string
  label: string
  type: 'link' | 'toggle-group' | 'content'
  toggles?: ToggleOption[]
  content?: string
}

const SETTINGS_ITEMS: AccordionItem[] = [
  {
    id: 'email',
    label: 'Email Notifications',
    type: 'toggle-group',
    toggles: [
      { key: 'listings', label: 'New Listing Alerts', enabled: true },
      { key: 'messages', label: 'Message Notifications', enabled: true },
      { key: 'showing', label: 'Showing Requests', enabled: false },
      { key: 'marketing', label: 'Marketing Updates', enabled: false },
    ],
  },
  {
    id: 'sms',
    label: 'SMS Notifications',
    type: 'toggle-group',
    toggles: [
      { key: 'urgent', label: 'Urgent Alerts Only', enabled: true },
      { key: 'showing', label: 'Showing Reminders', enabled: true },
      { key: 'marketing', label: 'Promotional SMS', enabled: false },
    ],
  },
  {
    id: 'messages',
    label: 'Messages',
    type: 'toggle-group',
    toggles: [
      { key: 'autoReply', label: 'Enable Auto-Reply', enabled: false },
      { key: 'sound', label: 'Message Sound', enabled: true },
      { key: 'preview', label: 'Show Message Preview', enabled: true },
    ],
  },
  {
    id: 'terms',
    label: 'Terms & Conditions',
    type: 'content',
    content: `Last updated: February 2026

1. Acceptance of Terms
By accessing and using this platform, you agree to be bound by these Terms and Conditions.

2. User Responsibilities
You agree to provide accurate information and maintain the confidentiality of your account.

3. Property Listings
All property listings must be accurate and comply with local real estate regulations.

4. Privacy
Your use of the platform is also governed by our Privacy Policy.

5. Modifications
We reserve the right to modify these terms at any time.`,
  },
  {
    id: 'privacy',
    label: 'Privacy Policy',
    type: 'content',
    content: `Last updated: February 2026

1. Information We Collect
We collect information you provide directly to us, including contact details and property preferences.

2. How We Use Your Information
We use your information to provide and improve our services, communicate with you, and ensure security.

3. Information Sharing
We do not sell your personal information. We may share data with service providers under strict confidentiality.

4. Your Rights
You have the right to access, correct, or delete your personal information.

5. Contact Us
For privacy-related questions, please contact our support team.`,
  },
]

function Toggle({
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
      className={[
        'relative inline-flex h-6 w-11 shrink-0 rounded-full transition-colors',
        'focus:outline-none focus:ring-2 focus:ring-[#C4955D] focus:ring-offset-2',
        checked ? 'bg-[#C4955D]' : 'bg-gray-200',
      ].join(' ')}
    >
      <span
        className={[
          'inline-block h-5 w-5 transform rounded-full bg-white shadow transition-transform',
          checked ? 'translate-x-5' : 'translate-x-0.5',
        ].join(' ')}
        style={{ marginTop: 2 }}
      />
    </button>
  )
}

function AccordionRow({
  item,
  open,
  onToggle,
  toggleState,
  onToggleOption,
}: {
  item: AccordionItem
  open: boolean
  onToggle: () => void
  toggleState: Record<string, boolean>
  onToggleOption: (key: string) => void
}) {
  const isExpandable = item.type === 'toggle-group' || item.type === 'content'

  return (
    <div className="border border-[#E5E7EB] rounded-lg bg-white overflow-hidden">
      <button
        type="button"
        onClick={onToggle}
        className="w-full flex items-center justify-between px-5 py-4 hover:bg-gray-50 transition-colors text-left"
      >
        <span className="text-[15px] text-[#6B7280]" style={font}>
          {item.label}
        </span>
        {isExpandable ? (
          <ChevronDown
            className={[
              'w-5 h-5 text-gray-400 transition-transform duration-200',
              open ? 'rotate-180' : '',
            ].join(' ')}
          />
        ) : (
          <ChevronRight className="w-5 h-5 text-gray-400" />
        )}
      </button>

      {open && item.type === 'toggle-group' && item.toggles && (
        <div className="px-5 pb-4 border-t" style={{ borderColor: tokens.cardBorder }}>
          <div className="pt-3 space-y-3">
            {item.toggles.map((t) => (
              <div key={t.key} className="flex items-center justify-between">
                <span className="text-sm text-[#374151]" style={font}>
                  {t.label}
                </span>
                <Toggle
                  checked={toggleState[t.key] ?? t.enabled}
                  onChange={() => onToggleOption(t.key)}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {open && item.type === 'content' && item.content && (
        <div className="px-5 pb-4 border-t" style={{ borderColor: tokens.cardBorder }}>
          <div className="pt-3">
            <p
              className="text-sm text-[#374151] whitespace-pre-line leading-relaxed"
              style={font}
            >
              {item.content}
            </p>
          </div>
        </div>
      )}
    </div>
  )
}

export function Settings() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])
  const [openItems, setOpenItems] = useState<Set<string>>(new Set())
  const [toggleState, setToggleState] = useState<Record<string, boolean>>({})

  const toggleItem = (id: string) => {
    setOpenItems((prev) => {
      const next = new Set(prev)
      if (next.has(id)) {
        next.delete(id)
      } else {
        next.add(id)
      }
      return next
    })
  }

  const handleToggleOption = (key: string) => {
    setToggleState((prev) => ({ ...prev, [key]: !prev[key] }))
  }

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden" style={{ backgroundColor: tokens.pageBg }}>
      <AgentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Settings" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 bg-white">
        <header className="shrink-0 bg-white border-b" style={{ borderColor: tokens.cardBorder }}>
          <div className="px-8 h-[76px] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1
                className="text-2xl font-normal text-[#0a0a0a]"
                style={{ ...font, lineHeight: '32px' }}
              >
                Settings
              </h1>
            </div>

            <div className="flex items-center gap-0">
              <button
                type="button"
                className="relative p-2 rounded-[10px] hover:bg-gray-50"
                aria-label="Notifications"
              >
                <Bell className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fb2c36]" />
              </button>
              <div
                className="flex items-center h-11 pl-4 ml-2 border-l"
                style={{ borderColor: tokens.cardBorder }}
              >
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-8 pt-6 pb-8 bg-white">
          <div className="w-full space-y-3">
            {SETTINGS_ITEMS.map((item) => (
              <AccordionRow
                key={item.id}
                item={item}
                open={openItems.has(item.id)}
                onToggle={() => toggleItem(item.id)}
                toggleState={toggleState}
                onToggleOption={handleToggleOption}
              />
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
