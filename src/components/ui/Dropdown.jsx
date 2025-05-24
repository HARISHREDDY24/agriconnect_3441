import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../components/AppIcon';

const Dropdown = ({
  options = [],
  value,
  onChange,
  placeholder = 'Select an option',
  disabled = false,
  error,
  label,
  required = false,
  searchable = false,
  multiple = false,
  clearable = false,
  className = '',
  renderOption,
  renderSelected,
  groupBy,
  ...props
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);
  
  // Generate unique ID
  const id = useRef(`dropdown-${Math.random().toString(36).substring(2, 9)}`);
  
  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchable && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen, searchable]);
  
  // Handle dropdown toggle
  const toggleDropdown = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      setSearchTerm('');
    }
  };
  
  // Handle option selection
  const handleSelect = (option) => {
    if (multiple) {
      const isSelected = Array.isArray(value) && value.some(item => item.value === option.value);
      const newValue = isSelected
        ? value.filter(item => item.value !== option.value)
        : [...(value || []), option];
      
      onChange(newValue);
      
      // Don't close dropdown for multi-select
      if (searchInputRef.current) {
        searchInputRef.current.focus();
      }
    } else {
      onChange(option);
      setIsOpen(false);
    }
  };
  
  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  
  // Clear selection
  const handleClear = (e) => {
    e.stopPropagation();
    onChange(multiple ? [] : null);
  };
  
  // Filter options based on search term
  const filteredOptions = options.filter(option => 
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );
  
  // Group options if groupBy is provided
  const groupedOptions = groupBy
    ? filteredOptions.reduce((groups, option) => {
        const groupKey = option[groupBy] || 'Other';
        if (!groups[groupKey]) {
          groups[groupKey] = [];
        }
        groups[groupKey].push(option);
        return groups;
      }, {})
    : null;
  
  // Render selected value(s)
  const renderSelectedValue = () => {
    if (!value) return <span className="text-[var(--color-text-tertiary)]">{placeholder}</span>;
    
    if (multiple) {
      if (Array.isArray(value) && value.length === 0) {
        return <span className="text-[var(--color-text-tertiary)]">{placeholder}</span>;
      }
      
      if (renderSelected) {
        return renderSelected(value);
      }
      
      return (
        <div className="flex flex-wrap gap-1">
          {value.map(item => (
            <div 
              key={item.value} 
              className="inline-flex items-center bg-[var(--color-surface)] rounded-full px-2 py-1 text-sm"
            >
              {item.icon && (
                <Icon name={item.icon} size={14} className="mr-1 text-[var(--color-text-secondary)]" />
              )}
              <span>{item.label}</span>
              <button
                type="button"
                className="ml-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                onClick={(e) => {
                  e.stopPropagation();
                  handleSelect(item);
                }}
                aria-label={`Remove ${item.label}`}
              >
                <Icon name="X" size={14} />
              </button>
            </div>
          ))}
        </div>
      );
    }
    
    if (renderSelected) {
      return renderSelected(value);
    }
    
    return (
      <div className="flex items-center">
        {value.icon && (
          <Icon name={value.icon} size={18} className="mr-2 text-[var(--color-text-secondary)]" />
        )}
        <span>{value.label}</span>
      </div>
    );
  };
  
  return (
    <div className={`w-full ${className}`} ref={dropdownRef}>
      {label && (
        <label 
          htmlFor={id.current} 
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-1"
        >
          {label}
          {required && <span className="text-[var(--color-danger)] ml-1">*</span>}
        </label>
      )}
      
      <div className="relative">
        <button
          type="button"
          id={id.current}
          className={`
            flex items-center justify-between w-full h-10 px-3 py-2 text-left 
            bg-white border rounded-md focus:outline-none focus:ring-2
            ${disabled ? 'bg-[var(--color-surface)] cursor-not-allowed opacity-60' : 'cursor-pointer'}
            ${error ? 'border-[var(--color-danger)] focus:ring-[var(--color-danger)]' : 'border-[var(--color-border)] focus:ring-[var(--color-primary)]'}
          `}
          onClick={toggleDropdown}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          disabled={disabled}
          {...props}
        >
          <div className="flex-1 truncate">
            {renderSelectedValue()}
          </div>
          <div className="flex items-center">
            {(value && clearable && !disabled) && (
              <button
                type="button"
                className="p-1 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)]"
                onClick={handleClear}
                aria-label="Clear selection"
              >
                <Icon name="X" size={16} />
              </button>
            )}
            <Icon 
              name={isOpen ? 'ChevronUp' : 'ChevronDown'} 
              size={18} 
              className="ml-1 text-[var(--color-text-tertiary)]" 
            />
          </div>
        </button>
        
        {isOpen && (
          <div className="dropdown-content">
            {searchable && (
              <div className="px-3 py-2 sticky top-0 bg-white border-b border-[var(--color-border)]">
                <div className="relative">
                  <Icon 
                    name="Search" 
                    size={16} 
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--color-text-tertiary)]" 
                  />
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="w-full pl-9 pr-3 py-1.5 text-sm border border-[var(--color-border)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-transparent"
                    placeholder="Search..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    onClick={(e) => e.stopPropagation()}
                  />
                </div>
              </div>
            )}
            
            <ul 
              className="py-1 overflow-auto max-h-60" 
              role="listbox" 
              aria-labelledby={id.current}
            >
              {filteredOptions.length === 0 && (
                <li className="px-3 py-2 text-sm text-[var(--color-text-tertiary)] text-center">
                  No options found
                </li>
              )}
              
              {groupBy ? (
                Object.entries(groupedOptions).map(([group, groupOptions]) => (
                  <li key={group} className="group">
                    <div className="px-3 py-1.5 text-xs font-semibold text-[var(--color-text-tertiary)] bg-[var(--color-surface)]">
                      {group}
                    </div>
                    <ul>
                      {groupOptions.map(option => (
                        <li
                          key={option.value}
                          className={`
                            dropdown-item
                            ${multiple && Array.isArray(value) && value.some(item => item.value === option.value) ? 'dropdown-item-active' : ''}
                            ${!multiple && value?.value === option.value ? 'dropdown-item-active' : ''}
                          `}
                          role="option"
                          aria-selected={
                            multiple 
                              ? Array.isArray(value) && value.some(item => item.value === option.value)
                              : value?.value === option.value
                          }
                          onClick={() => handleSelect(option)}
                        >
                          {renderOption ? (
                            renderOption(option, {
                              isSelected: multiple 
                                ? Array.isArray(value) && value.some(item => item.value === option.value)
                                : value?.value === option.value
                            })
                          ) : (
                            <div className="flex items-center">
                              {multiple && (
                                <div className="mr-2 flex items-center justify-center">
                                  <div className={`
                                    w-4 h-4 border rounded 
                                    ${Array.isArray(value) && value.some(item => item.value === option.value)
                                      ? 'bg-[var(--color-primary)] border-[var(--color-primary)]'
                                      : 'border-[var(--color-border)]'
                                    }
                                  `}>
                                    {Array.isArray(value) && value.some(item => item.value === option.value) && (
                                      <Icon name="Check" size={12} className="text-white" />
                                    )}
                                  </div>
                                </div>
                              )}
                              
                              {option.icon && (
                                <Icon name={option.icon} size={18} className="mr-2 text-[var(--color-text-secondary)]" />
                              )}
                              
                              <span>{option.label}</span>
                            </div>
                          )}
                        </li>
                      ))}
                    </ul>
                  </li>
                ))
              ) : (
                filteredOptions.map(option => (
                  <li
                    key={option.value}
                    className={`
                      dropdown-item
                      ${multiple && Array.isArray(value) && value.some(item => item.value === option.value) ? 'dropdown-item-active' : ''}
                      ${!multiple && value?.value === option.value ? 'dropdown-item-active' : ''}
                    `}
                    role="option"
                    aria-selected={
                      multiple 
                        ? Array.isArray(value) && value.some(item => item.value === option.value)
                        : value?.value === option.value
                    }
                    onClick={() => handleSelect(option)}
                  >
                    {renderOption ? (
                      renderOption(option, {
                        isSelected: multiple 
                          ? Array.isArray(value) && value.some(item => item.value === option.value)
                          : value?.value === option.value
                      })
                    ) : (
                      <div className="flex items-center">
                        {multiple && (
                          <div className="mr-2 flex items-center justify-center">
                            <div className={`
                              w-4 h-4 border rounded 
                              ${Array.isArray(value) && value.some(item => item.value === option.value)
                                ? 'bg-[var(--color-primary)] border-[var(--color-primary)]'
                                : 'border-[var(--color-border)]'
                              }
                            `}>
                              {Array.isArray(value) && value.some(item => item.value === option.value) && (
                                <Icon name="Check" size={12} className="text-white" />
                              )}
                            </div>
                          </div>
                        )}
                        
                        {option.icon && (
                          <Icon name={option.icon} size={18} className="mr-2 text-[var(--color-text-secondary)]" />
                        )}
                        
                        <span>{option.label}</span>
                      </div>
                    )}
                  </li>
                ))
              )}
            </ul>
          </div>
        )}
      </div>
      
      {error && (
        <p className="mt-1 text-sm text-[var(--color-danger)]">{error}</p>
      )}
    </div>
  );
};

export default Dropdown;