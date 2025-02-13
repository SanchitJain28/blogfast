import React from 'react'
import { signup } from './action'

export default function SignUpPage() {
  return (
    <form action={signup}>
      <div className="flex flex-col p-4">
        <label htmlFor="email" className='text-white font-sans text-lg '>Email:</label>
        <input className='bg-black text-white my-4 lg:w-1/2 font-sans p-4 border border-zinc-700 rounded focus:outline-none' id="email" name="email" type="email" required />
      </div>
      <div className="flex flex-col p-4">
        <label htmlFor="password" className='text-white font-sans text-lg '>Password:</label>
        <input className='bg-black text-white my-4 lg:w-1/2 font-sans p-4 border border-zinc-700 rounded focus:outline-none' id="password" name="password" type="password" required />
      </div>

      <button  className="m-4 bg-black text-white border border-zinc-400 font-sans text-lg p-4">Sign up</button>
    </form>
  )
}