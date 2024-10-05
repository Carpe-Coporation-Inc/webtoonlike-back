
import type { BidRoundT } from "@/types/BidRound";
import * as err from "@/errors";

export function checkBidRoundValidity(round: BidRoundT): BidRoundT {
  const now = new Date();
  const status = round.status;

  // idle -> all date should be null
  if (status == "idle") {
    round.bidStartAt = null;
    round.negoStartAt = null;
    return round;
  }

  if (!round.bidStartAt || !round.negoStartAt) {
    throw new err.ForbiddenE("bidStartAt and negoStartAt must be set with status other than idle");
  }

  const bidStartAt = new Date(round.bidStartAt);
  const negoStartAt = new Date(round.negoStartAt);
  if (bidStartAt > negoStartAt) {
    throw new err.InvalidDataE("bidStartAt must be before negoStartAt");
  }
  if (status == "waiting") {
    if (!(bidStartAt > now)) {
      throw new err.InvalidDataE("bidStartAt must be after now");
    }
  }
  if (status === "bidding") {
    if (!(bidStartAt < now && now < negoStartAt)) {
      throw new err.InvalidDataE("bidStartAt < now < negoStartAt must be satisfied");
    }
  }
  if (status === "negotiating") {
    if (!(negoStartAt < now)) {
      throw new err.InvalidDataE("negoStartAt must be before now");
    }
  }
  if (status === "done") {
    if (!(negoStartAt < now)) {
      throw new err.InvalidDataE("negoStartAt must be before now");
    }
  }
  return round;
}