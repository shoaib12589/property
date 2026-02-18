import { useState } from 'react'
import { CreditCard, Plus, Trash2, User, X } from 'lucide-react'
import { CustomerSidebar, CUSTOMER_SIDEBAR_OFFSET } from '@customer/components/CustomerSidebar'
import { CustomerHeader } from '@customer/components/CustomerHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const tokens = {
  border: '#E5E7EB',
  golden: '#D4AF37',
}

const cards = [
  {
    id: '1',
    last4: '4242',
    brand: 'Visa',
    expires: '12/25',
    isDefault: true,
    gradient: 'linear-gradient(135deg, #D4AF37 0%, #B8962E 50%, #9A7B24 100%)',
  },
  {
    id: '2',
    last4: '5555',
    brand: 'Mastercard',
    expires: '06/26',
    isDefault: false,
    bg: '#5C4033',
  },
  {
    id: '3',
    last4: '3782',
    brand: 'Amex',
    expires: '03/27',
    isDefault: false,
    bg: '#8B7355',
  },
]

export function PaymentMethods() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [defaultId, setDefaultId] = useState('1')
  const [addCardOpen, setAddCardOpen] = useState(false)

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden bg-[#F8F9FA]" style={{ fontFamily: "'Gilroy', sans-serif" }}>
      <CustomerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={`flex-1 flex flex-col min-w-0 ${CUSTOMER_SIDEBAR_OFFSET} h-screen max-h-[100dvh] overflow-hidden`}>
        <CustomerHeader title="Payment Methods" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Payment Methods</h2>
              <p className="text-sm sm:text-base font-medium text-gray-600 mt-1">
                Manage your payment cards and billing information
              </p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => setAddCardOpen(true)}
              className="rounded-lg h-11 font-semibold border-2 border-gray-500 text-gray-800 bg-gray-100 hover:bg-gray-200 shrink-0 w-full sm:w-auto"
            >
              <Plus className="w-5 h-5 mr-2" strokeWidth={2} />
              Add New Card
            </Button>
          </div>

          {/* Add New Card modal */}
          {addCardOpen && (
            <div
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/30 backdrop-blur-sm"
              onClick={() => setAddCardOpen(false)}
              role="dialog"
              aria-modal="true"
              aria-labelledby="add-card-title"
            >
              <div
                className="bg-white rounded-2xl shadow-xl w-full max-w-md max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: tokens.border }}>
                  <h2 id="add-card-title" className="text-lg font-bold text-gray-900">
                    Add New Card
                  </h2>
                  <button
                    type="button"
                    onClick={() => setAddCardOpen(false)}
                    className="p-2 rounded-lg hover:bg-gray-100 text-gray-600"
                    aria-label="Close"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>
                <form
                  className="p-6 space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault()
                    setAddCardOpen(false)
                  }}
                >
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Card Number</label>
                    <div className="relative">
                      <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <Input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        maxLength={19}
                        className="pl-10 h-11 rounded-lg border-gray-300 font-medium text-gray-900 placeholder:text-gray-400"
                        style={{ borderColor: tokens.border }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Cardholder Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <Input
                        type="text"
                        placeholder="John Doe"
                        className="pl-10 h-11 rounded-lg border-gray-300 font-medium text-gray-900 placeholder:text-gray-400"
                        style={{ borderColor: tokens.border }}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Expiry Date</label>
                      <Input
                        type="text"
                        placeholder="MM/YY"
                        maxLength={5}
                        className="h-11 rounded-lg border-gray-300 font-medium text-gray-900 placeholder:text-gray-400"
                        style={{ borderColor: tokens.border }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">CVV</label>
                      <Input
                        type="password"
                        placeholder="123"
                        maxLength={4}
                        className="h-11 rounded-lg border-gray-300 font-medium text-gray-900 placeholder:text-gray-400"
                        style={{ borderColor: tokens.border }}
                      />
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      id="default-card"
                      className="rounded border-gray-400 text-[#D4AF37] focus:ring-[#D4AF37]"
                    />
                    <label htmlFor="default-card" className="text-sm font-medium text-gray-800 cursor-pointer">
                      Set as default payment method
                    </label>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => setAddCardOpen(false)}
                      className="flex-1 rounded-lg h-11 font-semibold bg-white border-2 border-gray-400 text-gray-900 hover:bg-gray-50"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className="flex-1 rounded-lg h-11 font-semibold text-white hover:opacity-95"
                      style={{ backgroundColor: tokens.golden }}
                    >
                      Add Card
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {cards.map((card) => {
              const isDefault = defaultId === card.id
              return (
                <div
                  key={card.id}
                  className="rounded-xl overflow-hidden min-h-[180px] flex flex-col text-white shadow-lg"
                  style={{
                    background: card.gradient ?? card.bg,
                  }}
                >
                  <div className="p-4 flex items-start justify-between">
                    <CreditCard className="w-8 h-8 opacity-90" strokeWidth={1.5} />
                    {isDefault && (
                      <span className="text-xs font-semibold bg-green-600 text-white px-2 py-1 rounded">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="px-4 flex-1">
                    <p className="font-semibold text-white/95 tracking-wider text-sm sm:text-base">
                      **** **** **** {card.last4}
                    </p>
                    <p className="font-medium text-white/90 text-sm mt-1">{card.brand}</p>
                    <p className="text-xs font-medium text-white/80 mt-0.5">Expires {card.expires}</p>
                  </div>
                  <div className="p-4 flex items-center justify-end gap-2">
                    {!isDefault && (
                      <button
                        type="button"
                        onClick={() => setDefaultId(card.id)}
                        className="text-xs font-semibold text-white/95 hover:text-white underline"
                      >
                        Set Default
                      </button>
                    )}
                    <button
                      type="button"
                      className="p-1.5 rounded-lg hover:bg-white/20 text-white"
                      aria-label="Delete card"
                    >
                      <Trash2 className="w-4 h-4" strokeWidth={1.5} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>

          <section className="mt-8 sm:mt-10">
            <h3 className="text-base font-bold text-gray-900 mb-2">Security Information</h3>
            <p className="text-sm font-medium text-gray-700 leading-relaxed max-w-3xl">
              All payment information is encrypted and securely stored. We never store your CVV. Your cards are
              protected by industry-standard security measures.
            </p>
          </section>
        </main>
      </div>
    </div>
  )
}
