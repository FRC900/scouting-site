'use client';

import { Container, Button, useMantineTheme } from "@mantine/core";
import { SubmitHandler, useForm } from "react-hook-form";
import { type PitForm } from "../../../lib/definitions";
import { PitFormSchema } from "../../../lib/constants";
import { zodResolver } from "@hookform/resolvers/zod";
import { NumberInput } from "../NumberInput";
import { Select } from "../Select";
import { TextInput } from "../TextInput";

export default function PitForm() {
	const theme = useMantineTheme();

	const { control, handleSubmit } = useForm<PitForm>({
		resolver: zodResolver(PitFormSchema),
		defaultValues: {
			notes: "",
		},
	});

	const onSubmit: SubmitHandler<PitForm> = (data) => console.log(data);

	return (
		<Container>
			<form onSubmit={handleSubmit(onSubmit)}>
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
			</form>
		</Container>
	);
}
