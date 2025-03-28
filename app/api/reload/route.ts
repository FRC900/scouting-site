import { NextResponse } from "next/server";
import { teamTwo } from "../../(header)/data/page";

export async function GET(request: Request) {
  const dataTwo = await teamTwo();

  return NextResponse.redirect(new URL("/data", request.url));
}