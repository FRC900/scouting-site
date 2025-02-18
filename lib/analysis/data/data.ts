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
    startingZone: startingZone,
    auto: {
      l1: average(
        teamStandForms.map((form) => {
          return form.autoL1;
        })
      ),
      l2: average(
        teamStandForms.map((form) => {
          return form.autoL2;
        })
      ),
      l3: average(
        teamStandForms.map((form) => {
          return form.autoL3;
        })
      ),
      l4: average(
        teamStandForms.map((form) => {
          return form.autoL4;
        })
      ),
    },
    teleop: {
      l1: average(
        teamStandForms.map((form) => {
          return form.teleopL1;
        })
      ),
      l2: average(
        teamStandForms.map((form) => {
          return form.teleopL2;
        })
      ),
      l3: average(
        teamStandForms.map((form) => {
          return form.teleopL3;
        })
      ),
      l4: average(
        teamStandForms.map((form) => {
          return form.teleopL4;
        })
      ),
    },
    processor: average(
      teamStandForms.map((form) => {
        return form.teleopProcessor;
      })
    ),
    net: average(
      teamStandForms.map((form) => {
        return form.teleopNet;
      })
    ),
    climb: {
      nothing: nothing,
      parked: parked,
      shallow: shallow,
      deep: deep,
    },
  };

  return data;
}
