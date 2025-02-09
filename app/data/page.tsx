import { Container, Title } from "@mantine/core";
import calculateTeamData from "../../lib/analysis/calculateTeamData";
import TeamDataTable from "../../components/Tables/team-data-table";
import { TeamData } from "../../lib/definitions";

export default async function Page() {
  const calculations: TeamData[] = await calculateTeamData();

  return (
    <>
      <Title>Team Data</Title>
      <Container>
        <TeamDataTable data={calculations} />
      </Container>
    </>
  );
}
