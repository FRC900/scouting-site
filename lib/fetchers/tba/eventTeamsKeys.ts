import {getTBAHeaders} from "../getHeaders";
import { tbaEventKey } from "../../constants";

export default async function eventTeamsKeys() {
    const frcteams: string[] = await getTeams();

    let teams: number[] = [];
    let count = 0;
    frcteams.map((team) => {
        const number = team.toString().split("frc")[1];
        teams.splice(count, 0, +number);
        count++;
    });

    return teams;
}

async function getTeams() {
    const headers = getTBAHeaders();
    const apiRes = await fetch(
		`https://www.thebluealliance.com/api/v3/event/${tbaEventKey}/teams/keys`,
		{
			headers,
		}
	).then((res) => res.json());
	return apiRes;
}