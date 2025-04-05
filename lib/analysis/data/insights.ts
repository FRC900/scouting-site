import { type OnlyInsights, StandFormDatabase } from "../../definitions";
import epa from "../epa";
import {
  calcAutoPointsAdded,
  calcEndgamePointsAdded,
  calcTeleopPointsAdded,
} from "../pointsAdded";
import { median, standardDeviation } from "simple-statistics";

interface InsightsProps {
  teamStandForms: StandFormDatabase[];
  pointsAdded: { match: number; points: number }[];
}

export default function getInsights({ teamStandForms, pointsAdded }: InsightsProps) {
  const medPA = median(
    pointsAdded.map((points) => points.points)
  );
  const sd = standardDeviation(pointsAdded.map((points) => points.points));
  const medAutoPA = median(
    calcAutoPointsAdded(teamStandForms).map((points) => points.points)
  );
  const medEndgamePA = median(
    calcEndgamePointsAdded(teamStandForms).map((points) => points.points)
  );
  const medTeleopPA = median(
    calcTeleopPointsAdded(teamStandForms).map((points) => points.points)
  );

  const medCoral = median(
    teamStandForms.map((form) => {
      return (
        form.autoL1 +
        form.autoL2 +
        form.autoL3 +
        form.autoL4 +
        form.teleopL1 +
        form.teleopL2 +
        form.teleopL3 +
        form.teleopL4
      );
    })
  );

  const medAlgae =
    teamStandForms
      .map((form) => {
        return form.teleopProcessor + form.teleopNet;
      })
      .reduce((a, b) => a + b, 0) / teamStandForms.length;

  const totalPenalties: number =
    teamStandForms
      .map((form) => {
        return form.fouls * 2 + form.techfouls * 6;
      })
      .reduce((a, b) => a + b, 0);

  // let count = 0;
  // const defenceRating =
  //   teamStandForms
  //     .map((form) => {
  //       if (form.defence != "0") count++;
  //       return +form.defence;
  //     })
  //     .reduce((a, b) => a + b, 0) / count;

  const insights: OnlyInsights = {
    MPA: medPA,
    SD: Math.round(sd * 10) / 10,
    autoMPA: Math.round(medAutoPA * 10) / 10,
    teleopMPA: Math.round(medTeleopPA * 10) / 10,
    endgameMPA: Math.round(medEndgamePA * 10) / 10,
    coral: Math.round(medCoral * 10) / 10,
    algae: Math.round(medAlgae * 10) / 10,
    penalties: Math.round(totalPenalties * 10) / 10,
  };

  return insights;
}
