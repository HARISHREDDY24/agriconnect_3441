import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  return (
    <nav className="bg-white shadow-sm">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center gap-2">
              <div className="bg-primary rounded-md p-1">
                <Icon name="Sprout" size={24} className="text-white" />
              </div>
              <span className="font-display font-bold text-lg text-text-primary">
                AgriConnect
              </span>
            </Link>
          </div>
          
          <div className="hidden md:flex items-center space-x-4">
            <NavLink to="/landing-page-with-login-signup" label="Home" icon="Home" />
            <NavLink to="/marketplace-dashboard" label="Marketplace" icon="ShoppingBag" />
            <NavLink to="/crop-doctor-ai-analysis" label="Crop Doctor" icon="Stethoscope" isActive />
            
            <div className="ml-4 flex items-center gap-3">
              <button className="p-2 rounded-full hover:bg-surface transition-colors">
                <Icon name="Bell" size={20} className="text-text-secondary" />
              </button>
              
              <div className="relative">
                <button className="flex items-center gap-2 py-1 px-2 rounded-full hover:bg-surface transition-colors">
                  <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    John Farmer
                  </span>
                  <Icon name="ChevronDown" size={16} className="text-text-tertiary" />
                </button>
              </div>
            </div>
          </div>
          
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md hover:bg-surface transition-colors"
            >
              <Icon 
                name={isMobileMenuOpen ? "X" : "Menu"} 
                size={24} 
                className="text-text-primary"
              />
            </button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t border-border"
          >
            <div className="container mx-auto px-4 py-3 space-y-1">
              <MobileNavLink 
                to="/landing-page-with-login-signup" 
                label="Home" 
                icon="Home" 
              />
              <MobileNavLink 
                to="/marketplace-dashboard" 
                label="Marketplace" 
                icon="ShoppingBag" 
              />
              <MobileNavLink 
                to="/crop-doctor-ai-analysis" 
                label="Crop Doctor" 
                icon="Stethoscope" 
                isActive 
              />
              
              <div className="pt-2 mt-2 border-t border-border">
                <div className="flex items-center gap-3 p-2">
                  <div className="w-8 h-8 rounded-full bg-primary bg-opacity-10 flex items-center justify-center">
                    <Icon name="User" size={16} className="text-primary" />
                  </div>
                  <span className="text-sm font-medium text-text-primary">
                    John Farmer
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const NavLink = ({ to, label, icon, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-2 px-3 py-2 rounded-md transition-colors ${
        isActive 
          ? "bg-primary bg-opacity-10 text-primary" :"text-text-secondary hover:bg-surface hover:text-text-primary"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon name={icon} size={18} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

const MobileNavLink = ({ to, label, icon, isActive }) => {
  return (
    <Link
      to={to}
      className={`flex items-center gap-3 p-2 rounded-md transition-colors ${
        isActive 
          ? "bg-primary bg-opacity-10 text-primary" :"text-text-secondary hover:bg-surface hover:text-text-primary"
      }`}
      aria-current={isActive ? "page" : undefined}
    >
      <Icon name={icon} size={20} />
      <span className="font-medium">{label}</span>
    </Link>
  );
};

export default Navbar;