import {
  Title,
  Container,
  Badge,
  Text,
  Group,
  useMantineTheme,
} from "@mantine/core";
import {
  PitRecord,
  PitRecordRow,
} from "../../../../components/Tables/pit-form-table";
import { fetchPitFormsLimited } from "../../../../lib/data";
import PitFormsTable from "../../../../components/Tables/pit-form-table";
import eventTeamsKeys from "../../../../lib/fetchers/tba/eventTeamsKeys";

export default async function Page() {
  const pitforms: PitRecordRow[] = await fetchPitFormsLimited();

  let data: PitRecord[] = [];
  let count = 0;
  pitforms.map((entry) => {
    const values = entry.row.toString().split("(")[1].split(")")[0];
    const id = values.split(",")[0];
    const team = +values.split(",")[1];
    const date = values.split(",")[2];

    data.splice(count, 0, { id, team, date });
    count++;
  });

  const allTeams: number[] = await eventTeamsKeys();
  const unscouted: number[] = [];
  const scouted: number[] = data.map((entry) => {
    return entry.team;
  });
  allTeams.map((team) => {
    if (!scouted.includes(team)) {
      unscouted.push(team);
    }
  });
  unscouted.sort((a, b) => a - b)

  const items = unscouted.map((team) => {
    return <Badge key={team} radius="md">{team}</Badge>;
  });

  return (
    <>
      <Title>Pit Forms</Title>
      {unscouted.length > 0 ? (
        <Container>
          <Group>
            <Text size="lg">Unscouted Teams:</Text>
            {items}
          </Group>
        </Container>
      ) : null}
      <Container>
        <PitFormsTable data={data} />
      </Container>
    </>
  );
}
