export type SystemMainTab = 'promotions' | 'advertisement' | 'watchlists' | 'document-vault' | 'audit-logs'

export const SYSTEM_MAIN_TABS: { key: SystemMainTab; label: string }[] = [
  { key: 'promotions', label: 'Promotions' },
  { key: 'advertisement', label: 'Advertisement' },
  { key: 'watchlists', label: 'Watchlists' },
  { key: 'document-vault', label: 'Document Vault' },
  { key: 'audit-logs', label: 'Audit Logs' },
]

export type PromotionRow = {
  id: string
  title: string
  subtitle: string
  discount: string
  duration: string
  status: 'Active' | 'Inactive'
  usageCount: string
}

export const MOCK_PROMOTIONS: PromotionRow[] = [
  {
    id: '1',
    title: 'Autumn Penthouse Series',
    subtitle: 'LUXURY RESIDENTIAL',
    discount: '15%',
    duration: 'Apr 20 - Apr 25, 2026',
    status: 'Active',
    usageCount: '428',
  },
  {
    id: '2',
    title: 'Coastal Escape Week',
    subtitle: 'LUXURY RESIDENTIAL',
    discount: '10%',
    duration: 'Apr 12 - Apr 18, 2026',
    status: 'Inactive',
    usageCount: '201',
  },
  {
    id: '3',
    title: 'Urban Loft Spotlight',
    subtitle: 'LUXURY RESIDENTIAL',
    discount: '12%',
    duration: 'Mar 01 - Mar 15, 2026',
    status: 'Active',
    usageCount: '612',
  },
  {
    id: '4',
    title: 'Heritage Manor Open House',
    subtitle: 'LUXURY RESIDENTIAL',
    discount: '8%',
    duration: 'Feb 10 - Feb 20, 2026',
    status: 'Inactive',
    usageCount: '144',
  },
  {
    id: '5',
    title: 'Skyline Collection',
    subtitle: 'LUXURY RESIDENTIAL',
    discount: '20%',
    duration: 'Jan 05 - Jan 30, 2026',
    status: 'Active',
    usageCount: '890',
  },
  {
    id: '6',
    title: 'Garden Estate Preview',
    subtitle: 'LUXURY RESIDENTIAL',
    discount: '5%',
    duration: 'Dec 01 - Dec 12, 2025',
    status: 'Inactive',
    usageCount: '98',
  },
]

export type AdvertisementCard = {
  id: string
  title: string
  image: string
  targetUrl: string
  status: 'Active' | 'Paused'
}

const sampleInterior =
  'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80'

export const MOCK_ADVERTISEMENTS: AdvertisementCard[] = [
  {
    id: 'a1',
    title: 'Summer Luxury Collection',
    image: sampleInterior,
    targetUrl: 'https://estate.com/featured-summer',
    status: 'Active',
  },
  {
    id: 'a2',
    title: 'Winter Retreat 2026',
    image: sampleInterior,
    targetUrl: 'https://estate.com/winter',
    status: 'Active',
  },
  {
    id: 'a3',
    title: 'Prime Listings Digest',
    image: sampleInterior,
    targetUrl: 'https://estate.com/digest',
    status: 'Paused',
  },
]

export type WatchlistRow = {
  id: string
  userName: string
  userTier: string
  userAvatar: string
  assetName: string
  assetImage: string
  intent: 'Referral Link' | 'Direct Search'
  dateLogged: string
}

const sampleHouse = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80'
const sampleAvatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&q=80'

export const MOCK_WATCHLISTS: WatchlistRow[] = Array.from({ length: 6 }, (_, i) => ({
  id: `w${i}`,
  userName: 'Alexander Sterling',
  userTier: 'High Net Worth Tier',
  userAvatar: sampleAvatar,
  assetName: 'The Obsidian Heights',
  assetImage: sampleHouse,
  intent: i % 2 === 0 ? 'Referral Link' : 'Direct Search',
  dateLogged: 'Apr 20, 2026',
}))

export type DocumentVaultRow = {
  id: string
  fileName: string
  property: string
  sizeLabel: string
  date: string
}

export const MOCK_DOCUMENTS: DocumentVaultRow[] = Array.from({ length: 6 }, (_, i) => ({
  id: `d${i}`,
  fileName: 'Purchase Agreement v2.pdf',
  property: 'Sunset Villa Purchase',
  sizeLabel: '245 KB',
  date: 'Apr 12, 2026',
}))

export type AuditSubFilter = 'all' | 'security' | 'listing-updates' | 'document-history'

export type AuditActionType =
  | 'Updated Listing'
  | 'Uploaded Document'
  | 'Changed Status'
  | 'Login'
  | 'Logged out'

export type AuditLogRow = {
  id: string
  adminName: string
  adminEmail: string
  role: string
  entityTitle: string
  entitySub: string
  dateTime: string
  action: AuditActionType
  subFilter: AuditSubFilter[]
}

export const MOCK_AUDIT_LOGS: AuditLogRow[] = [
  {
    id: 'al1',
    adminName: 'Marcus Thorne',
    adminEmail: 'marcusthorne@gmail.com',
    role: 'Administrator',
    entityTitle: 'The Obsidian Heights',
    entitySub: 'PROPERTY ID: #EST-8921',
    dateTime: 'Oct 24, 2023 • 10:45 AM',
    action: 'Updated Listing',
    subFilter: ['all', 'listing-updates'],
  },
  {
    id: 'al2',
    adminName: 'Sarah Jenkins',
    adminEmail: 'sarahj@gmail.com',
    role: 'Agent',
    entityTitle: 'Purchase_Deed_V7.pdf',
    entitySub: 'REF: VAULT-004',
    dateTime: 'Oct 23, 2023 • 3:12 PM',
    action: 'Uploaded Document',
    subFilter: ['all', 'document-history'],
  },
  {
    id: 'al3',
    adminName: 'Elena Rodriguez',
    adminEmail: 'elena.r@estate.com',
    role: 'Agent',
    entityTitle: 'Azure Point Villa',
    entitySub: 'PENDING → ACTIVE',
    dateTime: 'Oct 22, 2023 • 9:00 AM',
    action: 'Changed Status',
    subFilter: ['all', 'listing-updates'],
  },
  {
    id: 'al4',
    adminName: 'Julian Vance',
    adminEmail: 'julian.v@estate.com',
    role: 'Broker',
    entityTitle: 'Admin Terminal #4',
    entitySub: 'IP: 192.168.1.45',
    dateTime: 'Oct 21, 2023 • 8:15 PM',
    action: 'Login',
    subFilter: ['all', 'security'],
  },
  {
    id: 'al5',
    adminName: 'Julian Vance',
    adminEmail: 'julian.v@estate.com',
    role: 'Broker',
    entityTitle: 'Admin Terminal #4',
    entitySub: 'IP: 192.168.1.45',
    dateTime: 'Oct 21, 2023 • 6:00 PM',
    action: 'Logged out',
    subFilter: ['all', 'security'],
  },
]

export function auditActionBadgeClass(action: AuditActionType): string {
  switch (action) {
    case 'Updated Listing':
      return 'bg-[#E5E7EB] text-[#374151]'
    case 'Uploaded Document':
      return 'bg-[#FFEDD5] text-[#9A3412]'
    case 'Changed Status':
      return 'bg-[#FEF9C3] text-[#854D0E]'
    case 'Login':
      return 'bg-[#E0E7FF] text-[#3730A3]'
    case 'Logged out':
      return 'bg-[#FEE2E2] text-[#991B1B]'
  }
}
