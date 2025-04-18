"use client";

import { AreaChart } from "@mantine/charts";
import { Stack, Group, useMantineTheme, Text, Container } from "@mantine/core";
import { AreaChartData } from "../../lib/definitions";

interface ChartsProps {
  pa: AreaChartData;
  autoPA: AreaChartData;
  teleopPA: AreaChartData;
  endgamePA: AreaChartData;
  penaltyPA: AreaChartData;
  avePA: number;
  aveAutoPA: number;
  aveTeleopPA: number;
  aveEndgamePA: number;
  avePenaltyPA: number;
}

export default function Charts({
  pa,
  autoPA,
  teleopPA,
  endgamePA,
  penaltyPA,
  avePA,
  aveAutoPA,
  aveTeleopPA,
  aveEndgamePA,
  avePenaltyPA,
}: ChartsProps) {
  const theme = useMantineTheme();

  return (
    <Container>
      <Group>
        <Stack>
          <Text ta="center" size="lg">
            Total Points Added
          </Text>
          <AreaChart
            h={300}
            w={450}
            data={pa}
            dataKey="qual"
            referenceLines={[
              {
                y: avePA,
                label: `Mean: ${avePA}`,
                color: theme.colors.pillow[2],
              },
            ]}
            series={[{ name: "points", color: theme.colors.pillow[1] }]}
            withPointLabels
          />
          <Text ta="center" size="lg">
            Auto Points Added
          </Text>
          <AreaChart
            h={300}
            w={450}
            data={autoPA}
            dataKey="qual"
            referenceLines={[
              {
                y: aveAutoPA,
                label: `Mean: ${aveAutoPA}`,
                color: theme.colors.pillow[2],
              },
            ]}
            series={[{ name: "points", color: theme.colors.pillow[1] }]}
            withPointLabels
          />
        </Stack>
        <Stack>
          <Text ta="center" size="lg">
            TeleOp Points Added
          </Text>
          <AreaChart
            h={300}
            w={450}
            data={teleopPA}
            dataKey="qual"
            referenceLines={[
              {
                y: aveTeleopPA,
                label: `Mean: ${aveTeleopPA}`,
                color: theme.colors.pillow[2],
              },
            ]}
            series={[{ name: "points", color: theme.colors.pillow[1] }]}
            withPointLabels
          />
          <Text ta="center" size="lg">
            Endgame Points Added
          </Text>
          <AreaChart
            h={300}
            w={450}
            data={endgamePA}
            dataKey="qual"
            referenceLines={[
              {
                y: aveEndgamePA,
                label: `Mean: ${aveEndgamePA}`,
                color: theme.colors.pillow[2],
              },
            ]}
            series={[{ name: "points", color: theme.colors.pillow[1] }]}
            withPointLabels
          />
        </Stack>
        <Stack>
          <Text ta="center" size="lg">
            Penalty Points
          </Text>
          <AreaChart
            h={300}
            w={450}
            data={penaltyPA}
            dataKey="qual"
            referenceLines={[
              {
                y: avePenaltyPA,
                label: `Mean: ${avePenaltyPA}`,
                color: theme.colors.rose[2],
              },
            ]}
            series={[{ name: "points", color: theme.colors.rose[1] }]}
            withPointLabels
          />
        </Stack>
      </Group>
    </Container>
  );
}
