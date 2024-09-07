import { TeamField, StandForm } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@vercel/postgres";

const ITEMS_PER_PAGE = 20;
export async function fetchFilteredStandForms(
  query: string,
  currentPage: number,
) {
  noStore();

  const offset = (currentPage - 1) * ITEMS_PER_PAGE;

  try {

    const data = await sql<StandForm>`
      SELECT

    `;

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Scouting Forms.');
  }
}