import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Home } from '@/pages/Home'
import { Listing } from '@/pages/Listing'
import { AboutUs } from '@/pages/AboutUs'
import { OurTeam } from '@/pages/OurTeam'
import { OurCompany } from '@/pages/OurCompany'
import { Career } from '@/pages/Career'
import { Donation } from '@/pages/Donation'
import { Packages } from '@/pages/Packages'
import { Faqs } from '@/pages/Faqs'
import { Services } from '@/pages/Services'
import { Blog } from '@/pages/Blog'
import { BlogDetails } from '@/pages/BlogDetails'
import { Investments } from '@/pages/Investments'
import { RelocationServices } from '@/pages/RelocationServices'
import { Consulting } from '@/pages/Consulting'
import { Construction } from '@/pages/Construction'
import { Selling } from '@/pages/Selling'
import { ContactUs } from '@/pages/ContactUs'
import { CustomerRoutes } from '@customer/CustomerRoutes'
import { AgentRoutes } from '../agent/AgentRoutes'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Customer area: all pages in src/customer/, URLs: /user/login, /user/register, etc. */}
        <Route path="/user/*" element={<CustomerRoutes />} />
        {/* Agent panel area */}
        <Route path="/agent/*" element={<AgentRoutes />} />

        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/our-team" element={<OurTeam />} />
        <Route path="/our-company" element={<OurCompany />} />
        <Route path="/career" element={<Career />} />
        <Route path="/donation" element={<Donation />} />
        <Route path="/packages" element={<Packages />} />
        <Route path="/faqs" element={<Faqs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/blog" element={<Blog />} />
        <Route path="/blog/:id" element={<BlogDetails />} />
        <Route path="/investments" element={<Investments />} />
        <Route path="/relocation-services" element={<RelocationServices />} />
        <Route path="/consulting" element={<Consulting />} />
        <Route path="/construction" element={<Construction />} />
        <Route path="/selling" element={<Selling />} />
        <Route path="/contact-us" element={<ContactUs />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
