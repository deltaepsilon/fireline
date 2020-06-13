FROM mhart/alpine-node:10

WORKDIR /app/functions

COPY ./app/functions/package.json package.json
COPY ./app/functions/yarn.lock yarn.lock
RUN yarn install --pure-lockfile --production=false

WORKDIR /app

COPY ./app/package.json package.json
COPY ./app/yarn.lock yarn.lock
RUN yarn install --pure-lockfile --production=true

ADD ./app /app

RUN yarn && yarn ci:build
