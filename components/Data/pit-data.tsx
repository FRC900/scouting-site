"use client";

import {
  Badge,
  Container,
  Group,
  NumberInputStylesNames,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { PitDataProps } from "../../lib/definitions";

export default function PitData({
  weight,
  drive,
  gamePiece,
  electrical,
  bumpers,
}: PitDataProps) {
  const theme = useMantineTheme();

  return (
    <Container>
      <Text ta="center" size="xl">Pit Form Response:</Text>
      <Group>
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
        <Badge color={theme.colors.rose[5]} size="xl" radius="md">
          Bumpers: {bumpers}
        </Badge>
      </Group>
    </Container>
  );
}
