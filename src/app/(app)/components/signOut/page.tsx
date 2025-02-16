"use client";
import { authContext } from '@/app/context/AuthContext';
import { createClient } from '@/app/utils/supabase/client';
import { useRouter } from 'next/navigation';
import React, { useContext } from 'react'

export default function SignOutButton() {
    const {user,setUser}=useContext(authContext)
    const router=useRouter()
    const supabase =createClient()
    async function signOut() {
        const { error } = await supabase.auth.signOut()
        setUser(null)
        router.refresh(); // Refreshes the page to reflect auth changes
    }
    return (
        <div>
            <button onClick={()=>{signOut()}} className="mx-4 text-white font-sans text-lg p-4 bg-black border border-zinc-700 rounded">Sign out</button>
        </div>
    )
}
