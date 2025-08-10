/**
 * Get YouTube thumbnail URL from a YouTube video URL
 * @param {string} youtubeUrl - The full YouTube video URL
 * @param {string} quality - Optional. Specify the thumbnail quality (default: 'maxresdefault')
 * @returns {string} - URL of the YouTube video thumbnail
 */
function getYouTubeThumbnail(youtubeUrl: string, quality = 'mqdefault') {
  // Extract the video ID from the URL
  const videoIdMatch = youtubeUrl.match(
    /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
  );

  // If a valid video ID is found, return the thumbnail URL
  if (videoIdMatch && videoIdMatch[1]) {
    const videoId = videoIdMatch[1];
    return `https://img.youtube.com/vi/${videoId}/${quality}.jpg`;
  }

  // Return null if the video ID is not found in the URL
  return null;
}

// Example usage:
const youtubeUrl = 'https://www.youtube.com/watch?v=dQw4w9WgXcQ';
const thumbnailUrl = getYouTubeThumbnail(youtubeUrl);
console.log(thumbnailUrl); // Output: https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg

export { getYouTubeThumbnail };
