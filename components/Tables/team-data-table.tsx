"use client";

import { type TeamData } from "../../lib/definitions";
import { Th } from "./stand-form-table";
import { rem, ScrollArea, Table, TextInput, Text, keys, Group, Progress, Anchor } from "@mantine/core";
import { useState } from "react";
import classes from "./Table.module.css";
import capitalize from "../../lib/capitalize";

interface Props {
  data: TeamData[];
}

function filterData(data: TeamData[]) {
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toString().toLowerCase())
  );
}

function sortData(
  data: TeamData[],
  payload: {
    sortBy: keyof TeamData | null;
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

export default function TeamDataTable({ data }: Props) {
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof TeamData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof TeamData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed }));
  };

  const rows = sortedData.map((form) => {
    const totalCoral = form.coral.l1 + form.coral.l2 + form.coral.l3 + form.coral.l4;
    const l1Percent = (form.coral.l1 / totalCoral) * 100;
    const l2Percent = (form.coral.l2 / totalCoral) * 100;
    const l3Percent = (form.coral.l3 / totalCoral) * 100;
    const l4Percent = (form.coral.l4 / totalCoral) * 100;

    const totalMatches = form.climb.nothing + form.climb.parked + form.climb.shallow + form.climb.deep;
    const nothingPercent = (form.climb.nothing / totalMatches) * 100;
    const parkedPercent = (form.climb.parked / totalMatches) * 100;
    const shallowPercent = (form.climb.shallow / totalMatches) * 100;
    const deepPercent = (form.climb.deep / totalMatches) * 100;
    
    return (
      <Table.Tr key={form.team}>
        <Table.Td><Anchor href={`/data/${form.team}/team`} fz="md">{form.team}</Anchor></Table.Td>
        <Table.Td>{form.avePA}</Table.Td>
        {/* <Table.Td>{form.aveAutoPA}</Table.Td>
        <Table.Td>{form.aveTeleopPA}</Table.Td>
        <Table.Td>{form.aveEndgamePA}</Table.Td> */}
        <Table.Td>{form.aveCoral}</Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="xs" c="pink" fw={700}>
              {l1Percent.toFixed(0)}%
            </Text>
            <Text fz="xs" c="magenta" fw={700}>
              {l2Percent.toFixed(0)}%
            </Text>
            <Text fz="xs" c="purple" fw={700}>
              {l3Percent.toFixed(0)}%
            </Text>
            <Text fz="xs" c="red" fw={700}>
              {l4Percent.toFixed(0)}%
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={l1Percent}
              color="pink"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l2Percent}
              color="magenta"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l3Percent}
              color="purple"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l4Percent}
              color="red"
            />
          </Progress.Root>
        </Table.Td>
        <Table.Td>{form.algae}</Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="xs" c="orange" fw={700}>
              {form.climb.nothing}
            </Text>
            <Text fz="xs" c="gold" fw={700}>
              {form.climb.parked}
            </Text>
            <Text fz="xs" c="teal" fw={700}>
              {form.climb.shallow}
            </Text>
            <Text fz="xs" c="blue" fw={700}>
              {form.climb.deep}
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={nothingPercent}
              color="orange"
            />
            <Progress.Section
              className={classes.progressSection}
              value={parkedPercent}
              color="gold"
            />
            <Progress.Section
              className={classes.progressSection}
              value={shallowPercent}
              color="teal"
            />
            <Progress.Section
              className={classes.progressSection}
              value={deepPercent}
              color="blue"
            />
          </Progress.Root>
        </Table.Td>
        <Table.Td>{form.defence}</Table.Td>
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
                sorted={sortBy === (key as keyof TeamData)}
                reversed={reverseSortDirection}
                onSort={() => setSorting(key as keyof TeamData)}
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
