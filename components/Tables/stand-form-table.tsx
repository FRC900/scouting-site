"use client";

import {
	Group,
	Text,
	Table,
	UnstyledButton,
	Center,
	rem,
	keys,
	TextInput,
	ScrollArea,
} from "@mantine/core";
import { useState } from "react";
import classes from "./Table.module.css";
import {
	IconChevronDown,
	IconChevronUp,
	IconSearch,
	IconSelect,
} from "@tabler/icons-react";
import { EditButton } from "../Misc/edit-button";

interface Props {
	data: StandRecord[];
}

export interface StandRecordRow {
	row: string;
}

export interface StandRecord {
	id: string;
	match: number;
	team: number;
	username: string;
	date: string;
}

export interface ThProps {
	children: React.ReactNode;
	reversed: boolean;
	sorted: boolean;
	onSort(): void;
}

export function Th({ children, reversed, sorted, onSort }: ThProps) {
	const Icon = sorted
		? reversed
			? IconChevronUp
			: IconChevronDown
		: IconSelect;
	return (
		<Table.Th className={classes.th}>
			<UnstyledButton onClick={onSort} className={classes.control}>
				<Group justify="space-between">
					<Text fw={500} fz="md">
						{children}
					</Text>
					<Center className={classes.icon}>
						<Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
					</Center>
				</Group>
			</UnstyledButton>
		</Table.Th>
	);
}

function filterData(data: StandRecord[], search: string) {
	const query = search.toLowerCase().trim();
	return data.filter((item) =>
		keys(data[0]).some((key) =>
			item[key].toString().toLowerCase().includes(query)
		)
	);
}

function sortData(
	data: StandRecord[],
	payload: {
		sortBy: keyof StandRecord | null;
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

export default function StandFormTable({ data }: Props) {
	const [search, setSearch] = useState("");
	const [sortedData, setSortedData] = useState(data);
	const [sortBy, setSortBy] = useState<keyof StandRecord | null>(null);
	const [reverseSortDirection, setReverseSortDirection] = useState(false);

	const setSorting = (field: keyof StandRecord) => {
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
		<Table.Tr key={form.id}>
			<Table.Td>{form.match}</Table.Td>
			<Table.Td>{form.team}</Table.Td>
			<Table.Td>{form.username}</Table.Td>
			<Table.Td>{form.date}</Table.Td>
			<Table.Td>
				<EditButton id={form.id} form="stand-forms" />
			</Table.Td>
		</Table.Tr>
	));

	return (
		<ScrollArea>
			<TextInput
				placeholder="Search by any field"
				mb="md"
				leftSection={
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
				layout="auto"
			>
				<Table.Tbody>
					<Table.Tr>
						<Th
							sorted={sortBy === "match"}
							reversed={reverseSortDirection}
							onSort={() => setSorting("match")}
						>
							Match
						</Th>
						<Th
							sorted={sortBy === "team"}
							reversed={reverseSortDirection}
							onSort={() => setSorting("team")}
						>
							Team
						</Th>
						<Th
							sorted={sortBy === "username"}
							reversed={reverseSortDirection}
							onSort={() => setSorting("username")}
						>
							Scouter
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
