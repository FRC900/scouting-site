"use client";

import Link from "next/link";
import {
	Button,
	Group,
	useMantineTheme,
	SimpleGrid,
} from "@mantine/core";
import {
	IconFileFilled,
	IconUserFilled,
	IconRosetteDiscountCheckFilled,
} from "@tabler/icons-react";

export default function Page() {
	const theme = useMantineTheme();

	return (
		<>
			<Group justify="center" gap="lg">
				<SimpleGrid cols={2}>
					<Button
						component={Link}
						href="/records/stand-forms"
						variant="filled"
						color={theme.colors.milkshake[4]}
						size="md"
						leftSection={
							<IconFileFilled size={16} href="/records/stand-forms" />
						}
					>
						Stand Forms
					</Button>
					<Button
						component={Link}
						href="/records/pit-forms"
						variant="filled"
						color={theme.colors.milkshake[4]}
						size="md"
						leftSection={<IconFileFilled size={16} />}
					>
						Pit Forms
					</Button>
					<Button
						component={Link}
						href="/records/users"
						variant="filled"
						color={theme.colors.milkshake[4]}
						size="md"
						leftSection={<IconUserFilled size={16} />}
					>
						Users
					</Button>
					<Button
						component={Link}
						href="/records/verify"
						variant="filled"
						color={theme.colors.milkshake[4]}
						size="md"
						leftSection={<IconRosetteDiscountCheckFilled size={16} />}
					>
						Verify
					</Button>
				</SimpleGrid>
			</Group>
		</>
	);
}
