import { NextRequest, NextResponse } from "next/server";
import { createStandForm } from "../../../../lib/actions";
import { StandForm } from "../../../../lib/definitions";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const form = searchParams.get('form');

  const formArray = form?.split(",");

  if (formArray) console.log(formArray.length);

  if (
    formArray &&
    formArray.length === 20
  ) {

    let preloadedBool: boolean
    if (formArray[2] === 'true') {
      preloadedBool = true;
    } else {
      preloadedBool = false;
    }

    let startingZoneBool: boolean
    if (formArray[3] === 'true') {
      startingZoneBool = true;
    } else {
      startingZoneBool = false;
    }

    const data: StandForm = {
      match: +formArray[0],
      slot: formArray[1],
      preloaded: preloadedBool,
      startingZone: startingZoneBool,
      autoL1: +formArray[4],
      autoL2: +formArray[5],
      autoL3: +formArray[6],
      autoL4: +formArray[7],
      teleopL1: +formArray[8],
      teleopL2: +formArray[9],
      teleopL3: +formArray[10],
      teleopL4: +formArray[11],
      teleopProcessor: +formArray[12],
      teleopNet: +formArray[13],
      fouls: +formArray[14],
      techfouls: +formArray[15],
      endgame: formArray[16],
      defence: formArray[17],
      status: formArray[18],
      notes: formArray[19],
    };

    createStandForm(data).then(() => console.log("success, had enough information"));
    return NextResponse.redirect(new URL('/', request.url));
  } else {
    console.log("failed, wrong amount of info provided :(");
  }
}

// http://localhost:3000/stand-form/qr?form=3,Red%201,true,true,1,1,1,1,1,1,1,1,1,1,1,1,Parked,1,1,qrtest