"use client"
import React, { createContext, useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'


export const authContext = createContext<any |null>(null)

export function AuthContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const [blogContent,setBlogContent]=useState<string>("")
  const getUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    console.log(user)
  }
  const[blogImage,setBlogImage]=useState(null)
  useEffect(() => {
    getUser()
    if(localStorage.getItem('blogContent')){
      setBlogContent(localStorage.getItem('blogContent')as string)
    }
  }, [])

  return (
    <authContext.Provider value={{ user, setUser,blogImage,setBlogImage,blogContent,setBlogContent }}>
      {children}
    </authContext.Provider>
  )
}
