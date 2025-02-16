import {getTBAHeaders} from "../getHeaders";
import { tbaEventKey } from "../../constants";
import { TBAEventOprs } from "../../definitions";

export default async function eventOprs() {
    const oprs: TBAEventOprs = await getOprs();

    return oprs;
}

async function getOprs() {
    const headers = getTBAHeaders();
    const apiRes = await fetch(
    `https://www.thebluealliance.com/api/v3/event/${tbaEventKey}/oprs`,
    {
      headers,
    }
  ).then((res) => res.json());
  return apiRes;
}