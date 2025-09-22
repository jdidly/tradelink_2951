import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const FilterBar = ({
  onFilterChange,
  activeFilters,
  onBulkAction,
  className
}) => {
  const [selectedApplications, setSelectedApplications] = useState([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending' },
    { value: 'under_review', label: 'Under Review' },
    { value: 'flagged', label: 'Flagged' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' }
  ];

  const tradeCategoryOptions = [
    { value: 'all', label: 'All Trades' },
    { value: 'Plumber', label: 'Plumber' },
    { value: 'Electrician', label: 'Electrician' },
    { value: 'Painter', label: 'Painter' },
    { value: 'Roofer', label: 'Roofer' },
    { value: 'AC', label: 'Air Conditioning' }
  ];

  const suburbOptions = [
    { value: 'all', label: 'All Suburbs' },
    { value: 'Bondi Beach', label: 'Bondi Beach' },
    { value: 'Paddington', label: 'Paddington' },
    { value: 'Surry Hills', label: 'Surry Hills' },
    { value: 'Woollahra', label: 'Woollahra' },
    { value: 'Double Bay', label: 'Double Bay' }
  ];

  const dateRangeOptions = [
    { value: '1day', label: 'Last 24 hours' },
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: '90days', label: 'Last 90 days' },
    { value: 'all', label: 'All time' }
  ];

  const sortByOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'urgent', label: 'Most Urgent' },
    { value: 'suburb', label: 'By Suburb' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({ [filterType]: value });
  };

  const handleBulkAction = (action) => {
    onBulkAction?.(action, selectedApplications);
    setSelectedApplications([]);
    setShowBulkActions(false);
  };

  const clearFilters = () => {
    onFilterChange({
      status: 'all',
      tradeCategory: 'all',
      suburb: 'all',
      dateRange: '7days',
      sortBy: 'newest'
    });
  };

  const hasActiveFilters = Object.values(activeFilters)?.some(value => 
    value !== 'all' && value !== 'newest' && value !== '7days'
  );

  return (
    <div className={cn("space-y-4", className)}>
      {/* Filter Controls */}
      <div className="bg-card border border-border rounded-lg p-4">
        <div className="flex flex-wrap items-center gap-4">
          {/* Status Filter */}
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <Select
              value={activeFilters?.status}
              onValueChange={(value) => handleFilterChange('status', value)}
              options={statusOptions}
              placeholder="Status"
              className="min-w-[140px]"
            />
          </div>

          {/* Trade Category Filter */}
          <Select
            value={activeFilters?.tradeCategory}
            onValueChange={(value) => handleFilterChange('tradeCategory', value)}
            options={tradeCategoryOptions}
            placeholder="Trade"
            className="min-w-[140px]"
          />

          {/* Suburb Filter */}
          <Select
            value={activeFilters?.suburb}
            onValueChange={(value) => handleFilterChange('suburb', value)}
            options={suburbOptions}
            placeholder="Suburb"
            className="min-w-[140px]"
          />

          {/* Date Range Filter */}
          <Select
            value={activeFilters?.dateRange}
            onValueChange={(value) => handleFilterChange('dateRange', value)}
            options={dateRangeOptions}
            placeholder="Date Range"
            className="min-w-[150px]"
          />

          {/* Sort By */}
          <div className="flex items-center space-x-2">
            <Icon name="ArrowUpDown" size={16} className="text-muted-foreground" />
            <Select
              value={activeFilters?.sortBy}
              onValueChange={(value) => handleFilterChange('sortBy', value)}
              options={sortByOptions}
              placeholder="Sort By"
              className="min-w-[140px]"
            />
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear
            </Button>
          )}

          {/* Bulk Actions Toggle */}
          <div className="ml-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowBulkActions(!showBulkActions)}
              iconName="CheckSquare"
              iconPosition="left"
            >
              Bulk Actions
            </Button>
          </div>
        </div>

        {/* Active Filters Display */}
        {hasActiveFilters && (
          <div className="mt-3 pt-3 border-t border-border">
            <div className="flex items-center space-x-2 text-sm">
              <span className="text-muted-foreground">Active filters:</span>
              <div className="flex items-center space-x-2">
                {activeFilters?.status !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    Status: {activeFilters?.status}
                  </span>
                )}
                {activeFilters?.tradeCategory !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    Trade: {activeFilters?.tradeCategory}
                  </span>
                )}
                {activeFilters?.suburb !== 'all' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    Suburb: {activeFilters?.suburb}
                  </span>
                )}
                {activeFilters?.dateRange !== '7days' && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs">
                    Date: {dateRangeOptions?.find(opt => opt?.value === activeFilters?.dateRange)?.label}
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Bulk Actions Bar */}
      {showBulkActions && (
        <div className="bg-accent/50 border border-border rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <span className="text-sm font-medium text-foreground">
                Bulk Actions {selectedApplications?.length > 0 && `(${selectedApplications?.length} selected)`}
              </span>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedApplications([])}
                  disabled={selectedApplications?.length === 0}
                >
                  Clear Selection
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setSelectedApplications(['1', '2', '3', '4'])} // Mock selection
                >
                  Select All Visible
                </Button>
              </div>
            </div>
            
            {selectedApplications?.length > 0 && (
              <div className="flex items-center space-x-2">
                <Button
                  variant="success"
                  size="sm"
                  onClick={() => handleBulkAction('approve')}
                  iconName="Check"
                  iconPosition="left"
                >
                  Approve Selected
                </Button>
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => handleBulkAction('reject')}
                  iconName="X"
                  iconPosition="left"
                >
                  Reject Selected
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => handleBulkAction('request_info')}
                  iconName="MessageSquare"
                  iconPosition="left"
                >
                  Request Info
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default FilterBar;