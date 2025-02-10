"use client";

import { type SimpleTeamData } from "../../lib/definitions";
import { Th } from "./stand-form-table";
import { rem, ScrollArea, Table, TextInput, Text, keys, Group, Progress, Anchor } from "@mantine/core";
import { useState } from "react";
import classes from "./Table.module.css";
import capitalize from "../../lib/capitalize";

interface Props {
  data: SimpleTeamData[];
}

function filterData(data: SimpleTeamData[]) {
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toString().toLowerCase())
  );
}

function sortData(
  data: SimpleTeamData[],
  payload: {
    sortBy: keyof SimpleTeamData | null;
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
  const [sortBy, setSortBy] = useState<keyof SimpleTeamData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof SimpleTeamData) => {
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
        <Table.Td fz="md">{form.avePA}</Table.Td>
        {/* <Table.Td>{form.aveAutoPA}</Table.Td>
        <Table.Td>{form.aveTeleopPA}</Table.Td>
        <Table.Td>{form.aveEndgamePA}</Table.Td> */}
        <Table.Td fz="md">{form.aveCoral}</Table.Td>
        <Table.Td>
          <Group justify="space-between">
            <Text fz="sm" c="#5474B4" fw={700}>
              {l1Percent.toFixed(0)}%
            </Text>
            <Text fz="sm" c="#4c5897" fw={700}>
              {l2Percent.toFixed(0)}%
            </Text>
            <Text fz="sm" c="#6b31b2" fw={700}>
              {l3Percent.toFixed(0)}%
            </Text>
            <Text fz="sm" c="#c91a52" fw={700}>
              {l4Percent.toFixed(0)}%
            </Text>
          </Group>
          <Progress.Root>
            <Progress.Section
              className={classes.progressSection}
              value={l1Percent}
              color="#5474B4"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l2Percent}
              color="#4c5897"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l3Percent}
              color="#6b31b2"
            />
            <Progress.Section
              className={classes.progressSection}
              value={l4Percent}
              color="#c91a52"
            />
          </Progress.Root>
        </Table.Td>
        <Table.Td fz="md">{form.algae}</Table.Td>
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
        <Table.Td fz="md">{form.defence}</Table.Td>
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
                sorted={sortBy === (key as keyof SimpleTeamData)}
                reversed={reverseSortDirection}
                onSort={() => setSorting(key as keyof SimpleTeamData)}
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
