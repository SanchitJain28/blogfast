"use client";

import { useState } from "react";

export function useImageUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const uploadImage = async (file: File) => {
    if (!file) return;

    setIsUploading(true);
    setUploadComplete(false);
    setUploadProgress(0);
    setError(null);

    // Simulate upload progress
    let progress = 0;
    const interval = setInterval(() => {
      if (progress >= 90) {
        clearInterval(interval);
        return;
      }
      progress += 10;
      setUploadProgress(progress);
    }, 200);

    const previewUrl = URL.createObjectURL(file);
    setPreviewImage(previewUrl);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "blog_images");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dgemvdcue/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();

      if (data.secure_url) {
        setImageUrl(data.secure_url);
        localStorage.setItem("blogImage", data.secure_url);
        setUploadProgress(100);
        setUploadComplete(true);
      } else {
        throw new Error("Upload failed");
      }
    } catch (err) {
      console.error("Image upload error:", err);
      setError("Image upload failed");
      setPreviewImage(null);
      setImageUrl(null);
    } finally {
      clearInterval(interval);
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadImage(file);
    }
  };

  return {
    handleFileChange,
    uploadImage,
    isUploading,
    uploadComplete,
    uploadProgress,
    previewImage,
    imageUrl,
    error,
  };
}
