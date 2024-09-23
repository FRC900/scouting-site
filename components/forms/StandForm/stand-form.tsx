'use client';

import Incrementor from "../incrementor";
import RangeSelector from "../range-selector";
import NotesBox from "../notes";
import { createStandForm } from "@/lib/actions";
import { TBATeamSimple } from "@/lib/definitions";
import useSWR from "swr";
import fetcher from "@/lib/fetcher";
import { tbaEventKey } from "@/lib/constants";
import { SubmitHandler, useForm } from "react-hook-form";
import { type StandForm } from "@/lib/definitions";

export default function StandForm() {

	// const initialState = { message: null, errors: {} };
	// const [state, dispatch] = useFormState(createStandForm, initialState);

	const {
		register,
		handleSubmit,
		control,
		formState: { errors },
	} = useForm<StandForm>();

	const onSubmit: SubmitHandler<StandForm> = (data) => console.log(data);

	const { data: teams } = useSWR<TBATeamSimple[]>(`https://www.thebluealliance.com/api/v3/event/${tbaEventKey}/teams/simple`, fetcher)
	if (!teams) return null;

	const defenceRatings: string[] = [
		"0 - No Defence",
		"1 - Penalties Galore",
		"2 - Some Penalties",
		"3 - Ineffective",
		"4 - Good Defence",
		"5 - Strong.",
	];
	const statusRatings: string[] = [
		"0 - No-Show",
		"1 - Didn't Move",
		"2 - Broke In Match",
		"3 - Disconnections",
		"4 - No Issues (Solid)",
		"5 - Pro Preformance",
	];

	return (
		<form onSubmit={handleSubmit(onSubmit)} className="text-snow flex flex-col gap-2">
			<div className="flex flex-row gap-4 text-xl rounded-3xl p-5 w-max">
				<div className="flex flex-col gap-4">
					<label className="p-2">Match Number:</label>
					<input
						type="number"
						step="1"
						placeholder="0"
						className="p-2 border border-ink rounded-md text-ink"
						{...register("match", { required: true })}
					/>
				</div>
				<div className="flex flex-col gap-4">
					<label className="p-2">Slot:</label>
					<select
						defaultValue=""
						className="p-2 border border-ink rounded-md text-ink"
						{...register("slot", { required: true })}
					>
						<option value="" disabled></option>
						<option>Red 1</option>
						<option>Red 2</option>
						<option>Red 3</option>
						<option>Blue 1</option>
						<option>Blue 2</option>
						<option>Blue 3</option>
					</select>
				</div>
				<div className="flex flex-col gap-4">
					<label className="p-2">Team Number:</label>
					<select
						defaultValue=""
						className="p-2 border border-ink rounded-md text-ink"
						{...register("team", { required: true })}
					>
						<option value="" disabled></option>
						{teams.map((team) => (
								<option key={team.team_number} value={team.team_number}>
									{team.team_number}
								</option>
						))}
					</select>
				</div>
				<div className="flex flex-col gap-4">
					<label className="p-2">Scouter:</label>
					<input
						type="string"
						placeholder=""
						className="p-2 border border-ink rounded-md text-ink"
						{...register("name", { required: true })}
					/>
				</div>
			</div>
			<div className="flex flex-row gap-5 p-2 border-4 border-snow rounded-xl">
				<p className="w-12">
					<strong>Auto</strong>
				</p>
				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-2">
						<label>Left Starting Zone?</label>
						<input
							type="checkbox"
							className="h-6 w-6 border border-gravy rounded"
							{...register("leftstartzone")}
						/>
					</div>
					<div className="flex flex-row gap-10">
						<div>
							<label className="mx-auto w-max">Speaker</label>
							<div>
								<label>Scored</label>
								<Incrementor name="autospeakerscored" control={control} rules={{ required: true}} />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="autospeakermissed" control={control} rules={{ required: true}} />
							</div>
						</div>
						<div>
							<label>Amp</label>
							<div>
								<label>Scored</label>
								<Incrementor name="autoampscored" control={control} rules={{ required: true}} />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="autoampmissed" control={control} rules={{ required: true}} />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-5 p-2 border-4 border-snow rounded-xl">
				<p className="w-12">
					<strong>Teleop</strong>
				</p>
				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-10">
						<div>
							<label>Speaker</label>
							<div>
								<label>Scored</label>
								<Incrementor name="teleopspeakerscored" control={control} rules={{ required: true}} />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="teleopspeakermissed" control={control} rules={{ required: true}} />
							</div>
						</div>
						<div>
							<label>Amp</label>
							<div>
								<label>Scored</label>
								<Incrementor name="teleopampscored" control={control} rules={{ required: true}} />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="teleopampmissed" control={control} rules={{ required: true}} />
							</div>
						</div>
						<div>
							<label>Trap</label>
							<div>
								<label>Scored</label>
								<Incrementor name="teleoptrapscored" control={control} rules={{ required: true}} />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="teleoptrapmissed" control={control} rules={{ required: true}} />
							</div>
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<label className="my-auto">Endgame Status:</label>
						<select
							defaultValue=""
							className="p-2 border border-ink rounded-md text-ink"
							{...register("endgame", { required: true })}
						>
							<option value="" disabled></option>
							<option>Nothing</option>
							<option>Parked</option>
							<option>Failed Climb</option>
							<option>Climbed</option>
							<option>Harmony</option>
						</select>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-5 p-2 border-4 border-snow rounded-xl">
				<label>
					<strong>Misc</strong>
				</label>
				<div>
					<div className="flex flex-col gap-2 flex-shrink-0 flex-flow:column wrap">
						<RangeSelector name="defence" ratings={defenceRatings} />
					</div>
					<div className="flex flex-col gap-2 flex-shrink-0 flex-flow:column wrap">
						<RangeSelector name="status" ratings={statusRatings} />
					</div>
				</div>
				<div>
					<div>
						<label>Fouls</label>
						<Incrementor name="fouls" control={control} rules={{ required: true}} />
					</div>
					<div>
						<label>Tech Fouls</label>
						<Incrementor name="techfouls" control={control} rules={{ required: true}} />
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<NotesBox name="" />
				</div>
			</div>
			<div>
				<input type="submit" value="Submit" className="flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium transition-colors text-ink bg-snow hover:bg-zinc-900 hover:text-snow hover:outline md:text-base"/>
			</div>
		</form>
	);
}
