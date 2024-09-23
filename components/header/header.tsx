import ZebracornsLogo from "../ui/zebracorns-logo";
import NavLinks from "./navlinks";

export default function Header() {
	return (
		<div className="flex flex-row place-content-between pb-3 mb-0 px-auto border-b-2 border-snow">
			<div className="flex flex-row gap-4 text-snow">
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
