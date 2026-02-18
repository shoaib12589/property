import { useState, useEffect } from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import trustpilotLogo from '@/assets/trustpilot-logo.png'
import googleMyBusinessLogo from '@/assets/google-my-business-logo.png'

interface Testimonial {
  text: string
  name: string
  title: string
  rating: number
}

const testimonials: Testimonial[] = [
  {
    text: "A Lectus Ac Pulvinar Tincidunt Accumsan.\nUllamcorper Dolor At Lectus Ac, Sed\nFacilisis Hac.\n\nEgestas In Dolor Dui Purus Tincidunt Eget\nCras Nisl Est Molestie Aliquam.",
    name: "Mell Harvey",
    title: "Founder BookChimp",
    rating: 4
  },
  {
    text: "A Lectus Ac Pulvinar Tincidunt Accumsan.\nUllamcorper Dolor At Lectus Ac, Sed\nFacilisis Hac.\n\nEgestas In Dolor Dui Purus Tincidunt Eget\nCras Nisl Est Molestie Aliquam.",
    name: "John Doe",
    title: "CEO Company Inc",
    rating: 4
  },
  {
    text: "A Lectus Ac Pulvinar Tincidunt Accumsan.\nUllamcorper Dolor At Lectus Ac, Sed\nFacilisis Hac.\n\nEgestas In Dolor Dui Purus Tincidunt Eget\nCras Nisl Est Molestie Aliquam.",
    name: "Jane Smith",
    title: "Director ABC Corp",
    rating: 4
  },
  {
    text: "A Lectus Ac Pulvinar Tincidunt Accumsan.\nUllamcorper Dolor At Lectus Ac, Sed\nFacilisis Hac.\n\nEgestas In Dolor Dui Purus Tincidunt Eget\nCras Nisl Est Molestie Aliquam.",
    name: "Robert Johnson",
    title: "Founder TechStart",
    rating: 4
  },
  {
    text: "A Lectus Ac Pulvinar Tincidunt Accumsan.\nUllamcorper Dolor At Lectus Ac, Sed\nFacilisis Hac.\n\nEgestas In Dolor Dui Purus Tincidunt Eget\nCras Nisl Est Molestie Aliquam.",
    name: "Sarah Williams",
    title: "VP Marketing",
    rating: 4
  },
  {
    text: "A Lectus Ac Pulvinar Tincidunt Accumsan.\nUllamcorper Dolor At Lectus Ac, Sed\nFacilisis Hac.\n\nEgestas In Dolor Dui Purus Tincidunt Eget\nCras Nisl Est Molestie Aliquam.",
    name: "Michael Brown",
    title: "CTO Innovation Labs",
    rating: 4
  }
]

export function Testimonials() {
  const itemsPerView = 3
  const [currentIndex, setCurrentIndex] = useState(0)

  // Create extended array for infinite loop (duplicate items at start and end)
  const extendedTestimonials = [...testimonials, ...testimonials, ...testimonials]
  const startOffset = testimonials.length

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = prev + 1
        // If we've reached the end of the original array, loop back
        if (nextIndex >= testimonials.length) {
          return 0
        }
        return nextIndex
      })
    }, 4000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [])

  const next = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 1
      return nextIndex >= testimonials.length ? 0 : nextIndex
    })
  }

  const prev = () => {
    setCurrentIndex(prev => {
      const prevIndex = prev - 1
      return prevIndex < 0 ? testimonials.length - 1 : prevIndex
    })
  }

  const goToPage = (page: number) => {
    setCurrentIndex(page)
  }

  const totalPages = Math.ceil(testimonials.length / itemsPerView)
  const currentPage = Math.floor(currentIndex / itemsPerView)

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-[#F5F4F0]">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-6 sm:mb-8 md:mb-10 gap-4">
          <div className="flex-1">
            <p className="text-xs sm:text-sm text-[#7A7363] mb-1 sm:mb-2 font-normal" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              What Our Loving Clients Say
            </p>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5C4033]" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Clients Testimonial
            </h2>
          </div>
          
          {/* Review Platforms/Ratings */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <div className="flex items-center gap-1.5 sm:gap-2">
              <img src={trustpilotLogo} alt="Trustpilot" className="h-4 sm:h-5 w-auto object-contain" />
            </div>
            <div className="flex items-center gap-1.5 sm:gap-2">
              <img src={googleMyBusinessLogo} alt="Google My Business" className="h-4 sm:h-5 w-auto object-contain" />
            </div>
            <div className="px-2 sm:px-3 py-1 sm:py-1.5 rounded-full border border-[#E8E8D0]">
              <span className="text-[10px] sm:text-xs text-[#5C4033] font-medium" style={{ fontFamily: "'Gilroy', sans-serif" }}>356 Review Rating</span>
            </div>
          </div>
        </div>
        
        {/* Testimonial Cards Slider */}
        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex gap-3 sm:gap-4 md:gap-6 items-stretch transition-transform duration-500 ease-in-out"
              style={{ 
                transform: `translateX(calc(-${(startOffset + currentIndex) * (100 / itemsPerView)}% - ${(startOffset + currentIndex) * 1}rem))`,
                willChange: 'transform'
              }}
            >
              {extendedTestimonials.map((testimonial, index) => (
                <div 
                  key={`${testimonial.name}-${index}`}
                  className="flex-shrink-0 transition-opacity duration-300 flex"
                  style={{ width: `calc(${100 / itemsPerView}% - ${1 * (itemsPerView - 1)}rem)` }}
                >
                  <Card className="p-6 sm:p-8 md:p-10 h-full w-full flex flex-col bg-[#FEFEFE] border border-[#D4AF37]/30 rounded-md transition-shadow duration-300">
                    <p className="text-[#5C4033] mb-6 sm:mb-8 leading-relaxed text-sm sm:text-base font-normal text-center whitespace-pre-line" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                      {testimonial.text}
                    </p>
                    <div className="flex items-center justify-center gap-1 sm:gap-1.5 mb-4 sm:mb-5">
                      {[...Array(5)].map((_, i) => {
                        const starValue = i + 1
                        const isFull = starValue <= Math.floor(testimonial.rating)
                        
                        return (
                          <Star 
                            key={i} 
                            className={`w-4 h-4 sm:w-5 sm:h-5 ${
                              isFull
                                ? 'fill-[#FFD700] text-[#FFD700]'
                                : 'fill-none text-gray-300 stroke-2'
                            }`}
                          />
                        )
                      })}
                    </div>
                    <p className="font-bold text-[#5C4033] mb-2 text-center text-base sm:text-lg" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                      {testimonial.name}
                    </p>
                    <p className="text-sm sm:text-base text-[#5C4033] font-normal text-center" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                      {testimonial.title}
                    </p>
                  </Card>
                </div>
              ))}
            </div>
          </div>
          
          {/* Slider Navigation and Pagination */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 md:mt-10">
            {/* Left Arrow */}
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="bg-[#E8E8D0] border-[#DBD7CD] hover:bg-[#DBD7CD] text-[#5C4033] w-8 h-8 sm:w-10 sm:h-10 rounded-sm"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            
            {/* Page Numbers */}
            <div className="flex items-center gap-1 sm:gap-2">
              {Array.from({ length: Math.min(totalPages, 3) }).map((_, index) => {
                const pageNum = index + 1
                const isActive = currentPage === index
                
                return (
                  <button
                    key={index}
                    onClick={() => goToPage(index)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full text-xs sm:text-sm font-normal transition-colors ${
                      isActive
                        ? 'bg-[#E8E8D0] text-[#5C4033]'
                        : 'bg-transparent text-[#7A7363] hover:bg-gray-100'
                    }`}
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              {/* Ellipsis if more pages */}
              {totalPages > 3 && (
                <span className="text-[#7A7363] px-1 sm:px-2 text-xs sm:text-sm" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  ...
                </span>
              )}
            </div>
            
            {/* Right Arrow */}
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="bg-[#E8E8D0] border-[#DBD7CD] hover:bg-[#DBD7CD] text-[#5C4033] w-8 h-8 sm:w-10 sm:h-10 rounded-sm"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
