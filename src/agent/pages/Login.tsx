import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'
import { IdCard, Lock, Eye, EyeOff } from 'lucide-react'

import agentLeftBg from '../assets/agent-login-left.png'
import agentRightPattern from '../assets/agent-login-right.png'

const tokens = {
  panelBg: '#FCFCFC',
  secondary: '#A49776',
  dBlack: '#777777',
  placeholder: 'rgba(10,10,10,0.5)',
  inputBorder: '#D1D5DC',
}

export function Login() {
  const [agentId, setAgentId] = useState('')
  const [tempPassword, setTempPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen min-h-[100dvh] bg-white overflow-x-hidden font-[Arial,sans-serif]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] w-full h-full">
        {/* Left marketing panel */}
        <div className="relative min-h-[380px] lg:min-h-screen overflow-hidden flex items-center justify-center px-4 py-10 lg:py-24">
          <div className="absolute inset-0">
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={agentLeftBg} />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
            <div
              className="absolute inset-0"
              style={{ backgroundColor: 'rgba(164,151,118,0.6)', mixBlendMode: 'darken' }}
            />
          </div>

          <div className="relative z-10 w-full max-w-md text-center">
            <h1
              className="text-white font-bold text-3xl sm:text-4xl lg:text-[40px] leading-none mb-3"
              style={{ fontFamily: "'Scheherazade_New', sans-serif" }}
            >
              Join EstateHub Today
            </h1>
            <p
              className="text-white/95 text-sm sm:text-base lg:text-lg mb-8 lg:mb-10"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              Start your journey to finding the perfect property
            </p>

            <div className="space-y-3 text-left max-w-sm mx-auto lg:mx-0">
              {[
                { text: 'Access to thousands of properties' },
                { text: 'Connect with verified agents' },
                { text: 'List your own properties' },
              ].map((b) => (
                <div
                  key={b.text}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 w-full"
                  style={{
                    background: 'rgba(255, 255, 255, 0.15)',
                    backdropFilter: 'blur(12px)',
                    WebkitBackdropFilter: 'blur(12px)',
                    border: '1px solid rgba(255, 255, 255, 0.2)',
                  }}
                >
                  <div
                    className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: 'rgba(255, 255, 255, 0.25)' }}
                  >
                    <span className="text-white font-bold text-sm">✓</span>
                  </div>
                  <span className="text-white font-medium" style={{ fontSize: 14 }}>
                    {b.text}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right panel */}
        <div className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
          <div className="absolute inset-0 pointer-events-none">
            <img
              alt=""
              src={agentRightPattern}
              className="absolute inset-0 w-full h-full object-cover opacity-5"
            />
          </div>

          <div className="relative w-full max-w-md">
            <h2
              className="font-bold text-[#0a0a0a] text-[30px] leading-[36px] mb-6"
              style={{ fontFamily: "'Arial', sans-serif" }}
            >
              You Got
            </h2>

            <div className="space-y-5">
              <div>
                <label className="block text-sm font-normal mb-2" style={{ color: tokens.dBlack }}>
                  System Generated Agent ID
                </label>
                <div className="relative">
                  <IdCard
                    className="absolute left-[12px] top-[15px] w-5 h-5"
                    style={{ color: tokens.placeholder }}
                    strokeWidth={1.5}
                  />
                  <Input
                    value={agentId}
                    className={cn(
                      'pl-[40px] pr-4 h-[50px] rounded-[10px] bg-[#fcfcfc]',
                      'border border-[#d1d5dc] placeholder:text-[#AAAAAA]'
                    )}
                    style={{ color: '#0a0a0a' }}
                    onChange={(e) => setAgentId(e.target.value)}
                    placeholder="John Williams"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal mb-2" style={{ color: tokens.dBlack }}>
                  Temporary Password
                </label>
                <div className="relative">
                  <Lock
                    className="absolute left-[12px] top-[15px] w-5 h-5"
                    style={{ color: tokens.placeholder }}
                    strokeWidth={1.5}
                  />

                  <Input
                    value={tempPassword}
                    type={showPassword ? 'text' : 'password'}
                    className={cn(
                      'pl-[40px] pr-[48px] h-[50px] rounded-[10px] bg-[#fcfcfc]',
                      'border border-[#d1d5dc] placeholder:text-[#AAAAAA]'
                    )}
                    style={{ color: tokens.placeholder }}
                    onChange={(e) => setTempPassword(e.target.value)}
                    placeholder="**************"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((v) => !v)}
                    className="absolute right-[12px] top-[15px] w-[20px] h-[20px] flex items-center justify-center"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-[18px] h-[18px]" style={{ color: tokens.dBlack }} />
                    ) : (
                      <Eye className="w-[18px] h-[18px]" style={{ color: tokens.dBlack }} />
                    )}
                  </button>
                </div>
              </div>

              <div className="flex justify-end -mt-1">
                <Link
                  to="/agent/forgot-password"
                  className="text-sm font-medium hover:underline"
                  style={{ color: tokens.secondary }}
                >
                  Forgot password?
                </Link>
              </div>

              <Link to="/agent/dashboard" className="block">
                <Button
                  type="button"
                  className="w-full h-[44px] rounded-[4px] bg-[#a49776] text-white font-semibold"
                  style={{ fontFamily: "'Arial', sans-serif" }}
                >
                  Go to Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

