import { Stack, Title, Group, Button, rem, Text } from "@mantine/core";
import calculateTeam from "../../../../lib/analysis/calculateTeamReport";
import { unstable_cache } from "next/cache";
import Charts from "../../../../components/Data/charts";
import Notes from "../../../../components/Data/notes";
import Link from "next/link";
import { IconExternalLink } from "@tabler/icons-react";
import { year } from "../../../../lib/constants";
import PitData from "../../../../components/Data/pit-data";
import { AreaChartData } from "../../../../lib/definitions";

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

export default async function Page({ params }: { params: { id: string } }) {
  const team = await getTeam(+params.id);

  const pa: AreaChartData = team.pa.map((match) => {
    return {
      qual: match.qual,
      points: match.points,
    };
  });
  pa.sort((a, b) => parseInt(a.qual) - parseInt(b.qual));

  const autoPA: AreaChartData = team.autoPA.map((match) => {
    return {
      qual: match.qual,
      points: match.points,
    };
  });
  autoPA.sort((a, b) => parseInt(a.qual) - parseInt(b.qual));

  const teleopPA: AreaChartData = team.teleopPA.map((match) => {
    return {
      qual: match.qual,
      points: match.points,
    };
  });
  teleopPA.sort((a, b) => parseInt(a.qual) - parseInt(b.qual));

  const endgamePA: AreaChartData = team.endgamePA.map((match) => {
    return {
      qual: match.qual,
      points: match.points,
    };
  });
  endgamePA.sort((a, b) => parseInt(a.qual) - parseInt(b.qual));

  const penaltyPA: AreaChartData = team.penaltyPA.map((match) => {
    return {
      qual: match.qual,
      points: match.points,
    };
  });
  penaltyPA.sort((a, b) => parseInt(a.qual) - parseInt(b.qual));

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
