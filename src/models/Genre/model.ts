import { DataModel } from "@/utils/orm";
import type { GenreFormT, GenreT } from "@/types/Genre";


const table = "genres";
export const genreM = new DataModel<GenreFormT, GenreT>(table);


