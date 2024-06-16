'use client';

import Incrementor from "@/app/ui/scouting/incrementor";
import RangeSelector from "./range-selector";
import NotesBox from "./notes";
import { createStandForm } from "@/app/lib/actions";
import { TBATeamSimple } from "@/app/lib/definitions";
import { getTeams } from "@/app/lib/fetch";
import useSWR from "swr";
import fetcher from "@/app/lib/fetcher";
import { tbaEventKey } from "@/app/lib/constants";

export default function StandForm() {

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
		<form action={createStandForm} className="text-slate-200 flex flex-col gap-2">
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
							id="startingZone"
							name="startingZone"
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
								<Incrementor name="autoSpeakerScored" />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="autoSpeakerMissed" />
							</div>
						</div>
						<div>
							<label>Amp</label>
							<div>
								<label>Scored</label>
								<Incrementor name="autoAmpScored" />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="autoAmpMissed" />
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
					<div className="flex flex-row gap-10">
						<div>
							<label>Speaker</label>
							<div>
								<label>Scored</label>
								<Incrementor name="teleopSpeakerScored" />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="teleopSpeakerMissed" />
							</div>
						</div>
						<div>
							<label>Amp</label>
							<div>
								<label>Scored</label>
								<Incrementor name="teleopAmpScored" />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="teleopAmpMissed" />
							</div>
						</div>
						<div>
							<label>Trap</label>
							<div>
								<label>Scored</label>
								<Incrementor name="teleopTrapScored" />
							</div>
							<div>
								<label>Missed</label>
								<Incrementor name="teleopTrapMissed" />
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
							<option>Nothing</option>
							<option>Parked</option>
							<option>Failed Climb</option>
							<option>Climbed</option>
							<option>Harmony</option>
						</select>
					</div>
				</div>
			</div>
			<div className="flex flex-row gap-5 p-2 border-4 border-slate-200 rounded-xl">
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
						<Incrementor name="fouls" />
					</div>
					<div>
						<label>Tech Fouls</label>
						<Incrementor name="techfouls" />
					</div>
				</div>
				<div className="flex flex-col gap-4">
					<NotesBox name="" />
				</div>
			</div>
			<div>
				<input type="submit" value="Submit" className="flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium transition-colors text-slate-950 bg-slate-200 hover:bg-zinc-900 hover:text-slate-200 hover:outline md:text-base"/>
			</div>
		</form>
	);
}
