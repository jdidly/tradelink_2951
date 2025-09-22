import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import TradeBubble from './TradeBubble';
import { cn } from '../../../utils/cn';

const MapView = ({ center, tradies, categories, onTradieSelect }) => {
  const [hoveredTradie, setHoveredTradie] = useState(null);
  const [selectedTradie, setSelectedTradie] = useState(null);

  // Group tradies by category for bubble display
  const tradiesByCategory = tradies?.reduce((acc, tradie) => {
    if (!acc?.[tradie?.category]) {
      acc[tradie?.category] = [];
    }
    acc?.[tradie?.category]?.push(tradie);
    return acc;
  }, {});

  const handleTradieClick = (tradie) => {
    setSelectedTradie(tradie);
    onTradieSelect(tradie);
  };

  return (
    <div className="relative h-96 bg-gradient-to-br from-slate-50 to-slate-100 border-t border-border">
      {/* Map Container - Simulated interactive map */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Background grid to simulate map */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#e2e8f0" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Map Controls */}
        <div className="absolute top-4 right-4 z-10 flex flex-col gap-2">
          <button className="w-10 h-10 bg-white border border-border rounded-lg shadow-sm flex items-center justify-center hover:bg-accent transition-colors">
            <Icon name="Plus" size={16} />
          </button>
          <button className="w-10 h-10 bg-white border border-border rounded-lg shadow-sm flex items-center justify-center hover:bg-accent transition-colors">
            <Icon name="Minus" size={16} />
          </button>
        </div>

        {/* Suburb boundary indicator */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-80 h-64 border-2 border-dashed border-primary/30 rounded-lg bg-primary/5" />
        </div>

        {/* Trade Bubbles */}
        {Object?.entries(tradiesByCategory)?.map(([categoryId, categoryTradies]) => {
          const category = categories?.find(cat => cat?.id === categoryId);
          if (!category) return null;

          // Position bubbles in a scattered pattern
          const positions = [
            { x: '25%', y: '30%' },
            { x: '60%', y: '45%' },
            { x: '40%', y: '65%' },
            { x: '75%', y: '25%' },
            { x: '35%', y: '80%' }
          ];

          const position = positions?.[Math.floor(Math.random() * positions?.length)] || positions?.[0];

          return (
            <TradeBubble
              key={categoryId}
              category={category}
              tradies={categoryTradies}
              position={position}
              isHovered={hoveredTradie === categoryId}
              onHover={() => setHoveredTradie(categoryId)}
              onLeave={() => setHoveredTradie(null)}
              onClick={(tradie) => handleTradieClick(tradie)}
            />
          );
        })}

        {/* Legend */}
        <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur-sm border border-border rounded-lg p-4 shadow-sm">
          <h4 className="text-sm font-medium text-foreground mb-2">Trade Categories</h4>
          <div className="space-y-2">
            {categories?.map((category) => {
              const count = tradiesByCategory?.[category?.id]?.length || 0;
              return (
                <div key={category?.id} className="flex items-center gap-2">
                  <div className={cn(
                    "w-3 h-3 rounded-full",
                    category?.color
                  )} />
                  <span className="text-xs text-muted-foreground">
                    {category?.name} ({count})
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tradie Details Overlay */}
      {selectedTradie && (
        <div className="absolute inset-x-4 bottom-4 bg-white border border-border rounded-xl p-4 shadow-lg">
          <div className="flex items-center gap-3">
            <div className={cn(
              "w-12 h-12 rounded-lg flex items-center justify-center",
              categories?.find(cat => cat?.id === selectedTradie?.category)?.color
            )}>
              <Icon 
                name={categories?.find(cat => cat?.id === selectedTradie?.category)?.icon} 
                size={20} 
                className="text-white" 
              />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-foreground">{selectedTradie?.name}</h3>
              <p className="text-sm text-muted-foreground">
                {categories?.find(cat => cat?.id === selectedTradie?.category)?.name}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <div className="flex items-center gap-1">
                  <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                  <span className="text-sm font-medium">{selectedTradie?.trustScore}</span>
                </div>
                <span className="text-sm text-muted-foreground">•</span>
                <span className="text-sm text-primary font-medium">{selectedTradie?.startingPrice}</span>
              </div>
            </div>
            <button
              onClick={() => setSelectedTradie(null)}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapView;