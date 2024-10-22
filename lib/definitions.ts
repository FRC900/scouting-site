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
  // team: number,
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

export type StandFormDatabase = StandForm & { team: number, username: string, date: string }

export type PitForm = {
  team: number,
  drive: string,
  weight: number,
  preferredscoring: string,
  electrical: string,
  bumpers: string,
  notes: string,
}

export type PitFormDatabase = PitForm & { date: string }

export type User = {
  name: string,
  username: string,
  password: string,
  permissions: 'none' | 'member' | 'lead' | 'admin',
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

export type TBAMatchSimple = {
  key: string,
  comp_level: string,
  set_number: number,
  match_number: number,
  alliances: {
    red: {
      score: number,
      team_keys: string[],
      surrogate_team_keys: string[],
      dq_team_keys: string[],
    },
    blue: {
      score: number,
      team_keys: string[],
      surrogate_team_keys: string[],
      dq_team_keys: string[],
    },
  },
  winning_alliance: ["red", "blue"],
  event_key: string,
  time: number,
  predicted_time: number,
  actual_time: number,
}


// SQL Tables

// Stand Forms
// CREATE TABLE standforms ( match varchar(255), slot varchar(255), team varchar(255), username varchar(255), preloaded varchar(255), startingZone varchar(255), autoSpeakerScored varchar(255), autoSpeakerMissed varchar(255), teleopAmplifiedSpeakerScored varchar(255), teleopSpeakerScored varchar(255), teleopSpeakerMissed varchar(255), TeleopAmpScored varchar(255), TeleopAmpMissed varchar(255), TeleopTrapScored varchar(255), TeleopTrapMissed varchar(255), endgame varchar(255), defence varchar(255), status varchar(255), fouls varchar(255), techfouls varchar(255), notes varchar(255), date varchar(255) );

// Pit Forms
// CREATE TABLE IF NOT EXISTS pitforms (
//   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//   team VARCHAR(255) NOT NULL,
//   drive VARCHAR(255) NOT NULL,
//   weight VARCHAR(255) NOT NULL,
//   preferredscoring VARCHAR(255) NOT NULL,
//   electrical VARCHAR(255) NOT NULL,
//   bumpers VARCHAR(255) NOT NULL,
//   notes VARCHAR(255) NOT NULL,
//   date VARCHAR(255) NOT NULL 
// );

// User Table
// CREATE TABLE IF NOT EXISTS users (
//   id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//   name VARCHAR(255) NOT NULL,
//   email VARCHAR(255) NOT NULL UNIQUE,
//   password VARCHAR(255) NOT NULL,
//   permission VARCHAR(255) NOT NULL,
// );