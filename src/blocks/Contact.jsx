export function ContactBlock({ data, onChange }) {
  const update = (patch) => onChange({ ...data, ...patch });

  return (
    <div className="space-y-2 text-xs">
      <input
        className="w-full rounded border border-slate-300 px-2 py-1"
        placeholder="Mobile number"
        value={data.phone ?? ""}
        onChange={(e) => update({ phone: e.target.value })}
      />
      <input
        className="w-full rounded border border-slate-300 px-2 py-1"
        placeholder="Email"
        value={data.email ?? ""}
        onChange={(e) => update({ email: e.target.value })}
      />
      <input
        className="w-full rounded border border-slate-300 px-2 py-1"
        placeholder="LinkedIn profile URL"
        value={data.linkedin ?? ""}
        onChange={(e) => update({ linkedin: e.target.value })}
      />
    </div>
  );
}