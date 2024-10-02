'use server';

import { z } from "zod";
import { sql } from "@vercel/postgres";
import useSWR from "swr";
import { StandForm, TBAMatchesKeys, TBATeamSimple } from "./definitions";
import { tbaEventKey } from "./constants";
import fetcher from "./fetcher";
import { StandFormSchema } from "./constants";
import { signIn } from "../auth";
import { AuthError } from 'next-auth';

const CreateStandForm = StandFormSchema.omit({ date: true, team: true });

export async function createStandForm(formData: StandForm) {

  console.log('HERE');

  const {
		match,
		slot,
		username,
		startingZone,
		autoSpeakerScored,
		autoSpeakerMissed,
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
	} = formData;

  // const { data: teams } = useSWR<TBATeamSimple[]>(`https://www.thebluealliance.com/api/v3/event/${tbaEventKey}/teams/simple`, fetcher)
	// if (!teams) return null;

  const {data: keys } = useSWR<TBAMatchesKeys[]>(`https://www.thebluealliance.com/api/v3/event/${tbaEventKey}/matches/keys`, fetcher);
  if (!keys) return {
    message: 'Could not fetch team.',
  }
  console.log(keys);
  // const {data:  } = useSWR<>(`https://www.thebluealliance.com/api/v3/event/${tbaEventKey}/matches/simple`, fetcher);
  // const date = new Date().toISOString().split('T')[0];

  // try{
	// 	console.log('trying sql');
	// 	await sql`
  //   INSERT INFO standforms (match, slot, team, name, leftstartzone, autospeakerscored, autospeakermissed, autoampscored, autoampmissed, teleopampscored, teleopampmissed, teleopspeakerscored, teleopspeakermissed, teleoptrapscored, teleoptrapmissed, endgame, defence, status, fouls, techfouls, notes, date)
  //   VALUES (${match}, ${slot}, ${team}, ${username}, ${startingZone}, ${autoSpeakerScored}, ${autoSpeakerMissed}, ${autoAmpScored}, ${autoAmpMissed}, ${teleopAmpScored}, ${teleopAmpMissed}, ${teleopSpeakerScored}, ${teleopSpeakerMissed}, ${teleopTrapScored}, ${teleopTrapMissed}, ${endgame}, ${defence}, ${status}, ${fouls}, ${techfouls}, ${notes}, ${date})
  // 	`;
	// } catch (error) {
	// 	return { message: 'Database Error: Failed to Submit Form.' };
	// }

}

export async function authenticate(
	prevState: String | undefined,
	formData: FormData,
) {
	try {
		await signIn('credentials', formData);
	} catch (error) {
		if (error instanceof AuthError) {
			switch (error.type) {
				case 'CredentialsSignin':
					return 'Invalid credentials';
				default:
					return 'Something went wrong.';
			}
		}
		throw error;
	}
}