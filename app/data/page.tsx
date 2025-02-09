import { Container, Title } from "@mantine/core";
import calculateSimpleTeamData from "../../lib/analysis/calculateSimpleTeamData";
import TeamDataTable from "../../components/Tables/team-data-table";
import { SimpleTeamData } from "../../lib/definitions";

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
