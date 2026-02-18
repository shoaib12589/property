import { Button } from '@/components/ui/button'

export function ContactSection() {
  return (
    <section className="py-8 sm:py-12 md:py-16 px-4 sm:px-6 bg-[#f5f4e5]">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#5C4033] mb-3 sm:mb-4" style={{ fontFamily: "'Scheherazade New', serif" }}>
          Contact Us
        </h2>
        <p className="text-sm sm:text-base md:text-lg text-gray-700 mb-6 sm:mb-8" style={{ fontFamily: "'Gilroy', sans-serif" }}>
          To Receive Newsletters, New And Exclusive Listings.
        </p>
        <Button 
          className="bg-transparent text-[#5C4033] border-2 border-[#474131] hover:bg-[#F5F5DC] px-6 sm:px-8 md:px-12 py-4 sm:py-5 md:py-6 text-sm sm:text-base md:text-lg font-semibold"
          style={{ fontFamily: "'Gilroy', sans-serif" }}
        >
          Contact Us
        </Button>
      </div>
    </section>
  )
}
