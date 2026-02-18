import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { PropertyCarousel } from '@/components/PropertyCarousel'
import { Testimonials } from '@/components/Testimonials'
import { ProfessionalNetworks } from '@/components/ProfessionalNetworks'
import { ContactSection } from '@/components/ContactSection'
import { Footer } from '@/components/Footer'

// Helper function to create image arrays
const createImages = (primary: string, ...additional: string[]) => {
  return [primary, ...additional]
}

// Sample property data - 10 cards for each section
const residentialProperties = [
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800'
    ),
    status: 'OPEN' as const,
    price: '$850,000',
    type: 'Modern Luxury Villa',
    beds: 4,
    baths: 3,
    sqft: '3,200 sqft',
    address: '4617 Washington Ave. Manchester, Kentucky 39495',
    listedBy: 'Killer Williams Realty Creator',
    openHouse: 'Sat, 2-4pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800'
    ),
    status: 'SOLD' as const,
    price: '$650,000',
    type: 'Contemporary Family Home',
    beds: 3,
    baths: 2,
    sqft: '2,500 sqft',
    address: '1234 Oak Street, Springfield, IL 62701',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    ),
    status: 'OPEN' as const,
    price: '$1,200,000',
    type: 'Luxury Estate',
    beds: 5,
    baths: 4,
    sqft: '4,500 sqft',
    address: '789 Pine Avenue, Beverly Hills, CA 90210',
    listedBy: 'Gehard Real Estate Group',
    openHouse: 'Sun, 1-3pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$425,000',
    type: 'Cozy Bungalow',
    beds: 2,
    baths: 2,
    sqft: '1,800 sqft',
    address: '321 Elm Street, Portland, OR 97201',
    listedBy: 'Gehard Real Estate Group',
    openHouse: 'Sat, 10am-12pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$725,000',
    type: 'Modern Townhouse',
    beds: 3,
    baths: 2.5,
    sqft: '2,800 sqft',
    address: '567 Maple Road, Seattle, WA 98101',
    listedBy: 'Gehard Real Estate Group',
    openHouse: 'Sat, 2-4pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800'
    ),
    status: 'OPEN' as const,
    price: '$950,000',
    type: 'Spacious Family Home',
    beds: 4,
    baths: 3,
    sqft: '3,400 sqft',
    address: '890 Cedar Lane, Denver, CO 80202',
    listedBy: 'Gehard Real Estate Group',
    openHouse: 'Sun, 2-4pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800'
    ),
    status: 'SOLD' as const,
    price: '$550,000',
    type: 'Classic Colonial',
    beds: 3,
    baths: 2,
    sqft: '2,200 sqft',
    address: '234 Birch Street, Boston, MA 02101',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800',
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$1,150,000',
    type: 'Beachfront Villa',
    beds: 4,
    baths: 3.5,
    sqft: '3,600 sqft',
    address: '123 Ocean Drive, Miami, FL 33139',
    listedBy: 'Gehard Real Estate Group',
    openHouse: 'Sat, 11am-1pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$680,000',
    type: 'Contemporary Ranch',
    beds: 3,
    baths: 2,
    sqft: '2,600 sqft',
    address: '456 Hilltop Road, Austin, TX 78701',
    listedBy: 'Gehard Real Estate Group',
    openHouse: 'Sun, 3-5pm'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800',
      'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800',
      'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800'
    ),
    status: 'OPEN' as const,
    price: '$875,000',
    type: 'Elegant Victorian',
    beds: 4,
    baths: 3,
    sqft: '3,100 sqft',
    address: '789 Heritage Avenue, San Francisco, CA 94102',
    listedBy: 'Gehard Real Estate Group',
    openHouse: 'Sat, 1-3pm'
  }
]

const commercialProperties = [
  {
    images: createImages(
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ),
    status: 'OPEN' as const,
    price: '$2,500,000',
    type: 'Office Building',
    beds: 0,
    baths: 0,
    sqft: '15,000 sqft',
    address: '100 Business Park Drive, New York, NY 10001',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$1,800,000',
    type: 'Retail Space',
    beds: 0,
    baths: 0,
    sqft: '8,500 sqft',
    address: '250 Main Street, Los Angeles, CA 90001',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800'
    ),
    status: 'OPEN' as const,
    price: '$3,200,000',
    type: 'Mixed-Use Building',
    beds: 0,
    baths: 0,
    sqft: '22,000 sqft',
    address: '500 Commerce Boulevard, Chicago, IL 60601',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ),
    status: 'SOLD' as const,
    price: '$1,200,000',
    type: 'Restaurant Space',
    beds: 0,
    baths: 0,
    sqft: '5,200 sqft',
    address: '150 Food Court Plaza, Las Vegas, NV 89101',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$4,500,000',
    type: 'Shopping Center',
    beds: 0,
    baths: 0,
    sqft: '45,000 sqft',
    address: '800 Retail Row, Houston, TX 77001',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800'
    ),
    status: 'OPEN' as const,
    price: '$1,950,000',
    type: 'Medical Office',
    beds: 0,
    baths: 0,
    sqft: '12,000 sqft',
    address: '300 Health Center Way, Phoenix, AZ 85001',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ),
    status: 'OPEN' as const,
    price: '$2,800,000',
    type: 'Warehouse Facility',
    beds: 0,
    baths: 0,
    sqft: '35,000 sqft',
    address: '600 Industrial Drive, Dallas, TX 75201',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$1,650,000',
    type: 'Hotel Property',
    beds: 0,
    baths: 0,
    sqft: '18,500 sqft',
    address: '450 Hospitality Avenue, Orlando, FL 32801',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800',
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800'
    ),
    status: 'OPEN' as const,
    price: '$3,750,000',
    type: 'Corporate Headquarters',
    beds: 0,
    baths: 0,
    sqft: '28,000 sqft',
    address: '700 Executive Plaza, Atlanta, GA 30301',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800',
      'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=800',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=800'
    ),
    status: 'SOLD' as const,
    price: '$950,000',
    type: 'Storefront',
    beds: 0,
    baths: 0,
    sqft: '3,800 sqft',
    address: '200 Downtown Square, Nashville, TN 37201',
    listedBy: 'Gehard Real Estate Group'
  }
]

const industrialProperties = [
  {
    images: createImages(
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1581092160562-40aa924e5c5c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$5,200,000',
    type: 'Manufacturing Plant',
    beds: 0,
    baths: 0,
    sqft: '85,000 sqft',
    address: '1000 Factory Road, Detroit, MI 48201',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1581092160562-40aa924e5c5c?w=800',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800'
    ),
    status: 'OPEN' as const,
    price: '$3,800,000',
    type: 'Distribution Center',
    beds: 0,
    baths: 0,
    sqft: '120,000 sqft',
    address: '1500 Logistics Lane, Memphis, TN 38101',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800'
    ),
    status: 'OPEN' as const,
    price: '$2,900,000',
    type: 'Storage Facility',
    beds: 0,
    baths: 0,
    sqft: '65,000 sqft',
    address: '800 Warehouse Way, Kansas City, MO 64101',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1581092160562-40aa924e5c5c?w=800'
    ),
    status: 'SOLD' as const,
    price: '$4,500,000',
    type: 'Processing Plant',
    beds: 0,
    baths: 0,
    sqft: '95,000 sqft',
    address: '2000 Industrial Boulevard, Cleveland, OH 44101',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1581092160562-40aa924e5c5c?w=800',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800'
    ),
    status: 'OPEN' as const,
    price: '$6,800,000',
    type: 'Heavy Manufacturing',
    beds: 0,
    baths: 0,
    sqft: '150,000 sqft',
    address: '2500 Production Avenue, Pittsburgh, PA 15201',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800'
    ),
    status: 'OPEN' as const,
    price: '$3,200,000',
    type: 'Cold Storage',
    beds: 0,
    baths: 0,
    sqft: '75,000 sqft',
    address: '1800 Freezer Street, Minneapolis, MN 55401',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images. promotional.unsplash.com/photo-1581092160562-40aa924e5c5c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$4,100,000',
    type: 'Assembly Facility',
    beds: 0,
    baths: 0,
    sqft: '88,000 sqft',
    address: '2200 Assembly Drive, Milwaukee, WI 53201',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1581092160562-40aa924e5c5c?w=800',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800'
    ),
    status: 'OPEN' as const,
    price: '$5,600,000',
    type: 'Research & Development',
    beds: 0,
    baths: 0,
    sqft: '110,000 sqft',
    address: '3000 Innovation Way, Raleigh, NC 27601',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800'
    ),
    status: 'OPEN' as const,
    price: '$3,500,000',
    type: 'Packaging Facility',
    beds: 0,
    baths: 0,
    sqft: '70,000 sqft',
    address: '1200 Package Parkway, Columbus, OH 43201',
    listedBy: 'Gehard Real Estate Group'
  },
  {
    images: createImages(
      'https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800',
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=800',
      'https://images.unsplash.com/photo-1581092160562-40aa924e5c5c?w=800'
    ),
    status: 'OPEN' as const,
    price: '$3,800,000',
    type: 'Light Manufacturing Space',
    beds: 0,
    baths: 0,
    sqft: '32,000 sqft',
    address: '1300 Production Avenue, Indianapolis, IN 46201',
    listedBy: 'Gehard Real Estate Group'
  }
]

export function Home() {
  return (
    <div className="min-h-screen" style={{ backgroundColor: '#fbfff7' }}>
      <Header />
      <Hero />
      <PropertyCarousel
        title="Curated Residential Listing"
        listingCount={356}
        viewAllText="View All Residential Listings"
        properties={residentialProperties}
      />
      <PropertyCarousel
        title="Curated Commercial Listing"
        listingCount={128}
        viewAllText="View All Commercial Listings"
        properties={commercialProperties}
      />
      <PropertyCarousel
        title="Curated Industrial Listing"
        listingCount={89}
        viewAllText="View All Industrial Listings"
        properties={industrialProperties}
      />
      <Testimonials />
      <ProfessionalNetworks />
      <ContactSection />
      <Footer />
    </div>
  )
}
