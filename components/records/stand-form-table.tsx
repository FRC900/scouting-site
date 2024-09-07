import { fetchFilteredStandForms } from "@/lib/data"


export default async function StandFormTable(
//   {
//   query,
//   currentPage,
// }: {
//   query: string;
//   currentPage: number;
// }
) {
  // const forms = await fetchFilteredStandForms(query, currentPage);

  return(
    <div className="mt-6 flow-root">
      <div className="inline-block min-w-full align-middle">
        <div className="rounded-lg bg-gray-50 md:pt-0">
          {/* <div className="md:hidden">
            {forms?.map((form) => (
              <div key={form.id} className="mb-2 w-full rounded-md bg-white p-4">
                <p>test</p>
              </div>
            ))}
          </div> */}
          <table className="hidden min-w-full text-slate-200 md:table">
            <thead className="rounded-lg text-left text-sm font-normal">
              <tr>
                <th scope="col" className="px-4 py-5 font-medium">
                  Match
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Team
                </th>
                <th scope="col" className="px-4 py-5 font-medium">
                  Scouter
                </th>
              </tr>
            </thead>
            <tbody className="bg-white">
              {}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}