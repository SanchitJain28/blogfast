"use client"
import React, { useState } from 'react'
import axios from "axios";

export default function page() {
    const [file, setFile] = useState<any>(null);
    const [uploading, setUploading] = useState(false);

    const handleFileChange = (e: any) => {
        setFile(e.target.files[0]);
    };
    const uploadImage = async (e:any) => {
        e.preventDefault()
        setUploading(true);
        try {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onloadend = async () => {
                // Upload image to Cloudinary
                const { data } = await axios.post("/api/upload", {
                    image: reader.result,
                });
                const imageUrl = data.imageUrl;
                console.log(imageUrl)
            };
        } catch (error) {
            console.error("Upload failed:", error);
            alert("Upload failed!");
        }
        finally {
            setUploading(false);
        }
    };

    return (
        <form onSubmit={uploadImage} className="max-w-lg mx-auto p-4 border rounded-lg shadow-lg">

            <div className="mb-4">
                <label className="block font-bold mb-1">Upload Image:</label>
                <input type="file" accept="image/*" onChange={handleFileChange} required />
            </div>

            <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                disabled={uploading}
            >
                {uploading ? "Uploading..." : "Submit"}
            </button>
        </form>
    )
}
