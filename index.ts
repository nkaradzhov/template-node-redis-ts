import { GenericContainer } from 'testcontainers';
import { createClient } from 'redis';

const container = await new GenericContainer('redis')
  .withExposedPorts(6379)
  .start();

const client = createClient({
  url: `redis://localhost:${container.getMappedPort(6379)}`
});

await client.connect();

/**
 * do your best
 */

await client.close();
