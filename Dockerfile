FROM node:12 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . ./


RUN npm prune --production

FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 8080

RUN npm run start
