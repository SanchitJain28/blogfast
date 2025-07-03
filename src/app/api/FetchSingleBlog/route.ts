import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const supabase = await createClient();
  const blog_id = request.nextUrl.searchParams.get("id");

  // Validate blog_id parameter
  if (!blog_id) {
    return NextResponse.json(
      {
        status: false,
        message: "Blog ID is required",
      },
      { status: 400 }
    );
  }

  // Validate blog_id format (assuming it should be a valid UUID or number)
  if (
    !/^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(
      blog_id
    ) &&
    !/^\d+$/.test(blog_id)
  ) {
    return NextResponse.json(
      {
        status: false,
        message: "Invalid blog ID format",
      },
      { status: 400 }
    );
  }

  try {
    const { data: blog, error } = await supabase.rpc("get_single_blog", {
      blog_id,
    });

    if (error) {
      console.error("Supabase error:", error);
      return NextResponse.json(
        {
          status: false,
          message: "Error fetching the blog",
          error: process.env.NODE_ENV === "development" ? error : undefined,
        },
        { status: 500 } // Changed from 401 to 500
      );
    }

    // Check if blog exists
    if (!blog || (Array.isArray(blog) && blog.length === 0)) {
      return NextResponse.json(
        {
          status: false,
          message: "Blog not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        status: true,
        message: "Blog fetched successfully",
        blog,
      },
      { status: 200 } // Changed from 201 to 200
    );
  } catch (error) {
    console.error("Unexpected error:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Internal server error",
        error: process.env.NODE_ENV === "development" ? error : undefined,
      },
      { status: 500 }
    );
  }
}
