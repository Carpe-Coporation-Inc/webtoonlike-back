import { Injectable } from "@nestjs/common";
import { bidRequestMessageM } from "@/models/BidRequestMessage";
import { listBidRequestMessage } from "./fncs/list_bid_request_message";
import * as err from "@/errors";
import type {
  BidRequestMessageFormT, BidRequestMessageT, ListBidRequestMessageOptionT,
} from "@/types/BidRequestMessage";

@Injectable()
export class BidRequestMessageService {
  constructor() {}

  async create(form: BidRequestMessageFormT ): Promise<BidRequestMessageT> {
    const created = await bidRequestMessageM.create(form);
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

  async list(listOpt: ListBidRequestMessageOptionT): Promise<ListData<BidRequestMessageT>> {
    return await listBidRequestMessage(listOpt);
  }
}