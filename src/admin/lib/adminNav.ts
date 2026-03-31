import { ADMIN_NAV_SLUGS } from '../components/AdminSidebar'

/** First URL segment under /admin/ determines sidebar highlight (supports nested routes). */
export function getAdminActiveLabel(pathname: string): string {
  const seg = pathname.replace(/^\/admin\/?/, '').split('/')[0] || 'dashboard'
  const item = ADMIN_NAV_SLUGS.find((s) => s.slug === seg)
  return item?.label ?? 'Dashboard'
}
