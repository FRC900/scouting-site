"use server";

import { sql } from "@vercel/postgres";
import { LoginForm, PitForm, RegisterForm, StandForm } from "./definitions";
import {
  PitFormDatabaseSchema,
  RegisterFormSchema,
  StandFormDatabaseSchema,
} from "./constants";
import { signIn, signOut } from "../auth";
import { AuthError } from "next-auth";
import { revalidatePath, revalidateTag } from "next/cache";
import { redirect } from "next/navigation";
import findTeamNumber from "./fetchers/tba/findTeamNumber";
import bcrypt from "bcrypt";

const CreateStandForm = StandFormDatabaseSchema.omit({
  team: true,
  date: true,
});

export async function createStandForm(data: StandForm) {
  // parse and extract data from data prop
  const {
    match,
    slot,
    username,
    preloaded,
    startingZone,
    autoL1,
    autoL2,
    autoL3,
    autoL4,
    teleopL1,
    teleopL2,
    teleopL3,
    teleopL4,
    teleopProcessor,
    teleopNet,
    fouls,
    techfouls,
    endgame,
    defence,
    status,
    notes,
  } = CreateStandForm.parse({
    ...data,
  });

  const team = await findTeamNumber(match, slot);
  const date = new Date().toISOString().split(".")[0];

  try {
    await sql`
			INSERT INTO standforms (match, slot, team, username, preloaded, startingzone, autol1, autol2, autol3, autol4, teleopl1, teleopl2, teleopl3, teleopl4, teleopprocessor, teleopnet, endgame, defence, status, fouls, techfouls, notes, date)
			VALUES (${match}, ${slot}, ${team}, ${username}, ${preloaded}, ${startingZone}, ${autoL1}, ${autoL2}, ${autoL3}, ${autoL4}, ${teleopL1}, ${teleopL2}, ${teleopL3}, ${teleopL4}, ${teleopProcessor}, ${teleopNet}, ${endgame}, ${defence}, ${status}, ${fouls}, ${techfouls}, ${notes}, ${date})
		`;
  } catch (error) {
    return { message: "Database Error: Failed to Submit Pit Form." };
  }

  revalidatePath("/stand-form");
  revalidateTag("stand");
  revalidateTag(`${team}`);
  redirect("/stand-form");
}

const CreatePitForm = PitFormDatabaseSchema.omit({ date: true });

export async function createPitForm(data: PitForm) {
  const {
    team,
    drive,
    weight,
    preferredscoring,
    electrical,
    connection,
    bumpers,
    reversible,
    bumpernotes,
    notes,
  } = CreatePitForm.parse({
    ...data,
  });

  const connectors = connection
    .map((connector) => connector.toString())
    .join("|");
  const date = new Date().toISOString().split(".")[0];

  try {
    await sql`
			INSERT INTO pitforms (team, drive, weight, preferredscoring, electrical, connectors, bumpers, reversible, bumpernotes, notes, date)
			VALUES (${team}, ${drive}, ${weight}, ${preferredscoring}, ${electrical}, ${connectors}, ${bumpers}, ${reversible}, ${bumpernotes}, ${notes}, ${date})
		`;
  } catch (error) {
    console.log(error);
    return { message: "Database Error: Failed to Submit Pit Form." };
  }

  revalidatePath("/pit-form");
  revalidateTag("pit");
  revalidateTag(`${team}`);
  redirect("/pit-form");
}

export async function updatePitForm(data: PitForm, id: string) {
  const {
    team,
    drive,
    weight,
    preferredscoring,
    electrical,
    connection,
    bumpers,
    reversible,
    bumpernotes,
    notes,
  } = CreatePitForm.parse({
    ...data,
  });

  const connectors = connection
    .map((connector) => connector.toString())
    .join("|");
  const date = new Date().toISOString().split(".")[0];

  await sql`
		UPDATE pitforms
		SET team = ${team}, drive = ${drive}, weight = ${weight}, preferredscoring = ${preferredscoring}, electrical = ${electrical}, connectors = ${connectors}, bumpers = ${bumpers}, reversible = ${reversible}, bumpernotes = ${bumpernotes}, notes = ${notes}, date = ${date}
		WHERE id = ${id}
	`;

  revalidatePath("/records/pit-forms");
  revalidateTag("pit");
  revalidateTag(`${team}`);
  redirect("/records/pit-forms");
}

export async function updateStandForm(data: StandForm, id: string) {
  // parse and extract data from data prop
  const {
    match,
    slot,
    // team,
    preloaded,
    startingZone,
    autoL1,
    autoL2,
    autoL3,
    autoL4,
    teleopL1,
    teleopL2,
    teleopL3,
    teleopL4,
    teleopProcessor,
    teleopNet,
    fouls,
    techfouls,
    endgame,
    defence,
    status,
    notes,
  } = CreateStandForm.parse({
    ...data,
  });

  const team = await findTeamNumber(match, slot);
  const username = "temp";
  const date = new Date().toISOString().split(".")[0];

  await sql`
		UPDATE standforms
		SET match = ${match}, slot = ${slot}, team = ${team}, username = ${username}, preloaded = ${preloaded}, startingzone = ${startingZone}, autol1 = ${autoL1}, autol2 = ${autoL2}, autol3 = ${autoL3}, autol4 = ${autoL4}, teleopl1 = ${teleopL1}, teleopl2 = ${teleopL2}, teleopl3 = ${teleopL3}, teleopl4 = ${teleopL4}, teleopprocessor = ${teleopProcessor}, teleopnet = ${teleopNet}, endgame = ${endgame}, defence = ${defence}, status = ${status}, fouls = ${fouls}, techfouls = ${techfouls}, notes = ${notes}, date = ${date}
		WHERE id = ${id}
	`;

  revalidatePath("/records/stand-forms");
  revalidateTag("stand");
  revalidateTag(`${team}`);
  redirect("/records/stand-forms");
}

export async function deletePitForm(id: string) {
  await sql`DELETE FROM pitforms WHERE id = ${id}`;

  revalidatePath("/records/pit-forms");
  revalidateTag("pit");
  revalidateTag("delete");
  redirect("/records/pit-forms");
}

export async function deleteStandForm(id: string) {
  await sql`DELETE FROM standforms WHERE id = ${id}`;

  revalidatePath("/records/stand-forms");
  revalidateTag("stand");
  revalidateTag("delete");
  redirect("/records/stand-forms");
}

export async function register(data: RegisterForm) {
  // 2. Prepare data for insersion
  const { name, email, password, confirm } = RegisterFormSchema.parse({
    ...data,
  });

  if (password != confirm) return console.log("passwords do not match"); // add error message

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);
  const permission = "member";

  // 3. Insert user into the database
  try {
    await sql`
			INSERT INTO users (name, email, password, permission)
			VALUES (${name}, ${email}, ${hashedPassword}, ${permission})
		`;
  } catch (error) {
    return { message: "Error submitting user to database." };
  }

  // 4. Create user session
  await signIn("credentials", data);

  // 5. Redirect user
  redirect("/data");
}

export async function serverSignOut() {
  console.log("hi hello singout ello");
  await signOut({ redirectTo: "/" });
}

export async function authenticate(
  // prevState: string | undefined,
  formData: LoginForm
) {
  try {
    console.log("hello");
    await signIn("credentials", formData);
    redirect("/data");
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Invalid credentials.";
        default:
          return "Something went wrong.";
      }
    }
    throw error;
  }
}
