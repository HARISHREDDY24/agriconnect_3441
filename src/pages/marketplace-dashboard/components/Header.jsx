import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Icon from "components/AppIcon";
import LoginModal from "pages/landing-page-with-login-signup/components/LoginModal";

const Header = () => {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    if (isNotificationsOpen) setIsNotificationsOpen(false);
  };

  const toggleNotifications = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
    if (isMenuOpen) setIsMenuOpen(false);
  };

  const handleSignOut = () => {
    // Add actual authentication logic here
    localStorage.removeItem("authToken");
    setIsMenuOpen(false);
    navigate("/login");
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

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <NavLink
              to="/landing-page-with-login-signup"
              className={({ isActive }) =>
                `text-text-secondary hover:text-primary transition-colors ${isActive ? "text-primary font-medium" : ""
                }`
              }
            >
              Home
            </NavLink>
            <NavLink
              to="/marketplace-dashboard"
              className={({ isActive }) =>
                `text-text-secondary hover:text-primary transition-colors ${isActive ? "text-primary font-medium" : ""
                }`
              }
            >
              Marketplace
            </NavLink>
            <NavLink
              to="/crop-doctor-ai-analysis"
              className={({ isActive }) =>
                `text-text-secondary hover:text-primary transition-colors ${isActive ? "text-primary font-medium" : ""
                }`
              }
            >
              Crop Doctor
            </NavLink>
          </nav>

          {/* User Actions */}
          <div className="flex items-center gap-2">
            {/* Notifications */}
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-full hover:bg-surface transition-colors relative"
                aria-label="Notifications"
              >
                <Icon name="Bell" size={20} />
                <span className="absolute top-1 right-1 w-2 h-2 bg-danger rounded-full"></span>
              </button>

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
                              className={
                                notification.iconColor === "primary" ? "text-primary" :
                                  notification.iconColor === "info" ? "text-info" :
                                    notification.iconColor === "success" ? "text-success" :
                                      "text-warning"
                              }
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

            {/* User Menu */}
            <div className="relative">
              <button
                onClick={toggleMenu}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-surface transition-colors"
                aria-label="User menu"
              >
                <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
                  <span className="text-sm font-medium">H</span>
                </div>
                <span className="hidden md:inline text-sm font-medium">
HARISH                </span>
                <Icon name="ChevronDown" size={16} />
              </button>

              {isMenuOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-30"
                >
                  <div className="p-3 border-b border-border">
                    <p className="font-medium">HARISH</p>
                    <p className="text-xs text-text-secondary">
                      harish.singh@example.com
                    </p>
                  </div>
                  <div>
                    <Link to="/profile_data" className="flex items-center gap-2 p-3 hover:bg-surface transition-colors" ><Icon name={"User"} size={16} /> Profile </Link>
                    {menuItems.map((item) => (
                      <Link
                        key={item.label}
                        to={item.path}
                        onClick={() => setIsMenuOpen(false)}
                        className="flex items-center gap-2 p-3 hover:bg-surface transition-colors"
                      >
                        <Icon name={item.icon} size={16} />
                        <span>{item.label}</span>
                      </Link>
                    ))}
                    <button
                      onClick={handleSignOut}
                      className="flex items-center gap-2 p-3 hover:bg-surface transition-colors text-danger w-full text-left"
                    >
                      <Icon name="LogOut" size={16} />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              className="p-2 rounded-md md:hidden hover:bg-surface transition-colors"
              onClick={() => {
                setIsMobileMenuOpen(!isMobileMenuOpen);
                setIsMenuOpen(false);
              }}
              aria-label="Menu"
            >
              <Icon name={isMobileMenuOpen ? "X" : "Menu"} size={20} />
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden mt-3 py-2 border-t border-border"
          >
            <nav className="flex flex-col gap-2">
              <NavLink
                to="/landing-page-with-login-signup"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `p-2 hover:bg-surface rounded-md transition-colors ${isActive ? "bg-surface text-primary" : ""
                  }`
                }
              >
                Home
              </NavLink>
              <NavLink
                to="/marketplace-dashboard"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `p-2 hover:bg-surface rounded-md transition-colors ${isActive ? "bg-surface text-primary" : ""
                  }`
                }
              >
                Marketplace
              </NavLink>
              <NavLink
                to="/crop-doctor-ai-analysis"
                onClick={() => setIsMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `p-2 hover:bg-surface rounded-md transition-colors ${isActive ? "bg-surface text-primary" : ""
                  }`
                }
              >
                Crop Doctor
              </NavLink>
            </nav>
          </motion.div>
        )}
      </div>
    </header>
  );
};

// Mock Data
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
    title: "Your listing 'Organic Wheat' has 3 new inquiries",
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
  // { label: "Profile", icon: "User", path: "/profile" },
  { label: "My Listings", icon: "Package", path: "/my-listings" },
  { label: "Orders", icon: "ShoppingCart", path: "/orders" },
  { label: "Settings", icon: "Settings", path: "/settings" },
];

export default Header;





//  import React, { useState } from "react";
//  import { Link } from "react-router-dom";
//  import { motion } from "framer-motion";
//  import Icon from "../../../components/AppIcon";

// const Header = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
//   const [userName, setUserName] = useState(localStorage.getItem("signupName") || "");
//   const [userEmail, setUserEmail] = useState(localStorage.getItem("signupEmail") || "");

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//     if (isNotificationsOpen) setIsNotificationsOpen(false);
//   };

//   const toggleNotifications = () => {
//     setIsNotificationsOpen(!isNotificationsOpen);
//     if (isMenuOpen) setIsMenuOpen(false);
//   };

//   const handleSignOut = () => {
//     // Clear user data from localStorage
//     localStorage.removeItem("signupName");
//     localStorage.removeItem("signupEmail");
//     localStorage.removeItem("signupUserType");
//     // Reload the page to reset the application state
//     window.location.reload();
//   };

//   // Get user initials
//   const getInitials = () => {
//     if (!userName) return "GU";
//     const names = userName.split(" ");
//     return names
//       .map((name) => name[0])
//       .join("")
//       .toUpperCase();
//   };

//   return (
//     <header className="bg-white shadow-sm sticky top-0 z-20">
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex justify-between items-center">
//           {/* Logo and title - unchanged */}

//           {/* User actions */}
//           <div className="flex items-center gap-2">
//             {/* Notifications dropdown - unchanged */}

//             <div className="relative">
//               <button
//                 onClick={toggleMenu}
//                 className="flex items-center gap-2 p-1 rounded-full hover:bg-surface transition-colors"
//                 aria-label="User menu"
//               >
//                 <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center">
//                   <span className="text-sm font-medium">{getInitials()}</span>
//                 </div>
//                 <span className="hidden md:inline text-sm font-medium">
//                   {userName || "Guest"}
//                 </span>
//                 <Icon name="ChevronDown" size={16} />
//               </button>

//               {/* User menu dropdown */}
//               {isMenuOpen && (
//                 <motion.div
//                   initial={{ opacity: 0, y: 10 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: 10 }}
//                   className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg overflow-hidden z-30"
//                 >
//                   <div className="p-3 border-b border-border">
//                     <p className="font-medium">{userName || "Guest User"}</p>
//                     <p className="text-xs text-text-secondary">
//                       {userEmail || "No email available"}
//                     </p>
//                   </div>
//                   <div>
//                     {menuItems.map((item) => (
//                       <Link
//                         key={item.label}
//                         to={item.path}
//                         className="flex items-center gap-2 p-3 hover:bg-surface transition-colors"
//                       >
//                         <Icon name={item.icon} size={16} />
//                         <span>{item.label}</span>
//                       </Link>
//                     ))}
//                     <button
//                       className="flex items-center gap-2 p-3 hover:bg-surface transition-colors text-danger w-full text-left"
//                       onClick={handleSignOut}
//                     >
//                       <Icon name="LogOut" size={16} />
//                       <span>Sign Out</span>
//                     </button>
//                   </div>
//                 </motion.div>
//               )}
//             </div>

//             {/* Mobile menu button - unchanged */}
//           </div>
//         </div>

//         {/* Mobile navigation - unchanged */}
//       </div>
//     </header>
//   );
// };

// // Rest of the code (mock data, exports) remains the same