import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col p-6">
			<div className="m-10 flex flex-col gap-4 md:flex-col p-8 pl-12 w-max bg-zinc-800 rounded-3xl shadow-2xl">
				<p className="text-x text-slate-200 md:text-3xl md:leading-normal">
					<em>If you are a team member,</em>
					<br />  
					<em>Log in or Sign up to continue.</em>
				</p>
				<div className="flex flex-row gap-4">
					<Link
						href="/auth/login"
						className="flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium transition-colors bg-slate-200 hover:bg-zinc-800 hover:text-slate-200 hover:outline md:text-base"
					>
						<span>Log in</span> <ArrowRightIcon className="w-5 md:w-6" />
					</Link>
					<Link
						href="/auth/signup"
						className="flex items-center gap-5 self-start rounded-lg px-6 py-3 text-sm font-medium transition-colors bg-slate-200 hover:bg-zinc-800 hover:text-slate-200 hover:outline md:text-base"
					>
						<span>Sign up</span> <ArrowRightIcon className="w-5 md:w-6" />
					</Link>
				</div>
			</div>
		</main>
	);
}
