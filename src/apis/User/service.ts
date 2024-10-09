import { Injectable } from "@nestjs/common";
import { userM } from "@/models/User";
import * as err from "@/errors";
import { lookupBuilder } from "./fncs/lookup_builder";
import { listUser } from "./fncs/list_user";
import type {
  UserFormT,
  UserT,
  GetUserOptionT,
  ListUserOptionT,
} from "@/types";
import { listUsersStat } from "./fncs/list_users_stat";

@Injectable()
export class UserService {
  constructor() {}

  async createMe(form: UserFormT): Promise<UserT> {
    const created = await userM.create(form);
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

  async getMe(id: idT, getOpt: GetUserOptionT): Promise<UserT> {
    return userM.findById(id, {
      builder: (qb, select) => {
        lookupBuilder(select, getOpt);
      },
    });
  }

  async list(opt: ListUserOptionT): Promise<ListData<UserT>> {
    return await listUser(opt);
  }
  async listStats() {
    return await listUsersStat();
  }

  async deleteMe(id: idT): Promise<UserT> {
    const deleted = await userM.deleteOne({ id });
    if (!deleted) {
      throw new err.NotAppliedE();
    }
    return deleted;
  }

  // async getMe(sub: string): Promise<UserT|null> {
  //   const user = await userM.findOne({ sub });
  //   return user;
  // }
}
