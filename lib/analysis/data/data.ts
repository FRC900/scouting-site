import { type OnlyData } from "../../definitions";

  // const aveL1 =
  //   teamStandForms
  //     .map((form) => {
  //       return form.autoL1 + form.teleopL1;
  //     })
  //     .reduce((a, b) => a + b, 0) / teamStandForms.length;

  // const aveL2 =
  //   teamStandForms
  //     .map((form) => {
  //       return form.autoL2 + form.teleopL2;
  //     })
  //     .reduce((a, b) => a + b, 0) / teamStandForms.length;

  // const aveL3 =
  //   teamStandForms
  //     .map((form) => {
  //       return form.autoL3 + form.teleopL3;
  //     })
  //     .reduce((a, b) => a + b, 0) / teamStandForms.length;

  // const aveL4 =
  //   teamStandForms
  //     .map((form) => {
  //       return form.autoL4 + form.teleopL4;
  //     })
  //     .reduce((a, b) => a + b, 0) / teamStandForms.length;

  // const nothing = teamStandForms.filter(
  //   (form) => form.endgame === "Nothing"
  // ).length;
  // const parked = teamStandForms.filter(
  //   (form) => form.endgame === "Parked"
  // ).length;
  // const shallow = teamStandForms.filter(
  //   (form) => form.endgame === "Shallow"
  // ).length;
  // const deep = teamStandForms.filter((form) => form.endgame === "Deep").length;

export default function getData() {
  const data: OnlyData = {
    preloaded: 0,
    startingZone: 0,
    auto: {
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 0,
    },
    teleop: {
      l1: 0,
      l2: 0,
      l3: 0,
      l4: 0,
    },
    processor: 0,
    net: 0,
    climb: {
      nothing: 0,
      parked: 0,
      shallow: 0,
      deep: 0,
    },
  };

  return data;
}
