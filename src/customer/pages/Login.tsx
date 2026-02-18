import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import logo from '@/assets/logo.png'

// Figma design tokens (Gehard Web App)
const figma = {
  leftBg: '#F8F7F4',
  primary: '#EEE9D2',
  secondary: '#A49776',   // Sec Color – button, links, logo accent
  textField: '#70654B',   // Text Fiel – labels
  dBlack: '#777777',      // D Black Color – secondary text
  heading: '#333333',
  subtext: '#666666',
  inputBorder: '#D9D9D9',
  placeholder: '#AAAAAA',
}

export function Login() {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen min-h-[100dvh] grid grid-cols-1 lg:grid-cols-2 w-full overflow-x-hidden">
      {/* Left column – Login form (scrollable on small screens) */}
      <div
        className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:py-16 overflow-y-auto safe-x safe-top safe-bottom"
        style={{ backgroundColor: figma.leftBg }}
      >
        <div className="w-full max-w-[400px] mx-auto">
          {/* Logo – Figma: golden house icon + GERHARD */}
          <div className="flex flex-col items-left mb-6 sm:mb-8 md:mb-10">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center overflow-hidden border-2 bg-white shadow-sm"
              style={{ borderColor: figma.secondary }}
            >
              <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            </div>
          </div>

          <h1
            className="mb-1 text-xl sm:text-2xl md:text-[2rem]"
            style={{
              fontFamily: "'Gilroy', sans-serif",
              fontWeight: 700,
              color: figma.heading,
            }}
          >
            Welcome Back
          </h1>
          <p
            className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base"
            style={{
              fontFamily: "'Gilroy', sans-serif",
              fontWeight: 400,
              color: figma.subtext,
            }}
          >
            Sign in to your account to continue
          </p>

          <form className="space-y-4 sm:space-y-5" style={{ fontFamily: "'Gilroy', sans-serif" }}>
            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: figma.textField }}
              >
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: figma.placeholder }}
                  strokeWidth={1.5}
                />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="pl-10 pr-4 h-11 sm:h-12 bg-white focus-visible:ring-2 focus-visible:ring-offset-0 border placeholder:text-[#AAAAAA] focus-visible:ring-[#A49776] text-base sm:text-sm"
                  style={{
                    borderColor: figma.inputBorder,
                    color: figma.heading,
                    borderRadius: 4,
                  }}
                />
              </div>
            </div>

            <div>
              <label
                className="block text-sm font-medium mb-1.5"
                style={{ color: figma.textField }}
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5"
                  style={{ color: figma.placeholder }}
                  strokeWidth={1.5}
                />
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  className="pl-10 pr-12 h-11 sm:h-12 bg-white focus-visible:ring-2 focus-visible:ring-offset-0 border placeholder:text-[#AAAAAA] focus-visible:ring-[#A49776] text-base sm:text-sm"
                  style={{
                    borderColor: figma.inputBorder,
                    color: figma.heading,
                    borderRadius: 4,
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 hover:opacity-80"
                  style={{ color: figma.placeholder }}
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

            <div className="flex items-center justify-between text-sm">
              <label
                className="flex items-center gap-2 cursor-pointer"
                style={{ color: figma.dBlack }}
              >
                <input
                  type="checkbox"
                  className="rounded focus:ring-2"
                  style={{
                    borderColor: figma.inputBorder,
                    color: figma.secondary,
                  }}
                />
                Remember me
              </label>
              <Link
                to="/user/forgot-password"
                className="hover:underline"
                style={{ color: figma.dBlack }}
              >
                Forgot Password?
              </Link>
            </div>

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-white font-semibold text-sm sm:text-base hover:opacity-95 min-h-[44px]"
              style={{
                backgroundColor: figma.secondary,
                borderRadius: 4,
              }}
            >
              Sign In
            </Button>
          </form>

          <p
            className="mt-6 sm:mt-8 text-center text-xs sm:text-sm"
            style={{ color: figma.dBlack, fontFamily: "'Gilroy', sans-serif" }}
          >
            Don&apos;t have an account?{' '}
            <Link
              to="/user/register"
              className="font-medium hover:underline"
              style={{ color: figma.secondary }}
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right column – Marketing image + overlay (hidden on mobile/tablet) */}
      <div className="hidden lg:block relative min-h-[50vh] lg:min-h-screen xl:min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-black/15" />

        {/* Glass effect overlay – Figma: frosted blur, subtle border */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-lg px-2">
          <div
            className="rounded-2xl p-6 sm:p-8 md:p-10"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow:
                '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <h2
              className="text-center mb-2 text-2xl sm:text-3xl xl:text-[2.5rem]"
              style={{
                fontFamily: "'Scheherazade New', 'Playfair Display', Lora, serif",
                fontWeight: 600,
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}
            >
              Find Your Dream Property
            </h2>
            <p
              className="text-center mb-6 md:mb-8 text-sm sm:text-base"
              style={{
                fontFamily: "'Gilroy', sans-serif",
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.98)',
                lineHeight: 1.5,
              }}
            >
              Discover The Best Real Estate Deals With Our Platform
            </p>

            <div className="grid grid-cols-3 gap-2 sm:gap-3">
              {[
                { value: '5000+', label: 'Properties' },
                { value: '2000+', label: 'Customers' },
                { value: '500+', label: 'Agents' },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-xl p-3 sm:p-4 text-center"
                  style={{
                    background: 'rgba(255, 255, 255, 0.12)',
                    backdropFilter: 'blur(16px)',
                    WebkitBackdropFilter: 'blur(16px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                    boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.12)',
                  }}
                >
                  <div
                    className="font-bold text-lg sm:text-xl xl:text-[1.75rem]"
                    style={{
                      fontFamily: "'Gilroy', sans-serif",
                      fontWeight: 700,
                      color: '#FFFFFF',
                      lineHeight: 1.2,
                    }}
                  >
                    {stat.value}
                  </div>
                  <div
                    className="mt-0.5 text-xs sm:text-sm"
                    style={{
                      fontFamily: "'Gilroy', sans-serif",
                      fontWeight: 500,
                      color: 'rgba(255, 255, 255, 0.95)',
                    }}
                  >
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
