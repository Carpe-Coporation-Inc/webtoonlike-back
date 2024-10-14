import { Injectable } from "@nestjs/common";
import { webtoonM } from "@/models/Webtoon";
import { createSignedUrl, putDevPrefix } from "@/utils/s3";
import * as mime from "mime-types";
import * as err from "@/errors";
import { listWebtoon } from "./fncs/list_webtoon";
import { lookupBuilder } from "./fncs/lookup_builder";
import { updateAggr, type WebtoonAggrOptionT } from "./fncs/update_aggr";
import type { WebtoonFormT, WebtoonT, GetWebtoonOptionT, ListWebtoonOptionT } from "@/types";
import { HomeItems } from "@/types/Webtoon.api";

@Injectable()
export class WebtoonService {
  constructor() {}

  async updateAggr(id: idT, opt: WebtoonAggrOptionT = {}): Promise<void> {
    return await updateAggr(id, opt);
  }

  async create(form: WebtoonFormT): Promise<WebtoonT> {
    const created = await webtoonM.create(form);
    if (!created) {
      throw new err.NotAppliedE();
    }
    return created;
  }

  async get(id: idT, getOpt: GetWebtoonOptionT = {}): Promise<WebtoonT> {
    return webtoonM.findById(id, {
      builder: (qb, select) => {
        lookupBuilder(select, getOpt);
      }
    });
  }

  async update(id: idT, form: Partial<WebtoonFormT>): Promise<WebtoonT> {
    const updated = await webtoonM.updateOne({ id }, form);
    if (!updated) {
      throw new err.NotAppliedE();
    }
    return updated;
  }

  async list(listOpt: ListWebtoonOptionT): Promise<ListData<WebtoonT>> {
    return await listWebtoon(listOpt);
  }

  async getThumbnailPresignedUrl(mimeType: string) {
    let key = `webtoons/thumbnails/thumbnail_${new Date().getTime()}.${mime.extension(mimeType)}`;
    key = putDevPrefix(key);
    const putUrl = await createSignedUrl(key, mimeType);
    return { putUrl, key };
  }

  async homeItems(): Promise<HomeItems> {
    const [popularList, recommendationsList, brandNewList, perGenreList] = await Promise.all([
      // 인기
      listWebtoon({
        $creator: true,
        bidStatus: "bidding,negotiating",
        sort: "popular",
        $myLike: true,
        limit: 30
      }),
      // TODO 기준이 무엇인가
      // 추천 컨텐츠
      listWebtoon({
        $creator: true,
        bidStatus: "bidding,negotiating",
        limit: 5
      }),
      // 최신 컨텐츠
      listWebtoon({
        $creator: true,
        bidStatus: "bidding,negotiating",
        sort: "recent",
        limit: 5
      }),
      // 장르별 모아보기
      listWebtoon({
        $creator: true,
        bidStatus: "bidding,negotiating",
        limit: 10
      })
    ]);
    return {
      popular: popularList.data,
      recommendations: recommendationsList.data,
      brandNew: brandNewList.data,
      perGenre: perGenreList.data
    };
  }
}