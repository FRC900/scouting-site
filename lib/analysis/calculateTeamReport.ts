import { fetchStandFormsByTeam, fetchPitFormByTeam } from "../data";
import { FullTeamData, Note } from "../definitions";
import teamYear from "../fetchers/sb/teamYear";
import { calcAutoPointsAdded, calcEndgamePointsAdded, calcPointsAdded, calcTeleopPointsAdded } from "./pointsAdded";

export default async function calculateTeam(teamNumber: number) {
    // Fetch Data from Database, Blue Alliance, and Statbotics
    const standRecordsData = fetchStandFormsByTeam(teamNumber);
    const pitRecordData = fetchPitFormByTeam(teamNumber);
    const statboticsData = teamYear(teamNumber);

    // The Blue Alliance:
    // /team/{team_key}/event/{event_key}/status
    // /team/{team_key}/simple
    // /event/{event_key}/oprs 

    // Statbotics:
    // /v3/team_year/{team}/{year}

    // Parallel Data Fetching
    const [standRecords, pitRecord, statbotics] = await Promise.all([standRecordsData, pitRecordData, statboticsData]);

    const notes: Note[] = standRecords.map((form) => {
        return({
            note: form.notes,
            user: form.username,
            status: form.status,
        })
    })
    
    const teamData: FullTeamData = {
        name: statbotics.name,
        pa: calcPointsAdded(standRecords),
        autoPA: calcAutoPointsAdded(standRecords),
        teleopPA: calcTeleopPointsAdded(standRecords),
        endgamePA: calcEndgamePointsAdded(standRecords),
        notes: notes,
    };

    return teamData;
}