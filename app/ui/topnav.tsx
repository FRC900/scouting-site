import Link from "next/link";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export default function TopNav() {
  return (
    <div className="grid w-full grid-cols-2 grid-rows-1 px-4 py-1 md:px-3 border-b-2 border-slate-200 h-16">
      <div className="w-max justify-left">
        <p className="text-slate-200 text-3xl"><strong>Zebracorns Scouting</strong></p>
      </div>
      <div className="w-max justify-right">
        <nav>
          <Link
            href="/scouting/standform/"
            className="flex items-center gap-5 self-start rounded-lg px-4 py-2 text-sm font-medium transition-colors text-slate-200 hover:bg-slate-900 hover:text-slate-200 hover:outline md:text-base"
          >
            <span>Scouting</span><ArrowRightIcon className="w-5 md:w-6" />
          </Link>
        </nav>
      </div>
    </div>
  )
}