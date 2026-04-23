import { useState } from 'react'
import { AdminLayout } from '../../components/AdminLayout'
import { AdminSuccessModal } from '../../components/AdminSuccessModal'
import { settingsTabActive, settingsTabInactive, FIGMA_BRONZE } from './theme'
import { GeneralTab } from './GeneralTab'
import { NotificationsTab } from './NotificationsTab'
import { ListingPlansTab } from './ListingPlansTab'
import { RolesTab } from './RolesTab'
import { PaymentsTab } from './PaymentsTab'

const TABS = [
  { id: 'general', label: 'General' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'listing', label: 'Listing Plans' },
  { id: 'roles', label: 'Roles & Permissions' },
  { id: 'payments', label: 'Payments' },
] as const
type SettingsTab = (typeof TABS)[number]['id']

export function SettingsPage() {
  const [tab, setTab] = useState<SettingsTab>('general')
  const [saveToast, setSaveToast] = useState(false)

  function flashSave() {
    setSaveToast(true)
  }

  return (
    <AdminLayout title="Settings">
      <div className="mx-auto w-full space-y-6 pb-8">
        <div className="flex w-full">
          {TABS.map((t, idx) => {
            const active = tab === t.id
            return (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={`flex-1 rounded-lg px-2 py-3 text-[13px] font-semibold transition-colors ${
                  active ? settingsTabActive : settingsTabInactive
                } ${idx !== TABS.length - 1 ? 'mr-2' : ''}`}
                style={active ? { backgroundColor: FIGMA_BRONZE, color: '#fff' } : undefined}
              >
                {t.label}
              </button>
            )
          })}
        </div>

        {tab === 'general' && <GeneralTab onSave={flashSave} onDiscard={() => {}} />}
        {tab === 'notifications' && <NotificationsTab onSave={flashSave} />}
        {tab === 'listing' && <ListingPlansTab onSave={flashSave} />}
        {tab === 'roles' && <RolesTab onSave={flashSave} />}
        {tab === 'payments' && <PaymentsTab onSave={flashSave} />}
      </div>

      <AdminSuccessModal
        open={saveToast}
        title="Successfully"
        subtitle="Setting successfully saved"
        variant="prominent"
        hideButton
        autoCloseMs={2000}
        onClose={() => setSaveToast(false)}
      />
    </AdminLayout>
  )
}
