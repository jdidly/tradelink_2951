import React from 'react';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const SuburbSelector = ({ 
  suburbs, 
  selectedSuburb, 
  onSuburbSelect, 
  loading = false 
}) => {
  return (
    <div className="w-full">
      <Select
        options={suburbs}
        value={selectedSuburb}
        onChange={onSuburbSelect}
        placeholder="Select your suburb..."
        searchable={true}
        clearable={true}
        loading={loading}
        className="text-lg"
        label="Choose Your Location"
        description="Search and select your suburb to find local tradies"
      />
      
      {selectedSuburb && (
        <div className="mt-4 p-4 bg-primary/5 border border-primary/20 rounded-lg">
          <div className="flex items-center gap-2 text-sm text-primary">
            <Icon name="MapPin" size={16} />
            <span className="font-medium">
              Searching in: {suburbs?.find(s => s?.value === selectedSuburb)?.label}
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

export default SuburbSelector;