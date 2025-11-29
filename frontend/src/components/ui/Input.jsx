export default function Input({label, ...props}){
  return (
    <label className="block text-sm">
      {label && <div className="mb-2 text-gray-300">{label}</div>}
      <input {...props} className="w-full bg-transparent border border-gray-700 rounded-md px-3 py-2 placeholder-gray-500 focus:ring-2 focus:ring-gray-400 outline-none" />
    </label>
  )
}
