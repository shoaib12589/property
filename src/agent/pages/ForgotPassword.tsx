import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Mail, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import logo from '@/assets/logo.png'
import agentRightBg from '../assets/agent-login-left.png'

/** Agent Forgot Password – based on customer ForgotPassword + Figma (node 97-162) */
const tokens = {
  leftBg: '#F9F9F7',
  button: '#A3967A',
  secondary: '#A3967A',
  textField: '#000000',
  dBlack: '#6B7280',
  heading: '#000000',
  subtext: '#6B7280',
  inputBorder: '#D1D5DC',
  placeholder: '#AAAAAA',
}

export function ForgotPassword() {
  const [email, setEmail] = useState('')
  const navigate = useNavigate()

  return (
    <div className="min-h-screen min-h-[100dvh] grid grid-cols-1 lg:grid-cols-2 w-full overflow-x-hidden">
      {/* Left – form */}
      <div
        className="flex flex-col items-center justify-center px-4 sm:px-6 md:px-8 py-8 sm:py-10 md:py-12 lg:py-16 overflow-y-auto safe-x safe-top safe-bottom"
        style={{ backgroundColor: tokens.leftBg }}
      >
        <div className="w-full max-w-[400px] mx-auto text-left">
          <div className="flex flex-col items-start mb-6 sm:mb-8">
            <div
              className="w-12 h-12 sm:w-14 sm:h-14 rounded-lg flex items-center justify-center overflow-hidden border-2 bg-white shadow-sm"
              style={{ borderColor: tokens.secondary }}
            >
              <img src={logo} alt="Gerhard" className="w-8 h-8 sm:w-10 sm:h-10 object-contain" />
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
            Forgot Password?
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
            No worries! Enter your email address and we&apos;ll send you a code to reset your password.
          </p>

          <form
            className="space-y-4 sm:space-y-5"
            style={{ fontFamily: "'Gilroy', sans-serif" }}
            onSubmit={(e) => {
              e.preventDefault()
              navigate('/agent/forgot-password-otp', {
                state: { email: email.trim() || undefined },
              })
            }}
          >
            <div>
              <label
                className="block text-sm font-semibold mb-1.5"
                style={{ color: tokens.textField }}
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
                  className="pl-10 pr-4 h-11 sm:h-12 bg-white focus-visible:ring-2 focus-visible:ring-offset-0 border placeholder:text-[#AAAAAA] text-base sm:text-sm rounded-lg"
                  style={{
                    borderColor: tokens.inputBorder,
                    color: tokens.heading,
                  }}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <Button
              type="submit"
              className="w-full h-11 sm:h-12 text-white font-semibold text-sm sm:text-base hover:opacity-95 min-h-[44px] rounded-lg"
              style={{ backgroundColor: tokens.button }}
            >
              Send Reset Code
            </Button>
          </form>

          <p
            className="mt-6 sm:mt-8 text-center text-xs sm:text-sm"
            style={{ color: tokens.dBlack, fontFamily: "'Gilroy', sans-serif" }}
          >
            Remember your password?{' '}
            <Link
              to="/agent/login"
              className="font-semibold hover:underline"
              style={{ color: tokens.secondary }}
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right – villa pool + glass card */}
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
                <Lock className="w-7 h-7 sm:w-8 sm:h-8 text-white" strokeWidth={2} />
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
