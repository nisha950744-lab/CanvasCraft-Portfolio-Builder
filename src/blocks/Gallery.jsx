export function GalleryBlock({ data, onChange }) {
  const images = data.images ?? [];

  const addImage = () => {
    onChange({
      ...data,
      images: [...images, { id: Date.now(), url: "" }],
    });
  };

  const updateImage = (id, url) => {
    onChange({
      ...data,
      images: images.map((img) => (img.id === id ? { ...img, url } : img)),
    });
  };

  const removeImage = (id) => {
    onChange({
      ...data,
      images: images.filter((img) => img.id !== id),
    });
  };

  return (
    <div className="space-y-2 text-xs">
      {images.map((img) => (
        <div key={img.id} className="flex items-center gap-2">
          <input
            className="flex-1 rounded border border-slate-300 px-2 py-1"
            placeholder="Image URL"
            value={img.url}
            onChange={(e) => updateImage(img.id, e.target.value)}
          />
          <button
            type="button"
            onClick={() => removeImage(img.id)}
            className="rounded bg-red-50 px-2 py-1 text-[11px] text-red-500"
          >
            x
          </button>
        </div>
      ))}
      <button
        type="button"
        onClick={addImage}
        className="rounded bg-slate-100 px-2 py-1 text-[11px] text-slate-700"
      >
        +Add image
      </button>
    </div>
  );
}