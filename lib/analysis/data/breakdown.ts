import { type OnlyBreakdown } from "../../definitions";

export default function getBreakdown() {
  const breakdown: OnlyBreakdown = {
    maxPA: 0,
    maxAutoPA: 0,
    maxTeleopPA: 0,
    maxEndgamePA: 0,
    tba_opr: 0,
    sb_epa: 0,
  };

  return breakdown;
}
