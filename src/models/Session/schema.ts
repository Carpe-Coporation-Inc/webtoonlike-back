// sessions/schema.ts
import { z } from "zod";
import { baseModelSchema, insertFormSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";

// Define the session form fields
const sessionFormZ = {
  jti: z.string().uuid(),
  userId: z.number().int(),
  expires: z.date(),
  revoked: z.boolean().default(false),
};

// Define the session form schema for inserting new sessions
export const sessionFormSchema = insertFormSchema.extend(sessionFormZ);

// Define the complete session schema including base model fields
export const sessionSchema = baseModelSchema.extend(sessionFormZ);

// Generate TypeScript types from schemas
export type SessionFormT = z.infer<typeof sessionFormSchema>;
export type SessionT = z.infer<typeof sessionSchema>;

// Add types to the type generator
const tgKey = "Sessions";

TG.add(tgKey, "SessionFormT", sessionFormSchema);
TG.add(tgKey, "SessionT", sessionSchema, { private: true });