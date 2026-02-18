import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Link } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'
import { Testimonials } from '@/components/Testimonials'
import realSolucionesLogo from '@/assets/real-soluciones-logo.png'
import realmagicLogo from '@/assets/realmagic-logo.png'
import eldersLogo from '@/assets/elders-real-estate-logo.png'
import rbnLogo from '@/assets/rbn-logo.png'

// Company Overview blocks
const overviewBlocks = [
  {
    id: 1,
    title: 'Start To Finish Development Expertise For The North Texas Region',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    imageLeft: true,
  },
  {
    id: 2,
    title: 'Start Up Here Expertise For The North Texas Region',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop',
    imageLeft: false,
  },
]

// Our Services (three vertical blocks, alternating image left/right)
const servicesBlocks = [
  {
    id: 1,
    title: 'Expertise For The North Texas Region',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=500&fit=crop',
    imageLeft: true,
  },
  {
    id: 2,
    title: 'Expertise For The North Texas Region',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=500&fit=crop',
    imageLeft: false,
  },
  {
    id: 3,
    title: 'Expertise For The North Texas Region',
    text: 'It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters.',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=500&fit=crop',
    imageLeft: true,
  },
]

// News/Events cards
const newsTabs = ['News', 'Events', 'Company']
const newsCards = [
  { id: 1, title: 'Indoor Gardening Tips', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=400&h=300&fit=crop' },
  { id: 2, title: 'Pool & Outdoor Living', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?w=400&h=300&fit=crop' },
  { id: 3, title: 'Investment Strategies', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=400&h=300&fit=crop' },
  { id: 4, title: 'Keys To Your New Home', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'https://images.unsplash.com/photo-1583608205776-bfd35f0d9f83?w=400&h=300&fit=crop' },
  { id: 5, title: 'Model Homes Showcase', text: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400&h=300&fit=crop' },
]

// Core principles
const corePrinciples = [
  { id: 1, title: 'Hard Work & Dedication', text: 'Our team is committed to delivering excellence in every project we undertake.' },
  { id: 2, title: 'Passionate Support', text: 'We provide unwavering support to our clients throughout their journey.' },
  { id: 3, title: 'Integrity & Trust', text: 'We build lasting relationships based on transparency and honesty.' },
  { id: 4, title: 'Innovation', text: 'We embrace new ideas and technologies to serve you better.' },
  { id: 5, title: 'Community Focus', text: 'We are invested in the North Texas region and its growth.' },
  { id: 6, title: 'Client First', text: 'Your goals and satisfaction are at the center of everything we do.' },
]

export function OurCompany() {
  const [newsTab, setNewsTab] = useState('News')
  const [newsScrollIndex, setNewsScrollIndex] = useState(0)

  const nextNews = () => setNewsScrollIndex((i) => Math.min(i + 1, newsCards.length - 3))
  const prevNews = () => setNewsScrollIndex((i) => Math.max(i - 1, 0))

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fbfff7' }}>
      {/* Hero with header overlay */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1521737711867-e3b97375f902?w=1920&h=1080&fit=crop')`,
          }}
        >
          <div className="absolute inset-0 bg-black/50" />
        </div>

        <Header />

        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#eee9d2] uppercase" style={{ fontFamily: "'Scheherazade New', serif" }}>
            OUR COMPANY
          </h1>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#f5f4e5]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-12 sm:mb-16" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Company Overview
          </h2>
          <div className="space-y-16 sm:space-y-20 md:space-y-24">
            {overviewBlocks.map((block) => (
              <div key={block.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center ${block.imageLeft ? '' : 'lg:flex-row-reverse'}`}>
                <div className={block.imageLeft ? 'order-1' : 'order-2'}>
                  <img src={block.image} alt="" className="w-full h-[300px] sm:h-[350px] md:h-[400px] object-cover rounded-lg" />
                </div>
                <div className={block.imageLeft ? 'order-2' : 'order-1'}>
                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4033] mb-4 sm:mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
                    {block.title}
                  </h3>
                  <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {block.text}
                  </p>
                  <Button variant="outline" className="bg-[#EEE9D2] text-[#5C4033] border-[#7A7363] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#F7F4EB' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-12 sm:mb-16 md:mb-20" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Our Services
          </h2>
          <div className="space-y-16 sm:space-y-20 md:space-y-24">
            {servicesBlocks.map((block) => (
              <div key={block.id} className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16 items-center">
                <div className={block.imageLeft ? 'order-1' : 'order-2'}>
                  <img src={block.image} alt="" className="w-full h-[280px] sm:h-[320px] md:h-[360px] object-cover rounded-lg" />
                </div>
                <div className={block.imageLeft ? 'order-2' : 'order-1'}>
                  <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-[#5C4033] mb-4 sm:mb-6" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {block.title}
                  </h3>
                  <p className="text-gray-600 mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {block.text}
                  </p>
                  <Button variant="outline" className="bg-[#EEE9D2] text-[#5C4033] border border-[#d4cfc0] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3 rounded-md" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    Learn More
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Read Our News, Events, And More */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-4 sm:mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Read Our News, Events, And More
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-8 sm:mb-10" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Stay up to date with the latest real estate news, market trends, community events, and company announcements.
          </p>
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-8 sm:mb-10">
            {newsTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setNewsTab(tab)}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium transition-colors ${newsTab === tab ? 'bg-[#A49776] text-white' : 'bg-[#EEE9D2] text-[#5C4033] hover:bg-[#E8E8D0]'}`}
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="relative">
            <div className="overflow-hidden">
              <div className="flex gap-4 sm:gap-6 transition-transform duration-300 ease-out" style={{ transform: `translateX(-${newsScrollIndex * (100 / 3)}%)` }}>
                {newsCards.map((card) => (
                  <div key={card.id} className="flex-shrink-0 w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-1rem)]">
                    <div className="bg-[#F9F6E9] border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col">
                      <img src={card.image} alt="" className="w-full h-40 sm:h-48 object-cover" />
                      <div className="p-4 sm:p-5 flex-1 flex flex-col">
                        <h4 className="text-lg sm:text-xl font-bold text-[#5C4033] mb-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                          {card.title}
                        </h4>
                        <p className="text-sm text-gray-600 mb-4 flex-1" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                          {card.text}
                        </p>
                        <Link to="/blog" className="text-[#5C4033] font-medium hover:text-[#7A7363] text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                          Read More
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex items-center justify-center gap-4 mt-6">
              <Button variant="outline" size="icon" onClick={prevNews} disabled={newsScrollIndex === 0} className="bg-[#E8E8D0] border-[#DBD7CD] hover:bg-[#DBD7CD] text-[#5C4033] w-10 h-10 rounded-sm disabled:opacity-50">
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button variant="outline" size="icon" onClick={nextNews} disabled={newsScrollIndex >= newsCards.length - 3} className="bg-[#E8E8D0] border-[#DBD7CD] hover:bg-[#DBD7CD] text-[#5C4033] w-10 h-10 rounded-sm disabled:opacity-50">
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Our Core Principles */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] text-center mb-4 sm:mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Our Core Principles
          </h2>
          <p className="text-center text-gray-600 max-w-2xl mx-auto mb-12 sm:mb-16" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Our company upholds a set of core principles that guide our work and relationships with clients and partners.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {corePrinciples.map((principle) => (
              <div key={principle.id} className="bg-[#F9F6E9] border border-gray-200 rounded-lg p-6 sm:p-8 flex flex-col">
                <div className="w-12 h-12 rounded-full bg-[#EEE9D2] flex items-center justify-center mb-4">
                  <Star className="w-6 h-6 text-[#5C4033] fill-[#D4AF37] text-[#D4AF37]" />
                </div>
                <h3 className="text-lg sm:text-xl font-bold text-[#5C4033] mb-2 sm:mb-3" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  {principle.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  {principle.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Clients Testimonial */}
      <Testimonials />

      {/* Our Professional Networks - custom block to match design */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#5C4033] mb-3 sm:mb-4" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Our Professional Networks
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 md:mb-10" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            We believe in fostering strong connections and partnerships within the industry.
          </p>
          <div className="grid grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4 sm:gap-6 md:gap-8">
            <div className="flex items-center justify-center p-4">
              <img src={realSolucionesLogo} alt="REAL SOLUTIONS" className="h-12 sm:h-16 md:h-20 w-auto object-contain grayscale opacity-80" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src={realmagicLogo} alt="REALmagic" className="h-12 sm:h-16 md:h-20 w-auto object-contain grayscale opacity-80" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src={eldersLogo} alt="Elders Real Estate" className="h-12 sm:h-16 md:h-20 w-auto object-contain grayscale opacity-80" />
            </div>
            <div className="flex items-center justify-center p-4">
              <img src={rbnLogo} alt="RBN" className="h-12 sm:h-16 md:h-20 w-auto object-contain grayscale opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Contact Us CTA */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6 bg-[#f5f4e5]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-medium text-[#5C4033] mb-4 sm:mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Contact Us
          </h2>
          <p className="text-gray-600 mb-8 sm:mb-10" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Ready to take the next step? Reach out to us for inquiries, consultations, or support.
          </p>
          <Button variant="outline" className="bg-[#EEE9D2] text-[#5C4033] border-[#7A7363] hover:bg-[#E8E8D0] font-medium text-base sm:text-lg px-8 sm:px-10 py-3 sm:py-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Contact Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
