export function AboutBlock({ data, onChange }) {
  const update = (patch) => onChange({ ...data, ...patch });

  return (
    <div className="space-y-2 text-xs">
      <textarea
        className="h-16 w-full rounded border border-slate-300 px-2 py-1"
        placeholder="Short introduction"
        value={data.intro ?? ""}
        onChange={(e) => update({ intro: e.target.value })}
      />
      <textarea
        className="h-16 w-full rounded border border-slate-300 px-2 py-1"
        placeholder="Field of work"
        value={data.fieldOfWork ?? ""}
        onChange={(e) => update({ fieldOfWork: e.target.value })}
      />
    </div>
  );
}