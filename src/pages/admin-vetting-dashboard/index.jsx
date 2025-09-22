import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import ApplicationCard from './components/ApplicationCard';
import VettingAnalytics from './components/VettingAnalytics';
import ApplicationModal from './components/ApplicationModal';
import FilterBar from './components/FilterBar';

const AdminVettingDashboard = () => {
  const navigate = useNavigate();
  const [selectedApplication, setSelectedApplication] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [activeFilters, setActiveFilters] = useState({
    status: 'all',
    tradeCategory: 'all',
    suburb: 'all',
    dateRange: '7days',
    sortBy: 'newest'
  });

  // Mock data for pending applications
  const mockApplications = [
    {
      id: 1,
      applicantName: 'Mike Thompson',
      email: 'mike.thompson@email.com',
      phone: '+61 423 456 789',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      tradeCategory: 'Electrician',
      suburb: 'Bondi Beach',
      applicationDate: new Date(Date.now() - 2 * 60 * 60 * 1000),
      status: 'pending',
      urgencyLevel: 'high',
      documents: {
        license: { status: 'verified', uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        insurance: { status: 'pending', uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        references: { status: 'verified', uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        portfolio: { status: 'verified', uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }
      },
      experienceYears: 8,
      pricing: { hourlyMin: 120, hourlyMax: 180 },
      qualifications: ['Electrical License NSW', 'RCD Testing Certified'],
      backgroundCheck: 'passed',
      referenceRating: 4.8,
      portfolioQuality: 'excellent',
      previousPlatformRating: 4.6,
      suburbSlots: { available: 2, total: 5 }
    },
    {
      id: 2,
      applicantName: 'Sarah Chen',
      email: 'sarah.chen@email.com',
      phone: '+61 456 789 012',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      tradeCategory: 'Plumber',
      suburb: 'Paddington',
      applicationDate: new Date(Date.now() - 5 * 60 * 60 * 1000),
      status: 'under_review',
      urgencyLevel: 'medium',
      documents: {
        license: { status: 'verified', uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        insurance: { status: 'verified', uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        references: { status: 'pending', uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        portfolio: { status: 'needs_review', uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) }
      },
      experienceYears: 12,
      pricing: { hourlyMin: 95, hourlyMax: 150 },
      qualifications: ['Plumbing License NSW', 'Backflow Prevention'],
      backgroundCheck: 'in_progress',
      referenceRating: 4.5,
      portfolioQuality: 'good',
      previousPlatformRating: 4.3,
      suburbSlots: { available: 1, total: 5 }
    },
    {
      id: 3,
      applicantName: 'James Rodriguez',
      email: 'james.rodriguez@email.com',
      phone: '+61 789 012 345',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
      tradeCategory: 'Painter',
      suburb: 'Surry Hills',
      applicationDate: new Date(Date.now() - 12 * 60 * 60 * 1000),
      status: 'pending',
      urgencyLevel: 'low',
      documents: {
        license: { status: 'not_required', uploadedAt: null },
        insurance: { status: 'verified', uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        references: { status: 'verified', uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) },
        portfolio: { status: 'verified', uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) }
      },
      experienceYears: 5,
      pricing: { hourlyMin: 65, hourlyMax: 120 },
      qualifications: ['Public Liability Insurance', 'Lead Paint Certified'],
      backgroundCheck: 'passed',
      referenceRating: 4.2,
      portfolioQuality: 'excellent',
      previousPlatformRating: 4.7,
      suburbSlots: { available: 3, total: 5 }
    },
    {
      id: 4,
      applicantName: 'Emma Wilson',
      email: 'emma.wilson@email.com',
      phone: '+61 012 345 678',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
      tradeCategory: 'Roofer',
      suburb: 'Woollahra',
      applicationDate: new Date(Date.now() - 18 * 60 * 60 * 1000),
      status: 'flagged',
      urgencyLevel: 'high',
      documents: {
        license: { status: 'expired', uploadedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000) },
        insurance: { status: 'pending', uploadedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000) },
        references: { status: 'incomplete', uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000) },
        portfolio: { status: 'verified', uploadedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000) }
      },
      experienceYears: 15,
      pricing: { hourlyMin: 180, hourlyMax: 280 },
      qualifications: ['Height Safety Training', 'Working at Heights'],
      backgroundCheck: 'requires_attention',
      referenceRating: 3.8,
      portfolioQuality: 'good',
      previousPlatformRating: 4.1,
      suburbSlots: { available: 4, total: 5 }
    }
  ];

  // Mock analytics data
  const analyticsData = {
    totalApplications: 47,
    pendingReview: 12,
    approvedToday: 8,
    rejectedToday: 3,
    averageProcessingTime: '2.4 hours',
    approvalRate: 76,
    suburbCoverage: {
      bondiBeach: { filled: 23, total: 25 },
      paddington: { filled: 19, total: 25 },
      surryHills: { filled: 22, total: 25 },
      woollahra: { filled: 17, total: 25 }
    },
    trendData: [
      { date: '2025-09-15', applications: 8, approved: 6 },
      { date: '2025-09-16', applications: 12, approved: 9 },
      { date: '2025-09-17', applications: 15, approved: 11 },
      { date: '2025-09-18', applications: 9, approved: 7 },
      { date: '2025-09-19', applications: 11, approved: 8 },
      { date: '2025-09-20', applications: 14, approved: 10 },
      { date: '2025-09-21', applications: 13, approved: 11 }
    ]
  };

  const filteredApplications = mockApplications?.filter(app => {
    if (activeFilters?.status !== 'all' && app?.status !== activeFilters?.status) return false;
    if (activeFilters?.tradeCategory !== 'all' && app?.tradeCategory !== activeFilters?.tradeCategory) return false;
    if (activeFilters?.suburb !== 'all' && app?.suburb !== activeFilters?.suburb) return false;
    return true;
  })?.sort((a, b) => {
    switch (activeFilters?.sortBy) {
      case 'oldest':
        return new Date(a.applicationDate) - new Date(b.applicationDate);
      case 'urgent':
        const urgencyOrder = { high: 3, medium: 2, low: 1 };
        return (urgencyOrder?.[b?.urgencyLevel] || 0) - (urgencyOrder?.[a?.urgencyLevel] || 0);
      case 'suburb':
        return a?.suburb?.localeCompare(b?.suburb);
      default:
        return new Date(b.applicationDate) - new Date(a.applicationDate);
    }
  });

  const handleViewApplication = (application) => {
    setSelectedApplication(application);
    setShowModal(true);
  };

  const handleApproveApplication = (applicationId) => {
    console.log('Approving application:', applicationId);
    // Implementation for approving application
  };

  const handleRejectApplication = (applicationId) => {
    console.log('Rejecting application:', applicationId);
    // Implementation for rejecting application
  };

  const handleRequestInfo = (applicationId) => {
    console.log('Requesting additional info for:', applicationId);
    // Implementation for requesting additional information
  };

  const handleFilterChange = (newFilters) => {
    setActiveFilters(prev => ({ ...prev, ...newFilters }));
  };

  const handleBulkAction = (action, selectedIds) => {
    console.log(`Bulk ${action} for applications:`, selectedIds);
    // Implementation for bulk actions
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Admin Vetting Dashboard</h1>
              <p className="text-muted-foreground mt-2">
                Manage tradie applications and maintain marketplace quality
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                iconPosition="left"
                onClick={() => console.log('Exporting data')}
              >
                Export Data
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => window.location?.reload()}
              >
                Refresh
              </Button>
            </div>
          </div>

          {/* Analytics Widget */}
          <VettingAnalytics data={analyticsData} className="" />
        </div>

        {/* Filter Bar */}
        <div className="mb-6">
          <FilterBar
            onFilterChange={handleFilterChange}
            activeFilters={activeFilters}
            onBulkAction={handleBulkAction}
            className=""
          />
        </div>

        {/* Applications Grid */}
        <div className="grid grid-cols-1 gap-6">
          <div className="bg-card border border-border rounded-lg">
            <div className="p-6 border-b border-border">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-foreground">
                  Pending Applications ({filteredApplications?.length})
                </h2>
                <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Clock" size={16} />
                  <span>Sorted by {activeFilters?.sortBy}</span>
                </div>
              </div>
            </div>

            <div className="divide-y divide-border">
              {filteredApplications?.length > 0 ? (
                filteredApplications?.map(application => (
                  <ApplicationCard
                    key={application?.id}
                    application={application}
                    onView={() => handleViewApplication(application)}
                    onApprove={() => handleApproveApplication(application?.id)}
                    onReject={() => handleRejectApplication(application?.id)}
                    onRequestInfo={() => handleRequestInfo(application?.id)}
                    className=""
                  />
                ))
              ) : (
                <div className="p-12 text-center">
                  <Icon name="CheckCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">
                    No applications found
                  </h3>
                  <p className="text-muted-foreground mb-4">
                    All applications matching your filters have been processed
                  </p>
                  <Button
                    variant="outline"
                    onClick={() => setActiveFilters({
                      status: 'all',
                      tradeCategory: 'all',
                      suburb: 'all',
                      dateRange: '7days',
                      sortBy: 'newest'
                    })}
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Application Detail Modal */}
        {showModal && selectedApplication && (
          <ApplicationModal
            application={selectedApplication}
            onClose={() => {
              setShowModal(false);
              setSelectedApplication(null);
            }}
            onApprove={() => {
              handleApproveApplication(selectedApplication?.id);
              setShowModal(false);
              setSelectedApplication(null);
            }}
            onReject={() => {
              handleRejectApplication(selectedApplication?.id);
              setShowModal(false);
              setSelectedApplication(null);
            }}
            onRequestInfo={() => {
              handleRequestInfo(selectedApplication?.id);
              setShowModal(false);
              setSelectedApplication(null);
            }}
            className=""
          />
        )}
      </main>
    </div>
  );
};

export default AdminVettingDashboard;