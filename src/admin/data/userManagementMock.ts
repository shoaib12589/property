export type UserRole = 'Broker' | 'Agent' | 'Customer'
export type UserStatus = 'Active' | 'Suspended' | 'Blocked'

export type ActivityItem = {
  kind: 'login' | 'edit'
  title: string
  detail: string
  when: string
}

export type UserRow = {
  id: string
  name: string
  email: string
  role: UserRole
  /** Shown in profile modal, e.g. "Broker - Luxury Residential" */
  roleDetail: string
  lastLogin: string
  status: UserStatus
  avatarUrl: string
  memberSince: string
  lastActivityRel: string
  internalNote: string
  activities: ActivityItem[]
}

const avatars = [
  'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&q=80',
  'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=160&q=80',
  'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=160&q=80',
  'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=160&q=80',
  'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=160&q=80',
  'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=160&q=80',
  'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=160&q=80',
  'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&q=80',
]

export const INITIAL_USERS: UserRow[] = [
  {
    id: 'u1',
    name: 'Alexander Sterling',
    email: 'a.sterling@curatedestate.com',
    role: 'Broker',
    roleDetail: 'Broker - Luxury Residential',
    lastLogin: '2 hours ago',
    status: 'Active',
    avatarUrl: avatars[0],
    memberSince: 'January 12, 2021',
    lastActivityRel: '2 hours ago',
    internalNote:
      'Account flagged for multiple failed login attempts on Oct 24. Suspended for security review by Admin.',
    activities: [
      {
        kind: 'login',
        title: 'Successful Login',
        detail: 'From Chrome on MacOS · IP: 192.168.1.45',
        when: '2 hours ago',
      },
      {
        kind: 'edit',
        title: 'Modified Property #8821',
        detail: 'Changed listing price to $4,200,000',
        when: '5 hours ago',
      },
    ],
  },
  {
    id: 'u2',
    name: 'Sarah Mitchell',
    email: 's.mitchell@curatedestate.com',
    role: 'Agent',
    roleDetail: 'Agent - Commercial',
    lastLogin: '5 hours ago',
    status: 'Active',
    avatarUrl: avatars[1],
    memberSince: 'March 3, 2022',
    lastActivityRel: '5 hours ago',
    internalNote: '',
    activities: [
      { kind: 'login', title: 'Successful Login', detail: 'From Safari on iOS · IP: 10.0.0.12', when: '5 hours ago' },
    ],
  },
  {
    id: 'u3',
    name: 'James Chen',
    email: 'j.chen@email.com',
    role: 'Customer',
    roleDetail: 'Customer',
    lastLogin: '12 hours ago',
    status: 'Suspended',
    avatarUrl: avatars[2],
    memberSince: 'June 18, 2023',
    lastActivityRel: '12 hours ago',
    internalNote: 'Payment dispute — follow up with billing.',
    activities: [
      { kind: 'login', title: 'Successful Login', detail: 'From Edge on Windows · IP: 192.168.0.88', when: '12 hours ago' },
    ],
  },
  {
    id: 'u4',
    name: 'Emily Rodriguez',
    email: 'e.rodriguez@curatedestate.com',
    role: 'Agent',
    roleDetail: 'Agent - Residential',
    lastLogin: '1 day ago',
    status: 'Blocked',
    avatarUrl: avatars[3],
    memberSince: 'November 2, 2020',
    lastActivityRel: '1 day ago',
    internalNote: 'Terms violation — permanent block approved.',
    activities: [
      { kind: 'edit', title: 'Updated profile', detail: 'Changed phone number', when: '1 day ago' },
    ],
  },
  {
    id: 'u5',
    name: 'Michael Brooks',
    email: 'm.brooks@curatedestate.com',
    role: 'Broker',
    roleDetail: 'Broker - Development',
    lastLogin: '3 hours ago',
    status: 'Active',
    avatarUrl: avatars[4],
    memberSince: 'February 9, 2019',
    lastActivityRel: '3 hours ago',
    internalNote: '',
    activities: [
      { kind: 'login', title: 'Successful Login', detail: 'From Chrome on MacOS · IP: 192.168.1.2', when: '3 hours ago' },
    ],
  },
  {
    id: 'u6',
    name: 'Olivia Park',
    email: 'o.park@curatedestate.com',
    role: 'Customer',
    roleDetail: 'Customer',
    lastLogin: '6 hours ago',
    status: 'Active',
    avatarUrl: avatars[5],
    memberSince: 'August 14, 2024',
    lastActivityRel: '6 hours ago',
    internalNote: '',
    activities: [{ kind: 'login', title: 'Successful Login', detail: 'From Firefox · IP: 172.16.0.4', when: '6 hours ago' }],
  },
  {
    id: 'u7',
    name: 'David Okonkwo',
    email: 'd.okonkwo@curatedestate.com',
    role: 'Agent',
    roleDetail: 'Agent - Luxury Residential',
    lastLogin: '8 hours ago',
    status: 'Suspended',
    avatarUrl: avatars[6],
    memberSince: 'May 22, 2021',
    lastActivityRel: '8 hours ago',
    internalNote: 'Awaiting ID verification.',
    activities: [],
  },
  {
    id: 'u8',
    name: 'Priya Sharma',
    email: 'p.sharma@email.com',
    role: 'Customer',
    roleDetail: 'Customer',
    lastLogin: '2 days ago',
    status: 'Active',
    avatarUrl: avatars[7],
    memberSince: 'January 5, 2025',
    lastActivityRel: '2 days ago',
    internalNote: '',
    activities: [],
  },
]
