export type TransactionTab = 'orders' | 'refunds' | 'disputes'

export type OrderStatus = 'pending' | 'completed' | 'already_refunded'

export interface TransactionRow {
  id: string
  user: string
  type: string
  amount: string
  /** Display label for status pill */
  statusLabel: string
  /** Visual variant for badge */
  statusVariant:
    | 'pending'
    | 'completed'
    | 'already_refunded'
    | 'refund_purple'
    | 'refund_pink'
    | 'dispute_refund'
  /** Disputes tab: show primary Resolve button */
  showResolveDispute?: boolean
  tabs: TransactionTab[]
}

export const TRANSACTION_ROWS: TransactionRow[] = [
  {
    id: '2455675',
    user: 'John Williams',
    type: 'Listing Plan Purchase',
    amount: '$300',
    statusLabel: 'Pending',
    statusVariant: 'pending',
    tabs: ['orders', 'refunds'],
  },
  {
    id: '2455676',
    user: 'David',
    type: 'Showing Request',
    amount: '$900',
    statusLabel: 'Already Refunded',
    statusVariant: 'already_refunded',
    tabs: ['orders', 'refunds', 'disputes'],
  },
  {
    id: '2455677',
    user: 'Copper Johns',
    type: 'Donation',
    amount: '$450',
    statusLabel: 'Completed',
    statusVariant: 'completed',
    tabs: ['orders'],
  },
  {
    id: '2455678',
    user: 'John Williams',
    type: 'Refund',
    amount: '$300',
    statusLabel: 'Refund',
    statusVariant: 'refund_purple',
    tabs: ['refunds'],
  },
  {
    id: '2455679',
    user: 'David',
    type: 'Listing Plan Purchase',
    amount: '$600',
    statusLabel: 'Refund',
    statusVariant: 'dispute_refund',
    showResolveDispute: true,
    tabs: ['disputes'],
  },
  {
    id: '2455680',
    user: 'Copper Johns',
    type: 'Showing Request',
    amount: '$150',
    statusLabel: 'Already Refunded',
    statusVariant: 'already_refunded',
    tabs: ['disputes'],
  },
]

export function badgeClass(variant: TransactionRow['statusVariant']) {
  switch (variant) {
    case 'pending':
      return 'bg-[#FEF9C3] text-[#854D0E]'
    case 'completed':
      return 'bg-[#DBEAFE] text-[#1E40AF]'
    case 'already_refunded':
      return 'bg-[#DCFCE7] text-[#166534]'
    case 'refund_purple':
      return 'bg-[#EDE9FE] text-[#5B21B6]'
    case 'refund_pink':
    case 'dispute_refund':
      return 'bg-[#FCE7F3] text-[#9D174D]'
    default:
      return 'bg-[#F3F4F6] text-[#374151]'
  }
}
