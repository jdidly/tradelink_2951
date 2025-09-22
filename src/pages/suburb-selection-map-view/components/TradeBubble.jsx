import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const TradeBubble = ({ 
  category, 
  tradies, 
  position, 
  isHovered, 
  onHover, 
  onLeave, 
  onClick 
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    if (tradies?.length === 1) {
      onClick(tradies?.[0]);
    } else {
      setShowTooltip(!showTooltip);
    }
  };

  return (
    <div 
      className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
      style={{ left: position?.x, top: position?.y }}
    >
      {/* Main Bubble */}
      <button
        className={cn(
          "relative w-16 h-16 rounded-full flex items-center justify-center",
          "shadow-lg border-4 border-white transition-all duration-200",
          "hover:scale-110 cursor-pointer",
          category?.color,
          isHovered && "scale-110 shadow-xl"
        )}
        onMouseEnter={onHover}
        onMouseLeave={onLeave}
        onClick={handleClick}
      >
        <Icon name={category?.icon} size={24} className="text-white" />
        
        {/* Count Badge */}
        <div className="absolute -top-2 -right-2 w-6 h-6 bg-white border-2 border-white rounded-full flex items-center justify-center shadow-sm">
          <span className="text-xs font-bold text-foreground">{tradies?.length}</span>
        </div>
      </button>

      {/* Tooltip/Dropdown for multiple tradies */}
      {showTooltip && tradies?.length > 1 && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 w-64 bg-white border border-border rounded-lg shadow-xl z-30">
          <div className="p-3">
            <h4 className="font-semibold text-foreground mb-2 flex items-center gap-2">
              <Icon name={category?.icon} size={16} />
              {category?.name}s in Area
            </h4>
            <div className="space-y-2">
              {tradies?.map((tradie) => (
                <button
                  key={tradie?.id}
                  onClick={() => {
                    setShowTooltip(false);
                    onClick(tradie);
                  }}
                  className="w-full text-left p-2 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="font-medium text-foreground text-sm">{tradie?.name}</div>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground mt-1">
                    <div className="flex items-center gap-1">
                      <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                      <span>{tradie?.trustScore}</span>
                    </div>
                    <span>•</span>
                    <span className="text-primary font-medium">{tradie?.startingPrice}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Quick info tooltip on hover */}
      {isHovered && !showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black/80 text-white text-sm rounded-lg whitespace-nowrap">
          {tradies?.length} {category?.name}{tradies?.length > 1 ? 's' : ''} available
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent border-t-black/80" />
        </div>
      )}
    </div>
  );
};

export default TradeBubble;