'use client';

import { useState } from "react";

export default function RangeSelector({ name }: { name: string }) {

    const [rangeval, setRangeval] = useState(0);


    function handleRangevalChange(e: React.ChangeEvent<HTMLInputElement>) {
        e.preventDefault();
        setRangeval(+e.target.value);
    }

    const CapName = name[0].toUpperCase() + name.slice(1);
    const aria = name + "-error";

    return (
        <div className="flex flex-col gap-4">
            <label className="p-2">Rate {CapName} (Higher is better): {rangeval}</label>
            <input 
                id={name} 
                type="range" 
                min="0" max="5" 
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