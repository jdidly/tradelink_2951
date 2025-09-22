import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const TradieProfileCard = ({ tradie, onCallClick, onMessageClick, onQuoteClick }) => {
  return (
    <div className="bg-card border border-border rounded-xl overflow-hidden mb-8">
      {/* Cover Image */}
      <div 
        className="h-48 bg-gradient-to-r from-primary/20 to-success/20 relative"
        style={{
          backgroundImage: tradie?.coverImage ? `url(${tradie?.coverImage})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="absolute inset-0 bg-black/20" />
      </div>

      <div className="p-6">
        <div className="flex flex-col md:flex-row md:items-start gap-6">
          {/* Avatar and Basic Info */}
          <div className="flex items-start gap-4">
            <div className="relative">
              <img 
                src={tradie?.avatar} 
                alt={tradie?.name}
                className="w-20 h-20 rounded-xl object-cover border-4 border-white shadow-lg"
              />
              <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-success rounded-full flex items-center justify-center">
                <Icon name="Check" size={14} className="text-white" />
              </div>
            </div>
            
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-foreground mb-2">{tradie?.name}</h1>
              <div className="flex items-center gap-2 mb-3">
                <div className="flex items-center gap-1">
                  <Icon name={tradie?.categoryIcon} size={16} className="text-primary" />
                  <span className="font-medium text-foreground">{tradie?.category}</span>
                </div>
                <span className="text-muted-foreground">•</span>
                <div className="flex items-center gap-1">
                  <Icon name="MapPin" size={14} className="text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">Eastern Suburbs</span>
                </div>
              </div>

              {/* Trust Score */}
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        size={16} 
                        className={cn(
                          "fill-current",
                          i < Math.floor(tradie?.trustScore) ? "text-yellow-500" : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-foreground">{tradie?.trustScore}</span>
                  <span className="text-sm text-muted-foreground">({tradie?.localReviews} reviews)</span>
                </div>
              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {tradie?.badges?.map((badge, index) => (
                  <span 
                    key={index}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-xs font-medium rounded-full"
                  >
                    <Icon name="Shield" size={12} />
                    {badge}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3 min-w-0 md:min-w-[200px]">
            <Button 
              className="w-full" 
              size="lg"
              iconName="Phone" 
              iconPosition="left"
              onClick={onCallClick}
            >
              Call Now
            </Button>
            <Button 
              variant="outline" 
              className="w-full"
              size="lg"
              iconName="MessageCircle" 
              iconPosition="left"
              onClick={onMessageClick}
            >
              Message
            </Button>
            <Button 
              variant="secondary" 
              className="w-full"
              size="lg"
              iconName="FileText" 
              iconPosition="left"
              onClick={onQuoteClick}
            >
              Get Quote
            </Button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{tradie?.responseTime}</div>
            <div className="text-sm text-muted-foreground">Response Time</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{tradie?.yearsExperience}+</div>
            <div className="text-sm text-muted-foreground">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{tradie?.completedJobs}</div>
            <div className="text-sm text-muted-foreground">Jobs Completed</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">{tradie?.suburbs?.length}</div>
            <div className="text-sm text-muted-foreground">Service Areas</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TradieProfileCard;