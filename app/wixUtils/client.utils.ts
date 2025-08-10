import { generateFileUploadUrl } from './client-side';

async function uploadFileToWix(
  file: File,
  uploadPath: string,
  isDataURL = false
) {
  console.log('File selected:', file);
  console.log('Upload path:', uploadPath);
  try {
    const generatedFileUploadUrl = await generateFileUploadUrl(
      file?.type || 'image/jpeg',
      {
        fileName: file?.name,
        filePath: uploadPath,
      }
    );

    console.log('generatedFileUploadUrl', generatedFileUploadUrl);
    console.log('File type:', file?.type);

    const uploadResponse = await fetch(
      `${generatedFileUploadUrl.uploadUrl}?filename=${file?.name}`,
      {
        method: 'PUT',
        headers: {
          'Content-Type': file?.type || 'image/jpeg',
        },
        body: file,
        mode: 'cors',
      }
    );

    if (!uploadResponse.ok) {
      throw new Error(`Upload failed: ${uploadResponse.statusText}`);
    }

    const jsonResponse = await uploadResponse.json();
    console.log('File upload response', jsonResponse.file);
    return jsonResponse.file;
  } catch (error) {
    console.error('Error uploading file', error);
    throw error;
  }
}

export { uploadFileToWix };
