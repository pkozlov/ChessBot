FROM node:18-alpine as nodebuilder
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY / .

ARG REACT_APP_BOT_URI
RUN echo ${REACT_APP_BOT_URI}

RUN npm run build
RUN npm run build-server

#############################################################################

FROM node:18-alpine as backend
WORKDIR /app

ENV NODE_ENV production

COPY --from=nodebuilder /drizzle.config.ts ./
COPY --from=nodebuilder /app/node_modules ./node_modules
COPY --from=nodebuilder /app/build ./build
COPY --from=nodebuilder /app/server-build ./server

CMD node server/index.js

FROM nginx:stable-alpine as frontend
WORKDIR /www

COPY --from=nodebuilder /app/build /www
