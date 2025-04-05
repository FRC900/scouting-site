import { unstable_cache } from "next/cache"
import epa from "../../../lib/analysis/epa"
import { Suspense } from "react";
import EpaTabs from "../../../components/Data/epa";

export const dyanimc = 'force-dynamic'

const teamEPAs = unstable_cache(
  async () => {
    return await epa();
  },
  ["stand"],
  { revalidate: 3600, tags: ["stand"] }
);

export default async function Page() {
  const data = await teamEPAs();

  console.log(data)

  return (
    <Suspense fallback={<p>Loading Tabs...</p>}>
      <EpaTabs data={data} />
    </Suspense>
  )
}