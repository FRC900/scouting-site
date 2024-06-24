import { tbaEventKey } from "./constants";
import { TBATeamSimple } from "./definitions";

export async function getTeams() {
	const headers = {
		"X-TBA-Auth-Key": `${process.env.NEXT_PUBLIC_TBA_SECRET}`,
	};

	const apiFetch = await fetch(
		`https://www.thebluealliance.com/api/v3/event/${tbaEventKey}/teams/simple`,
		{
			headers,
		}
	)
		.then((data) => data.json())
		.then((data: TBATeamSimple[]) => {
			return data;
		});

	return apiFetch;
}
