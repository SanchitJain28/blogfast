"use client"
import { authContext } from '@/app/context/AuthContext';
import { Input } from '@/components/ui/input';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useContext, useState } from 'react'

export default function BlogImageUpload() {
    const {blogImage}=useContext(authContext)
    const router=useRouter()
    const { toast } = useToast()
    const [imagePreview, setImagePreview] = useState(''); // State for image prev
    const [imageUrl, setImageUrl] = useState('');
    const [isUploadingImage, setIsUploadingImage] = useState(false)
    const [progress, setProgress] = useState<number>(0)
    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        const files = e.target.files;
        if (!files) return;
        const file = files[0];
        if (file) {
            setIsUploadingImage(true)
            setProgress(20)
            
            const previewUrl = URL.createObjectURL(file);
            setImagePreview(previewUrl); // Set the preview URL

            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', 'blog_images'); // Replace with your upload preset
            console.log(file)
            try {
                const response = await fetch(
                    `https://api.cloudinary.com/v1_1/dgemvdcue/image/upload`,
                    {
                        method: 'POST',
                        body: formData,
                    }
                );

                const data = await response.json()
                console.log(data.secure_url)
                if (data.secure_url) {
                    setImageUrl(data.secure_url); // Set the image URL
                    toast({
                        title: "image uploaded",
                        description: "image uploaded successfully ",
                        className: "bg-green-500 text-black border-green-500"
                    })
                } else {
                    console.error('Error uploading image:', data);
                }
            } catch (error) {
                console.error('Error uploading image:', error);
            } finally {
                setIsUploadingImage(false);
                setProgress(100)
            }
        }
    };
    return (
        <div className='p-20 flex flex-col'>
            {isUploadingImage && <Progress value={progress} className='my-4' />}

            <p className='text-lg text-zinc-400 my-4'>
            Upload a picture that complements your blog post to make it more engaging and visually appealing. Choose an image that is relevant to your content, whether it a featured image, an illustration, or a photograph that enhances your message. A well-chosen picture not only grabs attention but also improves readability and SEO. Make sure your image is high-quality and appropriately sized for the best user experience.
            </p>
            <form className='my-4'>
                <label
                    htmlFor="image"
                    className="bg-black text-white border border-zinc-400 rounded-lg w-full py-2 px-4 cursor-pointer inline-block text-center"
                >
                    Choose File
                </label>
                <Input
                    type="file"
                    id="image"
                    accept="image/*"
                    onChange={handleImageUpload}
                    required
                    className='hidden bg-black text-white border border-zinc-400 rounded-lg w-full '
                />
            </form>
            {/* //IMAGE PREVIEW */}
            <p className='text-lg text-zinc-400 my-4'>Your images : </p>
            {imagePreview && (
                <div>
                    <Image
                        width={500}
                        height={0}
                        src={imagePreview}
                        alt="Preview"
                        className='rounded-lg lg:h-60 h-48 lg:w-[500px] w-40'
                    />
                </div>
            )}
            <p className='text-white text-lg'>{isUploadingImage ? "uploading" : ""}</p>
            <button className='p-4 rounded-lg text-white text-lg border border-zinc-700 my-4' onClick={()=>{
                if(imageUrl!==""){
                    router.push("content")
                    return
                }
                toast({
                    title: "image",
                    description: "add atleast 1 image",
                    className: "bg-yellow-500 text-black border-green-500"
                })
            }}>Next</button>
        </div>
    )
}
