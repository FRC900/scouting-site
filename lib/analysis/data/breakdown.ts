import { max, quantile } from "simple-statistics";
import { StandForm, type OnlyBreakdown } from "../../definitions";
import { calcAutoPointsAdded, calcEndgamePointsAdded, calcTeleopAlgae, calcTeleopCoral } from "../pointsAdded";

interface BreakdownProps {
  teamStandForms: StandForm[];
  pointsAdded: number[];
  sb_teamYear: any; // type should be added to definitions (too lazy rn)
  opr: number;
}

export default function getBreakdown({
  teamStandForms,
  pointsAdded,
  sb_teamYear,
  opr
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
    tba_opr: Math.round(opr * 10) / 10,
    sb_epa: sb_teamYear.epa?.total_points.mean || 0,
  };

  return breakdown;
}
