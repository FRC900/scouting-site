// import { StandFormSchema } from "./constants";
// import { z } from "zod";

// export type StandForm = z.infer<typeof StandFormSchema>

export type StandForm = {
	match: number,
  slot: string,
  team: number,
  username: string,
  startingZone: boolean,
  autoSpeakerScored: number,
  autoSpeakerMissed: number,
  teleopSpeakerScored: number,
  teleopSpeakerMissed: number,
  teleopAmpScored: number,
  teleopAmpMissed: number,
  teleopTrapScored: number,
  teleopTrapMissed: number,
  endgame: string,
  defence: string,
  status: string,
  fouls: number,
  techfouls: number,
  notes: string,
  date: string,
}

export type PitForm = {
  team: number,
  drive: string,
  weight: number,
  preferredScoring: string,
  electrical: string,
  bumpers: string,
  notes: string
  date: string,
}

export type TBATeamSimple = {
	key: string;
	team_number: number;
	nickname: string;
	name: string;
	city: string;
	state_prov: string;
	country: string;
}

export type TBAMatchesKeys = string;