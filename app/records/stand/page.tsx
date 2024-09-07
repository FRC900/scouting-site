import Filter from "@/components/records/filter";
import StandFormTable from "@/components/records/stand-form-table";
// import { fetchStandFormPages } from "@/lib/data";
import { Suspense } from "react";

export default async function Page({
  searchParams,
}: {
  searchParams?: {
    query?: string;
    page?: string;
  };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  // const totalPages = await fetchStandFormPages(query);

	return (
		<div className="flex flex-col text-slate-200">
			<div className="flex flex-col gap-5 border border-slate-200 rounded-xl p-10">
				<p className="text-2xl">Filter</p>
				<Filter />
			</div>
			<div className="w-full">
				<Suspense key={query + currentPage} fallback={<p>loading table...</p>}>
					<StandFormTable /> {/* query={query} currentPage={currentPage} */}
				</Suspense>
			</div>
		</div>
	);
}
