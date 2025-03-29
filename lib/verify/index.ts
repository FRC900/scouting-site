import { TBAEventMatch } from "../definitions";
import eventMatches from "../fetchers/tba/eventMatches";

export default async function verify() {
  // Which set of matches are we verifying? (All to start)
  
  // TBA: What matches have been played?
  const all_matches = await eventMatches();
  const matches: TBAEventMatch[] = [];
  all_matches.map((match) => {
    if (match.score_breakdown != null && match.comp_level === "qm") {
      matches.push(match)
    }
  })

  // Do we have all the forms for those matches?
  matches.map((match) => {
    match.alliances.red.team_keys.map((key) => {
      const number = key.slice(3, 7)
      // console.log(number)
    })
  })

  // return ID of the forms we have.

  // return error for missing forms.
  
}