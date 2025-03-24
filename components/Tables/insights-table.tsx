"use client";

import { type Insights } from "../../lib/definitions";
import { Th } from "./stand-form-table";
import { ScrollArea, Table, Text, keys, Anchor } from "@mantine/core";
import { useState } from "react";
import capitalize from "../../lib/capitalize";
import Link from "next/link";

interface Props {
  data: Insights[];
}

function filterData(data: Insights[]) {
  return data.filter((item) =>
    keys(data[0]).some((key) => item[key].toString().toLowerCase())
  );
}

function sortData(
  data: Insights[],
  payload: {
    sortBy: keyof Insights | null;
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

export default function InsightsTable({ data }: Props) {
  const [sortedData, setSortedData] = useState(() => sortData(data, { sortBy: 'avePA', reversed: true }));
  const [sortBy, setSortBy] = useState<keyof Insights>('avePA');
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof Insights) => {
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
        <Table.Td>{form.aveAutoPA}</Table.Td>
        <Table.Td>{form.aveTeleopPA}</Table.Td>
        <Table.Td>{form.aveEndgamePA}</Table.Td>
        <Table.Td>{form.aveCoral}</Table.Td>
        <Table.Td>{form.aveAlgae}</Table.Td>
        <Table.Td>{form.avePenalties}</Table.Td>
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
                sorted={sortBy === (key as keyof Insights)}
                reversed={reverseSortDirection}
                onSort={() => setSorting(key as keyof Insights)}
              >
                {key.substring(0, 3) == "ave" ? capitalize(key.substring(3)) : capitalize(key)}
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
