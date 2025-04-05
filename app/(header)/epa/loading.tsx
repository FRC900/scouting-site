"use client";

import { Loader, useMantineTheme } from "@mantine/core";

export default function Loading() {
  const theme = useMantineTheme()

  return <Loader color={theme.colors.milkshake[4]} />;
}