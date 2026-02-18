import { useState } from 'react'
import { Link } from 'react-router-dom'
import { User, Mail, Phone, Lock, Eye, EyeOff, Check } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

// Design tokens (match attachment: muted brown/gold button, dark text)
const tokens = {
  formBg: '#FAFAF9',
  formPattern: 'rgba(0,0,0,0.02)',
  heading: '#1a1a1a',
  subtext: '#666666',
  label: '#374151',
  inputBorder: '#E5E7EB',
  placeholder: '#9CA3AF',
  button: '#A49776',   // muted brownish-gold
  link: '#A49776',
}

const benefits = [
  'Access to thousands of properties',
  'Connect with verified agents',
  'List your own properties',
]

export function Register() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  return (
    <div className="min-h-screen min-h-[100dvh] grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] w-full overflow-x-hidden">
      {/* Left panel – Visual & promotional (~60%) – order-2 on mobile so form shows first */}
      <div className="relative min-h-[35vh] sm:min-h-[40vh] lg:min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-10 sm:py-14 md:py-16 lg:py-24 order-2 lg:order-1 safe-x safe-top safe-bottom">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />

        <div className="relative z-10 w-full max-w-md text-center mx-auto">
          <h1
            className="text-2xl sm:text-3xl md:text-4xl lg:text-[2.5rem] font-bold text-white mb-2 sm:mb-3"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            Join Estate Hub Today
          </h1>
          <p
            className="text-white/95 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 lg:mb-10"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
          >
            Start Your Journey To Finding The Perfect Property
          </p>

          <div className="space-y-2 sm:space-y-3 text-left max-w-sm mx-auto lg:mx-0 lg:max-w-none">
            {benefits.map((text) => (
              <div
                key={text}
                className="flex items-center gap-2 sm:gap-3 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 w-full"
                style={{
                  background: 'rgba(255, 255, 255, 0.15)',
                  backdropFilter: 'blur(12px)',
                  WebkitBackdropFilter: 'blur(12px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                }}
              >
                <div
                  className="shrink-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ background: 'rgba(255, 255, 255, 0.25)' }}
                >
                  <Check className="w-4 h-4 text-white" strokeWidth={3} />
                </div>
                <span
                  className="text-white font-medium text-xs sm:text-sm md:text-base"
                  style={{ fontFamily: "'Gilroy', sans-serif" }}
                >
                  {text}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Right panel – Create Account form (~40%) – order-1 on mobile */}
      <div
        className="relative flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 lg:px-10 py-8 sm:py-10 md:py-12 lg:py-16 min-h-[65vh] sm:min-h-[60vh] lg:min-h-screen overflow-y-auto order-1 lg:order-2 safe-x safe-top safe-bottom"
        style={{
          backgroundColor: tokens.formBg,
          backgroundImage: `repeating-linear-gradient(
            -45deg,
            transparent,
            transparent 8px,
            ${tokens.formPattern} 8px,
            ${tokens.formPattern} 9px
          )`,
        }}
      >
        <div className="w-full max-w-[380px] mx-auto">
          <h1
            className="text-xl sm:text-2xl md:text-3xl font-bold mb-1"
            style={{
              fontFamily: "'Gilroy', sans-serif",
              color: tokens.heading,
            }}
          >
            Create Account
          </h1>
          <p
            className="text-xs sm:text-sm mb-6 sm:mb-8"
            style={{
              fontFamily: "'Gilroy', sans-serif",
              color: tokens.subtext,
            }}
          >
            Sign up to get started
          </p>

          <form className="space-y-4 sm:space-y-5" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: tokens.label }}
              >
                Full Name
              </label>
              <div className="relative">
                <User
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: tokens.placeholder }}
                  strokeWidth={1.5}
                />
                <Input
                  type="text"
                  placeholder="Enter your full name"
                  className="pl-10 pr-4 h-11 sm:h-12 bg-white border rounded-lg placeholder:text-[#9CA3AF] focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#A49776] text-base sm:text-sm"
                  style={{
                    borderColor: tokens.inputBorder,
                    color: tokens.heading,
                  }}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: tokens.label }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: tokens.placeholder }}
                  strokeWidth={1.5}
                />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 pr-4 h-11 sm:h-12 bg-white border rounded-lg placeholder:text-[#9CA3AF] focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#A49776] text-base sm:text-sm"
                  style={{
                    borderColor: tokens.inputBorder,
                    color: tokens.heading,
                  }}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: tokens.label }}
              >
                Phone Number
              </label>
              <div className="relative">
                <Phone
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: tokens.placeholder }}
                  strokeWidth={1.5}
                />
                <Input
                  type="tel"
                  placeholder="Enter your phone number"
                  className="pl-10 pr-4 h-11 sm:h-12 bg-white border rounded-lg placeholder:text-[#9CA3AF] focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#A49776] text-base sm:text-sm"
                  style={{
                    borderColor: tokens.inputBorder,
                    color: tokens.heading,
                  }}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: tokens.label }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: tokens.placeholder }}
                  strokeWidth={1.5}
                />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create a password"
                  className="pl-10 pr-12 h-11 sm:h-12 bg-white border rounded-lg placeholder:text-[#9CA3AF] focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#A49776] text-base sm:text-sm"
                  style={{
                    borderColor: tokens.inputBorder,
                    color: tokens.heading,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80"
                  style={{ color: tokens.placeholder }}
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-5 h-5" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: tokens.label }}
              >
                Confirm Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: tokens.placeholder }}
                  strokeWidth={1.5}
                />
                <Input
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  className="pl-10 pr-12 h-11 sm:h-12 bg-white border rounded-lg placeholder:text-[#9CA3AF] focus-visible:ring-2 focus-visible:ring-offset-0 focus-visible:ring-[#A49776] text-base sm:text-sm"
                  style={{
                    borderColor: tokens.inputBorder,
                    color: tokens.heading,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80"
                  style={{ color: tokens.placeholder }}
                  aria-label={showConfirmPassword ? 'Hide password' : 'Show password'}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" strokeWidth={1.5} />
                  ) : (
                    <Eye className="w-5 h-5" strokeWidth={1.5} />
                  )}
                </button>
              </div>
            </div>

            <p
              className="text-xs sm:text-sm leading-relaxed"
              style={{ color: tokens.subtext, fontFamily: "'Gilroy', sans-serif" }}
            >
              I agree to the{' '}
              <Link to="/user/terms" className="underline hover:no-underline" style={{ color: tokens.link }}>
                Terms of Service
              </Link>
              {' '}and{' '}
              <Link to="/user/privacy" className="underline hover:no-underline" style={{ color: tokens.link }}>
                Privacy Policy
              </Link>
            </p>

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 min-h-[44px] text-white font-semibold text-sm sm:text-base rounded-lg hover:opacity-95"
              style={{ backgroundColor: tokens.button }}
            >
              Create Account
            </Button>
          </form>

          <p
            className="mt-6 sm:mt-8 text-center text-xs sm:text-sm"
            style={{ color: tokens.subtext, fontFamily: "'Gilroy', sans-serif" }}
          >
            Already have an account?{' '}
            <Link
              to="/user/login"
              className="font-semibold hover:underline"
              style={{ color: tokens.link }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
