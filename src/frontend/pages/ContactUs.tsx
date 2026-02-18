import { Footer } from '@/components/Footer'
import { Header } from '@/components/Header'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'

const bgLight = '#F8F7F0'

export function ContactUs() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: bgLight }}>
      {/* Hero: blurred warm image + CONTACT US */}
      <section className="relative min-h-[320px] sm:min-h-[380px] md:min-h-[420px] flex flex-col items-center justify-center overflow-hidden pt-24 pb-12">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&h=1080&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-[#5C4033]/50 backdrop-blur-[2px]" />
        <Header />
        <div className="relative z-10 text-center">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-medium uppercase tracking-wide text-[#D4AF37]" style={{ fontFamily: "'Scheherazade New', serif" }}>
            Contact Us
          </h1>
        </div>
      </section>

      {/* Let's Connect: two columns - form left, image right */}
      <section className="py-16 sm:py-20 md:py-24 px-4 sm:px-6" style={{ backgroundColor: bgLight }}>
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-center">
            {/* Left: Form */}
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold text-[#5C4033] mb-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Let&apos;s Connect
              </h2>
              <p className="text-gray-600 text-sm sm:text-base mb-6" style={{ fontFamily: "'Gilroy', sans-serif" }}>
                Readable content of a page when looking at its layout.
              </p>
              <form className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <Input
                    placeholder="Last Name"
                    className="rounded-lg border-[#d4cfc0] bg-white/90 text-[#333] placeholder:text-gray-400 h-11"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  />
                  <Input
                    placeholder="First Name"
                    className="rounded-lg border-[#d4cfc0] bg-white/90 text-[#333] placeholder:text-gray-400 h-11"
                    style={{ fontFamily: "'Gilroy', sans-serif" }}
                  />
                </div>
                <Input
                  type="email"
                  placeholder="Email"
                  className="rounded-lg border-[#d4cfc0] bg-white/90 text-[#333] placeholder:text-gray-400 h-11 w-full"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                />
                <Input
                  placeholder="Address (Optional)"
                  className="rounded-lg border-[#d4cfc0] bg-white/90 text-[#333] placeholder:text-gray-400 h-11 w-full"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                />
                <Input
                  type="tel"
                  placeholder="Phone Number"
                  className="rounded-lg border-[#d4cfc0] bg-white/90 text-[#333] placeholder:text-gray-400 h-11 w-full"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                />
                <Textarea
                  placeholder="Message"
                  rows={5}
                  className="rounded-lg border-[#d4cfc0] bg-white/90 text-[#333] placeholder:text-gray-400 resize-none"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                />
                <Button
                  type="submit"
                  className="rounded-lg bg-[#EEE9D2] text-[#5C4033] border border-[#d4cfc0] hover:bg-[#E8E8D0] font-medium px-8 py-3 w-full sm:w-auto"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  Submit
                </Button>
              </form>
            </div>
            {/* Right: Image */}
            <div className="order-first lg:order-last">
              <img
                src="https://images.unsplash.com/photo-1557804506-669a67965ba0?w=600&h=700&fit=crop"
                alt="Person with smartphone"
                className="w-full h-[280px] sm:h-[360px] lg:h-[420px] object-cover rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-16 sm:py-20 px-4 sm:px-6" style={{ backgroundColor: bgLight }}>
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-2xl sm:text-3xl font-semibold text-[#5C4033] mb-2" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            Contact Us
          </h2>
          <p className="text-gray-600 text-sm sm:text-base mb-6" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            To Receive Newsletters, New And Exclusive Listings
          </p>
          <Button
            variant="outline"
            className="rounded-lg bg-[#F8F7F0] text-[#5C4033] border-2 border-[#5C4033] hover:bg-[#EEE9D2] font-medium px-8 py-3"
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
