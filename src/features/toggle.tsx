export default function Toggle({
  checked,
  onChange
}: {
  checked: boolean
  onChange: () => void
}) {
  return (
    <label className="plasmo-m-4 plasmo-relative plasmo-inline-block plasmo-w-[60px] plasmo-h-[34px] plasmo-cursor-pointer">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="plasmo-sr-only plasmo-peer"
      />
      <span className="plasmo-absolute plasmo-inset-0 plasmo-bg-gray-300 plasmo-rounded-[34px] plasmo-transition-all plasmo-duration-300 peer-checked:plasmo-bg-blue-500 peer-focus:plasmo-ring peer-focus:plasmo-ring-blue-300 before:plasmo-absolute before:plasmo-content-[''] before:plasmo-h-[26px] before:plasmo-w-[26px] before:plasmo-left-[4px] before:plasmo-bottom-[4px] before:plasmo-bg-white before:plasmo-rounded-full before:plasmo-transition-transform before:plasmo-duration-300 peer-checked:before:plasmo-translate-x-[26px]" />
    </label>
  )
}
