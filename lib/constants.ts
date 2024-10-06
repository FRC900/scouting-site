import { z } from "zod";
import { StandForm } from "./definitions";

export const tbaEventKey = "2024nccmp";

export const StandFormSchema = z.object({
  match: z.number().min(1),
	slot: z.enum(["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]),
	// team: z.number(),
	// username: z.string(),
	startingZone: z.boolean(),
	autoSpeakerScored: z.number().min(0),
	autoSpeakerMissed: z.number().min(0),
	autoAmpScored: z.number().min(0),
	autoAmpMissed: z.number().min(0),
	teleopSpeakerScored: z.number().min(0),
	teleopSpeakerMissed: z.number().min(0),
	teleopAmpScored: z.number().min(0),
	teleopAmpMissed: z.number().min(0),
	teleopTrapScored: z.number().min(0),
	teleopTrapMissed: z.number().min(0),
	endgame: z.string(),
	defence: z.string(),
	status: z.string(),
	fouls: z.number().min(0),
	techfouls: z.number().min(0),
	notes: z.string(),
});

export const standDefaultValues: Partial<StandForm> = {
  match: undefined,
  slot: undefined,
  // team: undefined,
  // username: undefined,
  startingZone: true,
  autoSpeakerScored: 0,
  autoSpeakerMissed: 0,
  teleopSpeakerScored: 0,
  teleopSpeakerMissed: 0,
  teleopAmpScored: 0,
  teleopAmpMissed: 0,
  teleopTrapScored: 0,
  teleopTrapMissed: 0,
  endgame: undefined,
  defence: undefined,
  status: undefined,
  fouls: 0,
  techfouls: 0,
  notes: '',
}

export const PitFormSchema = z.object({
  team: z.number(),
  drive: z.string(),
  weight: z.number(),
  preferredScoring: z.string(),
  electrical: z.string(),
  bumpers: z.string(),
  notes: z.string(),
})

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
})

export const RegisterFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be 8 characters long"),
  confirm: z.string()
}).refine((data) => data.password === data.confirm, {
  message: "Passwords do not match",
  path: ["confirmPassword"]
}) 