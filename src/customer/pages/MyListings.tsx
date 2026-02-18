import { useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Plus,
  Bell,
  Menu,
  MapPin,
  DollarSign,
  Eye,
  User,
  FileDown,
  QrCode,
  Trash2,
  Pencil,
  RefreshCw,
} from 'lucide-react'
import { CustomerSidebar, CUSTOMER_SIDEBAR_OFFSET } from '@customer/components/CustomerSidebar'
import { Button } from '@/components/ui/button'
import { cn, getAvatarUrl } from '@/lib/utils'

const tokens = {
  border: '#E5E7EB',
  golden: '#D4AF37',
  background: '#F8F7F4',
}

type ListingType = 'FSBO' | 'MLS' | 'Full-Service'
type ListingStatus = 'Active' | 'Pending' | 'Draft' | 'Expired' | 'Sold'

interface Listing {
  id: string
  title: string
  address: string
  price: number
  views: number
  type: ListingType
  status: ListingStatus
  agentName: string
  created: string
  expires?: string
  image: string
}

const listings: Listing[] = [
  {
    id: '1',
    title: 'Modern Downtown Apartment',
    address: '123 Main St, New York, NY',
    price: 450000,
    views: 234,
    type: 'FSBO',
    status: 'Active',
    agentName: 'Sarah Johnson',
    created: 'Dec 1, 2025',
    expires: 'Mar 1, 2026',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop',
  },
  {
    id: '2',
    title: 'Luxury Villa in Suburbs',
    address: '456 Oak Ave, Los Angeles, CA',
    price: 1250000,
    views: 567,
    type: 'MLS',
    status: 'Active',
    agentName: 'Mike Chen',
    created: 'Nov 15, 2025',
    expires: 'Feb 15, 2026',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=500&h=300&fit=crop',
  },
  {
    id: '3',
    title: 'Cozy Family Home',
    address: '789 Pine Road, Chicago, IL',
    price: 325000,
    views: 145,
    type: 'Full-Service',
    status: 'Pending',
    agentName: 'Emma Davis',
    created: 'Nov 20, 2025',
    expires: 'Feb 20, 2026',
    image: 'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=500&h=300&fit=crop',
  },
  {
    id: '4',
    title: 'Beach House Paradise',
    address: '321 Ocean View, Miami, FL',
    price: 850000,
    views: 0,
    type: 'FSBO',
    status: 'Draft',
    agentName: '—',
    created: 'Dec 10, 2025',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=500&h=300&fit=crop',
  },
  {
    id: '5',
    title: 'Mountain Retreat Cabin',
    address: '654 Forest Trail, Denver, CO',
    price: 425000,
    views: 89,
    type: 'MLS',
    status: 'Expired',
    agentName: 'Tom Wilson',
    created: 'Aug 1, 2025',
    expires: 'Nov 1, 2025',
    image: 'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=500&h=300&fit=crop',
  },
  {
    id: '6',
    title: 'Urban Loft Studio',
    address: '987 City Center, Seattle, WA',
    price: 275000,
    views: 456,
    type: 'Full-Service',
    status: 'Sold',
    agentName: 'Lisa Brown',
    created: 'Sep 1, 2025',
    image: 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=500&h=300&fit=crop',
  },
]

const tabs: { key: string; label: string; count: number }[] = [
  { key: 'all', label: 'All Listings', count: 6 },
  { key: 'active', label: 'Active', count: 2 },
  { key: 'pending', label: 'Pending', count: 1 },
  { key: 'draft', label: 'Draft', count: 1 },
  { key: 'expired', label: 'Expired', count: 1 },
  { key: 'sold', label: 'Sold', count: 1 },
]

const BADGE_BG_DARK = '#1f2937'

function statusBadgeStyle(status: ListingStatus): string {
  switch (status) {
    case 'Active':
      return 'bg-green-600 text-white'
    case 'Pending':
      return 'text-white' // gold via inline style
    case 'Draft':
      return 'text-white' // dark badge via inline style
    case 'Expired':
      return 'bg-red-600 text-white'
    case 'Sold':
      return 'text-white' // dark badge via inline style
    default:
      return 'bg-gray-500 text-white'
  }
}

function statusBadgeBg(status: ListingStatus): { backgroundColor: string } | undefined {
  if (status === 'Pending') return { backgroundColor: tokens.golden }
  if (status === 'Draft' || status === 'Sold') return { backgroundColor: BADGE_BG_DARK }
  return undefined
}


function formatPrice(n: number): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(n)
}

function filterListingsByTab(listings: Listing[], tab: string): Listing[] {
  if (tab === 'all') return listings
  return listings.filter((l) => l.status.toLowerCase() === tab)
}

export function MyListings() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const filteredListings = filterListingsByTab(listings, activeTab)

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
            <h1 className="text-lg font-bold text-gray-900">My Listings</h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 ml-auto">
            <button className="relative p-2 rounded-lg hover:bg-gray-100" aria-label="Notifications">
              <Bell className="w-5 h-5 text-gray-600" strokeWidth={1.5} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
            </button>
            <span className="text-sm font-medium text-gray-800 hidden sm:inline">John Doe</span>
            <img src={getAvatarUrl('John Doe')} alt="" className="w-8 h-8 rounded-full object-cover flex-shrink-0" />
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">My Listings</h2>
              <p className="text-sm sm:text-base font-medium text-gray-600 mt-1">
                Manage all your property listings
              </p>
            </div>
            <Button
              asChild
              className="rounded-lg h-11 font-semibold text-white shrink-0 w-full sm:w-auto flex items-center justify-center gap-2"
              style={{ backgroundColor: tokens.golden }}
            >
              <Link to="/user/listings/create">
                <Plus className="w-5 h-5" strokeWidth={2} />
                Create New Listing
              </Link>
            </Button>
          </div>

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {tabs.map((tab) => {
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                    isActive
                      ? 'text-gray-900'
                      : 'text-gray-700 bg-white border hover:bg-gray-50'
                  )}
                  style={
                    isActive
                      ? { backgroundColor: tokens.golden }
                      : { borderColor: tokens.border }
                  }
                >
                  {tab.label} ({tab.count})
                </button>
              )
            })}
          </div>

          {/* Listing cards grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredListings.map((listing) => {
              const showDelete =
                listing.status === 'Pending' || listing.status === 'Draft'
              return (
                <article
                  key={listing.id}
                  className="bg-white rounded-xl overflow-hidden border shadow-sm"
                  style={{ borderColor: tokens.border }}
                >
                  {/* Property image with overlaid badges */}
                  <div className="relative aspect-[5/3] bg-gray-200 overflow-hidden">
                    <img
                      src={listing.image}
                      alt={listing.title}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent pointer-events-none" />
                    <div className="absolute top-3 left-3">
                      <span
                        className="text-xs font-semibold text-white px-2.5 py-1 rounded"
                        style={{ backgroundColor: '#1f2937' }}
                      >
                        {listing.type}
                      </span>
                    </div>
                    <div className="absolute top-3 right-3">
                      <span
                        className={cn(
                          'text-xs font-semibold text-white px-2.5 py-1 rounded',
                          statusBadgeStyle(listing.status)
                        )}
                        style={statusBadgeBg(listing.status)}
                      >
                        {listing.status}
                      </span>
                    </div>
                  </div>

                  {/* Card body */}
                  <div className="p-4 space-y-2.5">
                    <h3 className="text-base font-bold text-gray-900 leading-tight">
                      {listing.title}
                    </h3>
                    <p className="text-sm font-medium text-gray-600 flex items-start gap-1.5">
                      <MapPin className="w-4 h-4 shrink-0 mt-0.5 text-gray-500" strokeWidth={1.5} />
                      <span>{listing.address}</span>
                    </p>
                    <div className="flex items-center gap-3 flex-wrap">
                      <span className="text-lg font-bold text-green-600 flex items-center gap-1">
                        <DollarSign className="w-5 h-5 shrink-0" strokeWidth={2} />
                        {formatPrice(listing.price)}
                      </span>
                      <span className="text-sm font-medium text-gray-500 flex items-center gap-1">
                        <Eye className="w-4 h-4 shrink-0" strokeWidth={1.5} />
                        {listing.views} views
                      </span>
                    </div>
                    <p className="text-sm font-medium text-gray-700 flex items-center gap-1.5">
                      <User className="w-4 h-4 shrink-0 text-gray-500" strokeWidth={1.5} />
                      Agent: {listing.agentName}
                    </p>
                    <div className="text-xs font-medium text-gray-500 space-y-0.5">
                      <p>Created: {listing.created}</p>
                      {listing.expires && <p>Expires: {listing.expires}</p>}
                    </div>
                  </div>

                  {/* Action buttons: Expired = View/Edit/PDF, QR/Renew, Delete; Sold = View/Edit/PDF/QR only */}
                  {listing.status === 'Expired' ? (
                    <div className="px-4 pb-4 space-y-2">
                      <div className="grid grid-cols-3 gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-lg h-9 font-semibold border-gray-300 bg-white text-gray-800 hover:bg-gray-50 w-full"
                        >
                          <Eye className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                          View
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-lg h-9 font-semibold border-gray-300 bg-white text-gray-800 hover:bg-gray-50 w-full"
                        >
                          <Pencil className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                          Edit
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-lg h-9 font-semibold border-gray-300 bg-white text-gray-800 hover:bg-gray-50 w-full"
                        >
                          <FileDown className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                          PDF
                        </Button>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-lg h-9 font-semibold border-gray-300 bg-white text-gray-800 hover:bg-gray-50 w-full"
                        >
                          <QrCode className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                          QR Code
                        </Button>
                        <Button
                          type="button"
                          size="sm"
                          className="rounded-lg h-9 font-semibold bg-blue-500 text-white hover:bg-blue-600 w-full"
                        >
                          <RefreshCw className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                          Renew
                        </Button>
                      </div>
                      <Button
                        type="button"
                        variant="destructive"
                        size="sm"
                        className="rounded-lg h-9 font-semibold w-full"
                      >
                        <Trash2 className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                        Delete
                      </Button>
                    </div>
                  ) : listing.status === 'Sold' ? (
                    <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-lg h-9 font-semibold border-gray-300 bg-white text-gray-800 hover:bg-gray-50 w-full"
                      >
                        <Eye className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                        View
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-lg h-9 font-semibold border-gray-300 bg-white text-gray-800 hover:bg-gray-50 w-full"
                      >
                        <Pencil className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                        Edit
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-lg h-9 font-semibold border-gray-300 bg-white text-gray-800 hover:bg-gray-50 w-full"
                      >
                        <FileDown className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                        PDF
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-lg h-9 font-semibold border-gray-300 bg-white text-gray-800 hover:bg-gray-50 w-full"
                      >
                        <QrCode className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                        QR Code
                      </Button>
                    </div>
                  ) : (
                    <div className="px-4 pb-4 grid grid-cols-2 gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-lg h-9 font-semibold border-gray-300 bg-white text-gray-800 hover:bg-gray-50 w-full"
                      >
                        <Eye className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                        View
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-lg h-9 font-semibold border-gray-300 bg-white text-gray-800 hover:bg-gray-50 w-full"
                      >
                        <FileDown className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                        PDF
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className="rounded-lg h-9 font-semibold border-gray-300 bg-white text-gray-800 hover:bg-gray-50 w-full"
                      >
                        <QrCode className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                        QR Code
                      </Button>
                      {showDelete ? (
                        <Button
                          type="button"
                          variant="destructive"
                          size="sm"
                          className="rounded-lg h-9 font-semibold w-full"
                        >
                          <Trash2 className="w-4 h-4 mr-1.5 shrink-0" strokeWidth={1.5} />
                          Delete
                        </Button>
                      ) : (
                        <div />
                      )}
                    </div>
                  )}
                </article>
              )
            })}
          </div>
        </main>
      </div>
    </div>
  )
}
