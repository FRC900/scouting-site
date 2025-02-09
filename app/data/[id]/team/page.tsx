import { Title } from "@mantine/core";
import calculateTeam from "../../../../lib/analysis/calculateFullTeamData";

export default async function Page({ params }: { params: { id: string } }) {
    const team = await calculateTeam(+params.id);
    
    // Team Number and Name
    // Robot Picture
    // Link to The Blue Alliance and Statbotics
    // Radar Chart

    // Graph of Points Added
    // Graph of Auto Points Added
    // Graph of Teleop Points Added
    // Graph of Endgame Points Added

    // What is their autos?
    // Penalties?
    // Status
    // Notes
    // Weight + Drive Train + Preferred Game Piece + Electrical + Bumpers

    return (
        <>
            <Title>{params.id} / {team.name}</Title>
        </>
    )
}