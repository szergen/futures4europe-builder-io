import { Redis } from '@upstash/redis';

// Initialize Redis client
const redis = Redis.fromEnv();

export class RedisCacheService {
  /**
   * Saves data to Redis cache
   * @param key Cache key
   * @param data Data to cache
   * @param maxAge Optional max age in milliseconds
   */
  static async saveToCache(key: string, data: any, maxAge?: number) {
    const cacheData = {
      data,
      timestamp: Date.now(),
      maxAge: maxAge || null,
    };

    //  #region TTL for cache. Remove it for now
    // if (maxAge) {
    //   // Convert milliseconds to seconds for Redis TTL
    //   const ttlSeconds = Math.ceil(maxAge / 1000);
    //   await redis.set(key, cacheData, { ex: ttlSeconds });
    // } else {
    await redis.set(key, cacheData);
    // }
  }

  /**
   * Gets data from Redis cache
   * @param key Cache key
   * @returns Cached data or null if not found or expired
   */
  static async getFromCache(key: string) {
    try {
      const cacheData = (await redis.get(key)) as {
        data: any;
        timestamp: number;
        maxAge: number | null;
      };
      if (!cacheData) {
        console.log('No data found in REDIS for key:', key);
        return null;
      }

      //  #region TTL for cache. Remove it for now
      // Check if cache is expired (fallback check in case TTL didn't work)
      //   if (
      //     cacheData.maxAge &&
      //     Date.now() - cacheData.timestamp > cacheData.maxAge
      //   ) {
      //     await this.invalidateCache(key);
      //     return null;
      //   }
      // #endregion

      console.log('Data found in REDIS for key:', key);
      return cacheData.data;
    } catch (error) {
      console.error('Error getting data from REDIS for key:', key, error);
      return null;
    }
  }

  /**
   * Gets the age of a cached item in milliseconds
   * @param key Cache key
   * @returns Age in milliseconds or Infinity if not found
   */
  static async getCacheAge(key: string) {
    try {
      const cacheData = await redis.get(key);
      if (!cacheData) return Infinity;

      return Date.now() - cacheData.timestamp;
    } catch {
      return Infinity;
    }
  }

  /**
   * Invalidates a specific cache entry
   * @param key Cache key
   */
  static async invalidateCache(key: string) {
    try {
      console.log('Invalidating cache for key:', key);
      await redis.del(key);
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Invalidates all cache entries
   */
  static async invalidateAllCache() {
    try {
      // Note: This is a destructive operation that will clear all keys
      // Make sure this is what you want in production
      console.log('Invalidating all cache entries from REDIS');
      await redis.flushall();
      return true;
    } catch {
      return false;
    }
  }
}
