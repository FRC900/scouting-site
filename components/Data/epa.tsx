import { epaData } from "../../lib/definitions";

interface Props {
  data: epaData[];
}

export default function EpaTabs({ data }: Props) {
  return <>{data}</>
}