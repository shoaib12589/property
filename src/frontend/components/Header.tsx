import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Menu, X } from 'lucide-react'
import logo from '@/assets/logo.png'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="absolute top-0 left-0 right-0 z-50 safe-top pt-4 sm:pt-5">
      <nav className="w-full bg-black/0 px-4 sm:px-6 md:px-6 lg:px-8 py-3 md:py-4 safe-x">
        <div className="max-w-7xl mx-auto flex items-center justify-between relative min-h-[56px] sm:min-h-[64px]">
          {/* Left Navigation Links - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-4 md:gap-6 lg:gap-8 flex-1 justify-start">
            <a href="#" className="text-white uppercase text-xs md:text-sm font-normal hover:text-gray-200 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Profile</a>
            <a href="#" className="text-white uppercase text-xs md:text-sm font-normal hover:text-gray-200 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Buying</a>
            <a href="#" className="text-white uppercase text-xs md:text-sm font-normal hover:text-gray-200 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Selling</a>
            <a href="#" className="text-white uppercase text-xs md:text-sm font-normal hover:text-gray-200 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Investing</a>
          </div>
          
          {/* Centered Logo - tap target on mobile */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10 pointer-events-none">
            <img 
              src={logo} 
              alt="GEHARD REAL ESTATE GROUP" 
              className="h-10 sm:h-12 md:h-14 lg:h-16 xl:h-20 w-auto object-contain max-h-[50px] sm:max-h-none"
            />
          </div>
          
          {/* Right Navigation Links and Login - Hidden on mobile */}
          <div className="hidden lg:flex items-center gap-4 md:gap-6 lg:gap-8 flex-1 justify-end">
            <a href="#" className="text-white uppercase text-xs md:text-sm font-normal hover:text-gray-200 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Blog</a>
            <a href="#" className="text-white uppercase text-xs md:text-sm font-normal hover:text-gray-200 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Feedback</a>
            <a href="#" className="text-white uppercase text-xs md:text-sm font-normal hover:text-gray-200 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>FAQ's</a>
            <Button 
              variant="outline" 
              className="bg-transparent border-white/80 text-white hover:bg-white/10 hover:text-white hover:border-white uppercase text-xs md:text-sm font-normal px-4 md:px-6 ml-2"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              Login
            </Button>
          </div>

          {/* Mobile Menu Button - min 44px touch target */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden text-white z-20 min-w-[44px] min-h-[44px] flex items-center justify-center -m-2 p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu - full width, safe area */}
        {mobileMenuOpen && (
          <div className="lg:hidden absolute top-full left-0 right-0 bg-black/95 backdrop-blur-md border-t border-white/10 safe-x safe-bottom max-h-[calc(100dvh-80px)] overflow-y-auto">
            <div className="px-4 py-6 space-y-1">
              <a href="#" className="block py-3 text-white uppercase text-sm font-normal hover:text-gray-200 transition-colors min-h-[44px] flex items-center" style={{ fontFamily: "'Gilroy', sans-serif" }} onClick={() => setMobileMenuOpen(false)}>Profile</a>
              <a href="#" className="block py-3 text-white uppercase text-sm font-normal hover:text-gray-200 transition-colors min-h-[44px] flex items-center" style={{ fontFamily: "'Gilroy', sans-serif" }} onClick={() => setMobileMenuOpen(false)}>Buying</a>
              <a href="#" className="block py-3 text-white uppercase text-sm font-normal hover:text-gray-200 transition-colors min-h-[44px] flex items-center" style={{ fontFamily: "'Gilroy', sans-serif" }} onClick={() => setMobileMenuOpen(false)}>Selling</a>
              <a href="#" className="block py-3 text-white uppercase text-sm font-normal hover:text-gray-200 transition-colors min-h-[44px] flex items-center" style={{ fontFamily: "'Gilroy', sans-serif" }} onClick={() => setMobileMenuOpen(false)}>Investing</a>
              <a href="#" className="block py-3 text-white uppercase text-sm font-normal hover:text-gray-200 transition-colors min-h-[44px] flex items-center" style={{ fontFamily: "'Gilroy', sans-serif" }} onClick={() => setMobileMenuOpen(false)}>Blog</a>
              <a href="#" className="block py-3 text-white uppercase text-sm font-normal hover:text-gray-200 transition-colors min-h-[44px] flex items-center" style={{ fontFamily: "'Gilroy', sans-serif" }} onClick={() => setMobileMenuOpen(false)}>Feedback</a>
              <a href="#" className="block py-3 text-white uppercase text-sm font-normal hover:text-gray-200 transition-colors min-h-[44px] flex items-center" style={{ fontFamily: "'Gilroy', sans-serif" }} onClick={() => setMobileMenuOpen(false)}>FAQ's</a>
              <Button 
                variant="outline" 
                className="w-full min-h-[44px] bg-transparent border-white/80 text-white hover:bg-white/10 hover:text-white hover:border-white uppercase text-sm font-normal mt-4"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
                onClick={() => setMobileMenuOpen(false)}
              >
                Login
              </Button>
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}
