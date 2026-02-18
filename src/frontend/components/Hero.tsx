import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Filter, MapPin } from 'lucide-react'
import heroBackground from '@/assets/hero-background.png'

export function Hero() {
  return (
    <section className="relative h-[500px] sm:h-[600px] md:h-[700px] lg:h-[800px] flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url('${heroBackground}')`
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      {/* Large House-Shaped Overlay - Semi-transparent - Hidden on mobile */}
      <div className="absolute inset-0 z-0 hidden md:flex items-center justify-center">
        <div className="relative w-[400px] h-[350px] md:w-[600px] md:h-[500px] lg:w-[800px] lg:h-[650px] opacity-30">
          <svg 
            viewBox="0 0 400 400" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full"
          >
            {/* House shape with subtle outline */}
            <path 
              d="M200 50 L350 150 L350 350 L50 350 L50 150 Z" 
              fill="rgba(0, 0, 0, 0.3)" 
              stroke="rgba(255, 255, 255, 0.2)" 
              strokeWidth="2"
            />
            {/* Roof line */}
            <path 
              d="M200 50 L200 200" 
              stroke="rgba(255, 255, 255, 0.2)" 
              strokeWidth="2"
            />
            {/* Base line */}
            <path 
              d="M150 200 L250 200" 
              stroke="rgba(255, 255, 255, 0.2)" 
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
      
      {/* Content */}
      <div className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 text-center">
        {/* Welcome Message */}
        <p className="text-xs sm:text-sm md:text-base uppercase tracking-wider text-white mb-3 sm:mb-4 font-normal" style={{ fontFamily: "'Gilroy', sans-serif" }}>
          WELCOME TO OUR PAGES
        </p>
        
        {/* Main Title - Serif Font, Each Word on Own Line */}
        <h1 className="text-3xl sm:text-4xl md:text-8xl lg:text-8xl xl:text-10xl 2xl:text-8xl font-bold text-[#eee9d2] mb-2 sm:mb-3 leading-tight px-2" style={{ fontFamily: "'Scheherazade New', serif" }}>
          <span className="block">GEHARD REAL</span>
          <span className="block">ESTATE GROUP</span>
        </h1>
        
        {/* Subtitle */}
        <p className="text-sm sm:text-base md:text-lg uppercase tracking-wide text-white/90 mb-6 sm:mb-8 md:mb-10 font-normal px-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>
          A DIVISION OF ABS ENTERPRISES
        </p>
        
        {/* Search Bar - Matching Attachment Design */}
        <div className="max-w-2xl mx-auto mb-6 sm:mb-8 px-10">
          <div className="flex px-1 flex-col sm:flex-row items-stretch sm:items-center gap-0 bg-white/20 backdrop-blur-lg overflow-hidden border border-white/20">
            {/* Location Pin Icon */}
            <div className="hidden sm:flex pl-4 pr-2 items-center">
              <MapPin className="w-4 h-4 md:w-5 md:h-5 text-white/70" />
            </div>
            
            {/* Input Field */}
            <div className="flex items-center gap-2 sm:gap-0 flex-1 px-3 sm:px-0">
              <MapPin className="w-4 h-4 sm:hidden text-white/70" />
              <Input
                placeholder="City, Subdivision, Address, Zip or MLS#"
                className="flex-1 border-0 bg-transparent text-white placeholder:text-white/60 focus-visible:ring-0 focus-visible:ring-offset-0 text-xs sm:text-sm md:text-base py-3 sm:py-4 px-2"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              />
            </div>
            
            {/* Search Button */}
            <Button className="bg-white/30 hover:bg-white/30 text-white m-1 px-4 sm:px-6 md:px-8 py-3 sm:py-6 rounded-none border-0 text-xs sm:text-sm md:text-base whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              Search
            </Button>
            
            {/* Filter Button */}
            <Button className="bg-white/30 hover:bg-white/30 text-white p-2 sm:p-3 md:p-6 rounded-none border-0">
              <Filter className="w-4 h-4 sm:w-5 sm:h-5" />
            </Button>
          </div>
        </div>
        
        {/* Tagline */}
        <div className="mb-6 sm:mb-8 px-2">
          <p className="text-lg sm:text-xl md:text-2xl uppercase font-semibold text-white mb-1 sm:mb-2 tracking-wide font-normal" style={{ fontFamily: "'Scheherazade New', serif" }}>
            WORLD-CLASS SERVICES
          </p>
          <p className="text-xs sm:text-sm md:text-base text-white/90 font-normal" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Where Professionalism, Integrity, And Care If First
          </p>
        </div>
      </div>
    </section>
  )
}
