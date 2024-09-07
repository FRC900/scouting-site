import { filterStandRecords } from "@/lib/actions";

export default function Filter() {
	return (
		<form action={filterStandRecords} className="flex flex-col gap-3">
			<div className="flex flex-row gap-3">
				<div className="flex flex-col gap-2">
					<label>Match Number</label>
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
				<div className="flex flex-col gap-2">
					<label>Team Number</label>
					<input
						id="team"
						name="team"
						type="number"
						step="1"
						placeholder="0"
						aria-describedby="match-error"
						className="p-2 border border-slate-950 rounded-md text-slate-950"
					/>
				</div>
				<div className="flex flex-col gap-2">
					<label>Scouter Username</label>
					<input
						id="username"
						name="username"
						type="string"
						placeholder=""
						aria-describedby="name-error"
						className="p-2 border border-slate-950 rounded-md text-slate-950"
					/>
				</div>
			</div>
      <div className="flex flex-row">
        <input type="submit" value="Update" className="justify-end rounded-lg px-6 py-3 font-bold transition-colors text-slate-950 bg-slate-200 hover:bg-zinc-900 hover:text-slate-200 hover:outline md:text-base" />
      </div>
		</form>
	);
}
