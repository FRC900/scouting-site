import {getTBAHeaders} from "../getHeaders";
import { tbaEventKey } from "../../constants";
import { TBAEventMatch } from "../../definitions";

export default async function eventMatches() {
    const matches: TBAEventMatch[] = await getMatches();

    return matches;
}

async function getMatches() {
    const headers = getTBAHeaders();
    const apiRes = await fetch(
    `https://www.thebluealliance.com/api/v3/event/${tbaEventKey}/matches`,
    {
      headers,
    }
  ).then((res) => res.json());
  return apiRes;
}