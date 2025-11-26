// src/components/ui/Select.jsx
export default function Select({ label, children, ...props }) {
  return (
    <label className="block text-sm">
      {label && <div className="mb-2 text-gray-300">{label}</div>}
      <select
        {...props}
        className="w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 text-white"
      >
        {children}
      </select>
    </label>
  )
}
