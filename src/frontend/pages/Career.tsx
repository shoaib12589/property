import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Home, Users, Briefcase, Award, TrendingUp, Shield } from 'lucide-react'

// Benefits data
const benefits = [
  { id: 1, title: 'Marketing Support And Materials', icon: Home },
  { id: 2, title: 'Training And Development', icon: Users },
  { id: 3, title: 'Career Growth Opportunities', icon: TrendingUp },
  { id: 4, title: 'Professional Certification', icon: Award },
  { id: 5, title: 'Work-Life Balance', icon: Shield },
  { id: 6, title: 'Competitive Compensation', icon: Briefcase },
]

// Core Principles data
const corePrinciples = [
  {
    id: 1,
    title: 'Expertise For The North Texas Region',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop',
    imageLeft: true
  },
  {
    id: 2,
    title: 'Expertise For The North Texas Region',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    imageLeft: false
  },
  {
    id: 3,
    title: 'Expertise For The North Texas Region',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&h=600&fit=crop',
    imageLeft: true
  },
  {
    id: 4,
    title: 'Expertise For The North Texas Region',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800&h=600&fit=crop',
    imageLeft: false
  },
]

export function Career() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fbfff7' }}>
      {/* Hero Banner Section with Header Overlay */}
      <section className="relative h-[400px] sm:h-[400px] md:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&h=1080&fit=crop')`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <Header />

        {/* Hero Title */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#EEE9D2] uppercase" style={{ fontFamily: "'Scheherazade New', serif" }}>
            CAREER
          </h1>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5C4033] mb-6 sm:mb-8 leading-tight" style={{ fontFamily: "'Scheherazade New', serif" }}>
                Start To Finish Development Expertise For The North Texas Region
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <Button 
                variant="outline"
                className="bg-[#EEE9D2] text-[#5C4033] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                Learn More
              </Button>
            </div>

            {/* Right Column - Image */}
            <div>
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop" 
                alt="Professional Team" 
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Overview Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#5C4033] mb-4 sm:mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Benefits Overview
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              It is a long established fact that a reader will be distracted
            </p>
          </div>

          {/* Benefits Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {benefits.map((benefit) => {
              const IconComponent = benefit.icon
              return (
                <div 
                  key={benefit.id} 
                  className="bg-[#F5F4F0] rounded-lg p-6 sm:p-8 flex flex-col items-center text-center"
                >
                  {/* Icon Circle */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EEE9D2] flex items-center justify-center mb-4 sm:mb-6">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[#5C4033]" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-medium text-[#5C4033]" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {benefit.title}
                  </h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Core Principles Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#5C4033] mb-4 sm:mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Our Core Principles
            </h2>
          </div>

          {/* Core Principles Blocks */}
          <div className="space-y-12 sm:space-y-16 md:space-y-20">
            {corePrinciples.map((principle) => (
              <div 
                key={principle.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center ${
                  principle.imageLeft ? '' : 'lg:flex-row-reverse'
                }`}
              >
                {/* Image */}
                <div className={principle.imageLeft ? 'order-1' : 'order-2'}>
                  <img 
                    src={principle.image} 
                    alt={principle.title} 
                    className="w-full h-auto rounded-lg shadow-lg object-cover"
                  />
                </div>

                {/* Text Content */}
                <div className={principle.imageLeft ? 'order-2' : 'order-1'}>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4033] mb-4 sm:mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
                    {principle.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {principle.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We Are Hiring Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#f5f4e5]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#5C4033] mb-6 sm:mb-8" style={{ fontFamily: "'Scheherazade New', serif" }}>
            We Are Hiring
          </h2>
          <Button 
            variant="outline"
            className="bg-transparent text-[#70654B] border-[#7A7363] hover:bg-[#E8E8D0] font-bold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4 rounded-none"
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
