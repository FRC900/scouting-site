import { year } from "../../constants";
import { getSBHeaders } from "../getHeaders";

export default async function teamYear(team: number) {
  const headers = getSBHeaders();
  const apiRes = await fetch(
    `https://api.statbotics.io/v3/team_year/${team}/${year}`,
    {
      headers,
    }
  ).then((res) => res.json());
  return apiRes;
}