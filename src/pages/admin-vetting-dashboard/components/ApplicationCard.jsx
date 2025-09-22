import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const ApplicationCard = ({
  application,
  onView,
  onApprove,
  onReject,
  onRequestInfo,
  className
}) => {
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'bg-warning/10 text-warning border-warning/20';
      case 'under_review': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'flagged': return 'bg-destructive/10 text-destructive border-destructive/20';
      case 'approved': return 'bg-success/10 text-success border-success/20';
      case 'rejected': return 'bg-muted text-muted-foreground border-muted/20';
      default: return 'bg-muted text-muted-foreground border-muted/20';
    }
  };

  const getUrgencyIcon = (level) => {
    switch (level) {
      case 'high': return { icon: 'AlertTriangle', color: 'text-destructive' };
      case 'medium': return { icon: 'Clock', color: 'text-warning' };
      case 'low': return { icon: 'Info', color: 'text-muted-foreground' };
      default: return { icon: 'Info', color: 'text-muted-foreground' };
    }
  };

  const getTradeIcon = (category) => {
    const icons = {
      'Plumber': 'Droplets',
      'Electrician': 'Zap',
      'Painter': 'Paintbrush2',
      'Roofer': 'Home',
      'AC': 'Thermometer'
    };
    return icons?.[category] || 'Wrench';
  };

  const getDocumentProgress = () => {
    const docs = application?.documents;
    if (!docs) return { completed: 0, total: 0, percentage: 0 };
    
    const total = Object.keys(docs)?.length;
    const completed = Object.values(docs)?.filter(doc => doc?.status === 'verified')?.length;
    const percentage = Math.round((completed / total) * 100);
    
    return { completed, total, percentage };
  };

  const urgencyData = getUrgencyIcon(application?.urgencyLevel);
  const docProgress = getDocumentProgress();
  const timeAgo = new Date(application?.applicationDate)?.toLocaleString();

  return (
    <div className={cn("p-6 hover:bg-accent/50 transition-colors", className)}>
      <div className="flex items-start justify-between">
        {/* Left Section - Applicant Info */}
        <div className="flex items-start space-x-4 flex-1">
          <div className="relative">
            <img
              src={application?.avatar}
              alt={application?.applicantName}
              className="w-12 h-12 rounded-full object-cover border-2 border-border"
            />
            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-primary rounded-full flex items-center justify-center">
              <Icon 
                name={getTradeIcon(application?.tradeCategory)} 
                size={12} 
                color="white" 
              />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-center space-x-3 mb-2">
              <h3 className="font-semibold text-foreground truncate">
                {application?.applicantName}
              </h3>
              <span className={cn(
                "inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border",
                getStatusColor(application?.status)
              )}>
                {application?.status?.replace('_', ' ')}
              </span>
              <div className="flex items-center space-x-1">
                <Icon 
                  name={urgencyData?.icon} 
                  size={14} 
                  className={urgencyData?.color} 
                />
                <span className={cn("text-xs", urgencyData?.color)}>
                  {application?.urgencyLevel}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-2">
                <Icon name="Briefcase" size={14} />
                <span>{application?.tradeCategory}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="MapPin" size={14} />
                <span>{application?.suburb}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Calendar" size={14} />
                <span>{application?.experienceYears}y exp</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="DollarSign" size={14} />
                <span>${application?.pricing?.hourlyMin}-${application?.pricing?.hourlyMax}/hr</span>
              </div>
            </div>

            {/* Document Progress */}
            <div className="flex items-center space-x-4">
              <div className="flex-1">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-muted-foreground">Documents</span>
                  <span className="text-foreground font-medium">
                    {docProgress?.completed}/{docProgress?.total} verified
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${docProgress?.percentage}%` }}
                  />
                </div>
              </div>
              
              {/* Slots Available */}
              <div className="text-xs">
                <span className="text-muted-foreground">Slots: </span>
                <span className={cn(
                  "font-medium",
                  application?.suburbSlots?.available > 0 ? "text-success" : "text-destructive"
                )}>
                  {application?.suburbSlots?.available}/{application?.suburbSlots?.total}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section - Actions */}
        <div className="flex items-center space-x-2 ml-4">
          <Button
            variant="ghost"
            size="sm"
            iconName="Eye"
            onClick={onView}
            className="text-muted-foreground hover:text-foreground"
          />
          
          {application?.status === 'pending' && (
            <>
              <Button
                variant="success"
                size="sm"
                iconName="Check"
                onClick={onApprove}
                disabled={application?.suburbSlots?.available === 0}
              />
              <Button
                variant="destructive"
                size="sm"
                iconName="X"
                onClick={onReject}
              />
            </>
          )}
          
          {(application?.status === 'under_review' || application?.status === 'flagged') && (
            <Button
              variant="outline"
              size="sm"
              iconName="MessageSquare"
              onClick={onRequestInfo}
            >
              Request Info
            </Button>
          )}
        </div>
      </div>

      {/* Bottom Info */}
      <div className="mt-4 pt-3 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Applied {timeAgo}</span>
          <div className="flex items-center space-x-4">
            <span>Rating: {application?.previousPlatformRating}/5.0</span>
            <span>Refs: {application?.referenceRating}/5.0</span>
            <span className="capitalize">BG: {application?.backgroundCheck?.replace('_', ' ')}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationCard;