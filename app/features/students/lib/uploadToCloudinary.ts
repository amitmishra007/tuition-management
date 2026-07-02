export async function uploadToCloudinary(file: File) {
  const formData = new FormData();

  formData.append("file", file);
  formData.append("upload_preset", "student_upload"); // 👈 your real preset name

  const res = await fetch(
    "https://api.cloudinary.com/v1_1/j2jsi5bv/image/upload",
    {
      method: "POST",
      body: formData,
    },
  );

  const data = await res.json();

  if (!res.ok) {
    throw new Error(data.error?.message || "Upload failed");
  }

  return data.secure_url as string;
}
