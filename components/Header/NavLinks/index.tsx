"use client";

import Link from "next/link";
import { Menu, Button, rem, Center, Box, useMantineTheme } from "@mantine/core";
import {
	IconCalendarEvent,
	IconChartArcs,
	IconChartArrowsVertical,
	IconChartDots3,
	IconChevronDown,
	IconClipboardData,
	IconFileFilled,
	IconForms,
	IconUserFilled,
} from "@tabler/icons-react";
import classes from "../Header.module.css";

const links = [
	{
		label: "Scouting",
		links: [
			{
				link: "/stand-form",
				label: "Stand Form",
				icon: <IconForms style={{ width: rem(14), height: rem(14) }} />,
				perm: "member",
			},
			{
				link: "/pit-form",
				label: "Pit Form",
				icon: <IconForms style={{ width: rem(14), height: rem(14) }} />,
				perm: "member",
			},
			{
				link: "/stand-schedule",
				label: "Stand Schedule",
				icon: <IconCalendarEvent style={{ width: rem(14), height: rem(14) }} />,
				perm: "member",
			},
		],
	},
	{
		label: "Records",
		links: [
			{
				link: "/records/stand-forms",
				label: "Stand Forms",
				icon: <IconFileFilled style={{ width: rem(14), height: rem(14) }} />,
				perm: "member",
			},
			{
				link: "/records/pit-forms",
				label: "Pit Forms",
				icon: <IconFileFilled style={{ width: rem(14), height: rem(14) }} />,
				perm: "member",
			},
			{
				link: "/records/users",
				label: "Users",
				icon: <IconUserFilled style={{ width: rem(14), height: rem(14) }} />,
				perm: "admin",
			},
		],
	},
	{
		label: "Analysis",
		links: [
			{
				link: "/data",
				label: "Team Data",
				icon: <IconClipboardData style={{ width: rem(14), height: rem(14) }} />,
				perm: "member",
			},
			{
				link: "/insights",
				label: "Insights",
				icon: <IconChartDots3 style={{ width: rem(14), height: rem(14) }} />,
				perm: "member"
			},
			{
				link: "/qual",
				label: "Qual Matches",
				icon: <IconChartArrowsVertical style={{ width: rem(14), height: rem(14) }} />,
				perm: "member"
			},
			{
				link: "/simulation",
				label: "Simulation",
				icon: <IconChartArcs style={{ width: rem(14), height: rem(14) }} />,
				perm: "member"
			},
		],
	},
];

export default function NavLinks() {
	const theme = useMantineTheme();

	const items = links.map((link) => {
		const menuItems = link.links?.map((item) => (
			<Menu.Item key={item.link} component={Link} leftSection={item.icon} href={item.link}>
				{item.label}
			</Menu.Item>
		));

		return (
			<Menu
				key={link.label}
				trigger="hover"
				transitionProps={{ exitDuration: 0 }}
				withinPortal
			>
				<Menu.Target>
					<Box
						className={classes.link}
						//size='compact-md'
						// onClick={(event) => event.preventDefault()}
						//variant="subtle"
						// color={theme.colors.milkshake[4]}
					>
						<Center>
							<span className={classes.linkLabel}>{link.label}</span>
							<IconChevronDown size="0.9rem" stroke={1.5} />
						</Center>
					</Box>
				</Menu.Target>
				<Menu.Dropdown>{menuItems}</Menu.Dropdown>
			</Menu>
		);
	});

	return items;
}
