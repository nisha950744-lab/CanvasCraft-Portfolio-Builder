// cloudinary.js
const CLOUD_NAME ="dnib66ipy"
const UPLOAD_PRESET = "canvasx";

export async function uploadToCloudinary(file) {
  const url = `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`;

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", UPLOAD_PRESET);

  const res = await fetch(url, {
    method: "POST",
    body: formData,
  });

  const data = await res.json();
  if (!res.ok) throw new Error(data.error?.message || "Upload failed");

  // data.secure_url is the hosted image URL
  return data.secure_url; // [web:520][web:529][web:523]
}
