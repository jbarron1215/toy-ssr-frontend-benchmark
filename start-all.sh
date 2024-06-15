#!/bin/bash

#
# NOTE: using bun since it looks current version goes slightly faster than node
#
cd angular && bun ng serve --host=0.0.0.0 --port=3001 &
cd next && bun run start --port=3002&
cd nuxt && HOST=0.0.0.0 PORT=3003 bun .output/server/index.mjs &
cd sveltekit && bun run preview --host=0.0.0.0 --port=3004 &

# just wait for this server
cd fastify && bun server.js
