"use client";

import { Button, Group, Space, Text, useMantineTheme, Card, Badge, Stack } from "@mantine/core";
import capitalize from "../../lib/capitalize";
import Link from "next/link";
import { VerificationErrors } from "../../lib/definitions";

export default function VerifyCards({ errors }: { errors: VerificationErrors[] }) {
  const theme = useMantineTheme();

  const items = errors.map((error) => (
    <Card key={error.key}>
      <Group justify="space-around" mt="xs" mb="xs">
          <Text fw={700}>Match {error.key.split('-')[0]}</Text>
          <Badge color={`${error.key.split('-')[1].toLowerCase()}`}>{error.key.split('-')[1]} Alliance</Badge>
      </Group>
      <Group>
          {error.teams.map((team, index) => (
            <Button
              key={index}
              component={Link}
              href={`/records/stand-forms/${team.form}/edit`}
              variant="filled"
              color={theme.colors.milkshake[4]}
            >
              {team.number}
            </Button>
          ))}
        </Group>
        <Space h="sm" />
        <Stack gap={1}>
          {error.errors.map((error, index) => (
            <Text size="md" key={index}>
              {capitalize(error.type)}: {error.magnitude}
            </Text>
          ))}
        </Stack>
    </Card>
  ));

  return (
    <Group justify="center">
      {items}
    </Group>
  );
}
