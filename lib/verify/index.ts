import { fetchStandFormById, fetchStandFormIDByMatchTeam } from "../data";
import { TBAEventMatch, VerificationErrors } from "../definitions";
import eventMatches from "../fetchers/tba/eventMatches";

async function getForms(red_teams: string[], blue_teams: string[]) {
  const form1promise = fetchStandFormById(red_teams[0]);
  const form2promise = fetchStandFormById(red_teams[1]);
  const form3promise = fetchStandFormById(red_teams[2]);
  const form4promise = fetchStandFormById(blue_teams[0]);
  const form5promise = fetchStandFormById(blue_teams[1]);
  const form6promise = fetchStandFormById(blue_teams[2]);
  const forms = await Promise.all([
    form1promise,
    form2promise,
    form3promise,
    form4promise,
    form5promise,
    form6promise,
  ]);

  return forms;
}



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
    // Get Red Form Ids
    const red_teams: { number: number; form: string }[] = [];
    const red_push_promise = match.alliances.red.team_keys.map(async (key) => {
      const number = key.split("c")[1]
      const id = await fetchStandFormIDByMatchTeam(number, match.match_number);
      id.map((i) => {
        const entry = {
          number: +number,
          form: i.id,
        };
        red_teams.push(entry);
      });
    });

    // Get Blue From Ids
    const blue_teams: { number: number; form: string }[] = [];
    const blue_push_promise = match.alliances.blue.team_keys.map(
      async (key) => {
        const number = key.split("c")[1]
        const id = await fetchStandFormIDByMatchTeam(
          number,
          match.match_number
        );
        id.map((i) => {
          blue_teams.push({
            number: +number,
            form: i.id,
          });
        });
      }
    );

    await Promise.all(red_push_promise);
    await Promise.all(blue_push_promise);

    const all_red_forms = (red_teams.length == 3);
    const all_blue_forms = (blue_teams.length == 3);

    if (all_red_forms && all_blue_forms) {
      // Get all forms
      // const forms = getForms(
      //   [red_teams[0].form, red_teams[1].form, red_teams[2].form],
      //   [blue_teams[0].form, blue_teams[1].form, blue_teams[2].form]
      // );
    }

    // Get Red Errors
    const red_errors = [];
    if (!all_red_forms) {
      red_errors.push({
        type: `Incorrect number of forms`,
        magnitude: red_teams.length - 3,
      });
    } else {

    }

    // Get Blue Errors
    const blue_errors = [];
    if (!all_blue_forms) {
      blue_errors.push({
        type: `Incorrect number of forms`,
        magnitude: blue_teams.length - 3,
      });
    } else {

    }


    if (red_errors.length > 0) {
      errors.push({
        key: `${match.match_number}-Red`,
        teams: red_teams,
        errors: red_errors,
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

  await Promise.all(errors_promise);
  return errors;
}
