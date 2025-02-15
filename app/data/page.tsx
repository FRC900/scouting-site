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

  console.log("simpleTeamData:", simpleTeamData);
  console.log("Type of simpleTeamData:", typeof simpleTeamData);
  console.log("Is simpleTeamData an array?", Array.isArray(simpleTeamData));

  return (
    <>
      <Title>Team Data</Title>
      <Container>
        {Array.isArray(simpleTeamData) ? (
          <TeamDataTable data={simpleTeamData} />
        ) : (
          <p>Error: Data is not an array</p>
        )}
      </Container>
    </>
  );
}
