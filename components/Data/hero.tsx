"use client";

import { AreaChart, RadarChart } from "@mantine/charts";
import { Stack, Group, useMantineTheme } from "@mantine/core";
import { AreaChartData } from "../../app/(header)/data/[id]/page";

interface HeroProps {
  pa: AreaChartData;
  autoPA: AreaChartData;
  teleopPA: AreaChartData;
  endgamePA: AreaChartData;
}

export default function Hero({ pa, autoPA, teleopPA, endgamePA }: HeroProps) {
  const theme = useMantineTheme();

  return (
    <Stack>
      <Group>
        <AreaChart
          h={300}
          w={600}
          data={pa}
          dataKey="product"
          series={[{ name: "points", color: theme.colors.milkshake[4] }]}
        />
        <AreaChart
          h={300}
          w={600}
          data={autoPA}
          dataKey="product"
          series={[{ name: "points", color: theme.colors.milkshake[4] }]}
        />
      </Group>
      <Group>
        <AreaChart
          h={300}
          w={600}
          data={teleopPA}
          dataKey="product"
          series={[{ name: "points", color: theme.colors.milkshake[4] }]}
        />
        <AreaChart
          h={300}
          w={600}
          data={endgamePA}
          dataKey="product"
          series={[{ name: "points", color: theme.colors.milkshake[4] }]}
        />
      </Group>
    </Stack>
  );
}
