"use client"
import Link from "next/link";
import SignOutButton from "./(app)/components/signOut/page";
import { createClient } from "./utils/supabase/client";
import { useEffect, useState } from "react";


export default  function Home() {
  const[user,setUser]=useState<any>(null)
  const getUser=async()=>{
    const supabase = createClient();
    const {data:{user}}=await supabase.auth.getUser()
    setUser(user)
    console.log(user)
  }
  useEffect(() => {
    getUser()
  }, [])
  if(user){
    return <div className="">
      <h1 className="text-white text-4xl text-center">You have signed in man {user.email}</h1>
      <SignOutButton/>
    </div>
  }
  
  return (
    <div className="p-20">
      <h1 className="text-white text-xl text-center font-mono">Hey Welcome to the fuuckin home page</h1>
      <Link href={"login"} className="mx-4 text-white font-sans text-lg p-4 bg-black border border-zinc-700 rounded">Login</Link>
      <Link href={"signup"} className=" mx-4 text-white font-sans text-lg p-4 bg-black border border-zinc-700 rounded">SignUp </Link>
    </div>
  );
}
