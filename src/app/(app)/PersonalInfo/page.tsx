"use client"
import { authContext } from '@/app/context/AuthContext'
import axios from 'axios'
import React, { useContext, useEffect, useState } from 'react'

export default function PersonalInfo() {
    const {user}=useContext(authContext)
    const[blogs,setBlogs]=useState([])
    const fetchBlogs=async()=>{
        console.log("RUNNING")
        const response=await axios.post("/api/FetchblogsbyUser",{
           
        })
        console.log(response)
    }
    useEffect(() => {
        console.log(user)
        fetchBlogs()
      }, [])
  return (
    <div>

    </div>
  )
}
