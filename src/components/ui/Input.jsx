import React, { useState } from 'react';
import Icon from '../../components/AppIcon';

const Input = ({
  type = 'text',
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  success,
  helperText,
  prefix,
  suffix,
  className = '',
  icon,
  iconPosition = 'left',
  onBlur,
  onFocus,
  ...props
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  
  // Determine the actual input type for password fields
  const inputType = type === 'password' && showPassword ? 'text' : type;
  
  // Determine validation state
  const hasError = !!error;
  const hasSuccess = !!success;
  
  // Handle focus events
  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  // Generate unique ID if not provided
  const inputId = id || `input-${name || Math.random().toString(36).substring(2, 9)}`;
  const helperId = `helper-${inputId}`;
  
  // Input border classes based on state
  const getBorderClasses = () => {
    if (hasError) return 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]';
    if (hasSuccess) return 'border-[var(--color-success)] focus:ring-[var(--color-success)]';
    return 'border-[var(--color-border)] focus:ring-[var(--color-primary)]';
  };
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
        >
          {label}
          {required && <span className="text-[var(--color-danger)] ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        {/* Prefix */}
        {prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            {typeof prefix === 'string' ? (
              <span className="text-[var(--color-text-secondary)]">{prefix}</span>
            ) : (
              prefix
            )}
          </div>
        )}
        
        {/* Icon (left position) */}
        {icon && iconPosition === 'left' && !prefix && (
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Icon 
              name={icon} 
              size={20} 
              className="text-[var(--color-text-secondary)]" 
            />
          </div>
        )}
        
        {/* Input element */}
        <input
          id={inputId}
          type={inputType}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          aria-invalid={hasError}
          aria-describedby={helperText ? helperId : undefined}
          className={`
            input
            ${getBorderClasses()}
            ${prefix || (icon && iconPosition === 'left') ? 'pl-10' : ''}
            ${suffix || (icon && iconPosition === 'right') || type === 'password' ? 'pr-10' : ''}
            ${disabled ? 'bg-[var(--color-surface)] cursor-not-allowed' : ''}
          `}
          {...props}
        />
        
        {/* Password toggle */}
        {type === 'password' && (
          <button
            type="button"
            className="absolute inset-y-0 right-0 flex items-center pr-3 text-[var(--color-text-secondary)]"
            onClick={() => setShowPassword(!showPassword)}
            tabIndex={-1}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
          </button>
        )}
        
        {/* Icon (right position) */}
        {icon && iconPosition === 'right' && type !== 'password' && !suffix && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            <Icon 
              name={icon} 
              size={20} 
              className="text-[var(--color-text-secondary)]" 
            />
          </div>
        )}
        
        {/* Suffix */}
        {suffix && type !== 'password' && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {typeof suffix === 'string' ? (
              <span className="text-[var(--color-text-secondary)]">{suffix}</span>
            ) : (
              suffix
            )}
          </div>
        )}
        
        {/* Validation icons */}
        {!suffix && !icon && type !== 'password' && (hasError || hasSuccess) && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
            {hasError && (
              <Icon 
                name="AlertCircle" 
                size={20} 
                className="text-[var(--color-danger)]" 
              />
            )}
            {hasSuccess && (
              <Icon 
                name="CheckCircle" 
                size={20} 
                className="text-[var(--color-success)]" 
              />
            )}
          </div>
        )}
      </div>
      
      {/* Helper text / Error message */}
      {(helperText || error) && (
        <p 
          id={helperId} 
          className={`mt-1 text-sm ${
            hasError 
              ? 'text-[var(--color-danger)]' 
              : 'text-[var(--color-text-secondary)]'
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

// Textarea component
export const Textarea = ({
  label,
  id,
  name,
  value,
  onChange,
  placeholder,
  disabled = false,
  required = false,
  error,
  success,
  helperText,
  className = '',
  rows = 4,
  onBlur,
  onFocus,
  ...props
}) => {
  const [isFocused, setIsFocused] = useState(false);
  
  // Determine validation state
  const hasError = !!error;
  const hasSuccess = !!success;
  
  // Handle focus events
  const handleFocus = (e) => {
    setIsFocused(true);
    if (onFocus) onFocus(e);
  };
  
  const handleBlur = (e) => {
    setIsFocused(false);
    if (onBlur) onBlur(e);
  };
  
  // Generate unique ID if not provided
  const textareaId = id || `textarea-${name || Math.random().toString(36).substring(2, 9)}`;
  const helperId = `helper-${textareaId}`;
  
  // Textarea border classes based on state
  const getBorderClasses = () => {
    if (hasError) return 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]';
    if (hasSuccess) return 'border-[var(--color-success)] focus:ring-[var(--color-success)]';
    return 'border-[var(--color-border)] focus:ring-[var(--color-primary)]';
  };
  
  return (
    <div className={`w-full ${className}`}>
      {label && (
        <label 
          htmlFor={textareaId} 
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
        >
          {label}
          {required && <span className="text-[var(--color-danger)] ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <textarea
          id={textareaId}
          name={name}
          value={value}
          onChange={onChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          required={required}
          placeholder={placeholder}
          rows={rows}
          aria-invalid={hasError}
          aria-describedby={helperText ? helperId : undefined}
          className={`
            w-full rounded-md border ${getBorderClasses()} bg-white px-3 py-2 text-sm 
            placeholder:text-[var(--color-text-tertiary)] focus:outline-none focus:ring-2 
            focus:ring-offset-0 disabled:cursor-not-allowed disabled:opacity-50
            ${disabled ? 'bg-[var(--color-surface)] cursor-not-allowed' : ''}
          `}
          {...props}
        />
        
        {/* Validation icons */}
        {(hasError || hasSuccess) && (
          <div className="absolute top-3 right-3 pointer-events-none">
            {hasError && (
              <Icon 
                name="AlertCircle" 
                size={20} 
                className="text-[var(--color-danger)]" 
              />
            )}
            {hasSuccess && (
              <Icon 
                name="CheckCircle" 
                size={20} 
                className="text-[var(--color-success)]" 
              />
            )}
          </div>
        )}
      </div>
      
      {/* Helper text / Error message */}
      {(helperText || error) && (
        <p 
          id={helperId} 
          className={`mt-1 text-sm ${
            hasError 
              ? 'text-[var(--color-danger)]' 
              : 'text-[var(--color-text-secondary)]'
          }`}
        >
          {error || helperText}
        </p>
      )}
    </div>
  );
};

export default Input;