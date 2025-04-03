import { z } from "zod";

export const tbaEventKey = "2025ncpem";
export const year = 2025;

export const startingEPAs = [
  {
    team: 2059,
    EPA: 40.7,
  },
  {
    team: 4534,
    EPA: 39.7,
  },
  {
    team: 900,
    EPA: 38.8,
  },
  {
    team: 6894,
    EPA: 36.2,
  },
  {
    team: 9032,
    EPA: 32.3,
  },
  {
    team: 9297,
    EPA: 29.4,
  },
  {
    team: 3822,
    EPA: 22.1,
  },
  {
    team: 10077,
    EPA: 22,
  },
  {
    team: 2640,
    EPA: 21.3,
  },
  {
    team: 8205,
    EPA: 18.9,
  },
  {
    team: 9296,
    EPA: 18.8,
  },
  {
    team: 10583,
    EPA: 18.1,
  },
  {
    team: 8757,
    EPA: 17.3,
  },
  {
    team: 9198,
    EPA: 16.2,
  },
  {
    team: 10302,
    EPA: 15.8,
  },
  {
    team: 8304,
    EPA: 15.7,
  },
  {
    team: 6512,
    EPA: 15.4,
  },
  {
    team: 7443,
    EPA: 15.1,
  },
  {
    team: 6729,
    EPA: 14.9,
  },
  {
    team: 10260,
    EPA: 14.4,
  },
  {
    team: 10248,
    EPA: 12.8,
  },
  {
    team: 10121,
    EPA: 11.5,
  },
  {
    team: 9042,
    EPA: 11,
  },
  {
    team: 5607,
    EPA: 11,
  },
  {
    team: 435,
    EPA: 10.5,
  },
  {
    team: 9724,
    EPA: 10.1,
  },
  {
    team: 5518,
    EPA: 8.8,
  },
  {
    team: 3349,
    EPA: 8.7,
  },
  {
    team: 4816,
    EPA: 8.4,
  },
  {
    team: 9788,
    EPA: 6.8,
  },
];
//   "2059": 40.7,
//   "4534": 39.7,
//   "900": 38.8,
//   "6894": 36.2,
//   "9032": 32.3,
//   "9297": 29.4,
//   "3822": 22.1,
//   "10077": 22,
//   "2640": 21.3,
//   "8205": 18.9,
//   "9296": 18.8,
//   "10583": 18.1,
//   "8757": 17.3,
//   "9198": 16.2,
//   "10302": 15.8,
//   "8304": 15.7,
//   "6512": 15.4,
//   "7443": 15.1,
//   "6729": 14.9,
//   "10260": 14.4,
//   "10248": 12.8,
//   "10121": 11.5,
//   "9042": 11,
//   "5607": 11,
//   "435": 10.5,
//   "9724": 10.1,
//   "5518": 8.8,
//   "3349": 8.7,
//   "4816": 8.4,
//   "9788": 6.8,

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
