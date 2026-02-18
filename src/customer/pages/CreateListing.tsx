import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { MapPin, BedDouble, Bath, Square, Upload, Check } from 'lucide-react'
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

const steps = [
  { number: 1, label: 'Listing Type' },
  { number: 2, label: 'Basic Details' },
  { number: 3, label: 'Features' },
  { number: 4, label: 'Media' },
  { number: 5, label: 'Preview' },
]

const listingTypes = [
  {
    id: 'fsbo',
    title: 'FSBO (For Sale By Owner)',
    subtitle: 'List your property yourself with basic support',
    price: '$99',
    features: ['Basic listing', 'Photo upload', '30-day duration', 'Email support'],
  },
  {
    id: 'mls',
    title: 'MLS Listing',
    subtitle: 'Get listed on Multiple Listing Service',
    price: '$299',
    features: [
      'MLS inclusion',
      'Professional photos',
      '60-day duration',
      'Priority support',
      'Virtual tour',
    ],
  },
  {
    id: 'full-service-selling',
    title: 'Full-Service Selling',
    subtitle: 'Complete service with dedicated agent',
    price: '$99',
    features: [
      'Dedicated agent',
      'Professional staging',
      'Premium photography',
      '90-day duration',
      'Virtual tours available',
    ],
  },
  {
    id: 'full-service-buying',
    title: 'Full-Service Buying',
    subtitle: 'Agent-assisted property search and purchase',
    price: '$299',
    features: [
      'MLS inclusion',
      'Professional photos',
      '60-day duration',
      'Priority support',
      'Virtual tour',
    ],
  },
]

export function CreateListing() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [selectedType, setSelectedType] = useState<string | null>(null)
  const [basicDetails, setBasicDetails] = useState({
    propertyTitle: '',
    price: '450,000',
    propertyType: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    description: '',
  })
  const [features, setFeatures] = useState({
    bedrooms: '',
    bathrooms: '',
    squareFeet: '',
    yearBuilt: '',
    parkingSpaces: '',
    lotSizeAcres: '',
  })
  const [successModalOpen, setSuccessModalOpen] = useState(false)
  const navigate = useNavigate()

  return (
    <div
      className="h-screen max-h-[100dvh] flex overflow-hidden"
      style={{ backgroundColor: tokens.background, fontFamily: "'Gilroy', sans-serif" }}
    >
      <CustomerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div
        className={cn('flex-1 flex flex-col min-w-0', CUSTOMER_SIDEBAR_OFFSET, 'h-screen max-h-[100dvh] overflow-hidden')}
      >
        <CustomerHeader title="Create Listing" onMenuClick={() => setSidebarOpen(true)} />

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden p-4 sm:p-6 lg:p-8">
          {/* Progress stepper: completed/active = pill, inactive = circle + label */}
          <div className="mb-8 sm:mb-10">
            <div className="flex flex-wrap items-center gap-0">
              {steps.map((step, index) => {
                const isActive = step.number === currentStep
                const isCompleted = step.number < currentStep
                const isCurrentOrDone = isActive || isCompleted
                return (
                  <div key={step.number} className="flex items-center">
                    {isCurrentOrDone ? (
                      <div
                        className="flex items-center gap-2 px-4 py-2 rounded-md text-sm font-bold text-white shrink-0"
                        style={{ backgroundColor: tokens.goldenDark }}
                      >
                        <span>{step.number}</span>
                        <span>{step.label}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 shrink-0">
                        <div className="flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold text-gray-400 bg-gray-200">
                          {step.number}
                        </div>
                        <span className="text-sm font-semibold text-gray-400 hidden sm:inline">
                          {step.label}
                        </span>
                      </div>
                    )}
                    {index < steps.length - 1 && (
                      <div
                        className="w-4 sm:w-8 lg:w-12 h-0.5 bg-gray-200 shrink-0 mx-1 sm:mx-2"
                        aria-hidden="true"
                      />
                    )}
                  </div>
                )
              })}
            </div>
          </div>

          {currentStep === 1 && (
            <>
              {/* Step 1: Choose Listing Type */}
              <div className="mb-8">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Choose Listing Type</h2>
                <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                  Select the service that best fits your needs
                </p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 mb-10">
                {listingTypes.map((type) => {
                  const isSelected = selectedType === type.id
                  return (
                    <button
                      key={type.id}
                      type="button"
                      onClick={() => setSelectedType(type.id)}
                      className={cn(
                        'text-left p-5 sm:p-6 rounded-xl border-2 bg-white transition-colors',
                        isSelected ? 'border-[#A49776] ring-2 ring-[#A49776]/20' : 'border-gray-200 hover:border-gray-300'
                      )}
                    >
                      <div className="flex justify-between items-start gap-3 mb-3">
                        <div>
                          <h3 className="text-base font-bold text-gray-900">{type.title}</h3>
                          <p className="text-sm font-medium text-gray-500 mt-0.5">{type.subtitle}</p>
                        </div>
                        <span
                          className="text-lg font-bold shrink-0"
                          style={{ color: tokens.goldenDark }}
                        >
                          {type.price}
                        </span>
                      </div>
                      <ul className="space-y-1.5">
                        {type.features.map((feature) => (
                          <li
                            key={feature}
                            className="text-sm font-medium text-gray-600 flex items-center gap-2"
                          >
                            <span className="w-1.5 h-1.5 rounded-full bg-gray-400 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </button>
                  )
                })}
              </div>
            </>
          )}

          {currentStep === 2 && (
            <>
              {/* Step 2: Basic Property Details */}
              <div className="mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Basic Property Details</h2>
                <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                  Provide the essential information about your property
                </p>
              </div>
              <div className="space-y-4 max-w-full mb-10">
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Property Title</label>
                  <Input
                    placeholder="e.g., Modern Downtown Apartment"
                    value={basicDetails.propertyTitle}
                    onChange={(e) => setBasicDetails((p) => ({ ...p, propertyTitle: e.target.value }))}
                    className="rounded-lg h-11 bg-gray-50 border-gray-200 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Price</label>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 font-medium">$</span>
                    <Input
                      placeholder="0"
                      value={basicDetails.price}
                      onChange={(e) => setBasicDetails((p) => ({ ...p, price: e.target.value }))}
                      className="rounded-lg h-11 bg-gray-50 border-gray-200 font-medium pl-7"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Property Type</label>
                  <Input
                    placeholder="e.g., House, Condo, Apartment"
                    value={basicDetails.propertyType}
                    onChange={(e) => setBasicDetails((p) => ({ ...p, propertyType: e.target.value }))}
                    className="rounded-lg h-11 bg-gray-50 border-gray-200 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Street Address</label>
                  <div className="relative">
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 shrink-0" strokeWidth={1.5} />
                    <Input
                      placeholder="123 Main Street"
                      value={basicDetails.streetAddress}
                      onChange={(e) => setBasicDetails((p) => ({ ...p, streetAddress: e.target.value }))}
                      className="rounded-lg h-11 bg-gray-50 border-gray-200 font-medium pl-10"
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">City</label>
                    <Input
                      placeholder="City"
                      value={basicDetails.city}
                      onChange={(e) => setBasicDetails((p) => ({ ...p, city: e.target.value }))}
                      className="rounded-lg h-11 bg-gray-50 border-gray-200 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">State</label>
                    <Input
                      placeholder="State"
                      value={basicDetails.state}
                      onChange={(e) => setBasicDetails((p) => ({ ...p, state: e.target.value }))}
                      className="rounded-lg h-11 bg-gray-50 border-gray-200 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-800 mb-1.5">Zip Code</label>
                    <Input
                      placeholder="Zip Code"
                      value={basicDetails.zipCode}
                      onChange={(e) => setBasicDetails((p) => ({ ...p, zipCode: e.target.value }))}
                      className="rounded-lg h-11 bg-gray-50 border-gray-200 font-medium"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-800 mb-1.5">Description</label>
                  <Textarea
                    placeholder="Describe your property..."
                    value={basicDetails.description}
                    onChange={(e) => setBasicDetails((p) => ({ ...p, description: e.target.value }))}
                    className="rounded-lg min-h-[120px] bg-gray-50 border-gray-200 font-medium resize-y"
                  />
                </div>
              </div>
            </>
          )}

          {currentStep === 3 && (
            <>
              {/* Step 3: Property Features */}
              <div className="mb-10 rounded-xl border bg-white p-6 sm:p-8" style={{ borderColor: tokens.border }}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Property Features</h2>
                <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                  Add specific details about your property
                </p>
                <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Bedrooms</label>
                      <div className="relative">
                        <BedDouble className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 shrink-0" strokeWidth={1.5} />
                        <Input
                          type="number"
                          placeholder="0"
                          value={features.bedrooms}
                          onChange={(e) => setFeatures((p) => ({ ...p, bedrooms: e.target.value }))}
                          className="rounded-lg h-11 bg-white border-gray-200 font-medium pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Square Feet</label>
                      <div className="relative">
                        <Square className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 shrink-0" strokeWidth={1.5} />
                        <Input
                          type="number"
                          placeholder="0"
                          value={features.squareFeet}
                          onChange={(e) => setFeatures((p) => ({ ...p, squareFeet: e.target.value }))}
                          className="rounded-lg h-11 bg-white border-gray-200 font-medium pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Parking Spaces</label>
                      <Input
                        type="number"
                        placeholder="0"
                        value={features.parkingSpaces}
                        onChange={(e) => setFeatures((p) => ({ ...p, parkingSpaces: e.target.value }))}
                        className="rounded-lg h-11 bg-white border-gray-200 font-medium"
                      />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Bathrooms</label>
                      <div className="relative">
                        <Bath className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 shrink-0" strokeWidth={1.5} />
                        <Input
                          type="number"
                          placeholder="0"
                          value={features.bathrooms}
                          onChange={(e) => setFeatures((p) => ({ ...p, bathrooms: e.target.value }))}
                          className="rounded-lg h-11 bg-white border-gray-200 font-medium pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Year Built</label>
                      <Input
                        type="number"
                        placeholder="e.g., 2020"
                        value={features.yearBuilt}
                        onChange={(e) => setFeatures((p) => ({ ...p, yearBuilt: e.target.value }))}
                        className="rounded-lg h-11 bg-white border-gray-200 font-medium"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-800 mb-1.5">Lot Size (acres)</label>
                      <Input
                        type="text"
                        placeholder="0"
                        value={features.lotSizeAcres}
                        onChange={(e) => setFeatures((p) => ({ ...p, lotSizeAcres: e.target.value }))}
                        className="rounded-lg h-11 bg-white border-gray-200 font-medium"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {currentStep === 4 && (
            <>
              {/* Step 4: Upload Media */}
              <div className="mb-10 rounded-xl border bg-white p-6 sm:p-8" style={{ borderColor: tokens.border }}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Upload Media</h2>
                <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                  Add photos and videos of your property
                </p>
                <h3 className="text-base font-semibold text-gray-900 mt-6 mb-3">Property Images</h3>
                <label className="flex flex-col items-center justify-center min-h-[200px] sm:min-h-[240px] rounded-lg border-2 border-dashed border-gray-300 bg-gray-50/50 hover:bg-gray-50 cursor-pointer transition-colors">
                  <input
                    type="file"
                    accept="image/png,image/jpeg,image/jpg"
                    multiple
                    className="sr-only"
                  />
                  <Upload className="w-12 h-12 text-gray-400 mb-3" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-gray-700">Click to upload images</span>
                  <span className="text-xs font-medium text-gray-500 mt-1">PNG, JPG up to 10MB each</span>
                </label>
              </div>
            </>
          )}

          {currentStep === 5 && (
            <>
              {/* Step 5: Preview Listing */}
              <div className="mb-10 rounded-xl border bg-white p-6 sm:p-8" style={{ borderColor: tokens.border }}>
                <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Preview Listing</h2>
                <p className="text-sm sm:text-base font-medium text-gray-500 mt-1">
                  Review your listing before submitting
                </p>
                <div className="mt-6">
                  <h3 className="text-base font-bold text-gray-900 mb-3">Property Title</h3>
                  <p className="text-sm font-medium text-gray-700 mb-4">
                    {basicDetails.propertyTitle || 'Not provided'}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">
                        Type: {listingTypes.find((t) => t.id === selectedType)?.title ?? 'Not selected'}
                      </p>
                      <p className="font-medium text-gray-700">
                        Address:{' '}
                        {[basicDetails.streetAddress, basicDetails.city, basicDetails.state, basicDetails.zipCode]
                          .filter(Boolean)
                          .join(', ') || 'Not provided'}
                      </p>
                      <p className="font-medium text-gray-700">Bathrooms: {features.bathrooms || '0'}</p>
                    </div>
                    <div className="space-y-2">
                      <p className="font-medium text-gray-700">
                        Price: {basicDetails.price ? `$${basicDetails.price}` : '$0'}
                      </p>
                      <p className="font-medium text-gray-700">Bedrooms: {features.bedrooms || '0'}</p>
                      <p className="font-medium text-gray-700">Square Feet: {features.squareFeet || '0'}</p>
                    </div>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Bottom navigation: Back left; Next or Submit Listing right */}
          <div
            className="flex justify-between items-center gap-3 pt-4 border-t"
            style={{ borderColor: tokens.border }}
          >
            <Button
              type="button"
              variant="outline"
              onClick={() => (currentStep === 1 ? navigate('/user/listings') : setCurrentStep((s) => s - 1))}
              className="rounded-lg h-11 font-semibold bg-gray-100 border-gray-300 text-gray-900 hover:bg-gray-200"
            >
              Back
            </Button>
            {currentStep === 5 ? (
              <Button
                type="button"
                className="rounded-lg h-11 font-semibold text-white px-6 bg-green-600 hover:bg-green-700"
                onClick={() => setSuccessModalOpen(true)}
              >
                Submit Listing
              </Button>
            ) : (
              <Button
                type="button"
                className="rounded-lg h-11 font-semibold text-white px-6"
                style={{ backgroundColor: tokens.goldenDark }}
                onClick={() => setCurrentStep((s) => s + 1)}
              >
                Next
              </Button>
            )}
          </div>
        </main>
      </div>

      {/* Success modal after Submit Listing */}
      {successModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm"
          role="dialog"
          aria-modal="true"
          aria-labelledby="success-modal-title"
        >
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md p-8 text-center">
            <div className="flex justify-center mb-4">
              <div className="flex items-center justify-center w-16 h-16 rounded-full bg-green-500 text-white">
                <Check className="w-10 h-10" strokeWidth={2.5} />
              </div>
            </div>
            <h2 id="success-modal-title" className="text-xl font-bold text-gray-900 mb-2">
              Submitted Successfully
            </h2>
            <p className="text-sm font-medium text-gray-500 mb-6 leading-relaxed">
              It is a long established fact that a reader will be distracted
            </p>
            <Button
              type="button"
              className="w-full rounded-lg h-11 font-semibold bg-gray-900 text-white hover:bg-gray-800"
              onClick={() => {
                setSuccessModalOpen(false)
                navigate('/user/listings')
              }}
            >
              Okay
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}
