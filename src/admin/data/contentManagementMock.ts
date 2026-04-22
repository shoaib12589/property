export type CmsTabKey = 'categories' | 'property-types' | 'amenities' | 'locations' | 'media-files'

export const CMS_TABS: { key: CmsTabKey; label: string; count: number }[] = [
  { key: 'categories', label: 'Total Categories', count: 12 },
  { key: 'property-types', label: 'Property Types', count: 25 },
  { key: 'amenities', label: 'Amenities', count: 40 },
  { key: 'locations', label: 'Locations', count: 153 },
  { key: 'media-files', label: 'Media Files', count: 563 },
]

export type CmsStatus = 'Active' | 'Inactive'

export type CategoryRow = {
  id: string
  name: string
  type: string
  status: CmsStatus
  date: string
  description: string
}

export type PropertyTypeRow = CategoryRow

export type AmenityRow = {
  id: string
  name: string
  icon: string
  status: CmsStatus
  description: string
}

export type LocationRow = {
  id: string
  country: string
  city: string
  area: string
  status: CmsStatus
  description: string
}

export type MediaRow = {
  id: string
  name: string
  size: string
  image: string
}

const longDescription =
  'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer pharetra nec augue a tincidunt. Donec viverra pretium mauris. Donec pharetra sodales dui sit amet scelerisque.'

export const CATEGORY_ROWS: CategoryRow[] = [
  { id: '3048', name: 'Residential', type: 'Main', status: 'Active', date: '16/Mar/2026', description: longDescription },
  { id: '3049', name: 'Commercial', type: 'Main', status: 'Active', date: '16/Mar/2026', description: longDescription },
  { id: '3050', name: 'Residential', type: 'Main', status: 'Active', date: '16/Mar/2026', description: longDescription },
  { id: '3051', name: 'Residential', type: 'Main', status: 'Active', date: '16/Mar/2026', description: longDescription },
  { id: '3052', name: 'Commercial', type: 'Main', status: 'Active', date: '16/Mar/2026', description: longDescription },
  { id: '3053', name: 'Commercial', type: 'Main', status: 'Active', date: '16/Mar/2026', description: longDescription },
]

export const PROPERTY_TYPE_ROWS: PropertyTypeRow[] = [
  { id: '4012', name: 'Apartment', type: 'Main', status: 'Active', date: '16/Mar/2026', description: longDescription },
  { id: '4013', name: 'Villa', type: 'Main', status: 'Active', date: '16/Mar/2026', description: longDescription },
  { id: '4014', name: 'Apartment', type: 'Main', status: 'Active', date: '16/Mar/2026', description: longDescription },
  { id: '4015', name: 'Villa', type: 'Main', status: 'Active', date: '16/Mar/2026', description: longDescription },
  { id: '4016', name: 'Apartment', type: 'Main', status: 'Active', date: '16/Mar/2026', description: longDescription },
  { id: '4017', name: 'Villa', type: 'Main', status: 'Active', date: '16/Mar/2026', description: longDescription },
]

export const AMENITY_ROWS: AmenityRow[] = [
  { id: '5001', name: 'Pool', icon: '🏊', status: 'Active', description: longDescription },
  { id: '5002', name: 'Gym', icon: '🏋️', status: 'Active', description: longDescription },
  { id: '5003', name: 'Pool', icon: '🏊', status: 'Active', description: longDescription },
  { id: '5004', name: 'Gym', icon: '🏋️', status: 'Active', description: longDescription },
  { id: '5005', name: 'Gym', icon: '🏋️', status: 'Active', description: longDescription },
  { id: '5006', name: 'Pool', icon: '🏊', status: 'Active', description: longDescription },
]

export const LOCATION_ROWS: LocationRow[] = [
  { id: '7001', country: 'UK', city: 'England', area: 'Birmingham', status: 'Active', description: longDescription },
  { id: '7002', country: 'UK', city: 'London', area: 'Leeds', status: 'Active', description: longDescription },
  { id: '7003', country: 'UK', city: 'England', area: 'Birmingham', status: 'Active', description: longDescription },
  { id: '7004', country: 'UK', city: 'London', area: 'Leeds', status: 'Active', description: longDescription },
  { id: '7005', country: 'UK', city: 'England', area: 'Birmingham', status: 'Active', description: longDescription },
  { id: '7006', country: 'UK', city: 'London', area: 'Manchester', status: 'Active', description: longDescription },
]

export const MEDIA_ROWS: MediaRow[] = [
  { id: '9001', name: 'Property Banner', size: '2MB', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200' },
  { id: '9002', name: 'Property Banner', size: '2MB', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200' },
  { id: '9003', name: 'Villa Banner', size: '2MB', image: 'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=200' },
  { id: '9004', name: 'Property Banner', size: '2MB', image: 'https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=200' },
]
