"use client";

import { type Data } from "../../lib/definitions";
import { Th } from "./stand-form-table";
import { ScrollArea, Table, Text, keys, Anchor, Group, Progress } from "@mantine/core";
import { useState } from "react";
import classes from "./Table.module.css";
import capitalize from "../../lib/capitalize";
import Link from "next/link";

interface Props {
  data: Data[];
}

function filterData(data: Data[]) {
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toString().toLowerCase())
  );
}

function sortData(
  data: Data[],
  payload: {
    sortBy: keyof Data | null;
    reversed: boolean;
  }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy].toString().localeCompare(a[sortBy].toString());
      }
      return a[sortBy].toString().localeCompare(b[sortBy].toString());
    })
  );
}

export default function DataTable({ data }: Props) {
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof Data | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Data) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed }));
  };

  const rows = sortedData.map((form) => {

    const totalAutoCoral = form.auto.l1 + form.auto.l2 + form.auto.l3 + form.auto.l4;
    const l1Auto = (form.auto.l1 / totalAutoCoral) * 100;
    const l2Auto = (form.auto.l2 / totalAutoCoral) * 100;
    const l3Auto = (form.auto.l3 / totalAutoCoral) * 100;
    const l4Auto = (form.auto.l4 / totalAutoCoral) * 100;

    const totalTeleopCoral = form.teleop.l1 + form.teleop.l2 + form.teleop.l3 + form.teleop.l4;
    const l1Teleop = (form.teleop.l1 / totalTeleopCoral) * 100;
    const l2Teleop = (form.teleop.l2 / totalTeleopCoral) * 100;
    const l3Teleop = (form.teleop.l3 / totalTeleopCoral) * 100;
    const l4Teleop = (form.teleop.l4 / totalTeleopCoral) * 100;

    const totalMatches = form.climb.nothing + form.climb.parked + form.climb.shallow + form.climb.deep;
    const nothingPercent = (form.climb.nothing / totalMatches) * 100;
    const parkedPercent = (form.climb.parked / totalMatches) * 100;
    const shallowPercent = (form.climb.shallow / totalMatches) * 100;
    const deepPercent = (form.climb.deep / totalMatches) * 100;
    
    return (
      <Table.Tr key={form.team}>
        <Table.Td>{form.team}</Table.Td>
        <Table.Td><Anchor component={Link} href={`/data/${form.team}`} fz="md">{form.name}</Anchor></Table.Td>
        <Table.Td>{form.rank}</Table.Td>
        <Table.Td>{form.avePA}</Table.Td>
        <Table.Td>{form.preloaded}%</Table.Td>
        <Table.Td>{form.startingZone}%</Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="sm" c="#5474B4" fw={700}>
              {l1Auto.toFixed(0)}%
            </Text>
            <Text fz="sm" c="#4c5897" fw={700}>
              {l2Auto.toFixed(0)}%
            </Text>
            <Text fz="sm" c="#6b31b2" fw={700}>
              {l3Auto.toFixed(0)}%
            </Text>
            <Text fz="sm" c="#c91a52" fw={700}>
              {l4Auto.toFixed(0)}%
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={l1Auto}
              color="#5474B4"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l2Auto}
              color="#4c5897"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l3Auto}
              color="#6b31b2"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l4Auto}
              color="#c91a52"
            />
          </Progress.Root>
        </Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="sm" c="#5474B4" fw={700}>
              {l1Teleop.toFixed(0)}%
            </Text>
            <Text fz="sm" c="#4c5897" fw={700}>
              {l2Teleop.toFixed(0)}%
            </Text>
            <Text fz="sm" c="#6b31b2" fw={700}>
              {l3Teleop.toFixed(0)}%
            </Text>
            <Text fz="sm" c="#c91a52" fw={700}>
              {l4Teleop.toFixed(0)}%
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={l1Teleop}
              color="#5474B4"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l2Teleop}
              color="#4c5897"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l3Teleop}
              color="#6b31b2"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l4Teleop}
              color="#c91a52"
            />
          </Progress.Root>
        </Table.Td>
        <Table.Td>{form.processor}</Table.Td>
        <Table.Td>{form.net}</Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="sm" c="#fc8c0c" fw={700}>
              {form.climb.nothing}
            </Text>
            <Text fz="sm" c="#ffab09" fw={700}>
              {form.climb.parked}
            </Text>
            <Text fz="sm" c="#2f7f49" fw={700}>
              {form.climb.shallow}
            </Text>
            <Text fz="sm" c="#0088e4" fw={700}>
              {form.climb.deep}
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={nothingPercent}
              color="#fc8c0c"
            />
            <Progress.Section
              className={classes.progressSection}
              value={parkedPercent}
              color="#ffab09"
            />
            <Progress.Section
              className={classes.progressSection}
              value={shallowPercent}
              color="#2f7f49"
            />
            <Progress.Section
              className={classes.progressSection}
              value={deepPercent}
              color="#0088e4"
            />
          </Progress.Root>
        </Table.Td>
      </Table.Tr>
    );
  });

  return (
    <ScrollArea>
      <Table miw={900} horizontalSpacing="xs" verticalSpacing="xs">
        <Table.Tbody>
          <Table.Tr>
            {Object.keys(data[0]).map((key) => (
              <Th
                key={key}
                sorted={sortBy === (key as keyof Data)}
                reversed={reverseSortDirection}
                onSort={() => setSorting(key as keyof Data)}
              >
                {capitalize(key)}
              </Th>
            ))}
          </Table.Tr>
        </Table.Tbody>
        <Table.Tbody>
          {rows.length > 0 ? (
            rows
          ) : (
            <Table.Tr>
              <Table.Td colSpan={Object.keys(data[0]).length}>
                <Text fw={500} ta="center">
                  Nothing Found
                </Text>
              </Table.Td>
            </Table.Tr>
          )}
        </Table.Tbody>
      </Table>
    </ScrollArea>
  );
}
