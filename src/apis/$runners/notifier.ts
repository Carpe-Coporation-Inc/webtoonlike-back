import { BidRoundService } from "../BidRound/service";
import { NotificationService } from "../Notification/service";
import { WebtoonService } from "../Webtoon/service";
import type { BidRoundT, BidRequestT, NotificationFormT } from "@/types";

class Notifier{
  private notificationService: NotificationService;
  private webtoonService: WebtoonService;
  private bidRoundService: BidRoundService;
  constructor() {
    this.notificationService = new NotificationService();
    this.webtoonService = new WebtoonService();
    this.bidRoundService = new BidRoundService();
  }

  async roundAccepted(bidRound: BidRoundT): Promise<void> {
    try {
      if (!bidRound.userId) {
        return;
      }
      const webtoon = await this.webtoonService.get(bidRound.webtoonId);
      const form: NotificationFormT = {
        userId: bidRound.userId,
        message: `내 웹툰 "${webtoon.title}"의 투고가 승인되었습니다.`,
        type: "roundAdminAccepted",
        isRead: false,
        arg: {
          bidRound: bidRound
        }
      };
      await this.notificationService.create(form);
    } catch (e) {
      console.warn(e);
    }
  }

  async roundRejected(bidRound: BidRoundT): Promise<void> {
    try {
      if (!bidRound.userId) {
        return;
      }
      const webtoon = await this.webtoonService.get(bidRound.webtoonId);
      const form: NotificationFormT = {
        userId: bidRound.userId,
        message: `내 웹툰 "${webtoon}"의 투고가 관리자에 의해 거절되었습니다.`,
        type: "roundAdminRejected",
        isRead: false,
        arg: {
          bidRound: bidRound
        }
      };
      await this.notificationService.create(form);
    } catch (e) {
      console.warn(e);
    }
  }

  async requestReceived(bidRequest: BidRequestT): Promise<void> {
    try {
      const round = await this.bidRoundService.get(bidRequest.roundId, { $webtoon: true });
      const form: NotificationFormT = {
        userId: round.userId!, // 저작권자 id
        message: `내 웹툰 "${round.webtoon!.title}"에 새로운 입찰이 들어왔습니다.`,
        type: "requestReceived",
        isRead: false,
        arg: {
          bidRequest: bidRequest,
          bidRound: round
        }
      };
      await this.notificationService.create(form);
    } catch (e) {
      console.warn(e);
    }
  }

  async requestAccepted(bidRequest: BidRequestT): Promise<void> {
    try {
      const round = await this.bidRoundService.get(bidRequest.roundId, { $webtoon: true });
      const form: NotificationFormT = {
        userId: bidRequest.userId!, // 입찰자 id
        message: `웹툰 "${round.webtoon!.title}"에 나의 입찰이 승인되었습니다.`,
        type: "requestAccepted",
        isRead: false,
        arg: {
          bidRequest: bidRequest,
          bidRound: round
        }
      };
      await this.notificationService.create(form);
    } catch (e) {
      console.warn(e);
    }
  }

  async requestRejected(bidRequest: BidRequestT): Promise<void> {
    try {
      const round = await this.bidRoundService.get(bidRequest.roundId, { $webtoon: true });
      const form: NotificationFormT = {
        userId: bidRequest.userId!, // 입찰자 id
        message: `웹툰 "${round.webtoon!.title}"에 나의 입찰이 거절되었습니다.`,
        type: "requestRejected",
        isRead: false,
        arg: {
          bidRequest: bidRequest,
          bidRound: round
        }
      };
      await this.notificationService.create(form);

    } catch (e) {
      console.warn(e);
    }
  }

  async invoicePublished(bidRequest: BidRequestT ): Promise<void> {
    try {
      await this.notificationService.create({
        userId: bidRequest.buyer!.userId,
        message: "입찰에 대한 청구서가 생성되었습니다.",
        type: "invoicePublished",
        isRead: false,
        arg: {
          // bidRequest: bidRequest
        }
      });

      await this.notificationService.create({
        userId: bidRequest.creator!.userId,
        message: "입찰에 대한 청구서가 생성되었습니다.",
        type: "invoicePublished",
        isRead: false,
        arg: {
          // bidRequest: bidRequest
        }
      });
    } catch (e) {
      console.warn(e);
    }
  }


}

export const notifier = new Notifier();