/** Default copy for admin Settings — aligns with Figma / product spec */

export const WELCOME_DEFAULT = {
  subject: 'Welcome to your Curated Portfolio',
  body: `Dear {{client_name}},

It is a pleasure to welcome you to The Curated Estate. Your exclusive portfolio is now being initialized by our architectural team.

In this space, you will find a refined selection of properties tailored specifically to your aesthetic and investment requirements. We invite you to explore the dashboard and reach out to your dedicated consultant with any inquiries.

Warm regards,
The Estate Team`,
}

export const PASSWORD_RESET_DEFAULT = {
  subject: 'Secure Access: Reset Your Password at The Curated Estate',
  body: `Hello {{user_name}},

We received a request to reset your password for your account at The Curated Estate.

Click the link below to securely create a new password:
[Reset Password Link]

If you did not request this change, please ignore this email or contact support if you have concerns.`,
}

export const PAYMENT_CONFIRM_DEFAULT = {
  subject: 'Your Curated Estate Transaction is Confirmed',
  body: `Dear {{client_name}},

We are pleased to confirm that your payment of {{transaction_amount}} for the property {{property_address}} has been successfully processed.

This confirmation marks the final step in securing your acquisition within our portfolio. Your digital deed and closing documents will be available for signature in your portal within 24 hours.`,
}

export const CURRENCY_OPTIONS = [
  'USD ($)',
  'EUR (€)',
  'GBP (£)',
  'AED (د.إ)',
  'PKR (Rs)',
  'INR (₹)',
  'CAD ($)',
  'AUD ($)',
] as const

export const FREQUENCY_OPTIONS = ['Instant', 'Daily', 'Weekly'] as const

export const LISTING_APPROVED_DEFAULT = {
  subject: 'Good News: Your Listing is Now Live',
  body: `Dear {owner_name}, we are pleased to inform you that your listing {property_title} has been approved and is now live on The Curated Estate portal.`,
}
