import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ApplicationFilters = ({ onFilterChange, activeFilters }) => {
  const handleFilterUpdate = (key, value) => {
    const newFilters = { ...activeFilters, [key]: value };
    onFilterChange(newFilters);
  };

  const clearFilters = () => {
    const defaultFilters = {
      status: 'pending',
      trade: 'all',
      suburb: 'all',
      dateRange: '7days',
      sortBy: 'newest'
    };
    onFilterChange(defaultFilters);
  };

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'pending', label: 'Pending Review' },
    { value: 'approved', label: 'Approved' },
    { value: 'rejected', label: 'Rejected' },
    { value: 'info_requested', label: 'Info Requested' }
  ];

  const tradeOptions = [
    { value: 'all', label: 'All Trades' },
    { value: 'Plumber', label: 'Plumber' },
    { value: 'Electrician', label: 'Electrician' },
    { value: 'Painter', label: 'Painter' },
    { value: 'Roofer', label: 'Roofer' },
    { value: 'AC Tech', label: 'AC Tech' }
  ];

  const suburbOptions = [
    { value: 'all', label: 'All Suburbs' },
    { value: 'Bondi Beach', label: 'Bondi Beach' },
    { value: 'Paddington', label: 'Paddington' },
    { value: 'Surry Hills', label: 'Surry Hills' },
    { value: 'Double Bay', label: 'Double Bay' },
    { value: 'Woollahra', label: 'Woollahra' }
  ];

  const dateRangeOptions = [
    { value: '1day', label: 'Last 24 hours' },
    { value: '7days', label: 'Last 7 days' },
    { value: '30days', label: 'Last 30 days' },
    { value: 'all', label: 'All time' }
  ];

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'priority', label: 'Priority' },
    { value: 'completion', label: 'Completion Score' },
    { value: 'trade', label: 'Trade Category' }
  ];

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Filters & Search</h3>
        <Button
          variant="outline"
          size="sm"
          iconName="RotateCcw"
          onClick={clearFilters}
        >
          Clear
        </Button>
      </div>
      {/* Search Bar */}
      <div className="mb-4">
        <Input
          placeholder="Search by name, email, or application ID..."
          iconName="Search"
          iconPosition="left"
          onChange={(e) => console.log('Search:', e?.target?.value)}
        />
      </div>
      {/* Filter Controls */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        <Select
          label="Status"
          value={activeFilters?.status}
          onChange={(value) => handleFilterUpdate('status', value)}
          options={statusOptions}
        />

        <Select
          label="Trade"
          value={activeFilters?.trade}
          onChange={(value) => handleFilterUpdate('trade', value)}
          options={tradeOptions}
        />

        <Select
          label="Suburb"
          value={activeFilters?.suburb}
          onChange={(value) => handleFilterUpdate('suburb', value)}
          options={suburbOptions}
        />

        <Select
          label="Date Range"
          value={activeFilters?.dateRange}
          onChange={(value) => handleFilterUpdate('dateRange', value)}
          options={dateRangeOptions}
        />

        <Select
          label="Sort By"
          value={activeFilters?.sortBy}
          onChange={(value) => handleFilterUpdate('sortBy', value)}
          options={sortOptions}
        />
      </div>
      {/* Active Filters Display */}
      {Object.values(activeFilters)?.some(filter => filter !== 'all' && filter !== 'newest' && filter !== 'pending') && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex items-center space-x-2 text-sm">
            <Icon name="Filter" size={16} className="text-muted-foreground" />
            <span className="text-muted-foreground">Active filters:</span>
            {Object.entries(activeFilters)?.map(([key, value]) => {
              if (value === 'all' || (key === 'sortBy' && value === 'newest') || (key === 'status' && value === 'pending')) return null;
              return (
                <span
                  key={key}
                  className="px-2 py-1 bg-primary/10 text-primary rounded text-xs"
                >
                  {key}: {value}
                </span>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default ApplicationFilters;