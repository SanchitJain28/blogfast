"use client"
import Link from "next/link";
import SignOutButton from "./(app)/components/signOut/page";
import { createClient } from "./utils/supabase/client";
import { useEffect, useState } from "react";


export default async function Home() {
  const supabase = createClient();
  const user=supabase.auth.getUser()
  return (
    <div className="p-20">
      <h1 className="text-white text-xl text-center font-mono">Hey Welcome to the fuuckin home page</h1>
      <Link href={"login"} className="mx-4 text-white font-sans text-lg p-4 bg-black border border-zinc-700 rounded">Login</Link>
      <Link href={"signup"} className=" mx-4 text-white font-sans text-lg p-4 bg-black border border-zinc-700 rounded">SignUp </Link>
    </div>
  );
}
