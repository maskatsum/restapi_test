import fastify, { FastifyReply, FastifyRequest } from "fastify";

const server = fastify();

server.get('/ping', async (request: FastifyRequest, reply: FastifyReply) => {
  return 'pong\n';
});

server.listen({
  port: 3000
}, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1)
  }
  console.log(`server starts at ${address}`);
});