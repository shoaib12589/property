export type EventCard = {
  id: string
  image: string
  dateMonth: string
  dateDay: string
  label: string
  labelColor: string
  title: string
  venue: string
  startTime: string
  endTime: string
  price: string
  interestedCount: number
}

/** Wide hero image for event detail (trade show / convention) */
export const EVENT_DETAIL_HERO_IMAGE =
  'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=1200&h=600&fit=crop'

export const EVENT_DETAIL_PARAGRAPHS = [
  'Join us for our Exclusive Property Listing Event, where buyers, investors, agents, and property enthusiasts can explore the latest and most valuable real estate opportunities. This event brings together premium residential and commercial properties in one place, offering a unique chance to discover your next investment or dream home.',
  'Attendees will get access to newly listed properties, special deals, and direct connections with professional agents and brokers. Whether you are looking to buy, sell, or invest, this event provides the perfect platform to explore the market and make informed decisions.',
] as const

export const LISTING_EVENTS: EventCard[] = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    dateMonth: 'NOV',
    dateDay: '22',
    label: 'Latest Property',
    labelColor: '#A3906D',
    title: 'Exclusive Property Listing Event 2026',
    venue: 'UK',
    startTime: '12:00 AM',
    endTime: '07:23 PM',
    price: '$499.00',
    interestedCount: 10,
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=300&fit=crop',
    dateMonth: 'NOV',
    dateDay: '22',
    label: 'Real Estate Investors',
    labelColor: '#22C55E',
    title: 'Exclusive Property Listing Event 2026',
    venue: 'UK',
    startTime: '12:00 AM',
    endTime: '07:23 PM',
    price: '$499.00',
    interestedCount: 10,
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
    dateMonth: 'NOV',
    dateDay: '22',
    label: 'Property Agents & Brokers',
    labelColor: '#8B5CF6',
    title: 'Exclusive Property Listing Event 2026',
    venue: 'UK',
    startTime: '12:00 AM',
    endTime: '07:23 PM',
    price: '$499.00',
    interestedCount: 10,
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=400&h=300&fit=crop',
    dateMonth: 'NOV',
    dateDay: '22',
    label: 'End-User Customers',
    labelColor: '#3B82F6',
    title: 'Exclusive Property Listing Event 2026',
    venue: 'UK',
    startTime: '12:00 AM',
    endTime: '07:23 PM',
    price: '$499.00',
    interestedCount: 10,
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
    dateMonth: 'NOV',
    dateDay: '22',
    label: 'Latest Property',
    labelColor: '#A3906D',
    title: 'Exclusive Property Listing Event 2026',
    venue: 'UK',
    startTime: '12:00 AM',
    endTime: '07:23 PM',
    price: '$499.00',
    interestedCount: 10,
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1559223607-a43c990c692c?w=400&h=300&fit=crop',
    dateMonth: 'NOV',
    dateDay: '22',
    label: 'Real Estate Investors',
    labelColor: '#22C55E',
    title: 'Exclusive Property Listing Event 2026',
    venue: 'UK',
    startTime: '12:00 AM',
    endTime: '07:23 PM',
    price: '$499.00',
    interestedCount: 10,
  },
]

export function getListingEventById(id: string | undefined) {
  if (!id) return LISTING_EVENTS[0]
  return LISTING_EVENTS.find((e) => e.id === id) ?? LISTING_EVENTS[0]
}
