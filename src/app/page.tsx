"use client"
import Link from "next/link";
import { createClient } from "./utils/supabase/client";
import { useContext, useEffect, useState } from "react";
import { authContext } from "./context/AuthContext";


export default function Home() {
  const { user, setUser } = useContext(authContext)
  const getUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
  }
  useEffect(() => {
    getUser()
  }, [])
  if (user) {
    return <div className="">
      <p className="text-white text-4xl my-8 mx-4 ">
        You have signed in man {user.email}
      </p>
      <p className="text-2xl font-bold text-zinc-400 mx-4 my-4">Publish a blog</p>

    </div>
  }

  return (
    <div className="p-20">
      <h1 className="text-white text-xl text-center font-mono">BlogFast: Revolutionize Your Blogging Experience with AI-Powered Speed and Simplicity
      </h1>
      <div className="header lg:px-40 py-20">
        <p className="font-sans text-2xl text-white font-light my-8">Welcome to BlogFast, the ultimate app for modern bloggers who want to create high-quality content in record time. Whether you're a seasoned writer or just starting out, BlogFast is here to streamline your blogging journey with cutting-edge AI suggestions, intuitive tools, and a built-in platform to showcase your work to a global audience.</p>
        <p className="font-sans text-2xl text-white font-light">Why Choose BlogFast?</p>
        <p className="font-sans text-2xl text-white font-light my-8">AI-Powered Writing Assistance: Stuck on ideas? BlogFast’s advanced AI generates topic suggestions, outlines, and even full paragraphs tailored to your niche. Say goodbye to writer’s block and hello to effortless creativity.</p>
        <p className="font-sans text-2xl text-white font-light my-8">Speed and Efficiency: Create polished blogs in minutes, not hours. Our AI helps you draft, edit, and optimize your content, so you can focus on what matters most—sharing your voice with the world.</p>
        <p className="font-sans text-2xl text-white font-light my-8">Seamless Publishing: Once your blog is ready, publish it directly on BlogFast’s platform. Reach a built-in audience of readers who are eager to discover fresh, engaging content.
        </p>
        <p className="font-sans text-2xl text-white font-light my-8">Customizable Templates: Choose from a variety of professionally designed templates to make your blog visually stunning. No design skills? No problem!
        </p>
        <p className="font-sans text-2xl text-white font-light my-8">SEO Optimization: BlogFast’s AI ensures your content is search-engine friendly, helping you rank higher and attract more readers.
        </p>
        <Link href={"login"} className="mr-4 text-white font-sans text-lg p-4 bg-black border border-zinc-700 rounded">Login</Link>
        <Link href={"signUp"} className="text-white font-sans text-lg p-4 bg-black border border-zinc-700 rounded">SignUp </Link>
      </div>
    </div>
  );
}
