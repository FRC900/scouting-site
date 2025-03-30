import { z } from "zod";

export const tbaEventKey = "2025ncpem";
export const year = 2025;

export const StandFormSchema = z.object({
  match: z.number().min(1),
  slot: z.string(),
  username: z.string(),
  preloaded: z.boolean(),
  startingZone: z.boolean(),
  autoL1: z.number().min(0),
  autoL2: z.number().min(0),
  autoL3: z.number().min(0),
  autoL4: z.number().min(0),
  teleopL1: z.number().min(0),
  teleopL2: z.number().min(0),
  teleopL3: z.number().min(0),
  teleopL4: z.number().min(0),
  teleopProcessor: z.number().min(0),
  teleopNet: z.number().min(0),
  fouls: z.number().min(0),
  techfouls: z.number().min(0),
  endgame: z.string(),
  defence: z.string(),
  status: z.string(),
  notes: z.string(),
});

export const StandFormDatabaseSchema = z.object({
  match: z.number().min(1),
  slot: z.enum(["Red 1", "Red 2", "Red 3", "Blue 1", "Blue 2", "Blue 3"]),
  team: z.number(),
  username: z.string(),
  preloaded: z.boolean(),
  startingZone: z.boolean(),
  autoL1: z.number().min(0),
  autoL2: z.number().min(0),
  autoL3: z.number().min(0),
  autoL4: z.number().min(0),
  teleopL1: z.number().min(0),
  teleopL2: z.number().min(0),
  teleopL3: z.number().min(0),
  teleopL4: z.number().min(0),
  teleopProcessor: z.number().min(0),
  teleopNet: z.number().min(0),
  fouls: z.number().min(0),
  techfouls: z.number().min(0),
  endgame: z.enum(["Nothing", "Parked", "Shallow", "Deep"]),
  defence: z.enum(["0", "1", "2", "3", "4", "5"]),
  status: z.enum(["0", "1", "2", "3", "4", "5"]),
  notes: z.string(),
  date: z.string(),
});

export const PitFormSchema = z.object({
  team: z.number(),
  drive: z.string(),
  weight: z.number(),
  preferredscoring: z.string(),
  electrical: z.string(),
  connection: z.array(z.enum(["tape", "solder", "crimp", "pinch", "other"])),
  bumpers: z.string(),
  reversible: z.boolean(),
  bumpernotes: z.string(),
  notes: z.string(),
});

export const PitFormDatabaseSchema = z.object({
  team: z.number(),
  drive: z.string(),
  weight: z.number(),
  preferredscoring: z.string(),
  electrical: z.string(),
  connection: z.array(z.enum(["tape", "solder", "crimp", "pinch", "other"])),
  bumpers: z.string(),
  reversible: z.boolean(),
  bumpernotes: z.string(),
  notes: z.string(),
  date: z.string(),
});

export const LoginFormSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

export const RegisterFormSchema = z
  .object({
    name: z.string().min(2, "Name must be at least 2 characters."),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be 8 characters long"),
    confirm: z.string(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
