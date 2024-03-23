'use client';

import { useState } from "react";

export default function RangeSelector({ name, ratings }: { name: string, ratings: string[] }) {

    const [rangeval, setRangeval] = useState(0);
    const arrayMax: number = ratings.length - 1;

    function handleRangevalChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setRangeval(+e.target.value);
    }

    const CapName = name[0].toUpperCase() + name.slice(1);
    const aria = name + "-error";

    return (
        <div className="flex flex-col gap-4 resize-none shrink-0 flex-flow:column wrap w-max">
            <label className="p-2 flex-shrink-0 resize-none">{CapName}: {ratings[rangeval]}</label>
            <input 
                id={name}
                type="range"
                min="0" max={arrayMax} 
                step="1"
                value={rangeval}
                aria-describedby={aria}
                className="p-2 border border-slate-950 rounded-md text-slate-950"
                onChange={handleRangevalChange}
                onInput={handleRangevalChange}
            />
        </div>
    );
}