/**
 * Extract a playlist ID from a YouTube URL, or null if not a playlist-only URL.
 * Returns null if the URL also contains a video ID (handled as a regular video).
 */
function extractPlaylistId(youtubeUrl: string): string | null {
  const playlistIdMatch = youtubeUrl.match(/[?&]list=([a-zA-Z0-9_-]+)/);
  if (!playlistIdMatch) return null;

  const videoIdMatch = youtubeUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (videoIdMatch) return null; // has a specific video — not playlist-only

  return playlistIdMatch[1];
}

/**
 * Fetch the thumbnail URL for a YouTube playlist via the oEmbed API.
 * Returns null if the playlist is not found or the request fails.
 */
async function fetchYouTubePlaylistThumbnail(
  playlistId: string,
): Promise<string | null> {
  try {
    const oEmbedUrl = `https://www.youtube.com/oembed?url=${encodeURIComponent(
      `https://www.youtube.com/playlist?list=${playlistId}`,
    )}&format=json`;
    const response = await fetch(oEmbedUrl);
    if (!response.ok) return null;
    const data = await response.json();
    return (data.thumbnail_url as string) || null;
  } catch {
    return null;
  }
}

/**
 * Get YouTube thumbnail URL from a YouTube video or playlist URL.
 * For playlist-only URLs (no video ID), returns null — use fetchYouTubePlaylistThumbnail instead.
 * @param {string} youtubeUrl - The full YouTube video or playlist URL
 * @param {string} quality - Optional. Specify the thumbnail quality (default: 'mqdefault')
 * @returns {string|null} - Thumbnail URL for video URLs, or null for playlist-only/invalid URLs
 */
function getYouTubeThumbnail(
  youtubeUrl: string,
  quality = "mqdefault",
): string | null {
  const playlistIdMatch = youtubeUrl.match(/[?&]list=([a-zA-Z0-9_-]+)/);

  if (playlistIdMatch) {
    const videoIdInPlaylist = youtubeUrl.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (videoIdInPlaylist && videoIdInPlaylist[1]) {
      return `https://img.youtube.com/vi/${videoIdInPlaylist[1]}/${quality}.jpg`;
    }
    // Playlist-only URL — thumbnail must be fetched asynchronously via fetchYouTubePlaylistThumbnail
    return null;
  }

  const videoIdMatch = youtubeUrl.match(
    /(?:youtube\.com\/(?:[^/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/,
  );

  if (videoIdMatch && videoIdMatch[1]) {
    return `https://img.youtube.com/vi/${videoIdMatch[1]}/${quality}.jpg`;
  }

  return null;
}

export {
  getYouTubeThumbnail,
  extractPlaylistId,
  fetchYouTubePlaylistThumbnail,
};
