// page.utils.test.ts

import { getYouTubeThumbnail } from "./page.utils";

describe("getYouTubeThumbnail", () => {
  describe("Video URLs", () => {
    test("extracts thumbnail from standard YouTube video URL", () => {
      const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      const result = getYouTubeThumbnail(url);
      expect(result).toBe(
        "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      );
    });

    test("extracts thumbnail from short YouTube URL (youtu.be)", () => {
      const url = "https://youtu.be/dQw4w9WgXcQ";
      const result = getYouTubeThumbnail(url);
      expect(result).toBe(
        "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      );
    });

    test("extracts thumbnail from YouTube embed URL", () => {
      const url = "https://www.youtube.com/embed/dQw4w9WgXcQ";
      const result = getYouTubeThumbnail(url);
      expect(result).toBe(
        "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      );
    });

    test("extracts thumbnail from video URL with extra parameters", () => {
      const url =
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&t=30s&feature=share";
      const result = getYouTubeThumbnail(url);
      expect(result).toBe(
        "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      );
    });
  });

  describe("Playlist URLs", () => {
    test("extracts video thumbnail from playlist URL with video specified", () => {
      const url =
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf";
      const result = getYouTubeThumbnail(url);
      expect(result).toBe(
        "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      );
    });

    test("extracts playlist thumbnail from playlist-only URL", () => {
      const url =
        "https://www.youtube.com/playlist?list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf";
      const result = getYouTubeThumbnail(url);
      expect(result).toBe(
        "https://img.youtube.com/vi_webp/PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf/mqdefault.webp",
      );
    });

    test("handles playlist URL with index parameter", () => {
      const url =
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf&index=3";
      const result = getYouTubeThumbnail(url);
      expect(result).toBe(
        "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      );
    });
  });

  describe("Custom Quality Parameter", () => {
    test("respects custom quality parameter for video", () => {
      const url = "https://www.youtube.com/watch?v=dQw4w9WgXcQ";
      const result = getYouTubeThumbnail(url, "maxresdefault");
      expect(result).toBe(
        "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
      );
    });

    test("respects custom quality parameter for video in playlist", () => {
      const url =
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf";
      const result = getYouTubeThumbnail(url, "hqdefault");
      expect(result).toBe(
        "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
      );
    });
  });

  describe("Invalid URLs", () => {
    test("returns null for invalid YouTube URL", () => {
      const url = "https://www.youtube.com/invalid";
      const result = getYouTubeThumbnail(url);
      expect(result).toBeNull();
    });

    test("returns null for non-YouTube URL", () => {
      const url = "https://www.vimeo.com/123456";
      const result = getYouTubeThumbnail(url);
      expect(result).toBeNull();
    });

    test("returns null for empty string", () => {
      const url = "";
      const result = getYouTubeThumbnail(url);
      expect(result).toBeNull();
    });

    test("returns null for URL with invalid video ID length", () => {
      const url = "https://www.youtube.com/watch?v=short";
      const result = getYouTubeThumbnail(url);
      expect(result).toBeNull();
    });
  });

  describe("Edge Cases", () => {
    test("handles video ID with dashes and underscores", () => {
      const url = "https://www.youtube.com/watch?v=_-abc123DEF";
      const result = getYouTubeThumbnail(url);
      expect(result).toBe(
        "https://img.youtube.com/vi/_-abc123DEF/mqdefault.jpg",
      );
    });

    test("handles playlist ID with various characters", () => {
      const url = "https://www.youtube.com/playlist?list=PL_abc-123_DEF";
      const result = getYouTubeThumbnail(url);
      expect(result).toBe(
        "https://img.youtube.com/vi_webp/PL_abc-123_DEF/mqdefault.webp",
      );
    });

    test("prioritizes video ID over playlist when both present", () => {
      const url =
        "https://www.youtube.com/watch?v=dQw4w9WgXcQ&list=PLrAXtmErZgOeiKm4sgNOknGvNjby9efdf";
      const result = getYouTubeThumbnail(url);
      // Should return video thumbnail, not playlist thumbnail
      expect(result).toBe(
        "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg",
      );
    });
  });
});
