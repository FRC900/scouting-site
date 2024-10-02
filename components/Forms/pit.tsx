"use client";

import { Container, Button, useMantineTheme } from "@mantine/core";
import { SubmitHandler, useForm, Form } from "react-hook-form";
import { type PitForm } from "../../lib/definitions";
import { PitFormSchema } from "../../lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberInput } from "./inputs/NumberInput";
import { Select } from "./inputs/Select";
import { TextInput } from "./inputs/TextInput";

export default function PitForm() {
	const theme = useMantineTheme();

	const { control } = useForm<PitForm>({
		resolver: zodResolver(PitFormSchema),
		defaultValues: {
			notes: "",
		},
	});

	return (
		<Form
			control={control}
			onSubmit={({ data }) => console.log(data)}
			onError={(e) => console.log(e)}
		>
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
			<NumberInput name="weight" control={control} label="Weight (lbs)" />
			<Select
				name="preferredScoring"
				control={control}
				label="Preferred Scoring Location"
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
			<Button type="submit" color={theme.colors.milkshake[4]}>
				Submit
			</Button>
		</Form>
	);
}