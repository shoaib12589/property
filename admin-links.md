# Admin paths

All routes are mounted under `/admin`. Local dev assumes the Vite default origin (`http://localhost:5173`); production example matches the app host used in `links.md`.

**Local base**

```
http://localhost:5173/admin
```

**Production base (example)**

```
https://property-blond-eta.vercel.app/admin
```

## Auth & onboarding

```
https://property-blond-eta.vercel.app/admin/login
https://property-blond-eta.vercel.app/admin/registration
https://property-blond-eta.vercel.app/admin/forgot-password
https://property-blond-eta.vercel.app/admin/otp-verification
```

## Dashboard shell (placeholder pages)

These render the main **Dashboard** layout until a dedicated page exists:

```
https://property-blond-eta.vercel.app/admin/dashboard
```

## Messages

```
https://property-blond-eta.vercel.app/admin/messages
```

## Settings

```
https://property-blond-eta.vercel.app/admin/settings
```

## User Management

```
https://property-blond-eta.vercel.app/admin/user-management
```

## Reports & Analytics

```
https://property-blond-eta.vercel.app/admin/reports-analytics
```

## Content Management (CMS)

```
https://property-blond-eta.vercel.app/admin/content-management
```

## System Management

```
https://property-blond-eta.vercel.app/admin/system-management
```

## Partners & Donations

In-app title **Partners & Donations**; URL slug remains `partnerships-donations`.

```
https://property-blond-eta.vercel.app/admin/partnerships-donations
```

## Registration & Enrollment

```
https://property-blond-eta.vercel.app/admin/registration-enrollment
```

## Listings Management

```
https://property-blond-eta.vercel.app/admin/listings-management
https://property-blond-eta.vercel.app/admin/listings-management/property/:listingId
https://property-blond-eta.vercel.app/admin/listings-management/property/:listingId/edit
```

## Transactions

```
https://property-blond-eta.vercel.app/admin/transactions
https://property-blond-eta.vercel.app/admin/transactions/:transactionId
https://property-blond-eta.vercel.app/admin/transactions/:transactionId/refund
https://property-blond-eta.vercel.app/admin/transactions/dispute/:transactionId
https://property-blond-eta.vercel.app/admin/transactions/dispute/:transactionId/extended
```

## Revenue Management

```
https://property-blond-eta.vercel.app/admin/revenue-management
https://property-blond-eta.vercel.app/admin/revenue-management/reports
https://property-blond-eta.vercel.app/admin/revenue-management/details
https://property-blond-eta.vercel.app/admin/revenue-management/details/:revenueId
```

---

Route definitions: `src/admin/AdminRoutes.tsx` · sidebar labels: `src/admin/components/AdminSidebar.tsx`
