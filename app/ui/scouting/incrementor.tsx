"use client";

import { useState } from "react";
import { MinusIcon } from "@heroicons/react/24/outline";
import { PlusIcon } from "@heroicons/react/24/outline";

export default function Incrementor({ name }: { name: string }) {
	const [count, setCount] = useState(0);

	function increment() {
		setCount(count - 1);
	}

	function decrement() {
		setCount(count + 1);
	}

	function updateValue(e: any) {
		setCount(e);
	}

	return (
		<div className="flex flex-row gap-1">
			<button
				onClick={increment}
				className="px-5 py-2 bg-white rounded border-2 border-slate-950"
			>
				<p className="text-3xl text-slate-950">-</p>
			</button>
			<input
				id={name}
				name={name}
				type="number"
				step="1"
				value={count}
				onChange={(event) => {
					updateValue(event.target.value);
				}}
				aria-describedby={name + "-error"}
				className="p-2 border-2 border-slate-950 rounded-md text-slate-950 w-12"
			/>
			<button
				onClick={decrement}
				className="px-5 py-2 bg-slate-700 rounded border-2 border-slate-950"
			>
				<p className="text-3xl text-slate-950">+</p>
			</button>
		</div>
	);
}
