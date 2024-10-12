import { z } from "zod";
import { StandForm } from "./definitions";

export const tbaEventKey = "2024nccmp";

export const StandFormSchemaOLD = z.object({
  match: z.number().min(1),
	slot: z.string(),
	// team: z.number(),
	// username: z.string(),
  preloaded: z.boolean(),
	startingZone: z.boolean(),
	autoSpeakerScored: z.number().min(0),
	autoSpeakerMissed: z.number().min(0),
	autoAmpScored: z.number().min(0),
	autoAmpMissed: z.number().min(0),
  teleopAmplifiedSpeakerScored: z.number().min(0),
	teleopSpeakerScored: z.number().min(0),
	teleopSpeakerMissed: z.number().min(0),
	teleopAmpScored: z.number().min(0),
	teleopAmpMissed: z.number().min(0),
	teleopTrapScored: z.number().min(0),
	teleopTrapMissed: z.number().min(0),
  fouls: z.number().min(0),
	techfouls: z.number().min(0),
	endgame: z.string(),
	defence: z.string(),
	status: z.string(),
	notes: z.string(),
});

export const standDefaultValues: Partial<StandForm> = {
  
}

export const StandFormSchema = z.object({
  match: z.number(),
  slot: z.string(),
  preloaded: z.boolean(),
  startingZone: z.boolean(),
  autoSpeakerScored: z.number().min(0),
  autoSpeakerMissed: z.number().min(0),
  teleopAmplifiedSpeakerScored: z.number().min(0),
  teleopSpeakerScored: z.number().min(0),
  teleopSpeakerMissed: z.number().min(0),
  teleopAmpScored: z.number().min(0),
  teleopAmpMissed: z.number().min(0),
  teleopTrapScored: z.number().min(0),
  teleopTrapMissed: z.number().min(0),
  fouls: z.number().min(0),
  techfouls: z.number().min(0),
  endgame: z.string(),
  defence: z.string(),
  status: z.string(),
  notes: z.string()
})

export const PitFormSchema = z.object({
  team: z.number(),
  drive: z.string(),
  weight: z.number(),
  preferredScoring: z.string(),
  electrical: z.string(),
  bumpers: z.string(),
  notes: z.string(),
})

export const PitFormDatabaseSchema = z.object({
	team: z.number(),
  drive: z.enum(['swerve', 'tank', 'mecanum']),
  weight: z.number(),
  preferredScoring: z.enum(['speaker', 'amp']),
  electrical: z.enum(['1', '2', '3', '4', '5']),
  bumpers: z.enum(['1', '2', '3']),
  notes: z.string(),
	date: z.string(),
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