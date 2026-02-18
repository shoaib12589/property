import { useState } from 'react'
import {
  Box,
  Calendar,
  ChevronDown,
  Eye,
  FileDown,
} from 'lucide-react'
import { CustomerSidebar, CUSTOMER_SIDEBAR_OFFSET } from '@customer/components/CustomerSidebar'
import { CustomerHeader } from '@customer/components/CustomerHeader'
import { cn } from '@/lib/utils'

const tokens = {
  border: '#E5E7EB',
  golden: '#D4AF37',
  goldenDark: '#A49776',
  background: '#F8F7F4',
}

type OrderStatus = 'Completed' | 'On-hold' | 'Released' | 'Refunded'
type ServiceType = 'FSBO Listing' | 'MLS Listing' | 'Showing Request' | 'Full-Service Selling'

interface Order {
  id: string
  service: ServiceType
  property: string
  amount: string
  date: string
  status: OrderStatus
}

const orders: Order[] = [
  { id: 'ORD-001', service: 'FSBO Listing', property: 'Modern Downtown Apartment', amount: '$99.00', date: 'Dec 1, 2025', status: 'Completed' },
  { id: 'ORD-002', service: 'MLS Listing', property: 'Luxury Villa in Suburbs', amount: '$299.00', date: 'Nov 15, 2025', status: 'Completed' },
  { id: 'ORD-003', service: 'Showing Request', property: 'Beach House Paradise', amount: '$25.00', date: 'Dec 15, 2025', status: 'On-hold' },
  { id: 'ORD-004', service: 'Full-Service Selling', property: 'Cozy Family Home', amount: '$499.00', date: 'Nov 20, 2025', status: 'Released' },
  { id: 'ORD-005', service: 'Showing Request', property: 'Mountain Retreat Cabin', amount: '$25.00', date: 'Oct 10, 2025', status: 'Refunded' },
]

const summaryCards = [
  { label: 'Total Orders', value: '5' },
  { label: 'Total Spent', value: '$947.00', valueGreen: true },
  { label: 'Completed', value: '2' },
  { label: 'On Hold', value: '1' },
]

const filterTabs = [
  { key: 'all', label: 'All' },
  { key: 'fsbo', label: 'FSBO' },
  { key: 'mls', label: 'MLS' },
  { key: 'full-service', label: 'Full-Service' },
  { key: 'showings', label: 'Showings' },
]

const dateFilterOptions = ['Last 7 days', 'Last 30 days', 'Last 90 days']

function statusBadgeClass(status: OrderStatus): string {
  switch (status) {
    case 'Completed':
      return 'bg-green-100 text-green-800'
    case 'On-hold':
      return 'bg-amber-100 text-amber-800'
    case 'Released':
      return 'bg-sky-100 text-sky-800'
    case 'Refunded':
      return 'bg-gray-100 text-gray-700'
    default:
      return 'bg-gray-100 text-gray-700'
  }
}

export function OrdersHistory() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState('all')
  const [dateFilter, setDateFilter] = useState('Last 30 days')
  const [dateDropdownOpen, setDateDropdownOpen] = useState(false)

  return (
    <div
      className="h-screen max-h-[100dvh] flex overflow-hidden"
      style={{ backgroundColor: tokens.background, fontFamily: "'Gilroy', sans-serif" }}
    >
      <CustomerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={cn('flex-1 flex flex-col min-w-0', CUSTOMER_SIDEBAR_OFFSET, 'h-screen max-h-[100dvh] overflow-hidden')}
      >
        <CustomerHeader title="Orders History" onMenuClick={() => setSidebarOpen(true)} showUserDropdown />

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Orders & Services History</h2>
              <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                View all your transactions and service orders
              </p>
            </div>
            <div className="relative shrink-0">
              <button
                type="button"
                onClick={() => setDateDropdownOpen((o) => !o)}
                className="flex items-center gap-2 px-4 py-2 rounded-lg border bg-white font-medium text-gray-700 hover:bg-gray-50"
                style={{ borderColor: tokens.border }}
              >
                {dateFilter}
                <ChevronDown className="w-4 h-4" strokeWidth={2} />
              </button>
              {dateDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-10" onClick={() => setDateDropdownOpen(false)} aria-hidden="true" />
                  <div
                    className="absolute right-0 top-full mt-1 py-1 bg-white rounded-lg border shadow-lg z-20 min-w-[140px]"
                    style={{ borderColor: tokens.border }}
                  >
                    {dateFilterOptions.map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => {
                          setDateFilter(option)
                          setDateDropdownOpen(false)
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
          </div>

          {/* Summary cards */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {summaryCards.map((card) => (
              <div
                key={card.label}
                className="rounded-xl border p-4 bg-white"
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

          {/* Filter tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {filterTabs.map((tab) => {
              const isActive = activeTab === tab.key
              return (
                <button
                  key={tab.key}
                  type="button"
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                    isActive ? 'text-gray-900' : 'text-gray-700 bg-white border hover:bg-gray-50'
                  )}
                  style={
                    isActive
                      ? { backgroundColor: tokens.goldenDark }
                      : { borderColor: tokens.border }
                  }
                >
                  {tab.label}
                </button>
              )
            })}
          </div>

          {/* Orders table */}
          <div className="rounded-xl border overflow-hidden bg-white" style={{ borderColor: tokens.border }}>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b bg-gray-50/80" style={{ borderColor: tokens.border }}>
                    <th className="text-left font-semibold text-gray-800 py-3 px-4">Order ID</th>
                    <th className="text-left font-semibold text-gray-800 py-3 px-4">Service</th>
                    <th className="text-left font-semibold text-gray-800 py-3 px-4">Property</th>
                    <th className="text-left font-semibold text-gray-800 py-3 px-4">Amount</th>
                    <th className="text-left font-semibold text-gray-800 py-3 px-4">Date</th>
                    <th className="text-left font-semibold text-gray-800 py-3 px-4">Status</th>
                    <th className="text-left font-semibold text-gray-800 py-3 px-4 w-24">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order) => (
                    <tr
                      key={order.id}
                      className="border-b last:border-b-0 hover:bg-gray-50/50"
                      style={{ borderColor: tokens.border }}
                    >
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-2 font-medium text-gray-900">
                          <Box className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                          {order.id}
                        </span>
                      </td>
                      <td className="py-3 px-4 font-medium text-gray-700">{order.service}</td>
                      <td className="py-3 px-4 font-medium text-gray-700">{order.property}</td>
                      <td className="py-3 px-4 font-semibold text-green-600">{order.amount}</td>
                      <td className="py-3 px-4">
                        <span className="flex items-center gap-2 font-medium text-gray-700">
                          <Calendar className="w-4 h-4 text-gray-400 shrink-0" strokeWidth={1.5} />
                          {order.date}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <span
                          className={cn(
                            'inline-flex px-2.5 py-1 rounded-full text-xs font-semibold',
                            statusBadgeClass(order.status)
                          )}
                        >
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                            aria-label="View"
                          >
                            <Eye className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                          <button
                            type="button"
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                            aria-label="Download"
                          >
                            <FileDown className="w-4 h-4" strokeWidth={1.5} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
