"use client"
import { useState } from 'react';
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { useToast } from '@/hooks/use-toast';
import Image from 'next/image';
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod"
import { blogSectionSchemma } from '@/app/Schemmas/blogSchemma/schemma';
import { DndContext, useDroppable } from '@dnd-kit/core';
import { Draggable } from './Draggable';
import { Droppable } from './Droppable';
export default function CreateBlog() {
  //TOAST
  const { toast } = useToast()
  const {isOver, setNodeRef} = useDroppable({
    id: 'droppable',
  });
  //DRAGGABLE AND DROPPABLE CONTENT

  //ALL THE STATES
  const [imagePreview, setImagePreview] = useState(''); // State for image prev
  const [imageUrl, setImageUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [progress, setProgress] = useState<number>(0)
  // const [blogTitle, setBlogTitle] = useState<string>("")
  // const [blogContent, setBlogContent] = useState<string>("")
  const [sections, setSections] = useState([
    { title: "Heading 1", content: "" },
    { title: "Heading 2", content: "" },
    { title: "Heading 3", content: "" },
  ])

  //ALL THE FORM SHIT
  const { register, handleSubmit, formState: { errors }, control } = useForm({
    resolver: zodResolver(blogSectionSchemma)
  })
  const { fields, append, remove } = useFieldArray({
    control,
    name: "section"
  });
  //IMAGE UPLOAD
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
  //the first parameter will give you data
  const handleSubmitForm = (data) => {
    console.log(data)
  };

  return (
    <DndContext>
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
          {sections.map((e, index: number) => {
            const errorForFieldHeading = errors?.section?.[index]?.heading;
            const errorForFieldContent = errors?.section?.[index]?.content;

            return <div className="" key={index} ref={setNodeRef}>
              <div className="flex flex-col basic-2/3">
                <Input key={e.id} type='text' placeholder={`${e.title}`} {...register(`section.${index}.heading`)} className='focus:outline-none my-4 bg-black text-white p-2 border border-zinc-700' />
                <p className='text-sm text-red-600'>{errorForFieldHeading?.message}</p>

                <Input key={e.id} type='text' placeholder={`${e.title}`} {...register(`section.${index}.content`)} className='focus:outline-none my-4 bg-black text-white p-2 border border-zinc-400' />
                <p className='text-sm text-yellow-600'>{errorForFieldContent?.message}</p>

              </div>

              <button onClick={() => {
                const filteredHeadings = sections.filter((heading) => {
                  if (sections.length > 3) {
                    return heading.title !== e.title
                  }
                  toast({
                    title: "delete",
                    description: "minimum 3 heading are required",
                    className: "bg-red-700 text-black border-red-700"
                  })
                  return sections
                })
                setSections(filteredHeadings)
              }} className=' mx-4 bg-black text-white  rounded-lg'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg></button>
            </div>
          })}
          <button type='submit' className='bg-black text-white border p-4 border-blue-600 rounded-lg text-lg'>
            Submit
          </button>
        </form>
        <button onClick={() => {
          setSections([...sections, { title: `heading ${sections.length + 1}`, content: "" }])
        }} className='bg-black text-white border p-4 border-blue-600 rounded-lg text-lg'>Add a heading</button>
      </div>
    </DndContext>
  );
}