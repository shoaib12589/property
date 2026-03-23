import { useState } from 'react'
import { Link } from 'react-router-dom'
import { FileStack, Mail, Phone, User } from 'lucide-react'
import { Button } from '../../frontend/components/ui/button'
import { Input } from '../../frontend/components/ui/input'

import registrationLeftBg from '../../agent/assets/agent-registration-left.png'
import registrationRightBg from '../../agent/assets/agent-registration-right.png'

const tokens = {
  panelBg: '#FCFCFC',
  leftOverlay: 'rgba(164,151,118,0.6)',
  dBlack: '#0a0a0a',
  inputBorder: '#D1D5DC',
  dashedBorder: '#CFCFCF',
}

export function Registration() {
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [brokerLicenseNumber, setBrokerLicenseNumber] = useState('')
  const [agencyName, setAgencyName] = useState('')
  const [agencyAddress, setAgencyAddress] = useState('')

  return (
    <div className="min-h-screen min-h-[100dvh] bg-white overflow-x-hidden font-[Arial,sans-serif]">
      <div className="grid grid-cols-1 lg:grid-cols-[1.55fr_1fr] w-full h-full">
        <div className="relative min-h-[380px] lg:min-h-screen overflow-hidden flex items-center justify-center px-4 py-10 lg:py-24">
          <div className="absolute inset-0">
            <img alt="" className="absolute inset-0 w-full h-full object-cover" src={registrationLeftBg} />
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
              className="text-white/95 text-sm sm:text-base lg:text-lg mb-8 lg:mb-10 capitalize"
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

        <div className="relative flex flex-col items-center justify-start px-4 sm:px-6 lg:px-10 py-10 lg:py-16">
          <div className="absolute inset-0 pointer-events-none">
            <img
              alt=""
              src={registrationRightBg}
              className="absolute inset-0 w-full h-full object-cover opacity-5"
            />
          </div>

          <div className="relative w-full max-w-[475px]">
            <h2 className="text-[30px] font-bold text-[#0a0a0a] mb-8">Broker Registration</h2>

            <form
              className="space-y-5"
              onSubmit={(e) => {
                e.preventDefault()
              }}
            >
              <div>
                <label className="block text-sm font-normal mb-2 text-[#0a0a0a]">Full Name</label>
                <div className="relative">
                  <User className="absolute left-[12px] top-[15px] w-5 h-5 text-[#AAAAAA]" strokeWidth={1.5} />
                  <Input
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="Enter your full name"
                    className="pl-[40px] pr-4 h-[50px] rounded-[10px] bg-[#fcfcfc] border border-[#d1d5dc] placeholder:text-[#AAAAAA]"
                    style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-normal mb-2 text-[#0a0a0a]">Email Address</label>
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
                <label className="block text-sm font-normal mb-2 text-[#0a0a0a]">Phone Number</label>
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
                <label className="block text-sm font-normal mb-2 text-[#0a0a0a]">Broker License Number</label>
                <Input
                  value={brokerLicenseNumber}
                  onChange={(e) => setBrokerLicenseNumber(e.target.value)}
                  placeholder="28372846290"
                  className="pl-5 pr-4 h-[50px] rounded-[10px] bg-[#fcfcfc] border border-[#d1d5dc] placeholder:text-[#AAAAAA]"
                  style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                />
              </div>

              <div>
                <label className="block text-sm font-normal mb-2 text-[#0a0a0a]">Agency Name</label>
                <Input
                  value={agencyName}
                  onChange={(e) => setAgencyName(e.target.value)}
                  placeholder="Real Estate"
                  className="pl-5 pr-4 h-[50px] rounded-[10px] bg-[#fcfcfc] border border-[#d1d5dc] placeholder:text-[#AAAAAA]"
                  style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                />
              </div>

              <div>
                <label className="block text-sm font-normal mb-2 text-[#0a0a0a]">Agency Address</label>
                <Input
                  value={agencyAddress}
                  onChange={(e) => setAgencyAddress(e.target.value)}
                  placeholder="Hudson Street, U.K."
                  className="pl-5 pr-4 h-[50px] rounded-[10px] bg-[#fcfcfc] border border-[#d1d5dc] placeholder:text-[#AAAAAA]"
                  style={{ color: tokens.dBlack, backgroundColor: tokens.panelBg }}
                />
              </div>

              <div>
                <label className="block text-sm font-normal mb-2 text-[#0a0a0a]">Brokerage Information</label>
                <div
                  className="bg-[#fcfcfc] border border-dashed rounded-[10px] h-[161px] flex flex-col items-center justify-center"
                  style={{ borderColor: tokens.dashedBorder }}
                >
                  <div className="flex flex-col items-center gap-3">
                    <div className="bg-[#a49776] rounded-[21px] size-[42px] flex items-center justify-center">
                      <FileStack className="w-5 h-5 text-white" strokeWidth={1.5} />
                    </div>
                    <div className="text-base text-[#0a0a0a]/50">Documents Upload</div>
                    <input aria-label="Upload documents" type="file" className="hidden" />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-2">
                <Button
                  type="submit"
                  className="h-[44px] rounded-none text-white font-normal bg-[#A49776] hover:opacity-95"
                >
                  Submit Application
                </Button>
                <Link
                  to="/broker/login"
                  className="h-[44px] border border-[#afafaf] flex items-center justify-center text-[#4a5565] text-sm"
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

