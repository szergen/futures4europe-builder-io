'use client';
import React, { useState } from 'react';
import { Cropper } from 'react-advanced-cropper';
import 'react-advanced-cropper/dist/style.css';

interface ImageCropperProps {
  image: string;
  onCrop: (croppedImage: string) => void;
  onCancel: () => void;
}

const ImageCropper = ({ image, onCrop, onCancel }: ImageCropperProps) => {
  const [cropperRef, setCropperRef] = useState<any>(null);

  const handleCrop = () => {
    if (cropperRef) {
      const canvas = cropperRef.getCanvas();
      if (canvas) {
        const croppedImage = canvas.toDataURL();
        onCrop(croppedImage);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-4 w-full max-w-2xl">
        <div className="mb-4">
          <h2 className="text-xl font-semibold">Crop Profile Image</h2>
        </div>
        <div className="h-[400px] mb-4">
          <Cropper
            src={image}
            className="h-full"
            stencilProps={{ aspectRatio: 1 }}
            onUpdate={(cropper) => setCropperRef(cropper)}
          />
        </div>

        <div className="flex justify-end gap-2">
          <button
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleCrop}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Crop
          </button>
        </div>
      </div>
    </div>
  );
};

export default ImageCropper;
