import { z } from "zod";

export const tbaEventKey = "2025nccmp";
export const year = 2025;

export const startingEPAs = [
  {
    team: 587,
    EPA: 51.9,
  },
  {
    team: 900,
    EPA: 50.5,
  },
  {
    team: 1533,
    EPA: 38.2,
  },
  {
    team: 2059,
    EPA: 42,
  },
  {
    team: 2640,
    EPA: 26.9,
  },
  {
    team: 2642,
    EPA: 27.4,
  },
  {
    team: 2724,
    EPA: 29.3,
  },
  {
    team: 3229,
    EPA: 22.9,
  },
  {
    team: 3459,
    EPA: 19.6,
  },
  {
    team: 3506,
    EPA: 31.7,
  },
  {
    team: 3737,
    EPA: 28.3,
  },
  {
    team: 3822,
    EPA: 18.3,
  },
  {
    team: 4534,
    EPA: 44.6,
  },
  {
    team: 4561,
    EPA: 41.4,
  },
  {
    team: 4795,
    EPA: 48,
  },
  {
    team: 4828,
    EPA: 28.2,
  },
  {
    team: 4829,
    EPA: 24.2,
  },
  {
    team: 5190,
    EPA: 11.8,
  },
  {
    team: 5511,
    EPA: 16.8,
  },
  {
    team: 5727,
    EPA: 39.1,
  },
  {
    team: 6500,
    EPA: 37.6,
  },
  {
    team: 6502,
    EPA: 37.5,
  },
  {
    team: 6639,
    EPA: 27.2,
  },
  {
    team: 6729,
    EPA: 23.4,
  },
  {
    team: 6894,
    EPA: 35.2,
  },
  {
    team: 7443,
    EPA: 15.5,
  },
  {
    team: 7763,
    EPA: 29.9,
  },
  {
    team: 8429,
    EPA: 38.2,
  },
  {
    team: 8727,
    EPA: 42.9,
  },
  {
    team: 8738,
    EPA: 49.1,
  },
  {
    team: 8746,
    EPA: 22.1,
  },
  {
    team: 9008,
    EPA: 35.1,
  },
  {
    team: 9032,
    EPA: 34,
  },
  {
    team: 9198,
    EPA: 19.8,
  },
  {
    team: 9297,
    EPA: 37,
  },
  {
    team: 9298,
    EPA: 16.6,
  },
  {
    team: 9496,
    EPA: 82.1,
  },
  {
    team: 10077,
    EPA: 26.9,
  },
  {
    team: 10260,
    EPA: 15.9,
  },
  {
    team: 10583,
    EPA: 20.5,
  },
];

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

export const QualitativeFormSchema = z.object({
  match: z.number(),
  alliance: z.string(),
  team: z.array(
    z.object({
      notes: z.string(),
      defence: z.string(),
      defencenotes: z.string(),
      status: z.string(),
      hpnotes: z.string(),
    })
  ),
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
