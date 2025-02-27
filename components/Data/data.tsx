"use client";

import { Title, useMantineTheme, Tabs, rem, Container, Text } from "@mantine/core";
import {
  IconChartDonutFilled,
  IconChartCandleFilled,
  IconClipboardDataFilled,
} from "@tabler/icons-react";
import {
  Breakdown,
  Data,
  Insights,
  Monstrosity,
  SOS,
} from "../../lib/definitions";
import InsightsTable from "../Tables/insights-table";
import BreakdownTable from "../Tables/breakdown-table";
import DataTable from "../Tables/data-table";
// import SOSTable from "../Tables/sos-table";

interface DataTabsProps {
  teamData: Monstrosity[];
}

export default function DataTabs({ teamData }: DataTabsProps) {
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

  // const sos: SOS[] = teamData.map((row) => {
  //   const sos: SOS = {
  //     team: row.team,
  //     name: row.name,
  //     rank: row.rank,
  //     avePA: row.avePA,
  //     ...row.sos,
  //   };
  //   return sos;
  // });

  return (
    <>
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
            <Text size='md'>Insights</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value="breakdown"
            leftSection={
              <IconChartDonutFilled style={{ width: rem(16), height: rem(16) }} />
            }
          >
            <Text size='md'>Breakdown</Text>
          </Tabs.Tab>
          <Tabs.Tab
            value="data"
            leftSection={
              <IconClipboardDataFilled style={{ width: rem(16), height: rem(16) }} />
            }
          >
            <Text size='md'>Data</Text>
          </Tabs.Tab>
          {/* <Tabs.Tab
            value="sos"
            leftSection={
              <IconSos style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Strength of Schedule
          </Tabs.Tab> */}
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
        {/* <Tabs.Panel value="sos">
          {Array.isArray(sos) ? (
            <SOSTable data={sos} />
          ) : (
            <p>Error: Data is not an array</p>
          )}
        </Tabs.Panel> */}
      </Tabs>
    </>
  );
}
