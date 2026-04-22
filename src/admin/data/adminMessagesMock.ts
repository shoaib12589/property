/**
 * Admin Messages inbox mock — sourced from broker `Messages` for parity with product/Figma.
 * @see src/broker/pages/Messages.tsx
 */

export const ROLE_TABS = ['Customers', 'Agent', 'Admin'] as const
export type RoleTab = (typeof ROLE_TABS)[number]

export type Conversation = {
  id: string
  name: string
  time: string
  preview: string
  property: string
  unread?: number
  online?: boolean
}

export type ChatMessage = {
  id: string
  fromMe: boolean
  text: string
  time: string
}

export type RoleInboxData = {
  conversations: Omit<Conversation, 'unread'>[]
  threads: Record<string, ChatMessage[]>
  initialUnread: Record<string, number>
}

export const DATA_BY_ROLE: Record<RoleTab, RoleInboxData> = {
  Customers: {
    conversations: [
      {
        id: '1',
        name: 'Sarah Johnson',
        time: '10 min ago',
        preview: 'The showing is confirmed for tomorrow a...',
        property: 'Luxury Villa in Suburbs',
        online: true,
      },
      {
        id: '2',
        name: 'Mike Chen',
        time: '1 hour ago',
        preview: 'Thanks for the quick response on the...',
        property: 'Modern Downtown Condo',
        online: true,
      },
      {
        id: '3',
        name: 'Emma Davis',
        time: 'Yesterday',
        preview: 'Can we reschedule the viewing to Friday?',
        property: 'Beach House Paradise',
      },
      {
        id: '4',
        name: 'Tom Wilson',
        time: '2 days ago',
        preview: 'I submitted an offer through the portal.',
        property: 'Urban Studio',
      },
    ],
    threads: {
      '1': [
        { id: 'm1', fromMe: false, text: 'Hi! I wanted to confirm the showing time for the Luxury Villa.', time: '10:15 AM' },
        { id: 'm2', fromMe: true, text: 'Hello Sarah, yes — we have you down for tomorrow at 2:00 PM.', time: '10:22 AM' },
        { id: 'm3', fromMe: false, text: 'Perfect, thank you. Will the seller be present?', time: '10:28 AM' },
        { id: 'm4', fromMe: true, text: 'The seller prefers not to attend. I will meet you at the property.', time: '10:30 AM' },
      ],
      '2': [
        { id: 'm1', fromMe: false, text: 'Thanks for the quick response on the listing.', time: '9:00 AM' },
        { id: 'm2', fromMe: true, text: 'Happy to help! Let me know if you need anything else.', time: '9:05 AM' },
      ],
      '3': [{ id: 'm1', fromMe: false, text: 'Can we reschedule the viewing to Friday?', time: '4:00 PM' }],
      '4': [
        { id: 'm1', fromMe: false, text: 'I submitted an offer through the portal.', time: '11:00 AM' },
        { id: 'm2', fromMe: true, text: 'Received — I will review and get back to you shortly.', time: '11:30 AM' },
      ],
    },
    initialUnread: { '1': 2 },
  },
  Agent: {
    conversations: [
      {
        id: '1',
        name: 'James Rivera',
        time: '15 min ago',
        preview: 'Can we co-broke on the Riverside listing? Spl...',
        property: 'Co-broke · Riverside Estates',
        online: true,
      },
      {
        id: '2',
        name: 'Lisa Park',
        time: '45 min ago',
        preview: 'Referral fee structure for the downtown tower...',
        property: 'Referral · Metro Tower',
        online: true,
      },
      {
        id: '3',
        name: 'David Okonkwo',
        time: '3 hours ago',
        preview: 'MLS photos didn’t sync — can you re-push?',
        property: 'MLS sync · Oak Lane Townhome',
      },
      {
        id: '4',
        name: 'Maria Santos',
        time: 'Yesterday',
        preview: 'Buyer tour overlap at 4pm — are you free to swap?',
        property: 'Showing overlap · Garden District',
      },
    ],
    threads: {
      '1': [
        { id: 'm1', fromMe: false, text: 'Hey John — are you open to a 50/50 co-broke on Riverside Estates?', time: '2:10 PM' },
        { id: 'm2', fromMe: true, text: 'Yes, standard split works. I’ll send the agreement template.', time: '2:18 PM' },
        { id: 'm3', fromMe: false, text: 'Perfect. I’ll have my client ready for a walkthrough Thursday.', time: '2:22 PM' },
      ],
      '2': [
        { id: 'm1', fromMe: false, text: 'Quick question on the Metro Tower referral — is 25% still your floor?', time: '1:40 PM' },
        { id: 'm2', fromMe: true, text: 'For qualified leads, yes. Happy to discuss on a call.', time: '1:55 PM' },
      ],
      '3': [
        { id: 'm1', fromMe: false, text: 'Listing Oak Lane shows old photos in MLS after your update.', time: '11:05 AM' },
        { id: 'm2', fromMe: true, text: 'Thanks for flagging — I’ll refresh the media feed now.', time: '11:12 AM' },
      ],
      '4': [{ id: 'm1', fromMe: false, text: 'We both have showings at 4pm tomorrow — can one of us slide?', time: '5:30 PM' }],
    },
    initialUnread: { '1': 1, '2': 3 },
  },
  Admin: {
    conversations: [
      {
        id: '1',
        name: 'Platform Support',
        time: '20 min ago',
        preview: 'Scheduled maintenance window this Sunday 2–4 AM...',
        property: 'System notice · Gehard App',
        online: true,
      },
      {
        id: '2',
        name: 'Billing',
        time: '2 hours ago',
        preview: 'Your February invoice is ready for review.',
        property: 'Billing · Agent subscription',
      },
      {
        id: '3',
        name: 'Compliance',
        time: '1 day ago',
        preview: 'Please upload the missing ID verification doc...',
        property: 'Compliance · KYC review',
      },
      {
        id: '4',
        name: 'Product Updates',
        time: '3 days ago',
        preview: 'New lead routing rules are live in your dashboard.',
        property: 'Release notes · v2.4',
      },
    ],
    threads: {
      '1': [
        { id: 'm1', fromMe: false, text: 'Heads up: brief downtime Sunday 2–4 AM for database upgrades.', time: '9:40 AM' },
        { id: 'm2', fromMe: true, text: 'Thanks for the notice — I’ll warn my active clients.', time: '9:48 AM' },
        { id: 'm3', fromMe: false, text: 'We’ll post a banner in-app 24h before.', time: '9:50 AM' },
      ],
      '2': [
        { id: 'm1', fromMe: false, text: 'Your February invoice #INV-2041 is available in Billing.', time: '8:00 AM' },
        { id: 'm2', fromMe: true, text: 'Got it — I’ll process payment today.', time: '8:15 AM' },
      ],
      '3': [
        { id: 'm1', fromMe: false, text: 'We still need a government-issued ID to finish your profile review.', time: 'Yesterday 3:00 PM' },
      ],
      '4': [
        { id: 'm1', fromMe: false, text: 'Lead routing now supports round-robin by zip code. Check Settings.', time: 'Mon 10:00 AM' },
        { id: 'm2', fromMe: true, text: 'Nice — I’ll test with my downtown zip tonight.', time: 'Mon 10:22 AM' },
      ],
    },
    initialUnread: { '1': 1 },
  },
}

export function threadKey(role: RoleTab, id: string) {
  return `${role}:${id}` as const
}

export function buildInitialMessagesState(): Record<string, ChatMessage[]> {
  const out: Record<string, ChatMessage[]> = {}
  for (const role of ROLE_TABS) {
    const { threads } = DATA_BY_ROLE[role]
    for (const [id, msgs] of Object.entries(threads)) {
      out[threadKey(role, id)] = msgs.map((m) => ({ ...m }))
    }
  }
  return out
}

export function buildInitialUnreadByRole(): Record<RoleTab, Record<string, number>> {
  return {
    Customers: { ...DATA_BY_ROLE.Customers.initialUnread },
    Agent: { ...DATA_BY_ROLE.Agent.initialUnread },
    Admin: { ...DATA_BY_ROLE.Admin.initialUnread },
  }
}

export function buildInitialSelectedByRole(): Record<RoleTab, string> {
  return {
    Customers: DATA_BY_ROLE.Customers.conversations[0]?.id ?? '1',
    Agent: DATA_BY_ROLE.Agent.conversations[0]?.id ?? '1',
    Admin: DATA_BY_ROLE.Admin.conversations[0]?.id ?? '1',
  }
}
