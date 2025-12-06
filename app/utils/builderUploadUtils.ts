/**
 * Builder.io File Upload Utilities
 *
 * This module provides functions to upload files to Builder.io's asset library.
 * It replaces the previous Wix upload functionality.
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
}

/**
 * Uploads a file to Builder.io's asset library
 *
 * @param file - The file to upload
 * @param uploadPath - The folder path for organizing uploads (used to determine folder)
 * @param options - Additional upload options
 * @returns Promise with the upload response containing the file URL
 */
async function uploadFileToBuilder(
  file: File,
  uploadPath: string = "/uploads/",
  options: UploadOptions = {}
): Promise<BuilderUploadResponse> {
  console.log("[Builder Upload] File selected:", file.name);
  console.log("[Builder Upload] Upload path:", uploadPath);

  try {
    // Create FormData for the upload
    const formData = new FormData();
    formData.append("file", file);
    formData.append("fileName", options.fileName || file.name);

    // Use uploadPath as a folder identifier (sanitize it)
    const folderName = uploadPath.replace(/^\/|\/$/g, "").replace(/\//g, "-");
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
        `Upload failed: ${errorData.message || response.statusText}`
      );
    }

    const result = await response.json();
    console.log("[Builder Upload] Upload successful:", result);

    // Map the Builder.io response to match the expected interface
    // Builder.io returns the URL directly in the response
    return {
      url: result.url || result,
      displayName: options.fileName || file.name,
      sizeInBytes: file.size,
      mimeType: file.type,
    };
  } catch (error) {
    console.error("[Builder Upload] Error uploading file:", error);
    throw error;
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
  altText?: string
): Promise<BuilderUploadResponse> {
  return uploadFileToBuilder(file, uploadPath, {
    altText: altText || file.name,
  });
}

export { uploadFileToBuilder, uploadImageToBuilder };
