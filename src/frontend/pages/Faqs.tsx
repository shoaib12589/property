import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { ChevronUp, ChevronDown } from 'lucide-react'
import { useState } from 'react'

// FAQ categories
const categories = ['Buying And Selling', 'Investing', 'Career', 'Construction', 'Consulting']

// FAQ data
const faqs = [
  {
    id: 1,
    question: 'Where Does It Come From?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.',
    category: 'Buying And Selling'
  },
  {
    id: 2,
    question: 'Why Do We Use It?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    category: 'Buying And Selling'
  },
  {
    id: 3,
    question: 'Contrary To Popular Belief, Lorem Ipsum Is Not Simply Random?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    category: 'Buying And Selling'
  },
  {
    id: 4,
    question: 'Many Desktop Publishing Packages?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    category: 'Buying And Selling'
  },
  {
    id: 5,
    question: 'There Are Many Variations Of Passages?',
    answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
    category: 'Buying And Selling'
  }
]

export function Faqs() {
  const [activeCategory, setActiveCategory] = useState('Buying And Selling')
  const [openFaq, setOpenFaq] = useState<number | null>(1) // First FAQ open by default

  const filteredFaqs = faqs.filter(faq => faq.category === activeCategory)

  const toggleFaq = (id: number) => {
    setOpenFaq(openFaq === id ? null : id)
  }

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
            FAQ'S
          </h1>
        </div>
      </section>

      {/* Frequently Asked Questions Section */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          {/* Section Heading */}
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#5C4033]" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Frequently <b> Asked Questions </b>
            </h2>
          </div>

          {/* Category Tabs */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-10 mb-8 sm:mb-12">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setActiveCategory(category)
                  setOpenFaq(null) // Close all FAQs when switching categories
                }}
                className={`text-base sm:text-lg md:text-xl font-medium transition-colors ${
                  activeCategory === category
                    ? 'text-[#5C4033] font-bold'
                    : 'text-[#5C4033] opacity-70 hover:opacity-100'
                }`}
                style={{ fontFamily: "'Scheherazade New', serif" }}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Active Category Separator */}
          <div className="w-full h-px bg-gray-300"></div>

          {/* FAQ Accordion */}
          <div className="space-y-0">
            {filteredFaqs.map((faq) => {
              const isOpen = openFaq === faq.id
              return (
                <div key={faq.id} className="border-b border-gray-300">
                  {/* Question */}
                  <button
                    onClick={() => toggleFaq(faq.id)}
                    className="w-full flex items-center justify-between py-4 sm:py-6 text-left"
                  >
                    <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#5C4033] pr-4" style={{ fontFamily: "'Scheherazade New', serif" }}>
                      {faq.question}
                    </h3>
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-[#f5f4e5] border border-[#666b79] flex items-center justify-center">
                        {isOpen ? (
                          <ChevronUp className="w-4 h-4 sm:w-5 sm:h-5 text-[#666b79]" />
                        ) : (
                          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-[#666b79]" />
                        )}
                      </div>
                    </div>
                  </button>

                  {/* Answer (Expandable) */}
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

      <Footer />
    </div>
  )
}
