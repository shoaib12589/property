import { useMemo, useState } from 'react'
import { Building2, Filter, Pencil, Plus, Search, Trash2, X } from 'lucide-react'
import { adminInput, adminLabelCaps, adminModalBackdrop } from '../../lib/adminUi'
import {
  INITIAL_LISTING_PLANS,
  MAX_LISTING_OPTIONS,
  type ListingPlanRow,
} from '../../data/settingsPageMock'
import { FIGMA_BRONZE, FIGMA_BRONZE_HOVER, FIGMA_SHELL } from './theme'
import { SettingsToggle } from './Toggle'

type Props = { onSave: () => void }

function formatPrice(n: number) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
}

export function ListingPlansTab({ onSave }: Props) {
  const [rows, setRows] = useState<ListingPlanRow[]>(() => [...INITIAL_LISTING_PLANS])
  const [q, setQ] = useState('')
  const [planModal, setPlanModal] = useState<'add' | 'edit' | null>(null)
  const [deleteId, setDeleteId] = useState<string | null>(null)

  const [form, setForm] = useState<{
    name: string
    active: boolean
    price: string
    max: number
    description: string
  }>({
    name: '',
    active: true,
    price: '',
    max: 10,
    description: '',
  })

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase()
    if (!s) return rows
    return rows.filter((r) => `${r.name} ${r.description}`.toLowerCase().includes(s))
  }, [q, rows])

  const [editingId, setEditingId] = useState<string | null>(null)

  function openAdd() {
    setEditingId(null)
    setForm({ name: '', active: true, price: '0.00', max: 10, description: '' })
    setPlanModal('add')
  }

  function openEdit(p: ListingPlanRow) {
    setEditingId(p.id)
    setForm({
      name: p.name,
      active: p.active,
      price: p.monthlyPrice.toFixed(2),
      max: p.maxListings === null ? 9999 : p.maxListings,
      description: p.description,
    })
    setPlanModal('edit')
  }

  function closePlanModal() {
    setPlanModal(null)
    setEditingId(null)
  }

  function saveAdd() {
    const price = parseFloat(form.price.replace(/[^0-9.]/g, '')) || 0
    const maxListings = form.max === 9999 ? null : form.max
    const newRow: ListingPlanRow = {
      id: `p${Date.now()}`,
      name: form.name.trim() || 'New Plan',
      description: form.description.trim() || '—',
      monthlyPrice: price,
      maxListings,
      active: form.active,
      icon: Building2,
      iconBg: 'bg-slate-100 text-slate-700',
    }
    setRows((r) => [...r, newRow])
    closePlanModal()
    onSave()
  }

  function saveEdit() {
    if (!editingId) return
    const price = parseFloat(form.price.replace(/[^0-9.]/g, '')) || 0
    setRows((r) =>
      r.map((row) =>
        row.id === editingId
          ? {
              ...row,
              name: form.name.trim() || row.name,
              description: form.description.trim() || row.description,
              monthlyPrice: price,
              maxListings: form.max === 9999 ? null : form.max,
              active: form.active,
            }
          : row,
      ),
    )
    closePlanModal()
    onSave()
  }

  function confirmDelete() {
    if (!deleteId) return
    setRows((r) => r.filter((x) => x.id !== deleteId))
    setDeleteId(null)
    onSave()
  }

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-[20px] font-bold text-[#111827]">Listing Plans</h2>
        <p className="mt-1 text-[13px] text-[#6B7280]">
          Manage application tiers, subscription protocols, and system-wide listing constraints.
        </p>
      </div>

      <div className={FIGMA_SHELL}>
        <div className="flex flex-col gap-3 border-b border-[#ECEAE6] p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5 sm:py-4">
          <h3 className="text-[15px] font-bold text-[#111827]">Active Subscription Tiers</h3>
          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px] flex-1 sm:max-w-xs">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
              <input
                className={adminInput + ' pl-9 pr-3'}
                placeholder="Search tiers…"
                value={q}
                onChange={(e) => setQ(e.target.value)}
              />
            </div>
            <button
              type="button"
              className="inline-flex h-10 items-center gap-1.5 rounded-lg border border-[#E5E7EB] bg-white px-3 text-[#6B7280] hover:bg-[#F9FAFB]"
            >
              <Filter className="h-4 w-4" />
            </button>
            <button
              type="button"
              onClick={openAdd}
              className="inline-flex h-10 items-center gap-2 rounded-lg px-4 text-[12px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: FIGMA_BRONZE }}
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              Add New Plan
            </button>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#ECEAE6] bg-[#FAFAF9] text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
                <th className="px-5 py-3">Plan name</th>
                <th className="px-5 py-3">Monthly price</th>
                <th className="px-5 py-3">Max listings</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((p) => {
                const Icon = p.icon
                return (
                  <tr key={p.id} className="border-b border-[#F3F4F6]">
                    <td className="px-5 py-4">
                      <div className="flex items-start gap-3">
                        <div
                          className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${p.iconBg}`}
                        >
                          <Icon className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="font-semibold text-[#111827]">{p.name}</p>
                          <p className="text-[12px] text-[#6B7280]">{p.description}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4 font-medium text-[#111827]">{formatPrice(p.monthlyPrice)}</td>
                    <td className="px-5 py-4 text-[#374151]">
                      {p.maxListings === null ? '∞ Unlimited' : `${p.maxListings} units`}
                    </td>
                    <td className="px-5 py-4">
                      <span
                        className={`rounded-full px-3 py-1 text-[11px] font-semibold ${
                          p.active ? 'bg-[#D1FAE5] text-[#065F46]' : 'bg-[#F3F4F6] text-[#6B7280]'
                        }`}
                      >
                        {p.active ? 'Active' : 'Inactive'}
                      </span>
                    </td>
                    <td className="px-5 py-4 text-right">
                      <div className="inline-flex justify-end gap-1">
                        <button
                          type="button"
                          className="rounded-lg p-2 text-[#6B7280] hover:bg-[#F3F4F6]"
                          onClick={() => openEdit(p)}
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="rounded-lg p-2 text-red-500 hover:bg-red-50"
                          onClick={() => setDeleteId(p.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>

      {planModal ? (
        <div className={adminModalBackdrop} onClick={closePlanModal} role="presentation">
          <div
            className="w-full max-w-lg rounded-2xl border border-[#E5E7EB] bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mb-5 flex items-start justify-between">
              <div>
                <h2 className="text-[20px] font-bold text-[#111827]">
                  {planModal === 'add' ? 'Add New Plan' : 'Edit Subscription Plan'}
                </h2>
                <p className="mt-1 text-[13px] text-[#6B7280]">
                  {planModal === 'add'
                    ? 'Configure a new architectural subscription tier.'
                    : 'Update parameters for the premium portfolio tier.'}
                </p>
              </div>
              <button
                type="button"
                className="rounded-lg p-1 text-[#6B7280] hover:bg-[#F3F4F6]"
                onClick={closePlanModal}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="sm:col-span-1">
                      <label className={adminLabelCaps}>Plan name</label>
                      <input
                        className={adminInput}
                        placeholder="e.g. Platinum"
                        value={form.name}
                        onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                      />
                    </div>
                    <div className="sm:col-span-1 flex flex-col sm:items-stretch">
                      <span className={adminLabelCaps + ' mb-1'}>Visibility status</span>
                      <div className="flex h-10 items-center justify-between gap-2">
                        <span className="text-[12px] text-[#9CA3AF]">Inactive</span>
                        <SettingsToggle
                          checked={form.active}
                          onChange={(v) => setForm((f) => ({ ...f, active: v }))}
                        />
                        <span className="text-[12px] font-medium text-[#111827]">Active</span>
                      </div>
                    </div>
                    <div>
                      <label className={adminLabelCaps}>Monthly price ($)</label>
                      <input
                        className={adminInput}
                        placeholder="$ 0.00"
                        value={form.price}
                        onChange={(e) => setForm((f) => ({ ...f, price: e.target.value }))}
                      />
                    </div>
                    <div>
                      <label className={adminLabelCaps}>Max listings</label>
                      <select
                        className={adminInput}
                        value={form.max === 9999 ? 9999 : form.max}
                        onChange={(e) => {
                          setForm((f) => ({ ...f, max: Number(e.target.value) }))
                        }}
                      >
                        {MAX_LISTING_OPTIONS.map((n) => (
                          <option key={n} value={n}>
                            {n}
                          </option>
                        ))}
                        <option value={9999}>Unlimited</option>
                      </select>
                    </div>
                    <div className="sm:col-span-2">
                      <label className={adminLabelCaps}>Plan description</label>
                      <textarea
                        className={adminInput + ' min-h-[100px] resize-y'}
                        rows={3}
                        placeholder="Detail the benefits and specific limits of this tier…"
                        value={form.description}
                        onChange={(e) => setForm((f) => ({ ...f, description: e.target.value }))}
                      />
                    </div>
                  </div>
            <div className="mt-8 flex justify-end gap-3">
              <button type="button" className="text-[13px] font-medium text-[#111827]" onClick={closePlanModal}>
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white"
                style={{ backgroundColor: FIGMA_BRONZE }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = FIGMA_BRONZE
                }}
                onClick={planModal === 'add' ? saveAdd : saveEdit}
              >
                {planModal === 'add' ? 'Create Plan' : 'Save changes'}
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {deleteId ? (
        <div className={adminModalBackdrop} onClick={() => setDeleteId(null)} role="presentation">
          <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <p className="font-semibold text-[#111827]">Delete this plan?</p>
            <p className="mt-2 text-[13px] text-[#6B7280]">This action cannot be undone in this demo.</p>
            <div className="mt-4 flex justify-center gap-2">
              <button type="button" className="h-9 rounded-md border border-[#D1D5DB] px-4" onClick={() => setDeleteId(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="h-9 rounded-md bg-red-600 px-4 text-white"
                onClick={confirmDelete}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  )
}
