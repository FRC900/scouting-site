import { TBAMatchSimple, TBATeamSimple } from "../definitions";
import getMatchKey from "../getMatchKey";

export default async function findTeamNumber<Promise = number>(
	match: number,
	slot: string
) {
	const match_key = getMatchKey(match);
	const matches = await getMatch(match_key);
	const team_key = deduceteamKey(matches, slot);
	if (team_key === 'fail') return 0;
	const team = await getTeam(team_key);
	
	return team?.team_number || 0;
}

const deduceteamKey = (matches: TBAMatchSimple, slot: string) => {
	const color = slot.split(" ")[0];
	const spot: number = (+slot.split(" ")[1]) - 1;

	if (color === "Red") {
		const team_key = matches.alliances?.red.team_keys[spot];
		return team_key;
	} else if (color === "Blue") {
		const team_key = matches.alliances?.blue.team_keys[spot];
		return team_key;
	} else return 'fail';
};

function getHeaders() {
	const headers = new Headers();
	headers.append("X-TBA-Auth-Key", String(process.env.NEXT_PUBLIC_TBA_SECRET));
	headers.append("accept", "application/json");
	return headers;
}

async function getMatch(match_key: string): Promise<TBAMatchSimple> {
	const headers = getHeaders();
	const apiRes = await fetch(
		`https://www.thebluealliance.com/api/v3/match/${match_key}/simple`,
		{
			headers,
		}
	).then((res) => res.json());
	return apiRes;
}

async function getTeam(team_key: string): Promise<TBATeamSimple> {
	const headers = getHeaders();
	const apiRes = await fetch(
		`https://www.thebluealliance.com/api/v3/team/${team_key}/simple`,
		{
			headers,
		}
	).then((res) => res.json());
	return apiRes;
}
