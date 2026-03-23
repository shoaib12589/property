import { useState } from 'react'
import { BrokerSidebar } from '../components/BrokerSidebar'
import { Menu, Bell } from 'lucide-react'

const imgEllipse2 =
  'https://www.figma.com/api/mcp/asset/d9f81102-9d08-403e-8fee-78561ad08d50'
const imgAvatarBadge =
  'https://www.figma.com/api/mcp/asset/e5148a97-e9d8-4308-9396-25087c65a865'

const imgVectorFacebook =
  'https://www.figma.com/api/mcp/asset/d322e543-927f-4ea0-a0a5-14ec75c37d44'
const imgGroupFacebook =
  'https://www.figma.com/api/mcp/asset/9c7ce1b3-2066-48bc-812d-a1963c6a31fe'
const imgGroupInstagram =
  'https://www.figma.com/api/mcp/asset/85d3718f-8c19-49d7-9d2a-b61c806e2e83'
const imgIconYouTube =
  'https://www.figma.com/api/mcp/asset/b839aabf-6495-42af-8e3a-c199f33f1071'

const imgDocsIcon =
  'https://www.figma.com/api/mcp/asset/a36245ce-ff29-44f0-a3a9-8752ed33b139'

const tokens = {
  pageBg: '#ffffff',
  cardBorder: '#E5E7EB',
  accent: '#A49776',
  inputBg: '#FCFCFC',
  inputBorder: '#D1D5DC',
  placeholder: 'rgba(10,10,10,0.5)',
}

const font = { fontFamily: 'Arial, sans-serif' } as const

function Field({
  label,
  placeholder,
  colSpan,
}: {
  label: string
  placeholder: string
  colSpan?: 1 | 2
}) {
  return (
    <div className={`${colSpan === 2 ? 'col-span-2' : ''} flex flex-col gap-2 h-[78px]`}>
      <p className="font-normal text-[14px] leading-[20px] text-[#0a0a0a]" style={font}>
        {label}
      </p>
      <div className="bg-[#fcfcfc] h-[50px] relative">
        <input
          placeholder={placeholder}
          className="absolute inset-0 w-full h-full border border-[#d1d5dc] rounded-[10px] bg-[#fcfcfc] px-[20px] py-[12px] text-[16px] outline-none placeholder:text-[#0a0a0a] placeholder:opacity-50"
          style={{ color: '#0a0a0a', ...font }}
          defaultValue=""
        />
      </div>
    </div>
  )
}

function SocialButton({
  label,
  leftIconSrc,
  iconVariant,
  value,
  onChange,
}: {
  label: string
  leftIconSrc?: string
  iconVariant: 'facebook' | 'instagram' | 'youtube'
  value: string
  onChange: (next: string) => void
}) {
  return (
    <div className="bg-[#fcfcfc] border border-[#d1d5dc] rounded-[10px] h-[50px] w-[144px] flex items-center justify-start relative overflow-hidden">
      <div
        className="absolute left-[12px] rounded-[40px] size-[20px] top-[15px]"
        style={{ backgroundColor: tokens.accent }}
      >
        {iconVariant === 'facebook' && (
          <div className="absolute inset-[15%_15%_14.13%_15%]">
            <img src={imgVectorFacebook} alt="" className="absolute inset-0 w-full h-full object-contain" />
            <img src={imgGroupFacebook} alt="" className="absolute inset-[0.31%_0_0.3%_0] w-full h-full object-contain" />
          </div>
        )}
        {iconVariant === 'instagram' && (
          <div className="absolute inset-[16.14%_15%_14.13%_15.27%]">
            <img src={imgGroupInstagram} alt="" className="absolute inset-0 w-full h-full object-contain" />
          </div>
        )}
        {iconVariant === 'youtube' && leftIconSrc && (
          <img src={leftIconSrc} alt="" className="absolute inset-0 w-full h-full object-contain" />
        )}
      </div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className="ml-[44px] w-[100px] bg-transparent outline-none border-none px-0 py-0 text-[16px] placeholder:text-[#0a0a0a] placeholder:opacity-50"
        style={{ ...font, color: tokens.placeholder }}
      />
    </div>
  )
}

export function ManageProfile() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [socialLinks, setSocialLinks] = useState({
    facebook: '',
    instagram: '',
    youtube: '',
  })

  return (
    <div className="h-screen max-h-[100dvh] flex overflow-hidden min-w-0" style={{ backgroundColor: tokens.pageBg }}>
      <BrokerSidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} activeLabel="Manage Profile" />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0 w-full">
        <header className="shrink-0 bg-white border-b" style={{ borderColor: tokens.cardBorder }}>
          <div className="px-4 sm:px-8 min-h-[76px] py-3 sm:py-0 sm:h-[76px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3 min-w-0">
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 shrink-0"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1 className="text-xl sm:text-2xl font-normal text-[#0a0a0a] truncate" style={{ ...font, lineHeight: '32px' }}>
                Manage Profile
              </h1>
            </div>
            <div className="flex items-center gap-0 shrink-0">
              <button type="button" className="relative p-2 rounded-[10px] hover:bg-gray-50" aria-label="Notifications">
                <Bell className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fb2c36]" />
              </button>
              <div className="flex items-center h-11 pl-4 ml-2 border-l" style={{ borderColor: tokens.cardBorder }}>
                <span className="text-base text-[#0a0a0a]" style={font}>
                  John Doe
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-6 pb-[max(2rem,env(safe-area-inset-bottom,0px))] bg-white">
          <div className="relative w-full">
            {/* Avatar */}
            <div className="relative w-[100px] h-[100px] sm:w-[127px] sm:h-[127px] mt-4">
              <img src={imgEllipse2} alt="" className="absolute left-0 top-0 w-full h-full rounded-full object-cover" />
              <img src={imgAvatarBadge} alt="" className="absolute left-[68%] top-[70%] w-[22px] h-[22px] sm:w-[27px] sm:h-[27px]" />
            </div>

            {/* Form */}
            <div className="mt-8 sm:mt-10 w-full max-w-none">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 lg:gap-x-[60px] xl:gap-x-[87px] gap-y-6">
                <Field label="Full Name" placeholder="Enter your full name" />
                <Field label="Email Address" placeholder="Your Email Adress" />
                <Field label="Phone Number" placeholder="Enter your Phone Number" />
                <Field label="Address" placeholder="Enter your Full Address" />
                <Field label="License Number" placeholder="Enter your License Number" />
                <Field label="License Expiry Date" placeholder="Enter your License Expiry Date" />

                {/* Additional Phone Numbers */}
                <div className="flex flex-col gap-2">
                  <p className="font-normal text-[14px] leading-[20px] text-[#0a0a0a]" style={font}>
                    Additional Phone Numbers
                  </p>
                  <div className="bg-[#fcfcfc] h-[50px] relative">
                    <input
                      placeholder="Enter your Phone Number"
                      className="absolute inset-0 w-full h-full border border-[#d1d5dc] rounded-[10px] bg-[#fcfcfc] px-[20px] py-[12px] text-[16px] outline-none placeholder:text-[#0a0a0a] placeholder:opacity-50"
                      style={font}
                    />
                    <button
                      type="button"
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-[18px] leading-none"
                      aria-label="Add phone"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* Social Media Links */}
                <div className="flex flex-col gap-2">
                  <p className="font-normal text-[14px] leading-[20px] text-[#0a0a0a]" style={font}>
                    Social Media Links
                  </p>
                  <div className="bg-[#fcfcfc] h-auto min-h-[50px] relative">
                    <div className="flex flex-wrap items-center gap-2 sm:gap-[10px] py-1">
                      <SocialButton
                        label="Facebook"
                        iconVariant="facebook"
                        value={socialLinks.facebook}
                        onChange={(next) => setSocialLinks((s) => ({ ...s, facebook: next }))}
                      />
                      <SocialButton
                        label="Instagram"
                        iconVariant="instagram"
                        value={socialLinks.instagram}
                        onChange={(next) => setSocialLinks((s) => ({ ...s, instagram: next }))}
                      />
                      <SocialButton
                        label="YouTube"
                        iconVariant="youtube"
                        leftIconSrc={imgIconYouTube}
                        value={socialLinks.youtube}
                        onChange={(next) => setSocialLinks((s) => ({ ...s, youtube: next }))}
                      />
                    </div>
                  </div>
                </div>

                <Field label="E&O Insurance Policy Number" placeholder="Enter your E&O Number" />
                <Field label="Policy Expiration Date" placeholder="Enter Your Policy Expiration Date" />

                {/* Bio */}
                <div className="flex flex-col gap-2 self-start">
                  <p className="font-normal text-[14px] leading-[20px] text-[#0a0a0a]" style={font}>
                    Bio
                  </p>
                  <div className="bg-[#fcfcfc] border border-[#d1d5dc] rounded-[10px] h-[131px] relative">
                    <textarea
                      placeholder="Enter your Bio"
                      className="absolute inset-0 w-full h-full rounded-[10px] bg-[#fcfcfc] px-[24px] py-[22px] text-[16px] outline-none resize-none"
                      style={font}
                    />
                  </div>
                </div>

                {/* Brokerage Information */}
                <div className="flex flex-col gap-2 self-start">
                  <p className="font-normal text-[14px] leading-[20px] text-[#0a0a0a]" style={font}>
                    Brokerage Information
                  </p>
                  <div className="bg-[#fcfcfc] border border-[#d1d5dc] rounded-[10px] h-[130px] relative">
                    <textarea
                      placeholder="Type Here"
                      className="absolute inset-0 w-full h-full rounded-[10px] bg-[#fcfcfc] px-[24px] py-[20px] text-[16px] outline-none resize-none"
                      style={font}
                    />
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="mt-[24px]">
                <p className="font-normal text-[14px] leading-[20px] text-[#0a0a0a] mb-[8px]" style={font}>
                  Documents
                </p>
                <div className="bg-[#fcfcfc] border border-[#cfcfcf] border-dashed rounded-[10px] h-[148px] flex flex-col items-center justify-center px-[23px] py-[20px] w-full">
                  <div className="flex items-center gap-[18px]">
                    <div className="bg-[#a49776] rounded-[21px] w-[42px] h-[42px] flex items-start justify-center pt-[11px]">
                      <img src={imgDocsIcon} alt="" className="w-[18px] h-[21px] object-contain" />
                    </div>
                    <div>
                      <p className="text-[16px]" style={{ ...font, color: tokens.placeholder }}>
                        Documents Upload
                      </p>
                      <p className="text-[12px] text-center" style={{ ...font, color: 'rgba(10,10,10,0.3)', marginTop: 8, lineHeight: 1.2 }}>
                        PDF, JPG required (Agency Contracts, IABS Forms, MLS Information
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Complete Profile button */}
              <button
                type="button"
                className="mt-[16px] w-full h-[44px] bg-[#a49776] rounded-none flex items-center justify-center"
                style={font}
              >
                <span className="text-white text-[16px] font-normal">Complete Profile</span>
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}
