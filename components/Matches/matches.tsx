"use client";

import { rem, Tabs, Title, useMantineTheme } from "@mantine/core";
import { IconScale, IconSquareLetterE, IconSquareLetterQ } from "@tabler/icons-react";

export default function MatchesTabs() {
  const theme = useMantineTheme();

  return (
    <>
      <Title>Matches</Title>
      <Tabs
        color={theme.colors.milkshake[4]}
        variant="pills"
        defaultValue="qual"
      >
        <Tabs.List grow justify="center">
          <Tabs.Tab
            value="qual"
            leftSection={
              <IconSquareLetterQ style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Qual Matches
          </Tabs.Tab>
          <Tabs.Tab
            value="elim"
            leftSection={
              <IconSquareLetterE style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Elim Matches
          </Tabs.Tab>
          <Tabs.Tab
            value="alliances"
            leftSection={
              <IconScale style={{ width: rem(14), height: rem(14) }} />
            }
          >
            Alliances
          </Tabs.Tab>
        </Tabs.List>
        <Tabs.Panel value="qual">
          Feature Coming Soon
        </Tabs.Panel>
        <Tabs.Panel value="elim">
          Feature Coming Soon
        </Tabs.Panel>
        <Tabs.Panel value="alliances">
          Feature Coming Soon
        </Tabs.Panel>
      </Tabs>
    </>
  );
}
