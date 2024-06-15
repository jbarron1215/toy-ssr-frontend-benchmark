FROM node:22-bookworm-slim

RUN apt update \
    && apt upgrade -y \
    && apt install -y vim zip procps psutils

ENV TARGET_DIR=/usr/src/ssr-benchmark
RUN mkdir -p $TARGET_DIR

RUN npm install -g bun

COPY ./angular $TARGET_DIR/angular
RUN cd $TARGET_DIR/angular && bun install && bun run build

COPY ./next $TARGET_DIR/next
RUN cd $TARGET_DIR/next && bun install && bun next telemetry disable && bun run build

COPY ./nuxt $TARGET_DIR/nuxt
RUN cd $TARGET_DIR/nuxt && bun install && bun run build

COPY ./sveltekit $TARGET_DIR/sveltekit
RUN cd $TARGET_DIR/sveltekit && bun install && bun run build

COPY ./fastify $TARGET_DIR/fastify

# root folder
COPY ./*.js $TARGET_DIR/
COPY ./*.json $TARGET_DIR/
COPY ./*.sh $TARGET_DIR/
RUN cd $TARGET_DIR && bun install


# fastify, angular, next, nuxt, svelte
EXPOSE 3210
EXPOSE 3001
EXPOSE 3002
EXPOSE 3003
EXPOSE 3004

WORKDIR $TARGET_DIR
CMD ["./start-all.sh"]
