import React, { useState } from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const FilterPanel = ({ filters, onFilterChange, locationPermission, requestLocation }) => {
  const [expanded, setExpanded] = useState({
    category: true,
    location: true,
    price: true,
  });

  const toggleSection = (section) => {
    setExpanded({
      ...expanded,
      [section]: !expanded[section],
    });
  };

  const handleCategoryChange = (category) => {
    onFilterChange({ cropType: category });
  };

  const handleLocationChange = (location) => {
    onFilterChange({ location });
  };

  const handlePriceRangeChange = (min, max) => {
    onFilterChange({ priceRange: [min, max] });
  };

  const handleSliderChange = (e) => {
    const value = parseInt(e.target.value);
    const [min, max] = filters.priceRange;
    
    if (e.target.id === "min-price") {
      handlePriceRangeChange(value, max);
    } else {
      handlePriceRangeChange(min, value);
    }
  };

  // Animation variants
  const sectionVariants = {
    open: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.05
      }
    },
    closed: { 
      height: 0, 
      opacity: 0,
      transition: { 
        duration: 0.3,
        when: "afterChildren",
      }
    }
  };

  const itemVariants = {
    open: { opacity: 1, y: 0 },
    closed: { opacity: 0, y: -10 }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-border p-4">
      <h2 className="text-h4 font-medium text-text-primary mb-4">Filters</h2>
      
      {/* Category filter */}
      <div className="mb-4 border-b border-border pb-4">
        <button 
          className="flex justify-between items-center w-full text-left font-medium mb-2"
          onClick={() => toggleSection("category")}
        >
          <span>Category</span>
          <Icon 
            name={expanded.category ? "ChevronUp" : "ChevronDown"} 
            size={18} 
          />
        </button>
        
        <motion.div
          variants={sectionVariants}
          initial={expanded.category ? "open" : "closed"}
          animate={expanded.category ? "open" : "closed"}
          className="overflow-hidden"
        >
          {categories.map((category) => (
            <motion.div key={category.value} variants={itemVariants} className="mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  checked={filters.cropType === category.value}
                  onChange={() => handleCategoryChange(category.value)}
                  className="form-radio text-primary focus:ring-primary h-4 w-4"
                />
                <span className="ml-2 text-text-secondary">{category.label}</span>
              </label>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Location filter */}
      <div className="mb-4 border-b border-border pb-4">
        <button 
          className="flex justify-between items-center w-full text-left font-medium mb-2"
          onClick={() => toggleSection("location")}
        >
          <span>Location</span>
          <Icon 
            name={expanded.location ? "ChevronUp" : "ChevronDown"} 
            size={18} 
          />
        </button>
        
        <motion.div
          variants={sectionVariants}
          initial={expanded.location ? "open" : "closed"}
          animate={expanded.location ? "open" : "closed"}
          className="overflow-hidden"
        >
          {locationPermission !== "granted" && (
            <motion.div variants={itemVariants} className="mb-3">
              <button
                onClick={requestLocation}
                className="flex items-center text-sm text-primary hover:underline"
              >
                <Icon name="MapPin" size={16} className="mr-1" />
                Use my current location
              </button>
              <p className="text-xs text-text-tertiary mt-1">
                Enable location for nearby results
              </p>
            </motion.div>
          )}
          
          {locations.map((location) => (
            <motion.div key={location.value} variants={itemVariants} className="mb-2">
              <label className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="location"
                  checked={filters.location === location.value}
                  onChange={() => handleLocationChange(location.value)}
                  className="form-radio text-primary focus:ring-primary h-4 w-4"
                />
                <span className="ml-2 text-text-secondary">{location.label}</span>
              </label>
            </motion.div>
          ))}
        </motion.div>
      </div>
      
      {/* Price range filter */}
      <div className="mb-4">
        <button 
          className="flex justify-between items-center w-full text-left font-medium mb-2"
          onClick={() => toggleSection("price")}
        >
          <span>Price Range</span>
          <Icon 
            name={expanded.price ? "ChevronUp" : "ChevronDown"} 
            size={18} 
          />
        </button>
        
        <motion.div
          variants={sectionVariants}
          initial={expanded.price ? "open" : "closed"}
          animate={expanded.price ? "open" : "closed"}
          className="overflow-hidden"
        >
          <motion.div variants={itemVariants}>
            <div className="flex justify-between mb-2">
              <span className="text-sm text-text-secondary">
                ₹{filters.priceRange[0]}
              </span>
              <span className="text-sm text-text-secondary">
                ₹{filters.priceRange[1]}
              </span>
            </div>
            
            <div className="mb-4">
              <input
                id="min-price"
                type="range"
                min="0"
                max="10000"
                step="100"
                value={filters.priceRange[0]}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="mb-4">
              <input
                id="max-price"
                type="range"
                min="0"
                max="10000"
                step="100"
                value={filters.priceRange[1]}
                onChange={handleSliderChange}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            
            <div className="flex gap-2">
              <div className="flex-1">
                <label htmlFor="price-min" className="text-xs text-text-tertiary">Min</label>
                <input
                  id="price-min"
                  type="number"
                  min="0"
                  max={filters.priceRange[1]}
                  value={filters.priceRange[0]}
                  onChange={(e) => handlePriceRangeChange(parseInt(e.target.value) || 0, filters.priceRange[1])}
                  className="input py-1 px-2 h-8 text-sm w-full"
                />
              </div>
              <div className="flex-1">
                <label htmlFor="price-max" className="text-xs text-text-tertiary">Max</label>
                <input
                  id="price-max"
                  type="number"
                  min={filters.priceRange[0]}
                  value={filters.priceRange[1]}
                  onChange={(e) => handlePriceRangeChange(filters.priceRange[0], parseInt(e.target.value) || 0)}
                  className="input py-1 px-2 h-8 text-sm w-full"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
      
      {/* Reset filters button */}
      <button
        onClick={() => onFilterChange({
          cropType: "all",
          location: "all",
          priceRange: [0, 10000],
        })}
        className="w-full py-2 px-4 border border-border rounded-md text-text-secondary hover:bg-surface transition-colors text-sm flex items-center justify-center"
      >
        <Icon name="RefreshCw" size={14} className="mr-2" />
        Reset Filters
      </button>
    </div>
  );
};

// Mock data
const categories = [
  { label: "All Categories", value: "all" },
  { label: "Grains", value: "grains" },
  { label: "Vegetables", value: "vegetables" },
  { label: "Fruits", value: "fruits" },
  { label: "Pulses", value: "pulses" },
  { label: "Spices", value: "spices" },
  { label: "Other", value: "other" },
];

const locations = [
  { label: "All Locations", value: "all" },
  { label: "Punjab", value: "Punjab" },
  { label: "Maharashtra", value: "Maharashtra" },
  { label: "Uttar Pradesh", value: "Uttar Pradesh" },
  { label: "Madhya Pradesh", value: "Madhya Pradesh" },
  { label: "Haryana", value: "Haryana" },
  { label: "Karnataka", value: "Karnataka" },
];

export default FilterPanel;