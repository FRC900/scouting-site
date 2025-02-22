import { unstable_cache } from "next/cache";
import calculateSimpleTeamData from "../../../lib/analysis/data";
import { Monstrosity } from "../../../lib/definitions";
import DataTabs from "../../../components/Data/data";
import { Suspense } from "react";

const team = unstable_cache(
  async () => {
    return await calculateSimpleTeamData();
  },
  ["stand"],
  { revalidate: 3600, tags: ["stand"] }
);

export default async function Page() {
  const monstrosity: Monstrosity[] = await team();

  return (
    <Suspense fallback={<p>Loading Tabs...</p>}>
      <DataTabs teamData={monstrosity} />
    </Suspense>
  );
}
