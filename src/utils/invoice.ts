import { format as dfFormat, addYears } from "date-fns";
import puppeteer from "puppeteer";
// import convertHTMLToPDF from "pdf-puppeteer";
// const convertHTMLToPDF = require("pdf-puppeteer");

import type { BidRequestT } from "@/types";


export async function createInvoiceImage(request: BidRequestT): Promise<Buffer> {
  const { creator, buyer, webtoon } = request;

  const now = new Date();


  const validUntil = addYears(now, 1);

  const html = `
  <html>
    <style>
      body {
        padding: 16px;
        font-size: 14px;
      }
      h1 {
        font-size: 26px;
      }
      table { width: 100%; border-collapse: collapse; font-size: 14px;}
      th, td { border: 2px solid black; padding: 16px; text-align: center; }

      .subtitle {
        font-size: 22px;
        font-weight: bold;
      }
      .box {
        border: 2px solid black;
        padding: 20px;
      }
      .bold {
        font-weight: bold;
      }
      .text-center {
        text-align: center;
      }
    </style>
    <body>
      <h1 class="text-center">협의 내역서</h1>
      <p class="subtitle">구매자</p>
      <div class="box">
        <p>회사명: ${buyer?.companyInfo.name}  </p>
        <p>담당자명: ${buyer?.user?.fullName} </p>
        <p>주소: ${buyer?.user?.address} </p>
        <p>연락처: ${buyer?.user?.phone} </p>
        <p>사업자번호: ${buyer?.companyInfo.businessNumber} </p>
      </div>

      <div style="height: 40px"></div>

      <p class="subtitle">판매자</p>
      <div class="box">
        <p>작가명: ${creator?.name} </p>
        <p>연락처: ${creator?.user?.phone} </p>
        <p>주소: ${creator?.user?.address} </p>
        <p>작품명: ${webtoon?.title} </p>
      </div>

      <div style="height: 40px"></div>

      <p class="subtitle">조건</p>

      <table>
        <thead class="bold">
          <tr>
            <th>서비스 권역</th>
            <th>사업권</th>
            <th>독점 권리</th>
            <th>합의 조건</th>
          </tr>
        </thead>
        <tbody>
          ${request.contractRange.data.map((item) => {
    return (
      `
      <tr>
        <td>${contryCodeToName(item.country)}</td>
        <td>${item.businessField}</td>
        <td>${contractToName(item.contract)}</td>
        <td>${item.message}</td>
      </tr>
      `
    );
  })}
      </tbody>
      </table>

      <p class="text-center">협의 내역서 만료 기간: ${dfFormat(validUntil, "yyyy년 M월 d일")}</p>

      <p class="bold subtitle text-center">위 협의 사항을 웹툰라이크가 보증합니다. </p>

      <p class="text-center">${dfFormat(now, "yyyy년 M월 d일")}</p>

    </body>
  </html>
  `;
  // const result = await htmlToImage({
  //   html,
  //   // output: "./invoice.png"
  // });

  const result = await convertHtmlToPdfBuffer(html);

  return result;
}

async function convertHtmlToPdfBuffer(html: string): Promise<Buffer> {
  const browser = await puppeteer.launch({args: ['--no-sandbox']});

  const page = await browser.newPage();

  await page.setContent(html);

  const result = await page.pdf({
    format: "A4",
    width: "2480px",
    height: "3508px",
    printBackground: true,
  });

  await browser.close();

  return result;

  // return new Promise((resolve, reject) => {
  //   htmlPdf.create(html, {
  //     format: "A4",
  //     orientation: "portrait",
  //     width: `${2480 * 1.1}px`,
  //     height: `${3508 * 1.1}px`,
  //     childProcessOptions: {

  //     }
  //   }).toBuffer((err, buffer) => {
  //     if (err) reject(err);
  //     else resolve(buffer);
  //   });
  // });
}

function contryCodeToName(code: string) {
  switch (code) {
  case "all":
    return "전체";
  case "ko":
    return "한국";
  case "en":
    return "영어";
  case "zhCN":
    return "중국어(간체)";
  case "zhTW":
    return "중국어(번체)";
  case "de":
    return "독일";
  case "id":
    return "인도네시아";
  case "ja":
    return "일본";
  case "fr":
    return "프랑스";
  case "vi":
    return "베트남";
  case "ms":
    return "말레이시아";
  case "th":
    return "태국";
  case "es":
    return "스페인";
  default:
    return "???";
  }
}

function contractToName(contract: string) {
  switch (contract) {
  case "exclusive":
    return "독점";
  case "nonExclusive":
    return "비독점";
  case "disallow":
    return "독점금지";
  default:
    return "???";
  }
}
