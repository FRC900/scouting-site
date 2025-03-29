import { NextResponse } from "next/server";
import { db } from "@vercel/postgres";
import { standforms } from "../../../lib/data-importing";

async function seedStandForms(client: any) {
  try {
    const insertedStandForms = await Promise.all(
      standforms.map((form) => {
        // slot conversion
        let alliance;
        if (form.slot.slice(0, 1) == "r") {
          alliance == "Red";
        } else {
          alliance == "Blue";
        }
        const slot = alliance + " " + form.slot.slice(1, 2);

        // starting zone conversion
        let startingzone = false;
        if (form.startingzone === 1) {
          startingzone = true;
        }

        // endgame conversion
        let endgame;
        if (form.endgame === "bp" || form.endgame === "ba") {
          endgame = "Parked";
        } else if (form.endgame === "bs") {
          endgame = "Shallow";
        } else if (form.endgame === "bd") {
          endgame = "Deep";
        } else {
          endgame = "Nothing";
        }

        // status conversion
        let status;
        if (form.noshow === 1) {
          status = "0";
        } else if (form.died === 1) {
          status = "2";
        } else {
          status = "4";
        } 

        // create date
        const date = new Date().toISOString().split(".")[0];

        client.sql`
          INSERT INTO standforms (match, slot, team, username, preloaded, startingzone, autol1, autol2, autol3, autol4, teleopl1, teleopl2, teleopl3, teleopl4, teleopprocessor, teleopnet, endgame, defence, status, fouls, techfouls, notes, date)
			    VALUES (${form.match}, ${slot}, ${form.team}, ${form.username}, true, ${startingzone}, ${form.autol1}, ${form.autol2}, ${form.autol3}, ${form.autol4}, ${form.teleopl1}, ${form.teleopl2}, ${form.teleopl3}, ${form.teleopl4}, ${form.teleopprocessor}, ${form.teleopnet}, ${endgame}, 0, ${status}, ${form.fouls}, ${form.techfouls}, ${form.notes}, ${date})
        `;
      })
    );

    return {
      standforms: insertedStandForms,
    };
  } catch (error) {
    console.error("Error seeding users:", error);
    throw error;
  }
}

async function main() {
  const client = await db.connect();

  seedStandForms(client);
}

// avoid error?
export async function GET(request: Request) {
  await main().catch((err) => {
    console.error(
      "An error occured while attempting to seed the stand forms",
      err
    );
  });

  NextResponse.redirect(new URL("/", request.url));
}
