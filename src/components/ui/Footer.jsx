import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Input from './Input';
import Button from './Button';

const Logo = () => {
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
        <div className="font-display font-bold text-xl text-[var(--color-text-primary)]">
          AgriConnect
        </div>
      </div>
    </Link>
  );
};

const Footer = ({ 
  variant = 'full', 
  className = '',
  ...props 
}) => {
  // Footer links
  const links = {
    company: [
      { label: 'About Us', path: '#' },
      { label: 'Careers', path: '#' },
      { label: 'Blog', path: '#' },
      { label: 'Press', path: '#' },
    ],
    product: [
      { label: 'Crop Doctor', path: '/crop-doctor-ai-analysis' },
      { label: 'Marketplace', path: '/marketplace-dashboard' },
      { label: 'Weather Alerts', path: '#' },
      { label: 'Farming Tips', path: '#' },
    ],
    resources: [
      { label: 'Help Center', path: '#' },
      { label: 'Community', path: '#' },
      { label: 'Webinars', path: '#' },
      { label: 'Partners', path: '#' },
    ],
    legal: [
      { label: 'Privacy Policy', path: '#' },
      { label: 'Terms of Service', path: '#' },
      { label: 'Cookie Policy', path: '#' },
      { label: 'Data Processing', path: '#' },
    ],
  };
  
  // Social media links
  const socialLinks = [
    { icon: 'Facebook', label: 'Facebook', url: '#' },
    { icon: 'Twitter', label: 'Twitter', url: '#' },
    { icon: 'Instagram', label: 'Instagram', url: '#' },
    { icon: 'Linkedin', label: 'LinkedIn', url: '#' },
    { icon: 'Youtube', label: 'YouTube', url: '#' },
  ];
  
  // Minimal footer for application pages
  if (variant === 'minimal') {
    return (
      <footer 
        className={`bg-white border-t border-[var(--color-border)] py-4 ${className}`}
        {...props}
      >
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <Logo />
            </div>
            
            <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
              <div className="flex space-x-4">
                {socialLinks.map((link) => (
                  <a 
                    key={link.label}
                    href={link.url}
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                    aria-label={link.label}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon name={link.icon} size={20} />
                  </a>
                ))}
              </div>
              
              <div className="text-sm text-[var(--color-text-secondary)]">
                &copy; {new Date().getFullYear()} AgriConnect. All rights reserved.
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  }
  
  // Full footer for main pages
  return (
    <footer 
      className={`bg-white border-t border-[var(--color-border)] pt-12 pb-6 ${className}`}
      {...props}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 mb-12">
          {/* Logo and description */}
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 text-[var(--color-text-secondary)] max-w-md">
              Connecting farmers with technology, resources, and each other. 
              AgriConnect helps you grow better crops, access markets, and build a sustainable future.
            </p>
            
            <div className="mt-6">
              <h4 className="font-medium text-[var(--color-text-primary)] mb-3">Subscribe to our newsletter</h4>
              <div className="flex">
                <div className="flex-grow mr-2">
                  <Input 
                    type="email" 
                    placeholder="Your email address" 
                    aria-label="Email address"
                  />
                </div>
                <Button variant="primary">Subscribe</Button>
              </div>
            </div>
          </div>
          
          {/* Links */}
          <div>
            <h4 className="font-medium text-[var(--color-text-primary)] mb-4">Company</h4>
            <ul className="space-y-3">
              {links.company.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-[var(--color-text-primary)] mb-4">Product</h4>
            <ul className="space-y-3">
              {links.product.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h4 className="font-medium text-[var(--color-text-primary)] mb-4">Resources</h4>
            <ul className="space-y-3">
              {links.resources.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
            
            <h4 className="font-medium text-[var(--color-text-primary)] mt-6 mb-4">Legal</h4>
            <ul className="space-y-3">
              {links.legal.map((link) => (
                <li key={link.label}>
                  <Link 
                    to={link.path} 
                    className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
        
        <div className="pt-6 border-t border-[var(--color-border)]">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-[var(--color-text-secondary)] mb-4 md:mb-0">
              &copy; {new Date().getFullYear()} AgriConnect. All rights reserved.
            </div>
            
            <div className="flex space-x-6">
              {socialLinks.map((link) => (
                <a 
                  key={link.label}
                  href={link.url}
                  className="text-[var(--color-text-secondary)] hover:text-[var(--color-primary)]"
                  aria-label={link.label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon name={link.icon} size={20} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;