import { fetchStandFormById, fetchStandFormIDByMatchTeam } from "../data";
import {
  StandFormDatabase,
  TBAEventMatch,
  VerificationErrors,
} from "../definitions";
import eventMatches from "../fetchers/tba/eventMatches";

async function getForms(red_teams: string[], blue_teams: string[]) {
  const form1promise = fetchStandFormById(red_teams[0]);
  const form2promise = fetchStandFormById(red_teams[1]);
  const form3promise = fetchStandFormById(red_teams[2]);
  const form4promise = fetchStandFormById(blue_teams[0]);
  const form5promise = fetchStandFormById(blue_teams[1]);
  const form6promise = fetchStandFormById(blue_teams[2]);
  const red_forms = await Promise.all([
    form1promise,
    form2promise,
    form3promise,
  ]);
  const blue_forms = await Promise.all([
    form4promise,
    form5promise,
    form6promise
  ])

  return {red_forms, blue_forms};
}

function verifyRedAgainstTBA(forms: StandFormDatabase[], match: TBAEventMatch) {
  const errors = [];

  if (!match.score_breakdown) return false;

  const autoL1 =
    forms[0].autoL1 +
    forms[1].autoL2 +
    forms[2].autoL1 -
    match.score_breakdown.red.autoReef.trough;
  if (autoL1 != 0) {
    errors.push({
      type: "autoL1",
      magnitude: autoL1,
    });
  }

  const autoL2 =
    forms[0].autoL2 +
    forms[1].autoL2 +
    forms[2].autoL1 -
    match.score_breakdown.red.autoReef.tba_botRowCount;
  if (autoL2 != 0) {
    errors.push({
      type: "autoL2",
      magnitude: autoL2,
    });
  }

  const autoL3 =
    forms[0].autoL3 +
    forms[1].autoL3 +
    forms[2].autoL3 -
    match.score_breakdown.red.autoReef.tba_midRowCount;
  if (autoL3 != 0) {
    errors.push({
      type: "autoL3",
      magnitude: autoL3,
    });
  }

  const autoL4 =
    forms[0].autoL4 +
    forms[1].autoL4 +
    forms[2].autoL4 -
    match.score_breakdown.red.autoReef.tba_topRowCount;
  if (autoL4 != 0) {
    errors.push({
      type: "autoL4",
      magnitude: autoL4,
    });
  }

  const teleopL1 =
    forms[0].teleopL1 +
    forms[1].teleopL1 +
    forms[2].teleopL1 -
    match.score_breakdown.red.teleopReef.trough;
  if (teleopL1 != 0) {
    errors.push({
      type: "teleopL1",
      magnitude: teleopL1,
    });
  }

  const teleopL2 =
    forms[0].teleopL2 +
    forms[1].teleopL2 +
    forms[2].teleopL2 -
    match.score_breakdown.red.teleopReef.tba_botRowCount;
  if (teleopL2 != 0) {
    errors.push({
      type: "teleopL2",
      magnitude: teleopL2,
    });
  }

  const teleopL3 =
    forms[0].teleopL3 +
    forms[1].teleopL3 +
    forms[2].teleopL3 -
    match.score_breakdown.red.teleopReef.tba_midRowCount;
  if (teleopL3 != 0) {
    errors.push({
      type: "teleopL3",
      magnitude: teleopL3,
    });
  }

  const teleopL4 =
    forms[0].teleopL4 +
    forms[1].teleopL4 +
    forms[2].teleopL4 -
    match.score_breakdown.red.teleopReef.tba_topRowCount;
  if (teleopL4 != 0) {
    errors.push({
      type: "teleopL4",
      magnitude: teleopL4,
    });
  }

  const teleopProcessor =
    forms[0].teleopProcessor +
    forms[1].teleopProcessor +
    forms[2].teleopProcessor -
    match.score_breakdown.red.netAlgaeCount;
  if (teleopProcessor != 0) {
    errors.push({
      type: "teleopProcessor",
      magnitude: teleopProcessor,
    });
  }

  const minorfouls =
    forms[0].fouls +
    forms[1].fouls +
    forms[2].fouls -
    match.score_breakdown.red.foulCount;
  if (minorfouls != 0) {
    errors.push({
      type: "Minor Fouls",
      magnitude: minorfouls,
    });
  }

  const majorfouls =
    forms[0].techfouls +
    forms[1].techfouls +
    forms[2].techfouls -
    match.score_breakdown.red.techFoulCount;
  if (majorfouls != 0) {
    errors.push({
      type: "Major Fouls",
      magnitude: majorfouls,
    });
  }

  return errors;
}

function verifyBlueAgainstTBA(
  forms: StandFormDatabase[],
  match: TBAEventMatch
) {
  const errors = [];

  if (!match.score_breakdown) return false;

  const autoL1 =
    forms[0].autoL1 +
    forms[1].autoL2 +
    forms[2].autoL1 -
    match.score_breakdown.blue.autoReef.trough;
  if (autoL1 != 0) {
    errors.push({
      type: "autoL1",
      magnitude: autoL1,
    });
  }

  const autoL2 =
    forms[0].autoL2 +
    forms[1].autoL2 +
    forms[2].autoL1 -
    match.score_breakdown.blue.autoReef.tba_botRowCount;
  if (autoL2 != 0) {
    errors.push({
      type: "autoL2",
      magnitude: autoL2,
    });
  }

  const autoL3 =
    forms[0].autoL3 +
    forms[1].autoL3 +
    forms[2].autoL3 -
    match.score_breakdown.blue.autoReef.tba_midRowCount;
  if (autoL3 != 0) {
    errors.push({
      type: "autoL3",
      magnitude: autoL3,
    });
  }

  const autoL4 =
    forms[0].autoL4 +
    forms[1].autoL4 +
    forms[2].autoL4 -
    match.score_breakdown.blue.autoReef.tba_topRowCount;
  if (autoL4 != 0) {
    errors.push({
      type: "autoL4",
      magnitude: autoL4,
    });
  }

  const teleopL1 =
    forms[0].teleopL1 +
    forms[1].teleopL1 +
    forms[2].teleopL1 -
    match.score_breakdown.blue.teleopReef.trough;
  if (teleopL1 != 0) {
    errors.push({
      type: "teleopL1",
      magnitude: teleopL1,
    });
  }

  const teleopL2 =
    forms[0].teleopL2 +
    forms[1].teleopL2 +
    forms[2].teleopL2 -
    match.score_breakdown.blue.teleopReef.tba_botRowCount;
  if (teleopL2 != 0) {
    errors.push({
      type: "teleopL2",
      magnitude: teleopL2,
    });
  }

  const teleopL3 =
    forms[0].teleopL3 +
    forms[1].teleopL3 +
    forms[2].teleopL3 -
    match.score_breakdown.blue.teleopReef.tba_midRowCount;
  if (teleopL3 != 0) {
    errors.push({
      type: "teleopL3",
      magnitude: teleopL3,
    });
  }

  const teleopL4 =
    forms[0].teleopL4 +
    forms[1].teleopL4 +
    forms[2].teleopL4 -
    match.score_breakdown.blue.teleopReef.tba_topRowCount;
  if (teleopL4 != 0) {
    errors.push({
      type: "teleopL4",
      magnitude: teleopL4,
    });
  }

  const teleopProcessor =
    forms[0].teleopProcessor +
    forms[1].teleopProcessor +
    forms[2].teleopProcessor -
    match.score_breakdown.blue.netAlgaeCount;
  if (teleopProcessor != 0) {
    errors.push({
      type: "teleopProcessor",
      magnitude: teleopProcessor,
    });
  }

  const minorfouls =
    forms[0].fouls +
    forms[1].fouls +
    forms[2].fouls -
    match.score_breakdown.blue.foulCount;
  if (minorfouls != 0) {
    errors.push({
      type: "Minor Fouls",
      magnitude: minorfouls,
    });
  }

  const majorfouls =
    forms[0].techfouls +
    forms[1].techfouls +
    forms[2].techfouls -
    match.score_breakdown.blue.techFoulCount;
  if (majorfouls != 0) {
    errors.push({
      type: "Major Fouls",
      magnitude: majorfouls,
    });
  }

  return errors;
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
      const number = key.split("c")[1];
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
        const number = key.split("c")[1];
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

    const all_red_forms = red_teams.length == 3;
    const all_blue_forms = blue_teams.length == 3;

    const red_errors = [];
    const blue_errors = [];

    if (all_red_forms && all_blue_forms) {
      // Get all forms
      const forms = await getForms(
        [red_teams[0].form, red_teams[1].form, red_teams[2].form],
        [blue_teams[0].form, blue_teams[1].form, blue_teams[2].form]
      );

      const red_tba_errors = verifyRedAgainstTBA(forms.red_forms, match);
      if (red_tba_errors != false) {
        red_errors.push(...red_tba_errors);
      }

      const blue_tba_errors = verifyBlueAgainstTBA(forms.blue_forms, match);
      if (blue_tba_errors != false) {
        blue_errors.push(...blue_tba_errors)
      }
    }

    // Get Red Errors
    if (!all_red_forms) {
      red_errors.push({
        type: `Incorrect number of forms`,
        magnitude: red_teams.length - 3,
      });
    }

    // Get Blue Errors
    if (!all_blue_forms) {
      blue_errors.push({
        type: `Incorrect number of forms`,
        magnitude: blue_teams.length - 3,
      });
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
