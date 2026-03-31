import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '../../frontend/components/ui/button'
import { Input } from '../../frontend/components/ui/input'

import heroImage from '../assets/login-hero.jpg'
import brandLogo from '../assets/login-logo.png'

/** Figma node 248:279 — Gehard Web App (admin login) */
const figma = {
  leftBg: '#fbfff7',
  heading: '#0a0a0a',
  subtext: '#4a5565',
  label: '#0a0a0a',
  placeholder: 'rgba(10,10,10,0.5)',
  border: '#d1d5dc',
  forgot: '#70654b',
  remember: '#4a5565',
  signUpLink: '#70654b',
  secondary: '#a49776',
  pri: '#eee9d2',
  statLabel: '#dbeafe',
}

const stats = [
  { value: '5000+', label: 'Properties' },
  { value: '2000+', label: 'Customers' },
  { value: '500+', label: 'Agents' },
] as const

export function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [remember, setRemember] = useState(false)

  return (
    <div className="min-h-screen min-h-[100dvh] w-full overflow-x-hidden bg-white">
      <div className="grid min-h-[100dvh] grid-cols-1 lg:grid-cols-2">
        {/* Left — form (Figma: #fbfff7) */}
        <div
          className="flex flex-col justify-center px-6 sm:px-10 lg:px-[clamp(2rem,8vw,10rem)] py-10 lg:py-16"
          style={{ backgroundColor: figma.leftBg }}
        >
          <div className="w-full max-w-[448px] mx-auto lg:mx-0">
            <div
              className="mb-8 h-[83px] w-[83px] shrink-0 overflow-hidden rounded-lg border-2 bg-white p-1 flex items-center justify-center"
              style={{ borderColor: figma.secondary }}
            >
              <img src={brandLogo} alt="Gehard" className="h-full w-full object-contain object-center" />
            </div>

            <h1
              className="mb-2 text-[28px] sm:text-[30px] font-normal leading-9 text-[#0a0a0a]"
              style={{ fontFamily: 'Arial, sans-serif' }}
            >
              Welcome Back
            </h1>
            <p
              className="mb-8 text-base leading-6"
              style={{ fontFamily: 'Arial, sans-serif', color: figma.subtext }}
            >
              Sign in to your account to continue
            </p>

            <form
              className="flex flex-col gap-6"
              style={{ fontFamily: 'Arial, sans-serif' }}
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <div className="flex flex-col gap-2">
                <label className="text-sm leading-5 font-normal" style={{ color: figma.label }}>
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

              <div className="flex flex-col gap-2">
                <label className="text-sm leading-5 font-normal" style={{ color: figma.label }}>
                  Password
                </label>
                <div className="relative">
                  <Lock
                    className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2"
                    style={{ color: figma.placeholder }}
                    strokeWidth={1.5}
                  />
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="h-[50px] rounded-[10px] border pl-10 pr-12 text-base placeholder:text-[rgba(10,10,10,0.5)]"
                    style={{
                      borderColor: figma.border,
                      color: figma.heading,
                      backgroundColor: '#ffffff',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#777777] hover:opacity-80"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" strokeWidth={1.5} /> : <Eye className="h-5 w-5" strokeWidth={1.5} />}
                  </button>
                </div>
              </div>

              <div className="flex h-5 items-center justify-between text-sm">
                <label className="flex cursor-pointer items-center gap-2" style={{ color: figma.remember }}>
                  <input
                    type="checkbox"
                    checked={remember}
                    onChange={(e) => setRemember(e.target.checked)}
                    className="h-4 w-4 rounded border-[#d1d5dc] text-[#a49776] focus:ring-[#a49776]"
                  />
                  Remember me
                </label>
                <Link to="/admin/forgot-password" className="hover:underline" style={{ color: figma.forgot }}>
                  Forgot Password?
                </Link>
              </div>

              <Button
                type="submit"
                className="h-12 w-full rounded-none border-0 text-base font-normal text-white hover:opacity-95"
                style={{ backgroundColor: figma.secondary, fontFamily: 'Arial, sans-serif' }}
              >
                Sign In
              </Button>
            </form>

            <p
              className="mt-8 flex flex-wrap items-center justify-center gap-1.5 text-center text-base leading-6"
              style={{ color: figma.subtext, fontFamily: 'Arial, sans-serif' }}
            >
              <span>Don&apos;t have an account?</span>
              <Link to="/admin/registration" className="font-normal hover:underline" style={{ color: figma.signUpLink }}>
                Sign up
              </Link>
            </p>
          </div>
        </div>

        {/* Right — hero + glass panel (Figma) */}
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
              className="w-full max-w-[544px] px-4 py-8 sm:p-8"
              style={{
                backdropFilter: 'blur(14.85px)',
                WebkitBackdropFilter: 'blur(14.85px)',
                backgroundColor: 'rgba(164, 151, 118, 0.35)',
              }}
            >
              <div className="mx-auto flex max-w-[460px] flex-col items-center gap-4 text-center">
                <h2
                  className="text-[32px] leading-10 sm:text-[36px] sm:leading-[40px] text-white"
                  style={{ fontFamily: "'Scheherazade New', 'Scheherazade_New', serif" }}
                >
                  Find Your Dream Property
                </h2>
                <p
                  className="max-w-xl text-lg capitalize leading-4 sm:text-[18px]"
                  style={{ fontFamily: "'Gilroy', sans-serif", fontWeight: 500, color: figma.pri }}
                >
                  Discover the best real estate deals with our platform
                </p>

                <div className="grid w-full grid-cols-3 gap-2 sm:gap-3 pt-2">
                  {stats.map((s) => (
                    <div
                      key={s.label}
                      className="flex flex-col gap-2 rounded-[10px] px-3 pt-4 pb-3 sm:px-4"
                      style={{ backgroundColor: 'rgba(255,255,255,0.1)' }}
                    >
                      <div
                        className="text-[26px] leading-9 sm:text-[30px] sm:leading-[36px] text-white"
                        style={{ fontFamily: 'Arial, sans-serif' }}
                      >
                        {s.value}
                      </div>
                      <div className="text-center text-sm leading-5" style={{ fontFamily: 'Arial, sans-serif', color: figma.statLabel }}>
                        {s.label}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
