import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';

const Sidebar = ({
  variant = 'expanded',
  onToggle,
  className = '',
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = useState(variant === 'collapsed');
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const location = useLocation();
  
  // Update collapsed state when variant changes
  useEffect(() => {
    setIsCollapsed(variant === 'collapsed');
  }, [variant]);
  
  // Close mobile sidebar on route change
  useEffect(() => {
    setIsMobileOpen(false);
  }, [location]);
  
  // Handle sidebar toggle
  const handleToggle = () => {
    const newCollapsedState = !isCollapsed;
    setIsCollapsed(newCollapsedState);
    if (onToggle) {
      onToggle(newCollapsedState);
    }
  };
  
  // Handle mobile toggle
  const handleMobileToggle = () => {
    setIsMobileOpen(!isMobileOpen);
  };
  
  // Navigation items with icons
  const navItems = [
    { 
      label: 'Dashboard', 
      icon: 'LayoutDashboard', 
      path: '/dashboard' 
    },
    { 
      label: 'Crop Doctor', 
      icon: 'Microscope', 
      path: '/crop-doctor-ai-analysis' 
    },
    { 
      label: 'Marketplace', 
      icon: 'ShoppingCart', 
      path: '/marketplace-dashboard' 
    },
    { 
      label: 'Products', 
      icon: 'Package', 
      path: '/product-detail-chat' 
    },
    { 
      label: 'Weather', 
      icon: 'Cloud', 
      path: '/weather' 
    },
    { 
      label: 'Calendar', 
      icon: 'Calendar', 
      path: '/calendar' 
    },
  ];
  
  // Management section
  const managementItems = [
    { 
      label: 'Farm Profile', 
      icon: 'Home', 
      path: '/farm-profile' 
    },
    { 
      label: 'Inventory', 
      icon: 'Warehouse', 
      path: '/inventory' 
    },
    { 
      label: 'Analytics', 
      icon: 'BarChart2', 
      path: '/analytics' 
    },
    { 
      label: 'Settings', 
      icon: 'Settings', 
      path: '/settings' 
    },
  ];
  
  // Determine if an item is active
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  // Sidebar width classes
  const sidebarWidthClass = isCollapsed ? 'w-20' : 'w-64';
  
  // Mobile sidebar classes
  const mobileSidebarClass = isMobileOpen ? 'translate-x-0' : '-translate-x-full';
  
  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={handleMobileToggle}
        />
      )}
      
      {/* Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-4 left-4 z-30 p-2 rounded-md bg-white shadow-md text-[var(--color-text-primary)]"
        onClick={handleMobileToggle}
        aria-label="Toggle sidebar"
      >
        <Icon name="Menu" size={24} />
      </button>
      
      {/* Sidebar */}
      <aside 
        className={`
          fixed top-0 left-0 h-full bg-white border-r border-[var(--color-border)] z-30
          transition-all duration-300 ease-in-out
          ${sidebarWidthClass}
          ${className}
          md:translate-x-0
          ${mobileSidebarClass}
        `}
        {...props}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className={`
            flex items-center justify-between h-16 px-4 border-b border-[var(--color-border)]
            ${isCollapsed ? 'justify-center' : ''}
          `}>
            {!isCollapsed && (
              <Link to="/" className="flex items-center">
                <div className="mr-2 text-[var(--color-primary)]">
                  <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16 4C9.373 4 4 9.373 4 16C4 22.627 9.373 28 16 28C22.627 28 28 22.627 28 16C28 9.373 22.627 4 16 4ZM16 6C21.523 6 26 10.477 26 16C26 21.523 21.523 26 16 26C10.477 26 6 21.523 6 16C6 10.477 10.477 6 16 6Z" fill="currentColor"/>
                    <path d="M16 8C16.552 8 17 8.448 17 9V15H23C23.552 15 24 15.448 24 16C24 16.552 23.552 17 23 17H16C15.448 17 15 16.552 15 16V9C15 8.448 15.448 8 16 8Z" fill="currentColor"/>
                    <path d="M8 16C8 15.448 8.448 15 9 15H12C12.552 15 13 15.448 13 16V19C13 19.552 12.552 20 12 20H9C8.448 20 8 19.552 8 19V16Z" fill="currentColor"/>
                    <path d="M19 19C19 18.448 19.448 18 20 18H23C23.552 18 24 18.448 24 19V22C24 22.552 23.552 23 23 23H20C19.448 23 19 22.552 19 22V19Z" fill="currentColor"/>
                    <path d="M9 8C9.552 8 10 8.448 10 9V12C10 12.552 9.552 13 9 13H6C5.448 13 5 12.552 5 12V9C5 8.448 5.448 8 6 8H9Z" fill="currentColor"/>
                  </svg>
                </div>
                <div className="font-display font-bold text-lg text-[var(--color-text-primary)]">
                  AgriConnect
                </div>
              </Link>
            )}
            
            {isCollapsed && (
              <div className="text-[var(--color-primary)]">
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M16 4C9.373 4 4 9.373 4 16C4 22.627 9.373 28 16 28C22.627 28 28 22.627 28 16C28 9.373 22.627 4 16 4ZM16 6C21.523 6 26 10.477 26 16C26 21.523 21.523 26 16 26C10.477 26 6 21.523 6 16C6 10.477 10.477 6 16 6Z" fill="currentColor"/>
                  <path d="M16 8C16.552 8 17 8.448 17 9V15H23C23.552 15 24 15.448 24 16C24 16.552 23.552 17 23 17H16C15.448 17 15 16.552 15 16V9C15 8.448 15.448 8 16 8Z" fill="currentColor"/>
                  <path d="M8 16C8 15.448 8.448 15 9 15H12C12.552 15 13 15.448 13 16V19C13 19.552 12.552 20 12 20H9C8.448 20 8 19.552 8 19V16Z" fill="currentColor"/>
                  <path d="M19 19C19 18.448 19.448 18 20 18H23C23.552 18 24 18.448 24 19V22C24 22.552 23.552 23 23 23H20C19.448 23 19 22.552 19 22V19Z" fill="currentColor"/>
                  <path d="M9 8C9.552 8 10 8.448 10 9V12C10 12.552 9.552 13 9 13H6C5.448 13 5 12.552 5 12V9C5 8.448 5.448 8 6 8H9Z" fill="currentColor"/>
                </svg>
              </div>
            )}
            
            <button
              className={`p-1.5 rounded-md text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)] ${isCollapsed ? 'hidden md:block' : ''}`}
              onClick={handleToggle}
              aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              <Icon name={isCollapsed ? 'ChevronRight' : 'ChevronLeft'} size={20} />
            </button>
          </div>
          
          {/* Navigation */}
          <nav className="flex-1 overflow-y-auto py-4">
            <ul className="space-y-1 px-3">
              {navItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center px-3 py-2 rounded-md transition-colors
                      ${isActive(item.path) 
                        ? 'bg-[var(--color-primary-light)]/10 text-[var(--color-primary)]' 
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    <Icon name={item.icon} size={20} />
                    {!isCollapsed && <span className="ml-3">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
            
            {!isCollapsed && (
              <div className="mt-8 px-6">
                <div className="text-xs font-medium text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">
                  Management
                </div>
              </div>
            )}
            
            {isCollapsed && (
              <div className="mt-8 px-3">
                <div className="border-t border-[var(--color-border)] pt-2"></div>
              </div>
            )}
            
            <ul className="space-y-1 px-3 mt-2">
              {managementItems.map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className={`
                      flex items-center px-3 py-2 rounded-md transition-colors
                      ${isActive(item.path) 
                        ? 'bg-[var(--color-primary-light)]/10 text-[var(--color-primary)]' 
                        : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-surface)] hover:text-[var(--color-text-primary)]'
                      }
                      ${isCollapsed ? 'justify-center' : ''}
                    `}
                    aria-current={isActive(item.path) ? 'page' : undefined}
                  >
                    <Icon name={item.icon} size={20} />
                    {!isCollapsed && <span className="ml-3">{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          
          {/* User Profile */}
          <div className={`
            p-4 border-t border-[var(--color-border)] flex items-center
            ${isCollapsed ? 'justify-center' : ''}
          `}>
            {isCollapsed ? (
              <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)]/10 flex items-center justify-center text-[var(--color-primary)]">
                <Icon name="User" size={20} />
              </div>
            ) : (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-[var(--color-primary-light)]/10 flex items-center justify-center text-[var(--color-primary)]">
                  <Icon name="User" size={20} />
                </div>
                <div className="ml-3">
                  <div className="text-sm font-medium text-[var(--color-text-primary)]">John Farmer</div>
                  <div className="text-xs text-[var(--color-text-secondary)]">john@farm.com</div>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;