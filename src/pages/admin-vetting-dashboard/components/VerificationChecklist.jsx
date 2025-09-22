import React from 'react';
import Icon from '../../../components/AppIcon';

const VerificationChecklist = () => {
  const checklistItems = [
    {
      id: 'license',
      title: 'License Validation',
      description: 'Valid trade license with current registration',
      status: 'required',
      icon: 'Shield'
    },
    {
      id: 'insurance',
      title: 'Insurance Verification',
      description: 'Public liability insurance coverage',
      status: 'required',
      icon: 'FileText'
    },
    {
      id: 'references',
      title: 'Reference Checks',
      description: 'Minimum 2 verified customer references',
      status: 'required',
      icon: 'Users'
    },
    {
      id: 'portfolio',
      title: 'Portfolio Quality',
      description: 'Work samples demonstrating skill level',
      status: 'required',
      icon: 'Image'
    },
    {
      id: 'background',
      title: 'Background Check',
      description: 'Criminal history and identity verification',
      status: 'optional',
      icon: 'Search'
    },
    {
      id: 'experience',
      title: 'Experience Verification',
      description: 'Minimum 2 years verifiable experience',
      status: 'required',
      icon: 'Clock'
    },
    {
      id: 'suburb',
      title: 'Suburb Availability',
      description: 'Check available slots in requested suburbs',
      status: 'required',
      icon: 'MapPin'
    },
    {
      id: 'communication',
      title: 'Communication Test',
      description: 'Response time and professionalism check',
      status: 'recommended',
      icon: 'MessageCircle'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'required': return 'text-destructive';
      case 'recommended': return 'text-warning';
      case 'optional': return 'text-muted-foreground';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-foreground">Verification Checklist</h3>
        <Icon name="CheckCircle" size={20} className="text-success" />
      </div>
      <div className="space-y-4">
        {checklistItems?.map((item) => (
          <div key={item?.id} className="flex items-start space-x-3">
            <div className="flex-shrink-0 mt-1">
              <Icon 
                name={item?.icon} 
                size={16} 
                className={getStatusColor(item?.status)}
              />
            </div>
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <h4 className="text-sm font-medium text-foreground">
                  {item?.title}
                </h4>
                <span className={`text-xs ${getStatusColor(item?.status)}`}>
                  ({item?.status})
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {item?.description}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Quality Standards</span>
          <div className="flex items-center space-x-1">
            <span className="text-xs text-destructive">● Required</span>
            <span className="text-xs text-warning">● Recommended</span>
            <span className="text-xs text-muted-foreground">● Optional</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerificationChecklist;