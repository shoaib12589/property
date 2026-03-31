import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, Phone, User } from 'lucide-react'
import { Button } from '../../frontend/components/ui/button'
import { Input } from '../../frontend/components/ui/input'

import registrationLeftBg from '../../agent/assets/agent-registration-left.png'
import registrationRightBg from '../../agent/assets/agent-registration-right.png'

const tokens = {
  panelBg: '#FCFCFC',
  leftOverlay: 'rgba(164,151,118,0.6)',
  dBlack: '#0a0a0a',
  inputBorder: '#D1D5DC',
}

/**
 * Admin broker registration — Figma node 248:346 / Gehard Web App.
 * Based on `src/broker/pages/Registration.tsx` (six fields; no document upload in this screen).
 */
export function Registration() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [brokerLicenseNumber, setBrokerLicenseNumber] = useState('')
  const [agencyName, setAgencyName] = useState('')
  const [agencyAddress, setAgencyAddress] = useState('')

  return (
    <div className="min-h-screen min-h-[100dvh] overflow-x-hidden bg-white font-[Arial,sans-serif]">
      <div className="grid min-h-[100dvh] w-full grid-cols-1 lg:grid-cols-2">
        {/* Left — hero */}
        <div className="relative flex min-h-[380px] items-center justify-center overflow-hidden px-4 py-10 lg:min-h-screen lg:py-24">
          <div className="absolute inset-0">
            <img alt="" className="absolute inset-0 h-full w-full object-cover" src={registrationLeftBg} />
            <div className="absolute inset-0 bg-black/50 backdrop-blur-[1px]" />
            <div className="absolute inset-0" style={{ backgroundColor: tokens.leftOverlay, mixBlendMode: 'darken' }} />
          </div>

          <div className="relative z-10 mx-auto w-full max-w-md text-center">
            <h1
              className="mb-3 text-3xl font-bold leading-none text-white sm:text-4xl lg:text-[40px]"
              style={{ fontFamily: "'Scheherazade_New', sans-serif" }}
            >
              Join EstateHub Today
            </h1>
            <p
              className="mb-8 text-sm text-white/95 sm:text-base lg:mb-10 lg:text-lg"
              style={{ fontFamily: "'Gilroy', sans-serif" }}
            >
              Start Your Journey To Finding The Perfect Property
            </p>

            <div className="mx-auto max-w-sm space-y-4 text-left lg:mx-0">
              {[
                'Access to thousands of properties',
                'Connect with verified agents',
                'List your own properties',
              ].map((text) => (
                <div
                  key={text}
                  className="flex h-20 w-full items-center gap-3 rounded-none px-5"
                  style={{
                    background: 'rgba(164, 151, 118, 0.35)',
                    backdropFilter: 'blur(14.85px)',
                    WebkitBackdropFilter: 'blur(14.85px)',
                  }}
                >
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white/20">
                    <span className="text-base leading-6 text-white">✓</span>
                  </div>
                  <span className="text-sm leading-5 text-white">{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right — form + subtle pattern */}
        <div className="relative flex flex-col items-center justify-start px-4 py-10 sm:px-6 lg:px-10 lg:py-16">
          <div className="pointer-events-none absolute inset-0">
            <img alt="" src={registrationRightBg} className="absolute inset-0 h-full w-full object-cover opacity-5" />
          </div>

          <div className="relative w-full max-w-[475px]">
            <h2 className="mb-8 text-[30px] font-bold text-[#0a0a0a]">Broker Registration</h2>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <div>
                <label className="mb-2 block text-sm font-normal text-[#0a0a0a]">Full Name</label>
                <div className="relative">
                  <User className="absolute left-[12px] top-[15px] h-5 w-5 text-[#AAAAAA]" strokeWidth={1.5} />
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="h-[50px] rounded-[10px] border border-[#d1d5dc] bg-[#fcfcfc] pl-[40px] pr-4 placeholder:text-[#AAAAAA]"
                    style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-normal text-[#0a0a0a]">Email Address</label>
                <div className="relative">
                  <Mail className="absolute left-[12px] top-[15px] h-5 w-5 text-[#AAAAAA]" strokeWidth={1.5} />
                  <Input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    type="email"
                    className="h-[50px] rounded-[10px] border border-[#d1d5dc] bg-[#fcfcfc] pl-[40px] pr-4 placeholder:text-[#AAAAAA]"
                    style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-normal text-[#0a0a0a]">Phone Number</label>
                <div className="relative">
                  <Phone className="absolute left-[12px] top-[15px] h-5 w-5 text-[#AAAAAA]" strokeWidth={1.5} />
                  <Input
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    type="tel"
                    className="h-[50px] rounded-[10px] border border-[#d1d5dc] bg-[#fcfcfc] pl-[40px] pr-4 placeholder:text-[#AAAAAA]"
                    style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                  />
                </div>
              </div>

              <div>
                <label className="mb-2 block text-sm font-normal text-[#0a0a0a]">Broker License Number</label>
                <Input
                  value={brokerLicenseNumber}
                  onChange={(e) => setBrokerLicenseNumber(e.target.value)}
                  placeholder="28372846290"
                  className="h-[50px] rounded-[10px] border border-[#d1d5dc] bg-[#fcfcfc] px-5 placeholder:text-[#AAAAAA]"
                  style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-normal text-[#0a0a0a]">Agency Name</label>
                <Input
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  placeholder="Real Estate"
                  className="h-[50px] rounded-[10px] border border-[#d1d5dc] bg-[#fcfcfc] px-5 placeholder:text-[#AAAAAA]"
                  style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-normal text-[#0a0a0a]">Agency Address</label>
                <Input
                  value={agencyAddress}
                  onChange={(e) => setAgencyAddress(e.target.value)}
                  placeholder="Hudson Street, U.K."
                  className="h-[50px] rounded-[10px] border border-[#d1d5dc] bg-[#fcfcfc] px-5 placeholder:text-[#AAAAAA]"
                  style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                />
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  type="submit"
                  className="h-[44px] rounded-none bg-[#A49776] font-normal text-white hover:opacity-95"
                >
                  Submit Application
                </Button>
                <Link
                  to="/admin/login"
                  className="flex h-[44px] items-center justify-center border border-[#afafaf] text-sm text-[#4a5565]"
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
