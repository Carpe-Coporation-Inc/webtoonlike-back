import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { countryEnum } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


const userTypeEnum = z.enum(["creator", "buyer"]);


const userFormZ = {
  sub: z.string().min(1).max(255),
  email: z.string().email(),
  fullName: z.string(),
  phone: z.string(),
  userType: userTypeEnum,
  country: countryEnum.nullable(),
  postCode: z.string().nullable(),
  address: z.string().nullable(),
  addressDetail: z.string().nullable(),

};

export const userFormSchema = insertFormSchema.extend(userFormZ);
export const userSchema = baseModelSchema.extend(userFormZ);

export const getUserOptionSchema = getOptionSchema.extend({
  $buyer: z.coerce.boolean(),
  $creator: z.coerce.boolean(),
}).partial();
export const listUserOptionSchema = listOptionSchema.extend({
  ...getUserOptionSchema.shape,
  userType: userTypeEnum,
}).partial();


const tgKey = "User";

TG.add(tgKey, "UserTypeT", userTypeEnum);

TG.add(tgKey, "UserFormT", userFormSchema);
TG.add(tgKey, "_UserT", userSchema, { private: true });

TG.add(tgKey, "GetUserOptionT", getUserOptionSchema);
TG.add(tgKey, "ListUserOptionT", listUserOptionSchema);


