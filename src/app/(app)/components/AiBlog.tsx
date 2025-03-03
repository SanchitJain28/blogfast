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
  const [AiBlog, setAiBlog] = useState<string | null>(null)
  const [isProducing, setIsProducing] = useState<boolean>(false)
  const { toast } = useToast()
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(AiBlogSchemma)
  })
  const onSubmit = async (data: { heading: heading[] }) => {
    setIsProducing(true)
    const headingArray = data.heading.map((e) => { return e.title })

    const prompt = `Generate a comprehensive and SEO-rich blog post based on the following topics, treating each topic as a distinct section:
  [${headingArray}]

The blog should:

* Address each topic from the above list as a distinct section.
* Use simple, easy-to-understand language and grammar.
* Incorporate relevant SEO strategies and keywords naturally.
* Structure content using paragraphs like "<p>This is a paragraph.</p>", headings like "<h2>This is a heading</h2>", and lists like "<li>Item 1</li>" as needed.
* Present the information in a visually appealing manner using relevant emojis.

IMPORTANT: Provide ONLY the blog content. Do not include any introductory or concluding phrases like "Here is your blog" or "I have done." Respond in plain text without any Markdown, HTML, or other formatting markup. Provide only the blog content. Do not include any extra text.

End the blog content with the delimiter [END]

Example of wanted output:
<h2>Why people party</h2>
<p>people party to have fun</p>
<li>to have fun</li>
<li>to see friends</li>
`
    console.log(headingArray, prompt)

    const response = await axios.post("/api/AIshit", {
      prompt: prompt
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
        <p className='text-white text-lg'>{isProducing ? "Producing results" : ""}</p>
        {/* {Mydocument} */}
        {AiBlog ?
          <div>
            <div className='text-zinc-400 border border-zinc-700 focus:outline-none rounded-lg my-4 p-4 bg-black text-lg w-full min-h-40 ' dangerouslySetInnerHTML={{ __html: AiBlog ? AiBlog : "" }} />
            <button onClick={() => {
              localStorage.setItem("blogContent", AiBlog)
            }} className='border text-white border-zinc-300 rounded-lg px-4 py-2 my-4 mx-2'>Paste it in my blog content</button>
          </div> :
          <div>
            <p></p>
          </div>}
      </form>
    </div>

  )
}
