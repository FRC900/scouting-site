import { TeamField, StandForm } from "./definitions";
import { unstable_noStore as noStore } from "next/cache";
import { sql } from "@vercel/postgres";


export async function fetchScoutingForms() {
  noStore();

  try {

    const data = await sql<StandForm>`
      
    `

  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch Scouting Forms.');
  }
}