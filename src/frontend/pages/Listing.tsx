import { useState } from 'react'
import { Footer } from '@/components/Footer'
import { PropertyCard } from '@/components/PropertyCard'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Filter, MapPin, ChevronLeft, ChevronRight, LayoutGrid, Map as MapIcon, Menu } from 'lucide-react'
import { Link } from 'react-router-dom'
import logo from '@/assets/logo.png'

// Helper function to create image arrays
const createImages = (primary: string, ...additional: string[]) => {
  return [primary, ...additional]
}

// Sample property data for listing page
const allProperties = [
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800'
    ),
    status: 'OPEN' as const,
    price: '$850,000',
    type: 'Modern Luxury Villa',
    beds: 4,
    baths: 3,
    sqft: '3,200 sqft',
    address: '4517 Washington Ave. Manchester, Kentucky 39495',
    listedBy: 'Killer Williams Realty Creator',
    openHouse: 'Sat, 2-4pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800'
    ),
    status: 'OPEN' as const,
    price: '$725,000',
    type: 'Spacious Townhouse',
    beds: 3,
    baths: 2.5,
    sqft: '2,800 sqft',
    address: '890 Maple Road, Portland, OR 97201',
    listedBy: 'Urban Living Realty',
    openHouse: 'Sat, 2-4pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    ),
    status: 'SOLD' as const,
    price: '$550,000',
    type: 'Classic Family Home',
    beds: 3,
    baths: 2,
    sqft: '2,200 sqft',
    address: '234 Heritage Street, Boston, MA 02101',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$1,150,000',
    type: 'Modern Beachfront Villa',
    beds: 4,
    baths: 3.5,
    sqft: '3,600 sqft',
    address: '234 Ocean Drive, Miami, FL 33139',
    listedBy: 'Coastal Properties Group',
    openHouse: 'Sat, 2-4pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$650,000',
    type: 'Contemporary Family Home',
    beds: 3,
    baths: 2,
    sqft: '2,500 sqft',
    address: '567 Oak Avenue, Seattle, WA 98101',
    listedBy: 'Gehard Real Estate Group',
    openHouse: 'Sun, 1-3pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800'
    ),
    status: 'OPEN' as const,
    price: '$950,000',
    type: 'Luxury Penthouse',
    beds: 4,
    baths: 3,
    sqft: '3,800 sqft',
    address: '55 Skyline Blvd, Seattle, WA 98101',
    listedBy: 'Realty Services',
    openHouse: 'Sat, 2-4pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    ),
    status: 'OPEN' as const,
    price: '$1,200,000',
    type: 'Elegant Estate Home',
    beds: 5,
    baths: 4,
    sqft: '4,500 sqft',
    address: '789 Pine Avenue, Denver, CO 80202',
    listedBy: 'Premium Properties Inc',
    openHouse: 'Sat, 2-4pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$450,000',
    type: 'Cozy Suburban Home',
    beds: 3,
    baths: 2,
    sqft: '2,100 sqft',
    address: '321 Elm Drive, Austin, TX 78701',
    listedBy: 'Gehard Real Estate Group',
    openHouse: 'Sat, 2-4pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$875,000',
    type: 'Elegant Victorian',
    beds: 4,
    baths: 3,
    sqft: '3,100 sqft',
    address: '789 Heritage Avenue, San Francisco, CA 94102',
    listedBy: 'Gehard Real Estate Group',
    openHouse: 'Sat, 1-3pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800'
    ),
    status: 'OPEN' as const,
    price: '$680,000',
    type: 'Contemporary Ranch',
    beds: 3,
    baths: 2,
    sqft: '2,600 sqft',
    address: '456 Hilltop Road, Austin, TX 78701',
    listedBy: 'Gehard Real Estate Group',
    openHouse: 'Sun, 3-5pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    ),
    status: 'OPEN' as const,
    price: '$1,050,000',
    type: 'Modern Mansion',
    beds: 6,
    baths: 5,
    sqft: '5,200 sqft',
    address: '1234 Grand Boulevard, Los Angeles, CA 90001',
    listedBy: 'Luxury Homes Realty',
    openHouse: 'Sat, 2-4pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$525,000',
    type: 'Charming Cottage',
    beds: 2,
    baths: 2,
    sqft: '1,900 sqft',
    address: '890 Garden Lane, Portland, OR 97201',
    listedBy: 'Gehard Real Estate Group',
    openHouse: 'Sat, 2-4pm'
  }
]

export function Listing() {
  const [showOpenOnly, setShowOpenOnly] = useState(false)
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list')
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 12

  const filteredProperties = showOpenOnly 
    ? allProperties.filter(p => p.status === 'OPEN')
    : allProperties

  const totalPages = Math.ceil(filteredProperties.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentProperties = filteredProperties.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fbfff7' }}>
      {/* Header with different styling for listing page */}
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
      <div className="pt-4 pb-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            <Link to="/" className="text-gray-600 hover:text-[#5C4033] transition-colors font-bold text-md">Home</Link>
            <span className="text-gray-400 font-bold text-md">/</span>
            <span className="text-[#5C4033] font-bold text-md">Residential Listing</span>
          </div>
        </div>
      </div>

        {/* Search Bar */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="flex-1 flex items-center gap-0 bg-[#eee9d2] backdrop-blur-sm rounded-lg border border-gray-200 overflow-hidden">
              <div className="pl-4 pr-2 flex items-center">
                <MapPin className="w-5 h-5 text-gray-400" />
              </div>
              <Input
                placeholder="City, Subdivision, Address, Zip or MLS#"
                className="flex-1 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 text-sm md:text-base py-4 px-2 shadow-none"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              />
              <Button className="bg-[#eae3c6] text-[#70654B] hover:bg-[#eae3c6] px-6 md:px-8 py-2 m-1 rounded-none border-0 h-full font-bold shadow-none" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Search
              </Button>
              <Button className="bg-[#eae3c6] text-[#70654B] hover:bg-[#eae3c6] p-2 m-1 rounded-none border-0 h-full font-bold shadow-none">
                <Filter className="w-5 h-5" />
              </Button>
            </div>
            
            {/* View Toggle Buttons */}
            <div className="flex gap-2">
              <Button
                onClick={() => setViewMode('list')}
                className={`px-4 py-2 rounded-sm transition-colors ${
                  viewMode === 'list'
                    ? 'bg-[#EEE9D2] text-[#5C4033] border border-[#D4AF37]'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                <LayoutGrid className="w-4 h-4 mr-2" />
                Listings View
              </Button>
              <Button
                onClick={() => setViewMode('map')}
                className={`px-4 py-2 rounded-sm transition-colors ${
                  viewMode === 'map'
                    ? 'bg-[#EEE9D2] text-[#5C4033] border border-[#D4AF37]'
                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
                }`}
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                <MapIcon className="w-4 h-4 mr-2" />
                Map View
              </Button>
            </div>
          </div>
        </div>

        {/* Page Title and Toggle */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4">
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#5C4033]" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Residential Listing
          </h1>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={showOpenOnly}
                onChange={(e) => setShowOpenOnly(e.target.checked)}
                className="w-4 h-4 text-[#D4AF37] border-gray-300 rounded focus:ring-[#D4AF37]"
              />
              <span className="text-sm text-gray-700" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Only Show Open Residential Listing
              </span>
            </label>
            <span className="text-sm text-gray-600 border border-[#E8E8D0] px-5 py-2 rounded-sm" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              {filteredProperties.length} Listings
            </span>
          </div>
        </div>

        {/* Map Section - Always visible in list view, full screen in map view */}
        <div className={`mb-8 rounded-lg overflow-hidden border border-gray-200 shadow-sm ${viewMode === 'map' ? '' : ''}`}>
          <div className={`w-full ${viewMode === 'map' ? 'h-[600px] sm:h-[700px]' : 'h-[400px] sm:h-[500px]'} bg-gray-100 relative`}>
            {/* Placeholder for map - in production, you'd use Google Maps, Mapbox, etc. */}
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-blue-50 to-gray-100">
              <div className="text-center">
                <MapIcon className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  Interactive Map View
                </p>
                <p className="text-sm text-gray-500 mt-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  Property markers and locations will be displayed here
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Property Cards Grid - Hidden in map view, shown in list view */}
        {viewMode === 'list' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              {currentProperties.map((property, index) => (
                <PropertyCard key={index} {...property} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex items-center justify-center gap-4 mb-12">
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="bg-[#F5F5DC] border-[#7A7363] hover:bg-[#E8E8D0] text-[#7A7363] disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 rounded-sm"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              
              <div className="flex items-center gap-2">
                {Array.from({ length: Math.min(totalPages, 5) }).map((_, index) => {
                  const pageNum = index + 1
                  const isActive = currentPage === pageNum
                  
                  return (
                    <button
                      key={index}
                      onClick={() => handlePageChange(pageNum)}
                      className={`w-8 h-8 rounded-sm text-sm font-normal transition-colors ${
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
                
                {totalPages > 5 && (
                  <span className="text-[#5C4033] px-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    ...
                  </span>
                )}
              </div>
              
              <Button
                variant="outline"
                size="icon"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage >= totalPages}
                className="bg-[#F5F5DC] border-[#7A7363] hover:bg-[#E8E8D0] text-[#7A7363] disabled:opacity-50 disabled:cursor-not-allowed w-10 h-10 rounded-sm"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>

            
          </>
        )}
      </div>
{/* Promotional Text Section */}
<div className="text-center py-16 bg-[#eee9d2]">
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4033] mb-4" style={{ fontFamily: "'Scheherazade New', serif" }}>
                You've Seen First 12 Properties Out Of 3,560 Listing
              </h2>
              <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Reader Will Be Distracted By The Readable Content Of A Page When Looking At Its Layout.
              </p>
            </div>
      <Footer />
    </div>
  )
}
