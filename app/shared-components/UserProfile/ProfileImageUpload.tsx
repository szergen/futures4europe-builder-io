'use client';
import React, { useState, useRef } from 'react';
import ImageCropper from './ImageCropper';

interface ProfileImageUploadProps {
  currentImageUrl?: string;
  onImageUpdate: (file: File) => Promise<void>;
}

const ProfileImageUpload = ({
  currentImageUrl,
  onImageUpdate,
}: ProfileImageUploadProps) => {
  const [showCropper, setShowCropper] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setSelectedImage(reader.result as string);
        setShowCropper(true);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleCrop = async (croppedImage: string) => {
    // Convert base64 to file
    const response = await fetch(croppedImage);
    const blob = await response.blob();
    const file = new File([blob], 'profile-image.jpg', { type: 'image/jpeg' });
    await onImageUpdate(file);
    setShowCropper(false);
    setSelectedImage(null);
  };

  const handleCancel = () => {
    setShowCropper(false);
    setSelectedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <div className="relative">
      <div className="w-32 h-32 rounded-full overflow-hidden border-2 border-gray-200">
        <img
          src={currentImageUrl || '/default-profile.jpg'}
          alt="Profile"
          className="w-full h-full object-cover"
        />
      </div>

      <input
        type="file"
        ref={fileInputRef}
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      <button
        onClick={() => fileInputRef.current?.click()}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Change Photo
      </button>

      {showCropper && selectedImage && (
        <ImageCropper
          image={selectedImage}
          onCrop={handleCrop}
          onCancel={handleCancel}
        />
      )}
    </div>
  );
};

export default ProfileImageUpload;
