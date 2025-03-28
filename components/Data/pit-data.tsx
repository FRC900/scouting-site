"use client";

import {
  Badge,
  Blockquote,
  Stack,
  Group,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { PitDataProps } from "../../lib/definitions";
import { IconPencil, IconShield } from "@tabler/icons-react";

export default function PitData({
  weight,
  drive,
  gamePiece,
  electrical,
  connection,
  bumpers,
  reversible,
  bumpernotes,
  note,
}: PitDataProps) {
  const theme = useMantineTheme();

  const connectors = connection
    .map((connector) => connector.toString())
    .join(", ");

  return (
    <Stack align="center" gap={30}>
      <Text ta="center" size="xl">
        Pit Form Response:
      </Text>
      <Group justify="center">
        <Badge color={theme.colors.amethyst[3]} size="xl" radius="md">
          {weight} lbs.
        </Badge>
        <Badge color={theme.colors.cornflower[6]} size="xl" radius="md">
          Drive: {drive}
        </Badge>
        <Badge color={theme.colors.pistachio[7]} size="xl" radius="md">
          {gamePiece}
        </Badge>
        <Badge color={theme.colors.electric[6]} size="xl" radius="md">
          Electrical: {electrical}
        </Badge>
        <Badge color={theme.colors.electric[6]} size="xl" radius="md">
          {connectors}
        </Badge>
        <Badge color={theme.colors.rose[5]} size="xl" radius="md">
          Bumpers: {bumpers}
        </Badge>
        <Badge color={theme.colors.rose[5]} size="xl" radius="md">
          {reversible ? "Reversible!" : "Not Reversible"}
        </Badge>
      </Group>
      <Group>
        <Blockquote color={theme.colors.rose[5]} icon={<IconShield />}>
          {bumpernotes}
        </Blockquote>
        <Blockquote color={theme.colors.pillow[2]} icon={<IconPencil />}>
          {note}
        </Blockquote>
      </Group>
    </Stack>
  );
}
