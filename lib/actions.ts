'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import useSWR from "swr";
import { PitForm, StandForm, TBAMatchesKeys, TBATeamSimple } from "./definitions";
import { PitFormDatabaseSchema, tbaEventKey } from "./constants";
import fetcher from "./fetcher";
import { StandFormSchema } from "./constants";
// import { signIn } from "../auth";
import { AuthError } from 'next-auth';
import { noop } from "@mantine/core";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

// const CreateStandForm = StandFormSchema.omit({ date: true, team: true });

// export async function createStandForm(formData: StandForm) {

//   console.log('HERE');

//   const {
// 		match,
// 		slot,
// 		// username,
// 		startingZone,
// 		autoSpeakerScored,
// 		autoSpeakerMissed,
// 		teleopAmpScored,
// 		teleopAmpMissed,
//     teleopSpeakerScored,
//     teleopSpeakerMissed,
// 		teleopTrapScored,
// 		teleopTrapMissed,
// 		endgame,
// 		defence,
// 		status,
// 		fouls,
// 		techfouls,
// 		notes,
// 	} = formData;

//   // const { data: teams } = useSWR<TBATeamSimple[]>(`https://www.thebluealliance.com/api/v3/event/${tbaEventKey}/teams/simple`, fetcher)
// 	// if (!teams) return null;

//   const {data: keys } = useSWR<TBAMatchesKeys[]>(`https://www.thebluealliance.com/api/v3/event/${tbaEventKey}/matches/keys`, fetcher);
//   if (!keys) return {
//     message: 'Could not fetch team.',
//   }
//   console.log(keys);
//   // const {data:  } = useSWR<>(`https://www.thebluealliance.com/api/v3/event/${tbaEventKey}/matches/simple`, fetcher);
//   // const date = new Date().toISOString().split('T')[0];

//   // try{
// 	// 	console.log('trying sql');
// 	// 	await sql`
//   //   INSERT INFO standforms (match, slot, team, name, leftstartzone, autospeakerscored, autospeakermissed, autoampscored, autoampmissed, teleopampscored, teleopampmissed, teleopspeakerscored, teleopspeakermissed, teleoptrapscored, teleoptrapmissed, endgame, defence, status, fouls, techfouls, notes, date)
//   //   VALUES (${match}, ${slot}, ${team}, ${username}, ${startingZone}, ${autoSpeakerScored}, ${autoSpeakerMissed}, ${autoAmpScored}, ${autoAmpMissed}, ${teleopAmpScored}, ${teleopAmpMissed}, ${teleopSpeakerScored}, ${teleopSpeakerMissed}, ${teleopTrapScored}, ${teleopTrapMissed}, ${endgame}, ${defence}, ${status}, ${fouls}, ${techfouls}, ${notes}, ${date})
//   // 	`;
// 	// } catch (error) {
// 	// 	return { message: 'Database Error: Failed to Submit Form.' };
// 	// }

// }

const CreatePitForm = PitFormDatabaseSchema.omit({ date: true });

export async function createPitForm(data: PitForm) {

	console.log('at action ts')

	// const formData = new FormData();
	// formData.append()

	const {
		team,
		drive,
		weight,
		preferredScoring,
		electrical,
		bumpers,
		notes,
	} = CreatePitForm.parse({
		// team: formData.get('team'),
		// drive: formData.get('drive'),
		// weight: formData.get('weight'),
		// preferredScoring: formData.get('preferredScoring'),
		// electrical: formData.get('electrical'),
		// bumpers: formData.get('bumpers'),
		// notes: formData.get('notes'),
		team: data.team,
		drive: data.drive,
		weight: data.weight,
		preferredScoring: data.preferredScoring,
		electrical: data.electrical,
		bumpers: data.bumpers,
		notes: data.notes,
	})

	const date = new Date().toISOString().split('T')[0];

	try {
		await sql`
			INSERT INFO pitforms (team, drive, weight, preferredScoring, eletrical, bumpers, notes, date)
			VALUES (${team}, ${drive}, ${weight}, ${preferredScoring}, ${electrical}, ${bumpers}, ${notes}, ${date})
		`;
		console.log('submitting pit form')
	} catch (error) {
		return { message: 'Database Error: Failed to Submit Pit Form.' };
	};

	revalidatePath('/pit-form');
	redirect('/pit-form');
}

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