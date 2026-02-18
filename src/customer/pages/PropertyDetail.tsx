import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  ChevronLeft,
  ChevronRight,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Home,
  Heart,
  Share2,
  Check,
  Phone,
  Mail,
  Calendar,
  MessageCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn, getAvatarUrl } from '@/lib/utils'

const tokens = {
  border: '#E5E7EB',
  golden: '#D4AF37',
  goldenDark: '#A49776',
  background: '#F8F7F4',
}

const galleryImages = [
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
  'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
]

const amenitiesLeft = [
  'Central Air Conditioning',
  'Hardwood Floors',
  'Granite Countertops',
  'In-unit Laundry',
  '24/7 Security',
  'Rooftop Terrace',
]
const amenitiesRight = [
  'High-Speed Internet',
  'Stainless Steel Appliances',
  'Walk-in Closets',
  'Balcony',
  'Fitness Center',
  'Concierge Service',
]

const propertyDescription =
  'Beautiful modern apartment in the heart of downtown Manhattan. This stunning 2-bedroom, 2-bathroom unit features high ceilings, floor-to-ceiling windows with breathtaking city views, and top-of-the-line finishes throughout. The open-concept living and dining area is perfect for entertaining, while the gourmet kitchen boasts stainless steel appliances and granite countertops. Building amenities include 24/7 concierge, fitness center, rooftop terrace, and more.'

export function PropertyDetail() {
  const [mainImageIndex, setMainImageIndex] = useState(0)

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ backgroundColor: tokens.background, fontFamily: "'Gilroy', sans-serif" }}
    >
      {/* Top bar: logo left, Sign In / Sign Up right (public header) */}
      <header
        className="shrink-0 z-20 bg-white border-b px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between"
        style={{ borderColor: tokens.border }}
      >
        <Link to="/" className="flex items-center gap-2" aria-label="Home">
          <div
            className="w-10 h-10 rounded-t-lg flex items-center justify-center shrink-0"
            style={{ backgroundColor: '#F5F0E8' }}
          >
            <Home className="w-5 h-5" style={{ color: tokens.golden }} strokeWidth={1.8} />
          </div>
        </Link>
        <div className="flex items-center gap-3">
          <Link to="/user/login">
            <Button
              type="button"
              variant="outline"
              className="rounded-lg h-10 px-5 font-semibold text-gray-600 border-gray-300 bg-white hover:bg-gray-50"
              style={{ borderColor: tokens.border }}
            >
              Sign In
            </Button>
          </Link>
          <Link to="/user/register">
            <Button
              type="button"
              className="rounded-lg h-10 px-5 font-semibold text-white"
              style={{ backgroundColor: tokens.golden }}
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </header>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          {/* Image slider - matches attachment: rounded corners, dot indicators, golden thumbnail highlight */}
          <div className="px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6">
            <div className="max-w-6xl mx-auto rounded-xl overflow-hidden bg-gray-900 shadow-lg">
              {/* Main image with rounded top corners */}
              <div className="relative aspect-[8/5] max-h-[50vh] w-full rounded-t-xl overflow-hidden">
                <img
                  src={galleryImages[mainImageIndex]}
                  alt="Property"
                  className="w-full h-full object-cover"
                />
                <button
                  type="button"
                  onClick={() => setMainImageIndex((i) => (i === 0 ? galleryImages.length - 1 : i - 1))}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="w-6 h-6" strokeWidth={2} />
                </button>
                <button
                  type="button"
                  onClick={() => setMainImageIndex((i) => (i === galleryImages.length - 1 ? 0 : i + 1))}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white text-gray-800 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                  aria-label="Next image"
                >
                  <ChevronRight className="w-6 h-6" strokeWidth={2} />
                </button>
              </div>

              {/* Thumbnail strip - active has golden-brown border and shadow */}
              <div className="flex gap-3 p-4 bg-white overflow-x-auto justify-center rounded-b-xl">
                {galleryImages.map((src, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setMainImageIndex(i)}
                    className={cn(
                      'shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all',
                      mainImageIndex === i
                        ? 'opacity-100 shadow-md'
                        : 'opacity-70 border-transparent hover:opacity-90'
                    )}
                    style={{
                      borderColor: mainImageIndex === i ? tokens.goldenDark : 'transparent',
                    }}
                  >
                    <img src={src} alt="" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="px-4 sm:px-6 lg:px-8 py-6 lg:py-10">
            <div className="max-w-6xl mx-auto flex flex-col lg:flex-row gap-10 lg:gap-12">
              {/* Left column */}
              <div className="flex-1 min-w-0 space-y-8">
                {/* Property Overview card */}
                <div
                  className="rounded-xl border bg-white p-6 sm:p-8"
                  style={{ borderColor: tokens.border }}
                >
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-4">
                    <div className="flex flex-wrap gap-2">
                      <span className="px-2.5 py-1 rounded text-sm font-semibold bg-green-600 text-white">
                        Active
                      </span>
                      <span className="px-2.5 py-1 rounded text-sm font-semibold bg-gray-200 text-gray-700">
                        MLS
                      </span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                      <button
                        className="p-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                        style={{ borderColor: tokens.border }}
                        aria-label="Save"
                      >
                        <Heart className="w-5 h-5" strokeWidth={1.5} />
                      </button>
                      <button
                        className="p-2.5 rounded-lg border border-gray-300 text-gray-600 hover:bg-gray-50 transition-colors"
                        style={{ borderColor: tokens.border }}
                        aria-label="Share"
                      >
                        <Share2 className="w-5 h-5" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">Modern Downtown Apartment</h2>
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-2 mb-4">
                    <MapPin className="w-4 h-4 shrink-0 text-gray-400" strokeWidth={1.5} />
                    123 Main Street, New York, NY 10001
                  </p>
                  <p className="text-2xl font-bold text-green-600 mb-6">$ 450,000</p>

                  {/* Key metrics - icon on top, label below */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                    {[
                      { icon: BedDouble, label: '2 Bedrooms' },
                      { icon: Bath, label: '2 Bathrooms' },
                      { icon: Square, label: '1200 Sq Ft' },
                      { icon: Home, label: '2020 Year Built' },
                    ].map(({ icon: Icon, label }) => (
                      <div
                        key={label}
                        className="rounded-lg border p-4 flex flex-col items-center justify-center gap-2 text-center"
                        style={{ borderColor: tokens.border }}
                      >
                        <Icon className="w-6 h-6 text-gray-500 shrink-0" strokeWidth={1.5} />
                        <span className="text-sm font-medium text-gray-700">{label}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-6 border-t" style={{ borderColor: tokens.border }} />
                </div>

                {/* Property Description */}
                <section
                  className="rounded-xl border bg-white p-6 sm:p-8"
                  style={{ borderColor: tokens.border }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-4">Property Description</h3>
                  <p className="text-sm font-medium text-gray-600 leading-relaxed">
                    {propertyDescription}
                  </p>
                </section>

                {/* Features & Amenities */}
                <section
                  className="rounded-xl border bg-white p-6 sm:p-8"
                  style={{ borderColor: tokens.border }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-5">Features & Amenities</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-3">
                    <div className="space-y-3">
                      {amenitiesLeft.map((item) => (
                        <p key={item} className="text-sm font-medium text-gray-700 flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 shrink-0" strokeWidth={2} />
                          {item}
                        </p>
                      ))}
                    </div>
                    <div className="space-y-3">
                      {amenitiesRight.map((item) => (
                        <p key={item} className="text-sm font-medium text-gray-700 flex items-center gap-3">
                          <Check className="w-5 h-5 text-green-600 shrink-0" strokeWidth={2} />
                          {item}
                        </p>
                      ))}
                    </div>
                  </div>
                </section>

                {/* Property Details */}
                <section
                  className="rounded-xl border bg-white p-6 sm:p-8"
                  style={{ borderColor: tokens.border }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-5">Property Details</h3>
                  <div className="rounded-lg border overflow-hidden" style={{ borderColor: tokens.border }}>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b bg-gray-50/50" style={{ borderColor: tokens.border }}>
                          <td className="py-4 px-5 font-medium text-gray-700 w-[1%] whitespace-nowrap">Property Type</td>
                          <td className="py-4 px-5 text-gray-600 font-medium">Apartment</td>
                          <td className="py-4 px-5 font-medium text-gray-700 w-[1%] whitespace-nowrap pl-8">Year Built</td>
                          <td className="py-4 px-5 text-gray-600 font-medium">2020</td>
                        </tr>
                        <tr className="border-b" style={{ borderColor: tokens.border }}>
                          <td className="py-4 px-5 font-medium text-gray-700">Parking</td>
                          <td className="py-4 px-5 text-gray-600 font-medium">1 space</td>
                          <td className="py-4 px-5 font-medium text-gray-700 pl-8">Days on Market</td>
                          <td className="py-4 px-5 text-gray-600 font-medium">15 days</td>
                        </tr>
                        <tr style={{ borderColor: tokens.border }}>
                          <td className="py-4 px-5 font-medium text-gray-700">Views</td>
                          <td className="py-4 px-5 text-gray-600 font-medium">234</td>
                          <td className="py-4 px-5 font-medium text-gray-700 pl-8">Lot Size</td>
                          <td className="py-4 px-5 text-gray-600 font-medium">N/A</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </section>
              </div>

              {/* Right sidebar - Contact Agent */}
              <div className="lg:w-[320px] shrink-0">
                <div
                  className="rounded-xl border bg-white p-6 sticky top-4"
                  style={{ borderColor: tokens.border }}
                >
                  <h3 className="text-lg font-bold text-gray-900 mb-5">Contact Agent</h3>
                  <div className="flex items-center gap-4 mb-5">
                    <img src={getAvatarUrl('Sarah Johnson')} alt="" className="w-14 h-14 rounded-full object-cover shrink-0" />
                    <div className="min-w-0">
                      <p className="font-bold text-gray-900">Sarah Johnson</p>
                      <p className="text-sm font-medium text-gray-500">Licensed Agent</p>
                    </div>
                  </div>
                  <div className="space-y-3 mb-5">
                    <div
                      className="flex items-center gap-3 rounded-lg border px-4 py-3 bg-gray-50/50"
                      style={{ borderColor: tokens.border }}
                    >
                      <Phone className="w-4 h-4 text-gray-500 shrink-0" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-gray-700">+1 (234) 567-8901</span>
                    </div>
                    <div
                      className="flex items-center gap-3 rounded-lg border px-4 py-3 bg-gray-50/50"
                      style={{ borderColor: tokens.border }}
                    >
                      <Mail className="w-4 h-4 text-gray-500 shrink-0" strokeWidth={1.5} />
                      <span className="text-sm font-medium text-gray-700">sarah@estatehub.com</span>
                    </div>
                  </div>
                  <div className="flex flex-col gap-3">
                    <Button
                      type="button"
                      className="w-full rounded-lg h-11 font-semibold text-white"
                      style={{ backgroundColor: tokens.goldenDark }}
                    >
                      <Calendar className="w-4 h-4 mr-2 shrink-0" strokeWidth={1.5} />
                      Schedule Showing
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      className="w-full rounded-lg h-11 font-semibold border-gray-300 text-gray-700 hover:bg-gray-50"
                      style={{ borderColor: tokens.border }}
                    >
                      <MessageCircle className="w-4 h-4 mr-2 shrink-0" strokeWidth={1.5} />
                      Send Message
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
    </div>
  )
}
