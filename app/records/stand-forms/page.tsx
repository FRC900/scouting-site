import { Container, Title } from "@mantine/core";
import StandFormsTable, { StandRecordRow, StandRecord } from "../../../components/Tables/stand-form-table";
import { fetchStandForms } from "../../../lib/data";

export default async function Page() {
  const standforms: StandRecordRow[] = await fetchStandForms();

  let data: StandRecord[] = [];
  let count = 0
	standforms.map((entry) => {
		const values = entry.row.toString().split("(")[1].split(")")[0];
		const match = +values.split(",")[0];
		const team = +values.split(",")[1];
		const username = values.split(",")[2];
		const date = values.split(",")[3];

    data.splice(count, 0, {match, team, username, date});
    count++
	});
  
  return(
    <>
      <Title>Stand Forms</Title>
      <Container>
        <StandFormsTable data={data} />
      </Container>
    </>
  )
}