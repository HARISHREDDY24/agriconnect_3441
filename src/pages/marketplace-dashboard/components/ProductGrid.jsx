import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ProductGrid = ({ products, onProductClick }) => {
  // Animation variants for staggered animations
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <ProductCard
          key={product.id}
          product={product}
          onClick={() => onProductClick(product.id)}
          variants={itemVariants}
        />
      ))}
    </motion.div>
  );
};

const ProductCard = ({ product, onClick, variants }) => {
  const formattedDate = new Date(product.postedDate).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });

  const formattedPrice = new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(product.price);

  return (
    <motion.div
      className="card card-interactive overflow-hidden"
      variants={variants}
      whileHover={{ y: -5 }}
      onClick={onClick}
    >
      <div className="relative">
        <div className="h-48 overflow-hidden">
          <Image
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
          />
        </div>
        
        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span className="bg-white bg-opacity-90 text-text-primary text-xs px-2 py-1 rounded-full capitalize">
            {product.category}
          </span>
        </div>
        
        {/* Quick action buttons that appear on hover */}
        <div className="absolute top-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <button 
            className="bg-white rounded-full p-2 shadow-sm hover:bg-primary hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Handle favorite action
            }}
            aria-label="Add to favorites"
          >
            <Icon name="Heart" size={16} />
          </button>
          <button 
            className="bg-white rounded-full p-2 shadow-sm hover:bg-primary hover:text-white transition-colors"
            onClick={(e) => {
              e.stopPropagation();
              // Handle share action
            }}
            aria-label="Share"
          >
            <Icon name="Share2" size={16} />
          </button>
        </div>
      </div>
      
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-h4 font-medium text-text-primary">{product.name}</h3>
          <div className="flex items-center text-warning">
            <Icon name="Star" size={16} className="fill-current" />
            <span className="ml-1 text-sm">{product.seller.rating}</span>
          </div>
        </div>
        
        <p className="text-text-secondary text-sm mb-3 line-clamp-2">
          {product.description}
        </p>
        
        <div className="flex justify-between items-center mb-3">
          <div>
            <span className="text-h4 font-semibold text-primary">{formattedPrice}</span>
            <span className="text-text-secondary text-sm ml-1">/ {product.unit}</span>
          </div>
          <div className="text-text-secondary text-sm">
            Qty: {product.quantity} {product.unit}
          </div>
        </div>
        
        <div className="flex justify-between items-center text-sm">
          <div className="flex items-center text-text-secondary">
            <Icon name="MapPin" size={14} className="mr-1" />
            <span>{product.location}</span>
          </div>
          <div className="text-text-tertiary">
            {formattedDate}
          </div>
        </div>
        
        <div className="mt-4 pt-3 border-t border-border flex items-center">
          <div className="flex items-center">
            <div className="w-6 h-6 rounded-full bg-primary text-white flex items-center justify-center text-xs">
              {product.seller.name.charAt(0)}
            </div>
            <span className="ml-2 text-sm font-medium">{product.seller.name}</span>
          </div>
          {product.seller.verified && (
            <div className="ml-2 text-success flex items-center">
              <Icon name="CheckCircle" size={14} className="fill-current" />
              <span className="ml-1 text-xs">Verified</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProductGrid;