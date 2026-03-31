import { useEffect, useMemo, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import { MoreVertical } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import { TRANSACTION_ROWS, badgeClass, type TransactionTab } from '../data/transactionsMock'

const TABS: { key: TransactionTab; label: string }[] = [
  { key: 'orders', label: 'Orders' },
  { key: 'refunds', label: 'Refunds' },
  { key: 'disputes', label: 'Disputes' },
]

export function Transactions() {
  const [tab, setTab] = useState<TransactionTab>('orders')
  const [openRowMenu, setOpenRowMenu] = useState<number | null>(null)
  const rowMenuRef = useRef<HTMLDivElement>(null)

  const rows = useMemo(() => TRANSACTION_ROWS.filter((r) => r.tabs.includes(tab)), [tab])

  useEffect(() => {
    function close(e: MouseEvent) {
      if (rowMenuRef.current && !rowMenuRef.current.contains(e.target as Node)) setOpenRowMenu(null)
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  return (
    <AdminLayout title="Transactions">
      <div className="w-full min-w-0 rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm sm:p-6">
        <div className="mb-6 flex flex-wrap gap-3">
          {TABS.map(({ key, label }) => {
            const active = tab === key
            return (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={`rounded-xl border px-5 py-2.5 text-[14px] font-semibold transition ${
                  active
                    ? 'border-[#B89F7C] bg-[#FAF6F0] text-[#B89F7C]'
                    : 'border-[#E5E7EB] bg-white text-[#111827] hover:border-[#D1D5DB]'
                }`}
              >
                {label}
              </button>
            )
          })}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] border-collapse text-left text-[14px]">
            <thead>
              <tr className="border-b border-[#E5E7EB] bg-[#F9FAFB]">
                {['ID', 'User', 'Type', 'Amount', 'Status', 'Actions'].map((h) => (
                  <th key={h} className="px-3 py-3 pr-4 font-bold text-[#111827] first:pl-4">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr key={`${row.id}-${i}`} className="border-b border-[#E5E7EB] transition-colors hover:bg-[#FAFAFA]">
                  <td className="px-3 py-3 pr-4 pl-4 tabular-nums text-[#6B7280]">{row.id}</td>
                  <td className="px-3 py-3 pr-4 text-[#111827]">{row.user}</td>
                  <td className="px-3 py-3 pr-4 text-[#374151]">{row.type}</td>
                  <td className="px-3 py-3 pr-4 font-medium text-[#111827]">{row.amount}</td>
                  <td className="px-3 py-3 pr-4">
                    <span
                      className={`inline-block rounded-full px-3 py-1 text-[12px] font-medium ${badgeClass(row.statusVariant)}`}
                    >
                      {row.statusLabel}
                    </span>
                  </td>
                  <td className="px-3 py-3 pr-4">
                    <div className="flex items-center justify-end gap-2">
                      {tab === 'disputes' && row.showResolveDispute ? (
                        <Link
                          to={`/admin/transactions/dispute/${row.id}`}
                          className="shrink-0 rounded-lg bg-[#B89F7C] px-4 py-2 text-[13px] font-semibold text-white shadow-sm transition hover:opacity-95"
                        >
                          Resolve Dispute
                        </Link>
                      ) : null}
                      <div className="relative inline-flex" ref={openRowMenu === i ? rowMenuRef : undefined}>
                        <button
                          type="button"
                          aria-label="Row actions"
                          className={`flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 bg-[#F9FAFB] text-[#6B7280] transition hover:border-[#E5E7EB] hover:bg-white ${
                            openRowMenu === i ? 'border-[#B89F7C]/40 bg-white' : ''
                          }`}
                          onClick={() => setOpenRowMenu(openRowMenu === i ? null : i)}
                        >
                          <MoreVertical className="h-4 w-4" />
                        </button>
                        {openRowMenu === i ? (
                          <div className="absolute right-0 top-full z-50 mt-1 w-44 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
                            <Link
                              to={`/admin/transactions/${row.id}`}
                              className="block px-3 py-2 text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                              onClick={() => setOpenRowMenu(null)}
                            >
                              View Details
                            </Link>
                            <Link
                              to={`/admin/transactions/${row.id}/refund`}
                              className="block px-3 py-2 text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
                              onClick={() => setOpenRowMenu(null)}
                            >
                              Process Refund
                            </Link>
                            <button
                              type="button"
                              className="w-full px-3 py-2 text-left text-[13px] text-[#DC2626] hover:bg-red-50"
                              onClick={() => setOpenRowMenu(null)}
                            >
                              Delete
                            </button>
                          </div>
                        ) : null}
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 ? (
            <p className="py-8 text-center text-[14px] text-[#6B7280]">No transactions in this view.</p>
          ) : null}
        </div>
      </div>
    </AdminLayout>
  )
}
