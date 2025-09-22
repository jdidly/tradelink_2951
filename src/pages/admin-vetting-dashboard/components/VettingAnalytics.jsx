import React from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const VettingAnalytics = ({ data, className }) => {
  const statsCards = [
    {
      title: 'Total Applications',
      value: data?.totalApplications,
      change: '+12%',
      changeType: 'positive',
      icon: 'FileText',
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    },
    {
      title: 'Pending Review',
      value: data?.pendingReview,
      change: '-5%',
      changeType: 'positive',
      icon: 'Clock',
      color: 'text-warning',
      bgColor: 'bg-warning/10'
    },
    {
      title: 'Approved Today',
      value: data?.approvedToday,
      change: '+23%',
      changeType: 'positive',
      icon: 'CheckCircle',
      color: 'text-success',
      bgColor: 'bg-success/10'
    },
    {
      title: 'Rejection Rate',
      value: `${100 - data?.approvalRate}%`,
      change: '-3%',
      changeType: 'positive',
      icon: 'XCircle',
      color: 'text-destructive',
      bgColor: 'bg-destructive/10'
    }
  ];

  const suburbData = [
    { name: 'Bondi Beach', filled: data?.suburbCoverage?.bondiBeach?.filled, total: data?.suburbCoverage?.bondiBeach?.total },
    { name: 'Paddington', filled: data?.suburbCoverage?.paddington?.filled, total: data?.suburbCoverage?.paddington?.total },
    { name: 'Surry Hills', filled: data?.suburbCoverage?.surryHills?.filled, total: data?.suburbCoverage?.surryHills?.total },
    { name: 'Woollahra', filled: data?.suburbCoverage?.woollahra?.filled, total: data?.suburbCoverage?.woollahra?.total }
  ];

  return (
    <div className={cn("space-y-6", className)}>
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {statsCards?.map((stat, index) => (
          <div
            key={index}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-sm transition-shadow"
          >
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1">{stat?.title}</p>
                <p className="text-2xl font-bold text-foreground">{stat?.value}</p>
                <div className="flex items-center mt-1">
                  <span className={cn(
                    "text-xs font-medium",
                    stat?.changeType === 'positive' ? 'text-success' : 'text-destructive'
                  )}>
                    {stat?.change}
                  </span>
                  <span className="text-xs text-muted-foreground ml-1">vs last week</span>
                </div>
              </div>
              <div className={cn(
                "w-10 h-10 rounded-lg flex items-center justify-center",
                stat?.bgColor
              )}>
                <Icon name={stat?.icon} size={20} className={stat?.color} />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Processing Time & Approval Rate */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Processing Efficiency */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Processing Efficiency</h3>
            <Icon name="TrendingUp" size={20} className="text-success" />
          </div>
          
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Average Processing Time</span>
                <span className="font-semibold text-foreground">{data?.averageProcessingTime}</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-success h-2 rounded-full" style={{ width: '75%' }} />
              </div>
            </div>
            
            <div>
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-muted-foreground">Approval Rate</span>
                <span className="font-semibold text-foreground">{data?.approvalRate}%</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div className="bg-primary h-2 rounded-full" style={{ width: `${data?.approvalRate}%` }} />
              </div>
            </div>
          </div>
        </div>

        {/* Suburb Coverage */}
        <div className="bg-card border border-border rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold text-foreground">Suburb Coverage</h3>
            <Icon name="MapPin" size={20} className="text-blue-600" />
          </div>
          
          <div className="space-y-3">
            {suburbData?.map((suburb, index) => {
              const percentage = Math.round((suburb?.filled / suburb?.total) * 100);
              const isNearFull = percentage >= 80;
              
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-foreground">{suburb?.name}</span>
                    <div className="flex items-center space-x-2">
                      <span className="text-xs text-muted-foreground">
                        {suburb?.filled}/{suburb?.total}
                      </span>
                      {isNearFull && (
                        <Icon name="AlertCircle" size={14} className="text-warning" />
                      )}
                    </div>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={cn(
                        "h-2 rounded-full transition-all",
                        isNearFull ? "bg-warning" : "bg-primary"
                      )}
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Weekly Trends */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-foreground">Weekly Trends</h3>
          <div className="flex items-center space-x-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-primary rounded-full" />
              <span className="text-muted-foreground">Applications</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-3 h-3 bg-success rounded-full" />
              <span className="text-muted-foreground">Approved</span>
            </div>
          </div>
        </div>

        {/* Simple bar chart representation */}
        <div className="grid grid-cols-7 gap-2">
          {data?.trendData?.map((day, index) => {
            const maxApplications = Math.max(...data?.trendData?.map(d => d?.applications));
            const applicationHeight = (day?.applications / maxApplications) * 60;
            const approvedHeight = (day?.approved / maxApplications) * 60;
            
            return (
              <div key={index} className="flex flex-col items-center space-y-2">
                <div className="flex items-end space-x-1 h-16">
                  <div
                    className="w-4 bg-primary rounded-t"
                    style={{ height: `${applicationHeight}px` }}
                    title={`${day?.applications} applications`}
                  />
                  <div
                    className="w-4 bg-success rounded-t"
                    style={{ height: `${approvedHeight}px` }}
                    title={`${day?.approved} approved`}
                  />
                </div>
                <span className="text-xs text-muted-foreground">
                  {new Date(day?.date)?.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default VettingAnalytics;