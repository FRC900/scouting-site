import { StandForm } from "../definitions";

export const calcPointsAdded = (forms: StandForm[]) => {
  const pointsAdded = forms.map((form: StandForm) => {
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
    let startingZone = 0;
    if (form.startingZone === true) {
      startingZone = 3;
    }
    const matchPA =
      form.autoL1 * 3 +
      form.autoL2 * 4 +
      form.autoL3 * 6 +
      form.autoL4 * 7 +
      form.teleopL1 * 2 +
      form.teleopL2 * 3 +
      form.teleopL3 * 4 +
      form.teleopL4 * 5 +
      form.teleopProcessor * 2 +
      form.teleopNet * 4 +
      endgame +
      startingZone;

    return matchPA;
  });

  return pointsAdded;
};

export const calcAutoPointsAdded = (forms: StandForm[]) => {
  const autoPointsAdded = forms.map((form: StandForm) => {
    let startingZone = 0;
    if (form.startingZone === true) startingZone = 3;

    return (
      form.autoL1 * 3 +
      form.autoL2 * 4 +
      form.autoL3 * 6 +
      form.autoL4 * 7 +
      startingZone
    );
  });

  return autoPointsAdded;
};

export const calcTeleopPointsAdded = (forms: StandForm[]) => {
  const teleopPointsAdded = forms.map((form: StandForm) => {
    return (
      form.teleopL1 * 2 +
      form.teleopL2 * 3 +
      form.teleopL3 * 4 +
      form.teleopL4 * 5 +
      form.teleopProcessor * 2 +
      form.teleopNet * 4
    );
  });

  return teleopPointsAdded;
};

export const calcTeleopCoral = (forms: StandForm[]) => {
  const teleopCoral = forms.map((form: StandForm) => {
    return form.teleopL1 + form.teleopL2 + form.teleopL3 + form.teleopL4;
  });

  return teleopCoral;
};

export const calcTeleopAlgae = (forms: StandForm[]) => {
  const teleopAlgae = forms.map((form: StandForm) => {
    return form.teleopProcessor + form.teleopNet;
  });

  return teleopAlgae;
};

export const calcEndgamePointsAdded = (forms: StandForm[]) => {
  const endgamePointsAdded = forms.map((form: StandForm) => {
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
  });

  return endgamePointsAdded;
};

export const calcPenaltyPointsAdded = (forms: StandForm[]) => {
  const penaltyPointsAdded = forms.map((forms: StandForm) => {
    return(
      forms.fouls * 2 +
      forms.techfouls * 6
    );
  })

  return penaltyPointsAdded;
}