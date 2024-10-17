import { StandRecordRow } from "../components/Tables/stand-form-table";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { PitRecordRow } from "../components/Tables/pit-form-table";

export async function fetchStandForms() {
  noStore();

  try {
    const data = await sql<StandRecordRow>`SELECT (match, team, username, date) FROM standforms`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stand form data');
  }
}

export async function fetchPitForms() {
  noStore();

  try{
    const data = await sql<PitRecordRow>`SELECT (team, date) FROM pitforms`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pit form data');
  }
}