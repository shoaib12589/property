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
import { RevenueDetails } from './pages/RevenueDetails'
import { RevenueDetailRecord } from './pages/RevenueDetailRecord'
import { RevenueReports } from './pages/RevenueReports'
import { ReportsAnalytics } from './pages/ReportsAnalytics'
import { ContentManagement } from './pages/ContentManagement'
import { SystemManagement } from './pages/SystemManagement'
import { PartnersDonations } from './pages/PartnersDonations'
import { RegistrationEnrollment } from './pages/RegistrationEnrollment'
import { UserManagement } from './pages/UserManagement'
import { Settings } from './pages/Settings'
import { Messages } from './pages/Messages'

export function AdminRoutes() {
  const dashboardSlugs = ADMIN_NAV_SLUGS.filter(
    ({ slug }) =>
      slug !== 'listings-management' &&
      slug !== 'transactions' &&
      slug !== 'revenue-management' &&
      slug !== 'reports-analytics' &&
      slug !== 'content-management' &&
      slug !== 'system-management' &&
      slug !== 'partnerships-donations' &&
      slug !== 'registration-enrollment' &&
      slug !== 'user-management' &&
      slug !== 'settings' &&
      slug !== 'messages'
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
      <Route path="revenue-management/details/:revenueId" element={<RevenueDetailRecord />} />
      <Route path="revenue-management/details" element={<RevenueDetails />} />
      <Route path="revenue-management/reports" element={<RevenueReports />} />
      <Route path="revenue-management" element={<RevenueManagement />} />
      <Route path="reports-analytics" element={<ReportsAnalytics />} />
      <Route path="content-management" element={<ContentManagement />} />
      <Route path="system-management" element={<SystemManagement />} />
      <Route path="partnerships-donations" element={<PartnersDonations />} />
      <Route path="registration-enrollment" element={<RegistrationEnrollment />} />
      <Route path="user-management" element={<UserManagement />} />
      <Route path="settings" element={<Settings />} />
      <Route path="messages" element={<Messages />} />
      {dashboardSlugs.map(({ slug }) => (
        <Route key={slug} path={slug} element={<Dashboard />} />
      ))}
      <Route path="" element={<Navigate to="login" replace />} />
      <Route path="*" element={<Navigate to="/admin/login" replace />} />
    </Routes>
  )
}
