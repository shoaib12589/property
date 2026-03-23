import { ChevronDown, MapPin } from 'lucide-react'

const font = { fontFamily: 'Arial, sans-serif' } as const

export type BasicPropertyFormState = {
  propertyTitle: string
  price: string
  propertyType: string
  streetAddress: string
  city: string
  state: string
  zipCode: string
  description: string
}

function FieldLabel({ children }: { children: string }) {
  return (
    <label className="text-[14px] text-[#111827] mb-1.5 block" style={font}>
      {children}
    </label>
  )
}

type BasicPropertyDetailsFieldsProps = {
  form: BasicPropertyFormState
  onChange: (patch: Partial<BasicPropertyFormState>) => void
}

export function BasicPropertyDetailsFields({ form, onChange }: BasicPropertyDetailsFieldsProps) {
  const set = (key: keyof BasicPropertyFormState) => (value: string) => onChange({ [key]: value })

  return (
    <>
      <div className="mb-6">
        <h2 className="text-[28px] sm:text-[32px] leading-tight font-normal text-[#111827] mb-2" style={font}>
          Basic Property Details
        </h2>
        <p className="text-[15px] sm:text-[16px] text-[#6B7280]" style={font}>
          Provide the essential information about your property
        </p>
      </div>

      <div className="space-y-5">
        <div>
          <FieldLabel>Property Title</FieldLabel>
          <input
            type="text"
            value={form.propertyTitle}
            onChange={(e) => set('propertyTitle')(e.target.value)}
            placeholder="e.g., Modern Downtown Apartment"
            className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] bg-white px-3 text-[14px] text-[#111827] placeholder:text-gray-400 outline-none focus:border-[#A49776] focus:ring-1 focus:ring-[#A49776]/30"
            style={font}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-6">
          <div>
            <FieldLabel>Price</FieldLabel>
            <div className="relative">
              <span
                className="absolute left-3 top-1/2 -translate-y-1/2 text-[14px] text-[#6B7280] pointer-events-none"
                style={font}
              >
                $
              </span>
              <input
                type="text"
                value={form.price}
                onChange={(e) => set('price')(e.target.value)}
                placeholder="450,000"
                className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] bg-white pl-8 pr-3 text-[14px] text-[#111827] placeholder:text-gray-400 outline-none focus:border-[#A49776] focus:ring-1 focus:ring-[#A49776]/30"
                style={font}
              />
            </div>
          </div>
          <div>
            <FieldLabel>Property Type</FieldLabel>
            <div className="relative">
              <select
                value={form.propertyType}
                onChange={(e) => set('propertyType')(e.target.value)}
                className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] bg-white pl-3 pr-10 text-[14px] text-[#111827] outline-none appearance-none cursor-pointer focus:border-[#A49776] focus:ring-1 focus:ring-[#A49776]/30"
                style={font}
              >
                <option value="">Select type</option>
                <option value="Residential">Residential</option>
                <option value="Commercial">Commercial</option>
                <option value="Industrial">Industrial</option>
                <option value="Land">Land</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>
          </div>
        </div>

        <div>
          <FieldLabel>Street Address</FieldLabel>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <MapPin className="w-4 h-4" />
            </span>
            <input
              type="text"
              value={form.streetAddress}
              onChange={(e) => set('streetAddress')(e.target.value)}
              placeholder="123 Main Street"
              className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] bg-white pl-9 pr-3 text-[14px] text-[#111827] placeholder:text-gray-400 outline-none focus:border-[#A49776] focus:ring-1 focus:ring-[#A49776]/30"
              style={font}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div>
            <FieldLabel>City</FieldLabel>
            <input
              type="text"
              value={form.city}
              onChange={(e) => set('city')(e.target.value)}
              placeholder=""
              className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] bg-white px-3 text-[14px] text-[#111827] placeholder:text-gray-400 outline-none focus:border-[#A49776] focus:ring-1 focus:ring-[#A49776]/30"
              style={font}
            />
          </div>
          <div>
            <FieldLabel>State</FieldLabel>
            <input
              type="text"
              value={form.state}
              onChange={(e) => set('state')(e.target.value)}
              placeholder=""
              className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] bg-white px-3 text-[14px] text-[#111827] placeholder:text-gray-400 outline-none focus:border-[#A49776] focus:ring-1 focus:ring-[#A49776]/30"
              style={font}
            />
          </div>
          <div>
            <FieldLabel>Zip Code</FieldLabel>
            <input
              type="text"
              value={form.zipCode}
              onChange={(e) => set('zipCode')(e.target.value)}
              placeholder=""
              className="w-full h-[42px] rounded-[6px] border border-[#D1D5DC] bg-white px-3 text-[14px] text-[#111827] placeholder:text-gray-400 outline-none focus:border-[#A49776] focus:ring-1 focus:ring-[#A49776]/30"
              style={font}
            />
          </div>
        </div>

        <div>
          <FieldLabel>Description</FieldLabel>
          <textarea
            value={form.description}
            onChange={(e) => set('description')(e.target.value)}
            placeholder="Describe your property..."
            className="w-full min-h-[120px] rounded-[6px] border border-[#D1D5DC] bg-white px-3 py-3 text-[14px] text-[#111827] placeholder:text-gray-400 outline-none resize-none focus:border-[#A49776] focus:ring-1 focus:ring-[#A49776]/30"
            style={font}
          />
        </div>
      </div>
    </>
  )
}
