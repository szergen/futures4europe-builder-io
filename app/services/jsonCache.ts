import fs from 'fs/promises';
import path from 'path';

// Use /tmp directory for Vercel environment
const CACHE_DIR = process.env.VERCEL
  ? '/tmp/cache/data'
  : path.join(process.cwd(), '.next/cache/data');

export class JsonCacheService {
  /**
   * Ensures the cache directory exists
   */
  private static async ensureCacheDir() {
    try {
      await fs.access(CACHE_DIR);
    } catch {
      await fs.mkdir(CACHE_DIR, { recursive: true });
    }
  }

  /**
   * Saves data to the file cache
   * @param key Cache key
   * @param data Data to cache
   * @param maxAge Optional max age in milliseconds
   */
  static async saveToCache(key: string, data: any, maxAge?: number) {
    await this.ensureCacheDir();
    const filePath = path.join(CACHE_DIR, `${key}`);

    const cacheData = {
      data,
      timestamp: Date.now(),
      maxAge: maxAge || null,
    };

    await fs.writeFile(filePath, JSON.stringify(cacheData));
  }

  /**
   * Gets data from the file cache
   * @param key Cache key
   * @returns Cached data or null if not found or expired
   */
  static async getFromCache(key: string) {
    try {
      const filePath = path.join(CACHE_DIR, `${key}`);
      const rawData = await fs.readFile(filePath, 'utf-8');
      const cacheData = JSON.parse(rawData);

      // Check if cache is expired
      if (
        cacheData.maxAge &&
        Date.now() - cacheData.timestamp > cacheData.maxAge
      ) {
        return null;
      }

      return cacheData.data;
    } catch {
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
      const filePath = path.join(CACHE_DIR, `${key}`);
      const rawData = await fs.readFile(filePath, 'utf-8');
      const cacheData = JSON.parse(rawData);

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
      const filePath = path.join(CACHE_DIR, `${key}`);
      console.log('Invalidating cache for key:', key);
      await fs.unlink(filePath);
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
      await this.ensureCacheDir();
      const files = await fs.readdir(CACHE_DIR);

      await Promise.all(
        files.map((file) =>
          fs.unlink(path.join(CACHE_DIR, file)).catch(() => {})
        )
      );

      return true;
    } catch {
      return false;
    }
  }
}
