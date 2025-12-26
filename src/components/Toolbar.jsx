export default function Toolbar() {
  return (
    <div className="flex h-full items-center justify-between px-4">
      <div className="flex flex-wrap items-center gap-2 text-xs">
        <button className="rounded bg-slate-100 px-2 py-1 text-slate-700 hover:bg-slate-200">
          Undo
        </button>
        <button className="rounded bg-slate-100 px-2 py-1 text-slate-700 hover:bg-slate-200">
          Redo
        </button>
        <button className="rounded bg-slate-100 px-2 py-1 text-slate-700 hover:bg-slate-200">
          Preview
        </button>
        <button className="rounded bg-slate-100 px-2 py-1 text-slate-700 hover:bg-slate-200">
          Save Project
        </button>
        <button className="rounded bg-slate-100 px-2 py-1 text-slate-700 hover:bg-slate-200">
          Export
        </button>
      </div>
      <div className="flex items-center gap-2">
        <button className="rounded-full bg-slate-100 px-3 py-1 text-xs text-slate-700 hover:bg-slate-200">
          User
        </button>
      </div>
    </div>
  );
}
