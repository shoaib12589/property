import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import logo from '@/assets/logo.png'
import agentRightBg from '../assets/agent-login-left.png'

// Figma design tokens (Gehard Web App) – adapted for Agent Forgot Password OTP
const tokens = {
  leftBg: '#F8F7F4',
  secondary: '#A49776',
  textField: '#70654B',
  dBlack: '#777777',
  heading: '#333333',
  subtext: '#666666',
  inputBorder: '#D9D9D9',
  placeholder: '#AAAAAA',
}

const OTP_LENGTH = 6
const RESEND_COOLDOWN_SEC = 60

export function ForgotPasswordOTP() {
  const location = useLocation()
  const email = (location.state as { email?: string })?.email ?? 'your email address'

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [resendSeconds, setResendSeconds] = useState(RESEND_COOLDOWN_SEC)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  // Resend countdown
  useEffect(() => {
    if (resendSeconds <= 0) return
    const t = setInterval(() => setResendSeconds((s) => s - 1), 1000)
    return () => clearInterval(t)
  }, [resendSeconds])

  const handleOtpChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '').slice(0, OTP_LENGTH)
    if (cleaned.length === 0) {
      const next = [...otp]
      next[index] = ''
      setOtp(next)
      return
    }

    if (cleaned.length > 1) {
      // Handle paste of multiple digits.
      const next = [...otp]
      cleaned.split('').forEach((d, i) => {
        if (index + i < OTP_LENGTH) next[index + i] = d
      })
      setOtp(next)
      const focusIndex = Math.min(index + cleaned.length, OTP_LENGTH - 1)
      inputRefs.current[focusIndex]?.focus()
      return
    }

    const digit = cleaned
    const next = [...otp]
    next[index] = digit
    setOtp(next)
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus()
  }

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus()
    }
  }

  const handleResend = () => {
    if (resendSeconds > 0) return
    setResendSeconds(RESEND_COOLDOWN_SEC)
  }

  return (
    <div className="min-h-screen min-h-[100dvh] grid grid-cols-1 lg:grid-cols-2 w-full overflow-x-hidden">
      {/* Left column – Verify OTP */}
      <div
        className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:py-16 overflow-y-auto safe-x safe-top safe-bottom"
        style={{ backgroundColor: tokens.leftBg }}
      >
        <div className="w-full max-w-[400px] mx-auto text-left">
          {/* Logo – house + GEHARD */}
          <div className="flex flex-col items-start mb-6 sm:mb-8">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center overflow-hidden border-2 bg-white shadow-sm"
              style={{ borderColor: tokens.secondary }}
            >
              <img
                src={logo}
                alt="Gerhard"
                className="w-8 h-8 sm:w-10 sm:h-10 object-contain"
              />
            </div>
          </div>

          <Link
            to="/agent/login"
            className="inline-flex items-center gap-2 text-sm mb-6 sm:mb-8 hover:opacity-80 transition-opacity"
            style={{ color: tokens.heading, fontFamily: "'Gilroy', sans-serif" }}
          >
            <ArrowLeft className="w-4 h-4" strokeWidth={2} />
            Back to Login
          </Link>

          <h1
            className="mb-2 text-xl sm:text-2xl md:text-[2rem] font-bold"
            style={{
              fontFamily: "'Gilroy', sans-serif",
              color: tokens.heading,
            }}
          >
            Verify Your Email
          </h1>

          <p
            className="mb-6 sm:mb-8 text-xs sm:text-sm md:text-base max-w-md"
            style={{
              fontFamily: "'Gilroy', sans-serif",
              fontWeight: 400,
              color: tokens.subtext,
              lineHeight: 1.5,
            }}
          >
            We&apos;ve sent a 6-digit verification code to{' '}
            <span className="font-medium" style={{ color: tokens.heading }}>
              {email}
            </span>
          </p>

          <form
            className="space-y-4 sm:space-y-5"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
            onSubmit={(e) => e.preventDefault()}
          >
            <div>
              <label
                className="block text-sm font-semibold mb-1.5"
                style={{ color: tokens.textField }}
              >
                Enter OTP Code
              </label>

              <div className="flex gap-2 sm:gap-3 justify-between">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el
                    }}
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    className="w-10 h-11 sm:w-12 sm:h-12 text-center text-lg font-semibold rounded-lg border bg-white focus:outline-none focus:ring-2 focus:ring-[#A49776] focus:ring-offset-0"
                    style={{
                      borderColor: tokens.inputBorder,
                      color: tokens.heading,
                    }}
                  />
                ))}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 min-h-[44px] text-white font-semibold text-sm sm:text-base hover:opacity-95 rounded-lg"
              style={{
                backgroundColor: tokens.secondary,
              }}
            >
              Verify OTP
            </Button>

            <p
              className="text-center text-xs sm:text-sm"
              style={{ color: tokens.dBlack, fontFamily: "'Gilroy', sans-serif" }}
            >
              {resendSeconds > 0 ? (
                <>Resend code in {resendSeconds}s</>
              ) : (
                <button
                  type="button"
                  onClick={handleResend}
                  className="font-medium hover:underline"
                  style={{ color: tokens.secondary }}
                >
                  Resend code
                </button>
              )}
            </p>
          </form>
        </div>
      </div>

      {/* Right column – Check Your Email glass panel */}
      <div className="hidden lg:block relative min-h-[50vh] lg:min-h-screen">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${agentRightBg})` }}
        />
        <div className="absolute inset-0 bg-black/15" />

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
                <Mail className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
              </div>
            </div>

            <h2
              className="text-center mb-3 text-xl sm:text-2xl md:text-3xl font-bold text-white"
              style={{
                fontFamily: "'Gilroy', sans-serif",
                letterSpacing: '-0.02em',
                lineHeight: 1.25,
              }}
            >
              Check Your Email
            </h2>

            <p
              className="text-center text-sm sm:text-base mb-4 max-w-sm mx-auto"
              style={{
                fontFamily: "'Gilroy', sans-serif",
                fontWeight: 400,
                color: 'rgba(255, 255, 255, 0.95)',
                lineHeight: 1.5,
              }}
            >
              We&apos;ve Sent A Verification Code To Your Email Address
            </p>

            <p
              className="text-center text-xs sm:text-sm max-w-xs mx-auto"
              style={{
                fontFamily: "'Gilroy', sans-serif",
                color: 'rgba(255, 255, 255, 0.85)',
                lineHeight: 1.5,
              }}
            >
              Didn&apos;t receive the code? Check your spam folder or{' '}
              <button
                type="button"
                onClick={handleResend}
                className="underline hover:no-underline font-medium"
                style={{ color: '#FFFFFF' }}
              >
                request a new code
              </button>
              .
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

