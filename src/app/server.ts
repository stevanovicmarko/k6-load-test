import Fastify from 'fastify';
import { promisify } from 'util';
const sleep = promisify(setTimeout);

const fastify = Fastify({
    logger: true
})

// Declare a route
fastify.get('/', async function handler (request, reply) {
    await sleep(100 + (Math.random() * 900));
    return { hello: 'world' }
});

fastify.post('/', async function handler (request, reply) {
    await sleep(100 + (Math.random() * 900));
    return request.body;
});

(async () => {
    try {
        await fastify.listen({ port: 8080 })
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
})();

