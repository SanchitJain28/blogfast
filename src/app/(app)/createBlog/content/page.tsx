"use client"
import React, { useContext, useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import AIBlog from '../../components/AiBlog'
import { Input } from '@/components/ui/input';
import { toast } from '@/hooks/use-toast';
import axios from 'axios';
import { authContext } from '@/app/context/AuthContext';

export default function BlogContent() {

    const editorRef = useRef<any>(null);

    const { blogImage } = useContext(authContext)
    const [isUploading, setIsUploading] = useState(false);
    const [blogTitle, setBlogTitle] = useState<string|null>(null)
    const [value, setValue] = useState('');
    const onSubmit = async (event: React.FormEvent) => {
        event.preventDefault()
        setIsUploading(true)
        try {
            const response = await axios.post("/api/createBlog", {
                content: value,
                images: blogImage
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
    return (
        <div>
            <form onSubmit={onSubmit}>
                {/* <EditorContent className='bg-white mx-4 p-12' editor={editor} /> */}
                <div className="p-8">
                    <div className="flex justify-between">
                        <p className='text-white text-xl font-sans '>{blogTitle?blogTitle:"No title "}</p>
                        <button disabled={isUploading} type="submit" className={`${isUploading?"bg-yellow-600":"bg-black"} text-white basis-1/3 text-lg border border-zinc-600 p-4 rounded`}>{isUploading ? "Submitting" : "Submit"}</button>
                    </div>
                    <Input className="bg-black border border-zinc-400 rounded-lg text-white text-xl my-4" placeholder='Title for your blog' value={blogTitle?blogTitle:"no title"} onChange={(e) => {
                        setBlogTitle(e.target.value)
                    }} />
                    <Editor
                        apiKey='6p1aqw5kkmimf1n9npynfg07vo395qljgid959bnynvrukmp'
                        onInit={(_evt, editor) => editorRef.current = editor}
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
                            setValue(e)
                            console.log(e)
                        }}

                    />
                </div>
                {/* <button type='submit' className="rounded-lg bg-black text-black  bg-white  border border-zinc-400 font-sans text-lg p-4">Save Blog</button> */}

            </form>
            <AIBlog />
        </div>
    )
}




