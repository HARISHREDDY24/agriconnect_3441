import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const BackgroundAnimations = () => {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {/* Floating clouds */}
      <FloatingClouds />
      
      {/* Growing plants */}
      <GrowingPlants />
      
      {/* Floating icons */}
      <FloatingIcons />
    </div>
  );
};

// Floating Clouds Component
const FloatingClouds = () => {
  const clouds = [
    { id: 1, initialX: "10%", initialY: "15%", size: 80, duration: 120 },
    { id: 2, initialX: "30%", initialY: "8%", size: 60, duration: 180 },
    { id: 3, initialX: "70%", initialY: "12%", size: 90, duration: 150 },
    { id: 4, initialX: "85%", initialY: "20%", size: 70, duration: 200 },
  ];
  
  return (
    <>
      {clouds.map((cloud) => (
        <motion.div
          key={cloud.id}
          className="absolute opacity-10"
          style={{
            left: cloud.initialX,
            top: cloud.initialY,
            width: cloud.size,
            height: cloud.size / 2,
          }}
          animate={{
            x: [0, 20, 0, -20, 0],
          }}
          transition={{
            duration: cloud.duration,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon name="Cloud" size={cloud.size} className="text-text-tertiary" />
        </motion.div>
      ))}
    </>
  );
};

// Growing Plants Component
const GrowingPlants = () => {
  const plants = [
    { id: 1, position: "left-10 bottom-0", delay: 0 },
    { id: 2, position: "left-20 bottom-0", delay: 0.5 },
    { id: 3, position: "left-1/4 bottom-0", delay: 1 },
    { id: 4, position: "right-10 bottom-0", delay: 0.2 },
    { id: 5, position: "right-20 bottom-0", delay: 0.7 },
    { id: 6, position: "right-1/4 bottom-0", delay: 1.2 },
  ];
  
  return (
    <>
      {plants.map((plant) => (
        <div key={plant.id} className={`absolute ${plant.position}`}>
          <motion.div
            className="w-1 bg-primary origin-bottom"
            initial={{ height: 0 }}
            animate={{ height: [0, 40, 60, 80] }}
            transition={{
              duration: 10,
              delay: plant.delay,
              repeat: Infinity,
              repeatDelay: 20,
            }}
          >
            <motion.div
              className="absolute -left-2 -top-4"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 2,
                delay: plant.delay + 3,
                repeat: Infinity,
                repeatDelay: 20,
              }}
            >
              <Icon name="Leaf" size={24} className="text-primary" />
            </motion.div>
          </motion.div>
        </div>
      ))}
    </>
  );
};

// Floating Icons Component
const FloatingIcons = () => {
  const icons = [
    { id: 1, name: "Droplets", position: "left-1/5 top-1/4", size: 20, color: "text-water" },
    { id: 2, name: "Sun", position: "right-1/5 top-1/3", size: 24, color: "text-warning" },
    { id: 3, name: "Wheat", position: "left-1/3 bottom-1/4", size: 22, color: "text-earth" },
    { id: 4, name: "Leaf", position: "right-1/4 bottom-1/3", size: 18, color: "text-primary" },
    { id: 5, name: "Sprout", position: "left-10 top-1/2", size: 20, color: "text-success" },
    { id: 6, name: "CloudRain", position: "right-16 top-2/3", size: 22, color: "text-info" },
  ];
  
  return (
    <>
      {icons.map((icon) => (
        <motion.div
          key={icon.id}
          className={`absolute ${icon.position} opacity-20`}
          animate={{
            y: [0, -10, 0, 10, 0],
            rotate: [0, 5, 0, -5, 0],
          }}
          transition={{
            duration: 5 + Math.random() * 5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <Icon name={icon.name} size={icon.size} className={icon.color} />
        </motion.div>
      ))}
    </>
  );
};

export default BackgroundAnimations;