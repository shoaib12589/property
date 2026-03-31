export type ListingStatus = 'pending' | 'active' | 'expired'

export type ListingRow = {
  id: string
  title: string
  owner: string
  propertyType: 'MLS' | 'FSBO'
  status: ListingStatus
}

export const MOCK_LISTINGS: ListingRow[] = [
  { id: '2455675', title: 'Modern Downtown Apartment', owner: 'John Williams', propertyType: 'MLS', status: 'active' },
  { id: '2455676', title: 'Urban Loft Studio', owner: 'David', propertyType: 'FSBO', status: 'pending' },
  { id: '2455677', title: 'Cozy Family Home', owner: 'John Williams', propertyType: 'MLS', status: 'expired' },
  { id: '2455678', title: 'Luxury Villa in Suburbs', owner: 'David', propertyType: 'FSBO', status: 'pending' },
  { id: '2455679', title: 'Riverside Condo', owner: 'Sarah Lee', propertyType: 'MLS', status: 'active' },
  { id: '2455680', title: 'Garden Townhouse', owner: 'John Williams', propertyType: 'MLS', status: 'expired' },
]

export function getListingById(id: string | undefined): ListingRow | undefined {
  if (!id) return undefined
  return MOCK_LISTINGS.find((r) => r.id === id)
}
