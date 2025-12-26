export function HeroBlock({ data, onChange }) {
  const update = (patch) => onChange({ ...data, ...patch });

  return (
    <div className="space-y-2 text-xs">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 flex-shrink-0 overflow-hidden rounded-full bg-slate-200">
          {data.avatarUrl ? (
            <img
              src={data.avatarUrl}
              alt="Profile"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-[10px] text-slate-500">
              Photo
            </div>
          )}
        </div>
        <input
          className="w-full rounded border border-slate-300 px-2 py-1"
          placeholder="Image URL"
          value={data.avatarUrl ?? ""}
          onChange={(e) => update({ avatarUrl: e.target.value })}
        />
      </div>

      <input
        className="w-full rounded border border-slate-300 px-2 py-1"
        placeholder="Name"
        value={data.name ?? ""}
        onChange={(e) => update({ name: e.target.value })}
      />

      <input
        className="w-full rounded border border-slate-300 px-2 py-1"
        placeholder="Designation"
        value={data.designation ?? ""}
        onChange={(e) => update({ designation: e.target.value })}
      />
    </div>
  );
}
