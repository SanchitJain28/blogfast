"use client";
import React, { useContext } from 'react'
import axios, { AxiosError } from 'axios';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation'
import { authContext } from '@/app/context/AuthContext';
import { useToast } from '@/hooks/use-toast';


export default function LoginPage() {
    const {toast}=useToast()
    const router = useRouter()
    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const onsubmit = async (data: any) => {
        try {
            const response = await axios.post("/api/signUp", data)
            toast({
                title: "sign up",
                description: "registered succesfully ",
                className:"bg-green-500 text-black"
              })
            console.log(response)
            router.push('/')
        } catch (error) {
            const axiosError = error as AxiosError
            console.log(axiosError.response?.data)
        }
    }
    return (
        <form onSubmit={handleSubmit(onsubmit)}>
            <div className="flex flex-col p-4">
                <label htmlFor="email" className='text-white font-sans text-lg '>Email:</label>
                <input {...register("email")} className='bg-black text-white my-4 lg:w-1/2 font-sans p-4 border border-zinc-700 rounded focus:outline-none' id="email" name="email" type="email" required />
            </div>
            <div className="flex flex-col p-4">
                <label htmlFor="password" className='text-white font-sans text-lg '>Password:</label>
                <input  {...register("password")} className='bg-black text-white my-4 lg:w-1/2 font-sans p-4 border border-zinc-700 rounded focus:outline-none' id="password" name="password" type="password" required />
            </div>
            <button type='submit' className="m-4 bg-black text-white border border-zinc-400 font-sans text-lg p-4">Sign up</button>
        </form>
    )
}