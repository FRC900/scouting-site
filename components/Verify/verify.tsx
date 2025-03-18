"use client";

import { Accordion, Button, Group, Space, SimpleGrid, Text } from "@mantine/core";
import capitalize from "../../lib/capitalize";
import Link from "next/link";
import { VerificationErrors } from "../../lib/definitions";

export default function VerifyAccordian({ errors }: { errors: VerificationErrors[] }) {
  const items = errors.map((error) => (
    <Accordion.Item key={error.key} value={error.key}>
      <Accordion.Control>{`Match ${error.key.split("-")[0]}: ${
        error.key.split("-")[1]
      } Alliance `}</Accordion.Control>
      <Accordion.Panel>
        <Group>
          {error.teams.map((team, index) => (
            <Button
              key={index}
              component={Link}
              href={`/records/stand-forms/${team.form}/edit`}
              variant="filled"
            >
              {team.number}
            </Button>
          ))}
        </Group>
        <Space h="sm" />
        <SimpleGrid cols={3}>
          {error.errors.map((error, index) => (
            <Text size="md" key={index}>
              {capitalize(error.type)}: {error.magnitude}
            </Text>
          ))}
        </SimpleGrid>
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Accordion multiple variant="filled" radius="md">
      {items}
    </Accordion>
  );
}
