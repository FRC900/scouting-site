"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import {
	Fieldset,
	Button,
	Tabs,
	useMantineTheme,
	Container,
	Group,
	Stack,
} from "@mantine/core";
import { NumberInput } from "./inputs/NumberInput";
import { Select } from "./inputs/Select";
import { Checkbox } from "./inputs/Checkbox";
import { TextInput } from "./inputs/TextInput";
import { createStandForm } from "../../lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { StandFormSchema, standDefaultValues } from "../../lib/constants";
import { type StandForm } from "../../lib/definitions";

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
			...standDefaultValues,
		},
	});

	const onSubmit: SubmitHandler<StandForm> = (data) => console.log(data);

	return (
		<Stack component="form" onSubmit={handleSubmit(onSubmit)}>
			<Group>
				<NumberInput name="match" control={control} label="Match" />
				<Select
					name="slot"
					control={control}
					label="Slot"
					placeholder="Select"
					data={["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]}
				/>
			</Group>
			<Tabs color={theme.colors.milkshake[4]} defaultValue="auto">
				<Tabs.List justify="center" grow>
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
					<Fieldset legend="Penalties">
						<NumberInput name="fouls" control={control} label="Fouls" />
						<NumberInput
							name="techfouls"
							control={control}
							label="Tech Fouls"
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
			<Group justify="flex-end">
				<Button type="submit" color={theme.colors.milkshake[4]}>
					Submit
				</Button>
			</Group>
		</Stack>
	);
}
