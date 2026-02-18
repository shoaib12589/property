import realSolucionesLogo from '@/assets/real-soluciones-logo.png'
import realmagicLogo from '@/assets/realmagic-logo.png'
import eldersLogo from '@/assets/elders-real-estate-logo.png'
import rbnLogo from '@/assets/rbn-logo.png'

export function ProfessionalNetworks() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-white">
      <div className="max-w-7xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5C4033] mb-3 sm:mb-4" style={{ fontFamily: "'Scheherazade New', serif" }}>
          Our Professional Networks
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 md:mb-10" style={{ fontFamily: "'Gilroy', sans-serif" }}>
          Discover homes located in vibrant areas with everything you need nearby.
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 items-center justify-center gap-4 sm:gap-6 md:gap-8 lg:gap-12">
          <div className="flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
            <img src={realSolucionesLogo} alt="REAL SOLUTIONS" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
          </div>
          <div className="flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
            <img src={realmagicLogo} alt="REALmagic" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
          </div>
          <div className="flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
            <img src={eldersLogo} alt="Elders Real Estate" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
          </div>
          <div className="flex items-center justify-center px-4 sm:px-6 md:px-8 py-4 sm:py-5 md:py-6">
            <img src={rbnLogo} alt="RBN Real Broadcast Network" className="h-12 sm:h-16 md:h-20 w-auto object-contain" />
          </div>
        </div>
      </div>
    </section>
  )
}
