"use client";

import { Title, useMantineTheme, Tabs, rem, Text, Button } from "@mantine/core";
import {
  IconChartDonutFilled,
  IconChartCandleFilled,
  IconClipboardDataFilled,
} from "@tabler/icons-react";
import { Breakdown, Data, Insights, Monstrosity } from "../../lib/definitions";
import InsightsTable from "../Tables/insights-table";
import BreakdownTable from "../Tables/breakdown-table";
import DataTable from "../Tables/data-table";

interface DataTabsProps {
  teamData: Monstrosity[];
  cached: boolean;
}

export default function DataTabs({ teamData, cached }: DataTabsProps) {
  const theme = useMantineTheme();

  const insights: Insights[] = teamData.map((row) => {
    const insight: Insights = {
      team: row.team,
      name: row.name,
      rank: row.rank,
      avePA: row.avePA,
      ...row.insights,
    };
    return insight;
  });

  const breakdown: Breakdown[] = teamData.map((row) => {
    const breakdown: Breakdown = {
      team: row.team,
      name: row.name,
      rank: row.rank,
      avePA: row.avePA,
      ...row.breakdown,
    };
    return breakdown;
  });

  const data: Data[] = teamData.map((row) => {
    const data: Data = {
      team: row.team,
      name: row.name,
      rank: row.rank,
      avePA: row.avePA,
      ...row.data,
    };
    return data;
  });

  return (
    <>  
      {cached ? null : (
        <Button color={theme.colors.milkshake[4]} onClick={() => window.location.reload()}>
          Load More Teams
        </Button>
      )}
      <Title>Team Data</Title>
      <Tabs
        color={theme.colors.milkshake[4]}
        variant="pills"
        defaultValue="insights"
      >
        <Tabs.List grow justify="center">
          <Tabs.Tab
            value="insights"
            leftSection={
              <IconChartCandleFilled
                style={{ width: rem(16), height: rem(16) }}
              />
            }
          >
            <Text size="md">Insights</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value="breakdown"
            leftSection={
              <IconChartDonutFilled
                style={{ width: rem(16), height: rem(16) }}
              />
            }
          >
            <Text size="md">Breakdown</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value="data"
            leftSection={
              <IconClipboardDataFilled
                style={{ width: rem(16), height: rem(16) }}
              />
            }
          >
            <Text size="md">Data</Text>
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="insights">
          {Array.isArray(insights) ? (
            <InsightsTable data={insights} />
          ) : (
            <p>Error: Data is not an array</p>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="breakdown">
          {Array.isArray(breakdown) ? (
            <BreakdownTable data={breakdown} />
          ) : (
            <p>Error: Data is not an array</p>
          )}
        </Tabs.Panel>
        <Tabs.Panel value="data">
          {Array.isArray(data) ? (
            <DataTable data={data} />
          ) : (
            <p>Error: Data is not an array</p>
          )}
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
