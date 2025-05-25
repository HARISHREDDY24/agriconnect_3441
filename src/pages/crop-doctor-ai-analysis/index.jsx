import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../components/AppIcon";
import ImageUploader from "./components/ImageUploader";
import ProcessingAnimation from "./components/ProcessingAnimation";
import ResultsDisplay from "./components/ResultsDisplay";
import HistorySection from "./components/HistorySection";
import Navbar from "./components/Navbar";

const CropDoctorAIAnalysis = () => {
  const [currentState, setCurrentState] = useState("upload");
  const [selectedImage, setSelectedImage] = useState(null);
  const [analysisResults, setAnalysisResults] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [analysisHistory, setAnalysisHistory] = useState([]);

  const handleImageSelect = (file) => {
    setSelectedImage(file);
    setUploadProgress(0);

    // Simulate upload progress
    const interval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setCurrentState("processing");

          // Simulate processing time
          setTimeout(() => {
            const results = {
              ...mockAnalysisResults,
              date: new Date().toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })
            };

            setAnalysisResults(results);
            setAnalysisHistory(prev => [{
              image: file,
              cropType: results.cropType,
              date: results.date,
              analysis: results
            }, ...prev]);
            setCurrentState("results");
          }, 3000);

          return 100;
        }
        return prev + 10;
      });
    }, 300);
  };

  const handleReset = () => {
    setSelectedImage(null);
    setAnalysisResults(null);
    setCurrentState("upload");
    setUploadProgress(0);
  };

  return (
    <div className="min-h-screen bg-surface">
      <Navbar />

      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-h2 font-display font-bold text-text-primary mb-2">
            Crop Doctor AI Analysis
          </h1>
          <p className="text-text-secondary max-w-3xl">
            Upload images of your crops to get instant AI-powered diagnosis of diseases,
            pests, and nutrient deficiencies, along with recommended treatments.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-md p-6 mb-8">
              {currentState === "upload" && (
                <ImageUploader
                  onImageSelect={handleImageSelect}
                  uploadProgress={uploadProgress}
                />
              )}

              {currentState === "processing" && (
                <ProcessingAnimation
                  image={selectedImage}
                  onCancel={handleReset}
                />
              )}

              {currentState === "results" && (
                <ResultsDisplay
                  results={analysisResults}
                  image={selectedImage}
                  onAnalyzeAnother={handleReset}
                />
              )}
            </div>

            {currentState === "results" && (
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-h4 font-semibold text-text-primary mb-4">
                  Recommended Actions
                </h2>
                <div className="space-y-4">
                  {analysisResults.recommendations.map((recommendation, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="flex items-start gap-3 p-4 rounded-md bg-surface"
                    >
                      <div className="bg-primary bg-opacity-10 p-2 rounded-full">
                        <Icon
                          name={recommendation.icon}
                          size={20}
                          className="text-primary"
                        />
                      </div>
                      <div>
                        <h3 className="font-medium text-text-primary">
                          {recommendation.title}
                        </h3>
                        <p className="text-text-secondary text-sm mt-1">
                          {recommendation.description}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div>
            <HistorySection
              historyData={analysisHistory}
              onSelectHistory={(result) => {
                setSelectedImage(result.image);
                setAnalysisResults(result.analysis);
                setCurrentState("results");
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

const mockAnalysisResults = {
  cropType: "Tomato",
  detectedIssue: "Tomato Late Blight",
  confidence: 92,
  severity: "High",
  description: "Late blight is a destructive disease of tomato and potato that can kill plants within days if weather conditions are favorable and the disease is not controlled. The disease is caused by the fungus-like oomycete pathogen Phytophthora infestans.",
  symptoms: [
    "Water-soaked spots on leaves that quickly turn brown",
    "White fuzzy growth on the underside of leaves",
    "Dark brown lesions on stems",
    "Firm, dark, greasy-looking lesions on fruits"
  ],
  recommendations: [
    {
      icon: "Umbrella",
      title: "Apply Fungicide",
      description: "Apply copper-based fungicide or chlorothalonil as soon as possible. Repeat application every 7-10 days during humid weather."
    },
    {
      icon: "Scissors",
      title: "Remove Infected Plants",
      description: "Remove and destroy all infected plant material to prevent spread. Do not compost infected plants."
    },
    {
      icon: "Droplets",
      title: "Adjust Watering",
      description: "Water at the base of plants in the morning so leaves can dry during the day. Avoid overhead watering."
    },
    {
      icon: "Wind",
      title: "Improve Air Circulation",
      description: "Ensure adequate spacing between plants to improve air circulation and reduce humidity around plants."
    }
  ],
  preventiveMeasures: [
    "Plant resistant varieties in future seasons",
    "Rotate crops - avoid planting tomatoes or potatoes in the same location for 3-4 years",
    "Use disease-free seeds and transplants",
    "Apply preventive fungicides during humid weather"
  ]
};

export default CropDoctorAIAnalysis;