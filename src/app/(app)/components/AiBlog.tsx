"use client"
import React, { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from "@hookform/resolvers/zod"
import { AiBlogSchemma } from '@/app/Schemmas/AiBlogSchemma.ts/schemma'
import { useToast } from '@/hooks/use-toast'
import axios from 'axios'

interface heading {
  title: string
  id: number
}

export default function AIBlog() {
  const [heading, setHeading] = useState<heading[]>([{ title: "", id: 1 }])
  const[AiBlog,setAiBlog]=useState<string|null>(null)
  const[isProducing,setIsProducing]=useState<boolean>(false)
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(AiBlogSchemma)
  })
  const onSubmit = async (data: { heading: heading[] }) => {
    setIsProducing(true)
    const headingArray = data.heading.map((e) => { return e.title })
    
    const prompt = `Write a blog such that it conatins all the essientials heading i am providing in an array here is an array ${[headingArray]} the blog should be such that is should use easy words and easy understandable grammer ,it should also follow all the seo strategies and should be should be seo rich and should contain all the essiantial keywords that is repeating in the this heading array,the blog content should be p,h1,h2,h3,h4 or list tage ,do not make a html template ,the presention of the blog should be beautiful ,use emojis don't use ** or # this to start a heading,use emojis such that the blog should look beautiful`
    console.log(headingArray,prompt)

    const response=await axios.post("/api/AIshit",{
      prompt:prompt
    })  
    setAiBlog(response.data.text)
    setIsProducing(false)
    console.log(response)
  }
  return (
    <div className=' lg:p-12 p-4  m-4'>
      <p className='text-zinc-400 text-2xl '>Make a blog with ai</p>

      <form onSubmit={handleSubmit(onSubmit)}>
        {heading.map((element, index: number) => {
          const errorMessage = errors?.heading?.[index]?.title
          return <div className="flex flex-col" key={index}>
            <div className="flex justify-between">
              <input {...register(`heading.${index}.title`)} className='bg-black text-white my-4 w-full font-sans p-4 border border-zinc-700 rounded-lg focus:outline-none' type='text' placeholder={`Heading ${index + 1}`} />
              <button type="button" onClick={() => {
                const filteredHeadings = heading.filter((e) => {
                  if (heading.length > 1) {
                    return e.id !== element.id
                  }
                  return toast({
                    title: "error",
                    description: "You can't delete the last heading",
                    className: "bg-red-700 border-red-700 text-black"
                  })
                })
                setHeading(filteredHeadings)
              }} className='text-white text-xl mx-2 '>X</button>
            </div>

            <p className='text-sm text-red-600'>{errorMessage?.message}</p>
          </div>
        })}
        <button type="button" onClick={() => {
          setHeading([...heading, { title: "", id: Math.random() }])
        }} className='p-4 border border-zinc-600 text-white text-lg rounded-lg'>Add heading</button>
        <button type='submit' disabled={isProducing} className='text-white' >Submit </button>
        <p className='text-white text-lg'>{isProducing?"Producing results":""}</p>
        {/* <div dangerouslySetInnerHTML={{ __html: AiBlog?AiBlog:"" }} className='text-white text-xl'/> */}

        <div className='text-white border border-zinc-400 focus:outline-none rounded-lg my-4 p-4 bg-black text-lg w-full min-h-40 ' dangerouslySetInnerHTML={{__html:AiBlog?AiBlog:""}} />
      </form>
    </div>

  )
}
