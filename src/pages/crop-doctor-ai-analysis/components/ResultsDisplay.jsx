import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ResultsDisplay = ({ results, image, onAnalyzeAnother }) => {
  const [expandedSection, setExpandedSection] = useState(null);
  
  const toggleSection = (section) => {
    if (expandedSection === section) {
      setExpandedSection(null);
    } else {
      setExpandedSection(section);
    }
  };
  
  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-h3 font-semibold text-text-primary">
          Analysis Results
        </h2>
        <button
          onClick={onAnalyzeAnother}
          className="btn btn-secondary px-4 py-2 flex items-center gap-2"
        >
          <Icon name="RefreshCw" size={16} />
          Analyze Another
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="relative rounded-lg overflow-hidden h-64">
          <Image
            src={image?.preview}
            alt="Analyzed crop image"
            className="w-full h-full object-cover"
          />
          
          <div className="absolute inset-0 pointer-events-none">
            <svg width="100%" height="100%" className="absolute inset-0">
              <motion.circle
                cx="60%"
                cy="40%"
                r="30"
                fill="rgba(220, 38, 38, 0.3)"
                stroke="rgba(220, 38, 38, 0.8)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
              />
              <motion.circle
                cx="30%"
                cy="60%"
                r="25"
                fill="rgba(220, 38, 38, 0.3)"
                stroke="rgba(220, 38, 38, 0.8)"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5, duration: 0.5 }}
              />
            </svg>
          </div>
        </div>
        
        <div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-danger bg-opacity-10 p-4 rounded-lg mb-4"
          >
            <div className="flex items-center gap-3 mb-2">
              <Icon name="AlertTriangle" size={24} className="text-danger" />
              <h3 className="text-lg font-semibold text-danger">
                {results.detectedIssue}
              </h3>
            </div>
            <p className="text-text-secondary text-sm">
              {results.description}
            </p>
          </motion.div>
          
          <div className="grid grid-cols-2 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="bg-surface p-4 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon name="BarChart2" size={16} className="text-primary" />
                <h4 className="text-sm font-medium text-text-primary">
                  Confidence
                </h4>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-xl font-bold text-text-primary">
                  {results.confidence}%
                </span>
                <span className="text-text-secondary text-xs mb-1">
                  match
                </span>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="bg-surface p-4 rounded-lg"
            >
              <div className="flex items-center gap-2 mb-1">
                <Icon name="AlertOctagon" size={16} className="text-warning" />
                <h4 className="text-sm font-medium text-text-primary">
                  Severity
                </h4>
              </div>
              <div className="flex items-end gap-1">
                <span className="text-xl font-bold text-warning">
                  {results.severity}
                </span>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
      
      <div className="space-y-4">
        <ResultSection
          title="Symptoms"
          icon="Stethoscope"
          items={results.symptoms}
          isExpanded={expandedSection === "symptoms"}
          onToggle={() => toggleSection("symptoms")}
        />
        
        <ResultSection
          title="Preventive Measures"
          icon="ShieldCheck"
          items={results.preventiveMeasures}
          isExpanded={expandedSection === "preventive"}
          onToggle={() => toggleSection("preventive")}
        />
      </div>
    </div>
  );
};

const ResultSection = ({ title, icon, items, isExpanded, onToggle }) => {
  return (
    <motion.div
      layout
      className="border border-border rounded-lg overflow-hidden"
    >
      <motion.button
        layout="position"
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 bg-surface"
      >
        <div className="flex items-center gap-3">
          <Icon name={icon} size={20} className="text-primary" />
          <h3 className="font-medium text-text-primary">{title}</h3>
        </div>
        <Icon
          name={isExpanded ? "ChevronUp" : "ChevronDown"}
          size={20}
          className="text-text-secondary"
        />
      </motion.button>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="overflow-hidden"
          >
            <ul className="p-4 space-y-2">
              {items.map((item, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="flex items-start gap-2"
                >
                  <Icon name="ArrowRight" size={16} className="text-primary mt-1" />
                  <span className="text-text-secondary">{item}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default ResultsDisplay;