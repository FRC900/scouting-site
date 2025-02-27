import { average } from "simple-statistics";
import { fetchStandFormsByTeam, fetchPitFormByTeam } from "../data";
import { FullTeamData, Note } from "../definitions";
import teamYear from "../fetchers/sb/teamYear";
import teamSimple from "../fetchers/tba/teamSimple";
import { calcAutoPointsAdded, calcEndgamePointsAdded, calcPenaltyPointsAdded, calcPointsAdded, calcTeleopPointsAdded } from "./pointsAdded";

export default async function calculateTeam(teamNumber: number) {
    // Fetch Data from Database, Blue Alliance, and Statbotics
    const standRecordsData = fetchStandFormsByTeam(teamNumber);
    const pitRecordData = fetchPitFormByTeam(teamNumber);
    // const statboticsData = teamYear(teamNumber);
    const teamSimpleData = teamSimple(teamNumber);

    // The Blue Alliance:
    // /team/{team_key}/event/{event_key}/status
    // /team/{team_key}/simple
    // /event/{event_key}/oprs 

    // Statbotics:
    // /v3/team_year/{team}/{year}

    // Parallel Data Fetching
    const [standRecords, pitRecord, team_simple] = await Promise.all([standRecordsData, pitRecordData, teamSimpleData]);

    const notes: Note[] = standRecords.map((form) => {
        return({
            note: form.notes,
            user: form.username,
            status: +form.status,
        })
    })

    const pa = calcPointsAdded(standRecords);
    const autoPA = calcAutoPointsAdded(standRecords);
    const teleopPA = calcTeleopPointsAdded(standRecords);
    const endgamePA = calcEndgamePointsAdded(standRecords);
    const penaltyPA = calcPenaltyPointsAdded(standRecords);
    
    const teamData: FullTeamData = {
        name: team_simple.nickname,
        pa: pa,
        autoPA: autoPA,
        teleopPA: teleopPA,
        endgamePA: endgamePA,
        penaltyPA: penaltyPA,
        avePA: Math.round(average(pa) * 10) / 10,
        aveAutoPA: Math.round(average(autoPA) * 10) / 10,
        aveTeleopPA: Math.round(average(teleopPA) * 10) / 10,
        aveEndgamePA: Math.round(average(endgamePA) * 10) / 10,
        avePenaltyPA: Math.round(average(penaltyPA) * 10) / 10,
        notes: notes,
    };

    return teamData;
}