FROM node:18-alpine as nodebuilder
WORKDIR /app

COPY package.json package-lock.json ./

RUN npm install

COPY /src ./src
COPY /public ./public
COPY tsconfig.json webpack.server.js .babelrc ./

ARG REACT_APP_BOT_URI
RUN echo ${REACT_APP_BOT_URI}

RUN npm run build
RUN npm run build-server

#############################################################################

FROM node:18-alpine as backend
WORKDIR /app

ENV NODE_ENV production

COPY --from=nodebuilder /app/node_modules ./node_modules
COPY --from=nodebuilder /app/build ./build
COPY --from=nodebuilder /app/server-build ./server
COPY drizzle.config.ts ./
COPY /migrations ./migrations

CMD node server/index.js

FROM nginx:stable-alpine as frontend
WORKDIR /www

COPY --from=nodebuilder /app/build /www
