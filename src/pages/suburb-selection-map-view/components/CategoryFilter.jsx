import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
  const handleCategoryToggle = (categoryId) => {
    const updated = selectedCategories?.includes(categoryId)
      ? selectedCategories?.filter(id => id !== categoryId)
      : [...selectedCategories, categoryId];
    onCategoryChange(updated);
  };

  const clearAllFilters = () => {
    onCategoryChange([]);
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filter by Trade</h3>
        {selectedCategories?.length > 0 && (
          <Button 
            variant="ghost" 
            size="sm"
            onClick={clearAllFilters}
            className="text-muted-foreground hover:text-foreground"
          >
            Clear all
          </Button>
        )}
      </div>
      
      <div className="flex flex-wrap gap-3">
        {categories?.map((category) => {
          const isSelected = selectedCategories?.includes(category?.id);
          return (
            <button
              key={category?.id}
              onClick={() => handleCategoryToggle(category?.id)}
              className={cn(
                "flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-200",
                "hover:scale-105 hover:shadow-sm",
                isSelected 
                  ? "bg-primary text-primary-foreground border-primary shadow-sm" 
                  : "bg-background border-border text-foreground hover:border-primary/50"
              )}
            >
              <div className={cn(
                "w-6 h-6 rounded-md flex items-center justify-center",
                isSelected ? "bg-primary-foreground/20" : category?.color
              )}>
                <Icon 
                  name={category?.icon} 
                  size={14} 
                  className={isSelected ? "text-primary-foreground" : "text-white"}
                />
              </div>
              <span className="text-sm font-medium">
                {category?.name}
              </span>
              <span className={cn(
                "text-xs px-2 py-1 rounded-full",
                isSelected 
                  ? "bg-primary-foreground/20 text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              )}>
                {category?.count}
              </span>
            </button>
          );
        })}
      </div>
      
      {selectedCategories?.length > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <p className="text-sm text-muted-foreground">
            Showing {selectedCategories?.length} of {categories?.length} categories
          </p>
        </div>
      )}
    </div>
  );
};

export default CategoryFilter;