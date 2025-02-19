import { type OnlyInsights, StandForm } from "../../definitions";
import { calcAutoPointsAdded, calcEndgamePointsAdded } from "../pointsAdded";
import { average } from "simple-statistics";

interface InsightsProps {
  teamStandForms: StandForm[];
  avePA: number;
}

export default function getInsights({ teamStandForms, avePA }: InsightsProps) {
  const aveAutoPA = average(calcAutoPointsAdded(teamStandForms));
  const aveEndgamePA = average(calcEndgamePointsAdded(teamStandForms));
  const aveTeleopPA = avePA - aveAutoPA - aveEndgamePA;

  const aveCoral =
    teamStandForms
      .map((form) => {
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
      .reduce((a, b) => a + b, 0) / teamStandForms.length;

  const aveAlgae =
    teamStandForms
      .map((form) => {
        return form.teleopProcessor + form.teleopNet;
      })
      .reduce((a, b) => a + b, 0) / teamStandForms.length;

  const avePenalties: number =
    teamStandForms
      .map((form) => {
        return form.fouls * 2 + form.techfouls * 6;
      })
      .reduce((a, b) => a + b, 0) / teamStandForms.length;

  let count = 0;
  const defenceRating =
    teamStandForms
      .map((form) => {
        if (form.defence != "0") count++;
        return +form.defence;
      })
      .reduce((a, b) => a + b, 0) / count;

  const insights: OnlyInsights = {
    aveAutoPA: aveAutoPA,
    aveTeleopPA: aveTeleopPA,
    aveEndgamePA: aveEndgamePA,
    aveCoral: aveCoral,
    aveAlgae: aveAlgae,
    avePenalties: avePenalties,
    defence: defenceRating,
  };

  return insights;
}
