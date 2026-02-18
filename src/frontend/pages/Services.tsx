import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Home, Users, Briefcase, Award, TrendingUp, Shield } from 'lucide-react'
import realSolucionesLogo from '@/assets/real-soluciones-logo.png'
import realmagicLogo from '@/assets/realmagic-logo.png'
import eldersLogo from '@/assets/elders-real-estate-logo.png'
import rbnLogo from '@/assets/rbn-logo.png'

// Services content blocks
const serviceBlocks = [
  {
    id: 1,
    title: 'Expertise For The North Texas Region',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop',
    imageLeft: true
  },
  {
    id: 2,
    title: 'Expertise For The North Texas Region',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop',
    imageLeft: false
  },
  {
    id: 3,
    title: 'Expertise For The North Texas Region',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop',
    imageLeft: true
  }
]

// Services we offer
const services = [
  { id: 1, title: 'Marketing Support And Materials', icon: Home },
  { id: 2, title: 'Training And Development', icon: Users },
  { id: 3, title: 'Career Growth Opportunities', icon: TrendingUp },
  { id: 4, title: 'Professional Certification', icon: Award },
  { id: 5, title: 'Work-Life Balance', icon: Shield },
  { id: 6, title: 'Competitive Compensation', icon: Briefcase },
]

export function Services() {
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
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#eee9d2] uppercase" style={{ fontFamily: "'Scheherazade New', serif" }}>
            SERVICES
          </h1>
        </div>
      </section>

      {/* Our Services Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#5C4033]" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Our <b> Services </b>
            </h2>
          </div>

          {/* Service Blocks */}
          <div className="space-y-16 sm:space-y-20 md:space-y-24">
            {serviceBlocks.map((block) => (
              <div 
                key={block.id}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center`}
              >
                {/* Image */}
                <div className={block.imageLeft ? 'order-1' : 'order-2'}>
                  <img 
                    src={block.image} 
                    alt={block.title} 
                    className="w-full h-[350px] object-cover"
                  />
                </div>

                {/* Text Content */}
                <div className={`${block.imageLeft ? 'order-2' : 'order-1'} flex flex-col justify-start`}>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4033] mb-4 sm:mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
                    {block.title}
                  </h3>
                  <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {block.text}
                  </p>
                  <div className="mt-auto">
                    <Button 
                      variant="outline"
                      className="bg-[#EEE9D2] text-[#5C4033] border-[#7A7363] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-8 py-3"
                      style={{ fontFamily: "'Gilroy', sans-serif" }}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services We Offer Section */}
      <section className="py-16 sm:py-16 md:py-16 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#5C4033] mb-4 sm:mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Services We Offer
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              It is a long established fact that a reader will be distracted
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {services.map((service) => {
              const IconComponent = service.icon
              return (
                <div 
                  key={service.id} 
                  className="bg-[#F9F6E9] rounded-lg p-6 sm:p-8 flex flex-col items-center text-center border border-gray-200"
                >
                  {/* Icon Circle */}
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#EEE9D2] flex items-center justify-center mb-4 sm:mb-6">
                    <IconComponent className="w-8 h-8 sm:w-10 sm:h-10 text-[#5C4033]" />
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-base sm:text-lg font-bold text-[#5C4033]" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {service.title}
                  </h3>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Our Professional Networks Section */}
      <section className="py-16 sm:py-16 md:py-16 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#5C4033] mb-3 sm:mb-4" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Our <b> Professional Networks </b>
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 md:mb-10" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Discover homes located in vibrant areas with everything you need nearby.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
            <div className="flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
              <img src={realSolucionesLogo} alt="REAL SOLUTIONS" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
              <img src={realmagicLogo} alt="REALmagic" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
              <img src={eldersLogo} alt="Elders Real Estate" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
              <img src={rbnLogo} alt="RBN Real Broadcast Network" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Become Our Partner Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#f5f4e5]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-2xl lg:text-4xl font-medium text-[#5C4033] mb-6 sm:mb-8" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Become <br /> <b> Our Partner </b>
          </h2>
          <Button
            variant="outline"
            className="bg-transparent text-[#5C4033] border-[#7A7363] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4 rounded-none"
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
