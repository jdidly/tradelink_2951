import React from 'react';
import Icon from '../../../components/AppIcon';

const QuickStats = ({ stats }) => {
  const getScoreColor = (score) => {
    if (score >= 4.5) return 'text-success';
    if (score >= 4.0) return 'text-warning';
    return 'text-error';
  };

  const getCompletionColor = (percentage) => {
    if (percentage >= 80) return 'text-success';
    if (percentage >= 60) return 'text-warning';
    return 'text-error';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <h3 className="text-lg font-semibold text-foreground mb-6">Quick Stats</h3>
      <div className="space-y-6">
        {/* Profile Completion */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
              <Icon name="User" size={20} className="text-primary" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Profile Completion</div>
              <div className="text-xs text-muted-foreground">Complete your profile to get more jobs</div>
            </div>
          </div>
          <div className={`text-lg font-bold ${getCompletionColor(stats?.profileCompletion)}`}>
            {stats?.profileCompletion}%
          </div>
        </div>

        {/* LocalTrust Score */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-success/10 rounded-lg flex items-center justify-center">
              <Icon name="Shield" size={20} className="text-success" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">LocalTrust™ Score</div>
              <div className="text-xs text-muted-foreground">Based on {stats?.localReviews} local reviews</div>
            </div>
          </div>
          <div className={`text-lg font-bold ${getScoreColor(stats?.trustScore)}`}>
            ★ {stats?.trustScore}
          </div>
        </div>

        {/* Recent Inquiries */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
              <Icon name="MessageCircle" size={20} className="text-accent" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Recent Inquiries</div>
              <div className="text-xs text-muted-foreground">Last 7 days</div>
            </div>
          </div>
          <div className="text-lg font-bold text-foreground">
            {stats?.recentInquiries}
          </div>
        </div>

        {/* Response Time */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-warning/10 rounded-lg flex items-center justify-center">
              <Icon name="Clock" size={20} className="text-warning" />
            </div>
            <div>
              <div className="text-sm font-medium text-foreground">Avg Response Time</div>
              <div className="text-xs text-muted-foreground">Keep it under 2 hours</div>
            </div>
          </div>
          <div className="text-lg font-bold text-foreground">
            {stats?.responseTime}
          </div>
        </div>

        {/* Suburb Badge */}
        {stats?.suburbBadge && (
          <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
            <div className="flex items-center space-x-2 mb-2">
              <Icon name="Award" size={16} className="text-primary" />
              <span className="text-sm font-medium text-primary">Local Expert Badge</span>
            </div>
            <div className="text-xs text-muted-foreground">
              Top-rated tradie in {stats?.suburbBadge}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuickStats;