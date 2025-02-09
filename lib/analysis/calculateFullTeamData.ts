import { fetchStandFormsByTeam, fetchPitFormByTeam } from "../data";
import { FullTeamData } from "../definitions";
import teamYear from "../fetchers/sb/teamYear";

export default async function calculateTeam(teamNumber: number) {
    // Fetch information about the team from our records, tba records, statbotics records, etc.
    const standRecords = await fetchStandFormsByTeam(teamNumber);
    const pitRecord = await fetchPitFormByTeam(teamNumber);
    const statbotics = await teamYear(teamNumber);

    // The Blue Alliance:
    // /team/{team_key}/event/{event_key}/status
    // /team/{team_key}/simple
    // /event/{event_key}/oprs

    // Statbotics:
    // /v3/team_year/{team}/{year}

    const teamData: FullTeamData = {
        name: statbotics.name,
    };

    return teamData;
}