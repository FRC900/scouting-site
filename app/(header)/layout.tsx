import { Stack } from "@mantine/core";
import Header from "../../components/Header";

export default function Layout({ children }: { children: any }) {
  return (
    <>
      <Header />
      <Stack align="center" gap="xs" pt="1rem">
        {children}
      </Stack>
    </>
  );
}
