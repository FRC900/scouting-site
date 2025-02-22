import { Breadcrumbs, Title } from "@mantine/core";
import { fetchPitFormById } from "../../../../../../lib/data";
import PitForm from "../../../../../../components/Forms/pit"

const items = [
  { title: 'Pit Form' },
  { title: 'Edit Form' },
].map((item) => (
  <Title order={3} key={item.title}>
    {item.title}
  </Title>
));

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const form = await fetchPitFormById(id);

  return(
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <PitForm create={false} defaultForm={form} id={id} />
    </>
  )
}