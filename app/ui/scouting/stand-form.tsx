import { TeamField } from "@/app/lib/definitions";
import Incrementor from "@/app/ui/scouting/incrementor";
import { INSPECT_MAX_BYTES } from "buffer";

export default function StandForm({ teams }: { teams: TeamField[] }) {
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
						<option value="" disabled>
							Select a slot
						</option>
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
			<div className="flex flex-row gap-5">
				<p className="w-12">
					<strong>Auto</strong>
				</p>
				<div>
					<label>Speaker</label>
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
			<div className="flex flex-row gap-5">
				<p className="w-12">
					<strong>Teleop</strong>
				</p>
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
			</div>
		</form>
	);
}
