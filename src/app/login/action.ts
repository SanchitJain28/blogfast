'use server'
import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '../utils/supabase/server'
export async function login(formData: FormData) {
  const supabase = await createClient()
    console.log(supabase)
  // type-casting here for convenience
  // in practice, you should validate your inputs
  const inputValues = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const {error} = await supabase.auth.signInWithPassword(inputValues)
  if(error){
    redirect("error")
  }
  redirect("/")
}

