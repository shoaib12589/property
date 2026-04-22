export type RegMainTab = 'vendors' | 'admin' | 'partner'

export const REG_MAIN_TABS: { key: RegMainTab; label: string }[] = [
  { key: 'vendors', label: 'Vendors' },
  { key: 'admin', label: 'Admin Registration' },
  { key: 'partner', label: 'Partner Enrollment' },
]

export type VendorStatus = 'Active' | 'Inactive'

export type VendorRow = {
  id: string
  initials: string
  name: string
  category: string
  email: string
  phone: string
  status: VendorStatus
}

export type AdminRow = {
  id: string
  name: string
  email: string
  accessLevel: string
  lastLogin: string
}

export type PartnerStatus = 'Pending' | 'Approved' | 'Rejected'

export type PartnerRow = {
  id: string
  initials: string
  name: string
  email: string
  requestDate: string
  status: PartnerStatus
  company?: string
  website?: string
  primaryEmail?: string
  tier?: string
  referral?: string
  documents?: string
  profileImage?: string
  companyDesc?: string
}

const vendorSeed: Omit<VendorRow, 'id'>[] = [
  {
    initials: 'SM',
    name: 'Sterling Masonry',
    category: 'LANDSCAPE & HARDSCAPE',
    email: 'contact@sterlingmasonry.com',
    phone: '+1 (555) 010-2200',
    status: 'Active',
  },
  {
    initials: 'HM',
    name: 'Heritage Masonry Ltd.',
    category: 'STRUCTURAL RESTORATION',
    email: 'concierge@stonemasonry.co',
    phone: '+44 (0) 20 7946 0122',
    status: 'Inactive',
  },
]

export function buildVendorRows(total: number): VendorRow[] {
  return Array.from({ length: total }, (_, i) => ({
    id: `v${i + 1}`,
    ...vendorSeed[i % vendorSeed.length],
  }))
}

export const MOCK_ADMIN_ROWS: AdminRow[] = Array.from({ length: 24 }, (_, i) => ({
  id: `a${i + 1}`,
  name: 'Alexander Sterling',
  email: 'a.sterling@curatedestate.com',
  accessLevel: 'Management Admin',
  lastLogin: ['2 hours ago', '3 hours ago', '5 hours ago', '12 hours ago'][i % 4],
}))

const partnerSeed: Omit<PartnerRow, 'id'>[] = [
  {
    initials: 'JP',
    name: 'Julianne P. Sterling',
    email: 'julianne.sterling@vaneconcierge.com',
    requestDate: 'Oct 24, 2023',
    status: 'Pending',
    company: 'Vane Global Concierge',
    website: 'vaneconcierge.com',
    primaryEmail: 'julian.v@vaneconcierge.com',
    tier: 'Diamond Estate',
    referral: 'Internal Network',
    documents: '3 Files',
    profileImage: 'https://images.unsplash.com/photo-1560250097-192b3607d696?w=96&q=80',
    companyDesc:
      'Providing bespoke lifestyle management and luxury travel services for high-net-worth individuals globally. Specialists in private aviation and rare procurement.',
  },
  {
    initials: 'MA',
    name: 'Marcus Aldridge',
    email: 'marcus.ald@estatevault.io',
    requestDate: 'Oct 22, 2023',
    status: 'Approved',
    company: 'Estate Vault Advisory',
    website: 'estatevault.io',
    primaryEmail: 'marcus@estatevault.io',
    tier: 'Platinum',
    referral: 'Partner Network',
    documents: '2 Files',
    profileImage: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=96&q=80',
    companyDesc: 'Institutional advisory for cross-border estate structuring.',
  },
  {
    initials: 'LV',
    name: 'Julian Vane',
    email: 'julian@vaneconcierge.com',
    requestDate: 'Oct 21, 2023',
    status: 'Rejected',
    company: 'Vane Global',
    website: 'vaneconcierge.com',
    primaryEmail: 'julian@vaneconcierge.com',
    tier: 'Gold',
    referral: 'Direct',
    documents: '1 File',
    profileImage: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=96&q=80',
    companyDesc: 'Concierge services.',
  },
  {
    initials: 'ER',
    name: 'Elena Rhodes',
    email: 'elena.rhodes@meridianlux.com',
    requestDate: 'Oct 20, 2023',
    status: 'Pending',
    company: 'Meridian Luxury',
    website: 'meridianlux.com',
    primaryEmail: 'elena@meridianlux.com',
    tier: 'Silver',
    referral: 'Internal Network',
    documents: '4 Files',
    profileImage: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=96&q=80',
    companyDesc: 'Luxury procurement and relocation.',
  },
]

export function buildPartnerRows(total: number): PartnerRow[] {
  return Array.from({ length: total }, (_, i) => ({
    id: `p${i + 1}`,
    ...partnerSeed[i % partnerSeed.length],
  }))
}

export const SERVICE_CATEGORIES = ['Structural Restoration', 'Landscape & Hardscape', 'Concierge', 'Legal & Compliance']

export const ACCESS_LEVELS = ['Management Admin', 'Operations Admin', 'Read-only Auditor']

/** Mini bar heights 0–100 for Growth Velocity card */
export const GROWTH_BAR_HEIGHTS = [45, 72, 55, 88, 62]
