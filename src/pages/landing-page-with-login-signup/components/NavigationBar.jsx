import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const NavigationBar = ({ isAuthenticated, user, onLogin, onSignup, onLogout }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white bg-opacity-90 backdrop-blur-md shadow-sm"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link to="/" className="flex items-center">
            <div className="flex items-center">
              <Icon name="Leaf" size={28} className="text-primary mr-2" />
              <span className="font-display font-bold text-xl text-text-primary">
                AgriConnect
              </span>
            </div>
          </Link>

          <div className="hidden md:flex items-center space-x-8">
            <NavLinks />

            <div className="flex items-center space-x-4">
              {isAuthenticated ? (
                <div className="flex items-center">
                  <div className="relative group">
                    <button className="flex items-center space-x-2 text-text-primary hover:text-primary transition-colors">
                      <span>Hi, {user?.name?.split(" ")[0]}</span>
                      <Icon name="ChevronDown" size={16} />
                    </button>
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                      <Link
                        to="/marketplace-dashboard"
                        className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-primary"
                      >
                        Dashboard
                      </Link>
                      <Link
                        to="/crop-doctor-ai-analysis"
                        className="block px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-primary"
                      >
                        Crop Doctor
                      </Link>
                      <button
                        onClick={onLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-text-secondary hover:bg-surface hover:text-danger"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <>
                  <button
                    onClick={onLogin}
                    className="text-text-primary hover:text-primary transition-colors"
                  >
                    Login
                  </button>
                  <button
                    onClick={onSignup}
                    className="btn btn-primary px-4 py-2"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>

          <button
            className="md:hidden text-text-primary"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={24} />
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <motion.div
          className="md:hidden bg-white border-t border-border"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
            <MobileNavLinks setIsMobileMenuOpen={setIsMobileMenuOpen} />

            <div className="pt-4 border-t border-border flex flex-col space-y-3">
              {isAuthenticated ? (
                <>
                  <div className="flex items-center mb-2">
                    <div className="w-8 h-8 rounded-full bg-primary bg-opacity-20 flex items-center justify-center mr-2">
                      <span className="text-primary font-medium">
                        {user?.name?.charAt(0)}
                      </span>
                    </div>
                    <span className="text-text-primary">
                      Hi, {user?.name?.split(" ")[0]}
                    </span>
                  </div>
                  <Link
                    to="/marketplace-dashboard"
                    className="flex items-center text-text-secondary hover:text-primary py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name="LayoutDashboard" size={18} className="mr-2" />
                    Dashboard
                  </Link>
                  <Link
                    to="/crop-doctor-ai-analysis"
                    className="flex items-center text-text-secondary hover:text-primary py-2"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <Icon name="Microscope" size={18} className="mr-2" />
                    Crop Doctor
                  </Link>
                  <button
                    onClick={() => {
                      onLogout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="flex items-center text-danger py-2"
                  >
                    <Icon name="LogOut" size={18} className="mr-2" />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => {
                      onLogin();
                      setIsMobileMenuOpen(false);
                    }}
                    className="btn btn-secondary w-full py-2"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => {
                      onSignup();
                      setIsMobileMenuOpen(false);
                    }}
                    className="btn btn-primary w-full py-2"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </div>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
};

const NavLinks = () => {
  return (
    <>
      <a
        href="#features"
        className="text-text-primary hover:text-primary transition-colors"
      >
        Features
      </a>
      <a
        href="#how-it-works"
        className="text-text-primary hover:text-primary transition-colors"
      >
        How It Works
      </a>
      <a
        href="#testimonials"
        className="text-text-primary hover:text-primary transition-colors"
      >
        Testimonials
      </a>
    </>
  );
};

const MobileNavLinks = ({ setIsMobileMenuOpen }) => {
  return (
    <>
      <a
        href="#features"
        className="text-text-primary hover:text-primary py-2"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Features
      </a>
      <a
        href="#how-it-works"
        className="text-text-primary hover:text-primary py-2"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        How It Works
      </a>
      <a
        href="#testimonials"
        className="text-text-primary hover:text-primary py-2"
        onClick={() => setIsMobileMenuOpen(false)}
      >
        Testimonials
      </a>
    </>
  );
};

export default NavigationBar;