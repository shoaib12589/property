import { useCallback, useEffect, useMemo, useRef, useState, type Dispatch, type RefObject, type SetStateAction } from 'react'
import {
  Briefcase,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Download,
  Eye,
  EyeOff,
  FileDown,
  Filter,
  Info,
  KeyRound,
  Link2,
  Mail,
  MapPin,
  MoreVertical,
  Pencil,
  Phone,
  Plus,
  Shield,
  ShieldCheck,
  UserPlus,
  X,
} from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import { AdminSuccessModal } from '../components/AdminSuccessModal'
import { adminInput, adminLabelCaps, adminModalBackdrop, adminModalPanelWide } from '../lib/adminUi'
import {
  ACCESS_LEVELS,
  GROWTH_BAR_HEIGHTS,
  MOCK_ADMIN_ROWS,
  REG_MAIN_TABS,
  SERVICE_CATEGORIES,
  type AdminRow,
  type PartnerRow,
  type PartnerStatus,
  type RegMainTab,
  type VendorRow,
  buildPartnerRows,
  buildVendorRows,
} from '../data/registrationEnrollmentMock'

/** Gehard Figma admin — match Partners & Donations */
const FIGMA_BRONZE = '#A89677'
const FIGMA_BRONZE_HOVER = '#978566'
const FIGMA_SHELL =
  'w-full min-w-0 overflow-hidden rounded-2xl border border-[#E6E2DB] bg-white shadow-[0_1px_3px_rgba(15,23,42,0.06),0_1px_2px_rgba(15,23,42,0.04)]'

const VENDOR_TOTAL = 1284
const VENDOR_PAGE_SIZE = 10
const VENDOR_TOTAL_PAGES = Math.ceil(VENDOR_TOTAL / VENDOR_PAGE_SIZE)
const PARTNER_TOTAL = 124
const PARTNER_PAGE_SIZE = 4

const TAB_ACTIVE =
  'rounded-lg px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm ring-1 ring-black/[0.06] transition-colors'
const TAB_INACTIVE =
  'rounded-lg px-5 py-2.5 text-[13px] font-medium text-[#4B5563] transition-colors hover:bg-[#F3F1ED] hover:text-[#111827]'

function MiniBars({ heights, className = '' }: { heights: number[]; className?: string }) {
  const max = Math.max(...heights, 1)
  return (
    <div className={`flex h-10 items-end justify-end gap-1 ${className}`}>
      {heights.map((h, i) => (
        <div
          key={i}
          className="w-2 rounded-t"
          style={{ backgroundColor: FIGMA_BRONZE, height: `${Math.max(8, (h / max) * 100)}%` }}
        />
      ))}
    </div>
  )
}

function MonthlyEnrollmentChart() {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun']
  const vals = [40, 65, 45, 80, 55, 90]
  const max = Math.max(...vals)
  return (
    <div className="rounded-[10px] border border-[#E8E4DC] bg-[#FAFAFA] p-4 sm:p-5">
      <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">Monthly enrollment</p>
      <div className="mt-3 flex h-28 items-end justify-between gap-2 border-b border-[#ECEAE6] pb-1 pl-1">
        {vals.map((v, i) => (
          <div key={months[i]} className="flex flex-1 flex-col items-center gap-1">
            <div
              className="w-full max-w-[28px] rounded-t"
              style={{ backgroundColor: FIGMA_BRONZE, height: `${(v / max) * 100}%`, minHeight: '18px' }}
            />
            <span className="text-[10px] font-medium text-[#6B7280]">{months[i]}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export function RegistrationEnrollment() {
  const [mainTab, setMainTab] = useState<RegMainTab>('vendors')

  const [vendors, setVendors] = useState(() => buildVendorRows(VENDOR_TOTAL))
  const [vendorPage, setVendorPage] = useState(1)
  const [addVendorOpen, setAddVendorOpen] = useState(false)
  const [editVendor, setEditVendor] = useState<VendorRow | null>(null)
  const [viewVendor, setViewVendor] = useState<VendorRow | null>(null)
  const [newCompany, setNewCompany] = useState('')
  const [newCategory, setNewCategory] = useState(SERVICE_CATEGORIES[0])
  const [newEmail, setNewEmail] = useState('')
  const [newPhone, setNewPhone] = useState('')
  const [newLocation, setNewLocation] = useState('')
  const [editEngaged, setEditEngaged] = useState(true)
  const [editCompany, setEditCompany] = useState('')
  const [editCategory, setEditCategory] = useState(SERVICE_CATEGORIES[0])
  const [editLoc, setEditLoc] = useState('')
  const [editEmail, setEditEmail] = useState('')
  const [editPhone, setEditPhone] = useState('')
  const [editNotes, setEditNotes] = useState('')

  const [adminName, setAdminName] = useState('')
  const [adminEmail, setAdminEmail] = useState('')
  const [adminLevel, setAdminLevel] = useState(ACCESS_LEVELS[0])
  const [adminPass, setAdminPass] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [adminRows, setAdminRows] = useState<AdminRow[]>(MOCK_ADMIN_ROWS)
  const [adminMenuId, setAdminMenuId] = useState<string | null>(null)
  const adminMenuRef = useRef<HTMLDivElement>(null)
  const [editAdmin, setEditAdmin] = useState<AdminRow | null>(null)
  const [editAdminName, setEditAdminName] = useState('')
  const [editAdminEmail, setEditAdminEmail] = useState('')
  const [editAdminLevel, setEditAdminLevel] = useState('')
  const [editAdminKey, setEditAdminKey] = useState('********************')
  const [deleteAdminId, setDeleteAdminId] = useState<string | null>(null)

  const [partners, setPartners] = useState(() => buildPartnerRows(PARTNER_TOTAL))
  const [partnerPage, setPartnerPage] = useState(1)
  const [partnerFilter, setPartnerFilter] = useState<'all' | PartnerStatus>('all')
  const [filterOpen, setFilterOpen] = useState(false)
  const filterRef = useRef<HTMLDivElement>(null)
  const [reviewPartner, setReviewPartner] = useState<PartnerRow | null>(null)
  const [inviteOpen, setInviteOpen] = useState(true)

  const [toast, setToast] = useState<{ title: string; subtitle: string; variant?: 'check' | 'reject' } | null>(null)

  const closeToast = useCallback(() => setToast(null), [])

  useEffect(() => {
    function doc(e: MouseEvent) {
      const t = e.target as Node
      if (adminMenuRef.current && !adminMenuRef.current.contains(t)) setAdminMenuId(null)
      if (filterRef.current && !filterRef.current.contains(t)) setFilterOpen(false)
    }
    document.addEventListener('mousedown', doc)
    return () => document.removeEventListener('mousedown', doc)
  }, [])

  useEffect(() => {
    setVendorPage(1)
    setPartnerPage(1)
  }, [mainTab])

  useEffect(() => {
    setPartnerPage(1)
  }, [partnerFilter])

  const vendorSlice = useMemo(() => {
    const start = (vendorPage - 1) * VENDOR_PAGE_SIZE
    return vendors.slice(start, start + VENDOR_PAGE_SIZE)
  }, [vendors, vendorPage])

  const filteredPartners = useMemo(() => {
    if (partnerFilter === 'all') return partners
    return partners.filter((p) => p.status === partnerFilter)
  }, [partners, partnerFilter])

  const partnerSlice = useMemo(() => {
    const start = (partnerPage - 1) * PARTNER_PAGE_SIZE
    return filteredPartners.slice(start, start + PARTNER_PAGE_SIZE)
  }, [filteredPartners, partnerPage])

  const partnerTotalPages = Math.max(1, Math.ceil(filteredPartners.length / PARTNER_PAGE_SIZE))

  function showToast(title: string, subtitle: string, variant: 'check' | 'reject' = 'check') {
    setToast({ title, subtitle, variant })
  }

  function copyInviteLink() {
    void navigator.clipboard.writeText('https://estate.app/enroll/partner-invite')
    showToast('Successfully', 'Enrollment link copied to clipboard')
  }

  function approvePartner(row: PartnerRow) {
    setPartners((prev) => prev.map((p) => (p.id === row.id ? { ...p, status: 'Approved' as const } : p)))
    setReviewPartner(null)
    showToast('Approved', 'Partner Request Approved')
  }

  function rejectPartner(row: PartnerRow) {
    setPartners((prev) => prev.map((p) => (p.id === row.id ? { ...p, status: 'Rejected' as const } : p)))
    setReviewPartner(null)
    showToast('Rejected', 'Partner Request Rejected', 'reject')
  }

  useEffect(() => {
    if (!toast || toast.variant !== 'reject') return
    const id = window.setTimeout(closeToast, 2200)
    return () => window.clearTimeout(id)
  }, [toast, closeToast])

  return (
    <AdminLayout title="Registration & Enrollment">
      <div className="mx-auto w-full pb-8">
        <div className={FIGMA_SHELL}>
          <div className="border-b border-[#EDE9E3] bg-[#FAF9F7] px-4 py-3 sm:px-6 sm:py-4">
            <div className="flex flex-wrap gap-2">
              {REG_MAIN_TABS.map((t) => (
                <button
                  key={t.key}
                  type="button"
                  className={mainTab === t.key ? TAB_ACTIVE : TAB_INACTIVE}
                  style={mainTab === t.key ? { backgroundColor: FIGMA_BRONZE } : undefined}
                  onClick={() => setMainTab(t.key)}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white px-4 py-6 sm:px-8 sm:py-8">
            {mainTab === 'vendors' ? (
              <VendorsPanel
                vendorSlice={vendorSlice}
                vendorPage={vendorPage}
                setVendorPage={setVendorPage}
                onAdd={() => setAddVendorOpen(true)}
                onExport={() => showToast('Successfully', 'Export started — PDF will download shortly')}
                onEdit={(v) => {
                  setEditVendor(v)
                  setEditCompany(v.name)
                  setEditCategory(SERVICE_CATEGORIES[0])
                  setEditLoc('Mayfair, London')
                  setEditEmail(v.email)
                  setEditPhone(v.phone)
                  setEditNotes('')
                  setEditEngaged(v.status === 'Active')
                }}
                onView={(v) => setViewVendor(v)}
                onToggleStatus={(v) => {
                  setVendors((prev) =>
                    prev.map((x) => (x.id === v.id ? { ...x, status: x.status === 'Active' ? 'Inactive' : 'Active' } : x))
                  )
                }}
              />
            ) : null}

            {mainTab === 'admin' ? (
              <AdminRegistrationPanel
                adminName={adminName}
                setAdminName={setAdminName}
                adminEmail={adminEmail}
                setAdminEmail={setAdminEmail}
                adminLevel={adminLevel}
                setAdminLevel={setAdminLevel}
                adminPass={adminPass}
                setAdminPass={setAdminPass}
                showPass={showPass}
                setShowPass={setShowPass}
                onSubmit={() => {
                  setAdminName('')
                  setAdminEmail('')
                  setAdminPass('')
                  showToast('Successfully', 'Administrator authorized')
                }}
                adminRows={adminRows}
                adminMenuId={adminMenuId}
                setAdminMenuId={setAdminMenuId}
                adminMenuRef={adminMenuRef}
                onEdit={(r) => {
                  setEditAdmin(r)
                  setEditAdminName(r.name)
                  setEditAdminEmail(r.email)
                  setEditAdminLevel(r.accessLevel)
                  setEditAdminKey('********************')
                  setAdminMenuId(null)
                }}
                onDelete={(id) => {
                  setDeleteAdminId(id)
                  setAdminMenuId(null)
                }}
              />
            ) : null}

            {mainTab === 'partner' ? (
              <PartnerPanel
                partnerSlice={partnerSlice}
                partnerPage={partnerPage}
                setPartnerPage={setPartnerPage}
                totalFiltered={filteredPartners.length}
                partnerTotalPages={partnerTotalPages}
                filterOpen={filterOpen}
                setFilterOpen={setFilterOpen}
                filterRef={filterRef}
                partnerFilter={partnerFilter}
                setPartnerFilter={setPartnerFilter}
                onExport={() => showToast('Successfully', 'PDF export queued')}
                onView={(p) => setReviewPartner(p)}
                onApprove={(p) => {
                  setPartners((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: 'Approved' as const } : x)))
                  showToast('Approved', 'Partner Request Approved')
                }}
                onReject={(p) => {
                  setPartners((prev) => prev.map((x) => (x.id === p.id ? { ...x, status: 'Rejected' as const } : x)))
                  showToast('Rejected', 'Partner Request Rejected', 'reject')
                }}
                inviteOpen={inviteOpen}
                setInviteOpen={setInviteOpen}
                onCopyInvite={copyInviteLink}
              />
            ) : null}
          </div>
        </div>
      </div>

      {addVendorOpen ? (
        <AddVendorModal
          onClose={() => setAddVendorOpen(false)}
          newCompany={newCompany}
          setNewCompany={setNewCompany}
          newCategory={newCategory}
          setNewCategory={setNewCategory}
          newEmail={newEmail}
          setNewEmail={setNewEmail}
          newPhone={newPhone}
          setNewPhone={setNewPhone}
          newLocation={newLocation}
          setNewLocation={setNewLocation}
          onSave={() => {
            setAddVendorOpen(false)
            showToast('Successfully', 'Vendor added to registry')
            setNewCompany('')
            setNewEmail('')
            setNewPhone('')
            setNewLocation('')
          }}
        />
      ) : null}

      {editVendor ? (
        <EditVendorModal
          row={editVendor}
          engaged={editEngaged}
          setEngaged={setEditEngaged}
          company={editCompany}
          setCompany={setEditCompany}
          category={editCategory}
          setCategory={setEditCategory}
          loc={editLoc}
          setLoc={setEditLoc}
          email={editEmail}
          setEmail={setEditEmail}
          phone={editPhone}
          setPhone={setEditPhone}
          notes={editNotes}
          setNotes={setEditNotes}
          onClose={() => setEditVendor(null)}
          onSave={() => {
            setEditVendor(null)
            showToast('Successfully', 'Vendor record updated')
          }}
        />
      ) : null}

      {viewVendor ? (
        <ServiceHistoryModal
          row={viewVendor}
          onClose={() => setViewVendor(null)}
          onEdit={(row) => {
            setViewVendor(null)
            setEditVendor(row)
            setEditCompany(row.name)
            setEditCategory(SERVICE_CATEGORIES[0])
            setEditLoc('Mayfair, London')
            setEditEmail(row.email)
            setEditPhone(row.phone)
            setEditEngaged(row.status === 'Active')
          }}
        />
      ) : null}

      {editAdmin ? (
        <EditAdminModal
          name={editAdminName}
          setName={setEditAdminName}
          email={editAdminEmail}
          setEmail={setEditAdminEmail}
          level={editAdminLevel}
          setLevel={setEditAdminLevel}
          secKey={editAdminKey}
          setSecKey={setEditAdminKey}
          onClose={() => setEditAdmin(null)}
          onSave={() => {
            setAdminRows((rows) =>
              rows.map((r) =>
                r.id === editAdmin!.id
                  ? { ...r, name: editAdminName, email: editAdminEmail, accessLevel: editAdminLevel }
                  : r
              )
            )
            setEditAdmin(null)
            showToast('Saved', 'Successfully Saved Changes')
          }}
        />
      ) : null}

      {deleteAdminId ? (
        <div className={adminModalBackdrop} onClick={() => setDeleteAdminId(null)} role="presentation">
          <div className="w-full max-w-md rounded-2xl border border-[#E5E7EB] bg-white p-6 text-center shadow-2xl" onClick={(e) => e.stopPropagation()}>
            <p className="text-lg font-bold text-[#111827]">Remove administrator?</p>
            <p className="mt-2 text-[14px] text-[#6B7280]">This action cannot be undone.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button type="button" className="rounded-lg border px-5 py-2 font-medium" onClick={() => setDeleteAdminId(null)}>
                Cancel
              </button>
              <button
                type="button"
                className="rounded-lg bg-[#DC2626] px-5 py-2 font-semibold text-white"
                onClick={() => {
                  setAdminRows((r) => r.filter((x) => x.id !== deleteAdminId))
                  setDeleteAdminId(null)
                  showToast('Deleted', 'Successfully Deleted Admin Role')
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {reviewPartner ? (
        <PartnerReviewModal
          row={reviewPartner}
          onClose={() => setReviewPartner(null)}
          onApprove={() => approvePartner(reviewPartner)}
          onReject={() => rejectPartner(reviewPartner)}
        />
      ) : null}

      {toast?.variant === 'reject' ? (
        <div className={adminModalBackdrop} onClick={closeToast} role="presentation">
          <div
            className="w-full max-w-[400px] rounded-2xl px-10 py-11 text-center text-white shadow-2xl"
            style={{ backgroundColor: FIGMA_BRONZE }}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-full bg-white">
              <X className="h-9 w-9 text-[#DC2626]" strokeWidth={2.5} />
            </div>
            <p className="text-[26px] font-bold">{toast.title}</p>
            <p className="mt-3 text-[16px] font-normal text-white/95">{toast.subtitle}</p>
          </div>
        </div>
      ) : (
        <AdminSuccessModal
          open={Boolean(toast)}
          title={toast?.title ?? ''}
          subtitle={toast?.subtitle ?? ''}
          variant="prominent"
          hideButton
          autoCloseMs={2200}
          onClose={closeToast}
        />
      )}
    </AdminLayout>
  )
}

function VendorsPanel({
  vendorSlice,
  vendorPage,
  setVendorPage,
  onAdd,
  onExport,
  onEdit,
  onView,
  onToggleStatus,
}: {
  vendorSlice: VendorRow[]
  vendorPage: number
  setVendorPage: Dispatch<SetStateAction<number>>
  onAdd: () => void
  onExport: () => void
  onEdit: (v: VendorRow) => void
  onView: (v: VendorRow) => void
  onToggleStatus: (v: VendorRow) => void
}) {
  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <h2 className="font-serif text-[24px] font-bold leading-tight tracking-tight text-[#111827] sm:text-[26px]">Vendors</h2>
          <p className="mt-2 max-w-[540px] text-[13px] leading-relaxed text-[#6B7280]">Manage and verify estate-approved service partners.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg border-2 px-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#111827] transition hover:bg-[#FAFAF9]"
            style={{ borderColor: FIGMA_BRONZE }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = FIGMA_BRONZE_HOVER
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = FIGMA_BRONZE
            }}
            onClick={onExport}
          >
            <FileDown className="h-4 w-4" style={{ color: FIGMA_BRONZE }} />
            Export Report
          </button>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg px-5 text-[11px] font-bold uppercase tracking-[0.14em] text-white shadow-sm transition-colors hover:opacity-95"
            style={{ backgroundColor: FIGMA_BRONZE }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = FIGMA_BRONZE
            }}
            onClick={onAdd}
          >
            <Plus className="h-4 w-4" strokeWidth={2.5} />
            + Add New Vendor
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-[10px] border border-[#E8E4DC] bg-[#F4F3F0] px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">Total vendors</p>
          <p className="mt-2 text-[28px] font-bold text-[#111827]">1,284</p>
          <span className="mt-2 inline-block rounded-full bg-emerald-100 px-2 py-0.5 text-[11px] font-semibold text-emerald-800">+12%</span>
        </div>
        <div className="rounded-[10px] border border-[#E8E4DC] bg-[#F4F3F0] px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">Active contracts</p>
          <p className="mt-2 text-[28px] font-bold text-[#111827]">942</p>
          <span className="mt-2 inline-block rounded-full bg-amber-100 px-2 py-0.5 text-[11px] font-semibold text-amber-900">Steady</span>
        </div>
        <div className="rounded-[10px] border border-[#E8E4DC] bg-[#F4F3F0] px-4 py-4 sm:px-5 sm:py-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">Pending review</p>
          <p className="mt-2 text-[28px] font-bold text-[#111827]">18</p>
          <span className="mt-2 inline-block rounded-full bg-red-100 px-2 py-0.5 text-[11px] font-semibold text-red-800">Action Needed</span>
        </div>
        <div className="rounded-[10px] px-4 py-4 text-white sm:px-5 sm:py-5" style={{ backgroundColor: FIGMA_BRONZE }}>
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-white/90">Quality score</p>
              <p className="mt-2 text-[28px] font-bold">4.9/5.0</p>
            </div>
            <ShieldCheck className="h-8 w-8 shrink-0 text-white/90" />
          </div>
        </div>
      </div>

      <div className="mb-0 overflow-hidden rounded-t-xl border border-b-0 border-[#E8E4DC] px-4 py-3 sm:px-5" style={{ backgroundColor: FIGMA_BRONZE }}>
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <button type="button" className="inline-flex items-center gap-2 text-[13px] font-semibold text-white">
            <Filter className="h-4 w-4" />
            Filters
          </button>
          <p className="text-[13px] font-medium text-white/95">Showing {VENDOR_PAGE_SIZE} of {VENDOR_TOTAL.toLocaleString()} vendors</p>
        </div>
      </div>

      <div className="overflow-hidden rounded-b-xl border border-[#E8E4DC] border-t-0 bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#ECEAE6] bg-[#FAFAF9] text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
                <th className="px-5 py-3.5">Vendor name</th>
                <th className="px-5 py-3.5">Email address</th>
                <th className="px-5 py-3.5">Primary contact</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {vendorSlice.map((v) => (
                <tr key={v.id} className="border-b border-[#F3F2EF] last:border-0">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-[12px] font-bold text-[#374151]">
                        {v.initials}
                      </span>
                      <div>
                        <p className="font-bold text-[#111827]">{v.name}</p>
                        <p className="text-[11px] font-semibold uppercase tracking-wide text-[#9CA3AF]">{v.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-[#374151]">{v.email}</td>
                  <td className="px-5 py-5 text-[#374151]">{v.phone}</td>
                  <td className="px-5 py-5">
                    <span className="inline-flex items-center gap-2 text-[13px] font-medium text-[#111827]">
                      <span className={`h-2 w-2 rounded-full ${v.status === 'Active' ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                      {v.status}
                    </span>
                  </td>
                  <td className="px-5 py-5 text-right">
                    <button type="button" className="text-[13px] font-semibold hover:underline" style={{ color: FIGMA_BRONZE }} onClick={() => onView(v)}>
                      View
                    </button>
                    <button type="button" className="ml-3 text-[13px] font-semibold text-[#6B7280] hover:text-[#111827]" onClick={() => onEdit(v)}>
                      Edit
                    </button>
                    <button
                      type="button"
                      className={`ml-4 text-[13px] font-semibold ${v.status === 'Active' ? 'text-red-600' : ''}`}
                      style={v.status === 'Inactive' ? { color: FIGMA_BRONZE } : undefined}
                      onClick={() => onToggleStatus(v)}
                    >
                      {v.status === 'Active' ? 'Deactivate' : 'Activate'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between border-t border-[#ECEAE6] px-4 py-3 sm:px-5">
          <p className="text-[13px] text-[#6B7280]">
            Page {vendorPage} of {VENDOR_TOTAL_PAGES}
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              disabled={vendorPage <= 1}
              className="rounded-lg border border-[#E5E7EB] p-2 disabled:opacity-40"
              onClick={() => setVendorPage((p) => Math.max(1, p - 1))}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              disabled={vendorPage >= VENDOR_TOTAL_PAGES}
              className="rounded-lg border border-[#E5E7EB] p-2 disabled:opacity-40"
              onClick={() => setVendorPage((p) => Math.min(VENDOR_TOTAL_PAGES, p + 1))}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
    </>
  )
}

function AdminRegistrationPanel({
  adminName,
  setAdminName,
  adminEmail,
  setAdminEmail,
  adminLevel,
  setAdminLevel,
  adminPass,
  setAdminPass,
  showPass,
  setShowPass,
  onSubmit,
  adminRows,
  adminMenuId,
  setAdminMenuId,
  adminMenuRef,
  onEdit,
  onDelete,
}: {
  adminName: string
  setAdminName: (v: string) => void
  adminEmail: string
  setAdminEmail: (v: string) => void
  adminLevel: string
  setAdminLevel: (v: string) => void
  adminPass: string
  setAdminPass: (v: string) => void
  showPass: boolean
  setShowPass: (v: boolean) => void
  onSubmit: () => void
  adminRows: AdminRow[]
  adminMenuId: string | null
  setAdminMenuId: (id: string | null) => void
  adminMenuRef: RefObject<HTMLDivElement | null>
  onEdit: (r: AdminRow) => void
  onDelete: (id: string) => void
}) {
  return (
    <>
      <div className="mb-8 grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="min-w-0">
          <h2 className="font-serif text-[24px] font-bold leading-tight tracking-tight text-[#111827] sm:text-[26px]">Admin Registration</h2>
          <p className="mt-2 max-w-[540px] text-[13px] leading-relaxed text-[#6B7280]">Manage and Add New Admin.</p>
          <div className="mt-6 space-y-4 rounded-xl border border-[#E8E4DC] bg-white p-5 shadow-[0_1px_3px_rgba(15,23,42,0.04)] sm:p-6">
            <div>
              <label className={adminLabelCaps}>Full name</label>
              <input className={adminInput} placeholder="e.g. Julian Vane" value={adminName} onChange={(e) => setAdminName(e.target.value)} />
            </div>
            <div>
              <label className={adminLabelCaps}>Institutional email</label>
              <input className={adminInput} placeholder="name@estatetedger.com" value={adminEmail} onChange={(e) => setAdminEmail(e.target.value)} />
              <p className="mt-1 text-[12px] text-[#6B7280]">Must use an authorized @estatetedger.com domain.</p>
            </div>
            <div>
              <label className={adminLabelCaps}>Access level</label>
              <select className={adminInput} value={adminLevel} onChange={(e) => setAdminLevel(e.target.value)}>
                {ACCESS_LEVELS.map((l) => (
                  <option key={l}>{l}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={adminLabelCaps}>Security password</label>
              <div className="relative">
                <input
                  className={`${adminInput} pr-10`}
                  type={showPass ? 'text' : 'password'}
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                />
                <button type="button" className="absolute right-2 top-1/2 -translate-y-1/2 p-1 text-[#6B7280]" onClick={() => setShowPass(!showPass)}>
                  {showPass ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
              <p className="mt-1 text-[12px] text-[#6B7280]">Minimum 12 characters with at least one architectural symbol (!, #, @).</p>
            </div>
            <button
              type="button"
              className="mt-2 flex w-full items-center justify-center gap-2 rounded-lg py-3 text-[14px] font-semibold text-white shadow-sm transition-colors hover:opacity-95"
              style={{ backgroundColor: FIGMA_BRONZE }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = FIGMA_BRONZE
              }}
              onClick={onSubmit}
            >
              <UserPlus className="h-4 w-4" />
              Authorize Administrator
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div className="rounded-xl p-5 text-white" style={{ backgroundColor: FIGMA_BRONZE }}>
            <p className="text-[15px] font-bold">Admin Registration</p>
            <p className="mt-2 text-[13px] leading-relaxed text-white/95">Add all required details and Access of the new admin.</p>
          </div>
          <div className="rounded-xl border border-[#E8E4DC] bg-[#F4F3F0] p-5">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">Current registry load</p>
            <p className="mt-2 text-[32px] font-bold text-[#111827]">
              14 <span className="text-[16px] font-semibold text-[#6B7280]">Active Admins</span>
            </p>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E5E7EB]">
              <div className="h-full w-[70%] rounded-full" style={{ backgroundColor: FIGMA_BRONZE }} />
            </div>
            <p className="mt-2 text-[12px] text-[#6B7280]">Active admins currently handling 70% of system workload.</p>
          </div>
          <div className="rounded-xl border border-[#E8E4DC] bg-white p-5">
            <div className="flex items-center gap-2">
              <Shield className="h-5 w-5" style={{ color: FIGMA_BRONZE }} />
              <p className="text-[11px] font-bold uppercase tracking-wide text-[#111827]">Security protocol</p>
            </div>
            <ul className="mt-4 space-y-3 text-[13px] text-[#374151]">
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>
                  <span className="font-semibold">Encrypted Credentials</span> — SHA-256 standard encryption on all local storage nodes.
                </span>
              </li>
              <li className="flex gap-2">
                <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-emerald-600" />
                <span>
                  <span className="font-semibold">Institutional Sync</span> — Real-time matching with HR and Organizational rosters.
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E8E4DC] bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-[720px] w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#ECEAE6] bg-[#FAFAF9] text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
                <th className="px-5 py-3.5">Name</th>
                <th className="px-5 py-3.5">Email</th>
                <th className="px-5 py-3.5">Access level</th>
                <th className="px-5 py-3.5">Last login</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {adminRows.slice(0, 8).map((r) => (
                <tr key={r.id} className="border-b border-[#F3F2EF] last:border-0">
                  <td className="px-5 py-5 font-medium text-[#111827]">{r.name}</td>
                  <td className="px-5 py-5 text-[#6B7280]">{r.email}</td>
                  <td className="px-5 py-5">{r.accessLevel}</td>
                  <td className="px-5 py-5 text-[#6B7280]">{r.lastLogin}</td>
                  <td className="relative px-5 py-5 text-right">
                    <div className="inline-flex justify-end">
                      <button
                        type="button"
                        className="rounded-lg p-2 hover:bg-[#F3F4F6]"
                        aria-label="Actions"
                        onClick={() => setAdminMenuId(adminMenuId === r.id ? null : r.id)}
                      >
                        <MoreVertical className="h-4 w-4 text-[#374151]" />
                      </button>
                      {adminMenuId === r.id ? (
                        <div ref={adminMenuRef} className="absolute right-4 top-11 z-20 w-40 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
                          <button type="button" className="block w-full px-3 py-2 text-left text-[13px] hover:bg-[#F9FAFB]" onClick={() => onEdit(r)}>
                            Edit access
                          </button>
                          <button
                            type="button"
                            className="block w-full px-3 py-2 text-left text-[13px] text-red-600 hover:bg-red-50"
                            onClick={() => onDelete(r.id)}
                          >
                            Delete
                          </button>
                        </div>
                      ) : null}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

function partnerStatusClass(s: PartnerStatus) {
  if (s === 'Pending') return 'rounded-full bg-[#FFEDD5] px-3 py-1 text-[11px] font-semibold uppercase text-[#9A3412]'
  if (s === 'Approved') return 'rounded-full bg-[#DBEAFE] px-3 py-1 text-[11px] font-semibold uppercase text-[#1D4ED8]'
  return 'rounded-full bg-[#FEE2E2] px-3 py-1 text-[11px] font-semibold uppercase text-[#B91C1C]'
}

function PartnerPanel({
  partnerSlice,
  partnerPage,
  setPartnerPage,
  totalFiltered,
  partnerTotalPages,
  filterOpen,
  setFilterOpen,
  filterRef,
  partnerFilter,
  setPartnerFilter,
  onExport,
  onView,
  onApprove,
  onReject,
  inviteOpen,
  setInviteOpen,
  onCopyInvite,
}: {
  partnerSlice: PartnerRow[]
  partnerPage: number
  setPartnerPage: (n: number | ((p: number) => number)) => void
  totalFiltered: number
  partnerTotalPages: number
  filterOpen: boolean
  setFilterOpen: (v: boolean | ((b: boolean) => boolean)) => void
  filterRef: RefObject<HTMLDivElement | null>
  partnerFilter: 'all' | PartnerStatus
  setPartnerFilter: (f: 'all' | PartnerStatus) => void
  onExport: () => void
  onView: (p: PartnerRow) => void
  onApprove: (p: PartnerRow) => void
  onReject: (p: PartnerRow) => void
  inviteOpen: boolean
  setInviteOpen: (v: boolean) => void
  onCopyInvite: () => void
}) {
  const from = totalFiltered === 0 ? 0 : (partnerPage - 1) * PARTNER_PAGE_SIZE + 1
  const to = Math.min(partnerPage * PARTNER_PAGE_SIZE, totalFiltered)
  return (
    <>
      <div className="mb-8 flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
        <div className="min-w-0">
          <h2 className="font-serif text-[24px] font-bold leading-tight tracking-tight text-[#111827] sm:text-[26px]">Partner Enrollment</h2>
          <p className="mt-2 max-w-[540px] text-[13px] leading-relaxed text-[#6B7280]">Review and manage upcoming collaborator applications for the estate ecosystem.</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-lg border border-[#D1D5DB] bg-white px-4 text-[12px] font-bold uppercase tracking-[0.08em] text-[#111827] shadow-sm transition hover:bg-[#FAFAF9]"
            onClick={onExport}
          >
            <Download className="h-4 w-4" />
            Export PDF
          </button>
          <div className="relative" ref={filterRef}>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-lg px-4 text-[12px] font-bold uppercase tracking-[0.08em] text-white shadow-sm transition-colors hover:opacity-95"
              style={{ backgroundColor: FIGMA_BRONZE }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = FIGMA_BRONZE
              }}
              onClick={() => setFilterOpen((o) => !o)}
            >
              <Filter className="h-4 w-4" />
              Filters
              {partnerFilter !== 'all' ? ` (${partnerFilter})` : ''}
            </button>
            {filterOpen ? (
              <div className="absolute right-0 z-30 mt-1 w-48 rounded-xl border border-[#E5E7EB] bg-white py-1 shadow-lg">
                {(['all', 'Pending', 'Approved', 'Rejected'] as const).map((opt) => (
                  <button
                    key={opt}
                    type="button"
                    className="block w-full px-4 py-2 text-left text-[13px] hover:bg-[#F9FAFB]"
                    onClick={() => {
                      setPartnerFilter(opt === 'all' ? 'all' : opt)
                      setFilterOpen(false)
                    }}
                  >
                    {opt === 'all' ? 'All statuses' : opt}
                  </button>
                ))}
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-1 gap-3 sm:gap-4 lg:grid-cols-3">
        <div className="rounded-[10px] px-5 py-5 text-white sm:py-6" style={{ backgroundColor: FIGMA_BRONZE }}>
          <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-white/90">Total pending</p>
          <p className="mt-2 text-[36px] font-bold">124</p>
          <p className="mt-2 text-[12px] font-medium text-emerald-200">+12% vs last week</p>
        </div>
        <div className="rounded-[10px] border border-[#E8E4DC] bg-white p-5">
          <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">Awaiting review</p>
          <p className="mt-2 text-[32px] font-bold text-[#111827]">48</p>
        </div>
        <div className="flex rounded-[10px] border border-[#E8E4DC] bg-[#F4F3F0] px-5 py-5 sm:py-6">
          <div className="min-w-0 flex-1">
            <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">Growth velocity</p>
            <p className="mt-2 text-[20px] font-bold text-[#111827]">Accelerated</p>
          </div>
          <MiniBars heights={GROWTH_BAR_HEIGHTS} className="w-24" />
        </div>
      </div>

      <div className="mb-8">
        <MonthlyEnrollmentChart />
      </div>

      <div className="overflow-hidden rounded-xl border border-[#E8E4DC] bg-white">
        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-[13px]">
            <thead>
              <tr className="border-b border-[#ECEAE6] bg-[#FAFAF9] text-[10px] font-bold uppercase tracking-[0.12em] text-[#9CA3AF]">
                <th className="px-5 py-3.5">Name</th>
                <th className="px-5 py-3.5">Email address</th>
                <th className="px-5 py-3.5">Request date</th>
                <th className="px-5 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {partnerSlice.map((p) => (
                <tr key={p.id} className="border-b border-[#F3F2EF] last:border-0">
                  <td className="px-5 py-5">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#F3F4F6] text-[11px] font-bold text-[#374151]">
                        {p.initials}
                      </span>
                      <span className="font-semibold text-[#111827]">{p.name}</span>
                    </div>
                  </td>
                  <td className="px-5 py-5 text-[#6B7280]">{p.email}</td>
                  <td className="px-5 py-5">{p.requestDate}</td>
                  <td className="px-5 py-5">
                    <span className={partnerStatusClass(p.status)}>{p.status}</span>
                  </td>
                  <td className="px-5 py-5">
                    <div className="flex justify-end gap-1">
                      <button type="button" className="rounded-lg p-2 hover:bg-[#FAF6F0]" style={{ color: FIGMA_BRONZE }} onClick={() => onView(p)}>
                        <Eye className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        disabled={p.status !== 'Pending'}
                        className="rounded-lg p-2 disabled:opacity-35"
                        onClick={() => onApprove(p)}
                      >
                        <CheckCircle2 className={`h-4 w-4 ${p.status === 'Pending' ? 'text-emerald-600' : 'text-gray-300'}`} />
                      </button>
                      <button
                        type="button"
                        disabled={p.status !== 'Pending'}
                        className="rounded-lg p-2 disabled:opacity-35"
                        onClick={() => onReject(p)}
                      >
                        <X className={`h-4 w-4 ${p.status === 'Pending' ? 'text-red-600' : 'text-gray-300'}`} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-[#ECEAE6] px-4 py-3 text-[13px] text-[#6B7280] sm:px-5">
          <span>
            Showing {from}-{to} of {totalFiltered} applications
          </span>
          <div className="flex items-center gap-2">
            <button
              type="button"
              disabled={partnerPage <= 1}
              className="rounded-lg border border-[#E5E7EB] p-2 disabled:opacity-40"
              onClick={() => setPartnerPage((x) => Math.max(1, x - 1))}
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            {[1, 2, 3].map((n) => (
              <button
                key={n}
                type="button"
                className={`min-w-[32px] rounded-lg border px-2 py-1 text-[13px] ${
                  partnerPage === n ? 'border-[#C5D5E8] bg-[#E8EDF4] font-semibold' : 'border-[#E5E7EB] bg-white'
                }`}
                onClick={() => setPartnerPage(Math.min(partnerTotalPages, n))}
              >
                {n}
              </button>
            ))}
            <button
              type="button"
              disabled={partnerPage >= partnerTotalPages}
              className="rounded-lg p-2 text-white shadow-sm disabled:opacity-40"
              style={{ backgroundColor: FIGMA_BRONZE }}
              onClick={() => setPartnerPage((x) => Math.min(partnerTotalPages, x + 1))}
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {inviteOpen ? (
        <div className="fixed bottom-6 right-6 z-40 w-full max-w-[320px] rounded-xl border border-[#E8E4DC] bg-white p-4 shadow-xl">
          <button type="button" className="absolute right-2 top-2 rounded p-1 text-[#9CA3AF] hover:bg-[#F3F4F6]" onClick={() => setInviteOpen(false)}>
            <X className="h-4 w-4" />
          </button>
          <div className="flex gap-3 pr-6">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6]">
              <Link2 className="h-5 w-5 text-[#6B7280]" />
            </div>
            <div>
              <p className="font-bold text-[#111827]">Invite Partners</p>
              <p className="mt-1 text-[12px] leading-relaxed text-[#6B7280]">Share your exclusive enrollment link with trusted luxury vendors.</p>
            </div>
          </div>
          <button
            type="button"
            className="mt-4 w-full rounded-lg py-2.5 text-[12px] font-bold uppercase tracking-wide text-white shadow-sm transition-colors hover:opacity-95"
            style={{ backgroundColor: FIGMA_BRONZE }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = FIGMA_BRONZE_HOVER
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = FIGMA_BRONZE
            }}
            onClick={onCopyInvite}
          >
            Copy link
          </button>
        </div>
      ) : null}
    </>
  )
}

function AddVendorModal({
  onClose,
  newCompany,
  setNewCompany,
  newCategory,
  setNewCategory,
  newEmail,
  setNewEmail,
  newPhone,
  setNewPhone,
  newLocation,
  setNewLocation,
  onSave,
}: {
  onClose: () => void
  newCompany: string
  setNewCompany: (v: string) => void
  newCategory: string
  setNewCategory: (v: string) => void
  newEmail: string
  setNewEmail: (v: string) => void
  newPhone: string
  setNewPhone: (v: string) => void
  newLocation: string
  setNewLocation: (v: string) => void
  onSave: () => void
}) {
  return (
    <div className={adminModalBackdrop} onClick={onClose} role="presentation">
      <div className={`${adminModalPanelWide} max-h-[90vh] overflow-y-auto text-left`} onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#F3F4F6]">
            <UserPlus className="h-5 w-5" style={{ color: FIGMA_BRONZE }} />
          </div>
          <div>
            <h3 className="text-xl font-bold text-[#111827]">Register New Partner</h3>
            <p className="mt-1 text-[13px] text-[#6B7280]">Add a professional service provider to the estate&apos;s curated registry.</p>
          </div>
          <button type="button" className="ml-auto rounded-lg p-1 hover:bg-[#F3F4F6]" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4">
          <div>
            <label className={adminLabelCaps}>Company name</label>
            <input className={adminInput} placeholder="e.g., Heritage Masonry Ltd." value={newCompany} onChange={(e) => setNewCompany(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={adminLabelCaps}>Service category</label>
              <select className={adminInput} value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
                {SERVICE_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={adminLabelCaps}>Primary email</label>
              <input className={adminInput} placeholder="partners@company.com" value={newEmail} onChange={(e) => setNewEmail(e.target.value)} />
            </div>
            <div>
              <label className={adminLabelCaps}>Phone number</label>
              <input className={adminInput} placeholder="+1 (555) 000-0000" value={newPhone} onChange={(e) => setNewPhone(e.target.value)} />
            </div>
            <div>
              <label className={adminLabelCaps}>Headquarters location</label>
              <div className="relative">
                <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
                <input className={`${adminInput} pl-9`} placeholder="City, Country" value={newLocation} onChange={(e) => setNewLocation(e.target.value)} />
              </div>
            </div>
          </div>
          <div className="rounded-lg border-l-4 p-4" style={{ borderColor: FIGMA_BRONZE, backgroundColor: '#FAF6F0' }}>
            <div className="flex gap-2">
              <Info className="h-4 w-4 shrink-0" style={{ color: FIGMA_BRONZE }} />
              <div>
                <p className="text-[11px] font-bold uppercase tracking-wide" style={{ color: FIGMA_BRONZE }}>
                  Onboarding protocol
                </p>
                <p className="mt-1 text-[12px] leading-relaxed text-[#374151]">
                  Vendors will receive an automated invitation to submit their insurance certifications and portfolio credentials before being approved for
                  active project assignments.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex justify-end gap-3">
          <button type="button" className="px-2 py-2 text-[14px] font-semibold text-[#6B7280]" onClick={onClose}>
            Cancel
          </button>
          <button type="button" className="rounded-lg px-6 py-2.5 text-[14px] font-semibold text-white" style={{ backgroundColor: FIGMA_BRONZE }} onClick={onSave}>
            Add vendor
          </button>
        </div>
      </div>
    </div>
  )
}

function EditVendorModal({
  row,
  engaged,
  setEngaged,
  company,
  setCompany,
  category,
  setCategory,
  loc,
  setLoc,
  email,
  setEmail,
  phone,
  setPhone,
  notes,
  setNotes,
  onClose,
  onSave,
}: {
  row: VendorRow
  engaged: boolean
  setEngaged: (v: boolean) => void
  company: string
  setCompany: (v: string) => void
  category: string
  setCategory: (v: string) => void
  loc: string
  setLoc: (v: string) => void
  email: string
  setEmail: (v: string) => void
  phone: string
  setPhone: (v: string) => void
  notes: string
  setNotes: (v: string) => void
  onClose: () => void
  onSave: () => void
}) {
  return (
    <div className={adminModalBackdrop} onClick={onClose} role="presentation">
      <div className={`${adminModalPanelWide} max-h-[90vh] overflow-y-auto text-left`} onClick={(e) => e.stopPropagation()}>
        <div className="mb-2 flex items-start justify-between">
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9CA3AF]">Refining entity record</p>
            <h3 className="font-serif text-2xl font-bold text-[#111827]">{row.name}</h3>
          </div>
          <button type="button" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="mb-6 flex items-center justify-between rounded-xl bg-[#F3F4F6] px-4 py-3">
          <div>
            <p className="text-[14px] font-semibold text-[#111827]">Entity engagement</p>
            <p className="text-[12px] text-[#6B7280]">Controls active contract availability</p>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase text-[#6B7280]">Active</span>
            <button
              type="button"
              role="switch"
              aria-checked={engaged}
              onClick={() => setEngaged(!engaged)}
              className={`relative h-7 w-12 rounded-full ${engaged ? '' : 'bg-[#D1D5DB]'}`}
              style={engaged ? { backgroundColor: FIGMA_BRONZE } : undefined}
            >
              <span className={`absolute top-0.5 h-6 w-6 rounded-full bg-white shadow ${engaged ? 'left-5' : 'left-0.5'}`} />
            </button>
          </div>
        </div>
        <div className="space-y-4">
          <div>
            <label className={adminLabelCaps}>Company name</label>
            <input className={adminInput} value={company} onChange={(e) => setCompany(e.target.value)} />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className={adminLabelCaps}>Service category</label>
              <select className={adminInput} value={category} onChange={(e) => setCategory(e.target.value)}>
                {SERVICE_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={adminLabelCaps}>Location</label>
              <input className={adminInput} value={loc} onChange={(e) => setLoc(e.target.value)} />
            </div>
            <div>
              <label className={adminLabelCaps}>Contact email</label>
              <input className={adminInput} value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div>
              <label className={adminLabelCaps}>Phone</label>
              <input className={adminInput} value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
          </div>
          <div>
            <label className={adminLabelCaps}>Operational notes</label>
            <textarea className={`${adminInput} min-h-[100px]`} placeholder="Add confidential vendor details..." value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
        </div>
        <div className="mt-8 flex justify-between gap-3 border-t border-[#E5E7EB] bg-[#FAFAFA] -mx-6 -mb-6 mt-6 rounded-b-2xl px-6 py-4 sm:-mx-8">
          <button type="button" className="text-[14px] font-semibold text-[#6B7280]" onClick={onClose}>
            Discard changes
          </button>
          <button type="button" className="rounded-lg px-6 py-2.5 text-[14px] font-semibold text-white" style={{ backgroundColor: FIGMA_BRONZE }} onClick={onSave}>
            Save vendor
          </button>
        </div>
      </div>
    </div>
  )
}

function ServiceHistoryModal({
  row,
  onClose,
  onEdit,
}: {
  row: VendorRow
  onClose: () => void
  onEdit: (row: VendorRow) => void
}) {
  return (
    <div className={adminModalBackdrop} onClick={onClose} role="presentation">
      <div className="flex max-h-[92vh] w-full max-w-3xl overflow-hidden rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="w-[220px] shrink-0 border-r border-[#E5E7EB] bg-[#F9FAFB] p-5">
          <div className="mx-auto mb-4 h-20 w-20 overflow-hidden rounded-lg bg-[#E5E7EB]">
            <img src="https://images.unsplash.com/photo-1615876234888-fd9a39fda97f?w=200&q=80" alt="" className="h-full w-full object-cover" />
          </div>
          <p className="text-center font-bold text-[#111827]">{row.name}</p>
          <p className="mt-3 text-[10px] font-bold uppercase text-[#9CA3AF]">Service category</p>
          <p className="text-[13px] font-semibold" style={{ color: FIGMA_BRONZE }}>
            Structural Restoration
          </p>
          <div className="mt-4 space-y-3 text-[12px]">
            <div>
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#9CA3AF]">
                <Mail className="h-3 w-3" /> Email
              </div>
              <p className="mt-0.5 break-all text-[#374151]">{row.email}</p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#9CA3AF]">
                <Phone className="h-3 w-3" /> Phone
              </div>
              <p className="mt-0.5 text-[#374151]">{row.phone}</p>
            </div>
            <div>
              <div className="flex items-center gap-1 text-[10px] font-bold uppercase text-[#9CA3AF]">
                <MapPin className="h-3 w-3" /> Headquarters
              </div>
              <p className="mt-0.5 text-[#374151]">Mayfair, London</p>
            </div>
          </div>
        </div>
        <div className="flex min-w-0 flex-1 flex-col">
          <div className="flex items-start justify-between border-b border-[#E5E7EB] p-5">
            <div>
              <h3 className="text-lg font-bold text-[#111827]">Service History</h3>
              <p className="text-[13px] text-[#6B7280]">Reviewing 4 years of partnership excellence.</p>
            </div>
            <button type="button" onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-5">
            <div className="grid grid-cols-3 gap-3">
              <div className="rounded-lg bg-[#F3F4F6] p-3">
                <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">Total value</p>
                <p className="mt-1 text-lg font-bold">£1.42M</p>
              </div>
              <div className="rounded-lg bg-[#F3F4F6] p-3">
                <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">Projects</p>
                <p className="mt-1 text-lg font-bold">12</p>
              </div>
              <div className="rounded-lg bg-[#F3F4F6] p-3">
                <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">Health score</p>
                <p className="mt-1 flex items-center gap-1 text-lg font-bold">
                  9.8 <span className="h-2 w-2 rounded-full bg-emerald-500" />
                </p>
              </div>
            </div>
            <p className="mt-6 text-[10px] font-bold uppercase text-[#9CA3AF]">Active contracts</p>
            <div className="mt-2 space-y-3">
              <div className="flex items-start gap-3 rounded-lg border border-[#E5E7EB] p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#FAF6F0]">
                  <Briefcase className="h-4 w-4" style={{ color: FIGMA_BRONZE }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#111827]">West Wing Façade Restoration</p>
                  <p className="text-[12px] text-[#6B7280]">Expires: Oct 24, 2024</p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold uppercase text-emerald-800">In progress</span>
                  <p className="mt-1 text-[13px] font-semibold">£420,000</p>
                </div>
              </div>
              <div className="flex items-start gap-3 rounded-lg border border-[#E5E7EB] p-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded bg-[#FAF6F0]">
                  <Briefcase className="h-4 w-4" style={{ color: FIGMA_BRONZE }} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-[#111827]">Courtyard Stonework</p>
                  <p className="text-[12px] text-[#6B7280]">Expires: Jan 12, 2025</p>
                </div>
                <div className="text-right">
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold uppercase text-amber-900">On hold</span>
                  <p className="mt-1 text-[13px] font-semibold">£180,000</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex justify-end gap-2 border-t border-[#E5E7EB] p-4">
            <button type="button" className="rounded-lg border border-[#D1D5DB] px-4 py-2 text-[13px] font-semibold" onClick={onClose}>
              Close profile
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-[12px] font-bold uppercase tracking-wide text-white"
              style={{ backgroundColor: FIGMA_BRONZE }}
              onClick={() => onEdit(row)}
            >
              <Pencil className="h-4 w-4" />
              Edit vendor
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

function EditAdminModal({
  name,
  setName,
  email,
  setEmail,
  level,
  setLevel,
  secKey,
  setSecKey,
  onClose,
  onSave,
}: {
  name: string
  setName: (v: string) => void
  email: string
  setEmail: (v: string) => void
  level: string
  setLevel: (v: string) => void
  secKey: string
  setSecKey: (v: string) => void
  onClose: () => void
  onSave: () => void
}) {
  return (
    <div className={adminModalBackdrop} onClick={onClose} role="presentation">
      <div className={adminModalPanelWide} onClick={(e) => e.stopPropagation()}>
        <div className="mb-6 flex items-start justify-between">
          <h3 className="text-xl font-bold text-[#111827]">Edit Admin Access</h3>
          <button type="button" onClick={onClose}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="space-y-4 text-left">
          <div>
            <label className={adminLabelCaps}>Full legal name</label>
            <input className={adminInput} value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div>
            <label className={adminLabelCaps}>Institutional email</label>
            <input className={adminInput} value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div>
            <label className={adminLabelCaps}>Access level</label>
            <select className={adminInput} value={level} onChange={(e) => setLevel(e.target.value)}>
              {ACCESS_LEVELS.map((l) => (
                <option key={l}>{l}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={adminLabelCaps}>Security key</label>
            <div className="relative">
              <input className={`${adminInput} pr-10`} type="password" value={secKey} onChange={(e) => setSecKey(e.target.value)} />
              <KeyRound className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#9CA3AF]" />
            </div>
          </div>
        </div>
        <button type="button" className="mt-6 w-full rounded-lg py-3 text-[14px] font-semibold text-white" style={{ backgroundColor: FIGMA_BRONZE }} onClick={onSave}>
          Save
        </button>
        <div className="mt-4 rounded-lg border-l-4 border-[#B89F7C] bg-[#FFFBF0] p-4">
          <p className="text-[13px] font-bold text-[#92400E]">Onboarding Protocol</p>
          <p className="mt-1 text-[12px] leading-relaxed text-[#78350F]">
            A verification link and mandatory 2FA setup instructions will be dispatched to the provided institutional email. Deployment is pending confirmation.
          </p>
        </div>
      </div>
    </div>
  )
}

function PartnerReviewModal({
  row,
  onClose,
  onApprove,
  onReject,
}: {
  row: PartnerRow
  onClose: () => void
  onApprove: () => void
  onReject: () => void
}) {
  return (
    <div className={adminModalBackdrop} onClick={onClose} role="presentation">
      <div className="w-full max-w-lg rounded-2xl border border-[#E5E7EB] bg-white shadow-2xl" onClick={(e) => e.stopPropagation()}>
        <div className="border-b border-[#E5E7EB] p-5">
          <div className="flex gap-3">
            <img src={row.profileImage} alt="" className="h-14 w-14 rounded-lg object-cover" />
            <div className="min-w-0 flex-1">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="text-lg font-bold text-[#111827]">{row.name}</h3>
                <span className="rounded-full bg-[#FEF3C7] px-2 py-0.5 text-[10px] font-bold uppercase text-[#92400E]">Premium partner</span>
              </div>
              <p className="text-[13px] text-[#6B7280]">{row.website}</p>
            </div>
            <button type="button" onClick={onClose}>
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 p-5 text-left">
          <div>
            <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">Primary email</p>
            <p className="mt-1 text-[13px] text-[#374151]">{row.primaryEmail ?? row.email}</p>
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">Request date</p>
            <p className="mt-1 text-[13px] text-[#374151]">October 22, 2023</p>
          </div>
        </div>
        <div className="px-5 pb-5 text-left">
          <p className="text-[10px] font-bold uppercase text-[#9CA3AF]">Company profile</p>
          <div className="mt-2 flex gap-3 rounded-lg bg-[#F9FAFB] p-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#E5E7EB]">
              <Briefcase className="h-5 w-5 text-[#6B7280]" />
            </div>
            <div>
              <p className="font-bold text-[#111827]">{row.company}</p>
              <p className="mt-1 text-[13px] leading-relaxed text-[#6B7280]">{row.companyDesc}</p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-3 border-t border-[#E5E7EB] px-5 py-3 text-[12px] text-[#6B7280]">
          <span>
            <span className="font-semibold text-[#111827]">Tier</span> {row.tier}
          </span>
          <span>
            <span className="font-semibold text-[#111827]">Referral</span> {row.referral}
          </span>
          <span className="flex items-center gap-1">
            <span className="font-semibold text-[#111827]">Documents</span> {row.documents}
          </span>
          <span className="ml-auto text-[11px]">Last updated: 2 hours ago</span>
        </div>
        <div className="flex justify-center gap-3 border-t border-[#F3F4F6] bg-[#FAFAFA] px-5 py-5">
          <button type="button" className="rounded-lg border border-[#D1D5DB] bg-white px-6 py-2.5 text-[12px] font-bold uppercase" onClick={onReject}>
            Reject
          </button>
          <button type="button" className="rounded-lg px-6 py-2.5 text-[12px] font-bold uppercase text-white" style={{ backgroundColor: FIGMA_BRONZE }} onClick={onApprove}>
            Approve partner
          </button>
        </div>
      </div>
    </div>
  )
}
