import { Routes, Route, Navigate } from 'react-router-dom'
import { ADMIN_NAV_SLUGS } from './components/AdminSidebar'
import { Login } from './pages/Login'
import { Registration } from './pages/Registration'
import { ForgotPassword } from './pages/ForgotPassword'
import { OTPVerification } from './pages/OTPVerification'
import { Dashboard } from './pages/Dashboard'
import { ManageListings } from './pages/ManageListings'
import { PropertyDetails } from './pages/PropertyDetails'
import { Transactions } from './pages/Transactions'
import { TransactionDetail } from './pages/TransactionDetail'
import { ProcessRefund } from './pages/ProcessRefund'
import { DisputeDetails } from './pages/DisputeDetails'
import { DisputeExtended } from './pages/DisputeExtended'
import { RevenueManagement } from './pages/RevenueManagement'

export function AdminRoutes() {
  const dashboardSlugs = ADMIN_NAV_SLUGS.filter(
    ({ slug }) => slug !== 'listings-management' && slug !== 'transactions' && slug !== 'revenue-management'
  )

  return (
    <Routes>
      <Route path="login" element={<Login />} />
      <Route path="registration" element={<Registration />} />
      <Route path="forgot-password" element={<ForgotPassword />} />
      <Route path="otp-verification" element={<OTPVerification />} />
      <Route path="listings-management/property/:listingId/edit" element={<PropertyDetails />} />
      <Route path="listings-management/property/:listingId" element={<PropertyDetails />} />
      <Route path="listings-management" element={<ManageListings />} />
      <Route path="transactions/dispute/:transactionId/extended" element={<DisputeExtended />} />
      <Route path="transactions/dispute/:transactionId" element={<DisputeDetails />} />
      <Route path="transactions/:transactionId/refund" element={<ProcessRefund />} />
      <Route path="transactions/:transactionId" element={<TransactionDetail />} />
      <Route path="transactions" element={<Transactions />} />
      <Route path="revenue-management" element={<RevenueManagement />} />
      {dashboardSlugs.map(({ slug }) => (
        <Route key={slug} path={slug} element={<Dashboard />} />
      ))}
      <Route path="" element={<Navigate to="login" replace />} />
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  )
}
