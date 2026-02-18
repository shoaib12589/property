import { useState } from 'react'
import {
  ChevronDown,
  MessageCircle,
  Mail,
  Phone,
  HelpCircle,
  Send,
  ChevronRight,
} from 'lucide-react'
import { CustomerSidebar, CUSTOMER_SIDEBAR_OFFSET } from '@customer/components/CustomerSidebar'
import { CustomerHeader } from '@customer/components/CustomerHeader'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { cn } from '@/lib/utils'

const tokens = {
  border: '#E5E7EB',
  golden: '#D4AF37',
  goldenDark: '#A49776',
  background: '#F8F7F4',
}

const supportCards = [
  {
    icon: MessageCircle,
    iconBg: 'bg-amber-100',
    iconColor: 'text-amber-700',
    title: 'Live Chat',
    detail: 'Chat with our support team',
    action: 'Start Chat',
    href: '#',
  },
  {
    icon: Mail,
    iconBg: 'bg-green-100',
    iconColor: 'text-green-700',
    title: 'Email Support',
    detail: 'support@estatehub.com',
    action: 'Send Email',
    href: 'mailto:support@estatehub.com',
  },
  {
    icon: Phone,
    iconBg: 'bg-violet-100',
    iconColor: 'text-violet-700',
    title: 'Phone Support',
    detail: '+1 (800) 123-4567',
    action: 'Call Now',
    href: 'tel:+18001234567',
  },
]

const priorityOptions = ['Low', 'Medium', 'High', 'Urgent']

const faqItems = [
  { q: 'How do I create a new listing?', a: 'Go to My Listings and click "Create New Listing". Follow the step-by-step wizard to add your property details, photos, and pricing.' },
  { q: 'What payment methods do you accept?', a: 'We accept all major credit cards (Visa, Mastercard, Amex), debit cards, and bank transfers. Manage your payment methods in the Payment Methods section.' },
  { q: 'How do I schedule a property showing?', a: 'Visit the Showings page to view available slots. Click "Schedule Showing" on any property and select your preferred date and time.' },
  { q: 'Can I edit my listing after it\'s published?', a: 'Yes. Go to My Listings, find your listing, and click "Edit". You can update details, photos, and pricing. Changes may require re-approval for MLS listings.' },
  { q: 'How do I contact my assigned agent?', a: 'You can reach your agent through the Messages section or use the contact details shown on the property detail page. They typically respond within 24 hours.' },
  { q: 'What happens if I cancel a listing?', a: 'If you cancel before publication, no fees apply. For published listings, cancellation policies vary by listing type. Contact support for specific cases.' },
]

export function Support() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null)
  const [subject, setSubject] = useState('')
  const [category, setCategory] = useState('')
  const [priority, setPriority] = useState('Low')
  const [description, setDescription] = useState('')

  return (
    <div
      className="h-screen max-h-[100dvh] flex overflow-hidden"
      style={{ backgroundColor: tokens.background, fontFamily: "'Gilroy', sans-serif" }}
    >
      <CustomerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={cn('flex-1 flex flex-col min-w-0', CUSTOMER_SIDEBAR_OFFSET, 'h-screen max-h-[100dvh] overflow-hidden')}
      >
        <CustomerHeader title="Support" onMenuClick={() => setSidebarOpen(true)} showUserDropdown />

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:px-8">
          {/* Help & Support */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Help & Support</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">Get help with your account and listings</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
              {supportCards.map((card) => {
                const Icon = card.icon
                return (
                  <div
                    key={card.title}
                    className="rounded-xl border bg-white p-5"
                    style={{ borderColor: tokens.border }}
                  >
                    <div className={cn('w-12 h-12 rounded-lg flex items-center justify-center mb-4', card.iconBg)}>
                      <Icon className={cn('w-6 h-6', card.iconColor)} strokeWidth={1.5} />
                    </div>
                    <h3 className="font-bold text-gray-900">{card.title}</h3>
                    <p className="text-sm font-medium text-gray-600 mt-1">{card.detail}</p>
                    <a
                      href={card.href}
                      className="inline-flex items-center gap-1 text-sm font-semibold text-gray-600 hover:text-gray-900 mt-3"
                    >
                      {card.action}
                      <ChevronRight className="w-4 h-4" strokeWidth={2} />
                    </a>
                  </div>
                )
              })}
            </div>
          </section>

          {/* Submit a Support Ticket */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-1">Submit a Support Ticket</h2>
            <div
              className="rounded-xl border bg-white p-6 mt-4"
              style={{ borderColor: tokens.border }}
            >
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-4">
                <div className="sm:col-span-2">
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Subject</label>
                  <Input
                    placeholder="Brief description of your issue"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="rounded-lg"
                    style={{ borderColor: tokens.border }}
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Category</label>
                  <Input
                    placeholder="Select category"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="rounded-lg"
                    style={{ borderColor: tokens.border }}
                  />
                </div>
              </div>
              <div className="mb-4">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Priority</label>
                <div className="flex flex-wrap gap-2">
                  {priorityOptions.map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setPriority(opt)}
                      className={cn(
                        'px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
                        priority === opt
                          ? 'text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      )}
                      style={priority === opt ? { backgroundColor: tokens.goldenDark } : undefined}
                    >
                      {opt}
                    </button>
                  ))}
                </div>
              </div>
              <div className="mb-6">
                <label className="block text-sm font-semibold text-gray-700 mb-2">Description</label>
                <Textarea
                  placeholder="Please provide detailed information about your issue..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                  className="rounded-lg resize-none"
                  style={{ borderColor: tokens.border }}
                />
              </div>
              <Button
                type="button"
                className="rounded-lg h-11 font-semibold text-white"
                style={{ backgroundColor: tokens.goldenDark }}
              >
                <Send className="w-4 h-4 mr-2 shrink-0" strokeWidth={1.5} />
                Submit Ticket
              </Button>
            </div>
          </section>

          {/* Frequently Asked Questions */}
          <section className="mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Frequently Asked Questions</h2>
            <div
              className="rounded-xl border bg-white overflow-hidden mt-4"
              style={{ borderColor: tokens.border }}
            >
              {faqItems.map((item, i) => (
                <div
                  key={i}
                  className="border-b last:border-b-0"
                  style={{ borderColor: tokens.border }}
                >
                  <button
                    type="button"
                    onClick={() => setExpandedFaq(expandedFaq === i ? null : i)}
                    className="w-full flex items-center gap-3 px-4 py-4 text-left hover:bg-gray-50/50 transition-colors"
                  >
                    <HelpCircle className="w-5 h-5 text-gray-500 shrink-0" strokeWidth={1.5} />
                    <span className="flex-1 font-semibold text-gray-900">{item.q}</span>
                    <ChevronDown
                      className={cn('w-5 h-5 text-gray-500 shrink-0 transition-transform', expandedFaq === i && 'rotate-180')}
                      strokeWidth={1.5}
                    />
                  </button>
                  {expandedFaq === i && (
                    <div className="px-4 pb-4 pl-12">
                      <p className="text-sm font-medium text-gray-600 leading-relaxed">{item.a}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>

          {/* Need More Help? */}
          <section>
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Need More Help?</h2>
            <p className="text-sm font-medium text-gray-500 mt-1">
              Check out our comprehensive knowledge base for detailed guides and tutorials.
            </p>
            <Button
              type="button"
              className="mt-4 rounded-lg h-11 font-semibold text-white"
              style={{ backgroundColor: tokens.goldenDark }}
            >
              Visit Knowledge Base
            </Button>
          </section>
        </main>
      </div>
    </div>
  )
}
