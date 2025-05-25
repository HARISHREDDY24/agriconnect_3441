import React, { useCallback, useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const ImageUploader = ({ onImageSelect, uploadProgress }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState(null);
  
  const handleDragEnter = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);
  
  const handleDragLeave = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);
  
  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isDragging) {
      setIsDragging(true);
    }
  }, [isDragging]);
  
  const validateFile = (file) => {
    const validTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a valid image file (JPEG, PNG, or WebP)");
      return false;
    }
    
    if (file.size > 10 * 1024 * 1024) {
      setError("Image size should be less than 10MB");
      return false;
    }
    
    setError(null);
    return true;
  };
  
  const handleDrop = useCallback((e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        const reader = new FileReader();
        reader.onload = () => {
          onImageSelect({
            file,
            preview: reader.result
          });
        };
        reader.readAsDataURL(file);
      }
    }
  }, [onImageSelect]);
  
  const handleFileSelect = (e) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      if (validateFile(file)) {
        const reader = new FileReader();
        reader.onload = () => {
          onImageSelect({
            file,
            preview: reader.result
          });
        };
        reader.readAsDataURL(file);
      }
    }
  };
  
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-h3 font-semibold text-text-primary mb-4">
        Upload Crop Image
      </h2>
      
      {uploadProgress > 0 ? (
        <div className="w-full max-w-md">
          <div className="mb-2 flex justify-between">
            <span className="text-sm text-text-secondary">Uploading...</span>
            <span className="text-sm font-medium">{uploadProgress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2.5">
            <motion.div 
              className="bg-primary h-2.5 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${uploadProgress}%` }}
              transition={{ duration: 0.3 }}
            />
          </div>
          <div className="mt-4 flex justify-center">
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              <Icon name="Upload" size={24} className="text-primary" />
            </motion.div>
          </div>
        </div>
      ) : (
        <motion.div
          className={`w-full max-w-md h-64 border-2 border-dashed rounded-lg flex flex-col items-center justify-center p-6 transition-colors ${
            isDragging 
              ? "border-primary bg-primary bg-opacity-5" :"border-border hover:border-primary hover:bg-primary hover:bg-opacity-5"
          }`}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          animate={{ 
            boxShadow: isDragging 
              ? "0 0 0 2px rgba(22, 163, 74, 0.3)" 
              : "0 0 0 0 rgba(22, 163, 74, 0)" 
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            animate={{ scale: [1, 1.05, 1] }}
            transition={{ repeat: Infinity, duration: 2 }}
            className="mb-4 text-primary"
          >
            <Icon name="Image" size={48} />
          </motion.div>
          
          <p className="text-text-primary font-medium mb-2">
            Drag and drop your image here
          </p>
          <p className="text-text-secondary text-sm mb-4 text-center">
            or click to browse from your device
          </p>
          
          <label className="btn btn-primary px-4 py-2 cursor-pointer">
            <span className="flex items-center gap-2">
              <Icon name="Upload" size={18} />
              Select Image
            </span>
            <input
              type="file"
              className="hidden"
              accept="image/jpeg,image/png,image/webp"
              onChange={handleFileSelect}
            />
          </label>
          
          {error && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-danger text-sm"
            >
              {error}
            </motion.p>
          )}
          
          <p className="mt-4 text-text-tertiary text-xs">
            Supported formats: JPEG, PNG, WebP (max 10MB)
          </p>
        </motion.div>
      )}
      
      <div className="mt-8 text-center">
        <h3 className="text-text-primary font-medium mb-2">
          How to get the best analysis results:
        </h3>
        <ul className="text-text-secondary text-sm space-y-2">
          <li className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-success" />
            Take close-up photos of affected plant parts
          </li>
          <li className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-success" />
            Ensure good lighting without shadows
          </li>
          <li className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-success" />
            Include multiple angles if possible
          </li>
          <li className="flex items-center gap-2">
            <Icon name="Check" size={16} className="text-success" />
            Make sure the affected area is clearly visible
          </li>
        </ul>
      </div>
    </div>
  );
};

export default ImageUploader;