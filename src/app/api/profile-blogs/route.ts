import { NextResponse } from "next/server";

export async function GET() {
  try {
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
