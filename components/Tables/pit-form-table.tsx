"use client";

import { useState } from "react";
import { Th } from "./stand-form-table";
import { rem, ScrollArea, Table, TextInput, Text, keys } from "@mantine/core";
import { IconSearch } from "@tabler/icons-react";

interface Props {
	data: PitRecord[];
}

export interface PitRecordRow {
	row: string;
}

export interface PitRecord {
	team: number;
	date: string;
}

function filterData(data: PitRecord[], search: string) {
	const query = search.toLowerCase().trim();
	return data.filter((item) =>
		keys(data[0]).some((key) =>
			item[key].toString().toLowerCase().includes(query)
		)
	);
}

function sortData(
	data: PitRecord[],
	payload: {
		sortBy: keyof PitRecord | null;
		reversed: boolean;
		search: string;
	}
) {
	const { sortBy } = payload;

	if (!sortBy) {
		return filterData(data, payload.search);
	}

	return filterData(
		[...data].sort((a, b) => {
			if (payload.reversed) {
				return b[sortBy].toString().localeCompare(a[sortBy].toString());
			}
			return a[sortBy].toString().localeCompare(b[sortBy].toString());
		}),

		payload.search
	);
}

export default function PitFormsTable({ data }: Props) {
	const [search, setSearch] = useState("");
	const [sortedData, setSortedData] = useState(data);
	const [sortBy, setSortBy] = useState<keyof PitRecord | null>(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);

	const setSorting = (field: keyof PitRecord) => {
		const reversed = field === sortBy ? !reverseSortDirection : false;
		setReverseSortDirection(reversed);
		setSortBy(field);
		setSortedData(sortData(data, { sortBy: field, reversed, search }));
	};

	const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		const { value } = event.currentTarget;
		setSearch(value);
		setSortedData(
			sortData(data, { sortBy, reversed: reverseSortDirection, search: value })
		);
	};

	const rows = sortedData.map((form) => (
		<Table.Tr key={form.date}>
			<Table.Td>{form.team}</Table.Td>
			<Table.Td>{form.date}</Table.Td>
		</Table.Tr>
	));

	return (
		<ScrollArea>
			<TextInput
				placeholder="Search by any field"
				mb="md"
				leftSectionProps={
					<IconSearch
						style={{ width: rem(16), height: rem(16) }}
						stroke={1.5}
					/>
				}
				value={search}
				onChange={handleSearchChange}
			/>
			<Table
				miw={700}
				horizontalSpacing="md"
				verticalSpacing="xs"
				layout="fixed"
			>
				<Table.Tbody>
					<Table.Tr>
						<Th
							sorted={sortBy === "team"}
							reversed={reverseSortDirection}
							onSort={() => setSorting("team")}
						>
							Team
						</Th>
						<Th
							sorted={sortBy === "date"}
							reversed={reverseSortDirection}
							onSort={() => setSorting("date")}
						>
							Date
						</Th>
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
