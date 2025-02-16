"use client";

import { type Breakdown } from "../../lib/definitions";
import { Th } from "./stand-form-table";
import { ScrollArea, Table, Text, keys, Anchor } from "@mantine/core";
import { useState } from "react";
import classes from "./Table.module.css";
import capitalize from "../../lib/capitalize";
import Link from "next/link";

interface Props {
  data: Breakdown[];
}

function filterData(data: Breakdown[]) {
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toString().toLowerCase())
  );
}

function sortData(
  data: Breakdown[],
  payload: {
    sortBy: keyof Breakdown | null;
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

export default function BreakdownTable({ data }: Props) {
  const [sortedData, setSortedData] = useState(data);
  const [sortBy, setSortBy] = useState<keyof Breakdown | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Breakdown) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(data, { sortBy: field, reversed }));
  };

  const rows = sortedData.map((form) => {
    
    return (
      <Table.Tr key={form.team}>
        <Table.Td>{form.team}</Table.Td>
        <Table.Td><Anchor component={Link} href={`/data/${form.team}`} fz="md">{form.name}</Anchor></Table.Td>
        <Table.Td>{form.rank}</Table.Td>
        <Table.Td>{form.avePA}</Table.Td>
        <Table.Td>{form.maxPA}</Table.Td>
        <Table.Td>{form.maxAutoPA}</Table.Td>
        <Table.Td>{form.maxTeleopPA}</Table.Td>
        <Table.Td>{form.maxEndgamePA}</Table.Td>
        <Table.Td>{form.tba_opr}</Table.Td>
        <Table.Td>{form.sb_epa}</Table.Td>
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
                sorted={sortBy === (key as keyof Breakdown)}
                reversed={reverseSortDirection}
                onSort={() => setSorting(key as keyof Breakdown)}
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
