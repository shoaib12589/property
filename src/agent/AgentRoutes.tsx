import { Routes, Route } from 'react-router-dom'
import { Registration } from './pages/Registration'
import { Login } from './pages/Login'
import { ForgotPassword } from './pages/ForgotPassword'
import { ForgotPasswordOTP } from './pages/ForgotPasswordOTP'
import { Dashboard } from './pages/Dashboard'
import { ActiveListing } from './pages/ActiveListing'
import { ManageProfile } from './pages/ManageProfile'
import { ManageListings } from './pages/ManageListings'
import { ManageListingDetail } from './pages/ManageListingDetail'
import { ManageListingEdit } from './pages/ManageListingEdit'
import { ManageListingsRequest } from './pages/ManageListingsRequest'
import { Settings } from './pages/Settings'
import { Alerts } from './pages/Alerts'
import { Messages } from './pages/Messages'

export function AgentRoutes() {
  return (
    <Routes>
      <Route path="registration" element={<Registration />} />
      <Route path="login" element={<Login />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="active-listing" element={<ActiveListing />} />
      <Route path="manage-profile" element={<ManageProfile />} />
      <Route path="manage-listings" element={<ManageListings />} />
      <Route path="manage-listings/:id" element={<ManageListingDetail />} />
      <Route path="manage-listings/:id/edit" element={<ManageListingEdit />} />
      <Route path="manage-listings-request" element={<ManageListingsRequest />} />
      <Route path="settings" element={<Settings />} />
      <Route path="alerts" element={<Alerts />} />
      <Route path="messages" element={<Messages />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="forgot-password-otp" element={<ForgotPasswordOTP />} />
      <Route path="" element={<Registration />} />
    </Routes>
  )
}

