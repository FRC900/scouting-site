import findTeamAtEvent from "../fetchers/findTeamsAtEvent";
import { fetchStandFormsByTeam } from "../data";
import { StandForm } from "../definitions";

const directEPA = (forms: StandForm[]) => {
    let PA: number[] = []; 
    let count = 0;
    forms.map((form: StandForm) => {
        let endgame = 0;
        switch (form.endgame) { case "Parked": { endgame = 2 }; case "Shallow": { endgame = 6 }; case "Deep": { endgame = 12 } }
        let startingZone = 0;
        if (form.startingZone === true) { startingZone = 3 }
        const matchPA = (form.autoL1 * 3 + form.autoL2 * 4 + form.autoL3 * 6 + form.autoL4 * 7 + form.teleopL1 * 2 + form.teleopL2 * 3 + form.teleopL3 * 4 + form.teleopL4 * 5 + form.teleopProcessor * 6 + form.teleopNet * 4) + endgame + startingZone;

        PA.splice(count, 0, matchPA)
        count++
    })
    return (PA.reduce((a, b) => a + b, 0) / forms.length);
}

export default async function calculateTeamData() {
    // Using Event Key, Fetch all the Participating Teams.
    const teams = await findTeamAtEvent();

    teams.map(async (team) => {
        const teamStandForms: StandForm[] = await fetchStandFormsByTeam(team);
        if (teamStandForms.length === 0) return;
        // Calculate forms by team.

        const dEPA = directEPA(teamStandForms);
        console.log(teamStandForms[0].team + " " + dEPA);

    })


}