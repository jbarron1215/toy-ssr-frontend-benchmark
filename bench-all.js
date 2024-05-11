import Fastify from 'fastify'

const fastify = Fastify({
  logger: false
})

// Declare a route
fastify.get('/api/hello', function (request, reply) {
  reply.send({ text: 'Hello World from Backend!' })
})

// Run the server!
fastify.listen({ port: 3210 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
  // Server is now listening on ${address}
})