import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import relocationHouseIcon from '@/assets/relocation-house-icon.svg'
import checkboxIcon from '@/assets/checkbox-icon.svg'
import realSolucionesLogo from '@/assets/real-soluciones-logo.png'
import realmagicLogo from '@/assets/realmagic-logo.png'
import eldersLogo from '@/assets/elders-real-estate-logo.png'
import rbnLogo from '@/assets/rbn-logo.png'

const relocationEasyItems = [
  { id: 1, title: 'Marketing Support', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 2, title: 'Training And Development', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 3, title: 'Career Growth', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 4, title: 'Professional Certification', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 5, title: 'Work-Life Balance', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
  { id: 6, title: 'Competitive Compensation', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
]

const buyingBullets = [
  'Elit pellentesque felis massa neque.',
  'Consectetur adipiscing elit sed do.',
  'Eiusmod tempor incididunt ut labore.',
  'Magna aliqua ut enim ad minim.',
  'Veniam quis nostrud exercitation.',
  'Ullamco laboris nisi ut aliquip.',
  'Commodo consequat duis aute.',
  'Iure dolor in reprehenderit.',
  'Voluptate velit esse cillum.',
  'Dolore eu fugiat nulla pariatur.',
]

const sellingBullets = [
  'Elit pellentesque felis massa neque.',
  'Consectetur adipiscing elit sed do.',
  'Eiusmod tempor incididunt ut labore.',
  'Magna aliqua ut enim ad minim.',
  'Veniam quis nostrud exercitation.',
  'Ullamco laboris nisi ut aliquip.',
  'Commodo consequat duis aute.',
  'Iure dolor in reprehenderit.',
  'Voluptate velit esse cillum.',
  'Dolore eu fugiat nulla pariatur.',
]

export function RelocationServices() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F0' }}>
      {/* Hero */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-[#5C4033]/60" />
        </div>

        <Header />

        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#eee9d2] uppercase leading-tight" style={{ fontFamily: "'Scheherazade New', serif" }}>
            RELOCATION<br />SERVICES
          </h1>
        </div>
      </section>

      {/* Relocation And Corporate Services */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-10 sm:mb-12" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Relocation And Corporate Services
          </h2>
          <div className="mb-8 sm:mb-10">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1200&h=500&fit=crop"
              alt="Relocation and corporate services"
              className="w-full h-[280px] sm:h-[350px] md:h-[420px] object-cover rounded-lg"
            />
          </div>
          <p className="text-gray-600 leading-relaxed mb-6" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Our relocation and corporate services are designed to support individuals and families moving to or from the San Francisco Bay Area, North Carolina, and beyond. We provide end-to-end assistance including home search, school and neighborhood information, and coordination with English-speaking agents to ensure a smooth transition.
          </p>
          <p className="text-gray-600 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Whether you are relocating for work or personal reasons, our team of experienced professionals is here to guide you every step of the way. We work with corporate clients and individual families to deliver tailored relocation solutions.
          </p>
        </div>
      </section>

      {/* Relocation Made Easy - 2x3 grid */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-12 sm:mb-16" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Relocation Made Easy
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {relocationEasyItems.map((item) => (
              <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col items-left text-left">
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

      {/* What You Can Expect - Buying & Selling (same card style as Relocation Made Easy) */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-12 sm:mb-16" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            What You Can Expect
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-[#EEE9D2]/60 border border-gray-200 rounded-lg p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-[#5C4033] mb-2 sm:mb-3" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Buying
              </h2>
              <p className="text-gray-700 text-sm sm:text-base mb-6" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Sit nulla facilis interdum can blobta locker.
              </p>
              <ul className="space-y-3">
                {buyingBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <img src={checkboxIcon} alt="" className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden />
                    <span className="text-gray-600 text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-[#EEE9D2]/60 border border-gray-200 rounded-lg p-6 sm:p-8">
              <h2 className="text-lg sm:text-xl font-bold text-[#5C4033] mb-2 sm:mb-3" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Selling
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-6" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Sit nulla facilis interdum can blobta locker.
              </p>
              <ul className="space-y-3">
                {sellingBullets.map((bullet, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <img src={checkboxIcon} alt="" className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden />
                    <span className="text-gray-600 text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>{bullet}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Trusted Relocation Realtors */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-12 sm:mb-16" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Trusted Relocation Realtors
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
                src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop"
                alt="Modern living space"
                className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover rounded-lg"
              />
            </div>
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
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
