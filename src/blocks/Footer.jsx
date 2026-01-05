export function FooterBlock({ data, onChange }) {
  return (
    <textarea
      className="h-full w-full rounded border border-slate-300 px-2 py-1 text-xs"
      placeholder="add footer"
      value={data.footerText ?? ""}
      onChange={(e) => onChange({ ...data, footerText: e.target.value })}
    />
  );
}