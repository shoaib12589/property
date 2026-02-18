import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'

// Content blocks data
const contentBlocks = [
  {
    id: 1,
    title: 'Expertise For The North Texas Region',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://images.unsplash.com/photo-1557804506-669a67965ba0?w=800&h=600&fit=crop',
    imageLeft: true
  },
  {
    id: 2,
    title: 'Expertise For The North Texas Region',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?w=800&h=600&fit=crop',
    imageLeft: false
  },
  {
    id: 3,
    title: 'Expertise For The North Texas Region',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
    imageLeft: true
  },
  {
    id: 4,
    title: 'Expertise For The North Texas Region',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop',
    imageLeft: false
  },
  {
    id: 5,
    title: 'Expertise For The North Texas Region',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?w=800&h=600&fit=crop',
    imageLeft: true
  },
  {
    id: 6,
    title: 'Expertise For The North Texas Region',
    text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    image: 'https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=800&h=600&fit=crop',
    imageLeft: false
  },
]

export function Donation() {
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
            HELP THOSE IN NEED
          </h1>
        </div>
      </section>

      {/* Team Up With Our Mission Section */}
      <section className="py-16 sm:py-16 md:py-16 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <div className="text-center mb-16 sm:mb-20 md:mb-24">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#5C4033]" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Team Up With Our Mission
            </h2>
          </div>

          {/* First 4 Content Blocks */}
          <div className="space-y-16 sm:space-y-20 md:space-y-24">
            {contentBlocks.slice(0, 4).map((block) => (
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
                  <p className="text-sm sm:text-base md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {block.text}
                  </p>
                  <div className="mt-auto">
                    <Button 
                      variant="outline"
                      className="bg-[#EEE9D2] text-[#5C4033] border-[#7A7363] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3"
                      style={{ fontFamily: "'Gilroy', sans-serif" }}
                    >
                      Donate Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mid-Page Call-to-Action Banner */}
      <section className="relative h-[350px] sm:h-[450px] md:h-[550px] flex items-center justify-center overflow-hidden py-16 sm:py-20 md:py-24">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1507679799987-c73779587ccf?w=1920&h=1080&fit=crop')`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 text-center px-4 sm:px-6 max-w-4xl mx-auto">
          <p className="text-sm sm:text-base md:text-lg uppercase text-white/90 mb-3 sm:mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            LOOKING TO DONATE TO A CAUSE
          </p>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#eee9d2] uppercase mb-8 sm:mb-10" style={{ fontFamily: "'Scheherazade New', serif" }}>
            YOU'RE MOST PASSIONATE ABOUT?
          </h2>
          <Button 
            variant="outline"
            className="bg-[#EEE9D2] text-[#5C4033] border-[#7A7363] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            Donate Now
          </Button>
        </div>
      </section>

      {/* Second Set of Content Blocks */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          <div className="space-y-16 sm:space-y-20 md:space-y-24">
            {contentBlocks.slice(4, 6).map((block) => (
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
                  <p className="text-sm sm:text-base md:text-xl text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {block.text}
                  </p>
                  <div className="mt-auto">
                    <Button 
                      variant="outline"
                      className="bg-[#EEE9D2] text-[#5C4033] border-[#7A7363] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3"
                      style={{ fontFamily: "'Gilroy', sans-serif" }}
                    >
                      Donate Now
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Be Part Of The Change Section */}
      <section className="py-16 sm:py-16 md:py-16 px-4 sm:px-6" style={{ backgroundColor: '#f5f4e5' }}>
        <div className="max-w-7xl mx-auto text-center">
          <div className="mb-8 sm:mb-10 md:mb-12">
            <span className="text-xl sm:text-2xl md:text-3xl text-gray-600" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              Be Part
            </span><br />
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#5C4033] inline-block ml-2 sm:ml-3" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Of The Change
            </h2>
          </div>
          <Button 
            variant="outline"
            className="bg-transparent text-[#5C4033] border-[#7A7363] hover:bg-[#E8E8D0] font-bold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4 rounded-none"
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
