import { createClient } from "@/app/utils/supabase/server";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { email, password } = await request.json();
  const supabase = await createClient();
  try {
    const {
      data: { user },
      error,
    } = await supabase.auth.signUp({ email, password });
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        success: true,
        message: "Registration Succesfully",
        user,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        success: false,
        message: "unexpected error happened",
      },
      { status: 201 }
    );
  }
}
