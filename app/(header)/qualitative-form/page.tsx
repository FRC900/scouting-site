import { Title } from "@mantine/core";
import QualitativeForm from "../../../components/Forms/qualitative";

export default function Page() {
  return (
    <>
      <Title>Qualitative Form</Title>
      <QualitativeForm create={true} id="" />
    </>
  )
}