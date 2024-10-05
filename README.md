# kenaz-ip-back


**kenaz-ip (WebtoonLike)** Backend Implementation

Kenaz 에서 제작하는 웹사이트 [WebtoonLike](www.webtoonlike.com) 의 백엔드 코드입니다.




## 환경변수
.env 파일을 제작해주세요. src/env.ts 파일을 보고 zod schema 에 맞게 .env 값을 넣어주시면 됩니다.

`STAGE` 값은 dev 와 prod 중 하나이며 개발 서버의 경우에는 항상 dev 를 넣어주세요.

<br/>
<br/>

## Docker 로 실행
해당 Dockerfile 은 우분투 환경에서 실행 가능합니다.

```
# build image
Docker build -t kenaz-back .

# run container
Docker run -p ${IN_PORT}:${OUT_PORT} kenaz-back
```

## 직접 실행

### 1. pnpm 및 패키지 설치
npm 이나 yarn 이 아닌 pnpm 을 통해 패키지를 관리합니다. pnpm 을 설치하지 않았다면 pnpm 을 우선 [설치](https://pnpm.io/ko/installation)해주세요.

pnpm 설치 후에는 다음 명령어로 패키지를 설치해주세요. (node >= 20)
```
pnpm install
```



### 2. API 실행
다음 명령어를 통해 api 를 실행해주세요.
```
pnpm apis
```

위 명령어는 ts-node 를 통해 api 를 실행합니다. 자세한 명령어에 대한 상세 정보는 `package.json` 파일을 참고해주세요.


### 3. build 및 배포

다음 명령어를 통해 ts 파일을 빌드해주세요.
```
pnpm build
```
빌드가 완료된 후 다음 명령어를 통해 서버를 실행할 수 있습니다.
```
pnpm start
```

<br/>
<br/>


## 튜토리얼

1. [migration](./tutorials/1_migration.md)
   
  데이터베이스 테이블을 추가하고 수정하고 적용하는 방법에 대해서 설명합니다.
1. [api](./tutorials/2_api.md)

  데이터베이스에 추가한 테이블을 기준으로 api 를 만들고 적용하는 방법에 대해서 설명합니다.


<br/>
<br/>

## 참고 사항

### puppeteer 의존성 문제
해당 프로젝트에서 pdf 를 발행해서 데이터를 넘겨주어야 할 기능이 있었는데 이를 위해 [puppeteer](https://www.npmjs.com/package/pdf-puppeteer) 라는 라이브러리를 활용했습니다. 단 이 puppeteer 라는 라이브러리가 운영 환경에 따라 의존적인 패키지가 달라 동작이 들쑥날쑥해서 invoice 발행을 위해서는 환경을 맞추어주어야 합니다. 본 프로젝트의 공식 운영 환경은 Ubuntu 22.04 이며 이를 위해 dependency 설치 과정을 Dockerfile 에 담아두었습니다. 

<br/>
<br/>

### CICD
해당 프로젝트는 현재 (22.05.07) CICD 가 적용되어 있지 않습니다. 서버에 접속해서 pm2 를 활용해서 직접 배포 해주고 있습니다. 배포를 위해 사용되는 commandline 은 `scripts/deploy_prod.sh` 파일에 담겨있습니다. 가능하면 GITHUB ACTION 을 사용하여 CICD 를 등록해서 사용하시고 배포 script 파일은 참고로 사용해주세요.




