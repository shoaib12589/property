import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Input } from '@/components/ui/input'
import { Link } from 'react-router-dom'
import { Search, ChevronRight, ChevronLeft } from 'lucide-react'
import { useState } from 'react'

// Blog post data
interface BlogPost {
  id: number
  title: string
  category: string
  date: string
  readTime: string
  image: string
}

const blogPosts: BlogPost[] = [
  {
    id: 1,
    title: 'Summer House',
    category: 'Auto Mobile',
    date: 'Oct 19',
    readTime: '10 min read',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop'
  },
  {
    id: 2,
    title: 'Relaxed Lodge',
    category: 'Money',
    date: 'Oct 18',
    readTime: '8 min read',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop'
  },
  {
    id: 3,
    title: 'Green Hangout Place',
    category: 'Business',
    date: 'Oct 17',
    readTime: '12 min read',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop'
  },
  {
    id: 4,
    title: 'Aqua Cove',
    category: 'Financing',
    date: 'Oct 16',
    readTime: '6 min read',
    image: 'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&h=600&fit=crop'
  },
  {
    id: 5,
    title: 'Aspen Shack',
    category: 'Auto Mobile',
    date: 'Oct 15',
    readTime: '9 min read',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop'
  },
  {
    id: 6,
    title: 'Bright Forest Camp',
    category: 'Money',
    date: 'Oct 14',
    readTime: '11 min read',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop'
  }
]

const topics = ['Automobile', 'Money', 'Business', 'Financing']

export function Blog() {
  const [activeTopic, setActiveTopic] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(1)
  const itemsPerPage = 6

  const filteredPosts = activeTopic
    ? blogPosts.filter(post => post.category.toLowerCase() === activeTopic.toLowerCase())
    : blogPosts

  const totalPages = Math.ceil(filteredPosts.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentPosts = filteredPosts.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fbfff7' }}>
      {/* Hero Banner Section with Header Overlay */}
      <section className="relative h-[400px] sm:h-[400px] md:h-[400px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&h=1080&fit=crop')`
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>

        <Header />

        {/* Hero Title */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-medium text-[#eee9d2] uppercase" style={{ fontFamily: "'Scheherazade New', serif" }}>
            BLOG
          </h1>
        </div>
      </section>

      {/* Main Content Area */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          {/* Recommended Topic Section */}
          <div className="mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-medium text-[#5C4033] mb-4 sm:mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Recommended Topic
            </h2>
            
            {/* Filter Buttons and Search Bar */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6 mb-8" style={{ display: 'flex', justifyContent: 'space-between' }}>
              {/* Filter Buttons */}
              <div className="flex flex-wrap gap-3 sm:gap-4">
                {topics.map((topic) => (
                  <button
                    key={topic}
                    onClick={() => {
                      setActiveTopic(activeTopic === topic ? null : topic)
                      setCurrentPage(1)
                    }}
                    className={`px-4 sm:px-6 py-2 sm:py-3 rounded-lg text-sm sm:text-base font-medium text-white transition-colors ${
                      activeTopic === topic
                        ? 'bg-[#A49776] text-[#5C4033]'
                        : 'bg-[#A49776] text-[#5C4033] hover:bg-[#8B7D5F]'
                    }`}
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    {topic}
                  </button>
                ))}
              </div>

              {/* Search Bar */}
              <div className="flex-1 sm:max-w-md">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400" />
                  <Input
                    placeholder="Search"
                    className="pl-10 pr-4 py-2 sm:py-6 bg-[#EEE9D2] border-gray-300 rounded-lg focus-visible:ring-0 focus-visible:ring-offset-0"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Blog Post Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mb-12 sm:mb-16">
            {currentPosts.map((post) => (
              <article key={post.id} className="flex flex-col bg-[#F9F6E9] border border-gray-300 rounded-lg">
                {/* Image Container */}
                <div className="relative mb-4 overflow-hidden rounded-lg">
                  <img 
                    src={post.image} 
                    alt={post.title} 
                    className="w-full h-48 sm:h-56 md:h-64 object-cover"
                  />
                  {/* Category Tag */}
                  <div className="absolute bottom-3 left-3">
                    <span className="px-3 py-1 rounded-full bg-white border border-gray-300 text-xs sm:text-sm font-medium text-[#5C4033]" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                      {post.category}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="flex-1 flex flex-col p-4">
                  <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-[#5C4033] mb-2 sm:mb-3" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {post.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mb-4" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {post.date} • {post.readTime}
                  </p>
                  <Link 
                    to={`/blog/${post.id}`}
                    className="inline-flex items-center gap-2 text-[#5C4033] font-bold hover:text-[#7A7363] transition-colors mt-auto"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    Read More
                    <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-center gap-2 sm:gap-4">
            {/* Previous Button */}
            <button
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="flex items-center gap-1 text-[#5C4033] hover:text-[#7A7363] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5" />
              <span className="text-sm sm:text-base">Previous</span>
            </button>

            {/* Page Numbers */}
            <div className="flex items-center gap-1 sm:gap-2">
              {Array.from({ length: Math.min(totalPages, 10) }).map((_, index) => {
                let pageNum: number
                if (totalPages <= 10) {
                  pageNum = index + 1
                } else {
                  // Show first, last, and pages around current
                  if (index === 0) pageNum = 1
                  else if (index === 9) pageNum = totalPages
                  else if (currentPage <= 5) pageNum = index + 1
                  else if (currentPage >= totalPages - 4) pageNum = totalPages - 9 + index
                  else pageNum = currentPage - 4 + index
                }
                
                const isActive = currentPage === pageNum
                
                return (
                  <button
                    key={index}
                    onClick={() => handlePageChange(pageNum)}
                    className={`w-8 h-8 sm:w-10 sm:h-10 rounded-lg text-sm sm:text-base font-medium transition-colors ${
                      isActive
                        ? 'bg-[#5C4033] text-white'
                        : 'bg-white text-[#5C4033] hover:bg-gray-100 border border-gray-300'
                    }`}
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  >
                    {pageNum}
                  </button>
                )
              })}
              
              {totalPages > 10 && currentPage < totalPages - 5 && (
                <span className="text-[#5C4033] px-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  ...
                </span>
              )}
            </div>

            {/* Next Button */}
            <button
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage >= totalPages}
              className="flex items-center gap-1 text-[#5C4033] hover:text-[#7A7363] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              <span className="text-sm sm:text-base">Next</span>
              <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
