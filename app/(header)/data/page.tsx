import { unstable_cache } from "next/cache";
import calculateSimpleTeamData from "../../../lib/analysis/data";
import { Monstrosity } from "../../../lib/definitions";
import DataTabs from "../../../components/Data/data";
import { Suspense } from "react";
import { Button, Text } from "@mantine/core";
import Link from "next/link";

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
  let monstrosity: Monstrosity[] = [];
  let cached = false;

  const before = Date.now();

  const data = await teamOne();
  monstrosity.push(...data);

  const after = Date.now();

  const totalTime = (after - before) / 1000;

  if (totalTime < 0.1) {
    const dataTwo = await teamTwo();
    monstrosity.push(...dataTwo);
    cached = true;
  }

  return { monstrosity, cached };
};

export default async function Page() {
  const { monstrosity, cached } = await compileData();

  console.log(cached);

  return (
    <Suspense fallback={<p>Loading Tabs...</p>}>
      {cached ? null : (
        <Text size="lg">Please referesh to load more teams.</Text>
      )}
      <DataTabs teamData={monstrosity} />
    </Suspense>
  );
}
