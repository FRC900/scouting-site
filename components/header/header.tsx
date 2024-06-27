import NavLinks from "./navlinks";

export default function Header() {
	return (
		<div className="flex flex-row text-slate-200">
			<div>
				<p>Zebracorns Scouting</p>
			</div>
			<div>
				<NavLinks />
			</div>
		</div>
	);
}
