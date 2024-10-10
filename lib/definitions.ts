// import { StandFormSchema } from "./constants";
// import { z } from "zod";

// export type StandForm = z.infer<typeof StandFormSchema>

export type StandFormOLD = {
	match: number,
  slot: string,
  // team: number,
  // username: string,
  preloaded: boolean
  startingZone: boolean,
  autoSpeakerScored: number,
  autoSpeakerMissed: number,
  teleopAmplifiedSpeakerScored: number,
  teleopSpeakerScored: number,
  teleopSpeakerMissed: number,
  teleopAmpScored: number,
  teleopAmpMissed: number,
  teleopTrapScored: number,
  teleopTrapMissed: number,
  fouls: number,
  techfouls: number,
  endgame: string,
  defence: string,
  status: string,
  notes: string,
  // date: string,
}

export type StandForm = {
  match: number,
  slot: string,
  preloaded: boolean,
  startingZone: boolean,
  autoSpeakerScored: number,
  autoSpeakerMissed: number,
  teleopAmplifiedSpeakerScored: number,
  teleopSpeakerScored: number,
  teleopSpeakerMissed: number,
  teleopAmpScored: number,
  teleopAmpMissed: number,
  teleopTrapScored: number,
  teleopTrapMissed: number,
  fouls: number,
  techfouls: number,
  endgame: string,
  defence: string,
  status: string,
  notes: string,
}

export type PitForm = {
  team: number,
  drive: string,
  weight: number,
  preferredScoring: string,
  electrical: string,
  bumpers: string,
  notes: string,
}

export type LoginForm = {
  email: string,
  password: string,
}

export type RegisterForm = {
  name: string,
  email: string,
  username: string,
  password: string,
  confirm: string,
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

export type User = {
  name: string,
  username: string,
  password: string,
  permissions: 'none' | 'member' | 'lead' | 'admin',
}


// SQL Tables

// Stand Forms
// CREATE TABLE StandForms ( match varchar(255), slot varchar(255), team varchar(255), username varchar(255), startingZone varchar(255), autoSpeakerScored varchar(255), autoSpeakerMissed varchar(255), teleopSpeakerScored varchar(255), teleopSpeakerMissed varchar(255), TeleopAmpScored varchar(255), TeleopAmpMissed varchar(255), TeleopTrapScored varchar(255), TeleopTrapMissed varchar(255), endgame varchar(255), defence varchar(255), status varchar(255), fouls varchar(255), techfouls varchar(255), notes varchar(255), date varchar(255) );