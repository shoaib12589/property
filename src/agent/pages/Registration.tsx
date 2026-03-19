import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileStack, Mail, Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { cn } from '@/lib/utils'

import agentLeftBg from '../assets/agent-registration-left.png'
import agentRightBg from '../assets/agent-registration-right.png'

const tokens = {
  panelBg: '#FCFCFC',
  leftOverlay: 'rgba(164,151,118,0.6)',
  secondary: '#A49776',
  dBlack: '#0a0a0a',
  placeholder: 'rgba(10,10,10,0.5)',
  inputBorder: '#D1D5DC',
  dashedBorder: '#CFCFCF',
}

export function Registration() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [licenseNumber, setLicenseNumber] = useState('')
  const [brokerageNumber, setBrokerageNumber] = useState('')

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
              style={{ backgroundColor: tokens.leftOverlay, mixBlendMode: 'darken' }}
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
              Start Your Journey To Finding The Perfect Property
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

        {/* Right registration form */}
        <div className="relative flex flex-col items-center justify-start px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
          <div className="absolute inset-0 pointer-events-none">
            <img
              alt=""
              src={agentRightBg}
              className="absolute inset-0 w-full h-full object-cover opacity-5"
            />
          </div>

          <div className="relative w-full max-w-md">
            <h2
              className="text-[30px] font-bold text-center text-[#0a0a0a] mb-6"
              style={{ fontFamily: "'Arial', sans-serif" }}
            >
              Agent Registration
            </h2>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <div>
                <label className="block text-sm font-normal mb-2" style={{ color: tokens.dBlack }}>
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-[12px] top-[15px] w-5 h-5 text-[#AAAAAA]" strokeWidth={1.5} />
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className={cn(
                      'pl-[40px] pr-4 h-[50px] rounded-[10px] bg-[#fcfcfc]',
                      'border border-[#d1d5dc] placeholder:text-[#AAAAAA]'
                    )}
                    style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal mb-2" style={{ color: tokens.dBlack }}>
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-[12px] top-[15px] w-5 h-5 text-[#AAAAAA]" strokeWidth={1.5} />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    type="email"
                    className="pl-[40px] pr-4 h-[50px] rounded-[10px] bg-[#fcfcfc] border border-[#d1d5dc] placeholder:text-[#AAAAAA]"
                    style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal mb-2" style={{ color: tokens.dBlack }}>
                  Phone Number
                </label>
                <div className="relative">
                  <Phone className="absolute left-[12px] top-[15px] w-5 h-5 text-[#AAAAAA]" strokeWidth={1.5} />
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    type="tel"
                    className="pl-[40px] pr-4 h-[50px] rounded-[10px] bg-[#fcfcfc] border border-[#d1d5dc] placeholder:text-[#AAAAAA]"
                    style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal mb-2" style={{ color: tokens.dBlack }}>
                  License Number
                </label>
                <Input
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  placeholder="28372846290"
                  className="pl-4 pr-4 h-[50px] rounded-[10px] bg-[#fcfcfc] border border-[#d1d5dc] placeholder:text-[#AAAAAA]"
                  style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                />
              </div>

              <div>
                <label className="block text-sm font-normal mb-2" style={{ color: tokens.dBlack }}>
                  Brokerage Information
                </label>
                <Input
                  value={brokerageNumber}
                  onChange={(e) => setBrokerageNumber(e.target.value)}
                  placeholder="28372846290"
                  className="pl-4 pr-4 h-[50px] rounded-[10px] bg-[#fcfcfc] border border-[#d1d5dc] placeholder:text-[#AAAAAA]"
                  style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                />
              </div>

              <div>
                <label className="block text-sm font-normal mb-2" style={{ color: tokens.dBlack }}>
                  Brokerage Information
                </label>

                <div
                  className="bg-[#fcfcfc] border border-[#cfcfcf] border-dashed rounded-[10px] h-[161px] flex flex-col items-center justify-center"
                  style={{ borderColor: tokens.dashedBorder }}
                >
                  <div className="flex flex-col items-center gap-[12px]">
                    <div
                      className="bg-[#a49776] rounded-[21px] shrink-0 size-[42px] flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <FileStack className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="text-[16px] text-[#0a0a0a]/50" style={{ fontFamily: "'Arial', sans-serif" }}>
                      Documents Upload
                    </div>

                    {/* Placeholder upload control (UI only for now) */}
                    <input aria-label="Upload documents" type="file" className="hidden" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-2">
                <Button
                  type="submit"
                  className="h-[44px] rounded-[4px] text-white font-semibold bg-[#A49776] hover:opacity-95"
                >
                  Submit Application
                </Button>
                <Link
                  to="/user/login"
                  className="h-[44px] rounded-[4px] border border-[#afafaf] flex items-center justify-center text-[#4a5565] font-medium text-sm"
                  style={{ fontFamily: "'Arial', sans-serif" }}
                >
                  Cancel
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

