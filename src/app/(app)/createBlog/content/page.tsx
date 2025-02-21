"use client"
import React, { useRef, useState } from 'react'
import { Editor } from '@tinymce/tinymce-react';
import AIBlog from '../../components/AiBlog'

export default function BlogContent() {
   
    const editorRef = useRef<any>(null);
    const log = () => {
        if (editorRef.current) {
            console.log(editorRef.current.getContent());
        }
    };
    const [isUploading, setIsUploading] = useState(false);
    const [progress, setProgress] = useState<number>(0)
    const [blogTitle, setBlogTitle] = useState<string>("")
    const [blogContent, setBlogContent] = useState<string>("")
    const [value, setValue] = useState('');
    return (
        <div>
            <p className='text-white text-xl my-4 text-center'>Content for your blog</p>
            {/* <EditorContent className='bg-white mx-4 p-12' editor={editor} /> */}
            <div className="p-8">
            <Editor
            onChange={(e)=>{
                console.log(e.target.value)
            }}
            apiKey='6p1aqw5kkmimf1n9npynfg07vo395qljgid959bnynvrukmp'
            onInit={(_evt, editor) => editorRef.current = editor}
            initialValue="<p>This is the initial content of the editor.</p>"
            init={{
                content_css:"dark",
                skin:"oxide-dark",
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
                content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
            }}
        />
            </div>
            <AIBlog/>
        </div>
    )
}




