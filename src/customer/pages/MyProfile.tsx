import { useState } from 'react'
import { User, Mail, Phone, MapPin, Bell, Menu, Lock, Eye, EyeOff } from 'lucide-react'
import { CustomerSidebar, CUSTOMER_SIDEBAR_OFFSET } from '@customer/components/CustomerSidebar'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { getAvatarUrl } from '@/lib/utils'

const tokens = {
  border: '#E5E7EB',
  golden: '#D4AF37',
  goldenDark: '#B8962E',
}

export function MyProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<'personal' | 'password'>('personal')
  const [showCurrentPassword, setShowCurrentPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden bg-[#F8F9FA]" style={{ fontFamily: "'Gilroy', sans-serif" }}>
      <CustomerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className={`flex-1 flex flex-col min-w-0 ${CUSTOMER_SIDEBAR_OFFSET} h-screen max-h-[100dvh] overflow-hidden`}>
        {/* Top Bar */}
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
            <h1 className="text-lg font-bold text-gray-900">My Profile</h1>
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

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden">
          {/* Profile summary header - golden gradient */}
          <div
            className="w-full px-4 sm:px-6 lg:px-8 py-8 sm:py-10"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #B8962E 50%, #9A7B24 100%)',
            }}
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-white">John Doe</h2>
            <p className="text-white text-sm sm:text-base font-medium mt-1">Hareljohn@gmail.com</p>
            <p className="text-white text-sm sm:text-base font-medium mt-0.5">+1 234 567 8900</p>
          </div>

          {/* Tabs */}
          <div className="bg-white border-b px-4 sm:px-6 lg:px-8" style={{ borderColor: tokens.border }}>
            <div className="flex gap-8">
              <button
                type="button"
                onClick={() => setActiveTab('personal')}
                className={`py-4 text-sm border-b-2 transition-colors ${
                  activeTab === 'personal'
                    ? 'text-gray-900 border-gray-900 font-semibold'
                    : 'text-gray-700 border-transparent font-medium hover:text-gray-900'
                }`}
              >
                Personal Information
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('password')}
                className={`py-4 text-sm border-b-2 transition-colors ${
                  activeTab === 'password'
                    ? 'text-gray-900 border-gray-900 font-semibold'
                    : 'text-gray-700 border-transparent font-medium hover:text-gray-900'
                }`}
              >
                Change Password
              </button>
            </div>
          </div>

          {/* Form section */}
          <div className="p-4 sm:p-6 lg:p-8 bg-white">
            {activeTab === 'personal' && (
              <form className="max-w-3xl">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Full Name</label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <Input
                        defaultValue="John Doe"
                        className="pl-10 h-11 rounded-lg border-gray-300 font-medium text-gray-900"
                        style={{ borderColor: tokens.border }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Email Address</label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <Input
                        type="email"
                        defaultValue="Hareljohn@gmail.com"
                        className="pl-10 h-11 rounded-lg border-gray-300 font-medium text-gray-900"
                        style={{ borderColor: tokens.border }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Phone Number</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <Input
                        type="tel"
                        defaultValue="+1 234 567 8900"
                        className="pl-10 h-11 rounded-lg border-gray-300 font-medium text-gray-900"
                        style={{ borderColor: tokens.border }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Street Address</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <Input
                        defaultValue="123 Main Street"
                        className="pl-10 h-11 rounded-lg border-gray-300 font-medium text-gray-900"
                        style={{ borderColor: tokens.border }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">City</label>
                    <Input
                      defaultValue="New York"
                      className="h-11 rounded-lg border-gray-300 font-medium text-gray-900"
                      style={{ borderColor: tokens.border }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">State</label>
                    <Input
                      defaultValue="NY"
                      className="h-11 rounded-lg border-gray-300 font-medium text-gray-900"
                      style={{ borderColor: tokens.border }}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Zip Code</label>
                    <Input
                      defaultValue="10001"
                      className="h-11 rounded-lg border-gray-300 font-medium text-gray-900"
                      style={{ borderColor: tokens.border }}
                    />
                  </div>
                </div>

                <div className="flex flex-wrap gap-3 justify-end mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    className="rounded-lg px-6 h-11 font-semibold bg-white border-2 border-gray-400 text-gray-900 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-lg px-6 h-11 font-semibold text-white hover:opacity-95"
                    style={{ backgroundColor: tokens.golden }}
                  >
                    Save Changes
                  </Button>
                </div>
              </form>
            )}

            {activeTab === 'password' && (
              <form className="max-w-xl" onSubmit={(e) => e.preventDefault()}>
                <div className="space-y-5 sm:space-y-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Current Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <Input
                        type={showCurrentPassword ? 'text' : 'password'}
                        placeholder="Enter current password"
                        className="pl-10 pr-12 h-11 rounded-lg border-gray-300 font-medium text-gray-900 placeholder:text-gray-400"
                        style={{ borderColor: tokens.border }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowCurrentPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showCurrentPassword ? 'Hide password' : 'Show password'}
                      >
                        {showCurrentPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <Input
                        type={showNewPassword ? 'text' : 'password'}
                        placeholder="Enter new password"
                        className="pl-10 pr-12 h-11 rounded-lg border-gray-300 font-medium text-gray-900 placeholder:text-gray-400"
                        style={{ borderColor: tokens.border }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowNewPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showNewPassword ? 'Hide password' : 'Show password'}
                      >
                        {showNewPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Confirm New Password</label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" strokeWidth={1.5} />
                      <Input
                        type={showConfirmPassword ? 'text' : 'password'}
                        placeholder="Confirm new password"
                        className="pl-10 pr-12 h-11 rounded-lg border-gray-300 font-medium text-gray-900 placeholder:text-gray-400"
                        style={{ borderColor: tokens.border }}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword((p) => !p)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                      >
                        {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </button>
                    </div>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3 justify-end mt-8">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setActiveTab('personal')}
                    className="rounded-lg px-6 h-11 font-semibold bg-white border-2 border-gray-400 text-gray-900 hover:bg-gray-50"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="rounded-lg px-6 h-11 font-semibold text-white hover:opacity-95"
                    style={{ backgroundColor: tokens.golden }}
                  >
                    Update Password
                  </Button>
                </div>
              </form>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
