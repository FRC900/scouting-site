import { type OnlyData } from "../../definitions";

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
