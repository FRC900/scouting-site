import { max, quantile } from "simple-statistics";
import { StandForm, type OnlyBreakdown } from "../../definitions";
import { calcAutoPointsAdded, calcEndgamePointsAdded, calcTeleopAlgae, calcTeleopCoral } from "./pointsAdded";

interface BreakdownProps {
  teamStandForms: StandForm[];
  pointsAdded: number[];
  team: number;
}

export default function getBreakdown({
  teamStandForms,
  pointsAdded,
  team,
}: BreakdownProps) {
  const autoPointsAdded = calcAutoPointsAdded(teamStandForms);
  const teleopCoral = calcTeleopCoral(teamStandForms);
  const teleopAlgae = calcTeleopAlgae(teamStandForms);

  const breakdown: OnlyBreakdown = {
    med: quantile(pointsAdded, 0.5),
    max: max(pointsAdded),
    autoMed: quantile(autoPointsAdded, 0.5),
    autoMax: max(autoPointsAdded),
    coralMax: max(teleopCoral),
    algaeMax: max(teleopAlgae),
    tba_opr: 0,
    sb_epa: 0,
  };

  return breakdown;
}
