"use client";

import { useForm, SubmitHandler } from "react-hook-form";
import { Fieldset, Box, Button } from "@mantine/core";
import { NumberInput } from "../NumberInput";
import { NativeSelect } from "../NativeSelect";
import { Checkbox } from "../Checkbox";
import { TextInput } from "../TextInput";
import { createStandForm } from "../../../lib/actions";
import { zodResolver } from "@hookform/resolvers/zod";
import { StandFormSchema, defaultValues } from "../../../lib/constants";
import { type StandForm } from "../../../lib/definitions";

export default function StandForm() {
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
		<Box component="form" onSubmit={handleSubmit(onSubmit)}>
			<NumberInput name="match" control={control} label="Match" />
			<NativeSelect
				name="slot"
				control={control}
				label="Slot"
				data={["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]}
			/>
			<Fieldset legend="Auto">
				<Checkbox
					name="startingZone"
					control={control}
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
			</Fieldset>
			<Fieldset legend="TeleOp">
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
				<NativeSelect
					name="endgame"
					control={control}
					label="Endgame"
					data={["Nothing", "Parked", "Failed Climb", "Climbed", "Harmony"]}
				/>
			</Fieldset>
			<Fieldset legend="Misc">
				<NativeSelect
					name="defence"
					control={control}
					label="Defence"
					data={[
						{ label: "No Defence", value: "0" },
						{ label: "Penalties Galore", value: "1" },
						{ label: "Some Penalties", value: "2" },
						{ label: "Ineffective", value: "3" },
						{ label: "Good Defence", value: "4" },
						{ label: "Strong.", value: "5" },
					]}
				/>
				<NativeSelect
					name="status"
					control={control}
					label="Status"
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
			</Fieldset>
			<Button type="submit">Submit</Button>
		</Box>
	);
}
