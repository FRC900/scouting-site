import { sql } from '@vercel/postgres';
import { NextResponse } from 'next/server';
 
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const matchNumber = searchParams.get('matchNumber');
  const teamNumber = searchParams.get('teamNumber');
 
  try {
    if (!matchNumber || !teamNumber) throw new Error('Match and team nubmers required');
    await sql`INSERT INTO Forms (number, name) VALUES (${matchNumber}, ${teamNumber});`;
  } catch (error) {
    return NextResponse.json({ error }, { status: 500 });
  }
 
  const pets = await sql`SELECT * FROM Forms;`;
  return NextResponse.json({ pets }, { status: 200 });
}