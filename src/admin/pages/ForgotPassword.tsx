import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Lock, Mail } from 'lucide-react'
import { Button } from '../../frontend/components/ui/button'
import { Input } from '../../frontend/components/ui/input'

import heroImage from '../assets/login-hero.jpg'
import brandLogo from '../assets/login-logo.png'

/** Figma node 248:437 — admin Forgot Password (matches Gehard Web App) */
const figma = {
  leftBg: '#fbfff7',
  heading: '#0a0a0a',
  subtext: '#4a5565',
  label: '#0a0a0a',
  placeholder: 'rgba(10,10,10,0.5)',
  border: '#d1d5dc',
  backLink: '#0a0a0a',
  footerMuted: '#6b7280',
  secondary: '#a49776',
}

export function ForgotPassword() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')

  return (
    <div className="min-h-screen min-h-[100dvh] w-full overflow-x-hidden bg-white">
      <div className="grid min-h-[100dvh] grid-cols-1 lg:grid-cols-2">
        {/* Left — form */}
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
              Forgot Password?
            </h1>
            <p
              className="mb-8 max-w-md text-base leading-6"
              style={{ fontFamily: 'Arial, sans-serif', color: figma.subtext }}
            >
              No worries! Enter your email address and we&apos;ll send you a code to reset your password.
            </p>

            <form
              className="flex flex-col gap-6"
              style={{ fontFamily: 'Arial, sans-serif' }}
              onSubmit={(e) => {
                e.preventDefault()
                navigate('/admin/otp-verification', {
                  state: { email: email.trim() || undefined },
                })
              }}
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm font-semibold leading-5" style={{ color: figma.label }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail
                    className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                    style={{ color: figma.placeholder }}
                    strokeWidth={1.5}
                  />
                  <Input
                    type="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="h-[50px] rounded-[10px] border pl-10 pr-4 text-base placeholder:text-[rgba(10,10,10,0.5)]"
                    style={{
                      borderColor: figma.border,
                      color: figma.heading,
                      backgroundColor: '#ffffff',
                    }}
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-md border-0 text-base font-semibold text-white hover:opacity-95"
                style={{ backgroundColor: figma.secondary, fontFamily: 'Arial, sans-serif' }}
              >
                Send Reset Code
              </Button>
            </form>

            <p
              className="mt-8 text-center text-base leading-6"
              style={{ fontFamily: 'Arial, sans-serif', color: figma.footerMuted }}
            >
              Remember your password?{' '}
              <Link to="/admin/login" className="font-semibold hover:underline" style={{ color: figma.secondary }}>
                Sign in
              </Link>
            </p>
          </div>
        </div>

        {/* Right — hero + glass (aligned with admin Login) */}
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
              className="w-full max-w-[520px] px-6 py-10 sm:px-10"
              style={{
                backdropFilter: 'blur(14.85px)',
                WebkitBackdropFilter: 'blur(14.85px)',
                backgroundColor: 'rgba(164, 151, 118, 0.35)',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <div className="mx-auto flex max-w-md flex-col items-center text-center">
                <div
                  className="mb-6 flex h-16 w-16 items-center justify-center rounded-full border-2 border-white/80"
                  style={{ background: 'rgba(255, 255, 255, 0.12)' }}
                >
                  <Lock className="h-8 w-8 text-white" strokeWidth={2} />
                </div>
                <h2
                  className="mb-3 text-2xl font-normal leading-tight text-white sm:text-3xl"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Secure Account Recovery
                </h2>
                <p
                  className="text-sm leading-relaxed text-white/95 sm:text-base"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  We&apos;ll Help You Get Back Into Your Account Quickly And Securely
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
