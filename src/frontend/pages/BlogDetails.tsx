import { Footer } from '@/components/Footer'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Link } from 'react-router-dom'
import logo from '@/assets/logo.png'
import { Menu, Facebook, Instagram, Linkedin, Twitter } from 'lucide-react'

// Comments data
const comments = [
  {
    id: 1,
    name: 'Lora Adams',
    date: '25 NOVEMBER 2021',
    text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 2,
    name: 'John Williams',
    date: '25 NOVEMBER 2021',
    text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face'
  },
  {
    id: 3,
    name: 'John Williams',
    date: '25 NOVEMBER 2021',
    text: 'Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop&crop=face'
  }
]

export function BlogDetails() {
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
              <Link to="/blog" className="text-[#5C4033] uppercase text-xs md:text-sm font-normal hover:text-gray-600 transition-colors whitespace-nowrap" style={{ fontFamily: "'Gilroy', sans-serif" }}>Blog</Link>
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
            <Link to="/blog" className="text-gray-600 hover:text-[#5C4033] transition-colors font-bold text-md">Blog</Link>
            <span className="text-gray-400 font-bold text-md">/</span>
            <span className="text-[#5C4033] font-bold text-md">Blogs Details</span>
          </div>
        </div>

        {/* Hero Blog Post Section */}
        <article className="mb-12 sm:mb-16 md:mb-20">
          {/* Large Image */}
          <div className="relative mb-6 sm:mb-8 overflow-hidden rounded-lg">
            <img
              src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&h=600&fit=crop"
              alt="Summer House"
              className="w-full h-[400px] sm:h-[500px] md:h-[600px] object-cover"
            />
          </div>

          {/* Post Metadata */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
            <div className="flex items-center gap-2">
              <span className="bg-[#a49776] flex items-center gap-2 px-3 py-1 rounded-full text-xs sm:text-sm font-medium text-white" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                <span className="w-2 h-2 rounded-full bg-white flex-shrink-0" aria-hidden />
                Property
              </span>
            </div>
            <span className="text-sm sm:text-base text-gray-600" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              Oct 19 • 10 min read
            </span>
          </div>

          {/* Blog Post Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[#5C4033] mb-6 sm:mb-8" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Summer House
          </h1>

          {/* Author Information */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-6 mb-8 sm:mb-12">
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
                alt="Robert William"
                className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover flex-shrink-0"
              />
              <div>
                <p className="text-base sm:text-lg font-bold text-[#5C4033] mb-1" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  Robert William
                </p>
                <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  Readable content of a page when looking at its layout.
                </p>
                <div className="flex items-center gap-2 sm:gap-3">
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 bg-[#EEE9D2] flex items-center justify-center hover:bg-[#474131] transition-colors">
                    <Twitter className="w-4 h-4 sm:w-5 sm:h-5 text-[#5C4033] hover:text-[#fff]" />
                  </a>
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 bg-[#EEE9D2] flex items-center justify-center hover:bg-[#474131] transition-colors">
                    <Facebook className="w-4 h-4 sm:w-5 sm:h-5 text-[#5C4033] hover:text-[#fff]" />
                  </a>
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 bg-[#EEE9D2] flex items-center justify-center hover:bg-[#474131] transition-colors">
                    <Instagram className="w-4 h-4 sm:w-5 sm:h-5 text-[#5C4033] hover:text-[#fff]" />
                  </a>
                  <a href="#" className="w-8 h-8 sm:w-10 sm:h-10 rounded-full border border-gray-300 bg-[#EEE9D2] flex items-center justify-center hover:bg-[#474131] transition-colors">
                    <Linkedin className="w-4 h-4 sm:w-5 sm:h-5 text-[#5C4033] hover:text-[#fff]" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Blog Post Content */}
          <div className="prose max-w-none mb-12 sm:mb-16 md:mb-20">
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4033] mb-4 sm:mb-6" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Steering Clear of Common AI Writing Pitfalls
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4033] mb-4 sm:mb-6 mt-10 sm:mt-12 md:mt-16" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Understanding ChatGPT Capabilities - Define Your Style
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.
            </p>

            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4033] mb-4 sm:mb-6 mt-10 sm:mt-12 md:mt-16" style={{ fontFamily: "'Scheherazade New', serif" }}>
              Understand Your Readers
            </h2>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text.
            </p>
            <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
              All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable.
            </p>
          </div>
        </article>

        {/* Comments and Leave Comment Section - Two Column Layout */}
        <section className="mb-12 sm:mb-16 md:mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 lg:gap-16">
            {/* Popular Comments Section - Left Column */}
            <div>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4033] mb-2 sm:mb-3" style={{ fontFamily: "'Scheherazade New', serif" }}>
                  Popular Comments (5)
                </h2>
                <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  Readable content of a page when looking at its layout.
                </p>
              </div>

              <div className="space-y-6 sm:space-y-8 mb-8">
                {comments.map((comment) => (
                  <div key={comment.id} className="flex gap-4 sm:gap-6">
                    <img
                      src={comment.avatar}
                      alt={comment.name}
                      className="w-12 h-12 sm:w-16 sm:h-16 rounded-full object-cover flex-shrink-0"
                    />
                    <div className="flex-1">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-start gap-2 mb-2 sm:mb-3">
                        <h4 className="text-base sm:text-lg font-bold text-[#5C4033]" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                          {comment.name} 
                        </h4>
                        <span className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                          {comment.date}
                        </span>
                      </div>
                      <p className="text-sm sm:text-base text-gray-600 mb-2 sm:mb-2 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                        {comment.text}
                      </p>
                      <Link
                        to="#"
                        className="text-sm sm:text-base text-[#5C4033] font-medium hover:text-[#7A7363] transition-colors"
                        style={{ fontFamily: "'Gilroy', sans-serif" }}
                      >
                        Reply
                      </Link>
                    </div>
                  </div>
                ))}
              </div>

              <div className="text-center sm:text-center">
                <Button
                  variant="outline"
                  className="bg-[#EEE9D2] text-[#5C4033] border-[#7A7363] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  Read more
                </Button>
              </div>
            </div>

            {/* Leave a Comment Section - Right Column */}
            <div>
              <div className="mb-6 sm:mb-8">
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#5C4033] mb-2 sm:mb-3" style={{ fontFamily: "'Scheherazade New', serif" }}>
                  Leave a Comments
                </h2>
                <p className="text-sm sm:text-base text-gray-600" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  Readable content of a page when looking at its layout.
                </p>
              </div>

              <form className="space-y-4 sm:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <Input
                    placeholder="Your Name"
                    className="bg-[#FEFBEE] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 py-3"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  />
                  <Input
                    placeholder="Your Email"
                    type="email"
                    className="bg-[#FEFBEE] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 py-3"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  />
                </div>
                <Input
                  placeholder="Phone Number"
                  className="bg-[#FEFBEE] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 py-3"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                />
                <Textarea
                  placeholder="Write a message"
                  className="bg-[#FEFBEE] border-gray-300 focus-visible:ring-0 focus-visible:ring-offset-0 min-h-[150px] sm:min-h-[200px] py-3"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                />
                <Button
                  type="submit"
                  className="w-full sm:w-full bg-[#eee9d2] text-[#5C4033] border-[#7A7363] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  Send a Message
                </Button>
              </form>
            </div>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  )
}
