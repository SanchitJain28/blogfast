"use client"
import { toast } from '@/hooks/use-toast'
import axios, { AxiosError } from 'axios'
import Link from 'next/link'
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
        <div className='lg:mx-8 mx-2  lg:p-20 p-4 rounded-lg '>
            <div className="flex flex-row justify-between">
                {/* <Carousel className='m-auto my-8 w-1/2'>
                    <CarouselContent>
                        <CarouselItem className='rounded-lg '><img className='w-full h-full aspect-3/2' src='https://www.elegantthemes.com/blog/wp-content/uploads/2018/11/shutterstock_1049564585-960.jpg' /></CarouselItem>
                        <CarouselItem><img src='https://www.elegantthemes.com/blog/wp-content/uploads/2018/11/shutterstock_1049564585-960.jpg' /></CarouselItem>
                        <CarouselItem><img src='https://www.elegantthemes.com/blog/wp-content/uploads/2018/11/shutterstock_1049564585-960.jpg' /></CarouselItem>
                    </CarouselContent>
                    <CarouselPrevious />
                    <CarouselNext />
                </Carousel> */}
                <div className=" py-8 my-8 px-8 border bg-blue-600 border-zinc-600 rounded-lg">
                    <p className='text-blank font-bold lg:text-2xl font-sans'>a unique platform where creativity meets artificial intelligence! Explore a world of engaging, thought-provoking, and innovative blogs generated with the help of AI. Whether you are looking for inspiring stories, insightful articles, or captivating reads, our AI-powered blog app brings you a seamless reading experience.</p>
                    <div className="flex my-2">
                        <button className='text-white bg-black lg:py-4 py-2 lg:px-8 px-4  font-sans font-bold lg:text-lg rounded-lg basis-1/2 mr-2'>
                            <Link href="/signUp" className='w-full'>Create  Account</Link>
                        </button>
                        <button className='text-white bg-black py-4 px-8 basis-1/2 font-sans font-bold lg:text-lg rounded-lg '>
                            <Link href="/login" className='w-full'>login</Link>
                        </button>
                    </div>
                    <button className='text-white bg-black py-4 px-8 w-full font-sans  font-bold lg:text-lg rounded-lg '>
                        <Link href="/createBlog" className='w-full'>Create a blog</Link>
                    </button>
                </div>
            </div>

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
