import { Routes, Route } from 'react-router-dom'
import { Login } from '@customer/pages/Login'
import { Register } from '@customer/pages/Register'
import { ForgotPassword } from '@customer/pages/ForgotPassword'
import { OTPVerification } from '@customer/pages/OTPVerification'
import { Dashboard } from '@customer/pages/Dashboard'
import { MyProfile } from '@customer/pages/MyProfile'
import { PaymentMethods } from '@customer/pages/PaymentMethods'
import { MyListings } from '@customer/pages/MyListings'
import { CreateListing } from '@customer/pages/CreateListing'
import { OrdersHistory } from '@customer/pages/OrdersHistory'
import { Showings } from '@customer/pages/Showings'
import { SavedSearches } from '@customer/pages/SavedSearches'
import { FavoriteProperties } from '@customer/pages/FavoriteProperties'
import { PropertyDetail } from '@customer/pages/PropertyDetail'
import { Alerts } from '@customer/pages/Alerts'
import { Messages } from '@customer/pages/Messages'
import { Documents } from '@customer/pages/Documents'
import { Support } from '@customer/pages/Support'


/**
 * Customer area routes. All customer pages live under src/customer/
 * and are served at URLs: http://localhost:5173/user/...
 *
 * Add new customer pages here and create the page in src/customer/pages/
 */
export function CustomerRoutes() {
  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="register" element={<Register />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="otp-verification" element={<OTPVerification />} />
      <Route path="dashboard" element={<Dashboard />} />
      <Route path="profile" element={<MyProfile />} />
      <Route path="payment-methods" element={<PaymentMethods />} />
      <Route path="listings" element={<MyListings />} />
      <Route path="listings/create" element={<CreateListing />} />
      <Route path="orders" element={<OrdersHistory />} />
      <Route path="showings" element={<Showings />} />
      <Route path="saved-searches" element={<SavedSearches />} />
      <Route path="favorites" element={<FavoriteProperties />} />
      <Route path="property/:id" element={<PropertyDetail />} />
      <Route path="alerts" element={<Alerts />} />
      <Route path="messages" element={<Messages />} />
      <Route path="documents" element={<Documents />} />
      <Route path="support" element={<Support />} />
    </Routes>
  )
}
