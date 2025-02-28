import { Stack, Title, Group, Button, rem, Text } from "@mantine/core";
import calculateTeam from "../../../../lib/analysis/calculateTeamReport";
import { unstable_cache } from "next/cache";
import Charts from "../../../../components/Data/charts";
import Notes from "../../../../components/Data/notes";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";
import { year } from "../../../../lib/constants";
import PitData from "../../../../components/Data/pit-data";

const getTeam = (team: number) => {
  const data = unstable_cache(
    async () => {
      return await calculateTeam(team);
    },
    [`${team}`, "delete"],
    { revalidate: 3600, tags: [`${team}`, "delete"] }
  ); 
  
  return data();
}

export type AreaChartData = {
  product: string;
  points: number;
}[];

export default async function Page({ params }: { params: { id: string } }) {
  const team = await getTeam(+params.id);

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

  const penaltyPA: AreaChartData = team.penaltyPA.map((num, index) => {
    return {
      product: `Match ${index + 1}`,
      points: num,
    };
  });

  return (
    <>
      <Stack>
        <Group justify="space-between">
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

        <Charts
          pa={pa}
          autoPA={autoPA}
          teleopPA={teleopPA}
          endgamePA={endgamePA}
          penaltyPA={penaltyPA}
          avePA={team.avePA}
          aveAutoPA={team.aveAutoPA}
          aveTeleopPA={team.aveTeleopPA}
          aveEndgamePA={team.aveEndgamePA}
          avePenaltyPA={team.avePenaltyPA}
        />

        <Notes notes={team.notes} />

        {team.pitform.weight == 0 ? (
          <Text size="xl" ta="center">
            No Pit Form Submitted :(
          </Text>
        ) : (
          <PitData {...team.pitform} />
        )}
      </Stack>
    </>
  );
}
