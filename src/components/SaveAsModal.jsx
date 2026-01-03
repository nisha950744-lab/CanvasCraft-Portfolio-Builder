// components/SaveAsModal.jsx
import { useState } from "react";

export default function SaveAsModal({ isOpen, initialTitle, onClose, onSave }) {
  const [title, setTitle] = useState(initialTitle || "");

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onSave(title.trim());
  };

  return (
    <div className="fixed inset-0 z-40 flex items-center justify-center bg-black/40">
      <div className="w-full max-w-sm rounded-2xl bg-white p-4 shadow-lg">
        <h2 className="text-sm font-semibold mb-2">Save as new project</h2>
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          <input
            className="w-full rounded border border-slate-300 px-2 py-1"
            placeholder="Project name"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded px-3 py-1 border border-slate-200 text-slate-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded px-3 py-1 bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-500 text-white font-semibold"
            >
              Save copy
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
