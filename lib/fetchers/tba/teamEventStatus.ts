import {getTBAHeaders} from "../getHeaders";
import { tbaEventKey } from "../../constants";
import { TBATeamEventStatus } from "../../definitions";

export default async function teamEventStatus(team_number: number) {
    const status: TBATeamEventStatus = await getStatus(team_number);

    return status;
}

async function getStatus(team_number: number) {
    const headers = getTBAHeaders();
    const apiRes = await fetch(
    `https://www.thebluealliance.com/api/v3/team/frc${team_number}/event/${tbaEventKey}/status`,
    {
      headers,
    }
  ).then((res) => res.json());
  return apiRes;
}