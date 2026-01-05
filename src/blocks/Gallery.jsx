
import { uploadToCloudinary } from "../utils/cloudinary";

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
  const handleFileChange = async (id,e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      // 1) upload file to Cloudinary
      const url = await uploadToCloudinary(file);

      // 2) store Cloudinary URL in block data
      updateImage(id, url);
      
    } catch (err) {
      console.error("Cloudinary upload failed", err);
    }
  };
 

  return (
    <div className="space-y-2 text-xs">
      {images.map((img, index) => (
        <div key={img.id} className="flex items-center gap-2">
          {/* hidden file input per image */}
          <input
            id={`gallery-input-${img.id}`}
            type="file"
            accept="image/*"//accepts any image type image/png,image/jpg
            className="hidden"
            onChange={(e) => handleFileChange(img.id, e)}
          />

          {/* resizable image area */}
          <label
            htmlFor={`gallery-input-${img.id}`}//htmlFor links a <label> to a form element (like an input)
            className="relative block h-28 w-40 resize overflow-auto  rounded border border-slate-300 bg-slate-100 cursor-pointer"
            style={{ minWidth: "120px", minHeight: "80px" }}
          >
            {img.url ? (
              <img
                src={img.url}
                alt={`Gallery ${index + 1}`}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-[11px] text-slate-500">
                Click to upload
              </div>
            )}
          </label>

          {/* remove */}
          <button
            type="button"
            onClick={() => removeImage(img.id)}
            className="rounded bg-red-50 px-2 py-1 text-[11px] text-red-500"
          >
            x
          </button>
        </div>
      ))}

      {/* add new image (+ icon) */}
      <button
        type="button"
        onClick={addImage}
        className="inline-flex items-center gap-1 rounded bg-slate-100 px-2 py-1 text-[11px] text-slate-700"
      >
        <span className="text-sm font-semibold">+</span>
        <span>Add image</span>
      </button>
    </div>
  );
}
