import { createClient } from "@/app/utils/supabase/server";
import { NextResponse } from "next/server";

export async function GET() {
  const supabase = await createClient();
  try {
    const { data, error } = await supabase.rpc("get_tweet_card");
    if (error) {
      return NextResponse.json(
        {
          status: false,
          message: "Unexpected error occured",
          error,
        },
        { status: 401 }
      );
    }
    return NextResponse.json(
      {
        status: true,
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      {
        status: false,
        message: "Unexpected error occured",
      },
      { status: 501 }
    );
  }
}
