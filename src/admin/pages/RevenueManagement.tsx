import { AdminLayout } from '../components/AdminLayout'

const ACCENT = '#B89F7C'

const cards = [
  { label: 'Total Revenue', value: '124', pct: 80 },
  { label: 'Monthly Revenue', value: '124', pct: 60 },
  { label: 'Pending Payments', value: '$123', pct: 75 },
  { label: 'Refunded Amount', value: '$124', pct: 70 },
] as const

export function RevenueManagement() {
  return (
    <AdminLayout title="Revenue Management">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {cards.map((c) => (
          <div
            key={c.label}
            className="flex min-h-[120px] flex-col rounded-[10px] border border-[#E5E7EB] bg-white p-4 shadow-sm"
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[14px] font-semibold leading-snug text-[#111827]">{c.label}</p>
              <span className="shrink-0 text-[18px] font-bold tabular-nums text-[#111827] sm:text-[20px]">{c.value}</span>
            </div>
            <div className="mt-auto pt-6">
              <div className="h-1.5 w-full overflow-hidden rounded-full bg-[#F3F4F6]">
                <div
                  className="h-full rounded-full transition-all"
                  style={{ width: `${c.pct}%`, backgroundColor: ACCENT }}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </AdminLayout>
  )
}
