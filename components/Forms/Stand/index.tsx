'use client';

import { useForm, SubmitHandler } from "react-hook-form";
import { type StandForm } from "../../../lib/definitions";
import { Fieldset, NativeSelect, NumberInput } from '@mantine/core';

export default function StandForm() {
	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<StandForm>();

  const onSubmit: SubmitHandler<StandForm> = (data) => console.log(data);

	return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Fieldset legend="Select">
				<NumberInput
					label="Match"
					placeholder="Match Number"
				/>
				<NativeSelect
					label="Slot"
					data={['Red 1', 'Red 2', 'Red 3', 'Blue 1', 'Blue 2', 'Blue 3']}
				/>
      </Fieldset>
    </form>
  );
}
