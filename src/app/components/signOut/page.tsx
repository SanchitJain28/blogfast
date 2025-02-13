"use client";
import { createClient } from '@/app/utils/supabase/server'
import React from 'react'


export default async function SignOutButton() {
    const supabase = await createClient()
    async function signOut() {
        const { error } = await supabase.auth.signOut()
    }

    return (
        <div>
            <button onClick={()=>{}} className="mx-4 text-white font-sans text-lg p-4 bg-black border border-zinc-700 rounded">Sign out</button>
        </div>
    )
}
