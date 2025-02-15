import { unstable_cache } from "next/cache";
import calculateSimpleTeamData from "../../lib/analysis/calculateSimpleTeamData";
import { SimpleTeamData } from "../../lib/definitions";
import DataTabs from "../../components/Data/data";
import { Suspense } from "react";

// export const dynamic = "force-dynamic";

const team = unstable_cache(
  async () => {
    return await calculateSimpleTeamData();
  },
  ["stand"],
  { revalidate: 3600, tags: ["stand"] }
);

export default async function Page() {
  const simpleTeamData: SimpleTeamData[] = await team();

  return (
    <Suspense fallback={<p>Loading Tabs...</p>}>
      <DataTabs data={simpleTeamData} />
    </Suspense>
  );
}
