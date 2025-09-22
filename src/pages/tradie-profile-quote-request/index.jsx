import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';


import Icon from '../../components/AppIcon';
import TradieProfileCard from './components/TradieProfileCard';
import ReviewSection from './components/ReviewSection';
import PortfolioGallery from './components/PortfolioGallery';
import QuoteRequestForm from './components/QuoteRequestForm';
import PricingGuide from './components/PricingGuide';
import { cn } from '../../utils/cn';

const TradieProfileQuoteRequest = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('overview');
  const [quoteFormOpen, setQuoteFormOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tradieData, setTradieData] = useState(null);

  // Get tradie data from navigation state or load from API
  const tradieId = location?.state?.tradieId;
  const tradieFromState = location?.state?.tradie;

  useEffect(() => {
    // Simulate loading tradie data
    setLoading(true);
    setTimeout(() => {
      // Mock tradie data - in real app would come from API
      const mockTradieData = {
        id: tradieId || 1,
        name: 'Mike\'s Professional Plumbing',
        category: 'Plumber',
        categoryIcon: 'Wrench',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150',
        coverImage: 'https://images.unsplash.com/photo-1621905251918-48416bd8575a?w=800',
        trustScore: 4.8,
        localReviews: 47,
        responseTime: '< 2 hours',
        yearsExperience: 12,
        completedJobs: 350,
        suburbs: ['Bondi Beach', 'Paddington', 'Woollahra', 'Double Bay'],
        badges: ['LocalTrust™ Verified', 'Fully Insured', '24/7 Emergency'],
        aboutText: 'Experienced local plumber servicing the Eastern Suburbs for over 12 years. Specializing in residential plumbing, emergency repairs, and bathroom renovations. Licensed and fully insured with a commitment to quality workmanship.',
        services: [
          { name: 'Blocked Drains', price: '$120 - $200', duration: '1-2 hours' },
          { name: 'Tap Repairs', price: '$80 - $150', duration: '30-60 mins' },
          { name: 'Hot Water Service', price: '$200 - $500', duration: '2-4 hours' },
          { name: 'Bathroom Renovation', price: '$5,000 - $15,000', duration: '1-2 weeks' },
          { name: 'Emergency Callout', price: '$150 + materials', duration: 'ASAP' }
        ],
        portfolio: [
          {
            id: 1,
            image: 'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=400',
            title: 'Modern Bathroom Renovation',
            description: 'Complete bathroom renovation in Bondi Beach home',
            location: 'Bondi Beach'
          },
          {
            id: 2,
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400',
            title: 'Kitchen Plumbing Installation',
            description: 'New kitchen plumbing for renovation project',
            location: 'Paddington'
          },
          {
            id: 3,
            image: 'https://images.unsplash.com/photo-1585128792020-803d29415281?w=400',
            title: 'Emergency Pipe Repair',
            description: 'Fast response to burst pipe emergency',
            location: 'Woollahra'
          }
        ],
        reviews: [
          {
            id: 1,
            customerName: 'Sarah Johnson',
            avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100',
            rating: 5,
            date: '2 weeks ago',
            jobType: 'Tap Replacement',
            comment: 'Mike was fantastic! Arrived on time, fixed the problem quickly, and cleaned up after himself. Highly recommend!',
            verified: true
          },
          {
            id: 2,
            customerName: 'David Chen',
            avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
            rating: 5,
            date: '1 month ago',
            jobType: 'Blocked Drain',
            comment: 'Professional service and fair pricing. Mike explained everything clearly and the drain has been perfect since.',
            verified: true
          },
          {
            id: 3,
            customerName: 'Emma Wilson',
            avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100',
            rating: 4,
            date: '1 month ago',
            jobType: 'Hot Water Service',
            comment: 'Great work on our hot water system replacement. Very knowledgeable and reasonably priced.',
            verified: true
          }
        ],
        availability: {
          nextAvailable: 'Tomorrow',
          emergency: true,
          workingHours: 'Mon-Fri 7AM-6PM, Sat 8AM-4PM'
        },
        contact: {
          phone: '0412 345 678',
          email: 'mike@mikesplumbing.com.au',
          website: 'www.mikesplumbing.com.au'
        },
        pricing: {
          calloutFee: '$80',
          hourlyRate: '$120/hr',
          emergencyRate: '$150/hr (after hours)'
        }
      };

      setTradieData(tradieFromState || mockTradieData);
      setLoading(false);
    }, 1000);
  }, [tradieId, tradieFromState]);

  const handleQuoteRequest = (formData) => {
    console.log('Quote request submitted:', formData);
    // Handle quote request logic here
    alert('Quote request sent! Mike will contact you within 2 hours.');
    setQuoteFormOpen(false);
  };

  const handleDirectCall = () => {
    if (tradieData?.contact?.phone) {
      window.open(`tel:${tradieData?.contact?.phone}`, '_self');
    }
  };

  const handleDirectMessage = () => {
    // Navigate to messaging interface
    navigate('/messages', { 
      state: { tradieId: tradieData?.id, tradieName: tradieData?.name } 
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-64 bg-muted rounded-lg mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-6">
                <div className="h-32 bg-muted rounded-lg"></div>
                <div className="h-48 bg-muted rounded-lg"></div>
              </div>
              <div className="space-y-6">
                <div className="h-48 bg-muted rounded-lg"></div>
                <div className="h-32 bg-muted rounded-lg"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!tradieData) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Icon name="AlertCircle" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h2 className="text-2xl font-semibold text-foreground mb-2">Tradie Not Found</h2>
            <p className="text-muted-foreground mb-6">
              The tradie profile you're looking for could not be found.
            </p>
            <Button onClick={() => navigate('/suburb-selection-map-view')}>
              Back to Tradie Search
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: 'overview', label: 'Overview', icon: 'Info' },
    { id: 'reviews', label: 'Reviews', icon: 'Star' },
    { id: 'portfolio', label: 'Portfolio', icon: 'Image' },
    { id: 'pricing', label: 'Pricing', icon: 'DollarSign' }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        {/* Back Navigation */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            size="sm"
            iconName="ArrowLeft"
            iconPosition="left"
            onClick={() => navigate(-1)}
          >
            Back to Search
          </Button>
        </div>

        {/* Tradie Profile Header */}
        <TradieProfileCard 
          tradie={tradieData}
          onCallClick={handleDirectCall}
          onMessageClick={handleDirectMessage}
          onQuoteClick={() => setQuoteFormOpen(true)}
        />

        {/* Navigation Tabs */}
        <div className="bg-card border border-border rounded-lg mb-8">
          <div className="flex overflow-x-auto">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={cn(
                  "flex items-center gap-2 px-6 py-4 text-sm font-medium border-b-2 transition-all whitespace-nowrap",
                  activeTab === tab?.id
                    ? "border-primary text-primary bg-primary/5" :"border-transparent text-muted-foreground hover:text-foreground hover:bg-accent"
                )}
              >
                <Icon name={tab?.icon} size={16} />
                {tab?.label}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {activeTab === 'overview' && (
              <div className="space-y-8">
                {/* About Section */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">About {tradieData?.name}</h2>
                  <p className="text-muted-foreground leading-relaxed mb-6">{tradieData?.aboutText}</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="flex items-center gap-3">
                      <Icon name="Calendar" size={20} className="text-primary" />
                      <div>
                        <div className="font-medium text-foreground">{tradieData?.yearsExperience} Years Experience</div>
                        <div className="text-sm text-muted-foreground">{tradieData?.completedJobs} jobs completed</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Icon name="Clock" size={20} className="text-primary" />
                      <div>
                        <div className="font-medium text-foreground">Fast Response</div>
                        <div className="text-sm text-muted-foreground">{tradieData?.responseTime} typical</div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Services Section */}
                <div className="bg-card border border-border rounded-lg p-6">
                  <h2 className="text-xl font-semibold text-foreground mb-4">Services & Pricing</h2>
                  <div className="space-y-4">
                    {tradieData?.services?.map((service, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-accent/50 rounded-lg">
                        <div>
                          <div className="font-medium text-foreground">{service?.name}</div>
                          <div className="text-sm text-muted-foreground">{service?.duration}</div>
                        </div>
                        <div className="text-primary font-semibold">{service?.price}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'reviews' && (
              <ReviewSection reviews={tradieData?.reviews} />
            )}

            {activeTab === 'portfolio' && (
              <PortfolioGallery portfolio={tradieData?.portfolio} />
            )}

            {activeTab === 'pricing' && (
              <PricingGuide pricing={tradieData?.pricing} services={tradieData?.services} />
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">LocalTrust™ Score</h3>
              <div className="text-center">
                <div className="text-4xl font-bold text-primary mb-2">{tradieData?.trustScore}</div>
                <div className="flex items-center justify-center gap-1 mb-2">
                  {[...Array(5)]?.map((_, i) => (
                    <Icon 
                      key={i} 
                      name="Star" 
                      size={16} 
                      className={cn(
                        "fill-current",
                        i < Math.floor(tradieData?.trustScore) ? "text-yellow-500" : "text-muted-foreground"
                      )}
                    />
                  ))}
                </div>
                <div className="text-sm text-muted-foreground">
                  Based on {tradieData?.localReviews} local reviews
                </div>
              </div>
            </div>

            {/* Availability */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <Icon name="Calendar" size={16} className="text-primary" />
                  <span className="text-sm">Next available: {tradieData?.availability?.nextAvailable}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Clock" size={16} className="text-primary" />
                  <span className="text-sm">{tradieData?.availability?.workingHours}</span>
                </div>
                {tradieData?.availability?.emergency && (
                  <div className="flex items-center gap-2">
                    <Icon name="AlertTriangle" size={16} className="text-red-500" />
                    <span className="text-sm text-red-600 font-medium">24/7 Emergency Service</span>
                  </div>
                )}
              </div>
            </div>

            {/* Service Areas */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Service Areas</h3>
              <div className="space-y-2">
                {tradieData?.suburbs?.map((suburb, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-sm">{suburb}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Actions */}
            <div className="bg-gradient-to-br from-primary/10 to-success/10 border border-primary/20 rounded-lg p-6">
              <h3 className="font-semibold text-foreground mb-4">Get in Touch</h3>
              <div className="space-y-3">
                <Button 
                  className="w-full" 
                  iconName="Phone" 
                  iconPosition="left"
                  onClick={handleDirectCall}
                >
                  Call Now
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full" 
                  iconName="MessageCircle" 
                  iconPosition="left"
                  onClick={handleDirectMessage}
                >
                  Send Message
                </Button>
                <Button 
                  variant="secondary" 
                  className="w-full" 
                  iconName="FileText" 
                  iconPosition="left"
                  onClick={() => setQuoteFormOpen(true)}
                >
                  Request Quote
                </Button>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Quote Request Modal */}
      {quoteFormOpen && (
        <QuoteRequestForm 
          tradie={tradieData}
          onSubmit={handleQuoteRequest}
          onClose={() => setQuoteFormOpen(false)}
        />
      )}
    </div>
  );
};

export default TradieProfileQuoteRequest;