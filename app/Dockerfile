FROM node:alpine AS builder
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install
COPY . .
RUN yarn build

FROM node:alpine
WORKDIR /app
COPY --from=builder /app/build ./
RUN yarn add global serve
CMD ["yarn", "serve", "-s", "-p", "3000"]