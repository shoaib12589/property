import { Link } from 'react-router-dom'
import { ArrowLeft, Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import logo from '@/assets/logo.png'

// Figma design tokens (Gehard Web App) – same as Login
const figma = {
  leftBg: '#F8F7F4',
  secondary: '#A49776',
  textField: '#70654B',
  dBlack: '#777777',
  heading: '#333333',
  subtext: '#666666',
  inputBorder: '#D9D9D9',
  placeholder: '#AAAAAA',
}

export function ForgotPassword() {
  return (
    <div className="min-h-screen min-h-[100dvh] grid grid-cols-1 lg:grid-cols-2 w-full overflow-x-hidden">
      {/* Left column – Forgot Password form */}
      <div
        className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:py-16 overflow-y-auto safe-x safe-top safe-bottom"
        style={{ backgroundColor: figma.leftBg }}
      >
        <div className="w-full max-w-[400px] mx-auto text-left">
          {/* Logo – golden house + GEHARD */}
          <div className="flex flex-col items-left mb-6 sm:mb-8">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center overflow-hidden border-2 bg-white shadow-sm inline-flex"
              style={{ borderColor: figma.secondary }}
            >
              <img src={logo} alt="Logo" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
            </div>
          </div>

          {/* Back to Login */}
          <Link
            to="/user/login"
            className="inline-flex items-center gap-2 text-sm mb-6 sm:mb-8 hover:opacity-80 transition-opacity"
            style={{ color: figma.heading, fontFamily: "'Gilroy', sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Back to Login
          </Link>

          <h1
            className="mb-2 text-xl sm:text-2xl md:text-[2rem]"
            style={{
              fontFamily: "'Gilroy', sans-serif",
              fontWeight: 700,
              color: figma.heading,
            }}
          >
            Forgot Password?
          </h1>
          <p
            className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base max-w-md"
            style={{
              fontFamily: "'Gilroy', sans-serif",
              fontWeight: 400,
              color: figma.subtext,
              lineHeight: 1.5,
            }}
          >
            No worries! Enter your email address and we&apos;ll send you a code to reset your password.
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

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-white font-semibold text-sm sm:text-base hover:opacity-95 min-h-[44px] uppercase tracking-wide"
              style={{
                backgroundColor: figma.secondary,
                borderRadius: 4,
              }}
            >
              Send Reset Code
            </Button>
          </form>

          <p
            className="mt-6 sm:mt-8 text-center sm:text-left text-xs sm:text-sm"
            style={{ color: figma.dBlack, fontFamily: "'Gilroy', sans-serif" }}
          >
            Remember your password?{' '}
            <Link
              to="/user/login"
              className="font-medium hover:underline"
              style={{ color: figma.secondary }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right column – Secure Account Recovery (glass panel) */}
      <div className="hidden lg:block relative min-h-[50vh] lg:min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1200&fit=crop')`,
          }}
        />
        <div className="absolute inset-0 bg-black/15" />

        {/* Frosted glass overlay – Secure Account Recovery */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md px-2">
          <div
            className="rounded-2xl p-8 md:p-10 text-center"
            style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(28px) saturate(180%)',
              WebkitBackdropFilter: 'blur(28px) saturate(180%)',
              border: '1px solid rgba(255, 255, 255, 0.25)',
              boxShadow:
                '0 8px 32px rgba(0, 0, 0, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
            }}
          >
            <div className="flex justify-center mb-4">
              <div
                className="w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center border-2 border-white/80"
                style={{ background: 'rgba(255, 255, 255, 0.1)' }}
              >
                <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
              </div>
            </div>
            <h2
              className="text-center mb-3 text-xl sm:text-2xl md:text-3xl font-bold"
              style={{
                fontFamily: "'Gilroy', sans-serif",
                color: '#FFFFFF',
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}
            >
              Secure Account Recovery
            </h2>
            <p
              className="text-center text-sm sm:text-base max-w-sm mx-auto"
              style={{
                fontFamily: "'Gilroy', sans-serif",
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.95)',
                lineHeight: 1.5,
              }}
            >
              We&apos;ll Help You Get Back Into Your Account Quickly And Securely
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
