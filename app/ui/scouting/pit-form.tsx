import Link from "next/link";
import { TeamField } from "@/app/lib/definitions";
import RangeSelector from "@/app/ui/scouting/range-selector";
import NotesBox from "@/app/ui/scouting/notes";

export default function PitForm() {
	const electricalRatings: string[] = ["1 - Incomplete", "2 - Hazardous", "3 - Messy", "4 - Acceptable", "5 - Star Struck"];
	const bumperRatings: string[] = ["1 - Poor", "2 - Good", "3 - Meg Approved"]

	return (
		<form>
			<div className="flex flex-col gap-4 text-slate-200 text-xl rounded-3xl p-5 w-max">
				<div className="flex flex-col gap-4">
					<label className="p-2">Team Number:</label>
					<input
						id="team"
						name="team"
						type="number"
						step="1"
						placeholder="0"
						aria-describedby="team-error"
						className="p-2 border border-slate-950 rounded-md text-slate-950"
					/>
				</div>
				<div className="flex flex-col gap-4">
					<label className="p-2">What Drive Train?</label>
					<select
						id="drivetrain"
						name="drivetrain"
						defaultValue=""
						aria-describedby="drivetrain-error"
						className="p-2 border border-slate-950 rounded-md text-slate-950"
					>
						<option value="" disabled>
							Select a Drive Train
						</option>
						<option>Tank</option>
						<option>Swerve</option>
						<option>Mecanum</option>
					</select>
				</div>
				<div className="flex flex-col gap-4">
					<label className="p-2">Weight (without bumpers and battery):</label>
					<input
						id="weight"
						name="weight"
						type="number"
						step="1"
						placeholder="0"
						aria-describedby="weight-error"
						className="p-2 border border-slate-950 rounded-md text-slate-950"
					/>
				</div>
				<RangeSelector name="electrical" ratings={electricalRatings} />
				<NotesBox name="electrical" />
				<RangeSelector name="bumpers" ratings={bumperRatings} />
				<NotesBox name="bumpers" />
				<NotesBox name="" />
			</div>
			<input type="submit" value="Submit" className="flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium transition-colors text-slate-950 bg-slate-200 hover:bg-slate-900 hover:text-slate-200 hover:outline md:text-base"/>
		</form>
	);
}
