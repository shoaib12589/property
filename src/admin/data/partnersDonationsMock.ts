export type PartnersTab = 'charities' | 'campaigns' | 'sponsors'

export const PARTNERS_TABS: { key: PartnersTab; label: string }[] = [
  { key: 'charities', label: 'Charities' },
  { key: 'campaigns', label: 'Donation Campaigns' },
  { key: 'sponsors', label: 'Sponsors / Partners' },
]

export type CharityStatus = 'Active' | 'Inactive'

export type CharityRow = {
  id: string
  name: string
  partnerSince: string
  description: string
  impactFocus: string
  status: CharityStatus
  avatar: string
}

export type CampaignStatus = 'Active' | 'Inactive'

export type CampaignRow = {
  id: string
  title: string
  subtitle: string
  image: string
  goal: string
  raisedPct: number
  duration: string
  status: CampaignStatus
}

export type PartnerStatus = 'Active' | 'Inactive'

export type SponsorPartnerRow = {
  id: string
  title: string
  subtitle: string
  logo: string
  link: string
  status: PartnerStatus
}

const avatar = 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=128&q=80'
const house = 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=200&q=80'

const charityTemplate: Omit<CharityRow, 'id'>[] = [
  {
    name: 'Habitat Alliance',
    partnerSince: 'PARTNER SINCE 2019',
    description: 'Architectural sustainability and urban reform initiatives across metropolitan regions.',
    impactFocus: 'Urban Reform',
    status: 'Active',
    avatar,
  },
  {
    name: 'Habitat Alliance',
    partnerSince: 'PARTNER SINCE 2019',
    description: 'Architectural sustainability and ecology programs for resilient communities.',
    impactFocus: 'Ecology',
    status: 'Inactive',
    avatar,
  },
  {
    name: 'Habitat Alliance',
    partnerSince: 'PARTNER SINCE 2019',
    description: 'Architectural sustainability and heritage preservation for landmark estates.',
    impactFocus: 'Heritage',
    status: 'Active',
    avatar,
  },
  {
    name: 'Habitat Alliance',
    partnerSince: 'PARTNER SINCE 2019',
    description: 'Architectural sustainability and education outreach for emerging architects.',
    impactFocus: 'Education',
    status: 'Inactive',
    avatar,
  },
]

export function buildCharityRows(total: number): CharityRow[] {
  return Array.from({ length: total }, (_, i) => ({
    id: `c${i + 1}`,
    ...charityTemplate[i % charityTemplate.length],
  }))
}

const campaignBase: Omit<CampaignRow, 'id'>[] = [
  {
    title: 'The Victoria Restoration',
    subtitle: 'Heritage Preservation • London',
    image: house,
    goal: '$1,250,000',
    raisedPct: 62,
    duration: 'Apr 20 - Apr 25, 2026',
    status: 'Active',
  },
  {
    title: 'The Victoria Restoration',
    subtitle: 'Heritage Preservation • London',
    image: house,
    goal: '$890,000',
    raisedPct: 34,
    duration: 'Apr 20 - Apr 25, 2026',
    status: 'Inactive',
  },
]

export function buildCampaignRows(total: number): CampaignRow[] {
  return Array.from({ length: total }, (_, i) => ({
    id: `camp${i + 1}`,
    ...campaignBase[i % campaignBase.length],
  }))
}

const sponsorTemplate: Omit<SponsorPartnerRow, 'id'>[] = [
  {
    title: 'The Victoria Restoration',
    subtitle: 'Heritage Preservation • London',
    logo: avatar,
    link: 'meridian-luxury.com',
    status: 'Active',
  },
  {
    title: 'The Victoria Restoration',
    subtitle: 'Heritage Preservation • London',
    logo: avatar,
    link: 'meridian-luxury.com',
    status: 'Inactive',
  },
]

export function buildSponsorRows(total: number): SponsorPartnerRow[] {
  return Array.from({ length: total }, (_, i) => ({
    id: `s${i + 1}`,
    ...sponsorTemplate[i % sponsorTemplate.length],
  }))
}
