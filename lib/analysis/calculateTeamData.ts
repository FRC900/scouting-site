import findTeamAtEvent from "../fetchers/findTeamsAtEvent";
import { fetchStandFormsByTeam } from "../data";

export default async function calculateTeamData() {
    // Using Event Key, Fetch all the Participating Teams.
    const teams = await findTeamAtEvent();
    
    teams.map(async (team) => {
        const teamsStandForms = await fetchStandFormsByTeam(team);

        // Calculate forms by team.

        
    })

    
}