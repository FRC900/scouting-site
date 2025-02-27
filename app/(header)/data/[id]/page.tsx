import { Stack, Title, Group, Button, rem } from "@mantine/core";
import calculateTeam from "../../../../lib/analysis/calculateTeamReport";
import { unstable_cache } from "next/cache";
import Hero from "../../../../components/Data/hero";
import Notes from "../../../../components/Data/notes";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";
import { year } from "../../../../lib/constants";

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
  const team = await getTeam(params.id);

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

  // Robot Picture
  // Link to The Blue Alliance and Statbotics
  // Penalties?
  // Weight + Drive Train + Preferred Game Piece + Electrical + Bumpers

  return (
    <>
      <Stack>
        <Group justify="space-around">
          <Title>
            {params.id} / {team.name}
          </Title>
          <Group>
            <Button
              component={Link}
              href={`https://thebluealliance.com/team/${params.id}`}
              target="_blank"
              variant="outline"
              color="indigo"
              rightSection={
                <IconExternalLink style={{ width: rem(16), height: rem(16) }} />
              }
            >
              TBA
            </Button>
            <Button
              component={Link}
              href={`https://statbotics.io/team/${params.id}/${year}`}
              target="_blank"
              variant="outline"
              color="red"
              rightSection={
                <IconExternalLink style={{ width: rem(16), height: rem(16) }} />
              }
            >
              Statbotics
            </Button>
          </Group>
        </Group>

        <Hero
          pa={pa}
          autoPA={autoPA}
          teleopPA={teleopPA}
          endgamePA={endgamePA}
          avePA={team.avePA}
          aveAutoPA={team.aveAutoPA}
          aveTeleopPA={team.aveTeleopPA}
          aveEndgamePA={team.aveEndgamePA}
        />

        <Notes notes={team.notes} />
      </Stack>
    </>
  );
}
