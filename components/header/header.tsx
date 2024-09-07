import ZebracornsLogo from "../ui/zebracorns-logo";
import NavLinks from "./navlinks";

export default function Header() {
	return (
		<div className="flex flex-row place-content-between pb-3 mb-0 px-auto border-b-2 border-slate-200">
			<div className="flex flex-row gap-4 text-slate-200">
				<div>
					<ZebracornsLogo />
				</div>
				<div className="py-2 text-2xl">
					<p>
						Zebracorns Scouting
					</p>
				</div>
			</div>
			<div>
				<NavLinks />
			</div>
		</div>
	);
}
