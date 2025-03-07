import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request:NextRequest){
    // const {user_id}=await request.json()
    const supabase=await createClient()
    const { data: { user } }=await supabase.auth.getUser()
    try {
        const {data,error}  = await supabase.
        from("blogs").
        select("").
        eq("createdBy",user.id)
        if(error){
            return NextResponse.json({
                success: false,
                message: error
            },{status:500})
        }
        return NextResponse.json({
            success: true,
            data: data
        })
    } catch (error) {
        console.log(error)
        return NextResponse.json({
            success: false,
            message: error
        })
    }
}