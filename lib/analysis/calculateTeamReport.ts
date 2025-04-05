import { average } from "simple-statistics";
import { fetchStandFormsByTeam, fetchPitFormByTeam } from "../data";
import {
  AreaChartData,
  ChartsData,
  FullTeamData,
  Note,
  StandFormDatabase,
} from "../definitions";
import teamSimple from "../fetchers/tba/teamSimple";
import {
  calcAutoPointsAdded,
  calcEndgamePointsAdded,
  calcPenaltyPointsAdded,
  calcPointsAdded,
  calcTeleopPointsAdded,
} from "./pointsAdded";

const charts = async (standRecords: StandFormDatabase[]) => {
  const pa = calcPointsAdded(standRecords);
  const autoPA = calcAutoPointsAdded(standRecords);
  const teleopPA = calcTeleopPointsAdded(standRecords);
  const endgamePA = calcEndgamePointsAdded(standRecords);
  const penaltyPA = calcPenaltyPointsAdded(standRecords);

  const chartData: AreaChartData = pa.map((points) => {
    return {
      qual: points.match.toString(),
      points: points.points,
    };
  });

  const autoChartData: AreaChartData = autoPA.map((points) => {
    return {
      qual: points.match.toString(),
      points: points.points,
    };
  });

  const teleopChartData: AreaChartData = teleopPA.map((points) => {
    return {
      qual: points.match.toString(),
      points: points.points,
    };
  });

  const endgameChartData: AreaChartData = endgamePA.map((points) => {
    return {
      qual: points.match.toString(),
      points: points.points,
    };
  });

  const penaltyChartData: AreaChartData = penaltyPA.map((points) => {
    return {
      qual: points.match.toString(),
      points: points.points,
    };
  });

  const chartAverage =
    Math.round(average(pa.map((points) => points.points)) * 10) / 10;

  const autoChartAverage =
    Math.round(average(autoPA.map((points) => points.points)) * 10) / 10;

  const teleopChartAverage =
    Math.round(average(teleopPA.map((points) => points.points)) * 10) / 10;

  const endgameChartAverage =
    Math.round(average(endgamePA.map((points) => points.points)) * 10) / 10;

  const penaltyChartAverage =
    Math.round(average(penaltyPA.map((points) => points.points)) * 10) / 10;

  const charts: ChartsData = {
    pa: chartData,
    autoPA: autoChartData,
    teleopPA: teleopChartData,
    endgamePA: endgameChartData,
    penaltyPA: penaltyChartData,
    avePA: chartAverage,
    aveAutoPA: autoChartAverage,
    aveTeleopPA: teleopChartAverage,
    aveEndgamePA: endgameChartAverage,
    avePenaltyPA: penaltyChartAverage,
  };

  return charts;
};

export default async function calculateTeam(teamNumber: number) {
  // Fetch Data from Database, Blue Alliance, and Statbotics
  const standRecordsData = fetchStandFormsByTeam(teamNumber);
  const pitRecordData = fetchPitFormByTeam(teamNumber);
  // const statboticsData = teamYear(teamNumber);
  const teamSimpleData = teamSimple(teamNumber);

  // The Blue Alliance:
  // /team/{team_key}/event/{event_key}/status
  // /team/{team_key}/simple
  // /event/{event_key}/oprs

  // Statbotics:
  // /v3/team_year/{team}/{year}

  // Parallel Data Fetching
  const [standRecords, pitRecord, team_simple] = await Promise.all([
    standRecordsData,
    pitRecordData,
    teamSimpleData,
  ]);

  const notes: Note[] = standRecords.map((form) => {
    return {
      note: form.notes,
      user: form.username,
      status: +form.status,
    };
  });

  const chartsData = await charts(standRecords);

  const teamData: FullTeamData = {
    name: team_simple.nickname,
    ...chartsData,
    notes: notes,
    pitform: {
      weight: pitRecord?.weight ?? 0,
      drive: pitRecord?.drive ?? "",
      gamePiece: pitRecord?.preferredscoring ?? "",
      electrical: pitRecord?.electrical ?? 0,
      connection: pitRecord?.connection ?? "",
      bumpers: pitRecord?.bumpers ?? 0,
      reversible: pitRecord?.reversible ?? false,
      bumpernotes: pitRecord?.bumpernotes ?? "",
      note: pitRecord?.notes ?? "",
    },
  };

  return teamData;
}
