import fs from 'fs';
import path from 'path';
import { Redis } from '@upstash/redis';

const cacheDir = path.join(process.cwd(), 'cache');
// Initialize Redis
// const redis =
//   process.env.NEXT_PUBLIC_NODE_ENV === 'localhost'
//     ? new Redis({
//         url: 'redis://localhost:6379',
//       })
//     : Redis.fromEnv();
const redis = Redis.fromEnv();
const CHUNK_SIZE = 90;

// export async function saveToCache(filename, data) {
//   const keyBase = filename.replace('.json', '');
//   const chunks = [];

//   const keyname = filename?.replace('.json', '');
//   console.log('Saving to cache:', keyname);
//   const result = await redis.set(keyname, JSON.stringify(data));
//   console.log('result:', result);

//   if (result !== 'OK') {
//     throw new Error(`Failed to update Edge Config: ${response.statusText}`);
//   }
//   // }
// }

export async function saveToCache(filename, data) {
  const keyBase = filename.replace('.json', '');
  const chunks = [];
  console.log('Saving to cache: ', keyBase);

  for (let i = 0; i < data.length; i += CHUNK_SIZE) {
    chunks.push(data.slice(i, i + CHUNK_SIZE));
  }

  for (let index = 0; index < chunks.length; index++) {
    const chunkKey = `${keyBase}_chunk_${index}`;
    const result = await redis.set(chunkKey, JSON.stringify(chunks[index]));
    if (result !== 'OK') {
      throw new Error(`Failed to save chunk ${index}: ${result}`);
    }
  }

  // Save metadata about the number of chunks
  await redis.set(`${keyBase}_chunks`, chunks.length.toString());
}

// export async function getFromCache(filename) {
//   const keyname = filename?.replace('.json', '');
//   console.log('Getting from cache:', keyname);
//   return await redis.get(keyname);
//   // }
// }
export async function getFromCache(filename) {
  const keyBase = filename.replace('.json', '');
  console.log('Getting from cache:', keyBase);
  const chunkCount = parseInt(await redis.get(`${keyBase}_chunks`), 10);
  const data = [];
  // console.log('chunkCount:', chunkCount);

  for (let index = 0; index < chunkCount; index++) {
    const chunkKey = `${keyBase}_chunk_${index}`;
    // console.log('chunkKey:', chunkKey);
    const chunkData = await redis.get(chunkKey);
    if (chunkData) {
      data.push(...chunkData);
    }
  }

  return data;
}
