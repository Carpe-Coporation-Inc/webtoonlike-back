import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


const adminFormZ = {
  userId: z.number().int().nullable(),
  isSuper: z.boolean().nullish(),
};

export const adminFormSchema = insertFormSchema.extend(adminFormZ);
export const adminSchema = baseModelSchema.extend(adminFormZ);

export const getAdminOptionSchema = getOptionSchema.extend({
  $user: z.coerce.boolean(),
}).partial();
export const listAdminOptionSchema = getAdminOptionSchema.extend({
}).partial();


const tgKey = "Admin";

TG.add(tgKey, "AdminFormT", adminFormSchema);
TG.add(tgKey, "_AdminT", adminSchema, { private: true });

TG.add(tgKey, "GetAdminOptionT", getAdminOptionSchema);
TG.add(tgKey, "ListAdminOptionT", listAdminOptionSchema);
