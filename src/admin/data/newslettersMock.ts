export type OpenRateQuality = 'good' | 'mid' | 'low'

export type NewsletterCampaign = {
  id: string
  name: string
  subtitle: string
  recipients: number
  openRate: number
  openRateQuality: OpenRateQuality
  ctr: number
  active: boolean
}

export type DispatchLog = {
  id: string
  time: string
  tone: 'green' | 'bronze' | 'gray'
  message: string
}

export const NEWSLETTER_METRICS = {
  subscribers: { value: 14_282, delta: 4.2, positive: true, barPct: 78 },
  dailySent: { value: 2_854, delta: 0.8, positive: false, barPct: 52 },
  openRate: { value: 48.2, delta: 12.4, positive: true, barPct: 48 },
} as const

export const INITIAL_CAMPAIGNS: NewsletterCampaign[] = [
  {
    id: 'c1',
    name: 'The Monthly Estate Curated',
    subtitle: 'Editorial digest of global properties',
    recipients: 8_450,
    openRate: 52.4,
    openRateQuality: 'good',
    ctr: 18.2,
    active: true,
  },
  {
    id: 'c2',
    name: 'Investor Brief: European Markets',
    subtitle: 'Market analysis for portfolio holders',
    recipients: 3_120,
    openRate: 41.8,
    openRateQuality: 'mid',
    ctr: 12.5,
    active: true,
  },
  {
    id: 'c3',
    name: 'Weekend Lifestyle & Decor',
    subtitle: 'Interior design and luxury living',
    recipients: 2_712,
    openRate: 29.1,
    openRateQuality: 'low',
    ctr: 6.4,
    active: false,
  },
]

export const INITIAL_DISPATCH_LOG: DispatchLog[] = [
  {
    id: 'l1',
    time: '09:42 AM',
    tone: 'green',
    message: 'Price Drop Alert dispatched to 14 active leads for Property #8821',
  },
  {
    id: 'l2',
    time: '08:15 AM',
    tone: 'bronze',
    message: "Scheduled 'Investor Brief' Newsletter successfully delivered to 3,120 recipients",
  },
  {
    id: 'l3',
    time: '07:00 AM',
    tone: 'gray',
    message: "Automated weekly digest: 'New in Geneva' sent to 84 matching profiles",
  },
]

export const AUDIENCE_OPTIONS = ['All Users', 'Newsletter Subscribers', 'Premium Clients', 'Agents Only'] as const

export const TRIGGER_OPTIONS_NEW = [
  'Select an automation trigger',
  'On signup',
  'Monthly — Day 1',
  'Listing published',
  'Price change',
] as const

export const TRIGGER_OPTIONS_EDIT = [
  'Monthly — Day 1',
  'On signup',
  'Weekly — Monday',
  'Manual send only',
] as const

export const DEFAULT_NEW_HTML = `<table width="100%" cellpadding="0">
  <tr>
    <td>
      <h1 style="color:#715c39;">The Estate Collection</h1>
      <p>Dear {{client_name}}, discover curated opportunities tailored to your portfolio.</p>
    </td>
  </tr>
</table>`

export const DEFAULT_EDIT_HTML = `<div style="max-width:600px;margin:0 auto;font-family:'Inter',sans-serif;">
  <h1 style="color:#715c39;">Monthly Market Digest</h1>
  <p>Hello {{user_name}}, here is your exclusive update for {{month}}.</p>
  <section class="market-summary" style="margin:24px 0;">
    <p>European corridors continue to show resilient liquidity across prime postcodes.</p>
  </section>
  <div style="border-top:1px solid #E5E7EB;padding-top:16px;font-size:12px;color:#6B7280;">
    The Curated Estate — Confidential
  </div>
</div>`
