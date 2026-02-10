/**
 * Builder.io File Upload Utilities
 *
 * This module provides functions to upload files to Builder.io's asset library.
 * Includes direct upload support to bypass Vercel's body size limits for large files.
 */

export interface BuilderUploadResponse {
  url: string;
  displayName?: string;
  sizeInBytes?: number;
  mimeType?: string;
}

export interface UploadOptions {
  /** Custom file name for the uploaded file */
  fileName?: string;
  /** Folder path/identifier in Builder.io asset library */
  folder?: string;
  /** Alt text for accessibility (useful for images) */
  altText?: string;
  /** Force direct upload even for small files (bypasses Vercel) */
  forceDirectUpload?: boolean;
}

interface UploadConfig {
  uploadUrl: string;
  apiKey: string;
  fileName?: string;
  folder?: string;
  altText?: string;
}

/**
 * Upload a file directly to Builder.io from the client
 * This bypasses any server-side body size limits (like Vercel's 4.5MB limit)
 */
async function uploadFileDirectToBuilder(
  file: File,
  folderName: string,
  options: UploadOptions = {},
): Promise<BuilderUploadResponse> {
  try {
    // Step 1: Get upload configuration from our API
    const configResponse = await fetch("/api/builder/upload-config", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fileName: options.fileName || file.name,
        folder: folderName,
        altText: options.altText,
      }),
    });

    if (!configResponse.ok) {
      throw new Error("Failed to get upload configuration");
    }

    const config: UploadConfig = await configResponse.json();

    // Step 2: Build the upload URL with query parameters
    const uploadParams = new URLSearchParams();
    uploadParams.set("name", config.fileName || file.name);
    if (config.altText) {
      uploadParams.set("altText", config.altText);
    }
    if (config.folder) {
      uploadParams.set("folder", config.folder);
    }

    const uploadUrl = `${config.uploadUrl}?${uploadParams.toString()}`;

    // Step 3: Upload directly to Builder.io from the browser
    console.log("[Builder Upload - Direct] Uploading file to Builder.io:", {
      name: file.name,
      size: (file.size / (1024 * 1024)).toFixed(2) + "MB",
      type: file.type,
      method: "direct",
    });

    const uploadResponse = await fetch(uploadUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.apiKey}`,
        "Content-Type": file.type || "application/octet-stream",
      },
      body: file,
    });

    if (!uploadResponse.ok) {
      const errorText = await uploadResponse.text();
      throw new Error(
        `Upload failed: ${uploadResponse.status} ${uploadResponse.statusText}\n${errorText}`,
      );
    }

    const result = await uploadResponse.json();
    console.log("[Builder Upload - Direct] Upload successful:", result);

    return {
      url: result.url || result,
      displayName: options.fileName || file.name,
      sizeInBytes: file.size,
      mimeType: file.type,
    };
  } catch (error) {
    console.error("[Builder Upload - Direct] Upload failed:", error);
    throw error;
  }
}

/**
 * Uploads a file to Builder.io's asset library via proxy API
 * Used for smaller files or when direct upload is not needed
 */
async function uploadFileViaProxy(
  file: File,
  folderName: string,
  options: UploadOptions = {},
): Promise<BuilderUploadResponse> {
  console.log("[Builder Upload - Proxy] File selected:", file.name);
  console.log("[Builder Upload - Proxy] Upload folder:", folderName);

  try {
    // Create FormData for the upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", options.fileName || file.name);

    if (folderName) {
      formData.append("folder", folderName);
    }

    if (options.altText) {
      formData.append("altText", options.altText);
    }

    const response = await fetch("/api/builder/upload", {
      method: "POST",
      body: formData,
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        `Upload failed: ${errorData.message || response.statusText}`,
      );
    }

    const result = await response.json();
    console.log("[Builder Upload - Proxy] Upload successful:", result);

    // Map the Builder.io response to match the expected interface
    return {
      url: result.url || result,
      displayName: options.fileName || file.name,
      sizeInBytes: file.size,
      mimeType: file.type,
    };
  } catch (error) {
    console.error("[Builder Upload - Proxy] Error uploading file:", error);
    throw error;
  }
}

/**
 * Uploads a file to Builder.io's asset library
 * Automatically chooses the best upload method:
 * - Direct upload for files > 4MB (bypasses Vercel limits)
 * - Proxy upload for files <= 4MB (faster, uses edge functions)
 *
 * @param file - The file to upload
 * @param uploadPath - The folder path for organizing uploads (used to determine folder)
 * @param options - Additional upload options
 * @returns Promise with the upload response containing the file URL
 */
async function uploadFileToBuilder(
  file: File,
  uploadPath: string = "/uploads/",
  options: UploadOptions = {},
): Promise<BuilderUploadResponse> {
  // Sanitize upload path to use as folder name
  const folderName = uploadPath.replace(/^\/|\/$/g, "").replace(/\//g, "-");

  // Determine upload method based on file size or force flag
  const fileSizeMB = file.size / (1024 * 1024);
  const useDirectUpload = options.forceDirectUpload || fileSizeMB > 4;

  if (useDirectUpload) {
    console.log(
      `[Builder Upload] Using DIRECT upload (file size: ${fileSizeMB.toFixed(
        2,
      )}MB, bypasses Vercel)`,
    );
    return uploadFileDirectToBuilder(file, folderName, options);
  } else {
    console.log(
      `[Builder Upload] Using PROXY upload (file size: ${fileSizeMB.toFixed(
        2,
      )}MB, via API route)`,
    );
    return uploadFileViaProxy(file, folderName, options);
  }
}

/**
 * Uploads an image file to Builder.io with image-specific optimizations
 *
 * @param file - The image file to upload
 * @param uploadPath - The folder path for organizing uploads
 * @param altText - Alternative text for the image
 * @returns Promise with the upload response containing the image URL
 */
async function uploadImageToBuilder(
  file: File,
  uploadPath: string = "/images/",
  altText?: string,
): Promise<BuilderUploadResponse> {
  return uploadFileToBuilder(file, uploadPath, {
    altText: altText || file.name,
  });
}

export { uploadFileToBuilder, uploadImageToBuilder };
