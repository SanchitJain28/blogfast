import { createClient } from '@/app/utils/supabase/client'
import { useToast } from '@/hooks/use-toast'
import axios, { AxiosError } from 'axios'
import React from 'react'

export default function GoogleLogin() {
    const {toast}=useToast()
    const LoginBygoogle = async () => {
        const supabase = createClient()
        try {
            const response = await supabase.auth.signInWithOAuth({
                provider: 'google',
            })
            // toast({
            //     title: "Login",
            //     description: "Succesfull login ",
            //     className:"bg-green-500 text-black"
            //   })
            console.log(response)
        } catch (error) {
            const axiosError = error as AxiosError
            console.log(axiosError.response?.data)

            toast({
                title: "Login",
                description: " login un succesful ",
                className:"bg-red-500 text-black"
              })
        }

    }
    return (
        <div>
            <button onClick={LoginBygoogle} className='bg-blue-600  text-white text-lg font-sans p-4 mx-4 rounded-lg'>Sign in with google</button>
        </div>
    )
}
