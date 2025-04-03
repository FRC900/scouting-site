import { mean, quantile } from "simple-statistics";
import { StandForm, type OnlyBreakdown } from "../../definitions";
import {
  calcAutoPointsAdded,
  calcTeleopAlgae,
  calcTeleopCoral,
  calcTeleopPointsAdded,
} from "../pointsAdded";

interface BreakdownProps {
  teamStandForms: StandForm[];
  pointsAdded: { match: number; points: number }[];
  opr: number;
}

export default function getBreakdown({
  teamStandForms,
  pointsAdded,
  opr,
}: BreakdownProps) {
  const autoPointsAdded = calcAutoPointsAdded(teamStandForms);
  const teleopPointsAdded = calcTeleopPointsAdded(teamStandForms);
  const teleopCoral = calcTeleopCoral(teamStandForms);
  const teleopAlgae = calcTeleopAlgae(teamStandForms);

  const breakdown: OnlyBreakdown = {
    APA: Math.round(mean(pointsAdded.map((points) => points.points)) * 10) /10,
    q75PA: quantile(
      pointsAdded.map((points) => points.points),
      0.75
    ),
    autoAPA: Math.round(mean(autoPointsAdded.map((points) => points.points)) * 10) / 10,
    autoQ75PA: quantile(
      autoPointsAdded.map((points) => points.points),
      0.75
    ),
    teleopAPA: Math.round(mean(teleopPointsAdded.map((points) => points.points)) * 10) / 10,
    teleopQ75PA: quantile(
      teleopPointsAdded.map((points) => points.points),
      0.75
    ),
    q75coral: quantile(teleopCoral, 0.75),
    q75algae: quantile(teleopAlgae, 0.75),
    OPR: Math.round(opr * 10) / 10,
  };

  return breakdown;
}
