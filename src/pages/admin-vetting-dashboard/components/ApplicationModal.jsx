import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const ApplicationModal = ({
  application,
  onClose,
  onApprove,
  onReject,
  onRequestInfo,
  className
}) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [rejectionReason, setRejectionReason] = useState('');
  const [additionalNotes, setAdditionalNotes] = useState('');

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'background', label: 'Background', icon: 'Shield' },
    { id: 'references', label: 'References', icon: 'Users' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Image' }
  ];

  const getDocumentStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success';
      case 'pending': return 'text-warning';
      case 'expired': return 'text-destructive';
      case 'needs_review': return 'text-blue-600';
      case 'incomplete': return 'text-destructive';
      case 'not_required': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  const getDocumentStatusIcon = (status) => {
    switch (status) {
      case 'verified': return 'CheckCircle';
      case 'pending': return 'Clock';
      case 'expired': return 'AlertTriangle';
      case 'needs_review': return 'Eye';
      case 'incomplete': return 'XCircle';
      case 'not_required': return 'Minus';
      default: return 'HelpCircle';
    }
  };

  const renderOverviewTab = () => (
    <div className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Personal Information</h4>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Name</span>
              <p className="font-medium text-foreground">{application?.applicantName}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Email</span>
              <p className="font-medium text-foreground">{application?.email}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Phone</span>
              <p className="font-medium text-foreground">{application?.phone}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Experience</span>
              <p className="font-medium text-foreground">{application?.experienceYears} years</p>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Trade Information</h4>
          <div className="space-y-3">
            <div>
              <span className="text-sm text-muted-foreground">Category</span>
              <p className="font-medium text-foreground">{application?.tradeCategory}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Target Suburb</span>
              <p className="font-medium text-foreground">{application?.suburb}</p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Hourly Rate</span>
              <p className="font-medium text-foreground">
                ${application?.pricing?.hourlyMin} - ${application?.pricing?.hourlyMax}
              </p>
            </div>
            <div>
              <span className="text-sm text-muted-foreground">Available Slots</span>
              <p className={cn(
                "font-medium",
                application?.suburbSlots?.available > 0 ? "text-success" : "text-destructive"
              )}>
                {application?.suburbSlots?.available} of {application?.suburbSlots?.total}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Qualifications */}
      <div>
        <h4 className="font-semibold text-foreground mb-3">Qualifications</h4>
        <div className="flex flex-wrap gap-2">
          {application?.qualifications?.map((qual, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-primary/10 text-primary border border-primary/20"
            >
              <Icon name="Award" size={14} className="mr-1" />
              {qual}
            </span>
          ))}
        </div>
      </div>
    </div>
  );

  const renderDocumentsTab = () => (
    <div className="space-y-4">
      {Object.entries(application?.documents || {})?.map(([docType, docInfo]) => (
        <div
          key={docType}
          className="flex items-center justify-between p-4 border border-border rounded-lg"
        >
          <div className="flex items-center space-x-3">
            <Icon
              name={getDocumentStatusIcon(docInfo?.status)}
              size={20}
              className={getDocumentStatusColor(docInfo?.status)}
            />
            <div>
              <p className="font-medium text-foreground capitalize">
                {docType?.replace('_', ' ')}
              </p>
              <p className="text-sm text-muted-foreground">
                {docInfo?.uploadedAt 
                  ? `Uploaded ${new Date(docInfo?.uploadedAt)?.toLocaleDateString()}`
                  : 'Not uploaded'
                }
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={cn(
              "text-sm font-medium capitalize",
              getDocumentStatusColor(docInfo?.status)
            )}>
              {docInfo?.status?.replace('_', ' ')}
            </span>
            {docInfo?.uploadedAt && (
              <Button variant="ghost" size="sm" iconName="Eye">
                View
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  const renderBackgroundTab = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Background Check</h4>
          <div className="p-4 border border-border rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">Status</span>
              <span className={cn(
                "text-sm font-medium capitalize",
                application?.backgroundCheck === 'passed' ? 'text-success' : 
                application?.backgroundCheck === 'requires_attention' ? 'text-warning' : 'text-muted-foreground'
              )}>
                {application?.backgroundCheck?.replace('_', ' ')}
              </span>
            </div>
            {application?.backgroundCheck === 'passed' && (
              <div className="flex items-center space-x-2 text-success">
                <Icon name="CheckCircle" size={16} />
                <span className="text-sm">All checks completed successfully</span>
              </div>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h4 className="font-semibold text-foreground">Ratings & Reviews</h4>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Previous Platform Rating</span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} className="text-warning fill-current" />
                <span className="font-medium">{application?.previousPlatformRating}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Reference Rating</span>
              <div className="flex items-center space-x-1">
                <Icon name="Star" size={16} className="text-warning fill-current" />
                <span className="font-medium">{application?.referenceRating}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Portfolio Quality</span>
              <span className={cn(
                "text-sm font-medium capitalize",
                application?.portfolioQuality === 'excellent' ? 'text-success' :
                application?.portfolioQuality === 'good' ? 'text-blue-600' : 'text-warning'
              )}>
                {application?.portfolioQuality}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTab = () => {
    switch (activeTab) {
      case 'overview': return renderOverviewTab();
      case 'documents': return renderDocumentsTab();
      case 'background': return renderBackgroundTab();
      case 'references': return (
        <div className="text-center py-8">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Reference details would be displayed here</p>
        </div>
      );
      case 'portfolio': return (
        <div className="text-center py-8">
          <Icon name="Image" size={48} className="text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">Portfolio images would be displayed here</p>
        </div>
      );
      default: return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className={cn(
        "bg-background rounded-lg border border-border w-full max-w-4xl max-h-[90vh] flex flex-col",
        className
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <img
              src={application?.avatar}
              alt={application?.applicantName}
              className="w-12 h-12 rounded-full object-cover border-2 border-border"
            />
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                {application?.applicantName}
              </h2>
              <p className="text-sm text-muted-foreground">
                {application?.tradeCategory} • {application?.suburb}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Tabs */}
        <div className="px-6 border-b border-border">
          <div className="flex space-x-1">
            {tabs?.map(tab => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={cn(
                  "flex items-center space-x-2 px-4 py-3 text-sm font-medium rounded-t-lg border-b-2 transition-colors",
                  activeTab === tab?.id
                    ? "text-primary border-primary bg-primary/5" :"text-muted-foreground border-transparent hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon name={tab?.icon} size={16} />
                <span>{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {renderTab()}
        </div>

        {/* Actions */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="text-sm text-muted-foreground">
              Applied {new Date(application?.applicationDate)?.toLocaleString()}
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                onClick={onRequestInfo}
                iconName="MessageSquare"
                iconPosition="left"
              >
                Request Info
              </Button>
              <Button
                variant="destructive"
                onClick={onReject}
                iconName="X"
                iconPosition="left"
              >
                Reject
              </Button>
              <Button
                variant="success"
                onClick={onApprove}
                iconName="Check"
                iconPosition="left"
                disabled={application?.suburbSlots?.available === 0}
              >
                {application?.suburbSlots?.available === 0 ? 'No Slots Available' : 'Approve'}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicationModal;