import "@mantine/core/styles.css";
import React from "react";
import {
	MantineProvider,
	ColorSchemeScript,
	AppShell,
	Stack,
} from "@mantine/core";
import { theme } from "../theme";
import Header from "../components/Header";

export const metadata = {
	title: "Zebracorns Scouting",
	description:
		"The Scouting Site of the Zebracorns using Nextjs, Mantine, Vanilla Extract, and other cool tools!",
};

export default function RootLayout({ children }: { children: any }) {
	return (
		<html lang="en">
			<head>
				<ColorSchemeScript />
				<link rel="shortcut icon" href="/favicon.svg" />
				<meta
					name="viewport"
					content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
				/>
			</head>
			<body>
				<MantineProvider theme={theme} defaultColorScheme="dark">
					<Stack align="stretch" justify="flex-start" gap="xs" pb="md">
						<Header />
						<Stack align="center" justify="flex-start" gap="xs" pt="5rem">
							{children}
						</Stack>
					</Stack>
				</MantineProvider>
			</body>
		</html>
	);
}
