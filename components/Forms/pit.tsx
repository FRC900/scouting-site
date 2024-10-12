"use client";

import { Stack, Button, useMantineTheme, Group } from "@mantine/core";
import { useForm, Form } from "react-hook-form";
import { type PitForm } from "../../lib/definitions";
import { PitFormSchema } from "../../lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberInput } from "./inputs/NumberInput";
import { Select } from "./inputs/Select";
import { TextInput } from "./inputs/TextInput";
import { createPitForm } from "../../lib/actions";
import { useState } from "react";
import { useOnlineStatus } from "../../lib/useOnlineStatus";

export default function PitForm() {
	const [submitting, setSubmitting] = useState<"" | "fetching" | "done">("");
	const isOnline = useOnlineStatus();
	const theme = useMantineTheme();

	const { control, reset } = useForm<PitForm>({
		resolver: zodResolver(PitFormSchema),
		defaultValues: {
			team: undefined,
			drive: undefined,
			weight: undefined,
			preferredScoring: undefined,
			electrical: undefined,
			bumpers: undefined,
			notes: "",
		},
	});

	const submit = (data: PitForm) => {
		if (isOnline) {
			setSubmitting('fetching');
			createPitForm(data).then(() => setSubmitting("done"));
			// setTimeout(() => setSubmitting('done'), 5000)
		}
	};

	return (
		<Form
			control={control}
			onSubmit={({ data }) => submit(data)}
			onError={(e) => console.log(e)}
		>
			<Stack>
				<NumberInput name="team" control={control} label="Team Number" />
				<Select
					name="drive"
					control={control}
					label="Drive Train"
					placeholder="Select"
					data={[
						{ label: "Swerve", value: "swerve" },
						{ label: "Tank", value: "tank" },
						{ label: "Mecanum", value: "mecanum" },
					]}
				/>
				<NumberInput
					name="weight"
					control={control}
					label="Weight (lbs)"
					description="Without bumpers and battery."
				/>
				<Select
					name="preferredScoring"
					control={control}
					label="Preferred Scoring Location"
					description="For Qualifications."
					placeholder="Select"
					data={[
						{ label: "Speaker", value: "speaker" },
						{ label: "Amp", value: "Amp" },
					]}
				/>
				<Select
					name="electrical"
					control={control}
					label="Electrical Rating"
					placeholder="Select"
					data={[
						{ label: "1 - Incomplete", value: "1" },
						{ label: "2 - Hazardous", value: "2" },
						{ label: "3 - Messy", value: "3" },
						{ label: "4 - Acceptable", value: "4" },
						{ label: "5 - Star Struck", value: "5" },
					]}
				/>
				<Select
					name="bumpers"
					control={control}
					label="Bumpers Rating"
					placeholder="Select"
					data={[
						{ label: "1 - Poor", value: "1" },
						{ label: "2 - Good", value: "2" },
						{ label: "3 - Meg Approved", value: "3" },
					]}
				/>
				<TextInput
					name="notes"
					control={control}
					label="Notes"
					placeholder="Additional Information Here"
				/>
				<Group justify="end">
					<Button
						type="submit"
						disabled={submitting === "fetching"}
						color={theme.colors.milkshake[4]}
					>
						Submit
					</Button>
				</Group>
			</Stack>
		</Form>
	);
}
