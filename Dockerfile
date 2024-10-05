FROM node:21-bullseye

WORKDIR /app

COPY pnpm-lock.yaml package.json ./

RUN npm install -g pnpm

RUN pnpm i

COPY . .

RUN pnpm build

# Install necessary system libraries
RUN apt-get update && apt-get install -y \
    libpangocairo-1.0-0 libx11-xcb1 libxcomposite1 libxcursor1 libxdamage1 \
    libxi6 libxtst6 libcups2 libxss1 libxrandr2 libgconf-2-4 libasound2 \
    libatk1.0-0 libgtk-3-0 libnss3 \
    libgbm-dev


# 한글 폰트 설정

RUN apt-get install -y unzip fontconfig

RUN cd /usr/share/fonts && \
    wget http://cdn.naver.com/naver/NanumFont/fontfiles/NanumFont_TTF_ALL.zip && \
    unzip NanumFont_TTF_ALL.zip && \
    rm NanumFont_TTF_ALL.zip && \
    fc-cache -fv


CMD ["pnpm", "start"]
