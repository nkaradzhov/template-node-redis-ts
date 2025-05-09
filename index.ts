import { createClient } from 'redis';

const client = await createClient();
await client.connect();

await client.close();
