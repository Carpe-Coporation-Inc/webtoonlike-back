import { knex } from "@/global/db";

export async function listUsersStat() {
  const currentDate = new Date();
  const lastMonthDate = new Date();
  lastMonthDate.setMonth(currentDate.getMonth() - 1);

  const users = await knex.from("users").select("*");
  const newUsers = await knex
    .from("users")
    .select("*")
    .from("webtoons")
    .where("createdAt", ">=", lastMonthDate)
    .andWhere("createdAt", "<=", currentDate);

  const newWebtoons = await knex
    .from("webtoons")
    .select("*")
    .where("createdAt", ">=", lastMonthDate)
    .andWhere("createdAt", "<=", currentDate);

  const newBidRequests = await knex
    .from("bid_requests")
    .select("*")
    .where("createdAt", ">=", lastMonthDate)
    .andWhere("createdAt", "<=", currentDate);

  return {
    data: {
      totalUsers: users.length,
      newUsers: newUsers.length,
      newWebtoons: newWebtoons.length,
      newBidRequests: newBidRequests.length,
    },
  };
}
