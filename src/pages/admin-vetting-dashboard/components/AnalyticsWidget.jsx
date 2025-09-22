import React from 'react';
import Icon from '../../../components/AppIcon';

const AnalyticsWidget = ({ data }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Analytics Overview</h3>
        <Icon name="BarChart3" size={20} className="text-primary" />
      </div>
      {/* Key Metrics */}
      <div className="space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Approval Rate</span>
          <div className="flex items-center space-x-2">
            <div className="w-16 h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-success"
                style={{ width: `${data?.approvalRate}%` }}
              ></div>
            </div>
            <span className="text-foreground font-medium">{data?.approvalRate}%</span>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Processing Time</span>
          <span className="text-foreground font-medium">{data?.averageProcessingTime}</span>
        </div>

        <div className="flex items-center justify-between">
          <span className="text-muted-foreground">Total Applications</span>
          <span className="text-foreground font-medium">{data?.totalApplications}</span>
        </div>
      </div>
      {/* Trade Distribution */}
      <div className="mb-6">
        <h4 className="text-sm font-medium text-foreground mb-3">Trade Category Status</h4>
        <div className="space-y-2">
          {data?.tradeDistribution?.map((trade) => (
            <div key={trade?.trade} className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">{trade?.trade}</span>
              <div className="flex items-center space-x-2">
                <span className="text-foreground">{trade?.approved}/{trade?.applied}</span>
                <span className={`px-1 py-0.5 rounded text-xs ${
                  trade?.spots > 0 
                    ? 'bg-success/10 text-success' :'bg-muted text-muted-foreground'
                }`}>
                  {trade?.spots} slots
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Suburb Coverage */}
      <div>
        <h4 className="text-sm font-medium text-foreground mb-3">Suburb Coverage</h4>
        
        <div className="mb-3">
          <div className="text-xs text-muted-foreground mb-1">Coverage Gaps</div>
          <div className="flex flex-wrap gap-1">
            {data?.suburbCoverage?.gaps?.slice(0, 3)?.map((suburb) => (
              <span key={suburb} className="px-2 py-1 bg-warning/10 text-warning rounded text-xs">
                {suburb}
              </span>
            ))}
            {data?.suburbCoverage?.gaps?.length > 3 && (
              <span className="px-2 py-1 text-muted-foreground text-xs">
                +{data?.suburbCoverage?.gaps?.length - 3} more
              </span>
            )}
          </div>
        </div>

        <div>
          <div className="text-xs text-muted-foreground mb-1">Complete Coverage</div>
          <div className="flex flex-wrap gap-1">
            {data?.suburbCoverage?.complete?.slice(0, 2)?.map((suburb) => (
              <span key={suburb} className="px-2 py-1 bg-success/10 text-success rounded text-xs">
                {suburb}
              </span>
            ))}
            {data?.suburbCoverage?.complete?.length > 2 && (
              <span className="px-2 py-1 text-muted-foreground text-xs">
                +{data?.suburbCoverage?.complete?.length - 2} more
              </span>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsWidget;