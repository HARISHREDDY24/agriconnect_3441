import React, { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "../../../components/AppIcon";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [recentSearches, setRecentSearches] = useState([
    "organic rice",
    "fresh vegetables",
    "wheat",
    "apples"
  ]);
  const inputRef = useRef(null);

  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      onSearch(query);
      if (!recentSearches.includes(query.toLowerCase())) {
        setRecentSearches([query.toLowerCase(), ...recentSearches.slice(0, 4)]);
      }
    }
  };

  const handleRecentSearch = (search) => {
    setQuery(search);
    onSearch(search);
  };

  const clearSearch = () => {
    setQuery("");
    onSearch("");
    inputRef.current.focus();
  };

  return (
    <div className="relative">
      <motion.form
        onSubmit={handleSearch}
        initial={{ y: -10, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex items-center bg-white rounded-lg border ${
          isFocused ? "border-primary shadow-sm" : "border-border"
        } transition-all duration-200 overflow-hidden`}
      >
        <motion.div
          className="flex-1 flex items-center"
          animate={{
            width: isFocused ? "100%" : "100%"
          }}
          transition={{ duration: 0.3 }}
        >
          <div className="pl-4 pr-2 text-text-tertiary">
            <Icon name="Search" size={20} />
          </div>
          <input
            ref={inputRef}
            type="text"
            placeholder="Search for crops, products, or sellers..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
            className="w-full py-3 px-2 focus:outline-none text-text-primary placeholder:text-text-tertiary"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                type="button"
                onClick={clearSearch}
                className="p-2 text-text-tertiary hover:text-text-secondary"
                aria-label="Clear search"
              >
                <Icon name="X" size={16} />
              </motion.button>
            )}
          </AnimatePresence>
        </motion.div>
        <button
          type="submit"
          className="bg-primary text-white py-3 px-6 font-medium hover:bg-primary-dark transition-colors"
        >
          Search
        </button>
      </motion.form>

      <AnimatePresence>
        {isFocused && recentSearches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 right-0 top-full mt-1 bg-white rounded-lg shadow-lg border border-border z-10"
          >
            <div className="p-2 border-b border-border">
              <h3 className="text-sm text-text-secondary">Recent Searches</h3>
            </div>
            <ul>
              {recentSearches.map((search, index) => (
                <li key={index}>
                  <button
                    onClick={() => handleRecentSearch(search)}
                    className="w-full text-left px-4 py-2 hover:bg-surface transition-colors flex items-center"
                  >
                    <Icon name="Clock" size={14} className="text-text-tertiary mr-2" />
                    <span>{search}</span>
                  </button>
                </li>
              ))}
            </ul>
            <div className="p-2 border-t border-border">
              <button
                onClick={() => setRecentSearches([])}
                className="text-xs text-danger hover:underline"
              >
                Clear recent searches
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;