import { startingEPAs } from "../constants";
import { fetchStandFormByMatchTeam } from "../data";
import { epaData, StandFormDatabase, TBAEventMatch } from "../definitions";
import teamYear from "../fetchers/sb/teamYear";
import eventMatches from "../fetchers/tba/eventMatches";
import eventTeamsKeys from "../fetchers/tba/eventTeamsKeys";

const k = 0.3; // amount of change.                               0.5 early season, 0.3 late season
const m = 1;   // weighted impact of other alliance performance,  0 early season,   1 late season

async function getForms(match: number, teams: number[]) {
  const forms: StandFormDatabase[] = [];

  teams.map(async (team) => {
    const form: StandFormDatabase = await fetchStandFormByMatchTeam(
      match,
      team
    );
    forms.push(form);
  });

  return forms;
}

const pointsAdded = (form: StandFormDatabase) => {
  let startingZone = 0;
  if (form.startingZone === true) {
    startingZone = 3;
  }

  const auto =
    form.autoL1 * 3 +
    form.autoL2 * 4 +
    form.autoL3 * 6 +
    form.autoL4 * 7 +
    startingZone;

  const teleop =
    form.teleopL1 * 2 +
    form.teleopL2 * 3 +
    form.teleopL3 * 4 +
    form.teleopL4 * 5 +
    form.teleopProcessor * 2 +
    form.teleopNet * 4;

  let endgame = 0;
  if (form.endgame === "Parked") {
    endgame = 2;
  } else if (form.endgame === "Shallow") {
    endgame = 6;
  } else if (form.endgame === "Deep") {
    endgame = 12;
  }

  const total = auto + teleop + endgame;

  return { total, auto, teleop, endgame };
};

export default async function epa() {
  // tba: find teams in event
  const teams = await eventTeamsKeys();

  // create object that holds epas for each team
  let EPAs: epaData[] = [];
  teams.map(async (team) => {
    const sb_teamYear = await teamYear(team);

    EPAs.push({
      team: team,
      EPA: startingEPAs.find((a) => a.team === team)?.EPA || 17,
      dEPA: 0,
      OffensiveEPA: 0,
      DefensiveEPA: 0,
      autoEPA: 0,
      teleopEPA: 0,
      endgameEPA: 0,  
      sbEPA: sb_teamYear.epa?.total_points.mean || 0,
    });
  });

  // tba: get event matches
  const all_matches = await eventMatches();
  const matches: TBAEventMatch[] = [];
  all_matches.map((match) => {
    if (match.score_breakdown != null && match.comp_level === "qm") {
      matches.push(match);
    }
  });

  // map through event matches lowest to highest
  matches.sort((a, b) => a.match_number - b.match_number);
  matches.map(async (match) => {
    // get forms for that match (if no forms, skip)
    const teams = [
      ...match.alliances.blue.team_keys.map((team) =>
        parseInt(team.replace("frc", ""))
      ),
      ...match.alliances.red.team_keys.map((team) =>
        parseInt(team.replace("frc", ""))
      ),
    ];
    const forms = await getForms(match.match_number, teams);
    if (forms.length != 6) return;

    // calculate each alliances performance
    const performance: {
      team: number;
      alliance: string;
      total: number;
    }[] = [];
    forms.map((form) => {
      const { total, auto, teleop, endgame } = pointsAdded(form);
      performance.push({
        team: +form.team,
        alliance: form.slot.split(" ")[0],
        total: total,
      });
    });
    let red_total = 0;
    let blue_total = 0;
    let red_expected = 0;
    let blue_expected = 0;
    performance.map((perf) => {
      if (perf.alliance.toLowerCase() === "red") {
        red_total += perf.total;
        red_expected += EPAs.find((a) => a.team === perf.team)?.EPA || 0;
      } else if (perf.alliance.toLowerCase() === "blue") {
        blue_total += perf.total;
        blue_expected += EPAs.find((a) => a.team === perf.team)?.EPA || 0;
      }
    })

    // map through teams
    teams.map((team) => {

      const perf = performance.find((a) => a.team === team);
      if (!perf) return;
      const epa = EPAs.find((a) => a.team === team);
      if (!epa) return;

      let opposition = 0;
      if (perf.alliance.toLowerCase() === "red") {
        opposition = red_total - red_expected;
      } else if (perf.alliance.toLowerCase() === "blue") {
        opposition = blue_total - blue_expected;
      }

      // modify their epa
      const dEPA = k * (1 / ( 1 + m )) * ((perf.total - epa.EPA) - m * (opposition))

      epa.EPA += dEPA;
    })
  });

  return EPAs;
  // dEPA = k * (1/(1+m)) * ((iscore - iepa) - m * (bluescore - blueepa) / 3)
}
