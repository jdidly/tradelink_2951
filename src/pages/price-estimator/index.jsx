import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRoleContext } from '../../components/ui/RoleContextProvider';
import Header from '../../components/ui/Header';
import Button from '../../components/ui/Button';
import Input from '../../components/ui/Input';
import Select from '../../components/ui/Select';
import Icon from '../../components/AppIcon';
import { generatePriceEstimate, formatEstimateForDisplay, validateEstimate } from '../../utils/priceEstimator';

const PriceEstimator = () => {
  const navigate = useNavigate();
  const { locationContext } = useRoleContext();
  
  // Form state
  const [formData, setFormData] = useState({
    description: '',
    tradeCategory: '',
    suburb: locationContext?.suburb || '',
    state: locationContext?.state || 'NSW',
    urgency: 'flexible',
    materialsIncluded: false,
    estimatedHours: ''
  });

  // UI state
  const [estimate, setEstimate] = useState(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');
  const [processingStage, setProcessingStage] = useState('');
  const [showEstimate, setShowEstimate] = useState(false);

  // Trade categories with updated data
  const tradeCategories = [
    { value: 'Plumber', label: 'Plumber', icon: 'Wrench' },
    { value: 'Electrician', label: 'Electrician', icon: 'Zap' },
    { value: 'Painter', label: 'Painter', icon: 'Paintbrush' },
    { value: 'Roofer', label: 'Roofer', icon: 'Home' },
    { value: 'AC Specialist', label: 'AC Specialist', icon: 'Snowflake' },
    { value: 'Handyman', label: 'Handyman', icon: 'Tool' },
    { value: 'Gardener', label: 'Gardener', icon: 'TreePine' },
    { value: 'Cleaner', label: 'Cleaner', icon: 'Brush' }
  ];

  const urgencyOptions = [
    { value: 'flexible', label: 'Flexible (within a week)', description: 'Standard pricing' },
    { value: 'soon', label: 'Soon (2-3 days)', description: '+20% urgency fee' },
    { value: 'urgent', label: 'Urgent (same day)', description: '+50% emergency fee' }
  ];

  const australianStates = [
    { value: 'NSW', label: 'New South Wales' },
    { value: 'VIC', label: 'Victoria' },
    { value: 'QLD', label: 'Queensland' },
    { value: 'WA', label: 'Western Australia' },
    { value: 'SA', label: 'South Australia' },
    { value: 'TAS', label: 'Tasmania' },
    { value: 'ACT', label: 'Australian Capital Territory' },
    { value: 'NT', label: 'Northern Territory' }
  ];

  // Update location when context changes
  useEffect(() => {
    if (locationContext?.suburb) {
      setFormData(prev => ({
        ...prev,
        suburb: locationContext?.suburb,
        state: locationContext?.state || 'NSW'
      }));
    }
  }, [locationContext]);

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    setError('');
  };

  const validateForm = () => {
    if (!formData?.description?.trim()) {
      throw new Error('Please provide a detailed job description');
    }
    if (formData?.description?.trim()?.length < 10) {
      throw new Error('Job description must be at least 10 characters long');
    }
    if (!formData?.tradeCategory) {
      throw new Error('Please select a trade category');
    }
    if (!formData?.suburb?.trim()) {
      throw new Error('Please enter your suburb');
    }
    return true;
  };

  const handleGenerateEstimate = async () => {
    try {
      setError('');
      setEstimate(null);
      setShowEstimate(false);
      
      // Validate form
      validateForm();
      
      setIsGenerating(true);
      setProcessingStage('Analyzing job requirements...');
      
      // Simulate processing stages for better UX
      const stages = [
        'Analyzing job requirements...',
        'Checking local pricing data...',
        'Calculating labor costs...',
        'Factoring in location adjustments...',
        'Generating AI estimate...',
        'Finalizing price range...'
      ];

      let currentStage = 0;
      const stageInterval = setInterval(() => {
        if (currentStage < stages?.length - 1) {
          currentStage++;
          setProcessingStage(stages?.[currentStage]);
        }
      }, 1500);
      
      // Generate AI estimate
      const result = await generatePriceEstimate(formData);
      
      // Clear processing interval
      clearInterval(stageInterval);
      setProcessingStage('Complete!');
      
      // Validate and format the estimate
      validateEstimate(result);
      const formattedEstimate = formatEstimateForDisplay(result);
      
      setEstimate(formattedEstimate);
      setShowEstimate(true);
      
      // Scroll to estimate section
      setTimeout(() => {
        const estimateElement = document.getElementById('estimate-section');
        estimateElement?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 500);
      
    } catch (err) {
      console.error('Error generating estimate:', err);
      setError(err?.message || 'Failed to generate estimate. Please try again.');
    } finally {
      setIsGenerating(false);
      setProcessingStage('');
    }
  };

  const handleFindTradies = () => {
    navigate('/suburb-selection', { 
      state: { 
        selectedCategory: formData?.tradeCategory,
        jobDescription: formData?.description,
        estimatedBudget: estimate?.costs?.total,
        urgency: formData?.urgency
      } 
    });
  };

  const selectedCategory = tradeCategories?.find(cat => cat?.value === formData?.tradeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground mb-4">
            AI Price Estimator
          </h1>
          <p className="text-lg text-muted-foreground mb-6">
            Get instant pricing estimates for your trade jobs powered by Gemini AI
          </p>
          <div className="flex justify-center items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="Sparkles" size={16} className="text-primary" />
              <span>AI-Powered Analysis</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="MapPin" size={16} className="text-primary" />
              <span>Local Pricing Data</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="Clock" size={16} className="text-primary" />
              <span>Instant Results</span>
            </div>
          </div>
        </div>

        {/* Estimation Form */}
        <div className="bg-card border border-border rounded-lg p-6 mb-8">
          <h2 className="text-2xl font-semibold text-foreground mb-6">Tell us about your job</h2>
          
          <div className="space-y-6">
            {/* Job Description */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Job Description *
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Describe your job in detail. Include specifics like room size, materials needed, current issues, accessibility, etc. The more detail you provide, the more accurate your estimate will be."
                className="w-full h-32 p-3 border border-border rounded-lg resize-none focus:ring-2 focus:ring-primary focus:border-transparent"
                disabled={isGenerating}
              />
              <div className="text-sm text-muted-foreground mt-1">
                {formData?.description?.length}/500 characters
              </div>
            </div>

            {/* Trade Category */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Trade Category *
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                {tradeCategories?.map((category) => (
                  <button
                    key={category?.value}
                    onClick={() => handleInputChange('tradeCategory', category?.value)}
                    disabled={isGenerating}
                    className={`p-4 border rounded-lg text-center transition-all ${
                      formData?.tradeCategory === category?.value
                        ? 'border-primary bg-primary/10 text-primary' :'border-border hover:border-primary/50 hover:bg-primary/5'
                    }`}
                  >
                    <div className="flex flex-col items-center space-y-2">
                      <Icon name={category?.icon} size={24} />
                      <span className="text-sm font-medium">{category?.label}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  Suburb *
                </label>
                <Input
                  value={formData?.suburb}
                  onChange={(e) => handleInputChange('suburb', e?.target?.value)}
                  placeholder="Enter your suburb"
                  disabled={isGenerating}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">
                  State *
                </label>
                <Select
                  value={formData?.state}
                  onChange={(value) => handleInputChange('state', value)}
                  options={australianStates}
                  disabled={isGenerating}
                />
              </div>
            </div>

            {/* Urgency */}
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                When do you need this done?
              </label>
              <div className="space-y-3">
                {urgencyOptions?.map((option) => (
                  <label key={option?.value} className="flex items-start space-x-3 cursor-pointer">
                    <input
                      type="radio"
                      name="urgency"
                      value={option?.value}
                      checked={formData?.urgency === option?.value}
                      onChange={(e) => handleInputChange('urgency', e?.target?.value)}
                      disabled={isGenerating}
                      className="mt-1"
                    />
                    <div>
                      <div className="font-medium text-foreground">{option?.label}</div>
                      <div className="text-sm text-muted-foreground">{option?.description}</div>
                    </div>
                  </label>
                ))}
              </div>
            </div>

            {/* Materials */}
            <div>
              <label className="flex items-center space-x-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData?.materialsIncluded}
                  onChange={(e) => handleInputChange('materialsIncluded', e?.target?.checked)}
                  disabled={isGenerating}
                />
                <div>
                  <span className="font-medium text-foreground">Include materials in estimate</span>
                  <div className="text-sm text-muted-foreground">
                    Check this if you want the tradie to supply materials
                  </div>
                </div>
              </label>
            </div>

            {/* Generate Button */}
            <div className="pt-4">
              <Button
                onClick={handleGenerateEstimate}
                disabled={isGenerating || !formData?.description?.trim() || !formData?.tradeCategory}
                className="w-full md:w-auto px-8 py-3 text-lg"
                size="lg"
                iconName={isGenerating ? "Loader2" : "Sparkles"}
                iconPosition="left"
              >
                {isGenerating ? 'Generating Estimate...' : 'Get AI Price Estimate'}
              </Button>
            </div>
          </div>
        </div>

        {/* Processing Indicator */}
        {isGenerating && (
          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center space-x-4">
              <div className="animate-spin">
                <Icon name="Loader2" size={24} className="text-primary" />
              </div>
              <div className="text-center">
                <div className="font-medium text-foreground">{processingStage}</div>
                <div className="text-sm text-muted-foreground mt-1">
                  Analyzing with Gemini AI...
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="bg-destructive/10 border border-destructive/20 text-destructive rounded-lg p-4 mb-8">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="mt-0.5" />
              <div>
                <div className="font-medium">Error generating estimate</div>
                <div className="text-sm mt-1">{error}</div>
              </div>
            </div>
          </div>
        )}

        {/* Estimate Results */}
        {showEstimate && estimate && (
          <div id="estimate-section" className="space-y-6">
            {/* Main Estimate Card */}
            <div className="bg-gradient-to-br from-primary/10 to-success/10 border border-primary/20 rounded-lg p-6">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">
                    Price Estimate for {selectedCategory?.label}
                  </h3>
                  <p className="text-muted-foreground">
                    {formData?.suburb}, {formData?.state} • {formData?.urgency} priority
                  </p>
                </div>
                <div className="text-right">
                  <div className="text-sm text-muted-foreground">Estimated Range</div>
                  <div className="text-3xl font-bold text-primary">
                    {estimate?.formattedRange?.min} - {estimate?.formattedRange?.max}
                  </div>
                </div>
              </div>

              {/* Key Metrics */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Estimated Hours</div>
                  <div className="text-xl font-semibold text-foreground">
                    {estimate?.estimatedHours}h
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Hourly Rate</div>
                  <div className="text-xl font-semibold text-foreground">
                    {estimate?.formattedHourlyRate}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Complexity</div>
                  <div className="text-xl font-semibold text-foreground capitalize">
                    {estimate?.complexity}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-sm text-muted-foreground">Confidence</div>
                  <div className="text-xl font-semibold text-foreground capitalize">
                    {estimate?.confidence}
                  </div>
                </div>
              </div>

              {/* Cost Breakdown */}
              <div className="bg-white/50 rounded-lg p-4">
                <h4 className="font-semibold text-foreground mb-3">Cost Breakdown</h4>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Labor Cost:</span>
                    <span className="font-medium text-foreground">{estimate?.formattedCosts?.labor}</span>
                  </div>
                  {estimate?.costs?.materials > 0 && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Materials:</span>
                      <span className="font-medium text-foreground">{estimate?.formattedCosts?.materials}</span>
                    </div>
                  )}
                  <div className="border-t pt-2 flex justify-between font-semibold">
                    <span className="text-foreground">Total Estimate:</span>
                    <span className="text-primary">{estimate?.formattedCosts?.total}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* AI Analysis */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h4 className="font-semibold text-foreground mb-4">AI Analysis</h4>
              
              {estimate?.reasoning && (
                <div className="mb-4">
                  <h5 className="font-medium text-foreground mb-2">Reasoning:</h5>
                  <p className="text-muted-foreground">{estimate?.reasoning}</p>
                </div>
              )}

              {estimate?.assumptions?.length > 0 && (
                <div className="mb-4">
                  <h5 className="font-medium text-foreground mb-2">Assumptions:</h5>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {estimate?.assumptions?.map((assumption, index) => (
                      <li key={index}>{assumption}</li>
                    ))}
                  </ul>
                </div>
              )}

              {estimate?.recommendations?.length > 0 && (
                <div>
                  <h5 className="font-medium text-foreground mb-2">Recommendations:</h5>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {estimate?.recommendations?.map((rec, index) => (
                      <li key={index}>{rec}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                onClick={handleFindTradies}
                size="lg"
                iconName="Users"
                iconPosition="left"
                className="px-8"
              >
                Find Tradies in {formData?.suburb}
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="RefreshCw"
                iconPosition="left"
                onClick={() => {
                  setShowEstimate(false);
                  setEstimate(null);
                  setFormData(prev => ({ ...prev, description: '' }));
                }}
              >
                New Estimate
              </Button>
              
              <Button
                variant="outline"
                size="lg"
                iconName="Share2"
                iconPosition="left"
                onClick={() => {
                  const shareText = `Price estimate: ${estimate?.formattedRange?.min} - ${estimate?.formattedRange?.max} for ${formData?.tradeCategory} work in ${formData?.suburb}`;
                  if (navigator.share) {
                    navigator.share({ title: 'TradeLink Price Estimate', text: shareText });
                  } else {
                    navigator.clipboard?.writeText(shareText);
                  }
                }}
              >
                Share Estimate
              </Button>
            </div>

            {/* Disclaimer */}
            <div className="bg-muted/30 border border-border rounded-lg p-4 text-sm text-muted-foreground">
              <div className="flex items-start space-x-2">
                <Icon name="Info" size={16} className="mt-0.5" />
                <div>
                  <strong>Disclaimer:</strong> This is an AI-generated estimate based on typical job requirements. 
                  Actual prices may vary based on specific job conditions, materials, site access, and individual 
                  tradie pricing. We recommend getting multiple quotes for accurate comparison.
                </div>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default PriceEstimator;