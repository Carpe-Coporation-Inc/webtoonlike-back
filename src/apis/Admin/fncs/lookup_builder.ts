import { adminM, AdminSqls } from "@/models/Admin";

import type { GetAdminOptionT } from "@/types/Admin";

export function lookupBuilder(select: any[], opt: GetAdminOptionT) {
  const sqls = new AdminSqls(adminM.table);

  if (opt.$user) {
    select.push(sqls.user());
  }

}