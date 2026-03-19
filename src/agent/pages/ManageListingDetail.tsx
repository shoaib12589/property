import { useMemo, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getAvatarUrl } from '@/lib/utils'
import { AgentSidebar } from '../components/AgentSidebar'
import {
  Bath,
  Bed,
  Bell,
  ChevronLeft,
  Check,
  Heart,
  MapPin,
  Maximize2,
  Menu,
  Phone,
  Share2,
  ChevronRight,
  X,
} from 'lucide-react'

const tokens = {
  pageBg: '#F9FAFB',
  cardBorder: '#E5E7EB',
  accent: '#A49776',
  text: '#0a0a0a',
  muted: '#6B7280',
}

const mainImage =
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1400&h=560&fit=crop'
const thumbnails = [
  'https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=240&fit=crop',
  'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&h=240&fit=crop',
]

const font = { fontFamily: 'Arial, sans-serif' } as const

export function ManageListingDetail() {
  const navigate = useNavigate()
  const { id } = useParams<{ id: string }>()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const headerAvatar = useMemo(() => getAvatarUrl('John Doe', 64), [])
  const [currentImage, setCurrentImage] = useState(0)
  const [isLiked, setIsLiked] = useState(false)

  void id
  const amenities = [
    'Central Air Conditioning',
    'High-Speed Internet',
    'Hardwood Floors',
    'Stainless Steel Appliances',
    'Granite Countertops',
    'Walk-in Closets',
    'In-unit Laundry',
    'Balcony',
    '24/7 Security',
    'Fitness Center',
    'Rooftop Terrace',
    'Concierge Service',
  ]

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden" style={{ backgroundColor: tokens.pageBg }}>
      <AgentSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Listings" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 bg-white">
        {/* Top bar — matches other agent pages + optional close like Figma */}
        <header className="shrink-0 bg-white border-b z-10" style={{ borderColor: tokens.cardBorder }}>
          <div className="px-6 sm:px-8 h-[76px] flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0">
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 shrink-0"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <button
                type="button"
                className="hidden sm:flex p-2 rounded-lg hover:bg-gray-100 text-gray-600 shrink-0"
                aria-label="Close listing"
                onClick={() => navigate('/agent/manage-listings')}
              >
                <X className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h1 className="text-xl sm:text-2xl font-normal text-[#0a0a0a] truncate" style={{ ...font, lineHeight: '32px' }}>
                  Manage Listings
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-0 shrink-0">
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
                <span className="text-sm sm:text-base text-[#0a0a0a]" style={font}>
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

        {/* Full-page scrollable content */}
        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden" style={{ backgroundColor: tokens.pageBg }}>
          <div className="max-w-[1120px] mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-5 pb-10">
            <button
              type="button"
              onClick={() => navigate('/agent/manage-listings')}
              className="flex items-center gap-2 mb-4 px-4 py-2 bg-white border border-[#E5E7EB] rounded-none text-[12px] text-gray-800 hover:bg-gray-50"
              style={font}
            >
              <ChevronLeft className="w-4 h-4" />
              Back
            </button>

            {/* Gallery */}
            <div className="bg-white border border-[#E5E7EB] rounded-none overflow-hidden mb-4">
              <div className="relative">
                <img
                  src={thumbnails[currentImage] ?? mainImage}
                  alt="Property"
                  className="w-full h-[280px] sm:h-[320px] object-cover"
                />
                <button
                  type="button"
                  onClick={() =>
                    setCurrentImage((prev) => (prev === 0 ? thumbnails.length - 1 : prev - 1))
                  }
                  className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 border border-white/80 flex items-center justify-center text-gray-800 shadow-md hover:bg-white"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setCurrentImage((prev) => (prev === thumbnails.length - 1 ? 0 : prev + 1))
                  }
                  className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/95 border border-white/80 flex items-center justify-center text-gray-800 shadow-md hover:bg-white"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                  {thumbnails.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setCurrentImage(idx)}
                      className={`h-2 rounded-full transition-all ${
                        idx === currentImage ? 'w-6 bg-white' : 'w-2 bg-white/50'
                      }`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
              <div className="flex gap-3 p-3 sm:p-4 overflow-x-auto">
                {thumbnails.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setCurrentImage(idx)}
                    className={`shrink-0 rounded-lg overflow-hidden border-2 transition-colors ${
                      idx === currentImage ? 'border-[#A49776]' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="" className="w-[150px] h-[76px] object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Two-column: property + contact */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
              {/* Property card */}
              <div className="lg:col-span-8 space-y-4">
                <div className="bg-white border border-[#E5E7EB] rounded-none p-4 sm:p-5">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-normal"
                        style={{ ...font, backgroundColor: '#E8F5E9', color: '#2E7D32' }}
                      >
                        Active
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-full text-[10px] font-normal"
                        style={{ ...font, backgroundColor: '#F5EFE6', color: '#8B7355' }}
                      >
                        MLS
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => setIsLiked(!isLiked)}
                        className={`w-9 h-9 rounded-md border flex items-center justify-center ${
                          isLiked ? 'bg-red-50 border-red-200 text-red-500' : 'border-[#E5E7EB] text-gray-500 bg-white'
                        }`}
                        aria-label="Save listing"
                      >
                        <Heart className={`w-4 h-4 ${isLiked ? 'fill-current' : ''}`} />
                      </button>
                      <button
                        type="button"
                        className="w-9 h-9 rounded-md border border-[#E5E7EB] text-gray-500 bg-white flex items-center justify-center hover:bg-gray-50"
                        aria-label="Share listing"
                      >
                        <Share2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <h2 className="text-[36px] leading-[1.1] font-normal text-[#111827] mb-2" style={font}>
                    Modern Downtown Apartment
                  </h2>
                  <div className="flex items-start gap-2 text-[13px] text-[#6B7280] mb-5" style={font}>
                    <MapPin className="w-4 h-4 shrink-0 mt-0.5" />
                    <span>123 Main Street, New York, NY 10001</span>
                  </div>
                  <div className="text-[40px] leading-[1] font-normal text-[#22C55E]" style={font}>
                    $ 450,000
                  </div>

                  {/* Quick stats row */}
                  <div className="grid grid-cols-4 gap-3 mt-6 pt-5 border-t border-[#E5E7EB]">
                    <div className="text-center" style={font}>
                      <Bed className="w-4 h-4 mx-auto mb-2 text-gray-400" />
                      <div className="text-[28px] text-[#111827] leading-none">2</div>
                      <div className="text-[11px] text-gray-500 mt-2">Bedrooms</div>
                    </div>
                    <div className="text-center" style={font}>
                      <Bath className="w-4 h-4 mx-auto mb-2 text-gray-400" />
                      <div className="text-[28px] text-[#111827] leading-none">2</div>
                      <div className="text-[11px] text-gray-500 mt-2">Bathrooms</div>
                    </div>
                    <div className="text-center" style={font}>
                      <Maximize2 className="w-4 h-4 mx-auto mb-2 text-gray-400" />
                      <div className="text-[28px] text-[#111827] leading-none">1200</div>
                      <div className="text-[11px] text-gray-500 mt-2">Sq ft</div>
                    </div>
                    <div className="text-center" style={font}>
                      <MapPin className="w-4 h-4 mx-auto mb-2 text-gray-400" />
                      <div className="text-[28px] text-[#111827] leading-none">2020</div>
                      <div className="text-[11px] text-gray-500 mt-2">Year built</div>
                    </div>
                  </div>
                </div>

                {/* Property Description */}
                <div className="bg-white border border-[#E5E7EB] rounded-none p-4 sm:p-5">
                  <h3 className="text-[28px] font-normal text-[#111827] mb-3" style={font}>
                    Property Description
                  </h3>
                  <p className="text-[13px] leading-relaxed text-[#4B5563]" style={font}>
                    Beautiful modern apartment in the heart of downtown Manhattan. This stunning 2-bedroom, 2-bathroom
                    unit features high ceilings, floor-to-ceiling windows with breathtaking city views, and top-of-the-line
                    finishes throughout. The open-concept living and dining area is perfect for entertaining, while the gourmet
                    kitchen boasts stainless steel appliances and granite countertops. Building amenities include 24/7 concierge,
                    fitness center, rooftop terrace, and more.
                  </p>
                </div>

                {/* Features */}
                <div className="bg-white border border-[#E5E7EB] rounded-none p-4 sm:p-5">
                  <h3 className="text-[28px] font-normal text-[#111827] mb-4" style={font}>
                    Features & Amenities
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-10 gap-y-2">
                    {amenities.map((item) => (
                      <div key={item} className="flex items-center gap-2 text-[13px] text-[#4B5563]" style={font}>
                        <Check className="w-4 h-4 text-[#10B981] shrink-0" />
                        <span>{item}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Property Details */}
                <div className="bg-white border border-[#E5E7EB] rounded-none p-4 sm:p-5">
                  <h3 className="text-[28px] font-normal text-[#111827] mb-4" style={font}>
                    Property Details
                  </h3>
                  <div className="space-y-0 border border-[#E5E7EB] border-x-0">
                    <div className="grid grid-cols-2 py-3 text-[13px]" style={font}>
                      <div className="flex justify-between pr-6"><span className="text-[#6B7280]">Property Type</span><span>Apartment</span></div>
                      <div className="flex justify-between pl-6"><span className="text-[#6B7280]">Year Built</span><span>2020</span></div>
                    </div>
                    <div className="grid grid-cols-2 py-3 border-t border-[#E5E7EB] text-[13px]" style={font}>
                      <div className="flex justify-between pr-6"><span className="text-[#6B7280]">Parking</span><span>1 space</span></div>
                      <div className="flex justify-between pl-6"><span className="text-[#6B7280]">Days on Market</span><span>15 days</span></div>
                    </div>
                    <div className="grid grid-cols-2 py-3 border-t border-[#E5E7EB] text-[13px]" style={font}>
                      <div className="flex justify-between pr-6"><span className="text-[#6B7280]">Views</span><span>234</span></div>
                      <div className="flex justify-between pl-6"><span className="text-[#6B7280]">Lot Size</span><span>N/A</span></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact */}
              <div className="lg:col-span-4">
                <div className="bg-white border border-[#E5E7EB] rounded-none p-4 sm:p-5">
                  <h3 className="text-[24px] font-normal text-[#111827] mb-4" style={font}>
                    Contact Agent
                  </h3>
                  <div className="flex items-center gap-3 mb-5">
                    <img
                      src={getAvatarUrl('Sarah Johnson', 96)}
                      alt="Sarah Johnson"
                      className="w-14 h-14 rounded-full object-cover border border-[#E5E7EB]"
                    />
                    <div>
                      <p className="text-[14px] font-normal text-[#111827]" style={font}>
                        Sarah Johnson
                      </p>
                      <p className="text-[12px] text-[#6B7280]" style={font}>
                        Licensed Agent
                      </p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="w-full flex items-center gap-3 px-4 py-3 border border-[#E5E7EB] rounded-md text-[13px] text-gray-800 bg-white" style={font}>
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>+1 (234) 567-8901</span>
                    </div>
                    <div className="w-full flex items-center gap-3 px-4 py-3 border border-[#E5E7EB] rounded-md text-[13px] text-gray-800 bg-white" style={font}>
                      <Share2 className="w-4 h-4 text-gray-400" />
                      <span>sarah@bestrealhub.com</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="w-full mt-4 py-3 rounded-none text-[13px] font-medium text-white"
                    style={{ ...font, backgroundColor: tokens.accent }}
                  >
                    Schedule Showing
                  </button>
                  <button
                    type="button"
                    className="w-full mt-2 py-3 border border-[#E5E7EB] rounded-none text-[13px] text-[#111827] bg-white"
                    style={font}
                  >
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
