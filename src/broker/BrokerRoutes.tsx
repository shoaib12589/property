import { Route, Routes } from 'react-router-dom'
import { Registration } from './pages/Registration'
import { Login } from './pages/Login'
import { ForgotPassword } from './pages/ForgotPassword'
import { OTPVerification } from './pages/OTPVerification'
import { Dashboard } from './pages/Dashboard'
import { TotalListing } from './pages/TotalListing'
import { ManageListings } from './pages/ManageListings'
import { TotalShowingRequests } from './pages/TotalShowingRequests'
import { ManageListingRequests } from './pages/ManageListingRequests'
import { ManageListingDetail } from './pages/ManageListingDetail'
import { ManageListingEdit } from './pages/ManageListingEdit'
import { RenewProperty } from './pages/RenewProperty'
import { AgentsManagement } from './pages/AgentsManagement'
import { AssignListings } from './pages/AssignListings'
import { AddAgent } from './pages/AddAgent'
import { AgentPerformance } from './pages/AgentPerformance'
import { AgentDetail } from './pages/AgentDetail'
import { ManageCalendars } from './pages/ManageCalendars'
import { ManageProfile } from './pages/ManageProfile'
import { Messages } from './pages/Messages'
import { Settings } from './pages/Settings'

export function BrokerRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="otp-verification" element={<OTPVerification />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="total-listing" element={<TotalListing />} />
      <Route path="manage-listings/edit/:listingId" element={<ManageListingEdit />} />
      <Route path="manage-listings/renew/:listingId" element={<RenewProperty />} />
      <Route path="manage-listings/:listingId" element={<ManageListingDetail />} />
      <Route path="manage-listings" element={<ManageListings />} />
      <Route path="manage-listings-request" element={<ManageListingRequests />} />
      <Route path="total-showing-requests" element={<TotalShowingRequests />} />
      <Route path="agents-management/add-agent" element={<AddAgent />} />
      <Route path="agents-management/assign-listings" element={<AssignListings />} />
      <Route path="agents-management/performance/:agentId" element={<AgentPerformance />} />
      <Route path="agents-management/agent/:agentId" element={<AgentDetail />} />
      <Route path="agents-management" element={<AgentsManagement />} />
      <Route path="manage-calendars" element={<ManageCalendars />} />
      <Route path="manage-profile" element={<ManageProfile />} />
      <Route path="messages" element={<Messages />} />
      <Route path="settings" element={<Settings />} />
      <Route path="registration" element={<Registration />} />
      <Route path="" element={<Registration />} />
    </Routes>
  )
}

