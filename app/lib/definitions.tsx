export type TeamField = {
  id: string,
  name: string,
  number: number,
}

export type StandForm = {
  match: number,
  slot: 'Red 1' | 'Red 2' | 'Red 3' | 'Blue 1' | 'Blue 2' | 'Blue 3',
  team: number,
  name: string,
  leftstartzone: boolean,
  autospeakerscored: number,
  autospeakermissed: number,
  autoampscored: number,
  autoampmissed: number,
  teleopspeakerscored: number,
  teleopspeakermissed: number,
  teleopampscored: number,
  teleopampmissed: number,
  teleoptrapscored: number,
  teleoptrapmissed: number,
  endgame: 'Nothing' | 'Parked' | 'Failed Climb' | 'Climbed' | 'Harmony',
  defence: "0 - No Defence" | "1 - Penalties Galore" | "2 - Some Penalties" | "3 - Ineffective" | "4 - Good Defence" | "5 - Strong.",
  status: "0 - No-Show" | "1 - Didn't Move" | "2 - Broke In Match" | "3 - Disconnections" | "4 - No Issues (Solid)" | "5 - Pro Preformance",
  fouls: number,
  techfouls: number,
  comments: string,
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
