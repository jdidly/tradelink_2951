import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ApplicantProfileModal = ({ applicant, onClose, onAction }) => {
  const [activeTab, setActiveTab] = useState('overview');
  const [notes, setNotes] = useState('');

  const getStatusColor = (status) => {
    switch (status) {
      case 'verified': return 'text-success bg-success/10';
      case 'pending': return 'text-warning bg-warning/10';
      case 'in_progress': return 'text-info bg-info/10';
      default: return 'text-muted-foreground bg-muted/50';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('en-AU', {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'User' },
    { id: 'documents', label: 'Documents', icon: 'FileText' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Image' },
    { id: 'references', label: 'References', icon: 'Users' },
    { id: 'history', label: 'History', icon: 'Clock' }
  ];

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-background rounded-lg w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Modal Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-4">
            <img
              src={applicant?.applicant?.photo}
              alt={applicant?.applicant?.name}
              className="w-16 h-16 rounded-lg object-cover"
              onError={(e) => {
                e.target.src = '/assets/images/no_image.png';
              }}
            />
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                {applicant?.applicant?.name}
              </h2>
              <div className="flex items-center space-x-3 text-muted-foreground">
                <span>{applicant?.trade}</span>
                <span>•</span>
                <span>Application ID: {applicant?.id}</span>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            size="sm"
            iconName="X"
            onClick={onClose}
          />
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 p-6 pb-0">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-colors ${
                activeTab === tab?.id
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:bg-muted'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
          {activeTab === 'overview' && (
            <div className="space-y-6">
              {/* Basic Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3">
                      <Icon name="Mail" size={16} className="text-muted-foreground" />
                      <span>{applicant?.applicant?.email}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Phone" size={16} className="text-muted-foreground" />
                      <span>{applicant?.applicant?.phone}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Icon name="Hash" size={16} className="text-muted-foreground" />
                      <span>ABN: {applicant?.applicant?.abn}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-foreground">Service Areas</h3>
                  <div className="flex flex-wrap gap-2">
                    {applicant?.suburbs?.map((suburb, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-primary/10 text-primary rounded-lg"
                      >
                        {suburb}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Experience & Specialties */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Experience & Specialties</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Experience</div>
                    <div className="text-2xl font-bold text-foreground">{applicant?.experience}</div>
                  </div>
                  <div>
                    <div className="text-sm text-muted-foreground mb-2">Completion Score</div>
                    <div className="text-2xl font-bold text-foreground">{applicant?.completionScore}%</div>
                  </div>
                </div>
                <div>
                  <div className="text-sm text-muted-foreground mb-2">Specialties</div>
                  <div className="flex flex-wrap gap-2">
                    {applicant?.specialties?.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-muted rounded text-sm"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Previous Platform Performance */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Previous Platform Performance</h3>
                <div className="space-y-2">
                  {applicant?.previousPlatforms?.map((platform, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <Icon name="Star" size={16} className="text-warning" />
                      <span>{platform}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'documents' && (
            <div className="space-y-6">
              {Object.entries(applicant?.documents)?.map(([docType, doc]) => (
                <div key={docType} className="border border-border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-medium text-foreground capitalize">
                      {docType?.replace(/([A-Z])/g, ' $1')}
                    </h3>
                    <span className={`px-2 py-1 rounded text-xs ${getStatusColor(doc?.status)}`}>
                      {doc?.status?.replace('_', ' ')?.toUpperCase()}
                    </span>
                  </div>
                  
                  {doc?.expiryDate && (
                    <div className="text-sm text-muted-foreground mb-2">
                      Expires: {formatDate(doc?.expiryDate)}
                    </div>
                  )}
                  
                  {doc?.itemCount && (
                    <div className="text-sm text-muted-foreground mb-2">
                      {doc?.itemCount} items uploaded
                    </div>
                  )}
                  
                  {doc?.count && (
                    <div className="text-sm text-muted-foreground mb-2">
                      {doc?.count} references provided
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" iconName="Eye">
                      View Document
                    </Button>
                    {doc?.status === 'pending' && (
                      <Button variant="outline" size="sm" iconName="Check">
                        Verify
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Add other tab content as needed */}
          {activeTab === 'portfolio' && (
            <div className="text-center py-12">
              <Icon name="Image" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Portfolio Gallery</h3>
              <p className="text-muted-foreground">
                {applicant?.documents?.portfolio?.itemCount || 0} work samples available
              </p>
            </div>
          )}

          {activeTab === 'references' && (
            <div className="text-center py-12">
              <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Reference Contacts</h3>
              <p className="text-muted-foreground">
                {applicant?.documents?.references?.count || 0} references provided
              </p>
            </div>
          )}

          {activeTab === 'history' && (
            <div className="text-center py-12">
              <Icon name="Clock" size={48} className="text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-medium text-foreground mb-2">Application History</h3>
              <p className="text-muted-foreground">
                Applied {new Date(applicant.applicationDate)?.toLocaleDateString()}
              </p>
            </div>
          )}
        </div>

        {/* Action Footer */}
        <div className="p-6 border-t border-border">
          <div className="flex items-center space-x-4 mb-4">
            <input
              type="text"
              placeholder="Add notes for this application..."
              value={notes}
              onChange={(e) => setNotes(e?.target?.value)}
              className="flex-1 px-3 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>
          
          <div className="flex items-center justify-between">
            <Button
              variant="outline"
              onClick={onClose}
            >
              Close
            </Button>
            
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                iconName="MessageSquare"
                onClick={() => onAction('request_info')}
                className="text-warning hover:bg-warning/10"
              >
                Request Info
              </Button>
              <Button
                variant="outline"
                iconName="X"
                onClick={() => onAction('reject')}
                className="text-destructive hover:bg-destructive/10"
              >
                Reject
              </Button>
              <Button
                variant="default"
                iconName="Check"
                onClick={() => onAction('approve')}
              >
                Approve Application
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApplicantProfileModal;