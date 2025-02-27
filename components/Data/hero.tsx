"use client";

import { AreaChart } from "@mantine/charts";
import { Stack, Group, useMantineTheme, Text, Container } from "@mantine/core";
import { AreaChartData } from "../../app/(header)/data/[id]/page";

interface HeroProps {
  pa: AreaChartData;
  autoPA: AreaChartData;
  teleopPA: AreaChartData;
  endgamePA: AreaChartData;
  avePA: number;
  aveAutoPA: number;
  aveTeleopPA: number;
  aveEndgamePA: number;
}

export default function Hero({
  pa,
  autoPA,
  teleopPA,
  endgamePA,
  avePA,
  aveAutoPA,
  aveTeleopPA,
  aveEndgamePA,
}: HeroProps) {
  const theme = useMantineTheme();

  return (
    <Container>
      <Group>
        <Stack>
          <Text ta="center">Total Points Added</Text>
          <AreaChart
            h={300}
            w={450}
            data={pa}
            dataKey="product"
            referenceLines={[
              { y: avePA, label: `Mean: ${avePA}`, color: theme.colors.pillow[2] },
            ]}
            series={[{ name: "points", color: theme.colors.pillow[1] }]}
            withPointLabels
          />
          <Text ta="center">Auto Points Added</Text>
          <AreaChart
            h={300}
            w={450}
            data={autoPA}
            dataKey="product"
            referenceLines={[
              { y: aveAutoPA, label: `Mean: ${aveAutoPA}`, color: theme.colors.pillow[2] },
            ]}
            series={[{ name: "points", color: theme.colors.pillow[1] }]}
            withPointLabels
          />
        </Stack>
        <Stack>
          <Text ta="center">TeleOp Points Added</Text>
          <AreaChart
            h={300}
            w={450}
            data={teleopPA}
            dataKey="product"
            referenceLines={[
              { y: aveTeleopPA, label: `Mean: ${aveTeleopPA}`, color: theme.colors.pillow[2] },
            ]}
            series={[{ name: "points", color: theme.colors.pillow[1] }]}
            withPointLabels
          />
          <Text ta="center">Endgame Points Added</Text>
          <AreaChart
            h={300}
            w={450}
            data={endgamePA}
            dataKey="product"
            referenceLines={[
              { y: aveEndgamePA, label: `Mean: ${aveEndgamePA}`, color: theme.colors.pillow[2] },
            ]}
            series={[{ name: "points", color: theme.colors.pillow[1] }]}
            withPointLabels
          />
        </Stack>
      </Group>
    </Container>
  );
}
