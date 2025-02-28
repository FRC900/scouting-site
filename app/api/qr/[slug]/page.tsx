"use client";

import {
  Anchor,
  Group,
  List,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import Link from "next/link";
import React from "react";

export default function Page({ params }: { params: { slug: string } }) {
  const theme = useMantineTheme();

  const form: string[] = params.slug?.split("%2C");
  if (!Array.isArray(form)) return <></>;
  const items = form.map((entry, index) => (
    <List.Item key={index}>{entry}</List.Item>
  ));

  return (
    <Stack align="center" p={20} gap={10}>
      <Title>Form Submitted</Title>
      <Text>
        You can safely close this tab, or{" "}
        <Anchor component={Link} href="/" size="md" variant="subtle">
          go to the main page
        </Anchor>
      </Text>
      <div>
        <Text size="lg">Values Submitted:</Text>
        <List size="md">{items}</List>
      </div>
    </Stack>
  );
}
