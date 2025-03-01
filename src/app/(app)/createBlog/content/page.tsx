"use client"
import React, { useEffect, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import AIBlog from '../../components/AiBlog'
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';

export default function BlogContent() {

    const editorRef = useRef<Editor | null>(null);

    const [isUploading, setIsUploading] = useState(false);
    const [blogTitle, setBlogTitle] = useState<string | null>(null)
    const [blogContent, setBlogContent] = useState<string>('');
    const [blogImage,setBlogImage]=useState<string | null>(null)
    const onSubmit = async (event: React.FormEvent) => {
        const blogImage = localStorage.getItem('blogImage')
        event.preventDefault()
        setIsUploading(true)
        try {
            const response = await axios.post("/api/createBlog", {
                content: blogContent,
                images: blogImage ? blogImage : "noImage"
            })
            console.log(response)
            toast({
                title: "Success",
                description: "Blog saved successfully",
                className: "bg-green-500 text-black"
            })
        } catch (error) {
            console.log(error)
            toast({
                title: "Error",
                description: "An error occurred while saving your blog",
                className: "bg-red-500 text-black"
            })
        }
        finally {
            setIsUploading(false)
        }
    }
    useEffect(()=>{
        if(localStorage.getItem("blogImage")){
            setBlogImage(localStorage.getItem("blogImage") as string)
        }
        if(localStorage.getItem("blogContent")){
            setBlogContent(localStorage.getItem("blogContent") as string)
        }
    },[])
    return (
        <div>
            <form onSubmit={onSubmit}>
                <div className="p-8">
                    <div className="flex justify-between">
                        <p className='text-white text-xl font-sans '>{blogTitle ? blogTitle : "No title "}</p>
                        <button disabled={isUploading} type="submit" className={`${isUploading ? "bg-yellow-600" : "bg-black"} text-white basis-1/3 text-lg border border-zinc-600 p-4 rounded`}>{isUploading ? "Submitting" : "Submit"}</button>
                    </div>
                    <Input className="bg-black border border-zinc-400 rounded-lg text-white text-xl my-4" placeholder='Title for your blog' value={blogTitle ? blogTitle : "no title"} onChange={(e) => {
                        setBlogTitle(e.target.value)
                    }} />
                    <Editor
                    value={blogContent}
                        apiKey='6p1aqw5kkmimf1n9npynfg07vo395qljgid959bnynvrukmp'
                        onInit={(evt, editor) => editorRef.current = editor}
                        initialValue="<p>This is the initial content of the editor.</p>"
                        init={{

                            content_css: "dark",
                            skin: "oxide-dark",
                            height: 500,
                            menubar: false,
                            plugins: [
                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                            ],
                            toolbar: 'undo redo | blocks | ' +
                                'bold italic forecolor | alignleft aligncenter ' +
                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                'removeformat | help',
                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:20px }'

                        }}
                        onEditorChange={(e) => {
                            setBlogContent(e)
                            localStorage.setItem("blogContent", e)
                            console.log(e)
                        }}

                    />

                </div>
            </form>
            <div className="flex justify-between ">
                <div className="w-full">
                <AIBlog />
                </div>
                {blogImage && <img src={blogImage} className='w-80 h-80 mx-12 my-28 hidden lg:block rounded-lg' />
            }
            </div>
        </div>
    )
}




