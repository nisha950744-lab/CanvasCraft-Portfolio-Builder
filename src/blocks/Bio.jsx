export function BioBlock({ data, onChange }) {
  return (
    <textarea
      className="h-full w-full rounded border border-slate-300 px-2 py-1 text-xs"
      placeholder="Detailed description of work"
      value={data.bioText ?? ""}
      onChange={(e) => onChange({ ...data, bioText: e.target.value })}
    />
  );
}