import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import relocationHouseIcon from '@/assets/relocation-house-icon.svg'
import realSolucionesLogo from '@/assets/real-soluciones-logo.png'
import realmagicLogo from '@/assets/realmagic-logo.png'
import eldersLogo from '@/assets/elders-real-estate-logo.png'
import rbnLogo from '@/assets/rbn-logo.png'

const coreConstructionItems = [
  { id: 1, title: 'Marketing Support', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 2, title: 'Training And Development', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 3, title: 'Career Growth', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 4, title: 'Professional Certification', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 5, title: 'Work-Life Balance', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 6, title: 'Competitive Compensation', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
]

export function Construction() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F0' }}>
      {/* Hero */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=1920&h=1080&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-[#5C4033]/60" />
        </div>

        <Header />

        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#eee9d2] uppercase leading-tight" style={{ fontFamily: "'Scheherazade New', serif" }}>
            CONSTRUCTION
          </h1>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-12 sm:mb-16" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Company Overview
          </h2>

          {/* Block 1: Image left, text right */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-16 sm:mb-20">
            <div>
              <img
                src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop"
                alt="Construction workers with plans"
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover rounded-lg"
              />
            </div>
            <div>
              <h3 className="text-2xl sm:text-3xl font-bold text-[#5C4033] mb-2" style={{ fontFamily: "'Scheherazade New', serif" }}>
                Start To Finish Development
              </h3>
              <p className="text-lg sm:text-xl font-bold text-[#5C4033] mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Expertise For The North Texas Region
              </p>
              <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <Button
                variant="outline"
                className="bg-[#EEE9D2] text-[#5C4033] border border-[#d4cfc0] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-md"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                Learn More
              </Button>
            </div>
          </div>

          {/* Block 2: Light beige bg, text left, image right */}
          <div className="py-12 sm:py-16 px-4 sm:px-6 rounded-xl" style={{ backgroundColor: '#F5F4EB' }}>
            <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
              <div className="order-2 lg:order-1">
                <h3 className="text-2xl sm:text-3xl font-bold text-[#5C4033] mb-2" style={{ fontFamily: "'Scheherazade New', serif" }}>
                  Start To Finish
                </h3>
                <p className="text-lg sm:text-xl font-bold text-[#5C4033] mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  Expertise For The North
                </p>
                <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </p>
                <Button
                  variant="outline"
                  className="bg-[#EEE9D2] text-[#5C4033] border border-[#d4cfc0] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-md"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  Learn More
                </Button>
              </div>
              <div className="order-1 lg:order-2">
                <img
                  src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=800&h=600&fit=crop"
                  alt="Construction site"
                  className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services - alternating image left/right */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-12 sm:mb-16" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Our Services
          </h2>

          {[
            { image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=600&h=400&fit=crop', alt: 'Construction worker on scaffolding' },
            { image: 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop', alt: 'Hard hat on construction site' },
            { image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&h=400&fit=crop', alt: 'Construction site overhead view' },
          ].map((item, i) => {
            const imageLeft = i % 2 === 0
            return (
              <div key={i} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center mb-12 sm:mb-16 last:mb-0">
                <div className={imageLeft ? '' : 'lg:order-2'}>
                  <img src={item.image} alt={item.alt} className="w-full h-[280px] sm:h-[320px] object-cover rounded-lg" />
                </div>
                <div className={imageLeft ? '' : 'lg:order-1'}>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#5C4033] mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    Expertise For The North Texas Region
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6 sm:mb-8" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.
                  </p>
                  <Button
                    variant="outline"
                    className="bg-[#EEE9D2] text-[#5C4033] border border-[#d4cfc0] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-md"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Our Core Construction - 3x2 grid */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-3 sm:mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Our Core Construction
          </h2>
          <p className="text-gray-600 text-center mb-12 sm:mb-16 max-w-2xl mx-auto" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            What makes us distinct from others
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {coreConstructionItems.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col items-center text-center">
                <div className="w-14 h-14 flex-shrink-0 mb-4">
                  <img src={relocationHouseIcon} alt="" className="w-14 h-14 object-contain" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#5C4033] mb-2 sm:mb-3" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  {item.text}
                </p>
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
            We are honored to be associated with our remarkable partners
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <div className="flex items-center justify-center p-4">
              <img src={realSolucionesLogo} alt="REAL" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src={realmagicLogo} alt="REAL magic" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src={eldersLogo} alt="Elders RE" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
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
            To receive information, you may contact us via our form
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
