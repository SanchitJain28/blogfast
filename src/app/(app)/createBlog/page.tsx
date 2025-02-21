"use client"

import Link from "next/link";


export default function CreateBlog() {
  //ALL THE STATES

  // const [sections, setSections] = useState<Section[]>([
  //   { title: "Heading 1", content: "" }
  // ])

  //ALL THE FORM SHIT
  // const { register, handleSubmit, formState: { errors }, control } = useForm({
  //   resolver: zodResolver(blogSectionSchemma)
  // })
  // const { fields, append, remove } = useFieldArray({
  //   control,
  //   name: "section"
  // });
  // Handle form submission
  //the first parameter will give you data
  

  return (
      <div className='lg:px-40 lg:py-12 p-8'>
        <p className="text-white text-lg text-zinc-500 text-center font-mono">Create a blog</p>
        <Link href="createBlog/blogImageUpload" className="text-white bg-blavk border border-zinc-400">Create blog</Link>
      </div>
  );
}
{/* CONTENT SECTION FOR THE BLOG */}
{/* <form onSubmit={handleSubmit(handleSubmitForm)}> */}
{/* {sections.map((e, index: number) => { */}
  // const errorForFieldHeading = errors?.section?.[index]?.heading;
  // const errorForFieldContent = errors?.section?.[index]?.content;
      
  // return <div className="" key={index} ref={setNodeRef}>
    {/* <div className="flex flex-col basic-2/3">
      <Input key={e.id} type='text' placeholder={`${e.title}`} {...register(`section.${index}.heading`)} className='focus:outline-none my-4 bg-black text-white p-2 border border-zinc-700' />
      <p className='text-sm text-red-600'>{errorForFieldHeading?.message}</p>

      <Input key={e.id} type='text' placeholder={`${e.title}`} {...register(`section.${index}.content`)} className='focus:outline-none my-4 bg-black text-white p-2 border border-zinc-400' />
      <p className='text-sm text-yellow-600'>{errorForFieldContent?.message}</p>

    </div> */}
    
  {/* //Remove heading button */}
    {/* <button onClick={() => {
      const filteredHeadings = sections.filter((heading) => {
        if (sections.length > 3) {
          return heading.title !== e.title
        }
        toast({
          title: "delete",
          description: "minimum 3 heading are required",
          className: "bg-red-700 text-black border-red-700"
        })
        return sections
      })
      setSections(filteredHeadings)
    }} className=' mx-4 bg-black text-white  rounded-lg'><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" className="lucide lucide-trash"><path d="M3 6h18" /><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6" /><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2" /></svg></button> */}
//   </div>
// })}
{/* <button type='submit' className='bg-black text-white border p-4 border-blue-600 rounded-lg text-lg'>
  Submit
</button> */}
// </form>
{/* <button onClick={() => {
setSections([...sections, { title: `heading ${sections.length + 1}`, content: "" ,subheadings:[]}])
}} className='bg-black textwhite border p-4 border-blue-600 rounded-lg text-lg'>Add a heading</button> */}