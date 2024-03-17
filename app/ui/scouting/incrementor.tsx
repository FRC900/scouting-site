'use client';

import { useState } from "react";

export default function Incrementor({ name }: { name: string }) {
	const [count, setCount] = useState(0);

	function decrement(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault()
		if (count === 0) {
			return;
		} else {
			setCount(count - 1);
		}
	}

	function increment(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
		e.preventDefault()
		setCount(count + 1);
	}

	return (
		<div className="flex flex-row gap-1">
			<button
				onClick={decrement}
				className="px-5 py-2 bg-white rounded border-2 border-slate-950"
			>	
				<p className="text-3xl text-slate-950">-</p>
			</button>
			<input	
				id={name}
				type="number"
				step="1"
				value={count}
				aria-describedby={name + "-error"}
				className="p-2 border-2 border-slate-950 rounded-md text-slate-950 w-12"
				readOnly
			/>
			<button
				onClick={increment}
				className="px-5 py-2 bg-slate-700 rounded border-2 border-slate-950"
			>
				<p className="text-3xl text-slate-950">+</p>
			</button>
		</div>
	);
}
