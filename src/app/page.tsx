"use client"

import { useAuth } from "@/contexts/authContext"
import { SignedOutHome } from "@/components/home/signedOut"
import { SignedInHome } from "@/components/home/signedIn"


export default function Home() {
  const { user } = useAuth()

  if (user) {
    return <SignedInHome user={user} />
  }

  return <SignedOutHome />
}
