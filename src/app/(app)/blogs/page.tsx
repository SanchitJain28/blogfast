"use client"
import { toast } from '@/hooks/use-toast'
import axios, { AxiosError } from 'axios'
import React, { useEffect, useState } from 'react'

interface blog {
    blog_content: string,
    images: { imageURLs: string[] }
}
export default function Blogs() {
    const [blogs, setBlogs] = useState<blog[] | []>([])
    const fetchBlogs = async () => {
        try {
            const response = await axios.get("/api/fetchBlogs")
            console.log(response)
            setBlogs(response.data.data)
        } catch (error) {
            const axiosError = error as AxiosError
            toast({
                title: "Fetch Blogs",
                description: `Failed to fetch blogs because ${axiosError.response?.data}`,
                className: "bg-red-500 text-black"
            })
        }
    }
    useEffect(() => {
        fetchBlogs()
    }, [])
    return (
        <div className='lg:mx-8 mx-2 my-8'>
            <p className='text text-3xl text-zinc-500 font-sans mx-2'>Check out the latest Blogs</p>
            <div className="grid lg:grid-cols-4 grid-cols-1">
                {blogs.map((e, index: number) => {
                    if (e.blog_content !== "") {
                        return <div key={index} className='my-4 border border-zinc-700  rounded-lg m-4'>
                            <img src={e.images.imageURLs[0]} className='w-full h-60 rounded-lg' />

                            <p className='text text-zinc-300 font-sans lg:text-lg text-sm p-4 overflow-hidden ' dangerouslySetInnerHTML={{ __html: e.blog_content.length > 300 ? e.blog_content.slice(0, 500) + "..." : e.blog_content }} />
                        </div>
                    }
                })}
            </div>
        </div>
    )
}
