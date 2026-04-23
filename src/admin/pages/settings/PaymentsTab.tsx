import { useState } from 'react'
import {
  BarChart3,
  Building2,
  CreditCard,
  Landmark,
  Pencil,
  Plus,
  Smartphone,
  Trash2,
  Wallet,
} from 'lucide-react'
import { adminInput, adminLabelCaps } from '../../lib/adminUi'
import { PAYMENT_METHOD_ROWS } from '../../data/settingsPageMock'
import { CURRENCY_OPTIONS } from '../../data/adminSettingsDefaults'
import { FIGMA_BRONZE, FIGMA_BRONZE_HOVER, FIGMA_SHELL } from './theme'
import { SettingsToggle } from './Toggle'

type Props = { onSave: () => void }

const bankRows = [
  { id: 'b1', name: 'Charles Schwab Banking', mask: '**** 8821', on: true },
  { id: 'b2', name: 'Chase Banking', mask: '**** 8615', on: false },
]

function MethodIcon({ id }: { id: string }) {
  if (id === 'm1') return <CreditCard className="h-5 w-5" />
  if (id === 'm2') return <Landmark className="h-5 w-5" />
  if (id === 'm3') return <Smartphone className="h-5 w-5" />
  return <Wallet className="h-5 w-5" />
}

export function PaymentsTab({ onSave }: Props) {
  const [enable, setEnable] = useState(true)
  const [currency, setCurrency] = useState<string>('USD ($)')
  const [tax, setTax] = useState('12.50')
  const [autoRefunds, setAutoRefunds] = useState(true)
  const [methods, setMethods] = useState(PAYMENT_METHOD_ROWS)
  const [bankOn, setBankOn] = useState<Record<string, boolean>>({ b1: true, b2: false })
  const [plaidOn, setPlaidOn] = useState(true)

  function updateMethod(id: string, on: boolean) {
    setMethods((m) => m.map((x) => (x.id === id ? { ...x, on } : x)))
  }

  return (
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="space-y-5">
        <div>
          <h2 className="text-[20px] font-bold text-[#111827]">Payment Gateway</h2>
          <p className="mt-1 text-[13px] text-[#6B7280]">Configure your platform preferences and financial parameters.</p>
        </div>

        <div className={FIGMA_SHELL + ' p-0 overflow-hidden'}>
          <div className="flex items-center justify-between gap-4 border-b border-[#ECEAE6] bg-[#F8F9FA] px-4 py-3 sm:px-5">
            <div className="flex items-center gap-2">
              <SettingsToggle checked={enable} onChange={setEnable} />
              <span className="text-[14px] font-medium text-[#374151]">Enable online payments</span>
            </div>
          </div>
          <div className="space-y-4 p-5">
            <div>
              <label className={adminLabelCaps}>Default currency</label>
              <select
                className={adminInput}
                value={currency}
                disabled={!enable}
                onChange={(e) => setCurrency(e.target.value)}
              >
                {CURRENCY_OPTIONS.map((c) => (
                  <option key={c} value={c}>
                    {c === 'USD ($)' ? 'USD — US Dollar' : c}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className={adminLabelCaps} htmlFor="taxp">
                Tax percentage (%)
              </label>
              <div className="relative">
                <input
                  id="taxp"
                  className={adminInput + ' pr-8'}
                  value={tax}
                  disabled={!enable}
                  onChange={(e) => setTax(e.target.value)}
                />
                <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-[#9CA3AF]">%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-[14px] text-[#374151]">Automatic refunds</span>
              <SettingsToggle checked={autoRefunds} onChange={setAutoRefunds} disabled={!enable} />
            </div>
            <div className="flex justify-end">
              <button
                type="button"
                onClick={() => {
                  onSave()
                }}
                className="rounded-lg px-4 py-2 text-[13px] font-semibold text-white"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                }}
              >
                Update transactions
              </button>
            </div>
          </div>
        </div>

        <div className={FIGMA_SHELL + ' p-5'}>
          <div className="mb-4 flex items-center justify-between">
            <h3 className="text-[16px] font-bold text-[#111827]">Payment methods</h3>
            <span className="rounded-full bg-[#F3F4F6] px-2.5 py-0.5 text-[11px] font-bold text-[#6B7280]">Gateways active</span>
          </div>
          <ul className="space-y-3">
            {methods.map((m) => (
              <li
                key={m.id}
                className="flex flex-col gap-3 rounded-xl border border-[#ECEAE6] p-3 sm:flex-row sm:items-center sm:justify-between"
              >
                <div className="flex min-w-0 items-start gap-3">
                  <div className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6] text-[#4B5563]">
                    <MethodIcon id={m.id} />
                  </div>
                  <div className="min-w-0">
                    <p className="text-[14px] font-semibold text-[#111827]">{m.title}</p>
                    <p className="text-[12px] text-[#6B7280]">{m.subtitle}</p>
                    {m.manageLabel === 'CONNECT' ? (
                      <button
                        type="button"
                        className="mt-1 text-[12px] font-bold text-[#16A34A] underline"
                      >
                        {m.manageLabel}
                      </button>
                    ) : (
                      <button type="button" className="mt-1 text-[12px] font-bold text-[#6B7280] underline">
                        {m.manageLabel}
                      </button>
                    )}
                  </div>
                </div>
                <SettingsToggle checked={m.on} onChange={(v) => updateMethod(m.id, v)} />
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="space-y-5">
        <div className={FIGMA_SHELL + ' p-5'}>
          <div className="mb-2 flex items-center gap-2">
            <BarChart3 className="h-5 w-5 text-[#6B7280]" />
            <h3 className="text-[16px] font-bold text-[#111827]">Platform financial health</h3>
          </div>
          <p className="text-[11px] font-bold uppercase tracking-wide text-[#9CA3AF]">Total transaction volume ($)</p>
          <p className="mt-1 text-[28px] font-bold text-[#111827]">$42,890,500.00</p>
          <p className="mt-1 text-[13px] font-semibold text-[#16A34A]">↑ +14.2% from last month</p>
          <div className="mt-4 flex flex-wrap gap-2">
            <button
              type="button"
              className="rounded-lg px-4 py-2.5 text-[12px] font-bold text-white"
              style={{ backgroundColor: FIGMA_BRONZE }}
            >
              View full financial audit
            </button>
            <button type="button" className="rounded-lg border border-[#D1D5DB] bg-white px-4 py-2.5 text-[12px] font-bold text-[#374151]">
              Export global ledger (CSV)
            </button>
          </div>
        </div>

        <div className={FIGMA_SHELL + ' p-0'}>
          <div className="flex items-center justify-between border-b border-[#ECEAE6] p-4">
            <div className="flex items-center gap-2">
              <Building2 className="h-5 w-5 text-[#6B7280]" />
              <h3 className="text-[16px] font-bold text-[#111827]">Direct bank connected</h3>
            </div>
            <SettingsToggle checked={plaidOn} onChange={setPlaidOn} />
          </div>
          <div className="space-y-0 divide-y divide-[#F3F4F6] p-2">
            {bankRows.map((b) => (
              <div key={b.id} className="flex flex-col gap-2 p-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-semibold text-[#111827]">{b.name}</p>
                  <p className="text-[12px] text-[#6B7280]">Primary account — {b.mask}</p>
                </div>
                <div className="flex items-center gap-1">
                  <button type="button" className="rounded-lg p-2 text-[#6B7280] hover:bg-[#F3F4F6]">
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button type="button" className="rounded-lg p-2 text-red-500 hover:bg-red-50">
                    <Trash2 className="h-4 w-4" />
                  </button>
                  <SettingsToggle
                    checked={bankOn[b.id] ?? false}
                    onChange={(v) => setBankOn((o) => ({ ...o, [b.id]: v }))}
                  />
                </div>
              </div>
            ))}
            <button
              type="button"
              className="m-2 flex w-[calc(100%-1rem)] items-center justify-center gap-2 rounded-xl border-2 border-dashed border-[#D1D5DB] py-3 text-[13px] font-semibold text-[#6B7280] hover:border-[#A89677] hover:text-[#A89677]"
            >
              <Plus className="h-4 w-4" /> Add secondary payout account
            </button>
          </div>
          <p className="border-t border-[#ECEAE6] p-4 text-[11px] leading-relaxed text-[#9CA3AF]">
            Important note: You can connect multiple banks; the system only allows one bank to be active for payments.
          </p>
        </div>
      </div>
    </div>
  )
}
