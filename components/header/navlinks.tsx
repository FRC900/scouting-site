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
		<div className="flex flex-row gap-4 font-bold">
			<Link
				key="standform"
				href="/form/stand"
				className={clsx(
					"flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm transition-colors bg-slate-200 hover:bg-zinc-800 hover:text-slate-200 hover:outline md:text-base",
					{
						"bg-zinc-800 text-slate-200 outline": pathname === "/form/stand",
					}
				)}
			>
				<p>Stand Form</p>
			</Link>
			<Link
				key="pitform"
				href="/form/pit"
				className={clsx(
					"flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm transition-colors bg-slate-200 hover:bg-zinc-800 hover:text-slate-200 hover:outline md:text-base",
					{
						"bg-zinc-800 text-slate-200 outline": pathname === "/form/pit",
					}
				)}
			>
				<p>Pit Form</p>
			</Link>
			<Link
				key="records"
				href="/records"
				className={clsx(
					"flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm transition-colors bg-slate-200 hover:bg-zinc-800 hover:text-slate-200 hover:outline md:text-base",
					{
						"bg-zinc-800 text-slate-200 outline": pathname === "/records",
					}
				)}
			>
				<p>Records</p>
			</Link>
			<Link
				key="analysis"
				href="/analysis"
				className={clsx(
					"flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm transition-colors bg-slate-200 hover:bg-zinc-800 hover:text-slate-200 hover:outline md:text-base",
					{
						"bg-zinc-800 text-slate-200 outline": pathname === "/analysis",
					}
				)}
			>
				<p>Analysis</p>
			</Link>
		</div>
		// <>
		// 	{links.map((link) => {
		// 		<Link
		// 			key={link.key}
		// 			href={link.href}
		// 			className={clsx(
		// 				"flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-gray-50 p-3 text-sm font-medium hover:bg-sky-100 hover:text-blue md:flex-none md:justify-start md:p-2 md:px-3",
		// 				{
		// 					"bg-sky-100 text-blue-600": pathname === link.href,
		// 				}
		// 			)}
		// 		>
		// 			<p>{link.key}</p>
		// 		</Link>;
		// 	})}
		// </>
	);
}
