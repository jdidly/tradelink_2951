import React from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';
import Button from '../../../components/ui/Button';

const JobCard = ({ job, onApply, onViewDetails }) => {
  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const posted = new Date(timestamp);
    const diffInHours = Math.floor((now - posted) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just posted';
    if (diffInHours < 24) return `${diffInHours}h ago`;
    const diffInDays = Math.floor(diffInHours / 24);
    return `${diffInDays}d ago`;
  };

  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case 'urgent': return 'text-error bg-error/10';
      case 'soon': return 'text-warning bg-warning/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getCategoryIcon = (category) => {
    const iconMap = {
      'Plumbing': 'Droplets',
      'Electrical': 'Zap',
      'Painting': 'Paintbrush2',
      'Roofing': 'Home',
      'AC': 'Snowflake'
    };
    return iconMap?.[category] || 'Wrench';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-medium transition-all duration-200">
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
            <Icon 
              name={getCategoryIcon(job?.category)} 
              size={20} 
              className="text-primary"
            />
          </div>
          <div>
            <h3 className="font-semibold text-foreground text-lg">{job?.title}</h3>
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={14} />
              <span>{job?.location} • {job?.distance}</span>
            </div>
          </div>
        </div>
        <div className={`text-xs font-medium px-2 py-1 rounded-full ${getUrgencyColor(job?.urgency)}`}>
          {job?.urgency === 'urgent' ? 'Urgent' : job?.urgency === 'soon' ? 'Soon' : 'Flexible'}
        </div>
      </div>
      <p className="text-muted-foreground text-sm mb-4 line-clamp-2">
        {job?.description}
      </p>
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            <Icon name="DollarSign" size={16} className="text-success" />
            <span className="font-semibold text-foreground">${job?.budget?.min} - ${job?.budget?.max}</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={16} className="text-muted-foreground" />
            <span className="text-sm text-muted-foreground">{getTimeAgo(job?.postedAt)}</span>
          </div>
        </div>
      </div>
      {job?.homeowner && (
        <div className="flex items-center space-x-3 mb-4 p-3 bg-muted/50 rounded-lg">
          <Image
            src={job?.homeowner?.avatar}
            alt={job?.homeowner?.name}
            className="w-8 h-8 rounded-full object-cover"
          />
          <div className="flex-1">
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-foreground">{job?.homeowner?.name}</span>
              {job?.homeowner?.verified && (
                <Icon name="CheckCircle" size={14} className="text-success" />
              )}
            </div>
            <div className="flex items-center space-x-1">
              <Icon name="Star" size={12} className="text-warning fill-current" />
              <span className="text-xs text-muted-foreground">{job?.homeowner?.rating} • {job?.homeowner?.reviewCount} reviews</span>
            </div>
          </div>
        </div>
      )}
      <div className="flex items-center space-x-3">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onViewDetails(job)}
          className="flex-1"
        >
          View Details
        </Button>
        <Button
          variant="default"
          size="sm"
          onClick={() => onApply(job)}
          className="flex-1"
          iconName="Send"
          iconPosition="right"
        >
          Apply Now
        </Button>
      </div>
    </div>
  );
};

export default JobCard;