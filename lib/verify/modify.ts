import { sum } from "simple-statistics";
import { fetchStandFormsByTeam } from "../data";
import { StandFormDatabase, VerificationErrors } from "../definitions";
import eventTeamsKeys from "../fetchers/tba/eventTeamsKeys";

export default async function modifyForms(errors: VerificationErrors[]) {
  // calculate team averages of: autocoral, teleopcoral, and processor
  const averages: {
    team: number;
    autoL1: number;
    autoL2: number;
    autoL3: number;
    autoL4: number;
    teleopL1: number;
    teleopL2: number;
    teleopL3: number;
    teleopL4: number;
    processor: number;
  }[] = [];

  // get teams at events
  const teams: number[] = await eventTeamsKeys();

  // map teams and pull their forms
  const averages_promise = teams.map(async (team) => {
    const teamStandForms: StandFormDatabase[] = await fetchStandFormsByTeam(
      team
    );
    if (teamStandForms.length === 0) return -1;

    // calculate averages and add them to averages object
    const autoL1 = teamStandForms.map((form) => {
      return form.autoL1;
    });
    const autoL2 = teamStandForms.map((form) => {
      return form.autoL2;
    });
    const autoL3 = teamStandForms.map((form) => {
      return form.autoL3;
    });
    const autoL4 = teamStandForms.map((form) => {
      return form.autoL4;
    });
    const teleopL1 = teamStandForms.map((form) => {
      return form.teleopL1;
    });
    const teleopL2 = teamStandForms.map((form) => {
      return form.teleopL2;
    });
    const teleopL3 = teamStandForms.map((form) => {
      return form.teleopL3;
    });
    const teleopL4 = teamStandForms.map((form) => {
      return form.teleopL4;
    });
    const processor = teamStandForms.map((form) => {
      return form.teleopProcessor;
    });

    averages.push({
      team: team,
      autoL1: sum(autoL1) / autoL1.length,
      autoL2: sum(autoL2) / autoL2.length,
      autoL3: sum(autoL3) / autoL3.length,
      autoL4: sum(autoL4) / autoL4.length,
      teleopL1: sum(teleopL1) / teleopL1.length,
      teleopL2: sum(teleopL2) / teleopL2.length,
      teleopL3: sum(teleopL3) / teleopL3.length,
      teleopL4: sum(teleopL4) / teleopL4.length,
      processor: sum(processor) / processor.length,
    });
  });
  Promise.all(averages_promise);

  // map through matches with errors
  const errors_promise = errors.map((alliance) => {
    // map through errors in match
    const alliance_promise = alliance.errors.map((error) => {
      // calculate weights for each team

      let total_average = 0;
      const team_averages: { team: number, average: number }[] = [];

      alliance.teams.map((team) => {
        // ai came up with this code idk how it works (i hope it does work)

        const typeToAverageKey: { [key: string]: keyof (typeof averages)[0] } =
          {
            autoL1: "autoL1",
            autoL2: "autoL2",
            autoL3: "autoL3",
            autoL4: "autoL4",
            teleopL1: "teleopL1",
            teleopL2: "teleopL2",
            teleopL3: "teleopL3",
            teleopL4: "teleopL4",
            processor: "processor",
          };

        const averageKey = typeToAverageKey[error.type];
        const team_average = averageKey
          ? averages.find((a) => a.team === team.number)?.[averageKey] || 0
          : 0;
        
        total_average += team_average;
        
        team_averages.push({
          team: team.number,
          average: team_average,
        })
      });

      
      // map through teams
      alliance.teams.map((team) => {
        // ind team average / total average
        const weight = (team_averages.find((a) => a.team === team.number)?.average || 0) / total_average

        // weight * magnitude
        const change = weight * error.magnitude

        // upload verified form
      })

      
      
    });
    Promise.all(alliance_promise);
  });
  Promise.all(errors_promise);
}
