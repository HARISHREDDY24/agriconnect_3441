import React from "react";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const AnimatedHero = ({ onLogin, onSignup }) => {
  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 relative">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        {/* Hero content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
        >
          <motion.div
            className="inline-flex items-center bg-primary bg-opacity-10 text-primary px-4 py-2 rounded-full mb-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Icon name="Zap" size={16} className="mr-2" />
            <span className="text-sm font-medium">AI-Powered Farming Solutions</span>
          </motion.div>
          
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-text-primary mb-6 leading-tight"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            Grow Smarter, <br />
            <span className="text-primary">Sell Better</span>
          </motion.h1>
          
          <motion.p
            className="text-lg text-text-secondary mb-8 max-w-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.7 }}
          >
            AgriConnect combines AI-powered crop disease detection with a direct-to-consumer marketplace, 
            helping farmers increase yields and profits.
          </motion.p>
          
          <motion.div
            className="flex flex-col sm:flex-row gap-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
          >
            <button
              onClick={onSignup}
              className="btn btn-primary px-8 py-3 text-base"
            >
              Get Started
            </button>
            <button
              onClick={onLogin}
              className="btn btn-secondary px-8 py-3 text-base"
            >
              Login
            </button>
          </motion.div>
          
          <motion.div
            className="mt-8 flex items-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.1 }}
          >
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <img
                  key={i}
                  src={`https://randomuser.me/api/portraits/${i % 2 === 0 ? 'women' : 'men'}/${20 + i}.jpg`}
                  alt="User"
                  className="w-8 h-8 rounded-full border-2 border-white"
                  onError={(e) => {
                    e.target.src = "/assets/images/no_image.png";
                  }}
                />
              ))}
            </div>
            <div className="ml-4">
              <p className="text-text-secondary text-sm">
                <span className="font-semibold text-primary">5,000+</span> farmers already joined
              </p>
            </div>
          </motion.div>
        </motion.div>
        
        {/* Hero image */}
        <motion.div
          className="relative"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
        >
          <div className="relative z-10">
            <img
              src="https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
              alt="Farmer using AgriConnect"
              className="rounded-lg shadow-lg w-full h-auto object-cover"
              onError={(e) => {
                e.target.src = "/assets/images/no_image.png";
              }}
            />
            
            {/* Floating elements */}
            <motion.div
              className="absolute -top-6 -left-6 bg-white p-4 rounded-lg shadow-md flex items-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1 }}
            >
              <div className="bg-success bg-opacity-10 p-2 rounded-full mr-3">
                <Icon name="Check" size={16} className="text-success" />
              </div>
              <div>
                <p className="text-xs text-text-tertiary">Disease detected</p>
                <p className="text-sm font-medium">Leaf Rust: 94% match</p>
              </div>
            </motion.div>
            
            <motion.div
              className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-md"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 1.2 }}
            >
              <div className="flex items-center mb-2">
                <Icon name="TrendingUp" size={16} className="text-primary mr-2" />
                <p className="text-sm font-medium">Marketplace Activity</p>
              </div>
              <p className="text-xs text-text-tertiary">Wheat prices up by</p>
              <p className="text-lg font-semibold text-success">+12.5%</p>
            </motion.div>
          </div>
          
          {/* Background decoration */}
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-full -z-10">
            <motion.div
              className="absolute top-0 right-0 w-64 h-64 bg-primary bg-opacity-10 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.5 }}
            />
            <motion.div
              className="absolute bottom-0 left-0 w-40 h-40 bg-success bg-opacity-10 rounded-full"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 1, delay: 0.7 }}
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AnimatedHero;