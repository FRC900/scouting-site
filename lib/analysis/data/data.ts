import { average } from "simple-statistics";
import { StandForm, type OnlyData } from "../../definitions";

export default function getData(teamStandForms: StandForm[]) {
  const preloaded =
    (teamStandForms.filter((form) => form.preloaded === true).length /
      teamStandForms.length) *
    100;

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

  const data: OnlyData = {
    preloaded: preloaded,
    startingZone: Math.round(startingZone * 10) / 10,
    auto: {
      l1:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.autoL1;
            })
          ) * 10
        ) / 10,
      l2:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.autoL2;
            })
          ) * 10
        ) / 10,
      l3:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.autoL3;
            })
          ) * 10
        ) / 10,
      l4:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.autoL4;
            })
          ) * 10
        ) / 10,
    },
    teleop: {
      l1:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.teleopL1;
            })
          ) * 10
        ) / 10,
      l2:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.teleopL2;
            })
          ) * 10
        ) / 10,
      l3:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.teleopL3;
            })
          ) * 10
        ) / 10,
      l4:
        Math.round(
          average(
            teamStandForms.map((form) => {
              return form.teleopL4;
            })
          ) * 10
        ) / 10,
    },
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
    climb: {
      nothing: nothing,
      parked: parked,
      shallow: shallow,
      deep: deep,
    },
  };

  return data;
}
