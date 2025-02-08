import { Container, Title } from "@mantine/core";
import StandFormsTable, { StandRecordRow, StandRecord } from "../../../components/Tables/stand-form-table";
import { fetchStandFormsLimited } from "../../../lib/data";

export default async function Page() {
  const standforms: StandRecordRow[] = await fetchStandFormsLimited();

  let data: StandRecord[] = [];
  let count = 0;
	standforms.map((entry) => {
		const values = entry.row.toString().split("(")[1].split(")")[0];
    const id = values.split(",")[0];
		const match = +values.split(",")[1];
		const team = +values.split(",")[2];
		const username = values.split(",")[3];
		const date = values.split(",")[4];

    data.splice(count, 0, {id, match, team, username, date});
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