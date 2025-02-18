"use client"
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { headerSchemma } from '@/app/Schemmas/blogSchemma/schemma';
export default function CreateBlog() {
  const { toast } = useToast()
  const [imagePreview, setImagePreview] = useState(''); // State for image prev
  // iew
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(headerSchemma),
    defaultValues:{
      title:"fuck that ass"
    }
  })
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  const [blogTitle, setBlogTitle] = useState<string>("")
  const [blogContent, setBlogContent] = useState<string>("")
  const [headings, setHeadings] = useState([
    { title: "Heading 1", content: "" },
    { title: "Heading 2", content: "" },
    { title: "Heading 3", content: "" },
  ])
  // Handle image upload to Cloudinary
  const handleImageUpload = async (e: any) => {
    e.preventDefault();

    const file = e.target.files[0];
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

  // Handle form submission
  const handleSubmitForm = (e: any) => {
    e.preventDefault();
    try {
      setIsUploading(true)
    } catch (error) {
      console.log(error)
      toast({
        title: "Form submission",
        description: "Blog cannot be created",
        className: "bg-green-500 text-black border-green-500"
      })
    }
    finally {
      setIsUploading(false);
    }
    console.log('Form submitted. Image URL:', imageUrl);
    // Add your logic to handle the form submission (e.g., save blog data to Supabase)
  };

  return (
    <div className='lg:px-40 lg:py-12 p-8'>
      {/* IMAGE UPLOAD SECTION */}
      <p className='text-zinc-200 text-4xl font-bold my-8'>Upload a image for your blog</p>
      <div className="flex justify-between">
        <div className="flex flex-col basis-2/3">
          {isUploadingImage && <Progress value={progress} className='my-4' />}
          <form onSubmit={handleSubmitForm}>
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
            <button type="submit" disabled={isUploading}>Create Blog</button>
          </form>
          <p className='text-zinc-500 font-sans lg:text-lg text-sm'>Please upload an image relevant to your blog post. This image will be displayed as the featured image, making your post more engaging and visually appealing.
            <span className='lg:inline hidden'>Ensure the image is clear, high-quality, and properly represents the content of your blog. Supported formats: JPG, PNG, and WEBP.</span> </p>
        </div>
        <div className="flex flex-col px-4">
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
        </div>
      </div>
      {/* CONTENT SECTION FOR THE BLOG */}
      <form onSubmit={handleSubmit(handleSubmitForm)}>
        {headings.map((e, index: number) => {
          return <div className="" key={index}>
            <div className="flex" key={index}>
            {/* onChange={(event) => {
                e.title = event.target.value
              }} */}
              <Input key={Math.random()} type='text' placeholder={`${e.title}`} {...register("title")}  className='focus:outline-none my-4 bg-black text-white p-2 border border-zinc-700' />
              <button onClick={() => {
                const filteredHeadings = headings.filter((heading) => {
                  if (headings.length > 3) {
                    return heading.title !== e.title
                  }
                  toast({
                    title: "delete",
                    description: "minimum 3 heading are required",
                    className: "bg-red-700 text-black border-red-700"
                  })
                  return headings

                })
                setHeadings(filteredHeadings)
              }} className=' mx-4 bg-black text-white  rounded-lg'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg></button>
            </div>
            <p className='text-white text-lg'>{errors.title?.message}</p>

          </div>

        })}
      </form>
      <button onClick={() => {
        setHeadings([...headings, { title: `heading ${headings.length + 1}`, content: "" }])
      }} className='bg-black text-white border p-4 border-blue-600 rounded-lg text-lg'>Add a heading</button>
    </div>
  );
}