import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "../../../components/AppIcon";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  return (
    <header className="bg-white shadow-sm sticky top-0 z-20">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          {/* Logo and title */}
          <Link to="/" className="flex items-center gap-2">
            <motion.div
              initial={{ rotate: -10 }}
              animate={{ rotate: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Icon name="Sprout" size={28} className="text-primary" />
            </motion.div>
            <h1 className="text-h4 font-display font-semibold text-text-primary">
              AgriConnect
            </h1>
          </Link>

          {/* Navigation for desktop */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/landing-page-with-login-signup"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              Home
            </Link>
            <Link
              to="/marketplace-dashboard"
              className="text-primary font-medium"
              aria-current="page"
            >
              Marketplace
            </Link>
            <Link
              to="/crop-doctor-ai-analysis"
              className="text-text-secondary hover:text-primary transition-colors"
            >
              Crop Doctor
            </Link>
          </nav>

          {/* User actions */}
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-surface transition-colors relative"
                aria-label="Notifications"
              >
                <Icon name="Bell" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
              </button>

              {/* Notifications dropdown */}
              {isNotificationsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg overflow-hidden z-30"
                >
                  <div className="p-3 border-b border-border">
                    <h3 className="font-medium">Notifications</h3>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className="p-3 border-b border-border hover:bg-surface transition-colors cursor-pointer"
                      >
                        <div className="flex gap-3">
                          <div className="flex-shrink-0">
                            <Icon
                              name={notification.icon}
                              size={20}
                              className={`text-${notification.iconColor}`}
                            />
                          </div>
                          <div>
                            <p className="text-sm font-medium">
                              {notification.title}
                            </p>
                            <p className="text-xs text-text-secondary">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-2 text-center border-t border-border">
                    <button className="text-sm text-primary hover:underline">
                      View all notifications
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-surface transition-colors"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-sm font-medium">RS</span>
                </div>
                <span className="hidden md:inline text-sm font-medium">
                  Rahul Singh
                </span>
                <Icon name="ChevronDown" size={16} />
              </button>

              {/* User menu dropdown */}
              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-30"
                >
                  <div className="p-3 border-b border-border">
                    <p className="font-medium">Rahul Singh</p>
                    <p className="text-xs text-text-secondary">
                      rahul.singh@example.com
                    </p>
                  </div>
                  <div>
                    {menuItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        className="flex items-center gap-2 p-3 hover:bg-surface transition-colors"
                      >
                        <Icon name={item.icon} size={16} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <button className="flex items-center gap-2 p-3 hover:bg-surface transition-colors text-danger w-full text-left">
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile menu button */}
            <button
              className="p-2 rounded-md md:hidden hover:bg-surface transition-colors"
              onClick={toggleMenu}
              aria-label="Menu"
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile navigation */}
        {isMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden mt-3 py-2 border-t border-border"
          >
            <nav className="flex flex-col gap-2">
              <Link
                to="/landing-page-with-login-signup"
                className="p-2 hover:bg-surface rounded-md transition-colors"
              >
                Home
              </Link>
              <Link
                to="/marketplace-dashboard"
                className="p-2 bg-surface text-primary rounded-md"
                aria-current="page"
              >
                Marketplace
              </Link>
              <Link
                to="/crop-doctor-ai-analysis"
                className="p-2 hover:bg-surface rounded-md transition-colors"
              >
                Crop Doctor
              </Link>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

// Mock data
const notifications = [
  {
    id: 1,
    title: "New price alert for Rice in your area",
    time: "10 minutes ago",
    icon: "Tag",
    iconColor: "primary",
  },
  {
    id: 2,
    title: "Your listing \'Organic Wheat\' has 3 new inquiries",
    time: "2 hours ago",
    icon: "MessageSquare",
    iconColor: "info",
  },
  {
    id: 3,
    title: "Payment received for your Basmati Rice order",
    time: "Yesterday",
    icon: "CreditCard",
    iconColor: "success",
  },
  {
    id: 4,
    title: "Weather alert: Heavy rain expected in your region",
    time: "2 days ago",
    icon: "Cloud",
    iconColor: "warning",
  },
];

const menuItems = [
  { label: "Profile", icon: "User", path: "#" },
  { label: "My Listings", icon: "Package", path: "#" },
  { label: "Orders", icon: "ShoppingCart", path: "#" },
  { label: "Settings", icon: "Settings", path: "#" },
];

export default Header;