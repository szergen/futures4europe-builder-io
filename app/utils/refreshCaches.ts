export async function refreshAllCaches() {
  try {
    // Invalidate all caches
    await fetch('/api/invalidate-cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ key: '*' }),
    });

    // Warm the caches
    await fetch('/api/warm-cache', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        token: process.env.NEXT_PUBLIC_CACHE_WARMING_TOKEN,
      }),
    });

    return true;
  } catch (error) {
    console.error('Error refreshing caches:', error);
    return false;
  }
}
