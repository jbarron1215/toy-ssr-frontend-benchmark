FROM node:22-bookworm-slim


ENV TARGET_DIR=/usr/src/ssr-benchmark
RUN mkdir -p $TARGET_DIR
COPY . $TARGET_DIR

