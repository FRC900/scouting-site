import {getTBAHeaders} from "../getHeaders";

export default async function matchSimple(match_key: string) {
    const match = await getMatch(match_key);

    return match;
}

async function getMatch(match_key: string) {
    const headers = getTBAHeaders();
    const apiRes = await fetch(
    `https://www.thebluealliance.com/api/v3/match/${match_key}/simple`,
    {
      headers,
    }
  ).then((res) => res.json());
  return apiRes;
}