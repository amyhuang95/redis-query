import { createClient } from 'redis';

export async function connectToRedis() {
  const client = createClient();
  client.on('error', (err) => console.log('Redis Client Error', err));

  await client.connect();
  return client;
}
