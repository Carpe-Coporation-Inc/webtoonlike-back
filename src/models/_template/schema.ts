import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const _FormSchema = insertFormSchema.extend({});

export const _Schema = baseModelSchema.extend(_FormSchema.shape);

export const get_OptionSchema = getOptionSchema.extend({});
export const list_OptionSchema = get_OptionSchema.extend({});


const tgKey = "";

