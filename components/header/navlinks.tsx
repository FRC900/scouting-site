"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import clsx from "clsx";

const links = [
	{ key: "Stand Form", href: "/form/stand" },
	{ key: "Pit Form", href: "/form/pit" },
	{ key: "Records", href: "/records" },
	{ key: "Analysis", href: "/analysis" },
];

export default function NavLinks() {
	const pathname = usePathname();

	return (
		<>
			{links.map((link) => {
				<Link
					key={link.key}
					href={link.href}
					className={clsx(
						"flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue md:flex-none md:justify-start md:p-2 md:px-3",
						{
							"bg-sky-100 text-blue-600": pathname === link.href,
						}
					)}
				>
					<p>{link.key}</p>
				</Link>;
			})}
		</>
	);
}
