import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const HistorySection = ({ onSelectHistory, historyData }) => {
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
        {historyData.map((item, index) => (
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
                <span className={`text-xs px-2 py-0.5 rounded-full ${item.analysis.severity === "High" ? "bg-danger bg-opacity-10 text-danger"
                    : item.analysis.severity === "Medium" ? "bg-warning bg-opacity-10 text-warning" : "bg-success bg-opacity-10 text-success"
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

export default HistorySection;