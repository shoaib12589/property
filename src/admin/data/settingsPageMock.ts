/** Mock data for admin Settings hub (General, Notifications, Plans, Roles, Payments) */

import type { LucideIcon } from 'lucide-react'
import { Building2, CheckCircle2, FileStack, KeyRound, Mail, Star, Wallet } from 'lucide-react'

export const LANGUAGE_OPTIONS = ['English (Global)', 'English (US)', 'Español', 'Français'] as const
export const TIMEZONE_OPTIONS = ['(GMT-05:00) Eastern Time', '(GMT-08:00) Pacific Time', '(GMT+00:00) UTC'] as const

export type ListingPlanRow = {
  id: string
  name: string
  description: string
  monthlyPrice: number
  maxListings: number | null
  /** null = unlimited */
  active: boolean
  icon: LucideIcon
  iconBg: string
}

export const INITIAL_LISTING_PLANS: ListingPlanRow[] = [
  {
    id: 'p1',
    name: 'Basic',
    description: 'Essential features for individuals',
    monthlyPrice: 149,
    maxListings: 10,
    active: true,
    icon: Building2,
    iconBg: 'bg-sky-100 text-sky-700',
  },
  {
    id: 'p2',
    name: 'Premium',
    description: 'Enhanced visibility and data exports',
    monthlyPrice: 499,
    maxListings: 50,
    active: true,
    icon: Star,
    iconBg: 'bg-amber-100 text-amber-700',
  },
  {
    id: 'p3',
    name: 'Enterprise',
    description: 'Custom limits and dedicated support',
    monthlyPrice: 1299,
    maxListings: null,
    active: true,
    icon: FileStack,
    iconBg: 'bg-neutral-800 text-white',
  },
]

export const MAX_LISTING_OPTIONS = [10, 25, 50, 100] as const

export type RoleKey =
  | 'super_admin'
  | 'regional_manager'
  | 'agent_support'
  | 'broker'
  | 'agent'
  | 'customer'

export type RoleDef = {
  key: RoleKey
  label: string
  level: string
  description: string
}

export const ROLE_DEFS: RoleDef[] = [
  { key: 'super_admin', label: 'Super Admin', level: 'LEVEL 3', description: 'Unrestricted system access.' },
  { key: 'regional_manager', label: 'Regional Manager', level: 'LEVEL 2', description: 'Manage portfolio clusters.' },
  { key: 'agent_support', label: 'Agent Support', level: 'LEVEL 1', description: 'Technical and listing support.' },
  { key: 'broker', label: 'Broker', level: '', description: 'High-level sales oversight.' },
  { key: 'agent', label: 'Agent', level: '', description: 'Property listing management.' },
  { key: 'customer', label: 'Customer', level: '', description: 'Public portal access.' },
]

export type PermGroup = {
  id: string
  title: string
  description: string
  items: { id: string; label: string }[]
}

export const PERMISSION_GROUPS: PermGroup[] = [
  {
    id: 'property',
    title: 'Property Management',
    description: 'Control over the core real estate listings and architectural data.',
    items: [
      { id: 'create_listings', label: 'Create Listings' },
      { id: 'delete_listings', label: 'Delete Listings' },
      { id: 'approve_reject', label: 'Approve/Reject Listings' },
    ],
  },
  {
    id: 'financials',
    title: 'Financials',
    description: 'Access to commission tables, tax parameters, and transaction ledger.',
    items: [
      { id: 'view_commissions', label: 'View Commissions' },
      { id: 'process_payouts', label: 'Process Payouts' },
      { id: 'payment_gateway', label: 'Payment Gateway' },
    ],
  },
  {
    id: 'users',
    title: 'User Oversight',
    description: 'Management of platform accounts, password protocols, and admin hiring.',
    items: [
      { id: 'suspend_accounts', label: 'Suspend Accounts' },
      { id: 'reset_passwords', label: 'Reset Passwords' },
      { id: 'roles_permissions', label: 'Roles & Permissions' },
    ],
  },
  {
    id: 'registration',
    title: 'Registration & Enroll',
    description: 'Management of admin accounts, partners, and vendors.',
    items: [
      { id: 'vendors', label: 'Vendors' },
      { id: 'partner_enrollment', label: 'Partner Enrollment' },
      { id: 'admin_registration', label: 'Admin Registration' },
    ],
  },
]

/** roleKey -> set of perm item ids */
export const DEFAULT_PERMS_BY_ROLE: Record<RoleKey, Set<string>> = {
  super_admin: new Set(
    PERMISSION_GROUPS.flatMap((g) => g.items.map((i) => i.id)),
  ),
  regional_manager: new Set(['create_listings', 'approve_reject', 'view_commissions', 'suspend_accounts']),
  agent_support: new Set(['create_listings', 'reset_passwords', 'vendors']),
  broker: new Set(['create_listings', 'view_commissions', 'partner_enrollment']),
  agent: new Set(['create_listings']),
  customer: new Set(),
}

export type NotifTemplateRow = {
  id: string
  name: string
  icon: LucideIcon
  trigger: string
  status: 'ACTIVE' | 'DRAFTING'
  kind: 'welcome' | 'password' | 'listing' | 'payment' | 'other'
}

export const INITIAL_NOTIF_TEMPLATES: NotifTemplateRow[] = [
  { id: 't1', name: 'Welcome Message', icon: Mail, trigger: 'New Account Creation', status: 'ACTIVE', kind: 'welcome' },
  { id: 't2', name: 'Password Reset', icon: KeyRound, trigger: 'Security Request', status: 'ACTIVE', kind: 'password' },
  { id: 't3', name: 'Listing Approved', icon: CheckCircle2, trigger: 'Admin Review Completion', status: 'ACTIVE', kind: 'listing' },
  { id: 't4', name: 'Payment Received', icon: Wallet, trigger: 'Successful Transaction', status: 'DRAFTING', kind: 'payment' },
]

export const TRIGGER_EVENT_OPTIONS = [
  'New Account Creation',
  'Security Request',
  'Admin Review Completion',
  'Successful Transaction',
  'Maintenance Update',
] as const

export type PaymentMethodRow = {
  id: string
  title: string
  subtitle: string
  manageLabel?: 'MANAGE' | 'CONNECT' | 'CONFIGURE'
  on: boolean
}

export const PAYMENT_METHOD_ROWS: PaymentMethodRow[] = [
  { id: 'm1', title: 'Credit Card (Stripe)', subtitle: 'Process cards securely.', manageLabel: 'MANAGE', on: true },
  { id: 'm2', title: 'Direct Bank Connection (Plaid)', subtitle: 'Link financial institutions.', manageLabel: 'CONNECT', on: true },
  { id: 'm3', title: 'Apple Pay', subtitle: 'Wallet checkout.', manageLabel: 'CONFIGURE', on: false },
  { id: 'm4', title: 'Google Pay', subtitle: 'One-tap payments.', manageLabel: 'CONFIGURE', on: false },
]
