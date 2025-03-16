import eventTeamsKeys from "../../fetchers/tba/eventTeamsKeys";
import { fetchStandFormsByTeam } from "../../data";
import { StandForm, Monstrosity } from "../../definitions";
import teamYear from "../../fetchers/sb/teamYear";
import getInsights from "./insights";
import getBreakdown from "./breakdown";
import getData from "./data";
import teamEventStatus from "../../fetchers/tba/teamEventStatus";
import { calcPointsAdded } from "../pointsAdded";
import { average } from "simple-statistics";
import eventOprs from "../../fetchers/tba/eventOprs";
import teamSimple from "../../fetchers/tba/teamSimple";

interface Props {
  from: number;
  to: number;
}

export default async function calculateSimpleTeamData({ from, to }: Props) {
  // Using Event Key, Fetch all the Participating Teams.
  const allTeams: number[] = await eventTeamsKeys();
  allTeams.sort((a, b) => a - b);
  const teams = allTeams.slice(from, to);

  const oprs = await eventOprs();

  let theMonstrosity: Monstrosity[] = [];

  const promises = teams.map(async (team: number) => {
    // Pull Data about specific team
    const teamStandForms: StandForm[] = await fetchStandFormsByTeam(team);
    if (teamStandForms.length === 0) return;

    const sbteamYear = teamYear(team);
    const tbastatus = teamEventStatus(team);
    const tbateamSimple = teamSimple(team);
    const [sb_teamYear, tba_status, tba_teamSimple] = await Promise.all([
      sbteamYear,
      tbastatus,
      tbateamSimple
    ]);
    const opr = oprs.oprs[`frc${team}`];

    const pointsAdded = calcPointsAdded(teamStandForms);
    const avePA = average(pointsAdded);

    const insights = getInsights({ teamStandForms, avePA });
    const breakdown = getBreakdown({ teamStandForms, pointsAdded, sb_teamYear, opr });
    const data = getData(teamStandForms);

    const teamData: Monstrosity = {
      team: team,
      name: tba_teamSimple.nickname,
      rank: tba_status.qual.ranking.rank,
      avePA: Math.round(avePA * 10) / 10,
      insights: {
        ...insights,
      },
      breakdown: {
        ...breakdown,
      },
      data: {
        ...data,
      },
    };

    theMonstrosity.push(teamData);
  });

  await Promise.all(promises);

  return theMonstrosity;
}
