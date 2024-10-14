import { StandForm } from "./definitions";
import { sql } from "@vercel/postgres";

export async function fetchStandForms() {

  try {
    console.log('Fetching stand form data...');
    await new Promise((resolve) => setTimeout(resolve, 3000));

    const data = await sql<StandForm>`SELECT * FROM standforms`;

    console.log('Data fetch completed after 3 seconds.');

    return data.rows;
  } catch (error) {
    console.error('Database Error:', error);
    throw new Error('Failed to fetch stand form data');
  }
}