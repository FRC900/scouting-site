import { average } from "simple-statistics";
import { StandForm, type OnlyData } from "../../definitions";

export default function getData(teamStandForms: StandForm[]) {
  const startingZone =
    (teamStandForms.filter((form) => form.startingZone === true).length /
      teamStandForms.length) *
    100;

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

  const climbPoints = parked * 2 + shallow * 6 + deep * 12;

  const data: OnlyData = {
    startingZone: Math.round(startingZone * 10) / 10,
    coral: {
      l1:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.autoL1 + form.teleopL1;
            })
          ) * 10
        ) / 10,
      l2:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.autoL2 + form.teleopL2;
            })
          ) * 10
        ) / 10,
      l3:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.autoL3 + form.teleopL3;
            })
          ) * 10
        ) / 10,
      l4:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.autoL4 + form.teleopL4;
            })
          ) * 10
        ) / 10,
    },
    algae: {
      processor:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.teleopProcessor;
            })
          ) * 10
        ) / 10,
      net:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.teleopNet;
            })
          ) * 10
        ) / 10,
    },
    climb: climbPoints,
  };

  return data;
}
