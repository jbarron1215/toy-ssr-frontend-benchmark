# Toy Javascript Server-Side Rendering Frontend Frameworks Benchmark

## Intro

Benchmarking the rendering speed of a simple hello-world in several JS SSR
frontend frameworks.

Measuring static site generation is out of the scope, that would be really fast,
the idea is to compare server-side rendering speed on the different frameworks.

## Javascript Frameworks evaluated

- Gatsby
- Next.js
- Nuxt
- SvelteKit

IMPORTANT: While I have good working experience with Nuxt, I don't have on the
other frameworks, so I'll try my best to follow standard practices and try to
get the most of them to make it a fair comparison.

Fair comparison implies writing the apps in the most standard and
straightforward way, not to come up with perferse ways in which to gain
performance.

## Endpoints

The following endpoints have been defined and will be benchmarked:

- /hello
  Simple full-featured HTML page returning "Hello world!" string

- /hello-fetch
  Simple full-featured HTML page returning "Hello world!" string, with the
  caveat that this string will be rendered from a REST endpoint and rendered
  from the server.

- /hello-component
  Like previous step, but with X components

All pages will include a very simple HTML file (e.g purecss.io), very simple
default routing and no state management.

## Benchmarks

Node 20.13 is used