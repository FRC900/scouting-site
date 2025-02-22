import { Group, Title } from "@mantine/core";
import StandForm from "../../../components/Forms/stand";

export default function Page() {
  return(
    <>
      <Group justify="start">
        <Title order={1} fw={700}>Stand Form</Title>
      </Group>
      <StandForm create={true} id=""/>
    </>
  )
}