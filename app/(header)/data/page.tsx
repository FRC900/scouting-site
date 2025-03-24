import { unstable_cache } from "next/cache";
import calculateSimpleTeamData from "../../../lib/analysis/data";
import { Monstrosity } from "../../../lib/definitions";
import DataTabs from "../../../components/Data/data";
import { Suspense } from "react";

const teamOne = unstable_cache(
  async () => {
    const data: Monstrosity[] = await calculateSimpleTeamData(1);
    return { data, cachedtemp: true };
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

let cached = false;

const compileData = async (query: number) => {
  let monstrosity: Monstrosity[] = [];
  
  if (cached) {
    // console.log("calling cached")
    const { data } = await teamOne();
    const data2 = await teamTwo();
    monstrosity.push(...data, ...data2);
  } else {
    // console.log("not cached")
    const { data, cachedtemp } = await teamOne();
    cached = cachedtemp;
    monstrosity.push(...data);
  }

  return monstrosity;
};

export default async function Page(props: {
  searchParams?: Promise<{
    query?: string;
  }>;
}) {
  const searchParams = await props.searchParams;
  const query = Number(searchParams?.query) || 1;

  const monstrosity: Monstrosity[] = await compileData(query);

  return (
    <Suspense fallback={<p>Loading Tabs...</p>}>
      <DataTabs teamData={monstrosity} />
    </Suspense>
  );
}
