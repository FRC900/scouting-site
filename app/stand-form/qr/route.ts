import { NextRequest, NextResponse } from "next/server";
import { createStandForm } from "../../../lib/actions";
import { StandForm } from "../../../lib/definitions";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;

  const match = searchParams.get("match");
  const slot = searchParams.get("slot");
  const preloaded = searchParams.get("preloaded");
  const startingZone = searchParams.get("startingzone");
  const autoL1 = searchParams.get("autol1");
  const autoL2 = searchParams.get("autol2");
  const autoL3 = searchParams.get("autol3");
  const autoL4 = searchParams.get("autol4");
  const teleopL1 = searchParams.get("teleopl1");
  const teleopL2 = searchParams.get("teleopl2");
  const teleopL3 = searchParams.get("teleopl3");
  const teleopL4 = searchParams.get("teleopl4");
  const teleopProcessor = searchParams.get("teleopprocessor");
  const teleopNet = searchParams.get("teleopnet");
  const fouls = searchParams.get("fouls");
  const techfouls = searchParams.get("techfouls");
  const endgame = searchParams.get("endgame");
  const defence = searchParams.get("defence");
  const status = searchParams.get("status");
  const notes = searchParams.get("notes");

  if (
    match &&
    slot &&
    preloaded &&
    startingZone &&
    autoL1 &&
    autoL2 &&
    autoL3 &&
    autoL4 &&
    teleopL1 &&
    teleopL2 &&
    teleopL3 &&
    teleopL4 &&
    teleopProcessor &&
    teleopNet &&
    fouls &&
    techfouls &&
    endgame &&
    defence &&
    status &&
    notes
  ) {

    let preloadedBool: boolean
    if (preloaded === 'true') {
      preloadedBool = true;
    } else {
      preloadedBool = false;
    }

    let startingZoneBool: boolean
    if (startingZone === 'true') {
      startingZoneBool = true;
    } else {
      startingZoneBool = false;
    }

    // const team = await findTeamNumber(+match, slot);

    const data: StandForm = {
      match: +match,
      slot: slot,
      // team: team,
      preloaded: preloadedBool,
      startingZone: startingZoneBool,
      autoL1: +autoL1,
      autoL2: +autoL2,
      autoL3: +autoL3,
      autoL4: +autoL4,
      teleopL1: +teleopL1,
      teleopL2: +teleopL2,
      teleopL3: +teleopL3,
      teleopL4: +teleopL4,
      teleopProcessor: +teleopProcessor,
      teleopNet: +teleopNet,
      fouls: +fouls,
      techfouls: +techfouls,
      endgame: endgame,
      defence: defence,
      status: status,
      notes: notes,
    };

    createStandForm(data).then(() => console.log("success, had enough information"));
  } else {
    console.log("failed, not enough information provided");
      console.log(match + slot + preloaded + startingZone + autoL1 + autoL2 + autoL3 + autoL4 + teleopL1 + teleopL2 + teleopL3 + teleopL4 + teleopProcessor + teleopNet + fouls + techfouls + endgame + defence + status + notes )
  }

  NextResponse.redirect(new URL('/data', request.url));
}


// http://localhost:3000/stand-form/qr?match=3&slot=Red%201&preloaded=true&startingzone=true&autol1=1&autol2=1&autol3=1&autol4=1&teleopl1=1&teleopl2=1&teleopl3=1&teleopl4=1&teleopprocessor=1&teleopnet=2&fouls=1&techfouls=1&endgame=Parked&defence=1&status=1&notes=qrtest