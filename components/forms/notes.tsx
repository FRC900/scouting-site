'use client';

import { useState } from "react";

export default function NotesBox({ name }: { name: string }) {
    const has_extra_name = name.length != 0;

    const CapName = has_extra_name ? name.at(0)?.toUpperCase() + name.slice(1) + " Notes:" : "Notes:";
    const full_name = name + (has_extra_name ? "notes" : "");
    const aria =  full_name + "-error";

    console.log(full_name);

    return (
        <div className="flex flex-col gap-4"> 
            <label className="p-2">{CapName}</label>
            <textarea
                id={full_name}
                name={full_name}
                rows={5}
                cols={33}
                aria-describedby={aria}
                className="p-2 border border-snow bg-anchor rounded-md text-snow"
            >
            </textarea>
        </div>
    );
}


