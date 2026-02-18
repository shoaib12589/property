import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react'
import heartIcon from '@/assets/heart-icon.svg'
import shareIcon from '@/assets/share-icon.svg'
import bedIcon from '@/assets/bed-icon.svg'
import bathIcon from '@/assets/bath-icon.svg'
import sqftIcon from '@/assets/sqft-icon.svg'

interface PropertyCardProps {
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

export function PropertyCard({
  images,
  status,
  price,
  type,
  beds,
  baths,
  sqft,
  address,
  listedBy,
  openHouse
}: PropertyCardProps) {
  const [currentImageIndex, setCurrentImageIndex] = useState(0)

  const nextImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev + 1) % images.length)
  }

  const prevImage = (e: React.MouseEvent) => {
    e.stopPropagation()
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)
  }

  const goToImage = (index: number) => {
    setCurrentImageIndex(index)
  }

  return (
    <Card className="overflow-hidden w-full h-full flex flex-col bg-white shadow-lg hover:shadow-xl transition-shadow rounded-sm" style={{ border: '1px solid #7A7363' }}>
      {/* Image Section */}
      <div className="relative group">
        <img 
          src={images[currentImageIndex]}
          alt={type}
          className="w-full h-48 sm:h-56 md:h-64 object-cover transition-opacity duration-300"
        />
        
        {/* Open House Label - Top Left */}
        {openHouse && (
          <div className="absolute top-2 sm:top-3 md:top-4 left-2 sm:left-3 md:left-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded bg-black/20 backdrop-blur-md">
            <p className="text-white text-[10px] sm:text-[16px] font-normal" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              Open: {openHouse}
            </p>
          </div>
        )}
        
        {/* Status Badge - Top Right */}
        <div className={`absolute top-2 sm:top-3 md:top-4 right-2 sm:right-3 md:right-4 px-2 sm:px-3 py-1 sm:py-1.5 rounded font-bold text-[10px] sm:text-xs md:text-sm uppercase ${
          status === 'OPEN' ? 'bg-[#66CC00] text-white' : 'bg-red-500 text-white'
        }`} style={{ fontFamily: "'Gilroy', sans-serif" }}>
          {status}
        </div>
        
        {/* Slider Indicators - Bottom Center */}
        {images.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 left-1/2 transform -translate-x-1/2 flex gap-1 sm:gap-1.5">
            {images.map((_, index) => (
              <button
                key={index}
                onClick={(e) => {
                  e.stopPropagation()
                  goToImage(index)
                }}
                className={`rounded transition-all ${
                  index === currentImageIndex
                    ? 'w-4 sm:w-5 md:w-6 h-0.5 bg-white'
                    : 'w-3 sm:w-4 h-0.5 bg-white/50 hover:bg-white/75'
                }`}
              />
            ))}
          </div>
        )}
        
        {/* Image Navigation Arrows - Bottom Right */}
        {images.length > 1 && (
          <div className="absolute bottom-2 sm:bottom-3 md:bottom-4 right-2 sm:right-3 md:right-4 flex gap-1 sm:gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <button 
              className="bg-white/90 backdrop-blur-sm hover:bg-white rounded p-1 sm:p-1.5 shadow-md"
              onClick={prevImage}
            >
              <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
            </button>
            <button 
              className="bg-white/90 backdrop-blur-sm hover:bg-white rounded p-1 sm:p-1.5 shadow-md"
              onClick={nextImage}
            >
              <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-700" />
            </button>
          </div>
        )}
      </div>
      
      {/* Details Section - Light Beige Background */}
      <div className="p-3 sm:p-4 md:p-5 bg-[#F5F4F0] flex-1 flex flex-col">
        {/* Price and Action Icons Row */}
        <div className="flex items-start justify-between mb-2">
          <p className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#a49776]" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            {price}
          </p>
          <div className="flex gap-1 sm:gap-2">
            <button className="p-0.5 sm:p-1 hover:bg-white/50 rounded-full transition-colors">
              <img src={heartIcon} alt="Favorite" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </button>
            <button className="p-0.5 sm:p-1 hover:bg-white/50 rounded-full transition-colors">
              <img src={shareIcon} alt="Share" className="w-6 h-6 sm:w-7 sm:h-7 md:w-8 md:h-8" />
            </button>
          </div>
        </div>
        
        {/* Property Type - Second Largest Font */}
        <p className="text-base sm:text-lg md:text-xl font-semibold text-[#7A7363] mb-3 sm:mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
          {type}
        </p>
        
        {/* Features Row - Medium-Small Font */}
        <div className="flex items-center gap-2 sm:gap-3 md:gap-4 mb-3 sm:mb-4 flex-wrap">
          <div className="flex items-center gap-1 sm:gap-1.5">
            <img src={bedIcon} alt="Beds" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm text-[#666666] font-normal" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              {beds} beds
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <img src={bathIcon} alt="Baths" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm text-[#666666] font-normal" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              {baths} baths
            </span>
          </div>
          <div className="flex items-center gap-1 sm:gap-1.5">
            <img src={sqftIcon} alt="Square feet" className="w-4 h-4 sm:w-5 sm:h-5" />
            <span className="text-xs sm:text-sm text-[#666666] font-normal" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              {sqft}
            </span>
          </div>
        </div>
        
        {/* Location - Medium-Small Font */}
        <div className="flex items-start gap-1.5 sm:gap-2 mb-3 sm:mb-4">
          <MapPin className="w-3 h-3 sm:w-4 sm:h-4 text-[#666666] mt-0.5 flex-shrink-0 stroke-2" />
          <p className="text-xs sm:text-sm text-[#666666] font-normal leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            {address}
          </p>
        </div>
        
        {/* Listed By - Small Font */}
        <div className="pt-2 sm:pt-3 border-t border-[#E0DDD8]">
          <p className="text-[10px] sm:text-xs" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            <span className="font-bold text-[#7A7363]">Listed By</span>
            <br />
            <span className="font-normal text-xs sm:text-sm text-[#666666]">{listedBy}</span>
          </p>
        </div>
      </div>
    </Card>
  )
}
