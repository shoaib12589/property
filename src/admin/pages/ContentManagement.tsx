import { useEffect, useMemo, useRef, useState } from 'react'
import { HelpCircle, MoreVertical, Search, Trash2, Upload } from 'lucide-react'
import { AdminLayout } from '../components/AdminLayout'
import { AdminSuccessModal } from '../components/AdminSuccessModal'
import { adminInput, adminLabelCaps, adminModalBackdrop, adminModalPanel, ADMIN_ACCENT_MUTED } from '../lib/adminUi'
import {
  AMENITY_ROWS,
  CATEGORY_ROWS,
  CMS_TABS,
  LOCATION_ROWS,
  MEDIA_ROWS,
  PROPERTY_TYPE_ROWS,
  type AmenityRow,
  type CategoryRow,
  type CmsStatus,
  type CmsTabKey,
  type LocationRow,
  type MediaRow,
  type PropertyTypeRow,
} from '../data/contentManagementMock'

const ACTIVE_TAB = 'border-[#B89F7C] bg-[#A79D7A] text-white'
const INACTIVE_TAB = 'border-[#E5E7EB] bg-white text-[#111827] hover:border-[#D7D3CA]'

type EditableKind = 'category' | 'property-type' | 'amenity' | 'location'
type EditState = {
  kind: EditableKind
  id?: string
  title: string
  nameLabel: string
  leftLabel: string
  leftValue: string
  rightLabel: string
  rightValue: string
  /** Locations: area line (separate from country/city) */
  areaValue: string
  status: CmsStatus
  description: string
}

const badgeClass = 'inline-flex min-w-[66px] justify-center rounded-full bg-[#99F6C1] px-3 py-1 text-[12px] font-medium text-[#14532D]'

function buildEditState(tab: CmsTabKey, row?: CategoryRow | PropertyTypeRow | AmenityRow | LocationRow): EditState {
  if (tab === 'property-types') {
    const item = row as PropertyTypeRow | undefined
    return {
      kind: 'property-type',
      id: item?.id,
      title: item ? 'Edit Property Types' : 'Add Category',
      nameLabel: 'Name',
      leftLabel: 'Name',
      leftValue: item?.name ?? '3048',
      rightLabel: 'Type',
      rightValue: item?.type ?? 'Main',
      areaValue: '',
      status: item?.status ?? 'Active',
      description: item?.description ?? '',
    }
  }
  if (tab === 'amenities') {
    const item = row as AmenityRow | undefined
    return {
      kind: 'amenity',
      id: item?.id,
      title: item ? 'Edit Category' : 'Add Category',
      nameLabel: 'Name',
      leftLabel: 'Name',
      leftValue: item?.name ?? 'Pool',
      rightLabel: 'Type',
      rightValue: 'Main',
      areaValue: '',
      status: item?.status ?? 'Active',
      description: item?.description ?? '',
    }
  }
  if (tab === 'locations') {
    const item = row as LocationRow | undefined
    return {
      kind: 'location',
      id: item?.id,
      title: item ? 'Edit Locations' : 'Add Locations',
      nameLabel: 'Country',
      leftLabel: 'Country',
      leftValue: item?.country ?? 'UK',
      rightLabel: 'City',
      rightValue: item?.city ?? 'England',
      areaValue: item?.area ?? 'Birmingham',
      status: item?.status ?? 'Active',
      description: item?.description ?? '',
    }
  }

  const item = row as CategoryRow | undefined
  return {
    kind: 'category',
    id: item?.id,
    title: item ? 'Edit Category' : 'Add Category',
    nameLabel: 'Add Category',
    leftLabel: item ? 'Name' : 'Add Category',
    leftValue: item?.name ?? '3048',
    rightLabel: 'Type',
    rightValue: item?.type ?? 'Main',
    areaValue: '',
    status: item?.status ?? 'Active',
    description: item?.description ?? '',
  }
}

export function ContentManagement() {
  const [tab, setTab] = useState<CmsTabKey>('categories')
  const [search, setSearch] = useState('')
  const [openRowMenu, setOpenRowMenu] = useState<string | null>(null)
  const [editState, setEditState] = useState<EditState | null>(null)
  const [deleteTarget, setDeleteTarget] = useState<{ id: string; label: string } | null>(null)
  const [statusTarget, setStatusTarget] = useState<{ id: string; label: string; active: boolean } | null>(null)
  const [statusToggleValue, setStatusToggleValue] = useState(true)
  const [successText, setSuccessText] = useState<{ title: string; subtitle: string } | null>(null)
  const [mediaPreview, setMediaPreview] = useState<MediaRow | null>(null)
  const [mediaPreviewImage, setMediaPreviewImage] = useState<string | null>(null)
  const rowMenuRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function close(e: MouseEvent) {
      if (rowMenuRef.current && !rowMenuRef.current.contains(e.target as Node)) {
        setOpenRowMenu(null)
      }
    }
    document.addEventListener('mousedown', close)
    return () => document.removeEventListener('mousedown', close)
  }, [])

  const categories = useMemo(() => CATEGORY_ROWS.filter((r) => `${r.name} ${r.type} ${r.status}`.toLowerCase().includes(search.toLowerCase())), [search])
  const propertyTypes = useMemo(
    () => PROPERTY_TYPE_ROWS.filter((r) => `${r.name} ${r.type} ${r.status}`.toLowerCase().includes(search.toLowerCase())),
    [search]
  )
  const amenities = useMemo(() => AMENITY_ROWS.filter((r) => `${r.name} ${r.status}`.toLowerCase().includes(search.toLowerCase())), [search])
  const locations = useMemo(
    () => LOCATION_ROWS.filter((r) => `${r.country} ${r.city} ${r.area} ${r.status}`.toLowerCase().includes(search.toLowerCase())),
    [search]
  )
  const mediaRows = useMemo(() => MEDIA_ROWS.filter((r) => r.name.toLowerCase().includes(search.toLowerCase())), [search])

  function openNewForm() {
    if (tab === 'media-files') return
    setEditState(buildEditState(tab))
  }

  function submitForm() {
    const isEdit = Boolean(editState?.id)
    setEditState(null)
    setSuccessText({
      title: 'Successfully',
      subtitle: isEdit ? 'Changes Saved Successfully' : 'Your Category has been Save successfully',
    })
  }

  function actionLabelForDelete(_target: string) {
    if (tab === 'media-files') return 'media'
    if (tab === 'locations') return 'location'
    return 'category'
  }

  function renderHeaderActions() {
    if (tab === 'media-files') return null
    return (
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <div className="relative min-w-[200px] flex-1">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#9CA3AF]" strokeWidth={1.75} />
          <input
            type="search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search"
            className="w-full rounded-[10px] border border-[#E5E7EB] bg-white py-3 pl-12 pr-4 text-[14px] text-[#111827] placeholder:text-[#9CA3AF] outline-none transition focus:border-[#B89F7C] focus:ring-2 focus:ring-[#B89F7C]/20"
          />
        </div>
        <button
          type="button"
          onClick={openNewForm}
          className="h-[46px] min-w-[102px] rounded-[10px] px-5 text-[14px] font-semibold text-white transition hover:opacity-95"
          style={{ backgroundColor: ADMIN_ACCENT_MUTED }}
        >
          + Add New
        </button>
      </div>
    )
  }

  return (
    <AdminLayout title="Content Management (CMS)">
      {!editState ? (
        <>
          <div className="mb-4 grid grid-cols-1 gap-2 sm:grid-cols-2 xl:grid-cols-5">
            {CMS_TABS.map((item) => (
              <button
                key={item.key}
                type="button"
                onClick={() => {
                  setTab(item.key)
                  setSearch('')
                  setOpenRowMenu(null)
                  setMediaPreview(null)
                  setMediaPreviewImage(null)
                }}
                className={`w-full rounded-[10px] border px-3 py-3 text-left transition ${tab === item.key ? ACTIVE_TAB : INACTIVE_TAB}`}
              >
                <div className="flex items-center justify-between">
                  <span className="text-[16px] font-semibold">{item.label}</span>
                  <span className="text-[22px] font-bold">{item.count}</span>
                </div>
                <div className={`mt-2 h-[2px] w-full ${tab === item.key ? 'bg-white/35' : 'bg-[#EAEAEA]'}`}>
                  <div className="h-full bg-[#B89F7C]" style={{ width: '78%' }} />
                </div>
              </button>
            ))}
          </div>

          {renderHeaderActions()}

          <div className="overflow-x-auto rounded-[10px] border border-[#E5E7EB] bg-white shadow-sm">
            {tab === 'categories' ? (
              <table className="w-full min-w-[860px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                    {['Name', 'Type', 'Status', 'Date', 'Actions'].map((h) => (
                      <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {categories.map((row) => (
                    <tr key={row.id} className="border-b border-[#E5E7EB] hover:bg-[#FAFAFA]">
                      <td className="px-4 py-4 text-[#111827]">{row.name}</td>
                      <td className="px-4 py-4 text-[#111827]">{row.type}</td>
                      <td className="px-4 py-4"><span className={badgeClass}>{row.status}</span></td>
                      <td className="px-4 py-4 text-[#111827]">{row.date}</td>
                      <td className="px-4 py-4">{rowActionMenu(row.id, row.name, () => setEditState(buildEditState(tab, row)))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {tab === 'property-types' ? (
              <table className="w-full min-w-[860px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                    {['Name', 'Category', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {propertyTypes.map((row) => (
                    <tr key={row.id} className="border-b border-[#E5E7EB] hover:bg-[#FAFAFA]">
                      <td className="px-4 py-4 text-[#111827]">{row.name}</td>
                      <td className="px-4 py-4 text-[#111827]">Residential</td>
                      <td className="px-4 py-4"><span className={badgeClass}>{row.status}</span></td>
                      <td className="px-4 py-4">{rowActionMenu(row.id, row.name, () => setEditState(buildEditState(tab, row)))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {tab === 'amenities' ? (
              <table className="w-full min-w-[860px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                    {['Name', 'Icon', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {amenities.map((row) => (
                    <tr key={row.id} className="border-b border-[#E5E7EB] hover:bg-[#FAFAFA]">
                      <td className="px-4 py-4 text-[#111827]">{row.name}</td>
                      <td className="px-4 py-4 text-[20px]">{row.icon}</td>
                      <td className="px-4 py-4"><span className={badgeClass}>{row.status}</span></td>
                      <td className="px-4 py-4">{rowActionMenu(row.id, row.name, () => setEditState(buildEditState(tab, row)))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {tab === 'locations' ? (
              <table className="w-full min-w-[900px] text-left text-[14px]">
                <thead>
                  <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                    {['Country', 'City', 'Area', 'Status', 'Actions'].map((h) => (
                      <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {locations.map((row) => (
                    <tr key={row.id} className="border-b border-[#E5E7EB] hover:bg-[#FAFAFA]">
                      <td className="px-4 py-4 text-[#111827]">{row.country}</td>
                      <td className="px-4 py-4 text-[#111827]">{row.city}</td>
                      <td className="px-4 py-4 text-[#111827]">{row.area}</td>
                      <td className="px-4 py-4"><span className={badgeClass}>{row.status}</span></td>
                      <td className="px-4 py-4">{rowActionMenu(row.id, row.area, () => setEditState(buildEditState(tab, row)))}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : null}

            {tab === 'media-files' ? (
              <div className="p-4 sm:p-5">
                {mediaPreview ? (
                  <div>
                    <img
                      src={mediaPreviewImage ?? mediaPreview.image}
                      alt={mediaPreview.name}
                      className="mb-6 h-[320px] w-full rounded-md object-cover"
                    />
                    <div className="grid grid-cols-2 gap-4 md:grid-cols-5">
                      {mediaRows.slice(0, 5).map((thumb) => (
                        <button
                          key={thumb.id}
                          type="button"
                          onClick={() => setMediaPreviewImage(thumb.image)}
                          className="overflow-hidden rounded-md border border-[#E5E7EB] transition hover:border-[#B89F7C]"
                        >
                          <img src={thumb.image} alt={thumb.name} className="h-28 w-full object-cover" />
                        </button>
                      ))}
                    </div>
                    <div className="mt-4 flex justify-end">
                      <button
                        type="button"
                        onClick={() => {
                          setMediaPreview(null)
                          setMediaPreviewImage(null)
                        }}
                        className="rounded-md border border-[#E5E7EB] bg-white px-4 py-2 text-[14px] font-medium text-[#374151] hover:bg-[#F9FAFB]"
                      >
                        Back to list
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <p className="mb-2 text-[14px] text-[#111827]">Upload Media</p>
                    <button
                      type="button"
                      className="mb-6 flex h-[170px] w-full flex-col items-center justify-center rounded-[10px] border border-dashed border-[#E5E7EB] bg-white transition hover:bg-[#FCFCFC]"
                      onClick={() => setSuccessText({ title: 'Successfully', subtitle: 'Media uploaded successfully' })}
                    >
                      <Upload className="mb-4 h-10 w-10 text-[#111827]" />
                      <p className="text-[18px] text-[#111827]">Upload JPG, PNG & PDF</p>
                    </button>

                    <table className="w-full min-w-[860px] text-left text-[14px]">
                      <thead>
                        <tr className="border-b border-[#E5E7EB] bg-[#FAFAFA]">
                          {['Image', 'Name', 'Size', 'Actions'].map((h) => (
                            <th key={h} className="px-4 py-3 font-bold text-[#111827]">
                              {h}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {mediaRows.map((row) => (
                          <tr key={row.id} className="border-b border-[#E5E7EB] hover:bg-[#FAFAFA]">
                            <td className="px-4 py-3">
                              <img src={row.image} alt={row.name} className="h-16 w-16 rounded-md object-cover" />
                            </td>
                            <td className="px-4 py-3 text-[#111827]">{row.name}</td>
                            <td className="px-4 py-3 text-[#111827]">{row.size}</td>
                            <td className="px-4 py-3">{rowActionMenu(row.id, row.name)}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </>
                )}
              </div>
            ) : null}
          </div>
        </>
      ) : (
        <div className="rounded-[10px] border border-[#E5E7EB] bg-white p-6 shadow-sm sm:p-8">
          <h2 className="mb-6 text-[22px] font-bold leading-tight text-[#111827] sm:text-[24px]">{editState.title}</h2>
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className={adminLabelCaps}>{editState.leftLabel}</label>
                <input
                  value={editState.leftValue}
                  onChange={(e) => setEditState((prev) => (prev ? { ...prev, leftValue: e.target.value } : prev))}
                  className={adminInput}
                />
              </div>
              <div>
                <label className={adminLabelCaps}>{editState.rightLabel}</label>
                <input
                  value={editState.rightValue}
                  onChange={(e) => setEditState((prev) => (prev ? { ...prev, rightValue: e.target.value } : prev))}
                  className={adminInput}
                />
              </div>
            </div>
            <div>
              <label className={adminLabelCaps}>Status</label>
              <select
                className={adminInput}
                value={editState.status}
                onChange={(e) => setEditState((prev) => (prev ? { ...prev, status: e.target.value as CmsStatus } : prev))}
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
            {editState.kind === 'location' ? (
              <div>
                <label className={adminLabelCaps}>Areas</label>
                <input
                  value={editState.areaValue}
                  onChange={(e) => setEditState((prev) => (prev ? { ...prev, areaValue: e.target.value } : prev))}
                  className={adminInput}
                />
              </div>
            ) : null}
            <div>
              <label className={adminLabelCaps}>Description</label>
              <textarea
                value={editState.description}
                placeholder="Type here..."
                onChange={(e) => setEditState((prev) => (prev ? { ...prev, description: e.target.value } : prev))}
                className={`${adminInput} min-h-[200px] resize-y`}
              />
            </div>
          </div>
          <div className="mt-8 flex justify-end gap-3 border-t border-[#F3F4F6] pt-6">
            <button
              type="button"
              onClick={() => setEditState(null)}
              className="rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-[14px] font-medium text-[#374151] transition hover:bg-[#F9FAFB]"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={submitForm}
              className="rounded-lg px-6 py-2.5 text-[14px] font-semibold text-white shadow-sm transition hover:opacity-95"
              style={{ backgroundColor: ADMIN_ACCENT_MUTED }}
            >
              {editState.id ? 'Update' : 'Save'}
            </button>
          </div>
        </div>
      )}

      {deleteTarget ? (
        <div className={adminModalBackdrop} onClick={() => setDeleteTarget(null)} role="presentation">
          <div className={adminModalPanel} onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[#FECACA] bg-[#FEE2E2]">
              <Trash2 className="h-7 w-7 text-[#EF4444]" strokeWidth={2} />
            </div>
            <p className="text-xl font-bold text-[#111827]">Are You Sure?</p>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6B7280]">
              Are you sure you want to delete this {actionLabelForDelete(deleteTarget.label)}?
            </p>
            <p className="mt-1 text-[13px] text-[#9CA3AF]">This action can not be undone.</p>
            <div className="mt-6 flex justify-center gap-3">
              <button
                type="button"
                className="min-w-[100px] rounded-lg border border-[#E5E7EB] bg-white px-5 py-2.5 text-[14px] font-medium text-[#374151] transition hover:bg-[#F9FAFB]"
                onClick={() => setDeleteTarget(null)}
              >
                Cancel
              </button>
              <button
                type="button"
                className="min-w-[100px] rounded-lg px-5 py-2.5 text-[14px] font-semibold text-white transition hover:opacity-95"
                style={{ backgroundColor: ADMIN_ACCENT_MUTED }}
                onClick={() => {
                  setDeleteTarget(null)
                  setOpenRowMenu(null)
                  setSuccessText({ title: 'Successfully', subtitle: 'Changes Saved Successfully' })
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}

      {statusTarget ? (
        <div className={adminModalBackdrop} onClick={() => setStatusTarget(null)} role="presentation">
          <div className={adminModalPanel} onClick={(e) => e.stopPropagation()}>
            <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#F3F4F6] text-[#B89F7C]">
              <HelpCircle className="h-8 w-8" strokeWidth={1.75} />
            </div>
            <p className="text-xl font-bold text-[#111827]">Activate / Deactivate</p>
            <p className="mt-2 text-[14px] leading-relaxed text-[#6B7280]">Please activate / deactivate your content listing.</p>
            <label className="mt-5 inline-flex cursor-pointer items-center justify-center">
              <input
                type="checkbox"
                className="peer sr-only"
                checked={statusToggleValue}
                onChange={(e) => setStatusToggleValue(e.target.checked)}
              />
              <span className="relative h-8 w-[3.25rem] rounded-full bg-[#E5E7EB] transition peer-checked:bg-[#B89F7C]">
                <span className={`absolute top-1 h-6 w-6 rounded-full bg-white shadow transition ${statusToggleValue ? 'left-[1.35rem]' : 'left-1'}`} />
              </span>
            </label>
            <div className="mt-6">
              <button
                type="button"
                className="w-full rounded-lg py-2.5 text-[14px] font-semibold text-white transition hover:opacity-95 sm:w-auto sm:min-w-[120px] sm:px-8"
                style={{ backgroundColor: ADMIN_ACCENT_MUTED }}
                onClick={() => {
                  setStatusTarget(null)
                  setOpenRowMenu(null)
                  setSuccessText({ title: 'Successfully', subtitle: 'Changes Saved Successfully' })
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      ) : null}

      <AdminSuccessModal
        open={Boolean(successText)}
        title={successText?.title ?? 'Successfully'}
        subtitle={successText?.subtitle ?? ''}
        variant="prominent"
        hideButton
        autoCloseMs={2000}
        onClose={() => setSuccessText(null)}
      />
    </AdminLayout>
  )

  function rowActionMenu(id: string, label: string, onEdit?: () => void) {
    const isOpen = openRowMenu === id

    const editText =
      tab === 'property-types'
        ? 'Edit Property Type'
        : tab === 'amenities'
          ? 'Edit Amenity'
          : tab === 'locations'
            ? 'Edit Location'
            : 'Edit Category'

    const activateText =
      tab === 'property-types'
        ? 'Activate/Deactivate Type'
        : tab === 'amenities'
          ? 'Activate/Deactivate Amenity'
          : tab === 'locations'
            ? 'Activate/Deactivate Location'
            : 'Activate/Deactivate Category'

    const matchedMedia = tab === 'media-files' ? mediaRows.find((r) => r.id === id) ?? null : null

    return (
      <div className="relative inline-flex" ref={isOpen ? rowMenuRef : undefined}>
        <button
          type="button"
          aria-label="Row actions"
          onClick={() => setOpenRowMenu(isOpen ? null : id)}
          className="flex h-9 w-9 items-center justify-center rounded-full border border-[#F3F4F6] bg-[#FAFAFA] text-[#6B7280]"
        >
          <MoreVertical className="h-4 w-4" />
        </button>
        {isOpen ? (
          <div className="absolute right-0 top-full z-40 mt-1 w-44 rounded-lg border border-[#E5E7EB] bg-white py-1 shadow-lg">
            {tab !== 'media-files' ? (
              <button
                type="button"
                onClick={() => {
                  onEdit?.()
                  setOpenRowMenu(null)
                }}
                className="w-full px-3 py-2 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
              >
                {editText}
              </button>
            ) : null}
            {tab === 'media-files' ? (
              <button
                type="button"
                onClick={() => {
                  setOpenRowMenu(null)
                  if (matchedMedia) {
                    setMediaPreview(matchedMedia)
                    setMediaPreviewImage(matchedMedia.image)
                  }
                }}
                className="w-full px-3 py-2 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
              >
                View Media
              </button>
            ) : (
              <button
                type="button"
                onClick={() => {
                  setStatusToggleValue(true)
                  setStatusTarget({ id, label, active: true })
                }}
                className="w-full px-3 py-2 text-left text-[13px] text-[#374151] hover:bg-[#F9FAFB]"
              >
                {activateText}
              </button>
            )}
            <button
              type="button"
              onClick={() => setDeleteTarget({ id, label })}
              className="w-full px-3 py-2 text-left text-[13px] text-[#DC2626] hover:bg-red-50"
            >
              {tab === 'media-files' ? 'Delete Media' : 'Delete'}
            </button>
          </div>
        ) : null}
      </div>
    )
  }
}
