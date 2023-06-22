FROM node:18-alpine3.17 as deps
WORKDIR /app
COPY package.json ./
RUN npm install

FROM node:18-alpine3.17 as builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

FROM node:18-alpine3.17 as prod-deps
WORKDIR /app
COPY package.json ./
RUN npm install --omit=dev

FROM node:18-alpine3.17 as prod
EXPOSE 3000
WORKDIR /app
COPY --from=prod-deps /app/node_modules ./node_modules
COPY --from=builder /app/build ./build
COPY config.json ./

CMD [ "node","build/app.js"]