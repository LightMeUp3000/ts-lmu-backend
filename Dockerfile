FROM node:12 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install

COPY . ./

RUN npm run build

RUN npm prune --production

FROM node:12-alpine

WORKDIR /usr/src/app

COPY --from=builder /usr/src/app .

EXPOSE 8080

CMD ["node", "app.js"]
