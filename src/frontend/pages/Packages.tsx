import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'

// Package data
const packages = [
  {
    id: 1,
    name: 'FSB Package',
    price: '$30',
    period: '/Free',
    description: "Get Torque's basic plan to optimise you lead generation process.",
    featuresLabel: 'Core Features',
    featuresSubLabel: 'Basic',
    features: [
      'Email addresses',
      'Phone numbers',
      'Unlimited Lists'
    ],
    gradient: false
  },
  {
    id: 2,
    name: 'MLS Package',
    price: '$276',
    period: '/Months',
    description: "Get Torque's basic plan to optimise you lead generation process.",
    featuresLabel: 'Core Features',
    featuresSubLabel: 'Boost Tools',
    features: [
      'Email addresses',
      'Phone numbers',
      'Unlimited Lists',
      'Export contacts',
      'Prospecting',
      '50MB Per File Attachment'
    ],
    gradient: false
  },
  {
    id: 3,
    name: 'Full Package',
    price: '$420',
    period: '/annual',
    description: "Get Torque's basic plan to optimise you lead generation process.",
    featuresLabel: 'Core Features',
    featuresSubLabel: 'Super Fuel',
    features: [
      'Email addresses',
      'Phone numbers',
      'Unlimited Lists',
      'Export contacts',
      'Prospecting',
      '50MB Per File Attachment',
      'Basic analytics'
    ],
    gradient: true
  }
]

export function Packages() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fbfff7' }}>
      {/* Hero Banner Section with Header Overlay */}
      <section className="relative h-[400px] sm:h-[400px] md:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop')`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <Header />

        {/* Hero Title */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#eee9d2] uppercase" style={{ fontFamily: "'Scheherazade New', serif" }}>
            PACKAGES
          </h1>
        </div>
      </section>

      {/* Pricing Packages Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#5C4033]" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Choose The Package That Works For You
            </h2>
          </div>

          {/* Pricing Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
            {packages.map((pkg) => {
              // Different background colors for each package
              let bgColor = ''
              if (pkg.id === 1) {
                bgColor = 'bg-[#A49776]' // Light olive green/khaki for FSB Package
              } else if (pkg.id === 2) {
                bgColor = 'bg-[#70654B]' // Darker brown for MLS Package
              } else {
                bgColor = 'bg-[#B79C4F]' // Golden yellow/ochre for Full Package
              }

              return (
                <div
                  key={pkg.id}
                  className={`rounded-lg p-6 sm:p-8 flex flex-col ${bgColor}`}
                >
                  {/* Package Name */}
                  <h3 className="text-xl sm:text-2xl font-bold text-white mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {pkg.name}
                  </h3>

                  {/* Price */}
                  <div className="mb-4">
                    <span className="text-4xl sm:text-5xl md:text-6xl font-bold text-white" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                      {pkg.price}
                    </span>
                    <span className="text-base sm:text-lg text-white/90 ml-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                      {pkg.period}
                    </span>
                  </div>

                  {/* Description */}
                  <p className="text-sm sm:text-base text-white mb-6" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {pkg.description}
                  </p>

                  {/* Features */}
                  <div className="mb-6 flex-1">
                    <div className="mb-3">
                      <span className="text-base sm:text-lg font-bold text-white" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                        {pkg.featuresLabel}
                      </span>
                      <span className="text-base sm:text-lg text-white ml-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                        {pkg.featuresSubLabel}
                      </span>
                    </div>
                    <ul className="space-y-2">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-2">
                          <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 text-[#FFD700] flex-shrink-0 mt-0.5" />
                          <span className="text-sm sm:text-base text-white" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                            {feature}
                          </span>
                        </li>
                      ))}
                  </ul>
                </div>

                {/* Button */}
                <Button
                  variant="outline"
                  className="bg-[#EEE9D2] text-[#5C4033] border-[#7A7363] md:py-6 rounded-none hover:bg-[#E8E8D0] font-bold text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 mt-auto"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  Get Started
                </Button>
              </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-16 sm:py-16 md:py-16 px-4 sm:px-6" style={{ backgroundColor: '#f5f4e5' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#5C4033] mb-4 sm:mb-4" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Right For You
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-[#5C4033] mb-5 sm:mb-5" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Note Sure Which Package is
          </p>
          <Button
            variant="outline"
            className="bg-transparent text-[#5C4033] border-[#7A7363] hover:bg-[#E8E8D0] rounded-none font-bold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            Contact Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
