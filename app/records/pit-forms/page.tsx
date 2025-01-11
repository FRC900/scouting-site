import { Title, Container } from "@mantine/core";
import { PitRecord, PitRecordRow } from "../../../components/Tables/pit-form-table"
import { fetchPitForms } from "../../../lib/data";
import PitFormsTable from "../../../components/Tables/pit-form-table";

export default async function Page() {
  const pitforms: PitRecordRow[] = await fetchPitForms();
  
  let data: PitRecord[] = [];
  let count = 0;
  pitforms.map((entry) => {
    const values = entry.row.toString().split("(")[1].split(")")[0];
    const id = values.split(",")[0];
    const team = +values.split(",")[1];
    const date = values.split(",")[2];

    data.splice(count, 0, {id, team, date});
    count++
  });

  return(
    <>
      <Title>Pit Forms</Title>
      <Container>
        <PitFormsTable data={data} />
      </Container>
    </>
  )
}