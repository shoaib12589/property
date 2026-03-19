import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Bell, MapPin, Menu } from 'lucide-react'
import { getAvatarUrl } from '@/lib/utils'
import { AgentSidebar } from '../components/AgentSidebar'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#A49776',
}

const font = { fontFamily: 'Arial, sans-serif' } as const

function FieldLabel({ children }: { children: string }) {
  return (
    <label className="text-[14px] text-[#111827] mb-1.5 block" style={font}>
      {children}
    </label>
  )
}

function Input({
  placeholder,
  value,
  onChange,
  icon,
}: {
  placeholder: string
  value: string
  onChange: (next: string) => void
  icon?: React.ReactNode
}) {
  return (
    <div className="relative">
      {icon ? (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
          {icon}
        </span>
      ) : null}
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={`w-full h-[42px] rounded-[9px] border border-[#D1D5DC] bg-white text-[14px] text-[#111827] placeholder:text-gray-400 outline-none ${icon ? 'pl-9' : 'pl-3'} pr-3`}
        style={font}
      />
    </div>
  )
}

export function ManageListingEdit() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])

  const [form, setForm] = useState({
    propertyTitle: '',
    price: '450,000',
    propertyType: '',
    streetAddress: '123 Main Street',
    city: '',
    state: '',
    zipCode: '',
    description: '',
  })

  const set = (key: keyof typeof form) => (next: string) =>
    setForm((prev) => ({ ...prev, [key]: next }))

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden" style={{ backgroundColor: tokens.pageBg }}>
      <AgentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Listings" />

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
                Manage Listings
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden bg-white">
          <div className="w-full px-4 sm:px-6 lg:px-8 py-8">
            <h2 className="text-[36px] leading-none text-[#111827] mb-2" style={font}>
              Basic Property Details
            </h2>
            <p className="text-[16px] text-[#6B7280] mb-6" style={font}>
              Provide the essential information about your property
            </p>

            <div className="space-y-5">
              <div>
                <FieldLabel>Property Title</FieldLabel>
                <Input
                  placeholder="e.g., Modern Downtown Apartment"
                  value={form.propertyTitle}
                  onChange={set('propertyTitle')}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <FieldLabel>Price</FieldLabel>
                  <Input
                    placeholder="$   450,000"
                    value={form.price}
                    onChange={set('price')}
                  />
                </div>
                <div>
                  <FieldLabel>Property Type</FieldLabel>
                  <Input
                    placeholder=""
                    value={form.propertyType}
                    onChange={set('propertyType')}
                  />
                </div>
              </div>

              <div>
                <FieldLabel>Street Address</FieldLabel>
                <Input
                  placeholder="123 Main Street"
                  value={form.streetAddress}
                  onChange={set('streetAddress')}
                  icon={<MapPin className="w-4 h-4" />}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <FieldLabel>City</FieldLabel>
                  <Input placeholder="" value={form.city} onChange={set('city')} />
                </div>
                <div>
                  <FieldLabel>State</FieldLabel>
                  <Input placeholder="" value={form.state} onChange={set('state')} />
                </div>
                <div>
                  <FieldLabel>Zip Code</FieldLabel>
                  <Input placeholder="" value={form.zipCode} onChange={set('zipCode')} />
                </div>
              </div>

              <div>
                <FieldLabel>Description</FieldLabel>
                <textarea
                  value={form.description}
                  onChange={(e) => set('description')(e.target.value)}
                  placeholder="Describe your property..."
                  className="w-full min-h-[110px] rounded-[9px] border border-[#D1D5DC] bg-white px-3 py-3 text-[14px] text-[#111827] placeholder:text-gray-400 outline-none resize-none"
                  style={font}
                />
              </div>
            </div>

            <div className="flex items-center justify-between mt-6">
              <button
                type="button"
                onClick={() => navigate('/agent/manage-listings')}
                className="h-[40px] px-5 border border-[#D1D5DC] bg-white text-[#111827] text-[14px] rounded-none"
                style={font}
              >
                Back
              </button>
              <button
                type="button"
                onClick={() => navigate(`/agent/manage-listings/${id ?? '2455675'}`)}
                className="h-[40px] px-6 text-white text-[14px] rounded-none"
                style={{ ...font, backgroundColor: tokens.accent }}
              >
                Save
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

