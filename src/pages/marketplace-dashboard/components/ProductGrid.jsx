import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";
import Image from "../../../components/AppImage";

const ProductGrid = ({ products, onProductClick }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <motion.div
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {products.map((product) => (
        <motion.div
          key={product.id}
          variants={itemVariants}
          className="card card-interactive overflow-hidden"
          whileHover={{ y: -5 }}
          onClick={() => onProductClick(product.id)}
        >
          <div className="relative h-48 overflow-hidden">
            <Image
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover hover:scale-110 transition-transform"
            />
            <span className="absolute top-3 left-3 bg-white/90 text-xs px-2 py-1 rounded-full">
              {product.category}
            </span>
          </div>

          <div className="p-4">
            <div className="flex justify-between mb-2">
              <h3 className="text-h4 font-medium">{product.name}</h3>
              <div className="flex items-center text-warning">
                <Icon name="Star" size={16} />
                <span className="ml-1 text-sm">{product.seller.rating}</span>
              </div>
            </div>

            <p className="text-sm text-text-secondary line-clamp-2 mb-3">
              {product.description}
            </p>

            <div className="flex justify-between mb-3">
              <div>
                <span className="text-h4 font-semibold text-primary">
                  ₹{product.price}
                </span>
                <span className="text-sm ml-1">/{product.unit}</span>
              </div>
              <div className="text-sm">
                Qty: {product.quantity} {product.unit}
              </div>
            </div>

            <div className="flex justify-between text-sm">
              <div className="flex items-center">
                <Icon name="MapPin" size={14} />
                <span className="ml-1">{product.location}</span>
              </div>
              <span className="text-text-tertiary">
                {new Date(product.postedDate).toLocaleDateString("en-IN")}
              </span>
            </div>
          </div>
        </motion.div>
      ))}
    </motion.div>
  );
};

export default ProductGrid;