import { Button, Container, Space, Stack } from "@mantine/core";
import VerifyAccordian from "../../../../components/Verify/verify";
import { VerificationErrors } from "../../../../lib/definitions";
import verify from "../../../../lib/verify";
import { unstable_cache } from "next/cache";

export const dynamic = 'force-dynamic'

const cached_verify = unstable_cache(
  async () => {
    return await verify();
  },
  ["stand"],
  { revalidate: 3600, tags: ["stand"] }
);

export default async function Page() {
  const errors = await cached_verify();
  errors.sort(
    (a, b) =>
      parseInt(a.key.slice(0, a.key.indexOf("-"))) -
      parseInt(b.key.slice(0, b.key.indexOf("-")))
  );

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
