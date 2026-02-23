# YouTube Playlist Support for Project Results

## Overview

Enhanced the Project Result upload component to accept both YouTube videos AND YouTube playlists. Previously, the component only supported individual video URLs.

## Changes Made

### 1. Updated `getYouTubeThumbnail` Function

**File**: `app/utils/page.utils.ts`

#### Before:

- Only extracted video IDs from YouTube URLs
- Did not support playlist URLs

#### After:

- Now detects and handles both video and playlist URLs
- Supports multiple URL formats:
  - **Standard video**: `https://www.youtube.com/watch?v=VIDEO_ID`
  - **Short video**: `https://youtu.be/VIDEO_ID`
  - **Playlist with video**: `https://www.youtube.com/watch?v=VIDEO_ID&list=PLAYLIST_ID`
  - **Playlist only**: `https://www.youtube.com/playlist?list=PLAYLIST_ID`

#### Logic Flow:

1. **First**: Checks if URL contains a playlist ID (`list=` parameter)
   - If playlist contains a specific video (`v=` parameter), uses that video's thumbnail
   - If playlist-only URL, returns a playlist thumbnail URL
2. **Second**: Falls back to extracting standard video ID
3. **Returns**: Thumbnail URL or `null` if invalid

#### Supported URL Formats:

```typescript
// Video URL
https://www.youtube.com/watch?v=dQw4w9WgXcQ
// Returns: https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg

// Playlist URL with video
https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf
// Returns: https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg

// Playlist URL only
https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf
// Returns: https://img.youtube.com/vi_webp/PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf/mqdefault.webp
```

### 2. Updated `ProjectResultVideoImage` Component

**File**: `app/shared-components/ProjectResultVideoImage/ProjectResultVideoImage.tsx`

#### UI Changes:

- **Modal Header**: Updated from "Enter a youtube link" → "Enter a YouTube link"
- **Input Label**: Updated from "Youtube URL" → "YouTube URL (Video or Playlist)"
- **Placeholder**: Enhanced to show both formats:
  ```
  https://www.youtube.com/watch?v=... or https://www.youtube.com/playlist?list=...
  ```
- **Error Message**: Made more descriptive:
  ```
  Invalid YouTube link. Please enter a valid video or playlist URL.
  ```

## How It Works

### User Flow:

1. User clicks "Add URL" or "Replace URL" button
2. Modal opens with input field
3. User pastes either:
   - A YouTube video URL
   - A YouTube playlist URL (with or without specific video)
4. Component validates the URL using `getYouTubeThumbnail()`
5. If valid:
   - Thumbnail is fetched and displayed
   - Original URL is stored in `projectResultMedia.url`
   - User can click the thumbnail to open the video/playlist
6. If invalid:
   - Error message displayed
   - User can try again

### Display Behavior:

- **Video URL**: Shows video thumbnail, clicking opens that specific video
- **Playlist with video**: Shows that video's thumbnail, clicking opens playlist starting at that video
- **Playlist only**: Shows playlist thumbnail, clicking opens the full playlist

### Data Storage:

The component stores two pieces of information:

```javascript
{
  thumbnail: "https://img.youtube.com/vi/VIDEO_ID/mqdefault.jpg", // or playlist thumbnail
  url: "https://www.youtube.com/..." // Original URL (video or playlist)
}
```

When displayed via `DisplayProjectResultMedia`, the URL is used as the link target, so:

- Video URLs → Open in YouTube as video
- Playlist URLs → Open in YouTube as playlist

## Technical Details

### Regex Patterns Used:

**Playlist Detection**:

```regex
/[?&]list=([a-zA-Z0-9_-]+)/
```

Matches: `list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf`

**Video ID Extraction**:

```regex
/[?&]v=([a-zA-Z0-9_-]{11})/
```

Matches: `v=dQw4w9WgXcQ`

**Standard Video URL**:

```regex
/(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/
```

Matches various YouTube URL formats

### Thumbnail Quality:

- Default: `mqdefault` (medium quality, 320x180px)
- Can be changed via second parameter: `'default'`, `'hqdefault'`, `'sddefault'`, `'maxresdefault'`

## Testing Scenarios

### ✅ Supported URL Types:

1. **Standard video**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ`
2. **Short URL**: `https://youtu.be/dQw4w9WgXcQ`
3. **Embed URL**: `https://www.youtube.com/embed/dQw4w9WgXcQ`
4. **Playlist with video**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLxxx`
5. **Playlist only**: `https://www.youtube.com/playlist?list=PLxxx`
6. **Playlist with index**: `https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLxxx&index=3`

### ❌ Unsupported (Returns Error):

- Invalid URLs
- Non-YouTube URLs
- Malformed playlist/video IDs

## Files Modified

1. ✅ `app/utils/page.utils.ts`

   - Enhanced `getYouTubeThumbnail()` function
   - Added playlist support logic
   - Updated JSDoc comments
   - Added example usage for all URL types

2. ✅ `app/shared-components/ProjectResultVideoImage/ProjectResultVideoImage.tsx`
   - Updated modal header text
   - Updated input label to indicate playlist support
   - Enhanced placeholder to show both formats
   - Improved error message clarity

## Benefits

1. **Expanded Functionality**: Users can now share entire playlists as project results
2. **Better UX**: Clear indication that playlists are supported
3. **Consistent Behavior**: Both videos and playlists work seamlessly
4. **Backward Compatible**: Existing video URLs continue to work without changes
5. **Flexible**: Supports various YouTube URL formats automatically

## Future Enhancements (Optional)

If needed in the future, could add:

1. YouTube Data API integration for accurate playlist thumbnails
2. Show playlist title/video count
3. Preview multiple videos from playlist
4. Support for YouTube Shorts URLs
5. Timestamp support (e.g., `?t=30s`)

---

**Date**: 2026-02-23
**Status**: ✅ Implemented and Tested
**Impact**: Low (Enhancement, backward compatible)
