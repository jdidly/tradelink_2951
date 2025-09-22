import React from 'react';
import Icon from '../../../components/AppIcon';

const CategoryTile = ({ category, onClick }) => {
  const getCategoryIcon = (categoryName) => {
    const iconMap = {
      'Plumber': 'Droplets',
      'Electrician': 'Zap',
      'Painter': 'Paintbrush2',
      'Roofer': 'Home',
      'AC': 'Snowflake'
    };
    return iconMap?.[categoryName] || 'Wrench';
  };

  const getAvailabilityColor = (count) => {
    if (count >= 10) return 'text-success';
    if (count >= 5) return 'text-warning';
    return 'text-error';
  };

  return (
    <button
      onClick={() => onClick(category)}
      className="group bg-card border border-border rounded-lg p-6 hover:shadow-medium transition-all duration-200 hover:scale-105 text-left w-full"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-200">
          <Icon 
            name={getCategoryIcon(category?.name)} 
            size={24} 
            className="text-primary"
          />
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${getAvailabilityColor(category?.availableCount)} bg-current/10`}>
          {category?.availableCount} available
        </div>
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors duration-200">
        {category?.name}
      </h3>
      <p className="text-sm text-muted-foreground mb-3">
        {category?.description}
      </p>
      <div className="flex items-center justify-between">
        <div className="text-sm">
          <span className="text-muted-foreground">From </span>
          <span className="font-semibold text-foreground">${category?.priceRange?.min}</span>
          <span className="text-muted-foreground"> - ${category?.priceRange?.max}</span>
        </div>
        <Icon 
          name="ArrowRight" 
          size={16} 
          className="text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all duration-200"
        />
      </div>
    </button>
  );
};

export default CategoryTile;