'use client';

import * as React from "react";
import { useForm } from "react-hook-form";
import type { StandForm } from "@/lib/definitions";
import { createStandForm } from "@/lib/actions";

export default function VeryDemureStandForm() {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
  } = useForm<StandForm>()

  const onSubmit = handleSubmit((data) => createStandForm(data));

  return(
    <form onSubmit={onSubmit} className="text-slate-600 font-extrabold flex flex-col text-xl">
      <label>Match</label>
      <input type="number" placeholder="0" {...register("match", { required: true })} />
      <label>Slot</label>
      <select {...register("slot", { required: true })} >
        <option value="" disabled></option>
        <option value="R1">Red 1</option>
        <option value="R2">Red 2</option>
        <option value="R3">Red 3</option>
        <option value="B1">Blue 1</option>
        <option value="B2">Blue 2</option>
        <option value="B3">Blue 3</option>
      </select>
      <label>Team</label>
      <input type="number" {...register("team", { required: true })} />
      <label>Name</label>
      <input {...register("name", { required: true })} />
      <label>Left Start Zone</label>
      <input type="checkbox" {...register("leftstartzone", { required: true })} />
      <label>Auto Speaker Scored</label>
      <input defaultValue="0" {...register("autospeakerscored", { min: 0, valueAsNumber: true })} />
      <label>Auto Speaker Missed</label>
      <input defaultValue="0" {...register("autospeakermissed", { min: 0, valueAsNumber: true })} />
      <label>Auto Amp Scored</label>
      <input defaultValue="0" {...register("autoampscored", { min: 0, valueAsNumber: true })} />
      <label>Auto Amp Missed</label>
      <input defaultValue="0" {...register("autoampmissed", { min: 0, valueAsNumber: true })} />
      <label>Teleop Speaker Scored</label>
      <input defaultValue="0" {...register("teleopspeakerscored", { min: 0, valueAsNumber: true })} />
      <label>Teleop Speaker Missed</label>
      <input defaultValue="0" {...register("teleopspeakermissed", { min: 0, valueAsNumber: true })} />
      <label>Teleop Amp Scored</label>
      <input defaultValue="0" {...register("teleopampscored", { min: 0, valueAsNumber: true })} />
      <label>Teleop Amp Missed</label>
      <input defaultValue="0" {...register("teleopampmissed", { min: 0, valueAsNumber: true })} />
      <label>Teleop Trap Scored</label>
      <input defaultValue="0" {...register("teleoptrapscored", { min: 0, valueAsNumber: true })} />
      <label>Teleop Trap Missed</label>
      <input defaultValue="0" {...register("teleoptrapmissed", { min: 0, valueAsNumber: true })} />
      <label>Endgame</label>
      <input {...register("endgame")} />
      <label>Defence</label>
      <input {...register("defence")} />
      <label>Status</label>
      <input {...register("status")} />
      <label>Fouls</label>
      <input defaultValue="0" {...register("fouls", { min: 0, valueAsNumber: true })} />
      <label>Tech Fouls</label>
      <input defaultValue="0" {...register("techfouls", { min: 0, valueAsNumber: true })} />
      <label>Notes</label>
      <input {...register("comments")} />
    </form>
  )
}