import { tbaEventKey } from "./constants";

export default function getMatchKey(match: number) {
  const match_key: string = tbaEventKey + "_qm" +  match.toString();
  return match_key;
}