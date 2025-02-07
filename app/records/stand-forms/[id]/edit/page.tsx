import { Breadcrumbs, Title } from "@mantine/core";
import { fetchStandFormById } from "../../../../../lib/data";
import StandForm from "../../../../../components/Forms/stand";

const items = [
  { title: 'Pit Form' },
  { title: 'Edit Form ' },
].map((item) => (
  <Title order={3} key={item.title}>
    {item.title}
  </Title>
));

export default async function Page({ params }: { params: { id: string } }) {
  const id = params.id;
  const form = await fetchStandFormById(id);

  return (
    <>
      <Breadcrumbs>{items}</Breadcrumbs>
      <StandForm create={false} defaultForm={form} id={id} />
    </>
  )
}