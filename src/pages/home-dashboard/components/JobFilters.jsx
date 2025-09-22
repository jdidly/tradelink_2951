import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const JobFilters = ({ onFilterChange, activeFilters }) => {
  const [showFilters, setShowFilters] = useState(false);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'budget-high', label: 'Highest Budget' },
    { value: 'budget-low', label: 'Lowest Budget' },
    { value: 'distance', label: 'Closest First' },
    { value: 'urgent', label: 'Most Urgent' }
  ];

  const distanceOptions = [
    { value: 'all', label: 'All Distances' },
    { value: '5', label: 'Within 5km' },
    { value: '10', label: 'Within 10km' },
    { value: '20', label: 'Within 20km' },
    { value: '50', label: 'Within 50km' }
  ];

  const budgetOptions = [
    { value: 'all', label: 'All Budgets' },
    { value: '0-100', label: '$0 - $100' },
    { value: '100-500', label: '$100 - $500' },
    { value: '500-1000', label: '$500 - $1,000' },
    { value: '1000-5000', label: '$1,000 - $5,000' },
    { value: '5000+', label: '$5,000+' }
  ];

  const categoryOptions = [
    { value: 'all', label: 'All Categories' },
    { value: 'plumbing', label: 'Plumbing' },
    { value: 'electrical', label: 'Electrical' },
    { value: 'painting', label: 'Painting' },
    { value: 'roofing', label: 'Roofing' },
    { value: 'ac', label: 'Air Conditioning' }
  ];

  const urgencyOptions = [
    { value: 'all', label: 'All Urgency' },
    { value: 'urgent', label: 'Urgent Only' },
    { value: 'soon', label: 'Soon' },
    { value: 'flexible', label: 'Flexible' }
  ];

  const handleFilterChange = (filterType, value) => {
    onFilterChange({
      ...activeFilters,
      [filterType]: value
    });
  };

  const clearAllFilters = () => {
    onFilterChange({
      sort: 'newest',
      distance: 'all',
      budget: 'all',
      category: 'all',
      urgency: 'all'
    });
  };

  const getActiveFilterCount = () => {
    return Object.values(activeFilters)?.filter(value => value !== 'all' && value !== 'newest')?.length;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-foreground">Filter Jobs</h3>
          {getActiveFilterCount() > 0 && (
            <div className="bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded-full">
              {getActiveFilterCount()} active
            </div>
          )}
        </div>
        <div className="flex items-center space-x-2">
          {getActiveFilterCount() > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={clearAllFilters}
              iconName="X"
              iconPosition="left"
            >
              Clear All
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowFilters(!showFilters)}
            iconName={showFilters ? "ChevronUp" : "ChevronDown"}
            iconPosition="right"
          >
            {showFilters ? 'Hide' : 'Show'} Filters
          </Button>
        </div>
      </div>
      {/* Quick Sort */}
      <div className="mb-4">
        <Select
          label="Sort by"
          options={sortOptions}
          value={activeFilters?.sort || 'newest'}
          onChange={(value) => handleFilterChange('sort', value)}
          className="w-full"
        />
      </div>
      {/* Detailed Filters */}
      {showFilters && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Select
            label="Distance"
            options={distanceOptions}
            value={activeFilters?.distance || 'all'}
            onChange={(value) => handleFilterChange('distance', value)}
          />

          <Select
            label="Budget Range"
            options={budgetOptions}
            value={activeFilters?.budget || 'all'}
            onChange={(value) => handleFilterChange('budget', value)}
          />

          <Select
            label="Category"
            options={categoryOptions}
            value={activeFilters?.category || 'all'}
            onChange={(value) => handleFilterChange('category', value)}
          />

          <Select
            label="Urgency"
            options={urgencyOptions}
            value={activeFilters?.urgency || 'all'}
            onChange={(value) => handleFilterChange('urgency', value)}
          />
        </div>
      )}
      {/* Filter Summary */}
      {getActiveFilterCount() > 0 && (
        <div className="mt-4 pt-4 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {Object.entries(activeFilters)?.map(([key, value]) => {
              if (value === 'all' || value === 'newest' || !value) return null;
              
              const getFilterLabel = (filterKey, filterValue) => {
                const option = {
                  distance: distanceOptions,
                  budget: budgetOptions,
                  category: categoryOptions,
                  urgency: urgencyOptions,
                  sort: sortOptions
                }?.[filterKey]?.find(opt => opt?.value === filterValue);
                
                return option ? `${filterKey}: ${option?.label}` : `${filterKey}: ${filterValue}`;
              };

              return (
                <div
                  key={key}
                  className="flex items-center space-x-1 bg-primary/10 text-primary text-xs font-medium px-2 py-1 rounded-full"
                >
                  <span>{getFilterLabel(key, value)}</span>
                  <button
                    onClick={() => handleFilterChange(key, key === 'sort' ? 'newest' : 'all')}
                    className="hover:bg-primary/20 rounded-full p-0.5"
                  >
                    <Icon name="X" size={10} />
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default JobFilters;