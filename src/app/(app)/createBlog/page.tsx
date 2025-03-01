"use client"

import Link from "next/link";


export default function CreateBlog() {

  return (
    <div className='lg:px-40 lg:py-12 p-8'>
      <p className="text-white text-2xl font-bold text-green-400 my-2 underline font-mono">Create a blog</p>
      <div className="my-8">
        <p className="text-xl text-zinc-200 my-2 font-sans">How to Create a Good Blog: Writing Engaging and Meaningful Contents</p>
        <p className="text-zinc-500 font-sans my-4">Creating a good blog requires a balance of valuable content, engaging writing, and proper formatting to keep readers interested. A well-structured blog not only captures attention but also ensures clarity and easy navigation for the reader. Below are some key steps to write an interesting and meaningful blog, along with tips on using headings and subheadings effectively.</p>
        <p className="text-zinc-500 font-sans">
          🌟 Features:<br/>
          ✅ AI-Generated Creative Blogs<br/>
          ✅ Easy-to-Navigate Interface<br/>
          ✅ Diverse Topics & Categories<br/>
          ✅ Regularly Updated Content<br/>
        </p>
      </div>
      <Link href="createBlog/blogImageUpload" className="text-white bg-blavk border border-zinc-400 p-4 rounded-lg">Create blog</Link>
    </div>
  );
}
