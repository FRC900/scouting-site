import { startingEPAs, tbaEventKey } from "../constants";
import { StandForm, StandFormDatabase } from "../definitions";
import matchSimple from "../fetchers/tba/matchSimple";
import { calcPointsAdded } from "./pointsAdded";

interface Props {
  teamStandForms: StandFormDatabase[];
  pointsAdded: { match: number; points: number }[];
}

export default function epa({ teamStandForms, pointsAdded }: Props) {
  // dEPA = k * (1/(1+m)) * ((iscore - iepa) - m * (bluescore - blueepa) / 3)

  const k = 0.3; // amount of change.                               0.5 early season, 0.3 late season
  const m = 1;   // weighted impact of other alliance performance,  0 early season,   1 late season

  pointsAdded.sort((a, b) => a.match - b.match);

  let EPA = startingEPAs.find(a => a.team === teamStandForms[0].team)?.EPA || 17;

  pointsAdded.map((points) => {
    // const match_key = tbaEventKey + "_qm" + points.match.toString()
    // const match = matchSimple(match_key);
    
    EPA = EPA + k * (points.points - EPA);
    console.log(EPA)
  })

  return EPA;
}