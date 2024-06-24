"use server";

import { z } from "zod";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const StandFormSchema = z.object({
	match: z.number(),
	slot: z.enum(["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]),
	team: z.number(),
	name: z.string(),
	startingZone: z.boolean(),
	autoSpeakerScored: z.number(),
	autoSpeakerMissed: z.number(),
	autoAmpScored: z.number(),
	autoAmpMissed: z.number(),
	teleopSpeakerScored: z.number(),
	teleopSpeakerMissed: z.number(),
	teleopAmpScored: z.number(),
	teleopAmpMissed: z.number(),
	teleopTrapScored: z.number(),
	teleopTrapMissed: z.number(),
	endgame: z.enum(["Nothing", "Parked", "Failed Climb", "Climbed", "Harmony"]),
	defence: z.enum([
		"0 - No Defence",
		"1 - Penalties Galore",
		"2 - Some Penalties",
		"3 - Ineffective",
		"4 - Good Defence",
		"5 - Strong.",
	]),
	status: z.enum([
		"0 - No-Show",
		"1 - Didn't Move",
		"2 - Broke In Match",
		"3 - Disconnections",
		"4 - No Issues (Solid)",
		"5 - Pro Preformance",
	]),
	fouls: z.number(),
	techfouls: z.number(),
	notes: z.string(),
});

const CreateStandForm = StandFormSchema.omit({});

export async function createStandForm(formData: FormData) {

  // Validate form using Zod
	const {
		match,
		slot,
		team,
		name,
		startingZone,
		autoSpeakerScored,
		autoSpeakerMissed,
    autoAmpScored,
    autoAmpMissed,
		teleopAmpScored,
		teleopAmpMissed,
    teleopSpeakerScored,
    teleopSpeakerMissed,
		teleopTrapScored,
		teleopTrapMissed,
		endgame,
		defence,
		status,
		fouls,
		techfouls,
		notes,
	} = CreateStandForm.parse({
		match: formData.get("match"),
		slot: formData.get("slot"),
		team: formData.get("team"),
		name: formData.get("name"),
		startingZone: formData.get("startingZone"),
		autoSpeakerScored: formData.get("autoSpeakerScored"),
		autoSpeakerMissed: formData.get("autoSpeakerMissed"),
		autoAmpScored: formData.get("autoAmpScored"),
		autoAmpMissed: formData.get("autoAmpMissed"),
		teleopSpeakerScored: formData.get("teleopSpeakerScored"),
		teleopSpeakerMissed: formData.get("teleopSpeakerMissed"),
		teleopAmpScored: formData.get("teleopAmpScored"),
		teleopAmpMissed: formData.get("teleopAmpMissed"),
		teleopTrapScored: formData.get("teleopTrapScored"),
		teleopTrapMissed: formData.get("teleopTrapMissed"),
		endgame: formData.get("endgame"),
		defence: formData.get("defence"),
		status: formData.get("status"),
		fouls: formData.get("fouls"),
		techfouls: formData.get("techfouls"),
		notes: formData.get("notes"),
	});

  // If form validation fails, return errors early. Otherwise, continue.

	// Prepare data for insertion into the database

	// Insert data into the database

	await sql`
    INSERT INFO standforms (match, slot, team, name, leftstartzone, autospeakerscored, autospeakermissed, autoampscored, autoampmissed, teleopampscored, teleopampmissed, teleopspeakerscored, teleopspeakermissed, teleoptrapscored, teleoptrapmissed, endgame, defence, status, fouls, techfouls, comments)
    VALUES (${match}, ${slot}, ${team}, ${name}, ${startingZone}, ${autoSpeakerScored}, ${autoSpeakerMissed}, ${autoAmpScored}, ${autoAmpMissed}, ${teleopAmpScored}, ${teleopAmpMissed}, ${teleopSpeakerScored}, ${teleopSpeakerMissed}, ${teleopTrapScored}, ${teleopTrapMissed}, ${endgame}, ${defence}, ${status}, ${fouls}, ${techfouls}, ${notes})
  `;

  // Revalidate the cache for the invoices page and redirect the user.
  revalidatePath('/scouting/stand');
  redirect('/scouting/stand');
}
