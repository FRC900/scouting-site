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
import classes from "./Welcome.module.css";
import { useDisclosure, useMediaQuery } from "@mantine/hooks";
import RegisterForm from "../Forms/register";
import LoginForm from "../Forms/login";

export function Welcome() {
	const theme = useMantineTheme();
	const [opened, { open, close }] = useDisclosure(false);
	const isMobile = useMediaQuery("(max-width: 50em)");
	const [registering, { toggle }] = useDisclosure(false);

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
				{registering ? (
					<RegisterForm toggle={toggle} />
				) : (
					<LoginForm toggle={toggle} />
				)}
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
						ZebraScouting
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
