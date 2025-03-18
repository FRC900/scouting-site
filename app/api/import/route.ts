import { NextResponse } from "next/server";

// avoid error?
export async function GET(request: Request) {
  NextResponse.redirect(new URL("/", request.url));
}


// import { db } from "@vercel/postgres";
// import { standforms } from "../../../lib/data-importing";
// import capitalize from "../../../lib/capitalize";

// async function seedStandForms(client: any) {
//   try {
//     const insertedStandForms = await Promise.all(
//       standforms.map((form) => {
//         let preloaded = false
//         let startingzone = false
//         if (form.preloaded == "TRUE") {
//           preloaded = true
//         }
//         if (form.startingzone == "TRUE") {
//           startingzone = true
//         }

//         const endgame = capitalize(form.endgame)
//         const date = new Date().toISOString().split(".")[0];
        
//         client.sql`
//           INSERT INTO standforms (match, slot, team, username, preloaded, startingzone, autol1, autol2, autol3, autol4, teleopl1, teleopl2, teleopl3, teleopl4, teleopprocessor, teleopnet, endgame, defence, status, fouls, techfouls, notes, date)
// 			    VALUES (${form.match}, ${form.slot}, ${form.team}, ${form.username}, ${preloaded}, ${startingzone}, ${form.autol1}, ${form.autol2}, ${form.autol3}, ${form.autol4}, ${form.teleopl1}, ${form.teleopl2}, ${form.teleopl3}, ${form.teleopl4}, ${form.teleopprocessor}, ${form.teleopnet}, ${endgame}, ${form.defence}, ${form.status}, ${form.fouls}, ${form.techfouls}, ${form.notes}, ${date})
//         `
//       })
//     );

//     return {
//       standforms: insertedStandForms,
//     };
//   } catch (error) {
//     console.error('Error seeding users:', error);
//     throw error;
//   }
// }

// async function main() {
//   const client = await db.connect()

//   seedStandForms(client)
// }


// main().catch((err) => {
//   console.error(
//     'An error occured while attempting to seed the stand forms',
//     err
//   )
// })