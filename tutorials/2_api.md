# api 튜토리얼

## api 관리

해당 프로젝트에서는 가능한 한 RESTful 원칙에 맞는 api 를 설계하고자 합니다. 기본적으로 api 는 다음과 같은 형식을 같습니다.


```
(GET) {HOST}/memos/

memo 테이블의 데이터를 여러개 가져옵니다(List Data)

(GET) {HOST}/memos/:id

memo 테이블의 특정 데이터 하나(by id)를 가져옵니다. 

(POST) {HOST}/momos/
memo 테이블에 데이터를 생성합니다.

(PUT) {HOST}/memos/
memo 테이블의 데이터를 여러개 수정합니다.

(PATH) {HOST}/memos/:id
memo 테이블의 데이터 하나(by id)를 수정합니다.

(DELETE) {HOST}/memos/:id
memo 테이블의 데이터 하나(by id)를 삭제합니다.
```


API 를 만드는 간단한 예시로 List 와 Create 기능을 만들어보도록 하겠습니다. 먼저 `src/models/schema.ts` 파일에 api 에 사용될 parameter 를 정의해주세요.

```ts
// src/models/Memo/schema.ts

... (모델 스키마)

export const getInvoiceOptionSchema = getOptionSchema.extend({
}).partial();
export const listInvoiceOptionSchema = listOptionSchema.extend({
  ...getInvoiceOptionSchema.shape,
}).partial();


TG.add(tgKey, "GetInvoiceOptionT", getInvoiceOptionSchema);
TG.add(tgKey, "ListInvoiceOptionT", listInvoiceOptionSchema);

```

이후 해당 옵션에 맞는 타입을 생성해주세요.

```
pnpm gentype
```

`src/types/Memo.ts` 파일이 업데이트 된 것을 확인할 수 있습니다.


<br/>

이후 API 에 사용될 parameter 의 타입을 `types/Memo.api.ts` 에 정의해주세요. 해당 파일은 프론트엔드에 전달되어 타입을 강제하는 명세서의 역할로 사용됩니다.

```ts
// types/Memo.api.ts

import { MemoT, MemoFormT, ListMemoOptionT } from "./Memo";

// (GET) /
export type ListRqs = ListMemoOptionT
export type ListRsp = ListData<MemoT>;

// (POST) /
export type CreateRqs = { form: MemoFormT }
export type CreateRsp = MemoT
```

다음은 NestJS 의 Controller 와 DTO 를 정의해주세요. NestJS 에서 API 를 만드는 Convention 이 익숙하지 않다면 [다음 문서](https://docs.nestjs.com/)를 참조해주세요.

```ts
// apis/Memo/dto.ts

import { createZodDto } from "nestjs-zod";
import { z } from "nestjs-zod/z";
import { memoFormSchema, listMemoOptionSchema } from "@/models/Memo";
// import { } from "@/types/_";

// create
export class CreateMemoDto extends createZodDto(z.object({ form: memoFormSchema }))

// list
export class ListMemoDto extends createZodDto(listInvoiceOptionSchema) {}
```

다음은 Controller 를 정의해주세요.

```ts
// apis/Memo/controller.ts

import {
  Controller, Post, Get,
  Body, Param, Query,
} from "@nestjs/common";
import {
  ListMemoDto,
  CreateMemoDto,
} from "./dtos";
import type * as R from "@/types/Memo.api";
import { MemoService } from "./service";


@Controller("memos")
export class MemoController {
  constructor(private readonly service: MemoService) {}

  @Get("/")
  async list(
    @Query() query: ListMemoDto,
  ): Promise<R.ListRsp> {
    const listOpt = query satisfies R.ListRqs;
    return await this.service.list(listOpt);
  }

  @Post('/')
  async create(
    @Body() body: CreateMemoDto,
  ): Promise<R.CreateRsp> {
    const { form } = body satisfies R.CreateRqs;
    return await this.service.create(form);
  }
}
```

이후 해당 서비스에 해당하는 로직(list, create 등) 을 `service.ts`에 정의해주면 api 가 완성됩니다. 이 부분에서 `service.ts` 에 들어가는 로직 코드는 실제 로직들을 간단히 작성해보겠습니다.

```ts
// apis/Memo/service.ts

import { Injectable } from "@nestjs/common";
import * as err from "@/errors";
import { memoM } from "@/models/Memo";
import { MemoT, MemoFormT, ListMemoOptionT } from "@/types";

@Injectable()
export class MemoService {
  constructor() {}

  async create(form: MemoFormT): Promise<InvoiceT> {
    const created = await memoM.create(form);
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

  async list(listOpt: ListMemoOptionT): Promise<ListData<MemoT>> {
    const fetched = await memoM.findMany({});
    return { data: [], nextCursor: null };
  }
}
```

이후 `module.ts` 파일을 작성해주세요.

```ts
import { Module } from "@nestjs/common";
import { MemoController } from "./controller";
import { MemoService } from "./service";

@Module({
  controllers: [MemoController],
  providers: [MemoService],
})
export class MemoModule {}
```

이후 `src/apis/app.module.ts` 파일에 해당 `module.ts` 파일을 임포트해서 추가해주면 정의한 api 를 서비스에서 사용할 수 있습니다.

위 내용에서 중요한 부분은 다음과 같으므로 꼭 참고해주세요.


> 1. types 에 정의된 파일들은 frontend 에 전달되어 사용된다. 모델은 pnpm gentype 커맨드로, api 타입은 직접 작성해주어야 한다. 
> 2. types/memo.api.ts 등의 api 타입 파일들은 controller 파일에서 임포트 되어서 satisfies 키워드로 일치시켜준다. 타입 미스매치를 미연에 방지할 수 있다.
> 3. list, get 등의 키워드에서 사용되는 option (parameter)는 반복되어 사용됨으로 model.ts 에 정의하여 사용한다.


