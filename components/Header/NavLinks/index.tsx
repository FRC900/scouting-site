"use client";

import Link from 'next/link';
import { Group, Menu, Button, useMantineTheme, rem } from "@mantine/core";
import {
	IconCalendarEvent,
	IconFileFilled,
	IconForms,
	IconSquareCheckFilled,
	IconUserFilled,
} from "@tabler/icons-react";

interface navlink {
	text: string;
	href: string;
	icon: JSX.Element;
}

interface navbuttons {
	text: string;
	links: navlink[];
}

const scoutingLinks: navlink[] = [
	{
		text: "Stand Form",
		href: "/stand-form",
		icon: <IconForms style={{ width: rem(14), height: rem(14) }} />,
	},
	{
		text: "Pit Form",
		href: "/pit-form",
		icon: <IconForms style={{ width: rem(14), height: rem(14) }} />,
	},
	{
		text: "Stand Schedule",
		href: "/stand-schedule",
		icon: <IconCalendarEvent style={{ width: rem(14), height: rem(14) }} />,
	},
];

const recordLinks: navlink[] = [
	{
		text: "Stand Forms",
		href: "/records/stand-forms",
		icon: <IconFileFilled style={{ width: rem(14), height: rem(14) }} />,
	},
	{
		text: "Pit Forms",
		href: "/records/pit-forms",
		icon: <IconFileFilled style={{ width: rem(14), height: rem(14) }} />,
	},
	{
		text: "Users",
		href: "records/users",
		icon: <IconUserFilled style={{ width: rem(14), height: rem(14) }} />,
	},
	{
		text: "Verify",
		href: "records/verify",
		icon: <IconSquareCheckFilled style={{ width: rem(14), height: rem(14) }} />,
	},
];

const navButtons: navbuttons[] = [
	{ text: "Scouting", links: scoutingLinks },
	{ text: "Records", links: recordLinks },
];

export default function NavLinks() {
	const theme = useMantineTheme();

	return (
		<Group justify="end" gap="md">
			{navButtons.map((navButton) => (
				<Menu
					shadow="md"
					width={200}
					trigger="hover"
					openDelay={0}
					closeDelay={0}
					// transitionProps={{ transition: "slide-left", duration: 150 }}
				>
					<Menu.Target>
						<Button variant="outline" color={theme.colors.snow[0]} size="compact-lg">{navButton.text}</Button>
					</Menu.Target>

					<Menu.Dropdown>
						{navButton.links.map((link) => (
							<Menu.Item
								component={Link}
								href={link.href}
								leftSection={link.icon}
							>
								{link.text}
							</Menu.Item>
						))}
					</Menu.Dropdown>
				</Menu>
			))}
		</Group>
	);
}
