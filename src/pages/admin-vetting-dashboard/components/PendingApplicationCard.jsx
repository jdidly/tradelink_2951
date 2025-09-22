import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const PendingApplicationCard = ({ 
  application, 
  isSelected, 
  onSelect, 
  onQuickAction, 
  onViewProfile 
}) => {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'text-destructive bg-destructive/10';
      case 'high': return 'text-warning bg-warning/10';
      case 'medium': return 'text-info bg-info/10';
      default: return 'text-muted-foreground bg-muted/50';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'in_progress': return 'text-info bg-info/10';
      default: return 'text-muted-foreground bg-muted/50';
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const diffMs = now - date;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);

    if (diffHours < 1) return 'Just now';
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return date?.toLocaleDateString();
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start space-x-4">
        {/* Selection Checkbox */}
        <div className="flex items-center pt-1">
          <input
            type="checkbox"
            checked={isSelected}
            onChange={(e) => onSelect(application?.id, e?.target?.checked)}
            className="rounded"
          />
        </div>

        {/* Applicant Photo & Basic Info */}
        <div className="flex-shrink-0">
          <img
            src={application?.applicant?.photo}
            alt={application?.applicant?.name}
            className="w-16 h-16 rounded-lg object-cover"
            onError={(e) => {
              e.target.src = '/assets/images/no_image.png';
            }}
          />
        </div>

        {/* Main Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between mb-3">
            <div>
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-lg font-semibold text-foreground">
                  {application?.applicant?.name}
                </h3>
                <span className="text-2xl" title={application?.trade}>
                  {application?.tradeIcon}
                </span>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(application?.priority)}`}>
                  {application?.priority?.toUpperCase()}
                </span>
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>{application?.trade}</span>
                <span>•</span>
                <span>{application?.experience}</span>
                <span>•</span>
                <span>{formatDate(application?.applicationDate)}</span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-lg font-bold text-foreground">
                {application?.completionScore}%
              </div>
              <div className="text-xs text-muted-foreground">Complete</div>
            </div>
          </div>

          {/* Suburbs */}
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="MapPin" size={14} className="text-muted-foreground" />
            <div className="flex flex-wrap gap-1">
              {application?.suburbs?.map((suburb, index) => (
                <span
                  key={index}
                  className="px-2 py-1 bg-muted/50 rounded text-xs text-foreground"
                >
                  {suburb}
                </span>
              ))}
            </div>
          </div>

          {/* Document Status */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-2 mb-4">
            {Object.entries(application?.documents)?.map(([docType, doc]) => (
              <div key={docType} className="text-center">
                <div className={`text-xs px-2 py-1 rounded ${getStatusColor(doc?.status)}`}>
                  {docType?.charAt(0)?.toUpperCase() + docType?.slice(1)?.replace(/([A-Z])/g, ' $1')}
                </div>
              </div>
            ))}
          </div>

          {/* Specialties */}
          <div className="flex flex-wrap gap-1 mb-4">
            {application?.specialties?.slice(0, 3)?.map((specialty, index) => (
              <span
                key={index}
                className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
              >
                {specialty}
              </span>
            ))}
            {application?.specialties?.length > 3 && (
              <span className="px-2 py-1 text-muted-foreground text-xs">
                +{application?.specialties?.length - 3} more
              </span>
            )}
          </div>

          {/* Previous Platform Ratings */}
          <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-4">
            <Icon name="Star" size={14} />
            {application?.previousPlatforms?.map((platform, index) => (
              <span key={index}>{platform}</span>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              size="sm"
              iconName="Eye"
              iconPosition="left"
              onClick={() => onViewProfile(application)}
            >
              View Details
            </Button>

            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="MessageSquare"
                onClick={() => onQuickAction(application?.id, 'request_info')}
                className="text-warning hover:bg-warning/10"
              >
                Info
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="X"
                onClick={() => onQuickAction(application?.id, 'reject')}
                className="text-destructive hover:bg-destructive/10"
              >
                Reject
              </Button>
              <Button
                variant="default"
                size="sm"
                iconName="Check"
                onClick={() => onQuickAction(application?.id, 'approve')}
              >
                Approve
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PendingApplicationCard;