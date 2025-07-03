import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";
cloudinary.config({
  cloud_name: "dgemvdcue",
  api_key: process.env.CLOUDINARY_APIKEY,
  api_secret: process.env.CLOUDINARY_API_SECRET, // Click 'View API Keys' above to copy your API secret
});
export async function POST(request: NextRequest) {
  const supabase = await createClient();

  const { blog_content, images, title } = await request.json();
  try {
    const { error } = await supabase.from("blogs").insert({
      title,
      blog_content,
      images: [images],
    });
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "blog published successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: "Sorry an unexpected error occured" + error,
      },
      { status: 404 }
    );
  }
}
