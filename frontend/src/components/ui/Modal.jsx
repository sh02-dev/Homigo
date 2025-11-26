export default function Modal({open, onClose, title, children}){
  if(!open) return null
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/60" onClick={onClose}></div>
      <div className="w-full max-w-xl p-6 panel z-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400">✕</button>
        </div>
        <div>{children}</div>
      </div>
    </div>
  )
}
