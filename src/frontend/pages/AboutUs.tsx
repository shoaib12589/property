import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Phone, Mail } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '@/assets/logo.png'
import { Menu } from 'lucide-react'

export function AboutUs() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fbfff7' }}>
      {/* Header with white background */}
      <header className="relative py-5 bg-white border-b border-gray-200">
        <nav className="w-full px-4 md:px-6 py-3 md:py-4">
          <div className="max-w-7xl mx-auto flex items-center justify-between relative">
            {/* Left Navigation Links - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-4 md:gap-6 lg:gap-8 flex-1 justify-start">
              <Link to="/" className="text-[#5C4033] uppercase text-xs md:text-sm font-normal hover:text-gray-600 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Profile</Link>
              <Link to="/" className="text-[#5C4033] uppercase text-xs md:text-sm font-normal hover:text-gray-600 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Buying</Link>
              <Link to="/" className="text-[#5C4033] uppercase text-xs md:text-sm font-normal hover:text-gray-600 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Selling</Link>
              <Link to="/" className="text-[#5C4033] uppercase text-xs md:text-sm font-normal hover:text-gray-600 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Investing</Link>
            </div>
            
            {/* Centered Logo */}
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center z-10">
              <Link to="/">
                <img 
                  src={logo} 
                  alt="GEHARD REAL ESTATE GROUP" 
                  className="h-12 sm:h-14 md:h-16 lg:h-20 w-auto object-contain"
                />
              </Link>
            </div>
            
            {/* Right Navigation Links and Login - Hidden on mobile */}
            <div className="hidden lg:flex items-center gap-4 md:gap-6 lg:gap-8 flex-1 justify-end">
              <Link to="/" className="text-[#5C4033] uppercase text-xs md:text-sm font-normal hover:text-gray-600 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Blog</Link>
              <Link to="/" className="text-[#5C4033] uppercase text-xs md:text-sm font-normal hover:text-gray-600 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Feedback</Link>
              <Link to="/" className="text-[#5C4033] uppercase text-xs md:text-sm font-normal hover:text-gray-600 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>FAQ's</Link>
              <Button 
                variant="outline" 
                className="bg-transparent border-[#5C4033]/80 text-[#5C4033] hover:bg-[#5C4033]/10 hover:text-[#5C4033] hover:border-[#5C4033] uppercase text-xs md:text-sm font-normal px-4 md:px-6 ml-2"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                Login
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="lg:hidden text-[#5C4033] z-20"
              aria-label="Toggle menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </nav>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 pb-12">
        {/* Breadcrumbs */}
        <div className="pt-4 pb-6 sm:pb-8">
          <div className="flex items-center gap-2 text-sm" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            <Link to="/" className="text-gray-600 hover:text-[#5C4033] transition-colors font-bold text-md">Home</Link>
            <span className="text-gray-400 font-bold text-md">/</span>
            <span className="text-[#5C4033] font-bold text-md">About Us</span>
          </div>
        </div>

        {/* Profile Section */}
        <div className="flex flex-col items-center py-8 sm:py-5 md:py-5">
          {/* Circular Portrait */}
          <div className="mb-6 sm:mb-8">
            <img 
              src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face" 
              alt="Samantha Smith" 
              className="w-48 h-48 sm:w-56 sm:h-56 md:w-64 md:h-64 rounded-full object-cover border-4 border-white shadow-lg"
            />
          </div>

          {/* Name */}
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-8xl font-medium text-[#70654B] mb-3 sm:mb-4 uppercase" style={{ fontFamily: "'Scheherazade New', serif" }}>
            SAMANTHA SMITH
          </h1>

          {/* Title/Role */}
          <p className="text-xs sm:text-sm md:text-base uppercase text-gray-600 mb-6 sm:mb-8 text-[#70654B] font-medium" style={{ fontFamily: "'Gilroy', sans-serif", letterSpacing: '0.3em' }}>
            REAL ESTATE AGENT, GRC, LICENCE NO. 13567890
          </p>

          {/* Contact Details */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>(123) 456-7890</span>
            </div>
            <div className="flex items-center gap-2 text-sm sm:text-base text-gray-600" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              <span>info@gehard.com</span>
            </div>
          </div>
        </div>

        {/* Expertise Section */}
        <div className="py-8 sm:py-12 md:py-16">
          {/* Horizontal Line Above */}
          <div className="w-full h-px bg-gray-200 mb-8 sm:mb-12"></div>

          {/* Heading */}
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#5C4033] mb-2 sm:mb-3 uppercase leading-tight" style={{ fontFamily: "'Scheherazade New', serif" }}>
              START TO FINISH DEVELOPMENT
            </h2>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#5C4033] uppercase leading-tight" style={{ fontFamily: "'Scheherazade New', serif" }}>
              EXPERTISE FOR THE NORTH TEXAS REGION
            </h2>
          </div>


          {/* Body Text */}
          <div className="max-w-4xl mx-auto space-y-6 sm:space-y-8">
            <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 text-center leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
