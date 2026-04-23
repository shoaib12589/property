import { FIGMA_BRONZE } from './theme'

export function SettingsToggle({
  checked,
  onChange,
  large,
  lightKnob,
  disabled,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  large?: boolean
  lightKnob?: boolean
  disabled?: boolean
}) {
  const h = large ? 'h-8 w-[3.25rem]' : 'h-7 w-12'
  const knob = large ? 'h-7 w-7 top-0.5' : 'h-6 w-6 top-0.5'
  const onPos = large ? 'left-6' : 'left-5'
  const trackOff = lightKnob ? 'bg-white/20' : 'bg-[#D1D5DB]'
  const trackOn = lightKnob ? 'bg-white/30' : ''
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={disabled}
      onClick={() => !disabled && onChange(!checked)}
      className={`relative shrink-0 rounded-full transition-colors ${disabled ? 'cursor-not-allowed opacity-50' : ''} ${h} ${
        checked ? (lightKnob ? trackOn : '') : trackOff
      }`}
      style={checked && !lightKnob ? { backgroundColor: FIGMA_BRONZE } : undefined}
    >
      <span className={`absolute rounded-full bg-white shadow transition-transform ${knob} ${checked ? onPos : 'left-0.5'}`} />
    </button>
  )
}
