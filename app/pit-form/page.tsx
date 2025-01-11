import PitForm from "../../components/Forms/pit"
import { Title } from "@mantine/core"

export default function Page() {
  return(
    <>
      <Title>Pit Form</Title>
      <PitForm create={true} id="" />
    </>
  )
}