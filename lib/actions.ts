"use server";

import { sql } from "@vercel/postgres";
import { PitForm, StandForm } from "./definitions";
import { PitFormDatabaseSchema, StandFormDatabaseSchema } from "./constants";
// import { signIn } from "../auth";
import { AuthError } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import findTeamNumber from "./fetchers/tba/findTeamNumber";

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
		autoL1,
		autoL2,
		autoL3,
		autoL4,
		teleopL1,
		teleopL2,
		teleopL3,
		teleopL4,
		teleopProcessor,
		teleopNet,
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
			INSERT INTO standforms (match, slot, team, username, preloaded, startingzone, autol1, autol2, autol3, autol4, teleopl1, teleopl2, teleopl3, teleopl4, teleopprocessor, teleopnet, endgame, defence, status, fouls, techfouls, notes, date)
			VALUES (${match}, ${slot}, ${team}, ${username}, ${preloaded}, ${startingZone}, ${autoL1}, ${autoL2}, ${autoL3}, ${autoL4}, ${teleopL1}, ${teleopL2}, ${teleopL3}, ${teleopL4}, ${teleopProcessor}, ${teleopNet}, ${endgame}, ${defence}, ${status}, ${fouls}, ${techfouls}, ${notes}, ${date})
		`;
	} catch (error) {
		return { message: "Database Error: Failed to Submit Pit Form." };
	}

	revalidatePath("/stand-form");
	revalidateTag('stand');
	redirect("/stand-form");
}

const CreatePitForm = PitFormDatabaseSchema.omit({ date: true });

export async function createPitForm(data: PitForm) {
	const { team, drive, weight, preferredscoring, electrical, bumpers, notes } =
		CreatePitForm.parse({
			...data,
		});

	const date = new Date().toISOString().split(".")[0];

	try {
		await sql`
			INSERT INTO pitforms (team, drive, weight, preferredscoring, electrical, bumpers, notes, date)
			VALUES (${team}, ${drive}, ${weight}, ${preferredscoring}, ${electrical}, ${bumpers}, ${notes}, ${date})
		`;
	} catch (error) {
		return { message: "Database Error: Failed to Submit Pit Form." };
	}

	revalidatePath("/pit-form");
	revalidateTag('pit');
	redirect("/pit-form");
}

export async function updatePitForm(data: PitForm, id: string) {
	const { team, drive, weight, preferredscoring, electrical, bumpers, notes } =
		CreatePitForm.parse({
			...data,
		});

	const date = new Date().toISOString().split(".")[0];

	await sql`
		UPDATE pitforms
		SET team = ${team}, drive = ${drive}, weight = ${weight}, preferredscoring = ${preferredscoring}, electrical = ${electrical}, bumpers = ${bumpers}, notes = ${notes}, date = ${date}
		WHERE id = ${id}
	`;

	revalidatePath("/records/pit-forms");
	revalidateTag('pit');
	redirect("/records/pit-forms");
}

export async function updateStandForm(data: StandForm, id: string) {
	// parse and extract data from data prop
	const {
		match,
		slot,
		// team,
		preloaded,
		startingZone,
		autoL1,
		autoL2,
		autoL3,
		autoL4,
		teleopL1,
		teleopL2,
		teleopL3,
		teleopL4,
		teleopProcessor,
		teleopNet,
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

	await sql`
		UPDATE standforms
		SET match = ${match}, slot = ${slot}, team = ${team}, username = ${username}, preloaded = ${preloaded}, startingzone = ${startingZone}, autol1 = ${autoL1}, autol2 = ${autoL2}, autol3 = ${autoL3}, autol4 = ${autoL4}, teleopl1 = ${teleopL1}, teleopl2 = ${teleopL2}, teleopl3 = ${teleopL3}, teleopl4 = ${teleopL4}, teleopprocessor = ${teleopProcessor}, teleopnet = ${teleopNet}, endgame = ${endgame}, defence = ${defence}, status = ${status}, fouls = ${fouls}, techfouls = ${techfouls}, notes = ${notes}, date = ${date}
		WHERE id = ${id}
	`;

	revalidatePath("/records/stand-forms");
	revalidateTag('stand');
	redirect("/records/stand-forms");
}

export async function deletePitForm(id: string) {
	await sql`DELETE FROM pitforms WHERE id = ${id}`;

	revalidatePath("/records/pit-forms");
	revalidateTag('pit');
	redirect("/records/pit-forms");
}

export async function deleteStandForm(id: string) {
	await sql`DELETE FROM standforms WHERE id = ${id}`;

	revalidatePath("/records/stand-forms");
	revalidateTag('stand'); 	
	redirect("/records/stand-forms");
}

// export async function authenticate(
// 	prevState: string | undefined,
// 	formData: FormData
// ) {
// 	try {
// 		console.log('hello')
// 		await signIn("crednetials", formData);
// 	} catch (error) {
// 		if (error instanceof AuthError) {
// 			switch (error.type) {
// 				case "CredentialsSignin":
// 					return "Invalid crednetials.";
// 				default:
// 					return "Something went wrong.";
// 			}
// 		}
// 		throw error;
// 	}
// }
