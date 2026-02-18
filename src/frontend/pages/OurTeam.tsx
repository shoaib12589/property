import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'

// Team member data
interface TeamMember {
  id: number
  name: string
  role: string
  listingCount: number
  image: string
}

const teamMembers: TeamMember[] = [
  { id: 1, name: 'Carter Press', role: 'Realtor', listingCount: 6, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
  { id: 2, name: 'Sarah Johnson', role: 'Realtor', listingCount: 8, image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop&crop=face' },
  { id: 3, name: 'Michael Chen', role: 'Realtor', listingCount: 5, image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=face' },
  { id: 4, name: 'Emily Rodriguez', role: 'Realtor', listingCount: 12, image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=face' },
  { id: 5, name: 'David Thompson', role: 'Realtor', listingCount: 9, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' },
  { id: 6, name: 'Jessica Martinez', role: 'Realtor', listingCount: 7, image: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=400&fit=crop&crop=face' },
  { id: 7, name: 'Robert Williams', role: 'Realtor', listingCount: 10, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face' },
  { id: 8, name: 'Amanda Davis', role: 'Realtor', listingCount: 6, image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=400&h=400&fit=crop&crop=face' },
  { id: 9, name: 'James Wilson', role: 'Realtor', listingCount: 8, image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400&h=400&fit=crop&crop=face' },
  { id: 10, name: 'Lisa Anderson', role: 'Realtor', listingCount: 11, image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=face' },
  { id: 11, name: 'Christopher Brown', role: 'Realtor', listingCount: 5, image: 'https://images.unsplash.com/photo-1506277886164-e25aa3f4ef7f?w=400&h=400&fit=crop&crop=face' },
  { id: 12, name: 'Michelle Taylor', role: 'Realtor', listingCount: 9, image: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=400&h=400&fit=crop&crop=face' },
  { id: 13, name: 'Daniel Garcia', role: 'Realtor', listingCount: 7, image: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=400&h=400&fit=crop&crop=face' },
  { id: 14, name: 'Nicole Moore', role: 'Realtor', listingCount: 6, image: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=400&h=400&fit=crop&crop=face' },
  { id: 15, name: 'Kevin Jackson', role: 'Realtor', listingCount: 10, image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=400&h=400&fit=crop&crop=face' },
  { id: 16, name: 'Rachel White', role: 'Realtor', listingCount: 8, image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&h=400&fit=crop&crop=face' },
  { id: 17, name: 'Matthew Harris', role: 'Realtor', listingCount: 12, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=face' },
  { id: 18, name: 'Stephanie Clark', role: 'Realtor', listingCount: 7, image: 'https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?w=400&h=400&fit=crop&crop=face' },
]

export function OurTeam() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fbfff7' }}>
      {/* Hero Banner Section with Header Overlay */}
      <section className="relative h-[400px] sm:h-[500px] md:h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&h=1080&fit=crop')`
          }}
        >
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        <Header />

        {/* Hero Title */}
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-[#eee9d2] uppercase" style={{ fontFamily: "'Scheherazade New', serif" }}>
            OUR TEAMS
          </h1>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-center">
            {/* Left Column - Text Content */}
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5C4033] mb-6 sm:mb-8 leading-tight" style={{ fontFamily: "'Scheherazade New', serif" }}>
                Start To Finish Development Expertise For The North Texas Region
              </h2>
              <p className="text-sm sm:text-base md:text-lg text-gray-600 mb-6 sm:mb-8 leading-relaxed" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </p>
              <Button 
                variant="outline"
                className="bg-[#EEE9D2] text-[#5C4033] border-[#7A7363] hover:bg-[#E8E8D0] font-medium text-sm sm:text-base px-6 sm:px-8 py-2 sm:py-3"
                style={{ fontFamily: "'Gilroy', sans-serif" }}
              >
                Learn More
              </Button>
            </div>

            {/* Right Column - Image */}
            <div className="order-first lg:order-last">
              <img 
                src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=800&h=600&fit=crop" 
                alt="Professional Team" 
                className="w-full h-auto rounded-lg shadow-lg object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Team Members Grid Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6" style={{ backgroundColor: '#fbfff7' }}>
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8">
            {teamMembers.map((member) => (
              <div key={member.id} className="flex flex-col items-center text-center">
                {/* Circular Profile Image */}
                <div className="mb-4">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-full object-cover border-2 border-white shadow-md"
                  />
                </div>

                {/* Role Badge */}
                <div className="-mt-10 mb-2 px-3 py-1 rounded-full bg-[#EEE9D2]">
                  <span className="text-xs sm:text-sm text-[#5C4033] font-medium" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                    {member.role}
                  </span>
                </div>

                {/* Name */}
                <h3 className="text-sm sm:text-base md:text-lg font-bold text-[#5C4033] mb-1" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  {member.name}
                </h3>

                {/* Listing Count */}
                <p className="text-xs sm:text-sm text-gray-600" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                  {member.listingCount} Listing
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* We Are Hiring Section */}
      <section className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-[#f5f4e5]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#5C4033] mb-6 sm:mb-8" style={{ fontFamily: "'Scheherazade New', serif" }}>
            We Are Hiring
          </h2>
          <Button 
            variant="outline"
            className="bg-transparent text-[#70654B] border-[#7A7363] hover:bg-[#E8E8D0] font-bold text-sm sm:text-base px-8 sm:px-10 py-3 sm:py-4 rounded-none"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            Contact Us
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  )
}
