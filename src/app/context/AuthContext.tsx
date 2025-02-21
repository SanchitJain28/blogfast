"use client"
import React, { createContext, useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'


export const authContext = createContext<any |null>(null)

export function AuthContext({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<any>(null)
  const getUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    console.log(user)
  }
  const[blogImage,setBlogImage]=useState(null)
  useEffect(() => {
    getUser()
  }, [])

  return (
    <authContext.Provider value={{ user, setUser,blogImage,setBlogImage }}>
      {children}
    </authContext.Provider>
  )
}
