import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const BulkActionPanel = ({ selectedCount, onBulkAction, onClearSelection }) => {
  return (
    <div className="bg-primary/10 border border-primary/20 rounded-lg p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <Icon name="CheckCircle" size={20} className="text-primary" />
          <div>
            <div className="font-medium text-foreground">
              {selectedCount} application{selectedCount !== 1 ? 's' : ''} selected
            </div>
            <div className="text-sm text-muted-foreground">
              Choose a bulk action to apply to all selected applications
            </div>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {/* Bulk Actions */}
          <Button
            variant="outline"
            size="sm"
            iconName="MessageSquare"
            onClick={() => onBulkAction('request_info')}
            className="text-warning hover:bg-warning/10"
          >
            Request Info ({selectedCount})
          </Button>

          <Button
            variant="outline"
            size="sm"
            iconName="X"
            onClick={() => onBulkAction('reject')}
            className="text-destructive hover:bg-destructive/10"
          >
            Reject ({selectedCount})
          </Button>

          <Button
            variant="default"
            size="sm"
            iconName="Check"
            onClick={() => onBulkAction('approve')}
          >
            Approve ({selectedCount})
          </Button>

          {/* Clear Selection */}
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClearSelection}
            className="ml-2"
          >
            Clear
          </Button>
        </div>
      </div>

      {/* Bulk Action Confirmation */}
      <div className="mt-3 pt-3 border-t border-primary/20">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="AlertTriangle" size={14} />
          <span>
            Bulk actions will be applied immediately and recorded in audit logs
          </span>
        </div>
      </div>
    </div>
  );
};

export default BulkActionPanel;