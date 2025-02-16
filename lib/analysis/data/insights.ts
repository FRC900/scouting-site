import { number } from "zod";
import { type OnlyInsights, StandForm } from "../../definitions";

const averageAutoPA = (forms: StandForm[]) => {
  const totalAutoPA = forms
    .map((form: StandForm) => {
      let startingZone = 0;
      if (form.startingZone === true) startingZone = 3;

      return (
        form.autoL1 * 3 +
        form.autoL2 * 4 +
        form.autoL3 * 6 +
        form.autoL4 * 7 +
        startingZone
      );
    })
    .reduce((a, b) => a + b, 0);
  return totalAutoPA / forms.length;
};

const averageEndgamePA = (forms: StandForm[]) => {
  const totalEndgamePA = forms
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
      return endgame;
    })
    .reduce((a, b) => a + b, 0);
  return totalEndgamePA / forms.length;
};

interface InsightsProps {
  teamStandForms: StandForm[];
  avePA: number;
}

export default function getInsights({ teamStandForms, avePA }: InsightsProps) {
  const aveAutoPA = averageAutoPA(teamStandForms);
  const aveEndgamePA = averageEndgamePA(teamStandForms);
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

  const aveL1 =
    teamStandForms
      .map((form) => {
        return form.autoL1 + form.teleopL1;
      })
      .reduce((a, b) => a + b, 0) / teamStandForms.length;

  const aveL2 =
    teamStandForms
      .map((form) => {
        return form.autoL2 + form.teleopL2;
      })
      .reduce((a, b) => a + b, 0) / teamStandForms.length;

  const aveL3 =
    teamStandForms
      .map((form) => {
        return form.autoL3 + form.teleopL3;
      })
      .reduce((a, b) => a + b, 0) / teamStandForms.length;

  const aveL4 =
    teamStandForms
      .map((form) => {
        return form.autoL4 + form.teleopL4;
      })
      .reduce((a, b) => a + b, 0) / teamStandForms.length;

  const aveAlgae =
    teamStandForms
      .map((form) => {
        return form.teleopProcessor + form.teleopNet;
      })
      .reduce((a, b) => a + b, 0) / teamStandForms.length;

  const nothing = teamStandForms.filter(
    (form) => form.endgame === "Nothing"
  ).length;
  const parked = teamStandForms.filter(
    (form) => form.endgame === "Parked"
  ).length;
  const shallow = teamStandForms.filter(
    (form) => form.endgame === "Shallow"
  ).length;
  const deep = teamStandForms.filter((form) => form.endgame === "Deep").length;

  const avePenalties: number = teamStandForms.map((form) => {
    return form.fouls * 2 + form.techfouls * 6;
  }).reduce((a, b) => a + b, 0) / teamStandForms.length;

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
