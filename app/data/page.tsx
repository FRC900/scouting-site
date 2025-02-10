import { Container, Title } from "@mantine/core";
import calculateSimpleTeamData from "../../lib/analysis/calculateSimpleTeamData";
import TeamDataTable from "../../components/Tables/team-data-table";
import { SimpleTeamData } from "../../lib/definitions";
import { useRouter } from "next/router";

export const dynamic = 'force-dynamic';

export default async function Page() {
  const simpleTeamData: SimpleTeamData[] = await calculateSimpleTeamData();

  return (
    <>
      <Title>Team Data</Title>
      <Container>
        <TeamDataTable data={simpleTeamData} />
      </Container>
    </>
  );
}
