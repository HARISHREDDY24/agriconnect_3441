import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const HistorySection = ({ onSelectHistory }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-h4 font-semibold text-text-primary">
          Analysis History
        </h2>
        <button className="text-primary text-sm font-medium flex items-center gap-1">
          <span>View All</span>
          <Icon name="ChevronRight" size={16} />
        </button>
      </div>
      
      <div className="space-y-4">
        {mockHistoryData.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="flex gap-3 p-3 rounded-lg hover:bg-surface cursor-pointer transition-colors"
            onClick={() => onSelectHistory(item)}
          >
            <div className="w-16 h-16 rounded-md overflow-hidden flex-shrink-0">
              <Image
                src={item.image.preview}
                alt={`History item ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            
            <div className="flex-grow min-w-0">
              <div className="flex items-center gap-2">
                <h3 className="font-medium text-text-primary text-sm truncate">
                  {item.analysis.detectedIssue}
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  item.analysis.severity === "High" ?"bg-danger bg-opacity-10 text-danger" 
                    : item.analysis.severity === "Medium" ?"bg-warning bg-opacity-10 text-warning" :"bg-success bg-opacity-10 text-success"
                }`}>
                  {item.analysis.severity}
                </span>
              </div>
              
              <p className="text-text-secondary text-xs mt-1 truncate">
                {item.cropType}
              </p>
              
              <div className="flex items-center gap-2 mt-2">
                <Icon name="Calendar" size={12} className="text-text-tertiary" />
                <span className="text-text-tertiary text-xs">
                  {item.date}
                </span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-border">
        <h3 className="text-sm font-medium text-text-primary mb-3">
          Quick Tips
        </h3>
        <ul className="space-y-3">
          <li className="flex items-start gap-2">
            <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
            <p className="text-text-secondary text-xs">
              Regular monitoring helps detect issues early before they spread.
            </p>
          </li>
          <li className="flex items-start gap-2">
            <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
            <p className="text-text-secondary text-xs">
              Save your analyses to track disease patterns over time.
            </p>
          </li>
          <li className="flex items-start gap-2">
            <Icon name="Lightbulb" size={16} className="text-warning mt-0.5" />
            <p className="text-text-secondary text-xs">
              Compare current and past analyses to evaluate treatment effectiveness.
            </p>
          </li>
        </ul>
      </div>
    </div>
  );
};

// Mock history data
const mockHistoryData = [
  {
    image: {
      preview: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
    },
    cropType: "Tomato",
    date: "June 15, 2023",
    analysis: {
      detectedIssue: "Tomato Late Blight",
      confidence: 92,
      severity: "High",
      description: "Late blight is a destructive disease of tomato and potato that can kill plants within days if weather conditions are favorable and the disease is not controlled.",
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
        }
      ],
      preventiveMeasures: [
        "Plant resistant varieties in future seasons",
        "Rotate crops - avoid planting tomatoes or potatoes in the same location for 3-4 years",
        "Use disease-free seeds and transplants",
        "Apply preventive fungicides during humid weather"
      ]
    }
  },
  {
    image: {
      preview: "https://images.pexels.com/photos/2286776/pexels-photo-2286776.jpeg?auto=compress&cs=tinysrgb&w=500"
    },
    cropType: "Rice",
    date: "May 28, 2023",
    analysis: {
      detectedIssue: "Rice Blast",
      confidence: 88,
      severity: "Medium",
      description: "Rice blast is a fungal disease that affects rice crops worldwide. It can cause lesions on all parts of the plant and significantly reduce yield.",
      symptoms: [
        "Diamond-shaped lesions on leaves",
        "Gray centers with brown margins on lesions",
        "Infected nodes turn blackish and break easily",
        "Panicle neck may rot, causing unfilled grains"
      ],
      recommendations: [
        {
          icon: "Umbrella",
          title: "Apply Fungicide",
          description: "Apply triazole or strobilurin fungicides at recommended rates. Timing is critical - apply at early signs of infection."
        },
        {
          icon: "Droplets",
          title: "Manage Water",
          description: "Maintain consistent water levels in paddy fields to reduce stress on plants."
        }
      ],
      preventiveMeasures: [
        "Plant resistant varieties",
        "Use balanced fertilization - avoid excessive nitrogen",
        "Proper spacing of plants for good air circulation",
        "Treat seeds with fungicides before planting"
      ]
    }
  },
  {
    image: {
      preview: "https://images.pixabay.com/photo/2019/05/31/11/24/potato-plant-4241494_1280.jpg?auto=compress&cs=tinysrgb&w=500"
    },
    cropType: "Potato",
    date: "April 10, 2023",
    analysis: {
      detectedIssue: "Early Blight",
      confidence: 95,
      severity: "Low",
      description: "Early blight is a common fungal disease that affects potato and tomato plants, causing characteristic bull\'s-eye patterned lesions on leaves.",
      symptoms: [
        "Dark, concentric rings forming a target pattern on leaves",
        "Yellowing of leaf tissue around lesions",
        "Lower, older leaves affected first",
        "Brown, dry areas on tubers"
      ],
      recommendations: [
        {
          icon: "Umbrella",
          title: "Apply Fungicide",
          description: "Apply chlorothalonil or copper-based fungicides every 7-10 days when conditions favor disease development."
        },
        {
          icon: "Scissors",
          title: "Remove Infected Leaves",
          description: "Remove and destroy infected leaves to reduce spread to healthy tissue."
        }
      ],
      preventiveMeasures: [
        "Rotate crops - avoid planting potatoes or tomatoes in the same location for 2-3 years",
        "Space plants properly for good air circulation",
        "Use mulch to prevent soil splash onto leaves",
        "Water at the base of plants, avoiding wetting the foliage"
      ]
    }
  }
];

export default HistorySection;