import { useState } from 'react'
import { AgentSidebar } from '../components/AgentSidebar'
import { Menu, Bell } from 'lucide-react'

// Figma assets (expiry-based). Used to match icons closely.
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
  mutedText: '#364153',
  inactiveText: '#8181a5',
  dashedBorder: '#cfcfcf',
  placeholder: 'rgba(10,10,10,0.5)',
}

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
      <p
        className="font-normal text-[14px] leading-[20px] not-italic text-[#0a0a0a]"
        style={{ fontFamily: 'Arial, sans-serif' }}
      >
        {label}
      </p>
      <div className="bg-[#fcfcfc] h-[50px] relative">
        <input
          placeholder={placeholder}
          className="absolute inset-0 w-full h-full border border-[#d1d5dc] rounded-[10px] bg-[#fcfcfc] px-[20px] py-[12px] text-[16px] outline-none placeholder:text-[#0a0a0a] placeholder:opacity-50"
          style={{ color: '#0a0a0a', fontFamily: 'Arial, sans-serif' }}
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
  const iconCircleBg = tokens.accent
  return (
    <div className="bg-[#fcfcfc] border border-[#d1d5dc] rounded-[10px] h-[50px] w-[144px] flex items-center justify-start relative overflow-hidden">
      <div
        className="absolute left-[12px] rounded-[40px] size-[20px] top-[15px]"
        style={{ backgroundColor: iconCircleBg }}
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
        {iconVariant === 'youtube' && (
          <>
            {leftIconSrc ? (
              <img src={leftIconSrc} alt="" className="absolute inset-0 w-full h-full object-contain" />
            ) : null}
          </>
        )}
      </div>

      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={label}
        className="ml-[44px] w-[100px] bg-transparent outline-none border-none px-0 py-0 text-[16px] not-italic placeholder:text-[#0a0a0a] placeholder:opacity-50"
        style={{ fontFamily: 'Arial, sans-serif', color: tokens.placeholder }}
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
    <div className="h-screen max-h-[100dvh] flex overflow-hidden" style={{ backgroundColor: tokens.pageBg }}>
      <AgentSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeLabel="Manage Profile"
      />

      <div className="flex-1 flex flex-col lg:ml-64 min-w-0">
        <header className="shrink-0 bg-white border-b" style={{ borderColor: tokens.cardBorder }}>
          <div className="px-8 h-[76px] flex items-center justify-between">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
                aria-label="Open menu"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-6 h-6 text-gray-700" />
              </button>
              <h1
                className="text-2xl font-normal text-[#0a0a0a]"
                style={{ fontFamily: 'Arial, sans-serif', lineHeight: '32px' }}
              >
                Manage Profile
              </h1>
            </div>

            <div className="flex items-center gap-0">
              <button
                type="button"
                className="relative p-2 rounded-[10px] hover:bg-gray-50"
                aria-label="Notifications"
              >
                <Bell className="w-6 h-6 text-gray-700" strokeWidth={1.5} />
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-[#fb2c36]" />
              </button>

              <div
                className="flex items-center h-11 pl-4 ml-2 border-l"
                style={{ borderColor: tokens.cardBorder }}
              >
                <span className="text-base text-[#0a0a0a]" style={{ fontFamily: 'Arial, sans-serif' }}>
                  John Doe
                </span>
              </div>
            </div>
          </div>
        </header>

        <main className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-8 pt-6 pb-8 bg-white">
          <div className="relative w-full">
            {/* Avatar */}
            <div className="relative w-[127px] h-[127px] mt-4">
              <img src={imgEllipse2} alt="" className="absolute left-0 top-0 w-[127px] h-[127px] rounded-full object-cover" />
              <img src={imgAvatarBadge} alt="" className="absolute left-[86px] top-[90px] w-[27px] h-[27px]" />
            </div>

            {/* Form */}
            <div className="mt-10" style={{ maxWidth: 1000 }}>
              <div className="grid grid-cols-2 gap-x-[87px] gap-y-[24px]">
                <Field label="Full Name" placeholder="Enter your full name" />
                <Field label="Email Address" placeholder="Your Email Address" />
                <Field label="Phone Number" placeholder="Enter your Phone Number" />
                <Field label="Address" placeholder="Enter your Full Address" />
                <Field label="License Number" placeholder="Enter your License Number" />
                <Field label="License Expiry Date" placeholder="Enter your License Expiry Date" />

                {/* Additional Phone Numbers */}
                <div className="flex flex-col gap-2 h-[78px]">
                  <p
                    className="font-normal text-[14px] leading-[20px] not-italic text-[#0a0a0a]"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Additional Phone Numbers
                  </p>
                  <div className="bg-[#fcfcfc] h-[50px] relative">
                    <input
                      placeholder="Enter your Phone Number"
                      className="absolute inset-0 w-full h-full border border-[#d1d5dc] rounded-[10px] bg-[#fcfcfc] px-[20px] py-[12px] text-[16px] outline-none placeholder:text-[#0a0a0a] placeholder:opacity-50"
                      style={{ fontFamily: 'Arial, sans-serif' }}
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

                <div className="flex flex-col gap-2 h-[78px]">
                  <p
                    className="font-normal text-[14px] leading-[20px] not-italic text-[#0a0a0a]"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Social Media Links
                  </p>
                  <div className="bg-[#fcfcfc] h-[50px] relative">
                    <div className="flex items-center gap-[10px] pt-[0px]">
                      <SocialButton
                        label="Facebook"
                        iconVariant="facebook"
                        value={socialLinks.facebook}
                        onChange={(next) =>
                          setSocialLinks((s) => ({
                            ...s,
                            facebook: next,
                          }))
                        }
                      />
                      <SocialButton
                        label="Instagram"
                        iconVariant="instagram"
                        value={socialLinks.instagram}
                        onChange={(next) =>
                          setSocialLinks((s) => ({
                            ...s,
                            instagram: next,
                          }))
                        }
                      />
                      <SocialButton
                        label="YouTube"
                        iconVariant="youtube"
                        leftIconSrc={imgIconYouTube}
                        value={socialLinks.youtube}
                        onChange={(next) =>
                          setSocialLinks((s) => ({
                            ...s,
                            youtube: next,
                          }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <Field label="E&O Insurance Policy Number" placeholder="Enter your E&O Number" />
                <Field label="Policy Expiration Date" placeholder="Enter Your Policy Expiration Date" />

                {/* Bio */}
                <div className="col-span-1 flex flex-col gap-2 self-start">
                  <p
                    className="font-normal text-[14px] leading-[20px] not-italic text-[#0a0a0a]"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Bio
                  </p>
                  <div className="bg-[#fcfcfc] border border-[#d1d5dc] rounded-[10px] h-[131px] relative">
                    <textarea
                      placeholder="Enter your Bio"
                      className="absolute inset-0 w-full h-full rounded-[10px] bg-[#fcfcfc] px-[24px] py-[22px] text-[16px] outline-none resize-none"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    />
                  </div>
                </div>

                {/* Brokerage Information */}
                <div className="col-span-1 flex flex-col gap-2 self-start">
                  <p
                    className="font-normal text-[14px] leading-[20px] not-italic text-[#0a0a0a]"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Brokerage Information
                  </p>
                  <div className="bg-[#fcfcfc] border border-[#d1d5dc] rounded-[10px] h-[130px] relative">
                    <textarea
                      placeholder="Type Here"
                      className="absolute inset-0 w-full h-full rounded-[10px] bg-[#fcfcfc] px-[24px] py-[20px] text-[16px] outline-none resize-none"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    />
                  </div>
                </div>
              </div>

              {/* Documents */}
              <div className="mt-[24px]">
                <p
                  className="font-normal text-[14px] leading-[20px] not-italic text-[#0a0a0a] mb-[8px]"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  Documents
                </p>
                <div
                  className="bg-[#fcfcfc] border border-[#cfcfcf] border-dashed rounded-[10px] h-[148px] flex flex-col items-center justify-center px-[23px] py-[20px]"
                  style={{ width: '100%' }}
                >
                  <div className="flex items-center gap-[18px]">
                    <div className="bg-[#a49776] rounded-[21px] w-[42px] h-[42px] flex items-start justify-center pt-[11px]">
                      <img src={imgDocsIcon} alt="" className="w-[18px] h-[21px] object-contain" />
                    </div>
                    <div>
                      <p className="text-[16px]" style={{ fontFamily: 'Arial, sans-serif', color: tokens.placeholder }}>
                        Documents Upload
                      </p>
                      <p className="text-[12px] text-center" style={{ fontFamily: 'Arial, sans-serif', color: 'rgba(10,10,10,0.3)', marginTop: 8, lineHeight: 1.2 }}>
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
                style={{ fontFamily: 'Arial, sans-serif' }}
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

