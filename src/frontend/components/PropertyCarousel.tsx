import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PropertyCard } from './PropertyCard'

interface Property {
  images: string[]
  status: 'OPEN' | 'SOLD'
  price: string
  type: string
  beds: number
  baths: number
  sqft: string
  address: string
  listedBy: string
  openHouse?: string
}

interface PropertyCarouselProps {
  title: string
  listingCount: number
  viewAllText: string
  properties: Property[]
}

export function PropertyCarousel({ title, listingCount, viewAllText, properties }: PropertyCarouselProps) {
  const itemsPerView = 3
  const [currentIndex, setCurrentIndex] = useState(0)

  // Create extended array for infinite loop (duplicate items at start and end)
  const extendedProperties = [...properties, ...properties, ...properties]
  const startOffset = properties.length

  // Autoplay
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex(prev => {
        const nextIndex = prev + 1
        // If we've reached the end of the original array, loop back
        if (nextIndex >= properties.length) {
          return 0
        }
        return nextIndex
      })
    }, 40000) // Change every 4 seconds

    return () => clearInterval(interval)
  }, [properties.length])

  const next = () => {
    setCurrentIndex(prev => {
      const nextIndex = prev + 1
      return nextIndex >= properties.length ? 0 : nextIndex
    })
  }

  const prev = () => {
    setCurrentIndex(prev => {
      const prevIndex = prev - 1
      return prevIndex < 0 ? properties.length - 1 : prevIndex
    })
  }

  const goToPage = (page: number) => {
    setCurrentIndex(page)
  }

  const totalPages = Math.ceil(properties.length / itemsPerView)
  const currentPage = Math.floor(currentIndex / itemsPerView)

  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8 md:mb-10 gap-3 sm:gap-4">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5C4033] flex-1" style={{ fontFamily: "'Scheherazade New', serif" }}>
            {title}
          </h2>
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4">
            <span className="text-gray-600 text-xs sm:text-sm border border-[#E8E8D0] px-5 py-2 rounded-sm" style={{ fontFamily: "'Gilroy', sans-serif" }}>{listingCount} Listings</span>
            <Link to="/listing">
              <Button 
                variant="outline" 
                className="bg-[#EEE9D2] text-[#5C4033] hover:bg-[#E8E8D0] font-medium text-xs sm:text-sm px-3 sm:px-4 md:px-6 py-2"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                <span className="hidden sm:inline">{viewAllText}</span>
                <span className="sm:hidden">View All</span>
              </Button>
            </Link>
          </div>
        </div>
        
        <div className="relative">
          {/* Carousel Container */}
          <div className="relative flex items-center justify-center px-2 sm:px-4 md:px-8" style={{ minHeight: '550px' }}>
            {/* Center Cards Container */}
            <div className="relative z-10 w-full max-w-6xl">
              <div 
                className="flex gap-3 sm:gap-4 md:gap-4 items-stretch transition-transform duration-500 ease-in-out"
                style={{ 
                  transform: `translateX(calc(-${(startOffset + currentIndex) * (100 / itemsPerView)}% - ${(startOffset + currentIndex) * 0.75}rem))`,
                  willChange: 'transform'
                }}
              >
                {extendedProperties.map((property, index) => (
                  <div 
                    key={`${property.type}-${index}`}
                    className="flex-shrink-0 transition-opacity duration-300 flex"
                    style={{ 
                      width: `calc(${100 / itemsPerView}% - ${0.75 * (itemsPerView - 1) / itemsPerView}rem)`,
                      maxWidth: '420px',
                      minWidth: '280px'
                    }}
                  >
                    <PropertyCard {...property} />
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          {/* Pagination Controls - Matching Attachment Design */}
          <div className="flex items-center justify-center gap-2 sm:gap-4 mt-6 sm:mt-8 md:mt-10">
            {/* Left Arrow */}
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="bg-[#F5F5DC] border-[#7A7363] hover:bg-[#E8E8D0] text-[#7A7363] w-8 h-8 sm:w-10 sm:h-10 rounded-sm"
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
            
            {/* Page Numbers */}
            <div className="flex items-center gap-1 sm:gap-2">
              {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                const pageNum = index + 1
                const isActive = currentPage === index
                
                return (
                  <button
                    key={index}
                    onClick={() => goToPage(index * itemsPerView)}
                    className={`w-7 h-7 sm:w-8 sm:h-8 rounded-sm text-xs sm:text-sm font-normal transition-colors ${
                      isActive
                        ? 'bg-[#E8E8D0] text-[#5C4033]'
                        : 'bg-transparent text-[#5C4033] hover:bg-gray-100'
                    }`}
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              {/* Ellipsis if more pages */}
              {totalPages > 5 && (
                <span className="text-[#5C4033] px-1 sm:px-2 text-xs sm:text-sm" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  ...
                </span>
              )}
            </div>
            
            {/* Right Arrow */}
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="bg-[#F5F5DC] border-[#7A7363] hover:bg-[#E8E8D0] text-[#7A7363] w-8 h-8 sm:w-10 sm:h-10 rounded-sm"
            >
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}
