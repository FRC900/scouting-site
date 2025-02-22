import { NextRequest, NextResponse } from "next/server";
import { createStandForm } from "../../../lib/actions";
import { StandForm } from "../../../lib/definitions";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const form = searchParams.get('form');

  const formArray = form?.split(",");

  if (formArray) console.log(formArray.length);

  if (
    formArray &&
    formArray.length === 21
  ) {

    let preloadedBool: boolean
    if (formArray[3] === 'true') {
      preloadedBool = true;
    } else {
      preloadedBool = false;
    }

    let startingZoneBool: boolean
    if (formArray[4] === 'true') {
      startingZoneBool = true;
    } else {
      startingZoneBool = false;
    }

    const data: StandForm = {
      match: +formArray[0],
      slot: formArray[1],
      username: formArray[2],
      preloaded: preloadedBool,
      startingZone: startingZoneBool,
      autoL1: +formArray[5],
      autoL2: +formArray[6],
      autoL3: +formArray[7],
      autoL4: +formArray[8],
      teleopL1: +formArray[9],
      teleopL2: +formArray[10],
      teleopL3: +formArray[11],
      teleopL4: +formArray[12],
      teleopProcessor: +formArray[13],
      teleopNet: +formArray[14],
      fouls: +formArray[15],
      techfouls: +formArray[16],
      endgame: formArray[17],
      defence: formArray[18],
      status: formArray[19],
      notes: formArray[20],
    };

    createStandForm(data).then(() => console.log("success, had enough information"));
    return NextResponse.redirect(new URL('/', request.url));
  } else {
    console.log("failed, wrong amount of info provided :(");
  }
}

// http://localhost:3000/api/qr?form=3,Red%201,name,true,true,1,1,1,1,1,1,1,1,1,1,1,1,Parked,1,1,qrtest