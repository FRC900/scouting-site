import eventTeamsKeys from "../../fetchers/tba/eventTeamsKeys";
import { fetchStandFormsByTeam } from "../../data";
import { StandForm, Monstrosity } from "../../definitions";
import teamYear from "../../fetchers/sb/teamYear";
import getInsights from "./insights";
import getBreakdown from "./breakdown";
import getData from "./data";
import getSOS from "./sos";
import teamEventStatus from "../../fetchers/tba/teamEventStatus";

const averagePA = (forms: StandForm[]) => {
  const totalPA = forms
    .map((form: StandForm) => {
      let endgame = 0;
      switch (form.endgame) {
        case "Parked": {
          endgame = 2;
        }
        case "Shallow": {
          endgame = 6;
        }
        case "Deep": {
          endgame = 12;
        }
      }
      let startingZone = 0;
      if (form.startingZone === true) {
        startingZone = 3;
      }
      const matchPA =
        form.autoL1 * 3 +
        form.autoL2 * 4 +
        form.autoL3 * 6 +
        form.autoL4 * 7 +
        form.teleopL1 * 2 +
        form.teleopL2 * 3 +
        form.teleopL3 * 4 +
        form.teleopL4 * 5 +
        form.teleopProcessor * 6 +
        form.teleopNet * 4 +
        endgame +
        startingZone;

      return matchPA;
    })
    .reduce((a, b) => a + b, 0);
  return totalPA / forms.length;
};

export default async function calculateSimpleTeamData() {
  // Using Event Key, Fetch all the Participating Teams.
  const teams: number[] = await eventTeamsKeys();

  let theMonstrosity: Monstrosity[] = [];

  const promises = teams.map(async (team: number) => {
    // Pull Data about specific team
    const teamStandForms: StandForm[] = await fetchStandFormsByTeam(team);
    if (teamStandForms.length === 0) return;

    const sbteamYear = teamYear(team);
    const tbastatus = teamEventStatus(team);
    const [sb_teamYear, tba_status] = await Promise.all([sbteamYear, tbastatus]);

    const avePA = averagePA(teamStandForms);

    const insights = getInsights({ teamStandForms, avePA });
    const breakdown = getBreakdown();
    const data = getData();
    const sos = getSOS();

    const teamData: Monstrosity = {
      team: team,
      name: sb_teamYear.name,
      rank: tba_status.qual.ranking.rank,
      avePA: avePA,
      insights: {
        ...insights,
      },
      breakdown: {
        ...breakdown,
      },
      data: {
        ...data,
      },
      sos: {
        ...sos,
      },
    };

    theMonstrosity.push(teamData);
  });

  await Promise.all(promises);

  return theMonstrosity;
}
