import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const result =
			await sql`CREATE TABLE Users ( id varchar(255), name varchar(255), username varchar(255), password varchar(255), permissions varchar(255) );`;
		return NextResponse.json({ result }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
