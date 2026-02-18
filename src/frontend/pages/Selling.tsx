import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Filter, MapPin } from 'lucide-react'
import relocationHouseIcon from '@/assets/relocation-house-icon.svg'

const bgLight = '#F8F7F0'

const whatYouGetCardDescription = 'It Is A Long Established Fact That A Reader Will Be Distracted By The Readable'

const whatYouGetItems = [
  'Expert Advices',
  'Property Appraiser',
  'Home Selling Plan',
  'Pre-Approval',
  '24/7 Support',
  'Best Mortgage',
  'Smart Investments',
  'Guaranteed',
  'Rent or Buy?',
]

const alternatingBlocks = [
  { title: 'Oversees For The North Texas Region', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=600&h=500&fit=crop', alt: 'House with circular driveway' },
  { title: 'Expertise For The North Texas Region', image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&h=500&fit=crop', alt: 'Modern building exterior' },
  { title: 'Stages For The North Texas Region', image: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=600&h=500&fit=crop', alt: 'Key in door' },
  { title: 'Expertise For The North Texas Region', image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=600&h=500&fit=crop', alt: 'Modern house with lawn' },
]

export function Selling() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: bgLight }}>
      {/* Hero: faded doc/hands image, SELLING, tagline, same search bar as home page */}
      <section className="relative min-h-[420px] sm:min-h-[500px] md:min-h-[560px] flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=1080&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-[#5C4033]/50" />
        <Header />

        <div className="relative z-10 w-full max-w-2xl mx-auto px-4 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-medium text-white uppercase tracking-wide mb-3" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Selling
          </h1>
          <p className="text-white/95 text-lg sm:text-xl mb-8" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Find the perfect fit for your home
          </p>
          {/* Search Bar - same as home page Hero */}
          <div className="max-w-2xl mx-auto px-2 sm:px-4">
            <div className="flex px-1 flex-col sm:flex-row items-stretch sm:items-center gap-0 bg-white/20 backdrop-blur-lg overflow-hidden border border-white/20">
              <div className="hidden sm:flex pl-4 pr-2 items-center">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
              </div>
              <div className="flex items-center gap-2 sm:gap-0 flex-1 px-3 sm:px-0">
                <MapPin className="w-4 h-4 sm:hidden text-white/70" />
                <Input
                  placeholder="City, Subdivision, Address, Zip or MLS#"
                  className="flex-1 border-0 bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs sm:text-sm md:text-base py-3 sm:py-4 px-2"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                />
              </div>
              <Button className="bg-white/30 hover:bg-white/30 text-white m-1 px-4 sm:px-6 md:px-8 py-3 sm:py-6 rounded-none border-0 text-xs sm:text-sm md:text-base whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Search
              </Button>
              <Button className="bg-white/30 hover:bg-white/30 text-white p-2 sm:p-3 md:p-6 rounded-none border-0">
                <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Selling Guides: title + simple text links */}
      <section className="py-12 sm:py-16 px-4 sm:px-6" style={{ backgroundColor: bgLight }}>
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-medium text-[#5C4033] mb-6 sm:mb-8" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Selling Guides
          </h2>
          <div className="flex flex-wrap justify-center gap-20 sm:gap-20">
            {['Full Services', 'MLS', 'FSBO'].map((tab) => (
              <a
                key={tab}
                href="#"
                className="text-[#5C4033] hover:underline font-medium text-xl sm:text-2xl"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                {tab}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* About Full Services: title, image, subheading, 2 paras (left-aligned), Contact Us button */}
      <section className="py-4 sm:py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: bgLight }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-medium text-[#5C4033] text-center mb-8 sm:mb-10" style={{ fontFamily: "'Scheherazade New', serif" }}>
            About Full Services
          </h2>
          <img
            src="https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&h=600&fit=crop"
            alt="Stately stone house with trees at dusk"
            className="w-full aspect-[16/9] object-cover rounded-lg mb-8"
          />
          <h3 className="text-xl sm:text-2xl font-semibold text-[#5C4033] text-center mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Start To Finish Development Expertise For The North Texas Region
          </h3>
          <p className="text-gray-600 leading-relaxed mb-4 text-left" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-gray-600 leading-relaxed mb-8 text-left" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
          <div className="text-left">
            <Button
              className="bg-[#E0DBCF] text-[#5C4033] hover:bg-[#d9d3c5] font-medium px-6 py-2.5 rounded-md border-0"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>

      {/* Full Services MLS Listing: background image + dark overlay, left-aligned text */}
      <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1613490493576-7fde63acd811?w=1920&h=1080&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-[#4B4A40]/85" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-white mb-4 sm:mb-5" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Full Services MLS Listing
          </h2>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Start To Finish Development Expertise For The North Texas Region
          </h3>
          <p className="text-white/90 leading-relaxed mb-4 text-left" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </p>
          <p className="text-white/90 leading-relaxed text-left" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
          </p>
        </div>
      </section>

      {/* What You Get: title, subtitle, 3x3 grid - cards left-aligned, icon with circle outline */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: bgLight }}>
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-medium text-[#5C4033] text-center mb-3 sm:mb-4" style={{ fontFamily: "'Scheherazade New', serif" }}>
            What You Get
          </h2>
          <p className="text-[#5C4033] text-center mb-10 sm:mb-12 max-w-2xl mx-auto" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            It is a long established fact that a reader will be distracted
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {whatYouGetItems.map((title, i) => (
              <div
                key={i}
                className="bg-white border rounded-lg p-6 flex flex-col items-start text-left"
                style={{ borderColor: '#E0DBCF' }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mb-4 shrink-0"
                  style={{ backgroundColor: '#E8E4D9', borderColor: '#8B7355' }}
                >
                  <img src={relocationHouseIcon} alt="" className="w-15 h-15 object-contain" />
                </div>
                <h3 className="text-lg font-bold text-[#5C4033] mb-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  {title}
                </h3>
                <p className="text-sm text-[#5C4033] leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  {whatYouGetCardDescription}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* About FBO: key/door background image, dark overlay, left-aligned text */}
      <section className="relative py-20 sm:py-24 md:py-28 lg:py-32 px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-[#3d3c35]/85" />
        <div className="relative z-10 max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium mb-4 sm:mb-5" style={{ fontFamily: "'Scheherazade New', serif", color: '#DDC7A1' }}>
            About FBO
          </h2>
          <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-6" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Start To Finish Development Expertise For The North Texas Region
          </h3>
          <p className="text-[#E0E0E0] leading-relaxed mb-4 text-left" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using &apos;Content here, content here&apos;, making it look like readable English.
          </p>
          <p className="text-[#E0E0E0] leading-relaxed text-left" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more.
          </p>
        </div>
      </section>

      {/* Alternating image/text blocks (4) */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: bgLight }}>
        <div className="max-w-6xl mx-auto">
          {alternatingBlocks.map((block, i) => {
            const imageLeft = i % 2 === 0
            return (
              <div
                key={i}
                className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center ${i > 0 ? 'mt-16 sm:mt-20' : ''}`}
              >
                <div className={imageLeft ? '' : 'lg:order-2'}>
                  <img
                    src={block.image}
                    alt={block.alt}
                    className="w-full h-[280px] sm:h-[320px] object-cover rounded-lg"
                  />
                </div>
                <div className={imageLeft ? '' : 'lg:order-1'}>
                  <h3 className="text-2xl sm:text-3xl font-bold text-[#5C4033] mb-4" style={{ fontFamily: "'Scheherazade New', serif" }}>
                    {block.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-6" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.
                  </p>
                  <Button
                    variant="outline"
                    className="bg-[#EEE9D2] text-[#5C4033] border border-[#d4cfc0] hover:bg-[#E8E8D0] font-medium px-6 py-2.5 rounded-md"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    Read More
                  </Button>
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* GET STARTED FREE CTA */}
      <section className="relative py-20 sm:py-24 md:py-28 px-4 sm:px-6 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1560250097-0b93528c311a?w=1920&h=600&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative z-10 max-w-3xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white uppercase tracking-wide mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Get Started Free
          </h2>
          <p className="text-white/90 text-lg mb-8" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.
          </p>
          <Button
            className="bg-[#EEE9D2] text-[#5C4033] hover:bg-[#E8E8D0] font-medium px-8 py-3 rounded-md uppercase text-sm tracking-wide"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            Sign Up
          </Button>
        </div>
      </section>

      {/* The Change: Be Part / Of The Change / Contact Us */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: bgLight }}>
        <div className="max-w-4xl mx-auto text-center flex flex-col items-center">
          <p className="text-[#6B6359] text-sm sm:text-base mb-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Be Part
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] mb-6 sm:mb-8" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Of The Change
          </h2>
          <Button
            variant="outline"
            className="bg-[#F8F7F0] text-[#5C4033] border-2 border-[#5C4033] hover:bg-[#EEE9D2] font-medium px-8 py-3 rounded-lg"
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
