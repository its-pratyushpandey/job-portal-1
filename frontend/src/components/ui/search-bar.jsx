import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Search, Briefcase, Building2, MapPin, 
  GraduationCap, DollarSign, Clock, History,
  Sparkles, X, ArrowRight, Filter, Target,
  TrendingUp, BookOpen
} from 'lucide-react';
import { Button } from './button';
import { Badge } from './badge';
import { cn } from '@/lib/utils';

const SearchBar = ({ 
  onSearch, 
  className,
  placeholder = "Search jobs...",
  suggestions = [],
  recentSearches = [],
  popularSearches = [],
  variant = "default"
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
  const searchRef = useRef(null);
  const inputRef = useRef(null);

  const variants = {
    default: "bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700",
    hero: "bg-white/10 backdrop-blur-md border border-white/20",
    minimal: "bg-transparent border-none",
    premium: "bg-gradient-to-r from-purple-50 to-pink-50 dark:from-gray-800 dark:to-gray-700 border border-purple-100 dark:border-purple-800/30"
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsFocused(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSubmit = (searchTerm = query) => {
    if (searchTerm.trim()) {
      onSearch(searchTerm);
      setIsFocused(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      setSelectedSuggestion(prev => 
        prev < suggestions.length - 1 ? prev + 1 : prev
      );
    } else if (e.key === 'ArrowUp') {
      setSelectedSuggestion(prev => 
        prev > 0 ? prev - 1 : -1
      );
    } else if (e.key === 'Enter') {
      if (selectedSuggestion >= 0) {
        handleSubmit(suggestions[selectedSuggestion]);
      } else {
        handleSubmit();
      }
    }
  };

  return (
    <div className="relative" ref={searchRef}>
      <motion.div
        initial={{ scale: 0.95 }}
        animate={{ scale: 1 }}
        className={cn(
          "relative flex items-center gap-2 px-4 py-3 rounded-full transition-all duration-300",
          variants[variant],
          isFocused && "ring-2 ring-purple-500/20 shadow-lg",
          className
        )}
      >
        <Search className={cn(
          "h-5 w-5",
          variant === 'hero' ? 'text-white' : 'text-gray-400'
        )} />
        
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className={cn(
            "flex-1 bg-transparent border-none outline-none",
            variant === 'hero' ? 'text-white placeholder:text-gray-300' : 'text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500'
          )}
        />

        {query && (
          <motion.button
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setQuery('')}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
          >
            <X className="h-4 w-4 text-gray-400" />
          </motion.button>
        )}

        <Button
          onClick={() => handleSubmit()}
          variant={variant === 'hero' ? 'secondary' : 'default'}
          className="rounded-full px-6"
        >
          Search
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </motion.div>

      {/* Dropdown Panel */}
      <AnimatePresence>
        {isFocused && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="absolute top-full left-0 right-0 mt-2 p-4 bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 z-50"
          >
            {/* Quick Filters */}
            <div className="mb-4">
              <div className="flex items-center gap-2 mb-2">
                <Filter className="h-4 w-4 text-purple-500" />
                <span className="text-sm font-medium text-gray-900 dark:text-white">
                  Quick Filters
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {['Remote', 'Full-time', 'Tech', 'Marketing', 'Design'].map((filter) => (
                  <Badge
                    key={filter}
                    variant="secondary"
                    className="hover:bg-purple-100 dark:hover:bg-purple-900/30 cursor-pointer"
                    onClick={() => handleSubmit(filter)}
                  >
                    {filter}
                  </Badge>
                ))}
              </div>
            </div>

            {/* Recent Searches */}
            {recentSearches.length > 0 && (
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <History className="h-4 w-4 text-blue-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Recent Searches
                  </span>
                </div>
                <div className="space-y-2">
                  {recentSearches.map((search, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer"
                      onClick={() => handleSubmit(search)}
                    >
                      <Clock className="h-4 w-4" />
                      <span className="text-sm">{search}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Popular Searches */}
            {popularSearches.length > 0 && (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <TrendingUp className="h-4 w-4 text-green-500" />
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    Popular Searches
                  </span>
                </div>
                <div className="space-y-2">
                  {popularSearches.map((search, index) => (
                    <motion.div
                      key={index}
                      whileHover={{ x: 4 }}
                      className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 cursor-pointer"
                      onClick={() => handleSubmit(search)}
                    >
                      <Sparkles className="h-4 w-4" />
                      <span className="text-sm">{search}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SearchBar;