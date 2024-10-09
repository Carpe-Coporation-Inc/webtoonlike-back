// sessions/model.ts
import { DataModel } from "@/utils/orm";
import { SessionFormT, SessionT } from "@/models/Session/schema";

const table = "sessions";
export const sessionM = new DataModel<SessionFormT, SessionT>(table);
