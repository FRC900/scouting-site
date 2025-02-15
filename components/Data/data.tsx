"use client";

import { Title, useMantineTheme, Tabs, rem, Container } from "@mantine/core";
import {
  IconChartDots3,
  IconClipboardData,
  IconSos,
} from "@tabler/icons-react";
import { SimpleTeamData } from "../../lib/definitions";
import TeamDataTable from "../Tables/team-data-table";

interface DataTabsProps {
  data: SimpleTeamData[];
}

export default function DataTabs({ data }: DataTabsProps) {
  const theme = useMantineTheme();

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
              <IconChartDots3 style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Insights
          </Tabs.Tab>
          <Tabs.Tab
            value="breakdown"
            leftSection={
              <IconClipboardData style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Breakdown
          </Tabs.Tab>
          <Tabs.Tab
            value="sos"
            leftSection={
              <IconSos style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Strength of Schedule
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="insights">
          <Container>
            {Array.isArray(data) ? (
              <TeamDataTable data={data} />
            ) : (
              <p>Error: Data is not an array</p>
            )}
          </Container>
        </Tabs.Panel>
        <Tabs.Panel value="breakdown">Breakdown content</Tabs.Panel>
        <Tabs.Panel value="sos">Strength of Schedule content</Tabs.Panel>
      </Tabs>
    </>
  );
}
