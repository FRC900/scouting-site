'use client';

import { useState } from "react";
import { useController, Control, FieldValues, Path, UseControllerProps, Field } from "react-hook-form";
import { StandForm } from "@/lib/definitions";

type Props<T extends FieldValues> = {
	control: Control<T>;
	name: Path<T>;
	rules?: UseControllerProps<T>['rules'];
}

export const Incrementor = <T extends FieldValues>({
	control,
	name,
	rules,
}: Props<T>) => {

	const { field, fieldState } = useController({
		control,
		name,
		rules,
	});

	const change = (v: number) => {
		if (v < 0) return;
		field.onChange(v);
	};

	return (
		<div className="flex flex-row gap-1">
			<button
				onClick={() =>
					change(typeof field.value !== "number" ? -1 : field.value - 1)
				}
				className="px-5 py-2 bg-rose rounded border-2 border-ink"
			>
				<p className="text-3xl text-ink">-</p>
			</button>
			<input
			  type="number"
				onChange={(v) => field.onChange(v)}
				onBlur={field.onBlur}
				value={field.value}
				name={field.name}
				ref={field.ref}
				className="p-2 border-2 border-ink rounded-md bg-anchor w-12 text-center text-snow"
				disabled
			/>
			<button
				onClick={() =>
					change(typeof field.value !== "number" ? -1 : field.value + 1)
				}
				className="px-5 py-2 bg-amethyst rounded border-2 border-ink"
			>
				<p className="text-3xl text-ink">+</p>
			</button>
		</div>
	);
}

export default Incrementor;