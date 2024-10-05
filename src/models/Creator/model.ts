import { DataModel } from "@/utils/orm";
import type { CreatorFormT, CreatorT } from "@/types/Creator";


const table = "creators";
export const creatorM = new DataModel<CreatorFormT, CreatorT>(table);

