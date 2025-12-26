export default function PropertiesPanel() {
  return (
    <div className="flex h-full items-start justify-between px-4 py-2 text-xs">
      <div className="font-semibold text-slate-600">
        Properties 
      </div>
      <button
        type="button"
        className="rounded border border-slate-300 px-2 py-1 text-[11px] text-slate-600 hover:bg-slate-50 bg-white">
        close
      </button>
    </div>
  );
}
