import { useState } from 'react'
import {
  Bell,
  Menu,
  ChevronDown,
  MapPin,
  DollarSign,
  Building2,
  BedDouble,
  Bath,
  Home,
  Pencil,
  Trash2,
  BellOff,
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

interface SavedSearch {
  id: string
  title: string
  createdDate: string
  location: string
  priceRange: string
  propertyType: string
  bedrooms: string
  bathrooms: string
  totalMatches: number
  newMatches?: number
  alertsEnabled: boolean
}

const savedSearches: SavedSearch[] = [
  {
    id: '1',
    title: 'Downtown Apartments',
    createdDate: 'Nov 15, 2025',
    location: 'New York, NY',
    priceRange: '$300,000 - $500,000',
    propertyType: 'Apartment',
    bedrooms: '2-3',
    bathrooms: '2+',
    totalMatches: 45,
    newMatches: 8,
    alertsEnabled: true,
  },
  {
    id: '2',
    title: 'Suburban Homes',
    createdDate: 'Nov 20, 2025',
    location: 'Los Angeles, CA',
    priceRange: '$500,000 - $800,000',
    propertyType: 'House',
    bedrooms: '3-4',
    bathrooms: '2.5+',
    totalMatches: 23,
    newMatches: 3,
    alertsEnabled: true,
  },
  {
    id: '3',
    title: 'Coastal Properties',
    createdDate: 'Dec 1, 2025',
    location: 'Miami, FL',
    priceRange: '$400,000 - $1,000,000',
    propertyType: 'Villa, Condo',
    bedrooms: '2+',
    bathrooms: '2+',
    totalMatches: 12,
    newMatches: 12,
    alertsEnabled: true,
  },
  {
    id: '4',
    title: 'Beach Properties',
    createdDate: 'Dec 5, 2025',
    location: 'Chicago, IL',
    priceRange: '$200,000 - $600,000',
    propertyType: 'Any',
    bedrooms: '1-2',
    bathrooms: '1+',
    totalMatches: 67,
    alertsEnabled: false,
  },
]

const summaryCards = [
  { label: 'Total Saved Searches', value: '4' },
  { label: 'Active Alerts', value: '3' },
  { label: 'New Matches', value: '23', valueGreen: true },
]

export function SavedSearches() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

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
            <h1 className="text-lg font-bold text-gray-900">Saved Searches</h1>
          </div>
          <div className="flex items-center gap-3 sm:gap-4">
            <button className="relative p-2 rounded-lg hover:bg-gray-100" aria-label="Notifications">
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
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Saved Searches</h2>
              <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                Manage your property search preferences and alerts
              </p>
            </div>
            <Button
              type="button"
              className="rounded-lg h-11 font-semibold text-white shrink-0 w-full sm:w-auto"
              style={{ backgroundColor: tokens.goldenDark }}
            >
              Create New Search
            </Button>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border bg-white p-4"
                style={{ borderColor: tokens.border }}
              >
                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                <p
                  className={cn(
                    'text-xl font-bold mt-1',
                    card.valueGreen && 'text-green-600'
                  )}
                >
                  {card.value}
                </p>
              </div>
            ))}
          </div>

          {/* Saved search list */}
          <div className="space-y-0">
            {savedSearches.map((search, index) => (
              <div
                key={search.id}
                className={cn(
                  'py-5 border-b last:border-b-0',
                  index === 0 && 'pt-0'
                )}
                style={{ borderColor: tokens.border }}
              >
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <h3 className="text-base font-bold text-gray-900">{search.title}</h3>
                      {search.newMatches != null && search.newMatches > 0 && (
                        <span className="inline-flex px-2 py-0.5 rounded text-xs font-semibold bg-green-100 text-green-800">
                          {search.newMatches} new
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-medium text-gray-500 mb-4">Created on {search.createdDate}</p>
                    <div className="grid grid-cols-1 xs:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-3 text-sm">
                      <p className="font-medium text-gray-700 flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                        {search.location}
                      </p>
                      <p className="font-medium text-gray-700 flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                        {search.priceRange}
                      </p>
                      <p className="font-medium text-gray-700 flex items-center gap-2">
                        <Building2 className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                        {search.propertyType}
                      </p>
                      <p className="font-medium text-gray-700 flex items-center gap-2">
                        <BedDouble className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                        {search.bedrooms}
                      </p>
                      <p className="font-medium text-gray-700 flex items-center gap-2">
                        <Bath className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                        {search.bathrooms}
                      </p>
                      <p className="font-medium text-gray-700 flex items-center gap-2">
                        <Home className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                        Total Matches: {search.totalMatches} properties
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <Button
                        type="button"
                        size="sm"
                        className="rounded-lg font-semibold text-white"
                        style={{ backgroundColor: tokens.goldenDark }}
                      >
                        View Matches
                      </Button>
                      {!search.alertsEnabled && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="rounded-lg font-semibold border-2"
                          style={{ borderColor: tokens.goldenDark, color: tokens.goldenDark }}
                        >
                          Enable Alerts
                        </Button>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 sm:pt-0">
                    <button
                      type="button"
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      aria-label="Alerts"
                      title={search.alertsEnabled ? 'Alerts on' : 'Alerts off'}
                    >
                      {search.alertsEnabled ? (
                        <Bell className="w-5 h-5" strokeWidth={1.5} style={{ color: tokens.goldenDark }} />
                      ) : (
                        <BellOff className="w-5 h-5" strokeWidth={1.5} />
                      )}
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                      aria-label="Edit"
                    >
                      <Pencil className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                    <button
                      type="button"
                      className="p-2 rounded-lg hover:bg-gray-100 text-red-600"
                      aria-label="Delete"
                    >
                      <Trash2 className="w-5 h-5" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  )
}
