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
/admin/login
/admin/registration
/admin/forgot-password
/admin/otp-verification
```

## Dashboard shell (placeholder pages)

These render the main **Dashboard** layout until a dedicated page exists:

```
/admin/dashboard
/admin/reports-analytics
/admin/content-management
/admin/system-management
/admin/partnerships-donations
/admin/charts-insights
/admin/messages
/admin/registration-enrollment
/admin/settings
```

## Listings Management

```
/admin/listings-management
/admin/listings-management/property/:listingId
/admin/listings-management/property/:listingId/edit
```

## Transactions

```
/admin/transactions
/admin/transactions/:transactionId
/admin/transactions/:transactionId/refund
/admin/transactions/dispute/:transactionId
/admin/transactions/dispute/:transactionId/extended
```

## Revenue Management

```
/admin/revenue-management
```

---

Route definitions: `src/admin/AdminRoutes.tsx` · sidebar labels: `src/admin/components/AdminSidebar.tsx`
