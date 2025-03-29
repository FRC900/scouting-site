import { fetchStandFormIDByMatchTeam } from "../data";
import { TBAEventMatch, VerificationErrors } from "../definitions";
import eventMatches from "../fetchers/tba/eventMatches";

export default async function verify() {
  // Which set of matches are we verifying? (All to start)

  // TBA: What matches have been played?
  const all_matches = await eventMatches();
  const matches: TBAEventMatch[] = [];
  all_matches.map((match) => {
    if (match.score_breakdown != null && match.comp_level === "qm") {
      matches.push(match);
    }
  });

  // Do we have all the forms for those matches?
  const errors: VerificationErrors[] = [];

  const errors_promise = matches.map(async (match) => {
    const red_teams: { number: number; form: String }[] = [];
    const red_push_promise = match.alliances.red.team_keys.map(async (key) => {
      const number = key.slice(3, 7);
      const id = await fetchStandFormIDByMatchTeam(number, match.match_number);
      id.map((i) => {
        const entry = {
          number: +number,
          form: i.id,
        };
        red_teams.push(entry)
      });
    });
    await Promise.all(red_push_promise)
    const red_errors = [];
    if (red_teams.length != 3) {
      red_errors.push({
        type: `Incorrect number of forms`,
        magnitude: red_teams.length - 3,
      });
    }
    
    if (red_errors.length > 0) {
      errors.push({
        key: `${match.match_number}-Red`,
        teams: red_teams,
        errors: red_errors,
      });
    }

    const blue_teams: { number: number; form: string }[] = [];
    const blue_push_promise = match.alliances.blue.team_keys.map(
      async (key) => {
        const number = key.slice(3, 7);
        const id = await fetchStandFormIDByMatchTeam(
          number,
          match.match_number
        );
        id.map((i) => {
          blue_teams.push({
            number: +number,
            form: i.id,
          })
        })
      }
    );
    await Promise.all(blue_push_promise)

    const blue_errors = [];
    if (blue_teams.length != 3) {
      blue_errors.push({
        type: `Incorrect number of forms`,
        magnitude: blue_teams.length - 3,
      });
    }
  
    if (blue_errors.length > 0) {
      errors.push({
        key: `${match.match_number}-Blue`,
        teams: blue_teams,
        errors: blue_errors,
      });
    }
  });

  await Promise.all(errors_promise)
  return errors;
}
