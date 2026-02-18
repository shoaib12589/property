import { useState } from 'react'
import {
  Upload,
  Search,
  FileStack,
  Folder,
  FileText,
  Eye,
  Download,
  Trash2,
} from 'lucide-react'
import { CustomerSidebar, CUSTOMER_SIDEBAR_OFFSET } from '@customer/components/CustomerSidebar'
import { CustomerHeader } from '@customer/components/CustomerHeader'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const tokens = {
  border: '#E5E7EB',
  golden: '#D4AF37',
  goldenDark: '#A49776',
  background: '#F8F7F4',
  activeBg: '#FEF3C7',
  activeColor: '#92400E',
}

const summaryCards = [
  { label: 'Total Documents', value: '6' },
  { label: 'Agreements', value: '2' },
  { label: 'Listings', value: '1' },
  { label: 'Reports', value: '1' },
]

const categories = [
  { key: 'all', label: 'All Documents', count: 6, icon: FileStack },
  { key: 'agreements', label: 'Agreements', count: 2, icon: FileStack },
  { key: 'listings', label: 'Listings', count: 1, icon: Folder },
  { key: 'reports', label: 'Reports', count: 1, icon: FileStack },
  { key: 'media', label: 'Media', count: 1, icon: Folder },
  { key: 'showings', label: 'Showings', count: 1, icon: FileStack },
]

interface DocumentItem {
  id: string
  name: string
  category: string
  property: string
  size: string
  date: string
  categoryKey: string
}

const documentsData: DocumentItem[] = [
  { id: '1', name: 'FSBO Listing Agreement.pdf', category: 'Agreement', property: 'Modern Downtown Apartment', size: '245 KB', date: 'Dec 1, 2025', categoryKey: 'agreements' },
  { id: '2', name: 'Property Inspection Report.pdf', category: 'Report', property: 'Luxury Villa in Suburbs', size: '1.2 MB', date: 'Nov 28, 2025', categoryKey: 'reports' },
  { id: '3', name: 'MLS Listing Details.pdf', category: 'Listing', property: 'Beach House Paradise', size: '512 KB', date: 'Nov 25, 2025', categoryKey: 'listings' },
  { id: '4', name: 'Full-Service Contract.pdf', category: 'Contract', property: 'Cozy Family Home', size: '890 KB', date: 'Nov 20, 2025', categoryKey: 'agreements' },
  { id: '5', name: 'Property Photos.zip', category: 'Media', property: 'Mountain Retreat Cabin', size: '15 MB', date: 'Nov 15, 2025', categoryKey: 'media' },
  { id: '6', name: 'Showing Schedule.pdf', category: 'Schedule', property: 'Urban Loft Studio', size: '128 KB', date: 'Nov 10, 2025', categoryKey: 'showings' },
]

export function Documents() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeCategory, setActiveCategory] = useState('all')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredDocuments =
    activeCategory === 'all'
      ? documentsData
      : documentsData.filter((d) => d.categoryKey === activeCategory)

  const searchFiltered =
    searchQuery.trim() === ''
      ? filteredDocuments
      : filteredDocuments.filter(
          (d) =>
            d.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            d.property.toLowerCase().includes(searchQuery.toLowerCase())
        )

  return (
    <div
      className="h-screen max-h-[100dvh] flex overflow-hidden"
      style={{ backgroundColor: tokens.background, fontFamily: "'Gilroy', sans-serif" }}
    >
      <CustomerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={cn('flex-1 flex flex-col min-w-0', CUSTOMER_SIDEBAR_OFFSET, 'h-screen max-h-[100dvh] overflow-hidden')}
      >
        <CustomerHeader title="Documents" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Documents & Contracts</h2>
              <p className="text-sm font-medium text-gray-500 mt-1">Access all your property-related documents.</p>
            </div>
            <Button
              type="button"
              variant="outline"
              className="rounded-lg h-10 px-4 font-semibold text-gray-700 shrink-0"
              style={{ borderColor: tokens.border }}
            >
              <Upload className="w-4 h-4 mr-2 shrink-0" strokeWidth={1.5} />
              Upload Document
            </Button>
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border bg-white p-4"
                style={{ borderColor: tokens.border }}
              >
                <p className="text-sm font-medium text-gray-500">{card.label}</p>
                <p className="text-xl font-bold text-gray-900 mt-1">{card.value}</p>
              </div>
            ))}
          </div>

          {/* Two columns: Categories + Document list */}
          <div className="flex flex-col lg:flex-row gap-6">
            {/* Left - Categories */}
            <div className="lg:w-56 shrink-0">
              <h3 className="text-sm font-bold text-gray-900 mb-3">Categories</h3>
              <nav className="rounded-xl border bg-white overflow-hidden" style={{ borderColor: tokens.border }}>
                {categories.map((cat) => {
                  const isActive = activeCategory === cat.key
                  const Icon = cat.icon
                  return (
                    <button
                      key={cat.key}
                      type="button"
                      onClick={() => setActiveCategory(cat.key)}
                      className={cn(
                        'w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-semibold transition-colors border-b last:border-b-0',
                        isActive ? 'text-amber-900' : 'text-gray-700 hover:bg-gray-50'
                      )}
                      style={{
                        ...(isActive ? { backgroundColor: tokens.activeBg } : {}),
                        borderColor: tokens.border,
                      }}
                    >
                      <Icon className="w-5 h-5 text-gray-500 shrink-0" strokeWidth={1.5} />
                      <span className="flex-1 truncate">{cat.label}</span>
                      <span className="text-gray-500 font-medium shrink-0">{cat.count}</span>
                    </button>
                  )
                })}
              </nav>
            </div>

            {/* Right - Document list */}
            <div className="flex-1 min-w-0">
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" strokeWidth={1.5} />
                <input
                  type="text"
                  placeholder="Search documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-9 pr-3 py-2.5 rounded-lg border text-sm font-medium placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-300"
                  style={{ borderColor: tokens.border }}
                />
              </div>
              <div className="rounded-xl border bg-white overflow-hidden" style={{ borderColor: tokens.border }}>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b bg-gray-50/50" style={{ borderColor: tokens.border }}>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Document Name</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Property</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Size</th>
                        <th className="text-left py-3 px-4 font-semibold text-gray-700">Date</th>
                        <th className="text-right py-3 px-4 font-semibold text-gray-700">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {searchFiltered.map((doc) => (
                        <tr
                          key={doc.id}
                          className="border-b last:border-b-0"
                          style={{ borderColor: tokens.border }}
                        >
                          <td className="py-3 px-4">
                            <div className="flex items-center gap-3">
                              <div className="w-9 h-9 rounded-lg bg-gray-100 flex items-center justify-center shrink-0">
                                <FileText className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
                              </div>
                              <div>
                                <p className="font-semibold text-gray-900">{doc.name}</p>
                                <p className="text-xs font-medium text-gray-500">{doc.category}</p>
                              </div>
                            </div>
                          </td>
                          <td className="py-3 px-4 font-medium text-gray-700">{doc.property}</td>
                          <td className="py-3 px-4 font-medium text-gray-600">{doc.size}</td>
                          <td className="py-3 px-4 font-medium text-gray-600">{doc.date}</td>
                          <td className="py-3 px-4 text-right">
                            <div className="flex items-center justify-end gap-2">
                              <button
                                type="button"
                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                aria-label="View"
                              >
                                <Eye className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                              <button
                                type="button"
                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-700"
                                aria-label="Download"
                              >
                                <Download className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                              <button
                                type="button"
                                className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-red-600"
                                aria-label="Delete"
                              >
                                <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {searchFiltered.length === 0 && (
                  <div className="py-12 text-center text-sm font-medium text-gray-500">
                    No documents match your filters.
                  </div>
                )}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
