
# Migration 튜토리얼


## DB 마이그레이션

DB는 postgres 위에 tootoon_prod/tootoon_dev(상용, 개발 서버 각각) 라는 이름의 데이터베이스 위에서 관리합니다. aws RDS 위에 배포되어있으며 모든 db 관련정보는 migrations 폴더에서 관리합니다.

해당 프로젝트에서는 특별한 orm 을 사용하지 않고 직접 query 를 작성하여 데이터를 관리합니다. 쿼리를 작성하기 위해 [knex](https://knexjs.org/guide/schema-builder.html#alter) 를 활용합니다.

해당 프로젝트에서 db 를 관리하는 절차를 소개하기 위해 간단한 테이블 (memo 테이블) 을 하나 만들어보도록 하겠습니다.

### 1. migration 적용하기

knex 를 활용한 migration 에 관한 자세한 내용은 [다음 링크](https://knexjs.org/guide/migrations.html)에서 확인하세요. 

테이블을 추가하기 위해서는 migration 을 추가해야 합니다. 새 migration 파일을 추가하기 위해서는 다음 명령어를 입력하세요.

```
pnpm mcreate create_memo
```

이후 migrations/ 디렉토리에 {timestamp}_create_memo.ts 라는 이름의 파일이 생긴것을 확인할 수 있습니다.

{timestamp}_create_memo.ts 파일을 열어 다음과 같이 정의해봅시다.

```ts
import { Knex } from "knex";

const table = "memos";

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(table, (t) => {
    t.increments("id").primary();
    t.datetime("createdAt").defaultTo(knex.fn.now());
    t.datetime("updatedAt");

    t.integer("userId").references("users.id").onDelete("SET NULL").onUpdate("CASCADE");
    t.text("content").notNullable();
  });
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(table);
}
```


이후 작성한 migration 파일을 적용하기 위해서는 다음 명령어를 입력합니다.
```
pnpm mup
```
적용한 migration 을 취소하고 싶으면 다음 명령어를 입력합니다.
```
pnpm mdown
```


migration 을 적용하면 **memos** 라는 이름의 테이블이 생성됩니다. memos 테이블을 개발 환경에서 조작하기 위해 다음 파일을 정의해봅시다.


`src/models/_template` 파일을 복사+붙여넣기 해서 `src/models/Memo` 파일을 정의해주세요. `src/models/Memo/schema.ts` 파일을 다음과 같이 정의해주세요.

```ts
// src/models/Memo/schema.ts

import { z } from "zod";
import { baseModelSchema, insertFormSchema, getOptionSchema, listOptionSchema } from "../$commons/schema";
import { TG } from "@/utils/type_generator";


export const memoFormSchema = insertFormSchema.extend({
  userId: z.number(),
  content: z.string(),
});

export const memoSchema = baseModelSchema.extend(memoFormSchema.shape);

// 타입 생성을 위새 정의하는 config
TG.add(tgKey, "MemoFormT", memoFormSchema);
TG.add(tgKey, "MemoT", memoSchema);
```

<br/>

스키마를 정의한 이후 정의한 해당 스키마를 기반으로 Type 을 생성할 수 있습니다. 다음 명령어를 입력해주세요.

```
pnpm gentype
```

명령어를 입력하면 `src/types/Memo.ts` 파일이 생성된 것을 볼 수 있습니다. 해당 파일에는 Typescript 에서 사용되는 Memo 라는 모델의 타입이 정의되어 있습니다.

<br/>
<br/>





이후 `src/models/Memo/model.ts` 파일을 다음과 같이 정의해주세요. model.ts 파일은 orm 에서 모델의 역할을 합니다.

```ts
// src/models/Memo/model.ts

import { DataModel } from "@/utils/orm";
import type { MemoFormT, MemoT } from "@/types/Model";


const table = "memos";
export const memoM = new DataModel<MemoFormT, MemoT>(table);
```

해당 작업을 마친 이후에는 모델을 프로젝트 내부에서 **Memo** 테이블을 ORM 에서 사용하듯이 사용할 수 있습니다.

```ts
import { memoM } from '@/models/Memo';

async test() {
  const created = await memoM.create({
    userId: 1,
    content: 'sample test',
  })
  // 생성된 메모가 출력됨
  console.log(created) 

  const fetched = await memoM.findOne({ id: 1 });
  // db 의 메모를 가져옴
  console.log(fetched)
}

test()
```

</br>
</br>
