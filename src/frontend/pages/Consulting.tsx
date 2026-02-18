import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'
import realSolucionesLogo from '@/assets/real-soluciones-logo.png'
import realmagicLogo from '@/assets/realmagic-logo.png'
import eldersLogo from '@/assets/elders-real-estate-logo.png'
import rbnLogo from '@/assets/rbn-logo.png'

const consultingServicesGrid = [
  { title: 'Summer House', category: 'Auto Mobile', date: 'Oct 19', readTime: '10 min read', image: 'https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&h=400&fit=crop' },
  { title: 'Relaxed Lodge', category: 'Auto Mobile', date: 'Oct 19', readTime: '10 min read', image: 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop' },
  { title: 'Green Hangout Place', category: 'Auto Mobile', date: 'Oct 19', readTime: '10 min read', image: 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=600&h=400&fit=crop' },
  { title: 'Relaxed Lodge', category: 'Auto Mobile', date: 'Oct 19', readTime: '10 min read', image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop' },
]

const weWorkWithImages = [
  'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=400&h=400&fit=crop',
  'https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?w=400&h=400&fit=crop',
]

export function Consulting() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F0' }}>
      {/* Hero */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1497366216548-37526070297c?w=1920&h=1080&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-[#5C4033]/60" />
        </div>

        <Header />

        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#eee9d2] uppercase leading-tight" style={{ fontFamily: "'Scheherazade New', serif" }}>
            CONSULTING
          </h1>
        </div>
      </section>

      {/* Consulting Services */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-8 sm:mb-10" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Consulting Services
          </h2>
          <p className="text-[#5C4033]/90 leading-relaxed mb-8 text-left" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.
            Nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {consultingServicesGrid.map((item, i) => (
              <div key={i} className="relative rounded-xl overflow-hidden bg-white shadow-sm">
                <div className="relative aspect-[4/3]">
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 flex flex-col gap-2">
                    <span className="inline-flex w-fit rounded-full bg-gray-200/90 px-3 py-1 text-xs font-medium text-[#5C4033]" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                      {item.category}
                    </span>
                    <h3 className="text-lg sm:text-xl font-bold text-white" style={{ fontFamily: "'Gilroy', sans-serif" }}>{item.title}</h3>
                    <p className="text-gray-300 text-sm" style={{ fontFamily: "'Gilroy', sans-serif" }}>{item.date} • {item.readTime}</p>
                    <Link to="/blog" className="inline-flex items-center gap-1 text-gray-300 hover:text-white text-sm mt-1 transition-colors" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                      Read More
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Real Estate Purchases / Construction / Investments - alternating Step 3 Consultation */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-7xl mx-auto space-y-20 sm:space-y-24 md:space-y-28">
          {/* Row 1: Step 3 LEFT, Text RIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-stretch min-h-[200px]">
            <div className="flex items-center justify-end overflow-visible" style={{ minHeight: '200px' }}>
              <div className="text-right w-full lg:w-auto lg:mr-[-5%]">
                <div className="inline-block">
                  <p className="text-[10rem] sm:text-[12rem] md:text-[12rem] font-extralight leading-[0.85] text-gray-400/50 select-none" style={{ fontFamily: "'Gilroy', sans-serif" }}>Step 3</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-gray-500/70 select-none -mt-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>Consultation</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center pl-0 lg:pl-8 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#333] mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>Real Estate Purchases</h2>
              <p className="text-[#555] leading-relaxed text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>

          {/* Row 2: Text LEFT, Step 3 RIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-stretch min-h-[200px]">
            <div className="flex flex-col justify-center order-2 lg:order-1 pr-0 lg:pr-8 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#333] mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>Real Estate Construction</h2>
              <p className="text-[#555] leading-relaxed text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
            <div className="flex items-center justify-start overflow-visible order-1 lg:order-2" style={{ minHeight: '200px' }}>
              <div className="text-left w-full lg:w-auto lg:ml-[-5%]">
                <div className="inline-block">
                  <p className="text-[10rem] sm:text-[12rem] md:text-[12rem] font-extralight leading-[0.85] text-gray-400/50 select-none" style={{ fontFamily: "'Gilroy', sans-serif" }}>Step 3</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-gray-500/70 select-none -mt-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>Consultation</p>
                </div>
              </div>
            </div>
          </div>

          {/* Row 3: Step 3 LEFT, Text RIGHT */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:gap-12 items-stretch min-h-[200px]">
            <div className="flex items-center justify-end overflow-visible" style={{ minHeight: '200px' }}>
              <div className="text-right w-full lg:w-auto lg:mr-[-5%]">
                <div className="inline-block">
                  <p className="text-[10rem] sm:text-[12rem] md:text-[12rem] font-extralight leading-[0.85] text-gray-400/50 select-none" style={{ fontFamily: "'Gilroy', sans-serif" }}>Step 3</p>
                  <p className="text-2xl sm:text-3xl font-semibold text-gray-500/70 select-none -mt-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>Consultation</p>
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-center pl-0 lg:pl-8 relative z-10">
              <h2 className="text-2xl sm:text-3xl font-bold text-[#333] mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>Real Estate Investments</h2>
              <p className="text-[#555] leading-relaxed text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Don't Simply Respond To Market Trends */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-12 sm:mb-16" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Dont Simply Respond To Market Trends
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#5C4033] mb-2" style={{ fontFamily: "'Scheherazade New', serif" }}>
                Start To Finish Development
              </h3>
              <p className="text-lg sm:text-xl font-bold text-[#5C4033] mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Expertise For The North Texas Region
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using content here, making it look like readable English.
              </p>
              <Button
                variant="outline"
                className="bg-[#EEE9D2] text-[#5C4033] border border-[#d4cfc0] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-md"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                Read More
              </Button>
            </div>
            <div>
              <img
                src="https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop"
                alt="Investment and development"
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover rounded-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* We Work With - 2x4 grid, centered overlay text */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5C4033] mb-3 sm:mb-4" style={{ fontFamily: "'Scheherazade New', serif" }}>
            We Work With
          </h2>
          <p className="text-gray-600 text-center mb-10 sm:mb-12 max-w-2xl mx-auto text-base" style={{ fontFamily: "'Scheherazade New', serif" }}>
            It is a long established fact that a reader will be distracted
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6">
            {weWorkWithImages.map((src, i) => (
              <div key={i} className="relative aspect-square overflow-hidden">
                <img src={src} alt="" className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-[#5C4033]/60" />
                <div className="absolute inset-0 flex items-center justify-center p-4">
                  <p className="text-white text-center text-sm sm:text-base font-medium leading-snug" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    Marketing Support And<br />Materials
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Professional Networks */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#5C4033] mb-3 sm:mb-4" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Our Professional Networks
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-8 sm:mb-10 max-w-2xl mx-auto" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit magna
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <div className="flex items-center justify-center p-4">
              <img src={realSolucionesLogo} alt="REAL RESOURCES" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src={realmagicLogo} alt="REALimage" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src={eldersLogo} alt="Elders Real Estate" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src={rbnLogo} alt="RBN" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] mb-4 sm:mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Contact Us
          </h2>
          <p className="text-gray-600 mb-8 sm:mb-10" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit
          </p>
          <Button
            variant="outline"
            className="bg-[#EEE9D2] text-[#5C4033] border border-[#d4cfc0] hover:bg-[#E8E8D0] font-medium text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4 rounded-md"
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
