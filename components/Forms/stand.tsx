"use client";

import { useForm, Form } from "react-hook-form";
import {
	Fieldset,
	Button,
	Tabs,
	useMantineTheme,
	Group,
	Stack,
} from "@mantine/core";
import { NumberInput } from "./inputs/NumberInput";
import { Select } from "./inputs/Select";
import { Checkbox } from "./inputs/Checkbox";
import { zodResolver } from "@hookform/resolvers/zod";
import { StandFormSchema, standDefaultValues } from "../../lib/constants";
import { type StandForm } from "../../lib/definitions";
import { Textarea } from "./inputs/Textarea";

export default function StandForm() {
	const theme = useMantineTheme();

	const { control } = useForm<StandForm>({
		resolver: zodResolver(StandFormSchema),
		defaultValues: {
			//...standDefaultValues,
			match: undefined,
			slot: undefined,
			preloaded: true,
			startingZone: false,
			autoSpeakerScored: 0,
			autoSpeakerMissed: 0,
			teleopAmplifiedSpeakerScored: 0,
			teleopSpeakerScored: 0,
			teleopSpeakerMissed: 0,
			teleopAmpScored: 0,
			teleopAmpMissed: 0,
			teleopTrapScored: 0,
			teleopTrapMissed: 0,
			fouls: 0,
			techfouls: 0,
			endgame: undefined,
			defence: undefined,
			status: undefined,
			notes: "",
		},
	});

	return (
		<Form
			control={control}
			onSubmit={({ data }) => console.log(data)}
			onError={(e) => console.log(e)}
		>
			<Stack>
				<Group justify="center">
					<NumberInput name="match" control={control} label="Match" />
					<Select
						name="slot"
						control={control}
						label="Slot"
						placeholder="Select"
						data={["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]}
					/>
				</Group>
				{/* <Tabs color={theme.colors.milkshake[4]} defaultValue="auto">
					<Tabs.List justify="center" grow>
						<Tabs.Tab value="auto">Auto</Tabs.Tab>
						<Tabs.Tab value="teleop">TeleOp</Tabs.Tab>
						<Tabs.Tab value="Misc">Misc</Tabs.Tab>
					</Tabs.List>
					<Tabs.Panel value="auto" mt="xs"> */}
				<Group justify="center">
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
				</Group>
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
				{/* </Tabs.Panel>
					<Tabs.Panel value="teleop" mt="xs"> */}
				<Group>
					<Fieldset legend="Speaker">
						<NumberInput
							name="teleopAmplifiedSpeakerScored"
							control={control}
							label="Amplified Scored"
						/>
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
				</Group>
				<Group>
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
				</Group>
				<Select
					name="endgame"
					control={control}
					label="Endgame"
					placeholder="Select"
					data={["Nothing", "Parked", "Failed Climb", "Climbed", "Harmony"]}
				/>
				{/* </Tabs.Panel>
					<Tabs.Panel value="Misc" mt="xs"> */}
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
				<Textarea
					name="notes"
					control={control}
					label="Notes"
					placeholder="Type your short, useful, and consice note here."
				/>
				{/* </Tabs.Panel>
				</Tabs> */}
				<Group justify="flex-end">
					<Button type="submit" color={theme.colors.milkshake[4]}>
						Submit
					</Button>
				</Group>
			</Stack>
		</Form>
	);
}
