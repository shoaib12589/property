import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useState } from 'react'
import realSolucionesLogo from '@/assets/real-soluciones-logo.png'
import realmagicLogo from '@/assets/realmagic-logo.png'
import eldersLogo from '@/assets/elders-real-estate-logo.png'
import rbnLogo from '@/assets/rbn-logo.png'

const contentBlocks = [
  {
    id: 1,
    sectionTitle: 'Corporate Criteria',
    title: 'Start To Finish Development Expertise For The North Texas Region',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=800&h=600&fit=crop',
    imageLeft: false,
    dark: false,
  },
  {
    id: 2,
    sectionTitle: 'Our Vision And Know How',
    title: 'Start To Finish Development Expertise For The North Texas Region',
    titleLine1: 'Start To Finish Development',
    titleLine2: 'Expertise For The North Texas Region',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using \'Content here, content here\', making it look like readable English.',
    image: 'https://images.unsplash.com/photo-1499951360447-b19be8fe80f5?w=800&h=600&fit=crop',
    imageLeft: false,
    dark: true,
    fullBleedBg: true,
    bgImage: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=1920&h=1080&fit=crop',
  },
  {
    id: 3,
    sectionTitle: 'From The Ground UP',
    title: 'Start To Finish Development Expertise For The North Texas Region',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://images.unsplash.com/photo-1553729784-e91953dec042?w=800&h=600&fit=crop',
    imageLeft: false,
    dark: false,
  },
  {
    id: 4,
    sectionTitle: 'Investment Stewardship',
    title: 'Start To Finish Development Expertise For The North Texas Region',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    imageLeft: true,
    dark: false,
  },
]

const faqItems = [
  { id: 1, question: 'Where Does It Come From?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.' },
  { id: 2, question: 'Why Do We Use It?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 3, question: 'Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 4, question: 'Many Desktop Publishing Packages?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
  { id: 5, question: 'There Are Many Variations Of Passages?', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
]

export function Investments() {
  const [openFaq, setOpenFaq] = useState<number | null>(1)

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id)
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F7F0' }}>
      {/* Hero - dark olive/brown, hands/coins investment imagery */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=1920&h=1080&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-[#4E4637]/75" />
        </div>

        <Header />

        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#eee9d2] uppercase" style={{ fontFamily: "'Scheherazade New', serif" }}>
            INVESTMENTS
          </h1>
        </div>
      </section>

      {/* Content blocks: Corporate Criteria | Our Vision (full-bleed bg + gradient) | From The Ground UP | Investment Stewardship */}
      {contentBlocks.map((block) => {
        const isVisionFullBleed = 'fullBleedBg' in block && block.fullBleedBg
        if (isVisionFullBleed && block.id === 2) {
          return (
            <section key={block.id} className="relative py-16 sm:py-20 md:py-24 px-4 sm:px-6 min-h-[500px] sm:min-h-[560px] flex flex-col justify-center overflow-hidden">
              {/* Background image - laptop / newspaper / desk */}
              <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: `url('${'bgImage' in block && block.bgImage ? block.bgImage : block.image}')` }}
              />
              {/* Linear gradient overlay: left (darker) to right (slightly lighter) */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'linear-gradient(to right, rgba(76,71,64,0.78) 0%, rgba(110,103,91,0.65) 50%, rgba(124,112,98,0.6) 100%)',
                }}
              />
              <div className="relative z-10 max-w-7xl mx-auto w-full">
                <h2
                  className="text-3xl sm:text-4xl md:text-5xl font-medium text-center mb-12 sm:mb-16"
                  style={{ fontFamily: "'Scheherazade New', serif", color: '#eee9d2' }}
                >
                  {block.sectionTitle}
                </h2>
                <div className="flex justify-start">
                  <div className="max-w-xl lg:max-w-2xl">
                    <h3
                      className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6"
                      style={{ fontFamily: "'Scheherazade New', serif", color: '#eee9d2' }}
                    >
                      {'titleLine1' in block && block.titleLine1 ? (
                        <>
                          {block.titleLine1}
                          <br />
                          <span className="text-lg sm:text-xl md:text-2xl">{block.titleLine2}</span>
                        </>
                      ) : (
                        block.title
                      )}
                    </h3>
                    <p
                      className="mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base"
                      style={{ fontFamily: "'Gilroy', sans-serif", color: 'rgba(238,233,210,0.92)' }}
                    >
                      {block.text}
                    </p>
                    <Button
                      variant="outline"
                      className="bg-transparent border border-[#eee9d2] text-[#eee9d2] hover:bg-[#eee9d2]/10 font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-md"
                      style={{ fontFamily: "'Gilroy', sans-serif" }}
                    >
                      Learn More
                    </Button>
                  </div>
                </div>
              </div>
            </section>
          )
        }
        return (
          <section
            key={block.id}
            className="py-16 sm:py-20 md:py-24 px-4 sm:px-6"
            style={{ backgroundColor: block.dark ? '#4E4637' : '#F8F7F0' }}
          >
            <div className="max-w-7xl mx-auto">
              <h2
                className="text-3xl sm:text-4xl md:text-5xl font-medium text-center mb-12 sm:mb-16"
                style={{
                  fontFamily: "'Scheherazade New', serif",
                  color: block.dark ? '#eee9d2' : '#5C4033',
                }}
              >
                {block.sectionTitle}
              </h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                <div className={block.imageLeft ? 'order-1' : 'order-2'}>
                  <img src={block.image} alt="" className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover rounded-lg" />
                </div>
                <div className={block.imageLeft ? 'order-2' : 'order-1'}>
                  <h3
                    className="text-xl sm:text-2xl md:text-3xl font-bold mb-4 sm:mb-6"
                    style={{
                      fontFamily: "'Scheherazade New', serif",
                      color: block.dark ? '#eee9d2' : '#5C4033',
                    }}
                  >
                    {'titleLine1' in block && block.titleLine1 ? (
                      <>
                        {block.titleLine1}
                        <br />
                        <span className="text-lg sm:text-xl md:text-2xl">{block.titleLine2}</span>
                      </>
                    ) : (
                      block.title
                    )}
                  </h3>
                  <p
                    className="mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base"
                    style={{
                      fontFamily: "'Gilroy', sans-serif",
                      color: block.dark ? 'rgba(238,233,210,0.92)' : '#4a4a4a',
                    }}
                  >
                    {block.text}
                  </p>
                  <Button
                    variant="outline"
                    className={
                      block.dark
                        ? 'bg-transparent border border-[#eee9d2] text-[#eee9d2] hover:bg-[#eee9d2]/10 font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-md'
                        : 'bg-[#EEE9D2] text-[#5C4033] border border-[#d4cfc0] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-md'
                    }
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    Learn More
                  </Button>
                </div>
              </div>
            </div>
          </section>
        )
      })}

      {/* Frequently Asked Questions - accordion, first expanded */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F8F7F0' }}>
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-12 sm:mb-16" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Frequently Asked Questions
          </h2>
          <div className="space-y-0">
            {faqItems.map((faq) => {
              const isOpen = openFaq === faq.id
              return (
                <div key={faq.id} className="border-b border-gray-300">
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between py-4 sm:py-6 text-left"
                  >
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#5C4033] pr-4" style={{ fontFamily: "'Scheherazade New', serif" }}>
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f5f4e5] border border-[#666b79] flex items-center justify-center">
                        {isOpen ? <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#666b79]" /> : <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#666b79]" />}
                      </div>
                    </div>
                  </button>
                  {isOpen && (
                    <div className="pb-4 sm:pb-6">
                      <p className="text-sm sm:text-base md:text-lg text-gray-700 font-medium leading-relaxed pr-12 sm:pr-16" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                        {faq.answer}
                      </p>
                    </div>
                  )}
                </div>
              )
            })}
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed viverra.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <div className="flex items-center justify-center p-4">
              <img src={realSolucionesLogo} alt="REAL" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src={realmagicLogo} alt="BEN magic" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src={eldersLogo} alt="Elders Life" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut sed viverra.
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
