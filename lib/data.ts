import { StandRecordRow } from "../components/Tables/stand-form-table";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";

export async function fetchStandForms() {

  noStore()

  try {
    const data = await sql<StandRecordRow>`SELECT (match, team, username, date) FROM standforms`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stand form data');
  }
}