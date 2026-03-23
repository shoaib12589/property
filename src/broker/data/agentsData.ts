export type BrokerAgentStatus = 'Active' | 'Offline' | 'Pending'

export type BrokerAgent = {
  id: string
  name: string
  email: string
  phone: string
  license: string
  status: BrokerAgentStatus
}

export const BROKER_AGENTS: BrokerAgent[] = [
  {
    id: 'john-williams',
    name: 'John Williams',
    email: 'johnwilliams@mail.com',
    phone: '+123 456 7890',
    license: '2455675',
    status: 'Active',
  },
  {
    id: 'den-williams',
    name: 'Den Williams',
    email: 'denwilliams@mail.com',
    phone: '+123 456 7890',
    license: 'D3-393739',
    status: 'Offline',
  },
  {
    id: 'david-johnson',
    name: 'David Johnson',
    email: 'davidjohnson@mail.com',
    phone: '+123 456 7890',
    license: '2455676',
    status: 'Active',
  },
  {
    id: 'sarah-smith',
    name: 'Sarah Smith',
    email: 'sarahsmith@mail.com',
    phone: '+123 456 7890',
    license: '3399281',
    status: 'Pending',
  },
]

export function getAgentById(id: string | undefined): BrokerAgent | undefined {
  if (!id) return undefined
  return BROKER_AGENTS.find((a) => a.id === id)
}

export const ASSIGN_LISTING_OPTIONS = [
  { id: '1023', label: 'Listing #1023 - 3 Bed Apartment' },
  { id: '1024', label: 'Listing #1024 - Residential Home' },
  { id: '1025', label: 'Listing #1025 - Land' },
]

export const PERFORMANCE_TABLE_ROWS = [
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    agentCell: 'John Doe',
    showingDate: '19/05/2026',
    status: 'Active' as const,
    statusStyle: { bg: '#FFF9C4', text: '#F57F17' },
  },
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    agentCell: 'Urban Loft Studio',
    showingDate: '19/05/2026',
    status: 'Sold' as const,
    statusStyle: { bg: '#C8E6C9', text: '#2E7D32' },
  },
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    agentCell: 'John Doe',
    showingDate: '19/05/2026',
    status: 'Active' as const,
    statusStyle: { bg: '#FFF9C4', text: '#F57F17' },
  },
  {
    requestId: '2455675',
    property: 'Modern Downtown Apartment',
    agentCell: 'Urban Loft Studio',
    showingDate: '19/05/2026',
    status: 'Sold' as const,
    statusStyle: { bg: '#C8E6C9', text: '#2E7D32' },
  },
]
