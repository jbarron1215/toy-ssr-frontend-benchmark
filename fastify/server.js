import Fastify from 'fastify'

const PORT = 3210
const fastify = Fastify({
  logger: false
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
    .send({ text: 'Hello World from Backend!' })
})

// Run the server!
fastify.listen({ port: PORT }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})