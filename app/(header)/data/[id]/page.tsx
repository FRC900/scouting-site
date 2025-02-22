import { Stack, Title, Center } from "@mantine/core";
import calculateTeam from "../../../../lib/analysis/calculateTeamReport";
import { unstable_cache } from "next/cache";
import Hero from "../../../../components/Data/hero";
import Notes from "../../../../components/Data/notes";

const getTeam = unstable_cache(
  async (team) => {
    return await calculateTeam(+team);
  },
  ["stand", "pit"],
  { revalidate: 3600, tags: ["stand", "pit"] }
);

export type AreaChartData = {
  product: string;
  points: number;
}[];

export default async function Page({ params }: { params: { id: string } }) {
  const team = await calculateTeam(+params.id);

  const pa: AreaChartData = team.pa.map((num, index) => {
    return {
      product: `Match ${index + 1}`,
      points: num,
    };
  });

  const autoPA: AreaChartData = team.autoPA.map((num, index) => {
    return {
      product: `Match ${index + 1}`,
      points: num,
    };
  });

  const teleopPA: AreaChartData = team.teleopPA.map((num, index) => {
    return {
      product: `Match ${index + 1}`,
      points: num,
    };
  });

  const endgamePA: AreaChartData = team.endgamePA.map((num, index) => {
    return {
      product: `Match ${index + 1}`,
      points: num,
    };
  });

  // Team Number and Name
  // Robot Picture
  // Link to The Blue Alliance and Statbotics
  // Radar Chart

  // What is their autos?
  // Penalties?
  // Status
  // Notes
  // Weight + Drive Train + Preferred Game Piece + Electrical + Bumpers

  return (
    <>
      <Stack>
        <Center>
          <Title>
            {params.id} / {team.name}
          </Title>
        </Center>

        <Hero
          pa={pa}
          autoPA={autoPA}
          teleopPA={teleopPA}
          endgamePA={endgamePA}
        />  

        <Notes notes={team.notes} />
      </Stack>
    </>
  );
}
