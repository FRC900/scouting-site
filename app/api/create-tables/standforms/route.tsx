import { sql } from "@vercel/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
	try {
		const result =
			await sql`CREATE TABLE StandForms ( Match varchar(255), Slot varchar(255), Team varchar(255), Name varchar(255), LeftStartZone varchar(255), AutoSpeakerScored varchar(255), AutoSpeakerMissed varchar(255), AutoAmpScored varchar(255), AutoAmpMissed varchar(255), TeleopSpeakerScored varchar(255), TeleopSpeakerMissed varchar(255), TeleopAmpScored varchar(255), TeleopAmpMissed varchar(255), TeleopTrapScored varchar(255), TeleopTrapMissed varchar(255), Endgame varchar(255), Defence varchar(255), Status varchar(255), Fouls varchar(255), TechFouls varchar(255), Comments varchar(255) );`;
		return NextResponse.json({ result }, { status: 200 });
	} catch (error) {
		return NextResponse.json({ error }, { status: 500 });
	}
}
