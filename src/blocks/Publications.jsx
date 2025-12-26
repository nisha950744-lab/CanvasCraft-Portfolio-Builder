export function PublicationsBlock({ data, onChange }) {
  const items = data.items ?? [];

  const updateItems = (next) =>
    onChange({ ...data, items: next });

  const addPublication = () => {
    updateItems([
      ...items,
      {
        id: Date.now(),
        title: "",
        journal: "",
        year: "",
        authors: [""],
      },
    ]);
  };

  const updatePublication = (id, patch) => {
    updateItems(
      items.map((p) => (p.id === id ? { ...p, ...patch } : p))
    );
  };

  const addAuthor = (pubId) => {
    updateItems(
      items.map((p) =>
        p.id === pubId
          ? { ...p, authors: [...(p.authors ?? []), ""] }
          : p
      )
    );
  };

  const updateAuthor = (pubId, index, value) => {
    updateItems(
      items.map((p) => {
        if (p.id !== pubId) return p;
        const nextAuthors = [...(p.authors ?? [])];
        nextAuthors[index] = value;
        return { ...p, authors: nextAuthors };
      })
    );
  };

  return (
    <div className="space-y-3 text-xs">
      {items.map((pub) => (
        <div
          key={pub.id}
          className="rounded border border-slate-200 bg-slate-50 p-2 space-y-2"
        >
          <input
            className="w-full rounded border border-slate-300 px-2 py-1"
            placeholder="Title of published work"
            value={pub.title}
            onChange={(e) =>
              updatePublication(pub.id, { title: e.target.value })
            }
          />
          <input
            className="w-full rounded border border-slate-300 px-2 py-1"
            placeholder="Journal / Conference"
            value={pub.journal}
            onChange={(e) =>
              updatePublication(pub.id, { journal: e.target.value })
            }
          />
          <input
            className="w-full rounded border border-slate-300 px-2 py-1"
            placeholder="Year"
            value={pub.year}
            onChange={(e) =>
              updatePublication(pub.id, { year: e.target.value })
            }
          />

          <div className="space-y-1">
            <div className="font-semibold text-slate-600">Authors</div>
            {(pub.authors ?? []).map((author, index) => (
              <input
                key={index}
                className="w-full rounded border border-slate-300 px-2 py-1"
                placeholder={`Author ${index + 1}`}
                value={author}
                onChange={(e) =>
                  updateAuthor(pub.id, index, e.target.value)
                }
              />
            ))}
            <button
              type="button"
              onClick={() => addAuthor(pub.id)}
              className="rounded bg-slate-100 px-2 py-1 text-[11px] text-slate-700"
            >
              + Add author
            </button>
          </div>
        </div>
      ))}
      <button
        type="button"
        onClick={addPublication}
        className="rounded bg-slate-100 px-2 py-1 text-[11px] text-slate-700"
      >
        + Add publication
      </button>
    </div>
  );
}