import { useState } from 'react'
import { Link } from 'react-router-dom'
import { IdCard, Lock, Eye, EyeOff } from 'lucide-react'
import { Button } from '../../frontend/components/ui/button'
import { Input } from '../../frontend/components/ui/input'

import loginLeftBg from '../../agent/assets/agent-login-left.png'
import loginRightPattern from '../../agent/assets/agent-login-right.png'

const tokens = {
  panelBg: '#FCFCFC',
  dBlack: '#0a0a0a',
  placeholder: 'rgba(10,10,10,0.5)',
}

export function Login() {
  const [brokerId, setBrokerId] = useState('')
  const [tempPassword, setTempPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="min-h-screen min-h-[100dvh] bg-white overflow-x-hidden font-[Arial,sans-serif]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] w-full h-full">
        <div className="relative min-h-[380px] lg:min-h-screen overflow-hidden flex items-center justify-center px-4 py-10 lg:py-24">
          <div className="absolute inset-0">
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={loginLeftBg} />
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

            <div className="space-y-4 text-left max-w-sm mx-auto lg:mx-0">
              {[
                { text: 'Access to thousands of properties' },
                { text: 'Connect with verified agents' },
                { text: 'List your own properties' },
              ].map((benefit) => (
                <div
                  key={benefit.text}
                  className="flex items-center gap-3 h-20 rounded-none px-5 w-full"
                  style={{
                    background: 'rgba(164, 151, 118, 0.35)',
                    backdropFilter: 'blur(14.85px)',
                    WebkitBackdropFilter: 'blur(14.85px)',
                  }}
                >
                  <div className="shrink-0 w-12 h-12 rounded-full flex items-center justify-center bg-white/20">
                    <span className="text-white text-base leading-6">✓</span>
                  </div>
                  <span className="text-white text-sm leading-5">{benefit.text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="relative flex flex-col items-center justify-center px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
          <div className="absolute inset-0 pointer-events-none">
            <img
              alt=""
              src={loginRightPattern}
              className="absolute inset-0 w-full h-full object-cover opacity-5"
            />
          </div>

          <div className="relative w-full max-w-[475px]">
            <h2 className="font-bold text-[#0a0a0a] text-[42px] leading-[1.05] mb-6">You Got</h2>

            <form
              className="space-y-4"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <div>
                <label className="block text-sm font-normal mb-2 text-[#0a0a0a]">Broker ID</label>
                <div className="relative">
                  <IdCard
                    className="absolute left-[12px] top-[15px] w-5 h-5"
                    style={{ color: tokens.placeholder }}
                    strokeWidth={1.5}
                  />
                  <Input
                    value={brokerId}
                    className="pl-[40px] pr-4 h-[50px] rounded-[10px] bg-[#fcfcfc] border border-[#d1d5dc] placeholder:text-[#AAAAAA]"
                    style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                    onChange={(e) => setBrokerId(e.target.value)}
                    placeholder="23243421"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal mb-2 text-[#0a0a0a]">Temporary Password</label>
                <div className="relative">
                  <Lock
                    className="absolute left-[12px] top-[15px] w-5 h-5"
                    style={{ color: tokens.placeholder }}
                    strokeWidth={1.5}
                  />

                  <Input
                    value={tempPassword}
                    type={showPassword ? 'text' : 'password'}
                    className="pl-[40px] pr-[48px] h-[50px] rounded-[10px] bg-[#fcfcfc] border border-[#d1d5dc] placeholder:text-[#AAAAAA]"
                    style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                    onChange={(e) => setTempPassword(e.target.value)}
                    placeholder="**************"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    className="absolute right-[12px] top-[15px] w-[20px] h-[20px] flex items-center justify-center"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? (
                      <EyeOff className="w-[18px] h-[18px] text-[#777777]" />
                    ) : (
                      <Eye className="w-[18px] h-[18px] text-[#777777]" />
                    )}
                  </button>
                </div>
              </div>

              <Link to="/broker/dashboard" className="block pt-1">
                <Button
                  type="button"
                  className="w-full h-[44px] rounded-none bg-[#a49776] text-white font-semibold"
                >
                  Next
                </Button>
              </Link>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

