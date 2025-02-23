import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
    const supabase = await createClient()
    try {
        const { data, error } = await supabase
            .from('blogs')
            .select()
        if(error){
            return NextResponse.json({
                success: false,
                message: error
            }, { status: 500 })
        }
        return NextResponse.json({
            success:true,
            data: data
        }, { status: 200 })
    } catch (error) {
        return NextResponse.json({
            success:false,
            message:error
        })
    }

}