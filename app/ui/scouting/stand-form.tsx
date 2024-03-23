import { TeamField } from "@/app/lib/definitions";
import Incrementor from "@/app/ui/scouting/incrementor";
import { INSPECT_MAX_BYTES } from "buffer";
import RangeSelector from "./range-selector";

export default function StandForm({ teams }: { teams: TeamField[] }) {
	const defenceRatings: string[] = ["1 - Penalties Galore", "2 - Some Penalties", "3 - Ineffective", "4 - Good Defence", "5 - Strong."];

	return (
		<form className="text-slate-200 flex flex-col gap-2">
			<div className="flex flex-row gap-4 text-xl rounded-3xl p-5 w-max">
				<div className="flex flex-col gap-4">
					<label className="p-2">Match Number:</label>
					<input
						id="match"
						name="match"
						type="number"
						step="1"
						placeholder="0"
						aria-describedby="match-error"
						className="p-2 border border-slate-950 rounded-md text-slate-950"
					/>
				</div>
				<div className="flex flex-col gap-4">
					<label className="p-2">Slot:</label>
					<select
						id="slot"
						name="slot"
						defaultValue=""
						aria-describedby="slot-error"
						className="p-2 border border-slate-950 rounded-md text-slate-950"
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
						id="team"
						name="team"
						defaultValue=""
						aria-describedby="team-error"
						className="p-2 border border-slate-950 rounded-md text-slate-950"
					>
						{/* {teams.map((team) => (
            <option key={team.id} value={team.id}>
              {team.number}
            </option>
          ))} */}
					</select>
				</div>
				<div className="flex flex-col gap-4">
					<label className="p-2">First Name:</label>
					<input
						id="name"
						name="name"
						type="string"
						placeholder=""
						aria-describedby="name-error"
						className="p-2 border border-slate-950 rounded-md text-slate-950"
					/>
				</div>
			</div>
			<div className="flex flex-row gap-5 p-2 border-4 border-slate-200 rounded-xl">
				<p className="w-12">
					<strong>Auto</strong>
				</p>
				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-2">
						<label>Left Starting Zone?</label>
						<input
							id="starting-zone"
							name="starting-zone"
							type="checkbox"
							aria-describedby="starting-zone-error"
							className="h-6 w-6 border border-slate-850 rounded"
						/>
					</div>
					<div className="flex flex-row gap-10">
						<div>
							<label className="mx-auto w-max">Speaker</label>
							<div>
								<label>Scored</label>
								<Incrementor name="auto-speaker-scored" />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="auto-speaker-missed" />
							</div>
						</div>
						<div>
							<label>Amp</label>
							<div>
								<label>Scored</label>
								<Incrementor name="auto-amp-scored" />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="auto-amp-missed" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-5 p-2 border-4 border-slate-200 rounded-xl">
				<p className="w-12">
					<strong>Teleop</strong>
				</p>
				<div className="flex flex-col gap-2">
					<div className="flex flex-row gap-2">
						<label>Did they play any defence?</label>
						<input
							id="defence"
							name="defence"
							type="checkbox"
							aria-describedby="defence-error"
							className="h-6 w-6 border border-slate-850 rounded"
						/>
					</div>
					<div className="flex flex-row gap-10">
						<div>
							<label>Speaker</label>
							<div>
								<label>Scored</label>
								<Incrementor name="teleop-speaker-scored" />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="teleop-speaker-missed" />
							</div>
						</div>
						<div>
							<label>Amp</label>
							<div>
								<label>Scored</label>
								<Incrementor name="teleop-amp-scored" />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="teleop-amp-missed" />
							</div>
						</div>
						<div>
							<label>Trap</label>
							<div>
								<label>Scored</label>
								<Incrementor name="teleop-trap-scored" />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="teleop-trap-missed" />
							</div>
						</div>
					</div>
					<div className="flex flex-row gap-4">
						<label className="my-auto">Endgame Status:</label>
						<select
							id="endgame"
							name="endgame"
							defaultValue=""
							aria-describedby="endgame-error"
							className="p-2 border border-slate-950 rounded-md text-slate-950"
						>
							<option value="" disabled></option>
							<option>Parked</option>
							<option>Failed Climb</option>
							<option>Climbed</option>
							<option>Harmony</option>
						</select>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-5 p-2 border-4 border-slate-200 rounded-xl">
				<label><strong>Misc</strong></label>
				<div className="flex flex-col gap-2 flex-shrink-0 flex-flow:column wrap">
					<RangeSelector name="defence" ratings={defenceRatings} />
				</div>
			</div>
		</form>
	);
}
