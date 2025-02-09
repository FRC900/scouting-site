import findTeamAtEvent from "../fetchers/findTeamsAtEvent";
import { fetchStandFormsByTeam } from "../data";
import { StandForm, TeamData } from "../definitions";

const averagePA = (forms: StandForm[]) => {
  const totalPA = forms
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
        form.teleopProcessor * 6 +
        form.teleopNet * 4 +
        endgame +
        startingZone;

      return matchPA;
    })
    .reduce((a, b) => a + b, 0);
  return totalPA / forms.length;
};

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

export default async function calculateTeamData() {
  // Using Event Key, Fetch all the Participating Teams.
  const teams = await findTeamAtEvent();

  let calculations: TeamData[] = [];

  const promises = teams.map(async (team) => {
    const teamStandForms: StandForm[] = await fetchStandFormsByTeam(team);
    if (teamStandForms.length === 0) return;

    const avePA = averagePA(teamStandForms);
    const aveAutoPA = averageAutoPA(teamStandForms);
    const aveEndgamePA = averageEndgamePA(teamStandForms);
    const aveTeleopPA = avePA - aveAutoPA - aveEndgamePA;

    const data: TeamData = {
      team: team,
      avePA: avePA,
    //   aveAutoPA: aveAutoPA,
    //   aveTeleopPA: aveTeleopPA,
    //   aveEndgamePA: aveEndgamePA,
      coral: {
        l1: 2,
        l2: 2,
        l3: 2,
        l4: 2,
      },
      algae: 4,
      climb: {
        nothing: 2,
        parked: 2,
        shallow: 1,
        deep: 3,
      },
    };

    calculations.push(data);
  });

  await Promise.all(promises);
//testing testing
  return calculations;
}
