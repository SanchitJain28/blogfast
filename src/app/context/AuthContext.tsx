"use client"
import React, { createContext, useContext, useEffect, useState } from 'react'
import { createClient } from '../utils/supabase/client'
import axios, { AxiosError } from 'axios'
import { useRouter } from 'next/router'

export const authContext = createContext<any>(null)

export function AuthContext({ children }: any) {
  const [user, setUser] = useState<any>(null)
  const getUser = async () => {
    const supabase = createClient()
    const { data: { user } } = await supabase.auth.getUser()
    setUser(user)
    console.log(user)
  }
  
  useEffect(() => {
    getUser()
  }, [])

  return (
    <authContext.Provider value={{ user, setUser }}>
      {children}
    </authContext.Provider>
  )
}
