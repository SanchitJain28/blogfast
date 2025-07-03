import { createClient } from "@/app/utils/supabase/server";
import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function POST() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
    });
    if (error) {
      return NextResponse.json(
        {
          success: false,
          message: error,
        },
        { status: 401 }
      );
    }
    if (data.url) {
      redirect(data.url); // use the redirect API for your server framework
    }
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error,
      },
      { status: 401 }
    );
  }
}
