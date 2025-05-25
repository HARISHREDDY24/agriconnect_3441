import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ProcessingAnimation = ({ image, onCancel }) => {
  return (
    <div className="flex flex-col items-center">
      <h2 className="text-h3 font-semibold text-text-primary mb-6">
        Analyzing Your Crop
      </h2>
      
      <div className="relative w-full max-w-md h-64 rounded-lg overflow-hidden mb-6">
        <Image
          src={image?.preview}
          alt="Crop image being analyzed"
          className="w-full h-full object-cover"
        />
        
        <motion.div
          className="absolute top-0 left-0 w-full h-1 bg-primary bg-opacity-70"
          animate={{ top: ["0%", "100%", "0%"] }}
          transition={{ 
            duration: 3, 
            repeat: Infinity,
            ease: "linear"
          }}
        />
        
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 rounded-full bg-primary bg-opacity-60"
              initial={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: 0
              }}
              animate={{ 
                x: Math.random() * 100 + "%", 
                y: Math.random() * 100 + "%",
                opacity: [0, 1, 0]
              }}
              transition={{ 
                duration: 2 + Math.random() * 2,
                repeat: Infinity,
                repeatType: "loop",
                delay: Math.random() * 2
              }}
            />
          ))}
        </div>
        
        <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
          <div className="text-center">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="mx-auto mb-2"
            >
              <Icon name="Loader2" size={36} className="text-white" />
            </motion.div>
            <p className="text-white font-medium">Processing...</p>
          </div>
        </div>
      </div>
      
      <div className="text-center max-w-md">
        <p className="text-text-secondary mb-6">
          Our AI is analyzing your crop image to identify diseases, pests, and nutrient deficiencies. 
          This usually takes 15-30 seconds.
        </p>
        
        <motion.div
          className="flex justify-center items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <button
            onClick={onCancel}
            className="btn btn-secondary px-4 py-2"
          >
            Cancel
          </button>
        </motion.div>
      </div>
      
      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 w-full max-w-2xl">
        {processingSteps.map((step, index) => (
          <motion.div
            key={index}
            className="bg-surface p-4 rounded-lg text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
          >
            <div className="flex justify-center mb-2">
              <Icon name={step.icon} size={24} className="text-primary" />
            </div>
            <h3 className="text-sm font-medium text-text-primary mb-1">
              {step.title}
            </h3>
            <p className="text-xs text-text-secondary">
              {step.description}
            </p>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

const processingSteps = [
  {
    icon: "ScanLine",
    title: "Image Analysis",
    description: "Scanning image for visual patterns and symptoms"
  },
  {
    icon: "Microscope",
    title: "Disease Detection",
    description: "Identifying potential diseases and pests"
  },
  {
    icon: "Pill",
    title: "Treatment Matching",
    description: "Finding effective treatment options"
  }
];

export default ProcessingAnimation;