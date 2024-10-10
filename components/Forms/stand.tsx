"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Form, useForm } from "react-hook-form";
import { StandFormSchema } from "../../lib/constants";
import { NumberInput } from "./inputs/NumberInput";
import { Select } from "./inputs/Select";
import { Checkbox } from "./inputs/Checkbox";
import { Textarea } from "./inputs/Textarea";
import { type StandForm } from "../../lib/definitions";
import { Button, Group, Stack } from "@mantine/core";

export default function StandForm() {
	const { control } = useForm<StandForm>({
		resolver: zodResolver(StandFormSchema),
		defaultValues: {
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
				<Group>
					<NumberInput name="match" control={control} label="Match Number" />
					<Select
						name="slot"
						control={control}
						label="Slot"
						placeholder="Select"
						data={["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]}
					/>
				</Group>
				<Group>
					<Checkbox
						name="preloaded"
						control={control}
						// color={theme.colors.milkshake[4]}
						label="Preloaded?"
					/>
					<Checkbox
						name="startingZone"
						control={control}
						// color={theme.colors.milkshake[4]}
						label="Left Starting Zone?"
					/>
				</Group>
				<Group>
					<NumberInput
						name="autoSpeakerScored"
						control={control}
						label="Auto Speaker Scored"
					/>
					<NumberInput
						name="autoSpeakerMissed"
						control={control}
						label="Auto Speaker Missed"
					/>
				</Group>
				<Group>
					<NumberInput
						name="teleopAmplifiedSpeakerScored"
						control={control}
						label="TeleOp Amplified Scored"
					/>
					<NumberInput
						name="teleopSpeakerScored"
						control={control}
						label="Teleop Speaker Scored"
					/>
					<NumberInput
						name="teleopSpeakerMissed"
						control={control}
						label="Teleop Speaker Missed"
					/>
				</Group>
				<Group>
					<NumberInput
						name="teleopAmpScored"
						control={control}
						label="Teleop Amp Scored"
					/>
					<NumberInput
						name="teleopAmpMissed"
						control={control}
						label="Teleop Amp Missed"
					/>
				</Group>
				<Group>
					<NumberInput
						name="teleopTrapScored"
						control={control}
						label="Teleop Trap Scored"
					/>
					<NumberInput
						name="teleopTrapMissed"
						control={control}
						label="Teleop Trap Missed"
					/>
				</Group>
				<Group>
					<NumberInput name="fouls" control={control} label="Fouls" />
					<NumberInput name="techfouls" control={control} label="Tech Fouls" />
				</Group>
				<Group>
					<Select
						name="endgame"
						control={control}
						label="Endgame"
						placeholder="Select"
						data={["Nothing", "Parked", "Failed Climb", "Climbed", "Harmony"]}
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
				</Group>
				<Textarea
					name="notes"
					control={control}
					label="Notes"
					placeholder="Type your short, useful, and consice note here."
				/>
				<Group justify="end">
					<Button type="submit">Submit</Button>
				</Group>
			</Stack>
		</Form>
	);
}
