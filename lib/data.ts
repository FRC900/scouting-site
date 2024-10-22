import { StandRecordRow } from "../components/Tables/stand-form-table";
import { sql } from "@vercel/postgres";
import { unstable_noStore as noStore } from "next/cache";
import { PitRecordRow } from "../components/Tables/pit-form-table";
import { PitFormDatabase } from "./definitions";

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
    const data = await sql<PitRecordRow>`SELECT (id, team, date) FROM pitforms`;
    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pit form data');
  }
}

export async function fetchPitFormById(id: string) {
  noStore();

  console.log(id)

  try {
    const data = await sql<PitFormDatabase>`
      SELECT * FROM pitforms WHERE pitforms.id = ${id};
    `;

    const form = data.rows.map((form) => ({
      ...form,
    }));

    console.log(form[0]);

    return form[0];
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch pit form.');
  }

}