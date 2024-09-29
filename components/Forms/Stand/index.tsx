"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
	Fieldset,
	Box,
	Button,
	Tabs,
	useMantineTheme,
	Container,
	Flex,
} from "@mantine/core";
import { NumberInput } from "../NumberInput";
import { Select } from "../Select";
import { Checkbox } from "../Checkbox";
import { TextInput } from "../TextInput";
import { createStandForm } from "../../../lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { StandFormSchema, defaultValues } from "../../../lib/constants";
import { type StandForm } from "../../../lib/definitions";

export default function StandForm() {
	const theme = useMantineTheme();

	const {
		// register,
		handleSubmit,
		control,
		// formState: { errors },
	} = useForm<StandForm>({
		resolver: zodResolver(StandFormSchema),
		defaultValues: {
			...defaultValues,
		},
	});

	console.log("hellllloooooo");

	const onSubmit: SubmitHandler<StandForm> = (data) => console.log(data);

	return (
		<Container component="form" onSubmit={handleSubmit(onSubmit)}>
			<Flex gap="md" justify="center" align="center" direction="row">
				<NumberInput name="match" control={control} label="Match" />
				<Select
					name="slot"
					control={control}
					label="Slot"
					placeholder="Select"
					data={["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]}
				/>
			</Flex>
			<Tabs color={theme.colors.milkshake[4]} defaultValue="auto">
				<Tabs.List justify="center">
					<Tabs.Tab value="auto">Auto</Tabs.Tab>
					<Tabs.Tab value="teleop">TeleOp</Tabs.Tab>
					<Tabs.Tab value="Misc">Misc</Tabs.Tab>
				</Tabs.List>
				<Tabs.Panel value="auto">
					<Checkbox
						name="startingZone"
						control={control}
						color={theme.colors.milkshake[4]}
						label="Left Starting Zone"
					/>
					<Fieldset legend="Speaker">
						<NumberInput
							name="autoSpeakerScored"
							control={control}
							label="Scored"
						/>
						<NumberInput
							name="autoSpeakerMissed"
							control={control}
							label="Missed"
						/>
					</Fieldset>
				</Tabs.Panel>
				<Tabs.Panel value="teleop">
					<Fieldset legend="Speaker">
						<NumberInput
							name="teleopSpeakerScored"
							control={control}
							label="Scored"
						/>
						<NumberInput
							name="teleopSpeakerMissed"
							control={control}
							label="Missed"
						/>
					</Fieldset>
					<Fieldset legend="Amp">
						<NumberInput
							name="teleopAmpScored"
							control={control}
							label="Scored"
						/>
						<NumberInput
							name="teleopAmpMissed"
							control={control}
							label="Missed"
						/>
					</Fieldset>
					<Fieldset legend="Trap">
						<NumberInput
							name="teleopTrapScored"
							control={control}
							label="Scored"
						/>
						<NumberInput
							name="teleopTrapMissed"
							control={control}
							label="Missed"
						/>
					</Fieldset>
					<Select
						name="endgame"
						control={control}
						label="Endgame"
						placeholder="Select"
						data={["Nothing", "Parked", "Failed Climb", "Climbed", "Harmony"]}
					/>
				</Tabs.Panel>
				<Tabs.Panel value="Misc">
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
					<TextInput
						name="notes"
						control={control}
						label="Notes"
						placeholder="Type your short, useful, and consice note here."
					/>
				</Tabs.Panel>
			</Tabs>
			<Button type="submit" color={theme.colors.milkshake[4]}>Submit</Button>
		</Container>
	);
}
