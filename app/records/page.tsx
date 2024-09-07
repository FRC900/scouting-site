import Link from "next/link"

export default function Page() {
  return (
    <div className="text-slate-200 flex flex-col gap-5 mt-10">
      <p className="text-4xl">Records</p>
      <div className="grid grid-cols-2 gap-6">
      <Link
          key="stand"
          href="/records/stand"
          className="flex rounded-md px-8 py-2 font-bold bg-slate-200 text-zinc-800 hover:bg-zinc-800 hover:text-slate-200 hover:outline"
        >
          <p>Stand Forms</p>
        </Link>
        <Link
          key="pit"
          href="/records/pit"
          className="flex rounded-md px-8 py-2 font-bold bg-slate-200 text-zinc-800 hover:bg-zinc-800 hover:text-slate-200 hover:outline"
        >
          <p>Pit Forms</p>
        </Link>
        <Link
          key="User"
          href="/records/user"
          className="flex rounded-md px-8 py-2 font-bold bg-slate-200 text-zinc-800 hover:bg-zinc-800 hover:text-slate-200 hover:outline"
        >
          <p>Users</p>
        </Link>
        <Link
          key="verify"
          href="/records/verify"
          className="flex rounded-md px-8 py-2 font-bold bg-slate-200 text-zinc-800 hover:bg-zinc-800 hover:text-slate-200 hover:outline"
        >
          <p>Verify</p>
        </Link>
      </div>
    </div>
  )
}