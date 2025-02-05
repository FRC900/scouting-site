"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm, useWatch } from "react-hook-form";
import { StandFormSchema } from "../../lib/constants";
import { NumberInput } from "./inputs/NumberInput";
import { Select } from "./inputs/Select";
import { Checkbox } from "./inputs/Checkbox";
import { Textarea } from "./inputs/Textarea";
import { type StandForm } from "../../lib/definitions";
import { Button, Stack, Group, Modal, useMantineTheme, Text } from "@mantine/core";
import { useState } from "react";
import { useOnlineStatus } from "../../lib/hooks/useOnlineStatus";
import { createStandForm, deleteStandForm, updateStandForm } from "../../lib/actions";
import { useDisclosure } from "@mantine/hooks";

interface Props {
	create: boolean;
	defaultForm?: StandForm;
	id: string;
}

export default function StandForm({ create, defaultForm, id }: Props) {
	const [submitting, setSubmitting] = useState<"" | "fetching" | "done">("");
	const isOnline = useOnlineStatus();
	const [opened, { toggle }] = useDisclosure(false);
	const theme = useMantineTheme();

	const { control } = useForm<StandForm>({
		resolver: zodResolver(StandFormSchema),
		defaultValues: {
			match: undefined,
			slot: undefined,
			preloaded: true,
			startingZone: false,
			autoL1: 0,
			autoL2: 0,
			autoL3: 0,
			autoL4: 0,
			teleopL1: 0,
			teleopL2: 0,
			teleopL3: 0,
			teleopL4: 0,
			teleopProcessor: 0,
			teleopNet: 0,
			fouls: 0,
			techfouls: 0,
			endgame: undefined,
			defence: undefined,
			status: undefined,
			notes: "",
			...defaultForm,
		},
	});
	``;

	const submit = (data: StandForm, create: boolean, id: string) => {
		if (isOnline) {	
			setSubmitting("fetching");
			if (create) {
				createStandForm(data).then(() => setSubmitting("done"));
			} else {
				updateStandForm(data, id).then(() => setSubmitting("done"));
			}
			
		}
	};

	return (
		<Form
			control={control}
			onSubmit={({ data }) => submit(data, create, id)}
			onError={(e) => console.log(e)}
		>
			<Stack>
				<Stack>
					<NumberInput name="match" control={control} label="Match Number" />
					<Select
						name="slot"
						control={control}
						label="Slot"
						placeholder="Select"
						data={["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]}
					/>
				</Stack>
				<Stack>
					<Text fw={700}>Auto</Text>
					<Checkbox
						name="preloaded"
						control={control}
						color={theme.colors.milkshake[4]}
						label="Preloaded?"
					/>
					<Checkbox
						name="startingZone"
						control={control}
						color={theme.colors.milkshake[4]}
						label="Left Starting Zone?"
					/>
					<NumberInput
						name="autoL1"
						control={control}
						label="Level 1"
					/>
					<NumberInput
						name="autoL2"
						control={control}
						label="Level 2"
					/>
					<NumberInput
						name="autoL3"
						control={control}
						label="Level 3"
					/>
					<NumberInput
						name="autoL4"
						control={control}
						label="Level 4"
					/>
				</Stack>
				<Stack>
					<Text fw={700}>TeleOp</Text>
					<NumberInput
						name="teleopL1"
						control={control}
						label="Level 1"
					/>
					<NumberInput
						name="teleopL2"
						control={control}
						label="Level 2"
					/>
					<NumberInput
						name="teleopL3"
						control={control}
						label="Level 3"
					/>
					<NumberInput
						name="teleopL4"
						control={control}
						label="Level 4"
					/>
					<NumberInput
						name="teleopProcessor"
						control={control}
						label="Processor"
					/>
					<NumberInput
						name="teleopNet"
						control={control}
						label="Net"
					/>
				</Stack>
				<Stack>
					<Text fw={700}>Penalties</Text>
					<NumberInput name="fouls" control={control} label="Fouls" />
					<NumberInput name="techfouls" control={control} label="Tech Fouls" />
				</Stack>
				<Stack>
					<Text fw={700}>Misc.</Text>
					<Select
						name="endgame"
						control={control}
						label="Endgame"
						placeholder="Select"
						data={["Nothing", "Parked", "Shallow", "Deep"]}
					/>
					<Select
						name="defence"
						control={control}
						label="Defence"
						placeholder="Select"
						data={[
							{ label: "No Defence", value: "0" },
							{ label: "Penalties Galore", value: "1" },
							{ label: "Some Penalties", value: "2" },
							{ label: "Ineffective", value: "3" },
							{ label: "Good Defence", value: "4" },
							{ label: "Strong.", value: "5" },
						]}
					/>
					<Select
						name="status"
						control={control}
						label="Status"
						placeholder="Select"
						data={[
							{ label: "No-Show", value: "0" },
							{ label: "Did Not Move", value: "1" },
							{ label: "Broke In Match", value: "2" },
							{ label: "Disconnections", value: "3" },
							{ label: "No Issues (Solid)", value: "4" },
							{ label: "Pro Performance", value: "5" },
						]}
					/>
				</Stack>
				<Textarea
					name="notes"
					control={control}
					label="Notes"
					placeholder="Type your short, useful, and consice note here."
				/>
				<Stack justify="end">
					<Button
						type="submit"
						disabled={submitting === "fetching"}
						color={theme.colors.milkshake[4]}
					>
						{create ? "Submit" : "Update"}
					</Button>
					{!create ? (
						<Button
							disabled={submitting === "fetching"}
							color={theme.colors.rose[5]}
							onClick={() => {
								toggle();
								console.log(opened);
							}}
						>
							Delete
						</Button>
					) : (
						<></>
					)}
				</Stack>
				<Modal
					opened={opened}
					onClose={toggle}
					title="Are you sure you want to delete? This cannot be undone."
					centered
				>
					<Group justify="center" align="center">
						<Button
						  type="submit"
							variant="outline"
							color="red"
							size="md"
							onClick={() => {
								deleteStandForm(id).then(() => toggle());
							}}
						>
							Delete
						</Button>
						<Button
							variant="filled"
							color={theme.colors.milkshake[4]}
							size="md"
							onClick={toggle}
						>
							Cancel
						</Button>
					</Group>
				</Modal>
			</Stack>
		</Form>
	);
}
