import {getTBAHeaders} from "../getHeaders";
import { tbaEventKey } from "../../constants";
import { TBATeamEventStatus, TBATeamSimple } from "../../definitions";

export default async function teamSimple(team_number: number) {
    const team_key = `frc${team_number}`;
    const status: TBATeamSimple = await getTeamSimple(team_key);

    return status;
}

export async function getTeamSimple(team_key: string): Promise<TBATeamSimple> {
    const headers = getTBAHeaders();
    const apiRes = await fetch(
    `https://www.thebluealliance.com/api/v3/team/${team_key}/simple`,
    {
      headers,
    }
  ).then((res) => res.json());
  return apiRes;
}