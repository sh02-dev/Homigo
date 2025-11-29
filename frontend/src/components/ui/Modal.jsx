export default function Modal({ open, onClose, title, children }) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
      {/* overlay: behind the panel */}
      <div
        className="absolute inset-0 bg-black/60 z-40"
        onClick={onClose}
      />

      {/* panel: fully opaque gradient stops, no 'panel' class, sits above overlay */}
      <div
        className="relative z-50 w-full max-w-xl p-6 rounded-2xl
                   bg-gradient-to-b from-[#0F1115] to-[#0B0D10]
                   shadow-xl max-h-[90vh] overflow-y-auto"
        role="document"
      >
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold">{title}</h3>
          <button onClick={onClose} className="text-gray-400 p-1 rounded hover:bg-white/5" aria-label="Close">✕</button>
        </div>

        <div>{children}</div>
      </div>
    </div>
  );
}
