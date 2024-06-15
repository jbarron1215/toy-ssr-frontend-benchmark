# Toy Javascript Server-Side Rendering Frontend Frameworks Benchmark

## Intro

Benchmarking the rendering speed of a simple hello-world in several JS SSR
frontend frameworks.

Measuring static site generation is out of the scope, that would be really fast,
the idea is to compare server-side rendering speed on the different frameworks.

## Javascript Frameworks evaluated

- Angular
- Next.js
- Nuxt
- SvelteKit

IMPORTANT: While I have good working experience with Nuxt, and have played a
little bit with React, I don't have on the other frameworks, so I'll try to
follow standard practices and try to get the most of them to make it a fair
comparison.

Fair comparison implies writing the apps in the most standard and
straightforward way without investing a lot of time, not to come up with
perverse ways in which to gain performance.

## Endpoints

The following endpoints have been defined and will be benchmarked:

- /hello
  Simple full-featured HTML page returning "Hello world!" string

- /hello-component
  Like previous step, but with 1 component

- /hello-fetch
  Simple full-featured HTML page returning "Hello world!" string, with the
  caveat that this string will be rendered from a REST endpoint and rendered
  from the server.

- /hello-fetch-cache
  Same as before, but trying to cache the response for 60 seconds.
  It looks that next is the only one with very straightforward implementation,
  nuxt has support for client requests, and the other two are harder to implement.

All pages will include a very simple HTML file (e.g purecss.io), very simple
default routing and no state management.

NOTE: on Angular, after spending 10 minutes I've been unable to create a basic
component. Probably part of it was that I did not follow any tutorials. Note that
this is just a toy project, and having the basic page is enough to play. I created
fetch though, which took me quite a while (but no cache)

## Benchmark

Node 22 is used (latest available through Dockerfile).

By default it uses `wrk` with a script to easily parse JSON output, however
autocannon can be used as well.

A better testing methodology would require running the server and the
performance load in different machines, running the server & load tool with
different threads, etc... but this will do the trick.

Run with this command:

```bash
$ node bench-all.js
```

```
Configuration:
  Node Version:  v20.10.0
  CPU Model:     Intel(R) Core(TM) i7-8565U CPU @ 1.80GHz
  Path:          /hello
  Duration:      10 s
  Connections:   100


| Name                     | Version | Speed Factor | Requests/s | Latency (us) | Throughput (MB/s) |
| :----------------------- | :------ | -----------: | ---------: | -----------: | ----------------: |
| fastify (hello)          | 4.28    |    🥇 98.59x |   🥇 26907 |     🥈 24998 |       🥉 10.0MB/s |
| fastify (helloComponent) | 4.28    |    🥈 43.81x |   🥈 11955 |     🥉 38738 |           4.8MB/s |
| fastify (helloFetch)     | 4.28    |    🥉 42.60x |   🥉 11625 |     🥇 16585 |           4.4MB/s |
| svelte (helloComponent)  | 4.2     |       15.63x |       4265 |        48687 |           6.8MB/s |
| svelte (hello)           | 4.2     |       14.89x |       4063 |      1382927 |           6.6MB/s |
| next (helloComponent)    | 14.2    |       10.24x |       2794 |        71915 |       🥇 13.2MB/s |
| next (hello)             | 14.2    |        9.42x |       2570 |      1761519 |       🥈 11.9MB/s |
| svelte (helloFetch)      | 4.2     |        8.38x |       2286 |        92637 |           3.8MB/s |
| nuxt (helloComponent)    | 3.11    |        5.30x |       1447 |       141517 |           1.8MB/s |
| nuxt (hello)             | 3.11    |        5.04x |       1376 |       319338 |           1.7MB/s |
| nuxt (helloFetch)        | 3.11    |        3.47x |        947 |       246856 |           1.3MB/s |
| next (helloFetch)        | 14.2    |        1.42x |        388 |       527451 |           1.8MB/s |
| angular (helloComponent) | 18.0    |        1.40x |        382 |      1453929 |           0.4MB/s |
| next (helloFetchCache)   | 14.2    |        1.31x |        356 |       620306 |           1.7MB/s |
| angular (hello)          | 18.0    |        1.31x |        356 |      1692144 |           0.4MB/s |
| angular (helloFetch)     | 18.0    |        1.00x |        272 |      1595904 |           0.4MB/s |
```

## LICENSE

MIT Licensed
