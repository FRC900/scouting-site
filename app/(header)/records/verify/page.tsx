import {
  Button,
  Container,
  Space,
  Stack,
} from "@mantine/core";
import VerifyAccordian from "../../../../components/Verify/verify";
import { VerificationErrors } from "../../../../lib/definitions";

/**
 * Level 0:
 *
 * total score
 *
 * Level 1:
 *
 * total auto points
 * total teleop points
 * minorfouls
 * majorfouls
 *
 * Level 2:
 *
 * autol1, autol2, autol3, autol4
 * teleopl1, teleopl2, teleopl3, teleopl4
 * teleopnet, teleopprocessor
 */

const errors: VerificationErrors[] = [
  {
    key: "3-Red",
    teams: [
      {
        number: 900,
        form: "id",
      },
      {
        number: 9000,
        form: "id",
      },
      {
        number: 9496,
        form: "id",
      },
    ],
    errors: [
      {
        type: "autol1",
        magnitude: 1,
      },
      {
        type: "autol2",
        magnitude: 2,
      },
    ],
  },
  {
    key: "3-Blue",
    teams: [
      {
        number: 900,
        form: "id",
      },
      {
        number: 9000,
        form: "id",
      },
      {
        number: 9496,
        form: "id",
      },
    ],
    errors: [
      {
        type: "autol1",
        magnitude: 1,
      },
      {
        type: "autol2",
        magnitude: 2,
      },
    ],
  },
];

export default function Page() {

  return (
    <Container>
      <Stack>
        <Button variant="filled" size="md">
          Verify Against TBA
        </Button>
        <Space h="xs" />
        <VerifyAccordian errors={errors} />
      </Stack>
    </Container>
  );
}
