"use client";

import { type Data } from "../../lib/definitions";
import { Th } from "./stand-form-table";
import {
  ScrollArea,
  Table,
  Text,
  keys,
  Anchor,
  Group,
  Progress,
} from "@mantine/core";
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
      const aValue = parseFloat(a[sortBy].toString());
      const bValue = parseFloat(b[sortBy].toString());

      if (isNaN(aValue) || isNaN(bValue)) {
        if (payload.reversed) {
          return b[sortBy].toString().localeCompare(a[sortBy].toString());
        }
        return a[sortBy].toString().localeCompare(b[sortBy].toString());
      }

      if (payload.reversed) {
        return bValue - aValue;
      }
      return aValue - bValue;
    })
  );
}

export default function DataTable({ data }: Props) {
  const [sortedData, setSortedData] = useState(() =>
    sortData(data, { sortBy: "rank", reversed: false })
  );
  const [sortBy, setSortBy] = useState<keyof Data | null>("rank");
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Data) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed }));
  };

  const rows = sortedData.map((form) => {
    const totalCoral =
      form.coral.l1 + form.coral.l2 + form.coral.l3 + form.coral.l4;
    const l1 = Math.round((form.coral.l1 / totalCoral) * 1000) / 10;
    const l2 = Math.round((form.coral.l2 / totalCoral) * 1000) / 10;
    const l3 = Math.round((form.coral.l3 / totalCoral) * 1000) / 10;
    const l4 = Math.round((form.coral.l4 / totalCoral) * 1000) / 10;

    const totalAlgae = form.algae.processor + form.algae.net;
    const processor =
      Math.round((form.algae.processor / totalAlgae) * 1000) / 10;
    const net = Math.round((form.algae.net / totalAlgae) * 1000) / 10;

    return (
      <Table.Tr key={form.team}>
        <Table.Td>{form.team}</Table.Td>
        <Table.Td>
          <Anchor component={Link} href={`/data/${form.team}`} fz="md">
            {form.name}
          </Anchor>
        </Table.Td>
        <Table.Td>{form.rank}</Table.Td>
        <Table.Td>{form.startingZone}%</Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="sm" c="#5474B4" fw={700}>
              {form.coral.l1.toFixed(0)}
            </Text>
            <Text fz="sm" c="#4c5897" fw={700}>
              {form.coral.l2.toFixed(0)}
            </Text>
            <Text fz="sm" c="#6b31b2" fw={700}>
              {form.coral.l3.toFixed(0)}
            </Text>
            <Text fz="sm" c="#c91a52" fw={700}>
              {form.coral.l4.toFixed(0)}
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={l1}
              color="#5474B4"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l2}
              color="#4c5897"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l3}
              color="#6b31b2"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l4}
              color="#c91a52"
            />
          </Progress.Root>
        </Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="sm" c="#5474B4" fw={700}>
              {form.algae.processor.toFixed(0)}
            </Text>
            <Text fz="sm" c="#4c5897" fw={700}>
              {form.algae.net.toFixed(0)}
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={processor}
              color="#5474B4"
            />
            <Progress.Section
              className={classes.progressSection}
              value={net}
              color="#4c5897"
            />
          </Progress.Root>
        </Table.Td>
        <Table.Td>{form.climb}</Table.Td>
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
