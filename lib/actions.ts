"use server";

import { sql } from "@vercel/postgres";
import { PitForm, StandForm } from "./definitions";
import { PitFormDatabaseSchema, StandFormDatabaseSchema } from "./constants";
// import { signIn } from "../auth";
// import { AuthError } from "next-auth";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import findTeamNumber from "./fetchers/findTeamNumber";

const CreateStandForm = StandFormDatabaseSchema.omit({
	team: true,
	username: true,
	date: true,
});

export async function createStandForm(data: StandForm) {
	// parse and extract data from data prop
	const {
		match,
		slot,
		// team,
		preloaded,
		startingZone,
		autoSpeakerScored,
		autoSpeakerMissed,
		teleopAmplifiedSpeakerScored,
		teleopSpeakerScored,
		teleopSpeakerMissed,
		teleopAmpScored,
		teleopAmpMissed,
		teleopTrapScored,
		teleopTrapMissed,
		fouls,
		techfouls,
		endgame,
		defence,
		status,
		notes,
	} = CreateStandForm.parse({
		...data,
	});

	const team = await findTeamNumber(match, slot);
	const username = "temp";
	const date = new Date().toISOString().split(".")[0];

	try {
		await sql`
			INSERT INTO standforms (match, slot, team, username, preloaded, startingzone, autospeakerscored, autospeakermissed, teleopamplifiedspeakerscored, teleopspeakerscored, teleopspeakermissed, teleopampscored, teleopampmissed, teleoptrapscored, teleoptrapmissed, endgame, defence, status, fouls, techfouls, notes, date)
			VALUES (${match}, ${slot}, ${team}, ${username}, ${preloaded}, ${startingZone}, ${autoSpeakerScored}, ${autoSpeakerMissed}, ${teleopAmplifiedSpeakerScored}, ${teleopAmpScored}, ${teleopAmpMissed}, ${teleopSpeakerScored}, ${teleopSpeakerMissed}, ${teleopTrapScored}, ${teleopTrapMissed}, ${endgame}, ${defence}, ${status}, ${fouls}, ${techfouls}, ${notes}, ${date})
		`;
	} catch (error) {
		return { message: "Database Error: Failed to Submit Pit Form." };
	}

	revalidatePath("/stand-form");
	redirect("/stand-form");
}

const CreatePitForm = PitFormDatabaseSchema.omit({ date: true });

export async function createPitForm(data: PitForm) {
	const { team, drive, weight, preferredscoring, electrical, bumpers, notes } =
		CreatePitForm.parse({
			...data,
		});

	const date = new Date().toISOString().split(".")[0];

	console.log(`
		INSERT INTO pitforms (team, drive, weight, preferredscoring, electrical, bumpers, notes, date)
		VALUES (${team}, '${drive}', ${weight}, '${preferredscoring}', ${electrical}, ${bumpers}, '${notes}', '${date}')
	`);

	try {
		await sql`
			INSERT INTO pitforms (team, drive, weight, preferredscoring, electrical, bumpers, notes, date)
			VALUES (${team}, '${drive}', ${weight}, '${preferredscoring}', ${electrical}, ${bumpers}, '${notes}', '${date}')
		`;
	} catch (error) {
		return { message: "Database Error: Failed to Submit Pit Form." };
	}

	revalidatePath("/pit-form");
	redirect("/pit-form");
}

export async function deletePitForm(id: string) {}

// export async function authenticate(
// 	prevState: String | undefined,
// 	formData: FormData,
// ) {
// 	try {
// 		await signIn('credentials', formData);
// 	} catch (error) {
// 		if (error instanceof AuthError) {
// 			switch (error.type) {
// 				case 'CredentialsSignin':
// 					return 'Invalid credentials';
// 				default:
// 					return 'Something went wrong.';
// 			}
// 		}
// 		throw error;
// 	}
// }
