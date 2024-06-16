import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const result =
			await sql`CREATE TABLE PitForms ( Team varchar(255), DriveTrain varchar(255), Weight varchar(255), PreferredScoring varchar(255), Eletrical varchar(255), ElectricalNotes varchar(255), Bumpers varchar(255), BumperNotes varchar(255), Notes varchar(255) );`;
		return NextResponse.json({ result }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
