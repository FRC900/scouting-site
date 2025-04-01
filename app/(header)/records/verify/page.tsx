import { Container, Stack, Title } from "@mantine/core";
import VerifyCards from "../../../../components/Verify/verify";
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
      <Stack align="center">
        <Title order={1}>Verification</Title>
        <VerifyCards errors={errors} />
      </Stack>
    </Container>
  );
}
