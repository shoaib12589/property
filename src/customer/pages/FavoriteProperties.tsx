import { useState } from 'react'
import {
  Bell,
  Menu,
  ChevronDown,
  MapPin,
  BedDouble,
  Bath,
  Square,
  Eye,
  Trash2,
  Heart,
} from 'lucide-react'
import { CustomerSidebar, CUSTOMER_SIDEBAR_OFFSET } from '@customer/components/CustomerSidebar'
import { Button } from '@/components/ui/button'
import { cn, getAvatarUrl } from '@/lib/utils'

const tokens = {
  border: '#E5E7EB',
  golden: '#D4AF37',
  goldenDark: '#A49776',
  background: '#F8F7F4',
}

interface FavoriteProperty {
  id: string
  title: string
  address: string
  image: string
  savedDate: string
  price: number
  beds: number
  baths: number
  sqft: number
}

const favorites: FavoriteProperty[] = [
  { id: '1', title: 'Modern Downtown Apartment', address: '123 Main St, New York, NY', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=280&fit=crop', savedDate: 'Dec 15, 2025', price: 450000, beds: 2, baths: 2, sqft: 1200 },
  { id: '2', title: 'Luxury Villa in Suburbs', address: '456 Oak Avenue, Los Angeles, CA', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=280&fit=crop', savedDate: 'Dec 10, 2025', price: 1250000, beds: 4, baths: 3.5, sqft: 3500 },
  { id: '3', title: 'Beach House Paradise', address: '321 Ocean View, Miami, FL', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=280&fit=crop', savedDate: 'Dec 8, 2025', price: 850000, beds: 3, baths: 2.5, sqft: 2400 },
  { id: '4', title: 'Cozy Family Home', address: '789 Pine Road, Chicago, IL', image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=400&h=280&fit=crop', savedDate: 'Dec 5, 2025', price: 325000, beds: 3, baths: 2, sqft: 1800 },
  { id: '5', title: 'Urban Loft Studio', address: '987 City Center, Seattle, WA', image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=400&h=280&fit=crop', savedDate: 'Nov 28, 2025', price: 275000, beds: 1, baths: 1, sqft: 800 },
  { id: '6', title: 'Mountain Retreat Cabin', address: '654 Forest Trail, Denver, CO', image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=400&h=280&fit=crop', savedDate: 'Nov 25, 2025', price: 425000, beds: 2, baths: 2, sqft: 1500 },
]

const sortOptions = ['Most Recent', 'Price: Low to High', 'Price: High to Low', 'Newest First']

function formatPrice(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

export function FavoriteProperties() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [sortBy, setSortBy] = useState('Most Recent')
  const [sortOpen, setSortOpen] = useState(false)
  const [items, setItems] = useState(favorites)

  const handleRemove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.id !== id))
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
        <header
          className="shrink-0 z-20 bg-white border-b px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between gap-4"
          style={{ borderColor: tokens.border }}
        >
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6" />
            </button>
            <h1 className="text-lg font-bold text-gray-900">Favourite Properties</h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="p-2 rounded-lg hover:bg-gray-100" aria-label="Notifications">
              <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
            </button>
            <div className="flex items-center gap-1.5">
              <span className="text-sm font-medium text-gray-800 hidden sm:inline">John Doe</span>
              <button className="p-1 rounded hover:bg-gray-100" aria-label="User menu">
                <ChevronDown className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              </button>
            </div>
            <img src={getAvatarUrl('John Doe')} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Favourite Properties</h2>
              <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                Properties you&apos;ve saved for later
              </p>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div
              className="rounded-xl border bg-white px-5 py-4 flex flex-col min-w-[180px]"
              style={{ borderColor: tokens.border }}
            >
              <p className="text-sm font-medium text-gray-500">Total Saved Properties</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">{items.length}</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <button
                  type="button"
                  onClick={() => setSortOpen((o) => !o)}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white font-medium text-gray-700 hover:bg-gray-50"
                  style={{ borderColor: tokens.border }}
                >
                  {sortBy}
                  <ChevronDown className="w-4 h-4" strokeWidth={2} />
                </button>
                {sortOpen && (
                  <>
                    <div className="fixed inset-0 z-10" onClick={() => setSortOpen(false)} aria-hidden="true" />
                    <div
                      className="absolute right-0 top-full mt-1 py-1 bg-white rounded-lg border shadow-lg z-20 min-w-[180px]"
                      style={{ borderColor: tokens.border }}
                    >
                      {sortOptions.map((option) => (
                        <button
                          key={option}
                          type="button"
                          onClick={() => {
                            setSortBy(option)
                            setSortOpen(false)
                          }}
                          className="w-full text-left px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
                        >
                          {option}
                        </button>
                      ))}
                    </div>
                  </>
                )}
              </div>
              <span className="flex items-center justify-center w-10 h-10 rounded-lg text-red-500" aria-hidden="true">
                <Heart className="w-7 h-7 fill-current" strokeWidth={1.5} />
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {items.map((property) => (
              <article
                key={property.id}
                className="rounded-xl border bg-white overflow-hidden shadow-sm flex flex-col"
                style={{ borderColor: tokens.border }}
              >
                <div className="relative aspect-[400/280] bg-gray-200 shrink-0">
                  <img
                    src={property.image}
                    alt={property.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/70 text-white text-xs font-medium">
                    Saved {property.savedDate}
                  </div>
                </div>
                <div className="p-4 flex flex-col flex-1">
                  <h3 className="text-base font-bold text-gray-900">{property.title}</h3>
                  <p className="text-sm font-medium text-gray-500 flex items-center gap-1.5 mt-1">
                    <MapPin className="w-4 h-4 shrink-0 text-gray-400" strokeWidth={1.5} />
                    {property.address}
                  </p>
                  <p className="text-lg font-bold text-green-600 mt-2">{formatPrice(property.price)}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm font-medium text-gray-600">
                    <span className="flex items-center gap-1.5">
                      <BedDouble className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                      {property.beds} Beds
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Bath className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                      {property.baths} Baths
                    </span>
                    <span className="flex items-center gap-1.5">
                      <Square className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                      {property.sqft.toLocaleString()} sqft
                    </span>
                  </div>
                  <div className="flex gap-2 mt-4">
                    <Button
                      type="button"
                      size="sm"
                      className="flex-1 rounded-lg h-9 font-semibold bg-[#A49776] text-white hover:bg-[#A49776]-700"
                    >
                      <Eye className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                      View Details
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      className="rounded-lg h-9 font-semibold bg-white border-2 border-gray-400 text-gray-800 hover:bg-gray-50"
                      onClick={() => handleRemove(property.id)}
                    >
                      <Trash2 className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                      Remove
                    </Button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
