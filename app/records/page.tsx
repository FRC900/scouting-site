"use client";

import { Button, Group, useMantineTheme } from "@mantine/core";
import { IconFileFilled, IconUserFilled, IconRosetteDiscountCheckFilled } from '@tabler/icons-react'

export default function Page() {

  const theme = useMantineTheme();

  return(
    <>
      <Group justify="center" gap="lg">
        <Button variant="filled" color={theme.colors.milkshake[4]} size="md" leftSection={<IconFileFilled size={16} />}>
          Stand Forms
        </Button>
        <Button variant="filled" color={theme.colors.milkshake[4]} size="md" leftSection={<IconFileFilled size={16} />}>
          Pit Forms
        </Button>
        <Button variant="filled" color={theme.colors.milkshake[4]} size="md" leftSection={<IconUserFilled size={16} />}>
          Users
        </Button>
        <Button variant="filled" color={theme.colors.milkshake[4]} size="md" leftSection={<IconRosetteDiscountCheckFilled size={16} />}>
          Verify
        </Button>
      </Group>
    </>
  )
}