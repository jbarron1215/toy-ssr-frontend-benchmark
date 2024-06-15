import Fastify from 'fastify'

const PORT = 3210
const fastify = Fastify({
  logger: false
})

let fetchCacheData = null
let fetchCacheLastTime = 0
fastify.get('/hello-fetch-cache', async function (req, resp) {
  const cacheTimeMs = 60 * 1000

  // let's really do a request, caching it for 60 secs even if it is same server
  if ((fetchCacheLastTime + cacheTimeMs) < Date.now()) {
    // NOTE: not perfect, since multiple requests can come at the same time
    //       and we won't be able to cache the result in all requests at once
    //       we will have a peak of multiple requests during same second (so to
    //       say), and then the value will get cached.
    const response = await fetch(`http://127.0.0.1:${PORT}/api/hello`)
    const data = await response.json()
    fetchCacheData = data
    fetchCacheLastTime = Date.now()
  }

  const data = fetchCacheData
  resp
    .header('Content-Type', 'text/html; charset=utf-8')
    .send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  </head>
  <body>
    <div>${data.text}</div>
  </body>
</html>
`)
})

fastify.get('/hello-fetch', async function (req, resp) {
  // let's really do a request, even if it is same server
  const response = await fetch(`http://127.0.0.1:${PORT}/api/hello`)
  const data = await response.json()

  resp
    .header('Content-Type', 'text/html; charset=utf-8')
    .send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  </head>
  <body>
    <div>${data.text}</div>
  </body>
</html>
`)
})

fastify.get('/hello', function (req, resp) {
  resp
    .header('Content-Type', 'text/html; charset=utf-8')
    .send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  </head>
  <body>
    <div>Hello World from Page!</div>
  </body>
</html>
`)
})

function sayHelloComponent({ text }) {
  return `<div>
    Hello World Component!
    ${text}
  </div>
  `
}

fastify.get('/hello-component', async function (req, resp) {
  // let's really do a request, even if it is same server
  const response = await fetch(`http://127.0.0.1:${PORT}/api/hello`)
  const data = await response.json()

  resp
    .header('Content-Type', 'text/html; charset=utf-8')
    .send(`
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charSet="utf-8"/>
    <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no"/>
  </head>
  <body>
    ${sayHelloComponent({text : 'Look at me!'})}
  </body>
</html>
`)
})


// Declare a route
fastify.get('/api/hello', function (req, resp) {
  resp
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ text: 'Hello World from Backend!'})
})

// Declare a route that dynamically changes
fastify.get('/api/hello2', function (req, resp) {
  resp
    .header('Content-Type', 'application/json; charset=utf-8')
    .send({ text: 'Hello Dynamic Backend! ' + Date.now()})
})

// Run the server!
fastify.listen({ host: '0.0.0.0', port: PORT }, function (err, address) {
  console.log (`Server starting on port: ${PORT}`)
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})