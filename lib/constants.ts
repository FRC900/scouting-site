import { z } from "zod";
import { StandForm } from "./definitions";

export const tbaEventKey = "2024nccmp";

export const StandFormSchema = z.object({
  match: z.number(),
	slot: z.enum(["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]),
	team: z.number(),
	username: z.string(),
	startingZone: z.boolean(),
	autoSpeakerScored: z.number(),
	autoSpeakerMissed: z.number(),
	autoAmpScored: z.number(),
	autoAmpMissed: z.number(),
	teleopSpeakerScored: z.number(),
	teleopSpeakerMissed: z.number(),
	teleopAmpScored: z.number(),
	teleopAmpMissed: z.number(),
	teleopTrapScored: z.number(),
	teleopTrapMissed: z.number(),
	endgame: z.string(),
	defence: z.string(),
	status: z.string(),
	fouls: z.number(),
	techfouls: z.number(),
	notes: z.string(),
  date: z.string(),
});

export const defaultValues: Partial<StandForm> = {
  match: undefined,
  slot: "Red 1",
  team: undefined,
  username: undefined,
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
  date: undefined,
}