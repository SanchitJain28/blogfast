"use client";
import { createClient } from '@/app/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React from 'react'

export default async function SignOutButton() {
    const router=useRouter()
    const supabase =await  createClient()
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        router.refresh(); // Refreshes the page to reflect auth changes

    }
    return (
        <div>
            <button onClick={()=>{signOut()}} className="mx-4 text-white font-sans text-lg p-4 bg-black border border-zinc-700 rounded">Sign out</button>
        </div>
    )
}
