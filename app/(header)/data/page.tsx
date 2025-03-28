import { unstable_cache } from "next/cache";
import calculateSimpleTeamData from "../../../lib/analysis/data";
import { Monstrosity } from "../../../lib/definitions";
import DataTabs from "../../../components/Data/data";
import { Suspense } from "react";
import { GetServerSideProps, InferGetServerSidePropsType } from "next";

const teamOne = unstable_cache(
  async () => {
    return await calculateSimpleTeamData(1);
  },
  ["stand"],
  { revalidate: 3600, tags: ["stand"] }
);

export const teamTwo = unstable_cache(
  async () => {
    return await calculateSimpleTeamData(2);
  },
  ["stand"],
  { revalidate: 3600, tags: ["stand"] }
);

const compileData = async () => {
  let _cached = false;
  let dataTwo: Monstrosity[] = [];

  const before = Date.now();
  const data = await teamOne();
  const after = Date.now();
  const totalTime = (after - before) / 1000;

  console.log(totalTime);

  if (totalTime < 1) {
    dataTwo = await teamTwo();
    _cached = true;
  }

  return { data, _cached };
};

export const getServerSideProps = (async () => {
  const dataTwo = await teamTwo();

  return { props: { dataTwo } };
}) satisfies GetServerSideProps<{ dataTwo: Monstrosity[] }>;

export default async function Page({
  dataTwo,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const monstrosity = [];
  let cached: boolean;

  const { data, _cached } = await compileData();
  monstrosity.push(...data, ...dataTwo);
  cached = _cached;

  return (
    <Suspense fallback={<p>Loading Tabs...</p>}>
      <DataTabs teamData={monstrosity} cached={cached} />
    </Suspense>
  );
}
