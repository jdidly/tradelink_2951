import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoleContext } from '../../components/ui/RoleContextProvider';
import Header from '../../components/ui/Header';
import SearchBar from './components/SearchBar';

import JobCard from './components/JobCard';
import QuickStats from './components/QuickStats';
import JobFilters from './components/JobFilters';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const HomeDashboard = () => {
  const navigate = useNavigate();
  const { roleContext, locationContext, userProfile, isHomeowner, isTradie } = useRoleContext();
  const [activeFilters, setActiveFilters] = useState({
    sort: 'newest',
    distance: 'all',
    budget: 'all',
    category: 'all',
    urgency: 'all'
  });

  // Mock data for categories - Updated for tradie selection model
  const tradeCategories = [
    {
      id: 1,
      name: 'Plumber',
      icon: 'Wrench',
      description: 'Pipes, taps, drainage & water systems',
      availableTradies: 5, // Max 5 per suburb
      priceRange: { min: 80, max: 250 },
      averageRating: 4.8,
      completedJobs: 234
    },
    {
      id: 2,
      name: 'Electrician',
      icon: 'Zap',
      description: 'Wiring, outlets, lighting & safety checks',
      availableTradies: 5,
      priceRange: { min: 100, max: 300 },
      averageRating: 4.7,
      completedJobs: 189
    },
    {
      id: 3,
      name: 'Painter',
      icon: 'Paintbrush',
      description: 'Interior & exterior painting services',
      availableTradies: 5,
      priceRange: { min: 60, max: 180 },
      averageRating: 4.6,
      completedJobs: 312
    },
    {
      id: 4,
      name: 'Roofer',
      icon: 'Home',
      description: 'Roof repairs, gutters & maintenance',
      availableTradies: 4,
      priceRange: { min: 150, max: 500 },
      averageRating: 4.9,
      completedJobs: 98
    },
    {
      id: 5,
      name: 'AC Specialist',
      icon: 'Snowflake',
      description: 'Air conditioning installation & repair',
      availableTradies: 3,
      priceRange: { min: 120, max: 400 },
      averageRating: 4.5,
      completedJobs: 156
    }
  ];

  // Mock data for vetted tradies in selected category
  const mockTradies = [
    {
      id: 1,
      name: 'Mike Thompson',
      category: 'Plumber',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
      rating: 4.9,
      reviewCount: 87,
      verified: true,
      localLegend: true,
      hourlyRate: { min: 90, max: 150 },
      responseTime: '< 2hrs',
      availability: 'Available today',
      specialties: ['Emergency Repairs', 'Bathroom Renovations', 'Leak Detection'],
      completedJobs: 156,
      yearInBusiness: 8
    },
    {
      id: 2,
      name: 'Sarah Chen',
      category: 'Electrician',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
      rating: 4.8,
      reviewCount: 64,
      verified: true,
      localLegend: false,
      hourlyRate: { min: 110, max: 200 },
      responseTime: '< 4hrs',
      availability: 'Available tomorrow',
      specialties: ['Safety Inspections', 'Smart Home', 'Commercial Electrical'],
      completedJobs: 98,
      yearInBusiness: 5
    }
  ];

  // Mock data for nearby jobs (tradie view) - keeping existing for tradie dashboard
  const nearbyJobs = [
    {
      id: 1,
      title: 'Kitchen Tap Replacement',
      description: 'Need to replace a leaky kitchen tap. The current one is dripping constantly and needs immediate attention. Looking for a reliable plumber who can come today or tomorrow.',
      category: 'Plumbing',
      location: 'Bondi Beach',
      distance: '2.3km',
      budget: { min: 80, max: 150 },
      urgency: 'urgent',
      postedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
      homeowner: {
        name: 'Sarah Mitchell',
        avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150',
        rating: 4.8,
        reviewCount: 23,
        verified: true
      }
    },
    {
      id: 2,
      title: 'Electrical Safety Inspection',
      description: 'Annual electrical safety check required for rental property. Need certified electrician to provide compliance certificate.',
      category: 'Electrical',
      location: 'Paddington',
      distance: '1.8km',
      budget: { min: 150, max: 250 },
      urgency: 'soon',
      postedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
      homeowner: {
        name: 'Michael Chen',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        rating: 4.6,
        reviewCount: 15,
        verified: true
      }
    },
    {
      id: 3,
      title: 'Living Room Painting',
      description: 'Looking to paint the living room and hallway. Walls are in good condition, just need a fresh coat. Prefer neutral colors.',
      category: 'Painting',
      location: 'Surry Hills',
      distance: '3.1km',
      budget: { min: 400, max: 800 },
      urgency: 'flexible',
      postedAt: new Date(Date.now() - 12 * 60 * 60 * 1000),
      homeowner: {
        name: 'Emma Thompson',
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150',
        rating: 4.9,
        reviewCount: 31,
        verified: true
      }
    },
    {
      id: 4,
      title: 'Roof Gutter Cleaning',
      description: 'Gutters need cleaning before the rainy season. Two-story house with standard guttering system.',
      category: 'Roofing',
      location: 'Woollahra',
      distance: '4.2km',
      budget: { min: 200, max: 350 },
      urgency: 'soon',
      postedAt: new Date(Date.now() - 18 * 60 * 60 * 1000),
      homeowner: {
        name: 'David Wilson',
        avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150',
        rating: 4.7,
        reviewCount: 19,
        verified: true
      }
    },
    {
      id: 5,
      title: 'AC Unit Service',
      description: 'Split system air conditioner needs servicing. Not cooling properly and making unusual noises.',
      category: 'AC',
      location: 'Double Bay',
      distance: '2.7km',
      budget: { min: 120, max: 200 },
      urgency: 'urgent',
      postedAt: new Date(Date.now() - 4 * 60 * 60 * 1000),
      homeowner: {
        name: 'Lisa Rodriguez',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150',
        rating: 4.5,
        reviewCount: 12,
        verified: true
      }
    }
  ];

  // Mock stats for tradie dashboard
  const tradieStats = {
    profileCompletion: 85,
    trustScore: 4.7,
    localReviews: 34,
    recentInquiries: 8,
    responseTime: '1.2h',
    suburbBadge: locationContext?.suburb
  };

  const handleSearch = (query) => {
    console.log('Searching for:', query);
    // Navigate to suburb selection for tradie discovery
    navigate('/suburb-selection', { state: { searchQuery: query } });
  };

  const handleCategoryClick = (category) => {
    console.log('Category selected:', category);
    // Navigate to suburb selection with pre-selected category
    navigate('/suburb-selection', { state: { selectedCategory: category?.name } });
  };

  const handleJobApply = (job) => {
    console.log('Applying to job:', job);
    // Navigate to job application page
    navigate('/jobs/apply', { state: { jobId: job?.id } });
  };

  const handleJobViewDetails = (job) => {
    console.log('Viewing job details:', job);
    // Navigate to job details page
    navigate('/jobs/details', { state: { jobId: job?.id } });
  };

  const handleFilterChange = (newFilters) => {
    setActiveFilters(newFilters);
    console.log('Filters updated:', newFilters);
  };

  const filteredJobs = nearbyJobs?.filter(job => {
    // Apply filters to jobs
    if (activeFilters?.category !== 'all' && job?.category?.toLowerCase() !== activeFilters?.category) {
      return false;
    }
    if (activeFilters?.urgency !== 'all' && job?.urgency !== activeFilters?.urgency) {
      return false;
    }
    // Add more filter logic as needed
    return true;
  })?.sort((a, b) => {
    // Apply sorting
    switch (activeFilters?.sort) {
      case 'budget-high':
        return b?.budget?.max - a?.budget?.max;
      case 'budget-low':
        return a?.budget?.min - b?.budget?.min;
      case 'distance':
        return parseFloat(a?.distance) - parseFloat(b?.distance);
      case 'urgent':
        const urgencyOrder = { urgent: 3, soon: 2, flexible: 1 };
        return (urgencyOrder?.[b?.urgency] || 0) - (urgencyOrder?.[a?.urgency] || 0);
      default:
        return new Date(b.postedAt) - new Date(a.postedAt);
    }
  });

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 pb-20 md:pb-8">
        {/* Welcome Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {isHomeowner ? `Welcome, ${userProfile?.name || 'Homeowner'}` : `Find Jobs Near You`}
              </h1>
              <p className="text-muted-foreground mt-2">
                {isHomeowner 
                  ? `Discover trusted tradies in ${locationContext?.suburb || 'your area'}` 
                  : `${filteredJobs?.length} jobs available in ${locationContext?.suburb}`
                }
              </p>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="MapPin" size={16} />
              <span>{locationContext?.suburb || 'Select Location'}, {locationContext?.state || 'NSW'}</span>
            </div>
          </div>
        </div>

        {isHomeowner ? (
          // Homeowner Dashboard - New Tradie Selection Model
          <div className="space-y-8">
            {/* Hero Section */}
            <div className="text-center mb-8">
              <h2 className="text-2xl font-bold text-foreground mb-4">Find Your Perfect Tradie</h2>
              <p className="text-lg text-muted-foreground mb-6">
                No job posting needed. Browse up to 5 vetted tradies per category in your suburb.
              </p>
              <div className="max-w-md mx-auto">
                <SearchBar 
                  onSearch={handleSearch}
                  placeholder="Search tradies or enter your suburb..."
                />
              </div>
            </div>

            {/* Location Banner */}
            <div className="bg-gradient-to-r from-primary/10 to-success/10 border border-primary/20 rounded-lg p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="MapPin" size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">Current Location</h3>
                    <p className="text-muted-foreground">{locationContext?.suburb || 'Not selected'}, {locationContext?.state || 'NSW'}</p>
                  </div>
                </div>
                <Button
                  variant="outline"
                  iconName="Map"
                  iconPosition="left"
                  onClick={() => navigate('/suburb-selection')}
                >
                  Change Location
                </Button>
              </div>
            </div>

            {/* Category Tiles - Updated for Tradie Selection */}
            <div>
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-semibold text-foreground">Browse Vetted Tradies</h2>
                <div className="text-sm text-muted-foreground">
                  <Icon name="Shield" size={16} className="inline mr-1" />
                  All tradies verified & insured
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
                {tradeCategories?.map((category) => (
                  <div
                    key={category?.id}
                    onClick={() => handleCategoryClick(category)}
                    className="group cursor-pointer bg-card border border-border hover:border-primary/50 rounded-lg p-6 transition-all duration-200 hover:shadow-lg hover:scale-105"
                  >
                    <div className="flex flex-col items-center text-center space-y-4">
                      <div className="w-16 h-16 bg-primary/10 group-hover:bg-primary/20 rounded-lg flex items-center justify-center transition-colors">
                        <Icon name={category?.icon} size={32} className="text-primary" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-1">{category?.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{category?.description}</p>
                        <div className="space-y-2">
                          <div className="flex items-center justify-center space-x-2 text-sm">
                            <Icon name="Users" size={14} className="text-primary" />
                            <span className="text-foreground font-medium">{category?.availableTradies}/5 Available</span>
                          </div>
                          <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                            <Icon name="Star" size={14} className="text-yellow-500" />
                            <span>{category?.averageRating} ({category?.completedJobs} jobs)</span>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            ${category?.priceRange?.min}-${category?.priceRange?.max}/hr
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Price Estimator Feature - New Section */}
            <div className="bg-gradient-to-br from-success/10 to-primary/10 border border-success/20 rounded-lg p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-success rounded-lg flex items-center justify-center">
                    <Icon name="Calculator" size={24} color="white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">AI Price Estimator</h3>
                    <p className="text-muted-foreground">Get instant pricing estimates powered by Gemini AI</p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Icon name="Sparkles" size={16} className="text-success" />
                  <span className="text-success font-medium">New Feature</span>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Icon name="MessageSquare" size={20} className="text-success" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Describe Your Job</h4>
                  <p className="text-sm text-muted-foreground">Tell our AI what you need done</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Icon name="Brain" size={20} className="text-success" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">AI Analysis</h4>
                  <p className="text-sm text-muted-foreground">Smart pricing with local data</p>
                </div>
                <div className="text-center">
                  <div className="w-10 h-10 bg-success/20 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <Icon name="DollarSign" size={20} className="text-success" />
                  </div>
                  <h4 className="font-medium text-foreground mb-1">Instant Estimate</h4>
                  <p className="text-sm text-muted-foreground">Get price range in seconds</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  iconName="Calculator"
                  iconPosition="left"
                  onClick={() => navigate('/price-estimator')}
                  className="flex-1"
                >
                  Get Price Estimate
                </Button>
                <Button
                  variant="outline"
                  iconName="ArrowRight"
                  iconPosition="right"
                  onClick={() => navigate('/price-estimator')}
                  className="sm:w-auto"
                >
                  Learn More
                </Button>
              </div>
            </div>

            {/* Quick Actions - Updated */}
            <div className="flex flex-wrap gap-4 justify-center">
              <Button
                variant="outline"
                iconName="Calculator"
                iconPosition="left"
                onClick={() => navigate('/price-estimator')}
              >
                Price Estimator
              </Button>
              <Button
                variant="outline"
                iconName="Map"
                iconPosition="left"
                onClick={() => navigate('/suburb-selection')}
              >
                View Map
              </Button>
              <Button
                variant="outline"
                iconName="MessageCircle"
                iconPosition="left"
                onClick={() => navigate('/messages')}
              >
                Messages
              </Button>
              <Button
                variant="outline"
                iconName="Star"
                iconPosition="left"
                onClick={() => navigate('/favorites')}
              >
                Saved Tradies
              </Button>
              <Button
                variant="outline"
                iconName="History"
                iconPosition="left"
                onClick={() => navigate('/history')}
              >
                Request History
              </Button>
            </div>

            {/* How It Works - Updated */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="text-lg font-semibold text-foreground mb-6">How TradeLink Works</h3>
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name="Calculator" size={24} color="white" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">1. Get Price Estimate</h4>
                  <p className="text-sm text-muted-foreground">Use AI to estimate job costs instantly</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name="Search" size={24} color="white" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">2. Browse Tradies</h4>
                  <p className="text-sm text-muted-foreground">Select your suburb and browse up to 5 vetted tradies per category</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name="Eye" size={24} color="white" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">3. View Profiles</h4>
                  <p className="text-sm text-muted-foreground">Check reviews, photos, pricing, and availability</p>
                </div>
                <div className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center mx-auto mb-4">
                    <Icon name="MessageCircle" size={24} color="white" />
                  </div>
                  <h4 className="font-medium text-foreground mb-2">4. Connect Direct</h4>
                  <p className="text-sm text-muted-foreground">Chat, call, or request a quote directly from your chosen tradie</p>
                </div>
              </div>
            </div>

            {/* Trust Badges */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">Local Trades. Trusted Faces.</h3>
              <div className="flex justify-center space-x-8 text-sm text-muted-foreground">
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" size={16} className="text-primary" />
                  <span>Verified & Insured</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Award" size={16} className="text-primary" />
                  <span>Local Experts</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span>Quick Response</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          // Tradie Dashboard - Keep existing functionality
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content - Jobs Feed */}
            <div className="lg:col-span-2 space-y-6">
              {/* Filters */}
              <JobFilters
                onFilterChange={handleFilterChange}
                activeFilters={activeFilters}
              />

              {/* Jobs List */}
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-semibold text-foreground">
                    Available Jobs ({filteredJobs?.length})
                  </h2>
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

                <div className="space-y-4">
                  {filteredJobs?.map((job) => (
                    <JobCard
                      key={job?.id}
                      job={job}
                      onApply={handleJobApply}
                      onViewDetails={handleJobViewDetails}
                    />
                  ))}
                </div>

                {filteredJobs?.length === 0 && (
                  <div className="text-center py-12">
                    <Icon name="Search" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No jobs found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try adjusting your filters or check back later for new opportunities
                    </p>
                    <Button
                      variant="outline"
                      onClick={() => setActiveFilters({
                        sort: 'newest',
                        distance: 'all',
                        budget: 'all',
                        category: 'all',
                        urgency: 'all'
                      })}
                    >
                      Clear All Filters
                    </Button>
                  </div>
                )}
              </div>
            </div>
            {/* Sidebar - Stats & Quick Actions */}
            <div className="space-y-6">
              <QuickStats stats={tradieStats} />

              {/* Quick Actions */}
              <div className="bg-card border border-border rounded-lg p-6">
                <h3 className="text-lg font-semibold text-foreground mb-4">Quick Actions</h3>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    iconName="User"
                    iconPosition="left"
                    onClick={() => navigate('/profile')}
                  >
                    Complete Profile
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    iconName="MessageCircle"
                    iconPosition="left"
                    onClick={() => navigate('/messages')}
                  >
                    View Messages
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    iconName="Calendar"
                    iconPosition="left"
                    onClick={() => navigate('/calendar')}
                  >
                    Manage Calendar
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full justify-start"
                    iconName="Star"
                    iconPosition="left"
                    onClick={() => navigate('/reviews')}
                  >
                    View Reviews
                  </Button>
                </div>
              </div>

              {/* Local Badge */}
              <div className="bg-gradient-to-br from-primary/10 to-success/10 border border-primary/20 rounded-lg p-6">
                <div className="flex items-center space-x-3 mb-3">
                  <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                    <Icon name="Award" size={20} color="white" />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">Local Expert</div>
                    <div className="text-sm text-muted-foreground">{locationContext?.suburb}</div>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground mb-4">
                  You're recognized as a trusted tradie in your local area
                </p>
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  iconName="Share"
                  iconPosition="left"
                >
                  Share Badge
                </Button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default HomeDashboard;