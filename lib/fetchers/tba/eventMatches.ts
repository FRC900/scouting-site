import {getTBAHeaders} from "../getHeaders";
import { tbaEventKey } from "../../constants";
import { TBAEventMatch, TBAEventOprs } from "../../definitions";

export default async function eventMatches() {
    const oprs: TBAEventMatch[] = await getMatches();

    return oprs;
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