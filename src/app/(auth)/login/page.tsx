"use client";
import React, { useContext } from 'react'
import { createClient } from '../../utils/supabase/client'
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { authContext } from '@/app/context/AuthContext';
import { useToast } from '@/hooks/use-toast';
import GoogleLogin from '../googleLogin/page';


export default function LoginPage() {
    const { toast } = useToast()
    const router = useRouter()
    const { loginHandler } = useContext(authContext)
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onsubmit = async (data: any) => {
        try {
            const response = await axios.post("/api/login", data)
            toast({
                title: "Login",
                description: "Succesfull login ",
                className: "bg-green-500 text-black"
            })
            console.log(response)
            router.push('/')
        } catch (error) {
            const axiosError = error as AxiosError
            console.log(axiosError.response?.data)
        }
    }
    return (
        <div className="  ">
            <form onSubmit={handleSubmit(onsubmit)} className='lg:px-40 lg:py-40'>
                <div className="flex flex-col p-4 w-full">
                    <label htmlFor="email" className='text-white font-sans text-lg '>Email:</label>
                    <input {...register("email")} className='bg-black text-white my-4  font-sans p-4 border border-zinc-700 rounded focus:outline-none' id="email" name="email" type="email" required />
                </div>
                <div className="flex flex-col p-4 w-full">
                    <label htmlFor="password" className='text-white font-sans text-lg '>Password:</label>
                    <input  {...register("password")} className='bg-black text-white my-4  w-full font-sans p-4 border border-zinc-700 rounded focus:outline-none' id="password" name="password" type="password" required />
                </div>
                <div className="flex m-4">
                    <button type='submit' className="rounded-lg bg-black text-black  bg-white  border border-zinc-400 font-sans text-lg p-4">Log in</button>
                    <GoogleLogin />
                </div>
            </form>
        </div>

    )
}