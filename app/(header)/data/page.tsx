import { unstable_cache } from "next/cache";
import calculateSimpleTeamData from "../../../lib/analysis/data";
import { Monstrosity } from "../../../lib/definitions";
import DataTabs from "../../../components/Data/data";
import { Suspense } from "react";

export const dynamic = 'force-dynamic'

const teamOne = unstable_cache(
  async () => {
    return await calculateSimpleTeamData(1);
  },
  ["stand"],
  { revalidate: 3600, tags: ["stand"] }
);

const teamTwo = unstable_cache(
  async () => {
    return await calculateSimpleTeamData(2);
  },
  ["stand"],
  { revalidate: 3600, tags: ["stand"] }
);

const compileData = async () => {
  let dataTwo: Monstrosity[] = [];

  const before = Date.now();
  const data = await teamOne();
  const after = Date.now();
  const totalTime = (after - before) / 1000;

  console.log(totalTime);

  if (totalTime < 1) {
    dataTwo = await teamTwo();
  }

  return { data, dataTwo };
};

export default async function Page() {
  const monstrosity = [];

  const { data, dataTwo } = await compileData();  
  monstrosity.push(...data, ...dataTwo);
  const cached = (dataTwo.length > 0);

  return (
    <Suspense fallback={<p>Loading Tabs...</p>}>
      <DataTabs teamData={monstrosity} cached={cached} />
    </Suspense>
  );
}
