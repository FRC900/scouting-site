// import { StandFormSchema } from "./constants";
// import { z } from "zod";

// export type StandForm = z.infer<typeof StandFormSchema>

export type StandForm = {
  match: number,
  slot: string,
  team: number,
  preloaded: boolean,
  startingZone: boolean,
  autoL1: number,
  autoL2: number,
  autoL3: number,
  autoL4: number,
  teleopL1: number,
  teleopL2: number,
  teleopL3: number,
  teleopL4: number,
  teleopProcessor: number,
  teleopNet: number,
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
  permissions: 'member' | 'lead' | 'admin',
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

export type SimpleTeamData = {
  team: number;
  avePA: number,
  // aveAutoPA:  number,
  // aveTeleopPA: number,
  // aveEndgamePA: number,
  aveCoral: number,
  coral: {
    l1: number,
    l2: number,
    l3: number,
    l4: number,
  }
  algae: number,
  climb: {
    nothing: number,
    parked: number,
    shallow: number,
    deep: number,
  }
  defence: number | string,
}

export type FullTeamData = {
  name: string,
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
// CREATE TABLE standforms (
//  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
//  match varchar(255), slot varchar(255), team varchar(255), 
//  username varchar(255), 
//  preloaded varchar(255), 
//  startingZone varchar(255), 
//  autoL1 varchar(255),   
//  autoL2 varchar(255), 
//  autoL3 varchar(255),
//  autoL4 varchar(255),
//  teleopL1 varchar(255), 
//  teleopL2 varchar(255), 
//  teleopL3 varchar(255), 
//  teleopL4 varchar(255), 
//  teleopProcessor varchar(255), 
//  teleopNet varchar(255),
//  endgame varchar(255), 
//  defence varchar(255), 
//  status varchar(255), 
//  fouls varchar(255), 
//  techfouls varchar(255), 
//  notes varchar(255), 
//  date varchar(255)
// );

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