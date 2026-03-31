import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ArrowLeft, Mail } from 'lucide-react'
import { Button } from '../../frontend/components/ui/button'

import heroImage from '../assets/login-hero.jpg'
import brandLogo from '../assets/login-logo.png'

/** Figma node 248:473 — admin OTP Verification (Gehard Web App) */
const figma = {
  leftBg: '#ffffff',
  heading: '#0a0a0a',
  subtext: '#4a5565',
  label: '#0a0a0a',
  backLink: '#4a5565',
  resendMuted: '#6b7280',
  secondary: '#a49776',
  inputBorder: '#d1d5dc',
}

const OTP_LENGTH = 6
const RESEND_INITIAL_SEC = 56
const RESEND_COOLDOWN_SEC = 60

export function OTPVerification() {
  const location = useLocation()
  const emailFromState = (location.state as { email?: string })?.email?.trim()

  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(''))
  const [resendSeconds, setResendSeconds] = useState(RESEND_INITIAL_SEC)
  const inputRefs = useRef<(HTMLInputElement | null)[]>([])

  useEffect(() => {
    if (resendSeconds <= 0) return
    const timer = setInterval(() => setResendSeconds((value) => value - 1), 1000)
    return () => clearInterval(timer)
  }, [resendSeconds])

  const handleOtpChange = (index: number, value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (!cleaned) {
      const next = [...otp]
      next[index] = ''
      setOtp(next)
      return
    }

    if (cleaned.length > 1) {
      const next = [...otp]
      cleaned
        .slice(0, OTP_LENGTH)
        .split('')
        .forEach((digit, offset) => {
          if (index + offset < OTP_LENGTH) next[index + offset] = digit
        })
      setOtp(next)
      inputRefs.current[Math.min(index + cleaned.length, OTP_LENGTH - 1)]?.focus()
      return
    }

    const next = [...otp]
    next[index] = cleaned
    setOtp(next)
    if (index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus()
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
    <div className="min-h-screen min-h-[100dvh] w-full overflow-x-hidden bg-white">
      <div className="grid min-h-[100dvh] grid-cols-1 lg:grid-cols-2">
        {/* Left — form (attachment: solid white) */}
        <div
          className="flex flex-col justify-center px-6 sm:px-10 lg:px-[clamp(2rem,8vw,10rem)] py-10 lg:py-16"
          style={{ backgroundColor: figma.leftBg }}
        >
          <div className="mx-auto w-full max-w-[448px] lg:mx-0">
            <div
              className="mb-6 flex h-[83px] w-[83px] shrink-0 items-center justify-center overflow-hidden rounded-lg border-2 bg-white p-1"
              style={{ borderColor: figma.secondary }}
            >
              <img src={brandLogo} alt="Gehard" className="h-full w-full object-contain object-center" />
            </div>

            <Link
              to="/admin/login"
              className="mb-8 inline-flex items-center gap-2 text-sm hover:opacity-80"
              style={{ fontFamily: 'Arial, sans-serif', color: figma.backLink }}
            >
              <ArrowLeft className="h-4 w-4 shrink-0" strokeWidth={2} />
              Back to Login
            </Link>

            <h1
              className="mb-2 text-[28px] font-bold leading-9 text-[#0a0a0a] sm:text-[30px]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Verify Your Email
            </h1>
            <p
              className="mb-8 max-w-md text-base leading-6"
              style={{ fontFamily: 'Arial, sans-serif', color: figma.subtext }}
            >
              We&apos;ve sent a 6-digit verification code to{' '}
              {emailFromState ? <span className="font-medium text-[#0a0a0a]">{emailFromState}</span> : 'your email'}
            </p>

            <form
              className="flex flex-col gap-6"
              style={{ fontFamily: 'Arial, sans-serif' }}
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <div className="flex flex-col gap-3">
                <label className="text-sm font-semibold leading-5" style={{ color: figma.label }}>
                  Enter OTP Code
                </label>
                <div className="flex flex-wrap gap-2 sm:gap-3">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => {
                        inputRefs.current[index] = el
                      }}
                      type="text"
                      inputMode="numeric"
                      autoComplete="one-time-code"
                      pattern="[0-9]*"
                      maxLength={1}
                      value={digit}
                      onChange={(e) => handleOtpChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      className="h-12 w-12 shrink-0 rounded-lg border bg-white text-center text-lg font-semibold text-[#0a0a0a] focus:outline-none focus:ring-2 focus:ring-[#A49776] focus:ring-offset-0 sm:h-12 sm:w-12"
                      style={{ borderColor: figma.inputBorder }}
                    />
                  ))}
                </div>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-md border-0 text-base font-semibold uppercase tracking-wide text-white hover:opacity-95"
                style={{ backgroundColor: figma.secondary, fontFamily: 'Arial, sans-serif' }}
              >
                Verify OTP
              </Button>

              <p
                className="text-center text-sm"
                style={{ fontFamily: 'Arial, sans-serif', color: figma.resendMuted }}
              >
                {resendSeconds > 0 ? (
                  <>
                    Resend code in <span className="font-bold text-[#0a0a0a]">{resendSeconds}s</span>
                  </>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="font-medium hover:underline"
                    style={{ color: figma.secondary }}
                  >
                    Resend code
                  </button>
                )}
              </p>
            </form>
          </div>
        </div>

        {/* Right — hero + glass + bottom strip */}
        <div className="relative min-h-[280px] lg:min-h-[100dvh]">
          <div aria-hidden className="absolute inset-0">
            <img alt="" src={heroImage} className="absolute inset-0 h-full w-full object-cover" />
            <div
              className="absolute inset-0 mix-blend-darken"
              style={{ backgroundColor: 'rgba(164,151,118,0.6)' }}
            />
          </div>

          <div className="relative flex min-h-[280px] items-center justify-center px-4 py-10 lg:absolute lg:inset-0 lg:min-h-0">
            <div
              className="w-full max-w-[520px] overflow-hidden rounded-2xl px-6 pb-0 pt-10 sm:px-10"
              style={{
                backdropFilter: 'blur(14.85px)',
                WebkitBackdropFilter: 'blur(14.85px)',
                backgroundColor: 'rgba(164, 151, 118, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="mx-auto flex max-w-md flex-col items-center px-1 text-center">
                <div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80"
                  style={{ background: 'rgba(255, 255, 255, 0.12)' }}
                >
                  <Mail className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
                <h2
                  className="mb-3 text-2xl font-normal leading-tight text-white sm:text-3xl md:text-4xl"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Check Your Email
                </h2>
                <p
                  className="mb-6 text-sm leading-relaxed text-white/95 sm:text-base"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  We&apos;ve Sent A Verification Code To Your Email Address
                </p>
              </div>

              <div
                className="mt-6 -mx-6 rounded-b-2xl px-4 py-4 text-center text-xs leading-relaxed text-white sm:-mx-10 sm:px-6 sm:text-sm"
                style={{
                  fontFamily: 'Arial, sans-serif',
                  backgroundColor: 'rgba(0, 0, 0, 0.28)',
                }}
              >
                Didn&apos;t receive the code? Check your spam folder or request a new code
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
