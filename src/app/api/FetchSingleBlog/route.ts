import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const supabase = await createClient();
  try {
    const { data, error } =await supabase
      .from("blogs")
      .select()
      .eq("id", request.nextUrl.searchParams.get("blogId"));
      if(error){
        return NextResponse.json({
          success: false,
          message: error,
        }, { status: 500 })
      }
      return NextResponse.json({
        success: true,
        data: data,
      })
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Sorry an unexpected error occured" + error,
      },
      { status: 500 }
    );
  }
}
