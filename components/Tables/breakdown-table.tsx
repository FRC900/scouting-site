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

export default function BreakdownTable({ data }: Props) {
  const [sortedData, setSortedData] = useState(() =>
    sortData(data, { sortBy: "rank", reversed: false })
  );
  const [sortBy, setSortBy] = useState<keyof Breakdown | null>("rank");
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
        <Table.Td>
          <Anchor component={Link} href={`/data/${form.team}`} fz="md">
            {form.name}
          </Anchor>
        </Table.Td>
        <Table.Td>{form.rank}</Table.Td>
        <Table.Td>{form.APA}</Table.Td>
        <Table.Td>{form.q75PA}</Table.Td>
        <Table.Td>{form.autoAPA}</Table.Td>
        <Table.Td>{form.autoQ75PA}</Table.Td>
        <Table.Td>{form.teleopAPA}</Table.Td>
        <Table.Td>{form.teleopQ75PA}</Table.Td>
        <Table.Td>{form.q75coral}</Table.Td>
        <Table.Td>{form.q75algae}</Table.Td>
        <Table.Td>{form.OPR}</Table.Td>
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
