"use client";

import {
	Title,
	Text,
	Button,
	Modal,
	useMantineTheme,
	Stack,
	Group,
} from "@mantine/core";
import * as classes from "./Welcome.css";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import AuthForm from "../Forms/auth";

export function Welcome() {
	const theme = useMantineTheme();
	const [opened, { open, close }] = useDisclosure(false);
  const isMobile = useMediaQuery('(max-width: 50em)');

	return (
		<>
			<Modal
				opened={opened}
				onClose={close}
				title="Authentication"
        fullScreen={isMobile}
				overlayProps={{
					backgroundOpacity: 0.55,
					blur: 3,
				}}
			>
				<AuthForm />
			</Modal>
			<Stack>
				<Title className={classes.title} ta="center" mt={100}>
					Welcome to{" "}
					<Text
						inherit
						variant="gradient"
						component="span"
						gradient={{ from: "#6e56d8", to: "#b7ace9" }}
					>
						ZebrScouting
					</Text>
				</Title>
				<Group justify="center">
					<Button
						onClick={open}
						variant="gradient"
						gradient={{
							from: theme.colors.pillow[5],
							to: theme.colors.pillow[3],
							deg: 320,
						}}
						size="xl"
					>
						Login / Register
					</Button>
				</Group>
			</Stack>
		</>
	);
}
