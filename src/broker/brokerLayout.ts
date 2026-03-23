/**
 * Shared broker panel layout — responsive across mobile, tablet, laptop, desktop.
 * Use these class strings for consistent headers, gutters, and scroll areas.
 */
export const broker = {
  accent: '#A49776',
  border: '#E5E7EB',
  pageBg: '#ffffff',
  mainBg: '#ffffff',
  font: { fontFamily: 'Arial, sans-serif' } as const,

  /** Outer shell: full viewport, no horizontal page scroll */
  shell: 'h-screen max-h-[100dvh] flex overflow-hidden min-w-0',

  /** Main column beside sidebar (sidebar is overlay on mobile, fixed width on lg+) */
  contentColumn: 'flex-1 flex flex-col lg:ml-64 min-w-0 w-full',

  /**
   * Top bar: stacks on very small screens, row from sm+.
   * Safe vertical padding on mobile so content doesn’t clip under notches.
   */
  headerRow:
    'px-4 sm:px-8 min-h-[76px] py-3 sm:py-0 sm:h-[76px] flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between sm:gap-0 w-full max-w-none',

  /** Page title in header */
  title: 'text-xl sm:text-2xl font-normal text-[#0a0a0a] truncate',
  titleSemibold: 'text-xl sm:text-2xl font-semibold text-[#0a0a0a] truncate',

  /** Scrollable main: full width, consistent horizontal padding */
  main: 'flex-1 min-h-0 overflow-y-auto overflow-x-hidden px-4 sm:px-6 lg:px-8 pt-4 sm:pt-6 pb-[max(1.5rem,env(safe-area-inset-bottom,0px))] sm:pb-8 bg-white w-full max-w-none',

  /** Horizontal scroll for wide data tables / grids */
  tableScrollWrap: 'w-full overflow-x-auto -mx-4 sm:-mx-6 lg:-mx-8 px-4 sm:px-6 lg:px-8',
} as const
