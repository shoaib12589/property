import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Bell, Menu } from 'lucide-react'
import { getAvatarUrl } from '../../frontend/lib/utils'
import { BrokerSidebar } from '../components/BrokerSidebar'
import {
  BasicPropertyDetailsFields,
  type BasicPropertyFormState,
} from '../components/BasicPropertyDetailsFields'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#A49776',
}

const font = { fontFamily: 'Arial, sans-serif' } as const

/** Default values aligned with Renew Property attachment */
const renewDefaults: BasicPropertyFormState = {
  propertyTitle: 'Modern Downtown Apartment',
  price: '450,000',
  propertyType: '',
  streetAddress: '123 Main Street',
  city: 'London',
  state: 'UK',
  zipCode: '123447',
  description: '',
}

export function RenewProperty() {
  const navigate = useNavigate()
  const { listingId } = useParams<{ listingId: string }>()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])
  const [form, setForm] = useState<BasicPropertyFormState>(renewDefaults)

  const patch = (next: Partial<BasicPropertyFormState>) =>
    setForm((prev) => ({ ...prev, ...next }))

  void listingId

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0" style={{ backgroundColor: tokens.pageBg }}>
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Listings" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 w-full bg-white">
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
                Renew Property
              </h1>
            </div>

            <div className="flex items-center gap-0">
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden w-full px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pb-10 bg-white" style={{ backgroundColor: tokens.pageBg }}>
          <div className="w-full">
            <div className="w-full bg-white border border-[#E5E7EB] rounded-lg shadow-sm p-6 sm:p-8 lg:p-10">
              <BasicPropertyDetailsFields form={form} onChange={patch} />

              <div className="flex justify-end mt-8 pt-2">
                <button
                  type="button"
                  onClick={() => navigate('/broker/manage-listings')}
                  className="h-[40px] min-w-[100px] px-8 text-white text-[14px] rounded-[6px] hover:opacity-95"
                  style={{ ...font, backgroundColor: tokens.accent }}
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
