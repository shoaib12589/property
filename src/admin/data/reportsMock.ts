export type ReportTab =
  | 'registration'
  | 'recruitment'
  | 'listing'
  | 'services'
  | 'traffic'

export const REPORT_TABS: { key: ReportTab; label: string }[] = [
  { key: 'registration', label: 'Registration Report' },
  { key: 'recruitment', label: 'Recruitment Report' },
  { key: 'listing', label: 'Listing Report' },
  { key: 'services', label: 'Services Report' },
  { key: 'traffic', label: 'Traffic Report' },
]

export type RegistrationRow = {
  id: string
  name: string
  email: string
  phone: string
  status: 'Active'
  date: string
}

export type RecruitmentRow = {
  id: string
  name: string
  role: 'Agent' | 'Broker'
  license: string
  status: 'Approved' | 'Pending'
  joinDate: string
}

export type ListingRow = {
  listingId: string
  property: string
  type: string
  category: string
  status: 'Active'
  joinDate: string
  views: string
}

export type ServicesRow = {
  listingId: string
  property: string
  serviceType: string
  status: 'Active'
  date: string
}

export type TrafficRow = {
  userType: 'Customer' | 'Agent' | 'Broker'
  visits: string
  pageViews: string
  duration: string
  date: string
}

const names = ['John Williams', 'David', 'Copper Johns'] as const

function cycle<T>(arr: readonly T[], i: number): T {
  return arr[i % arr.length]
}

export const MOCK_REGISTRATION: RegistrationRow[] = Array.from({ length: 7 }, (_, i) => ({
  id: '2455675',
  name: cycle(names, i),
  email: `${cycle(['johnwilliams', 'david', 'copper'], i)}@mail.com`,
  phone: '+123 456 7890',
  status: 'Active',
  date: '16/Mar/2026',
}))

export const MOCK_RECRUITMENT: RecruitmentRow[] = Array.from({ length: 7 }, (_, i) => ({
  id: '2455675',
  name: cycle(names, i),
  role: i % 2 === 0 ? 'Agent' : 'Broker',
  license: `${1200 + i}`,
  status: i % 3 === 0 ? 'Pending' : 'Approved',
  joinDate: '16/Mar/2026',
}))

export const MOCK_LISTING: ListingRow[] = Array.from({ length: 7 }, (_, i) => ({
  listingId: '2455675',
  property: 'Apartment',
  type: i % 2 === 0 ? 'Apartment' : 'Residential',
  category: 'Sale',
  status: 'Active',
  joinDate: '16/Mar/2026',
  views: cycle(['124', '536', '924'], i),
}))

export const MOCK_SERVICES: ServicesRow[] = Array.from({ length: 7 }, () => ({
  listingId: '2455675',
  property: 'Apartment',
  serviceType: 'Showing Request',
  status: 'Active',
  date: '16/Mar/2026',
}))

export const MOCK_TRAFFIC: TrafficRow[] = [
  { userType: 'Customer', visits: '1200', pageViews: '3000', duration: '3 mins', date: '16/Mar/2026' },
  { userType: 'Agent', visits: '1300', pageViews: '4000', duration: '6 mins', date: '16/Mar/2026' },
  { userType: 'Broker', visits: '4500', pageViews: '5674', duration: '9 mins', date: '16/Mar/2026' },
  { userType: 'Customer', visits: '400', pageViews: '3414', duration: '12 mins', date: '16/Mar/2026' },
  { userType: 'Agent', visits: '3500', pageViews: '9086', duration: '14 mins', date: '16/Mar/2026' },
  { userType: 'Broker', visits: '790', pageViews: '3000', duration: '6 mins', date: '16/Mar/2026' },
  { userType: 'Customer', visits: '3612', pageViews: '3050', duration: '22 mins', date: '16/Mar/2026' },
]
