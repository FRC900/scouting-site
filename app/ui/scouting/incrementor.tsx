'use client';

import { useState } from "react";

export default function Incrementor({ name }: { name: string }) {
  
  
  
  function handleClick() {

  }

  return (
    <div>
      <button>

      </button>
      <input 
        id={ name }
        name={ name }
        type="number"
        placeholder="0"
        aria-describedby={name + "-error"}
        className="p-2 border border-slate-950 rounded-md text-slate-950"
      />
      <button>

      </button>
    </div>
  )
}