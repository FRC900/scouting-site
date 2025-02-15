import { Title } from "@mantine/core";
import calculateTeam from "../../../lib/analysis/calculateFullTeamData";
import { unstable_cache } from "next/cache";

const getTeam = unstable_cache(
    async (team) => {
        return await calculateTeam(+team);
    },
    ['stand', 'pit'],
    { revalidate: 3600, tags: ['stand', 'pit'] }
)

export default async function Page({ params }: { params: { id: string } }) {
    
    const team = await getTeam(params.id);
    
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
            <p>Charts and stuff on the way</p>
        </>
    )
}