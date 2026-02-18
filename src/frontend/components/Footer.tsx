import { MapPin, Phone, Mail, Instagram, Linkedin, Twitter, Facebook } from 'lucide-react'
import footerLogo from '@/assets/footer-logo.png'

export function Footer() {
  return (
    <footer className="bg-[#474131] text-white safe-bottom safe-x">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12 md:py-16 lg:py-20">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 md:gap-8 mb-8 sm:mb-10">
          {/* Work With Us */}
          <div>
            <div className="mb-3 sm:mb-4">
              <img src={footerLogo} alt="Gerhard Properties" className="h-12 sm:h-16 md:h-20 w-auto mb-3" />
              <h3 className="text-lg sm:text-xl font-semibold" style={{ fontFamily: "'Scheherazade New', serif" }}>Work With Us</h3>
            </div>
            <p className="text-gray-300 mb-3 sm:mb-4 leading-relaxed text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              Get in touch with our team to learn more about our services and how we can help you with your real estate needs.
            </p>
            <div className="flex gap-3 sm:gap-4">
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
              <a href="#" className="hover:text-[#D4AF37] transition-colors">
                <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4" style={{ fontFamily: "'Scheherazade New', serif" }}>Quick Links</h3>
            <div className="grid grid-cols-2 sm:grid-cols-2 gap-x-4 gap-y-2 sm:gap-2">
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>Home</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>Blog</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>Buying</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>Feedback</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>Selling</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>FAQs</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>Investing</a>
              <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>Log In</a>
            </div>
          </div>
          
          {/* Contact Info */}
          <div className="md:col-span-2 lg:col-span-1">
            <h3 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4" style={{ fontFamily: "'Scheherazade New', serif" }}>Contact Info</h3>
            <div className="space-y-2 sm:space-y-3">
              <div className="flex items-start gap-2 sm:gap-3">
                <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mt-1 flex-shrink-0 text-[#fff]" />
                <p className="text-gray-300 text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  123 Main Street, Suite 100<br />
                  City, State 12345
                </p>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Phone className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-[#fff]" />
                <a href="tel:+1234567890" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  +1 (234) 567-890
                </a>
              </div>
              <div className="flex items-center gap-2 sm:gap-3">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0 text-[#fff]" />
                <a href="mailto:info@gehardrealestate.com" className="text-gray-300 hover:text-white transition-colors text-sm sm:text-base break-all" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  info@gehardrealestate.com
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Bar */}
      <div className="border-t border-[#eee9d2] safe-x">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6 md:py-8 flex flex-col sm:flex-row items-center justify-between gap-4 sm:gap-4">
          <p className="text-gray-300 text-xs sm:text-sm text-center sm:text-left max-w-full" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            © 2025 Gerhard Real Estate Group, All Rights Reserved
          </p>
          <div className="flex flex-wrap items-center justify-center sm:justify-end gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm">
            <a href="#" className="text-gray-300 hover:text-white transition-colors" style={{ fontFamily: "'Gilroy', sans-serif" }}>Privacy Policy</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors" style={{ fontFamily: "'Gilroy', sans-serif" }}>Terms of Service</a>
            <a href="#" className="text-gray-300 hover:text-white transition-colors" style={{ fontFamily: "'Gilroy', sans-serif" }}>Cookie Policy</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
