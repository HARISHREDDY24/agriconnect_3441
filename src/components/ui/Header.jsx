import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from './Button';

const Logo = ({ variant = 'default' }) => {
  const textColor = variant === 'transparent' ? 'text-white' : 'text-[var(--color-text-primary)]';
  
  return (
    <Link to="/" className="flex items-center">
      <div className="flex items-center">
        <div className="mr-2 text-[var(--color-primary)]">
          <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M16 4C9.373 4 4 9.373 4 16C4 22.627 9.373 28 16 28C22.627 28 28 22.627 28 16C28 9.373 22.627 4 16 4ZM16 6C21.523 6 26 10.477 26 16C26 21.523 21.523 26 16 26C10.477 26 6 21.523 6 16C6 10.477 10.477 6 16 6Z" fill="currentColor"/>
            <path d="M16 8C16.552 8 17 8.448 17 9V15H23C23.552 15 24 15.448 24 16C24 16.552 23.552 17 23 17H16C15.448 17 15 16.552 15 16V9C15 8.448 15.448 8 16 8Z" fill="currentColor"/>
            <path d="M8 16C8 15.448 8.448 15 9 15H12C12.552 15 13 15.448 13 16V19C13 19.552 12.552 20 12 20H9C8.448 20 8 19.552 8 19V16Z" fill="currentColor"/>
            <path d="M19 19C19 18.448 19.448 18 20 18H23C23.552 18 24 18.448 24 19V22C24 22.552 23.552 23 23 23H20C19.448 23 19 22.552 19 22V19Z" fill="currentColor"/>
            <path d="M9 8C9.552 8 10 8.448 10 9V12C10 12.552 9.552 13 9 13H6C5.448 13 5 12.552 5 12V9C5 8.448 5.448 8 6 8H9Z" fill="currentColor"/>
          </svg>
        </div>
        <div className={`font-display font-bold text-xl ${textColor}`}>
          AgriConnect
        </div>
      </div>
    </Link>
  );
};

const Header = ({ 
  variant = 'default', 
  className = '',
  ...props 
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  
  // Navigation items
  const navItems = [
    { label: 'Home', path: '/landing-page-with-login-signup' },
    { label: 'Crop Doctor', path: '/crop-doctor-ai-analysis' },
    { label: 'Marketplace', path: '/marketplace-dashboard' },
    { label: 'Products', path: '/product-detail-chat' },
  ];
  
  // Check if user is scrolled
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  // Close mobile menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location]);
  
  // Determine header background based on variant and scroll state
  const getHeaderBackground = () => {
    if (variant === 'transparent') {
      return isScrolled 
        ? 'bg-white shadow-md' 
        : 'bg-transparent';
    }
    
    if (variant === 'compact') {
      return 'bg-white shadow-sm';
    }
    
    return 'bg-white shadow-sm';
  };
  
  // Determine text color based on variant and scroll state
  const getTextColor = () => {
    if (variant === 'transparent' && !isScrolled) {
      return 'text-white';
    }
    return 'text-[var(--color-text-primary)]';
  };
  
  // Determine active link color
  const getActiveLinkClass = (path) => {
    const isActive = location.pathname === path;
    
    if (variant === 'transparent' && !isScrolled) {
      return isActive ? 'text-white font-medium' : 'text-white/80 hover:text-white';
    }
    
    return isActive 
      ? 'text-[var(--color-primary)] font-medium' 
      : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]';
  };
  
  // Determine header height
  const headerHeight = variant === 'compact' ? 'h-14' : 'h-16 md:h-20';
  
  return (
    <header 
      className={`
        fixed top-0 left-0 right-0 z-50 transition-all duration-200
        ${getHeaderBackground()}
        ${headerHeight}
        ${className}
      `}
      {...props}
    >
      <div className="container mx-auto px-4 h-full flex items-center justify-between">
        {/* Logo */}
        <Logo variant={variant === 'transparent' && !isScrolled ? 'transparent' : 'default'} />
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <ul className="flex items-center space-x-6">
            {navItems.map((item) => (
              <li key={item.path}>
                <Link 
                  to={item.path} 
                  className={`text-sm font-medium transition-colors ${getActiveLinkClass(item.path)}`}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
          
          <div className="flex items-center space-x-3">
            <Button 
              variant="secondary" 
              size="sm"
            >
              Log In
            </Button>
            <Button 
              variant="primary" 
              size="sm"
            >
              Sign Up
            </Button>
          </div>
        </nav>
        
        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-[var(--color-text-primary)]"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isMenuOpen}
        >
          <Icon name={isMenuOpen ? 'X' : 'Menu'} size={24} />
        </button>
        
        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden fixed inset-0 top-[64px] bg-white z-50 animate-fade-in">
            <nav className="container mx-auto px-4 py-6">
              <ul className="flex flex-col space-y-4">
                {navItems.map((item) => (
                  <li key={item.path}>
                    <Link 
                      to={item.path} 
                      className={`block py-2 text-lg font-medium ${
                        location.pathname === item.path
                          ? 'text-[var(--color-primary)]'
                          : 'text-[var(--color-text-secondary)]'
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              
              <div className="mt-8 flex flex-col space-y-3">
                <Button 
                  variant="secondary" 
                  fullWidth
                >
                  Log In
                </Button>
                <Button 
                  variant="primary" 
                  fullWidth
                >
                  Sign Up
                </Button>
              </div>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;