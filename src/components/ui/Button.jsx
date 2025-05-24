import React from 'react';
import Icon from '../../components/AppIcon';

const Button = ({
  children,
  variant = 'primary',
  size = 'md',
  icon,
  iconPosition = 'left',
  isLoading = false,
  disabled = false,
  fullWidth = false,
  className = '',
  type = 'button',
  onClick,
  ...props
}) => {
  // Size classes
  const sizeClasses = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2 text-base',
    lg: 'px-6 py-3 text-lg',
  };

  // Variant classes
  const variantClasses = {
    primary: 'btn-primary',
    secondary: 'btn-secondary',
    tertiary: 'btn-tertiary',
    success: 'btn-success',
    danger: 'btn-danger',
    icon: 'p-2 bg-white border border-[var(--color-border)] hover:bg-[var(--color-surface)] text-[var(--color-text-primary)]',
  };

  // Combine classes
  const buttonClasses = `
    btn
    ${sizeClasses[size]}
    ${variantClasses[variant]}
    ${fullWidth ? 'w-full' : ''}
    ${className}
  `;

  // Handle icon-only buttons
  const iconOnly = variant === 'icon' || (!children && icon);

  return (
    <button
      type={type}
      className={buttonClasses}
      disabled={disabled || isLoading}
      onClick={onClick}
      aria-busy={isLoading}
      {...props}
    >
      {isLoading && (
        <span className="mr-2">
          <Icon 
            name="Loader2" 
            className="animate-spin" 
            size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} 
          />
        </span>
      )}
      
      {!isLoading && icon && iconPosition === 'left' && !iconOnly && (
        <Icon 
          name={icon} 
          className="mr-2" 
          size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} 
        />
      )}
      
      {iconOnly && !isLoading ? (
        <Icon 
          name={icon} 
          size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} 
        />
      ) : (
        children
      )}
      
      {!isLoading && icon && iconPosition === 'right' && !iconOnly && (
        <Icon 
          name={icon} 
          className="ml-2" 
          size={size === 'sm' ? 16 : size === 'lg' ? 24 : 20} 
        />
      )}
    </button>
  );
};

export default Button;