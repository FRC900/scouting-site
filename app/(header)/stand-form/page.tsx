import { Group, Title } from "@mantine/core";
import StandForm from "../../../components/Forms/stand";

export default function Page() {
  return(
    <>
      <Group justify="start">
        <Title>Stand Form</Title>
      </Group>
      <StandForm create={true} id=""/>
    </>
  )
}