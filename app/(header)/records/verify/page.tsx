import { Button, Container, Space, Stack } from "@mantine/core";
import VerifyAccordian from "../../../../components/Verify/verify";
import { VerificationErrors } from "../../../../lib/definitions";
import verify from "../../../../lib/verify";
import { unstable_cache } from "next/cache";

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

const cached_verify = unstable_cache(
  async () => {
    return await verify();
  },
  ["stand"],
  { revalidate: 3600, tags: ["stand"] }
);

export default async function Page() {
  const errors = await cached_verify();

  return (
    <Container>
      <Stack>
        {/* <Button variant="filled" size="md">
          Verify Against TBA
        </Button>
        <Space h="xs" /> */}
        <VerifyAccordian errors={errors} />
      </Stack>
    </Container>
  );
}
