import { Container, Title } from "@mantine/core";
import calculateSimpleTeamData from "../../lib/analysis/calculateSimpleTeamData";
import TeamDataTable from "../../components/Tables/team-data-table";
import { SimpleTeamData } from "../../lib/definitions";
import { unstable_cache } from "next/cache";

export const dynamic = 'force-dynamic';

const team = unstable_cache(
  async () => {
      return await calculateSimpleTeamData();
  },
  ['stand'],
  { revalidate: 3600, tags: ['stand'] }
)

export default async function Page() {
  const simpleTeamData: SimpleTeamData[] = await team();

  return (
    <>
      <Title>Team Data</Title>
      <Container>
        <TeamDataTable data={simpleTeamData} />
      </Container>
    </>
  );
}
