import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import Select from '../../components/ui/Select';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import SuburbSelector from './components/SuburbSelector';
import MapView from './components/MapView';
import CategoryFilter from './components/CategoryFilter';

import { cn } from '../../utils/cn';

const SuburbSelectionMapView = () => {
  const navigate = useNavigate();
  const [selectedSuburb, setSelectedSuburb] = useState('');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [tradieData, setTradieData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [mapCenter, setMapCenter] = useState({ lat: -33.8688, lng: 151.2093 }); // Sydney default

  // TradeLink categories with brand colors and icons
  const tradeCategories = [
    {
      id: 'plumber',
      name: 'Plumber',
      icon: 'Wrench',
      color: 'bg-emerald-500',
      count: 5
    },
    {
      id: 'electrician',
      name: 'Electrician',
      icon: 'Zap',
      color: 'bg-blue-500',
      count: 4
    },
    {
      id: 'painter',
      name: 'Painter',
      icon: 'Brush',
      color: 'bg-orange-500',
      count: 5
    },
    {
      id: 'roofer',
      name: 'Roofer',
      icon: 'Home',
      color: 'bg-red-500',
      count: 3
    },
    {
      id: 'ac-specialist',
      name: 'AC Specialist',
      icon: 'Wind',
      color: 'bg-purple-500',
      count: 4
    }
  ];

  // Mock suburb data - in real app would come from API
  const availableSuburbs = [
    { value: 'bondi-beach-2026', label: 'Bondi Beach, NSW 2026' },
    { value: 'paddington-2021', label: 'Paddington, NSW 2021' },
    { value: 'surry-hills-2010', label: 'Surry Hills, NSW 2010' },
    { value: 'woollahra-2025', label: 'Woollahra, NSW 2025' },
    { value: 'double-bay-2028', label: 'Double Bay, NSW 2028' },
    { value: 'manly-2095', label: 'Manly, NSW 2095' },
    { value: 'newtown-2042', label: 'Newtown, NSW 2042' },
    { value: 'redfern-2016', label: 'Redfern, NSW 2016' }
  ];

  // Mock tradie data per suburb
  const mockTradieData = {
    'bondi-beach-2026': [
      {
        id: 1,
        category: 'plumber',
        name: 'Mike\'s Plumbing',
        trustScore: 4.8,
        startingPrice: '$80/hr',
        position: { lat: -33.8915, lng: 151.2767 }
      },
      {
        id: 2,
        category: 'electrician',
        name: 'Spark Solutions',
        trustScore: 4.6,
        startingPrice: '$100/hr',
        position: { lat: -33.8905, lng: 151.2777 }
      },
      {
        id: 3,
        category: 'painter',
        name: 'Coastal Painters',
        trustScore: 4.9,
        startingPrice: '$60/hr',
        position: { lat: -33.8925, lng: 151.2757 }
      }
    ],
    'paddington-2021': [
      {
        id: 4,
        category: 'roofer',
        name: 'Heritage Roofing',
        trustScore: 4.7,
        startingPrice: '$150/hr',
        position: { lat: -33.8866, lng: 151.2314 }
      },
      {
        id: 5,
        category: 'ac-specialist',
        name: 'Cool Comfort AC',
        trustScore: 4.5,
        startingPrice: '$120/hr',
        position: { lat: -33.8876, lng: 151.2324 }
      }
    ]
  };

  // Filter categories to show only those with available tradies
  const getFilteredCategories = () => {
    if (!selectedSuburb || !tradieData?.length) return tradeCategories;
    
    const availableCategories = new Set(tradieData?.map(tradie => tradie?.category));
    return tradeCategories?.map(category => ({
      ...category,
      count: tradieData?.filter(tradie => tradie?.category === category?.id)?.length || 0
    }))?.filter(category => availableCategories?.has(category?.id));
  };

  // Handle suburb selection
  const handleSuburbSelect = (suburbValue) => {
    setSelectedSuburb(suburbValue);
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const data = mockTradieData?.[suburbValue] || [];
      setTradieData(data);
      setLoading(false);

      // Update map center based on suburb
      if (data?.length > 0) {
        const avgLat = data?.reduce((sum, tradie) => sum + tradie?.position?.lat, 0) / data?.length;
        const avgLng = data?.reduce((sum, tradie) => sum + tradie?.position?.lng, 0) / data?.length;
        setMapCenter({ lat: avgLat, lng: avgLng });
      }
    }, 1000);
  };

  // Handle category filter changes
  const handleCategoryFilter = (categoryIds) => {
    setSelectedCategories(categoryIds);
  };

  // Get filtered tradie data based on selected categories
  const getFilteredTradieData = () => {
    if (selectedCategories?.length === 0) return tradieData;
    return tradieData?.filter(tradie => selectedCategories?.includes(tradie?.category));
  };

  // Handle tradie bubble click
  const handleTradieSelect = (tradie) => {
    navigate('/tradie-profile-quote-request', { 
      state: { tradieId: tradie?.id, tradie } 
    });
  };

  const filteredTradies = getFilteredTradieData();
  const filteredCategories = getFilteredCategories();

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            Find Trusted Tradies Near You
          </h1>
          <p className="text-xl text-muted-foreground mb-6">
            Browse up to 5 vetted professionals per trade in your local area
          </p>
          <div className="inline-flex items-center gap-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium">
            <Icon name="Shield" size={16} />
            <span>All tradies verified & insured</span>
          </div>
        </div>

        {/* Suburb Selection */}
        <div className="max-w-md mx-auto mb-8">
          <SuburbSelector 
            suburbs={availableSuburbs}
            selectedSuburb={selectedSuburb}
            onSuburbSelect={handleSuburbSelect}
            loading={loading}
          />
        </div>

        {selectedSuburb && (
          <div className="space-y-8">
            {/* Category Filter */}
            <CategoryFilter 
              categories={filteredCategories}
              selectedCategories={selectedCategories}
              onCategoryChange={handleCategoryFilter}
            />

            {/* Map and Tradie Count */}
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-sm">
              <div className="p-6 border-b border-border">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-semibold text-foreground">
                      Available Tradies
                    </h2>
                    <p className="text-muted-foreground">
                      {filteredTradies?.length} professionals in {availableSuburbs?.find(s => s?.value === selectedSuburb)?.label?.split(',')?.[0]}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Icon name="MapPin" size={16} />
                    <span>Interactive Map View</span>
                  </div>
                </div>
              </div>

              {loading ? (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                    <p className="text-muted-foreground">Loading tradies in your area...</p>
                  </div>
                </div>
              ) : filteredTradies?.length > 0 ? (
                <MapView 
                  center={mapCenter}
                  tradies={filteredTradies}
                  categories={tradeCategories}
                  onTradieSelect={handleTradieSelect}
                />
              ) : (
                <div className="h-96 flex items-center justify-center">
                  <div className="text-center">
                    <Icon name="MapPin" size={48} className="text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-foreground mb-2">No tradies found</h3>
                    <p className="text-muted-foreground mb-4">
                      Try selecting a different suburb or adjusting your category filters
                    </p>
                    <Button 
                      variant="outline"
                      onClick={() => {
                        setSelectedCategories([]);
                        setSelectedSuburb('');
                      }}
                    >
                      Reset Filters
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Tradie List View (Fallback for mobile or accessibility) */}
            {filteredTradies?.length > 0 && (
              <div className="md:hidden space-y-4">
                <h3 className="text-lg font-semibold text-foreground">Available Tradies</h3>
                <div className="grid gap-4">
                  {filteredTradies?.map((tradie) => {
                    const category = tradeCategories?.find(cat => cat?.id === tradie?.category);
                    return (
                      <div 
                        key={tradie?.id}
                        className="bg-card border border-border rounded-lg p-4 cursor-pointer hover:border-primary/50 transition-colors"
                        onClick={() => handleTradieSelect(tradie)}
                      >
                        <div className="flex items-center gap-3">
                          <div className={cn(
                            "w-12 h-12 rounded-lg flex items-center justify-center",
                            category?.color
                          )}>
                            <Icon name={category?.icon} size={20} className="text-white" />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-semibold text-foreground">{tradie?.name}</h4>
                            <p className="text-sm text-muted-foreground">{category?.name}</p>
                            <div className="flex items-center gap-2 mt-1">
                              <div className="flex items-center gap-1">
                                <Icon name="Star" size={14} className="text-yellow-500 fill-current" />
                                <span className="text-sm font-medium">{tradie?.trustScore}</span>
                              </div>
                              <span className="text-sm text-muted-foreground">•</span>
                              <span className="text-sm text-primary font-medium">{tradie?.startingPrice}</span>
                            </div>
                          </div>
                          <Icon name="ChevronRight" size={20} className="text-muted-foreground" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* Call to Action */}
            {filteredTradies?.length > 0 && (
              <div className="bg-gradient-to-br from-primary/10 to-success/10 rounded-xl p-8 text-center">
                <h3 className="text-2xl font-bold text-foreground mb-4">
                  Ready to Get Started?
                </h3>
                <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                  Select a tradie from the map or list above to view their full profile, 
                  see customer reviews, and request a quote for your project.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button 
                    variant="default"
                    size="lg"
                    iconName="MessageCircle"
                    iconPosition="left"
                  >
                    Need Help Choosing?
                  </Button>
                  <Button 
                    variant="outline"
                    size="lg"
                    iconName="Phone"
                    iconPosition="left"
                  >
                    Call TradeLink
                  </Button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Benefits Section - shown when no suburb selected */}
        {!selectedSuburb && (
          <div className="mt-16">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Why Choose TradeLink?
              </h2>
              <p className="text-xl text-muted-foreground">
                Local trades. Trusted faces.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Shield" size={32} className="text-primary" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Verified & Insured</h3>
                <p className="text-muted-foreground">
                  All tradies are verified with proper licenses and insurance coverage
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-success/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="Users" size={32} className="text-success" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Max 5 Per Trade</h3>
                <p className="text-muted-foreground">
                  Carefully curated selection ensures quality over quantity
                </p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-orange-500/10 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <Icon name="MapPin" size={32} className="text-orange-500" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">Hyper Local</h3>
                <p className="text-muted-foreground">
                  Find trusted professionals right in your neighborhood
                </p>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default SuburbSelectionMapView;