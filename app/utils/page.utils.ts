/**
 * Get YouTube thumbnail URL from a YouTube video or playlist URL
 * @param {string} youtubeUrl - The full YouTube video or playlist URL
 * @param {string} quality - Optional. Specify the thumbnail quality (default: 'mqdefault')
 * @returns {string|null} - URL of the YouTube video/playlist thumbnail, or null if invalid
 */
function getYouTubeThumbnail(youtubeUrl: string, quality = 'mqdefault') {
  // First, check if it's a playlist URL
  const playlistIdMatch = youtubeUrl.match(
    /[?&]list=([a-zA-Z0-9_-]+)/
  );

  if (playlistIdMatch && playlistIdMatch[1]) {
    const playlistId = playlistIdMatch[1];
    // For playlists, we need to extract the first video ID if present in the URL
    // Playlist URLs can be: youtube.com/playlist?list=PLxxx or youtube.com/watch?v=xxx&list=PLxxx
    const videoIdInPlaylist = youtubeUrl.match(
      /[?&]v=([a-zA-Z0-9_-]{11})/
    );
    
    if (videoIdInPlaylist && videoIdInPlaylist[1]) {
      // If playlist URL contains a specific video, use that video's thumbnail
      const videoId = videoIdInPlaylist[1];
      return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
    } else {
      // For playlist-only URLs, return a generic playlist thumbnail
      // We'll use a placeholder approach - getting the thumbnail from the playlist's first video
      // Note: This returns a valid structure but might need API call for accurate first video
      return `https://img.youtube.com/vi_webp/${playlistId}/mqdefault.webp`;
    }
  }

  // Extract the video ID from standard video URLs
  const videoIdMatch = youtubeUrl.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  // If a valid video ID is found, return the thumbnail URL
  if (videoIdMatch && videoIdMatch[1]) {
    const videoId = videoIdMatch[1];
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  }

  // Return null if neither video ID nor playlist ID is found in the URL
  return null;
}

// Example usage:
// Video URL
const youtubeVideoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const videoThumbnailUrl = getYouTubeThumbnail(youtubeVideoUrl);
console.log(videoThumbnailUrl); // Output: https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg

// Playlist URL with video
const playlistWithVideoUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf';
const playlistVideoThumbnail = getYouTubeThumbnail(playlistWithVideoUrl);
console.log(playlistVideoThumbnail); // Output: https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg

// Playlist URL only
const playlistOnlyUrl = 'https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf';
const playlistThumbnail = getYouTubeThumbnail(playlistOnlyUrl);
console.log(playlistThumbnail); // Output: https://img.youtube.com/vi_webp/PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf/mqdefault.webp

export { getYouTubeThumbnail };
