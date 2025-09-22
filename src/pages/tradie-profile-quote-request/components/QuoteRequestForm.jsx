import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Icon from '../../../components/AppIcon';

const QuoteRequestForm = ({ tradie, onSubmit, onClose }) => {
  const [formData, setFormData] = useState({
    jobType: '',
    urgency: '',
    contactMethod: '',
    description: '',
    customerName: '',
    phone: '',
    email: '',
    address: '',
    preferredDate: '',
    preferredTime: ''
  });

  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  const jobTypeOptions = tradie?.services?.map(service => ({
    value: service?.name?.toLowerCase()?.replace(/\s+/g, '-'),
    label: service?.name,
    description: service?.price
  })) || [];

  const urgencyOptions = [
    { value: 'urgent', label: 'Urgent (Within 24 hours)', description: 'Emergency or urgent repair' },
    { value: 'soon', label: 'Soon (Within a week)', description: 'Important but not emergency' },
    { value: 'flexible', label: 'Flexible (When convenient)', description: 'No rush, anytime is fine' }
  ];

  const contactMethodOptions = [
    { value: 'phone', label: 'Phone Call', description: 'Preferred for urgent matters' },
    { value: 'sms', label: 'Text Message', description: 'Quick and convenient' },
    { value: 'email', label: 'Email', description: 'Detailed quotes and information' }
  ];

  const timeSlotOptions = [
    { value: 'morning', label: 'Morning (8AM - 12PM)' },
    { value: 'afternoon', label: 'Afternoon (12PM - 5PM)' },
    { value: 'evening', label: 'Evening (5PM - 8PM)' },
    { value: 'anytime', label: 'Anytime that suits' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.customerName?.trim()) newErrors.customerName = 'Name is required';
    if (!formData?.phone?.trim()) newErrors.phone = 'Phone number is required';
    if (!formData?.email?.trim()) newErrors.email = 'Email is required';
    if (!formData?.jobType) newErrors.jobType = 'Please select a job type';
    if (!formData?.urgency) newErrors.urgency = 'Please select urgency level';
    if (!formData?.contactMethod) newErrors.contactMethod = 'Please select contact method';
    if (!formData?.description?.trim()) newErrors.description = 'Job description is required';

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    
    if (!validateForm()) return;

    setSubmitting(true);
    try {
      await onSubmit({
        ...formData,
        tradieId: tradie?.id,
        tradieName: tradie?.name
      });
    } catch (error) {
      console.error('Error submitting quote request:', error);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-border p-6 rounded-t-xl">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-2xl font-bold text-foreground">Request Quote</h2>
              <p className="text-muted-foreground">Get a quote from {tradie?.name}</p>
            </div>
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors"
            >
              <Icon name="X" size={24} />
            </button>
          </div>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Job Details */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Job Details</h3>
            
            <Select
              label="What type of job do you need?"
              options={jobTypeOptions}
              value={formData?.jobType}
              onChange={(value) => handleInputChange('jobType', value)}
              placeholder="Select job type..."
              error={errors?.jobType}
              required
            />

            <Select
              label="How urgent is this job?"
              options={urgencyOptions}
              value={formData?.urgency}
              onChange={(value) => handleInputChange('urgency', value)}
              placeholder="Select urgency..."
              error={errors?.urgency}
              required
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">
                Describe the job in detail *
              </label>
              <textarea
                value={formData?.description}
                onChange={(e) => handleInputChange('description', e?.target?.value)}
                placeholder="Please provide as much detail as possible about what you need done..."
                rows={4}
                className="w-full px-3 py-2 border border-border rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-primary resize-vertical"
              />
              {errors?.description && (
                <p className="text-sm text-destructive">{errors?.description}</p>
              )}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Your Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Your Name"
                value={formData?.customerName}
                onChange={(e) => handleInputChange('customerName', e?.target?.value)}
                placeholder="Enter your name"
                error={errors?.customerName}
                required
              />

              <Input
                label="Phone Number"
                value={formData?.phone}
                onChange={(e) => handleInputChange('phone', e?.target?.value)}
                placeholder="Enter your phone number"
                type="tel"
                error={errors?.phone}
                required
              />
            </div>

            <Input
              label="Email Address"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              placeholder="Enter your email"
              type="email"
              error={errors?.email}
              required
            />

            <Input
              label="Job Address"
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              placeholder="Enter the job location"
              error={errors?.address}
            />

            <Select
              label="Preferred contact method"
              options={contactMethodOptions}
              value={formData?.contactMethod}
              onChange={(value) => handleInputChange('contactMethod', value)}
              placeholder="How should we contact you?"
              error={errors?.contactMethod}
              required
            />
          </div>

          {/* Scheduling */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground">Preferred Timing</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                label="Preferred Date"
                value={formData?.preferredDate}
                onChange={(e) => handleInputChange('preferredDate', e?.target?.value)}
                type="date"
                min={new Date()?.toISOString()?.split('T')?.[0]}
              />

              <Select
                label="Preferred Time"
                options={timeSlotOptions}
                value={formData?.preferredTime}
                onChange={(value) => handleInputChange('preferredTime', value)}
                placeholder="Select time preference..."
              />
            </div>
          </div>

          {/* Pricing Info */}
          <div className="bg-primary/5 border border-primary/20 rounded-lg p-4">
            <div className="flex items-start gap-3">
              <Icon name="Info" size={20} className="text-primary mt-0.5" />
              <div>
                <h4 className="font-medium text-foreground mb-2">Quote Process</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {tradie?.name} will contact you within {tradie?.responseTime}</li>
                  <li>• Free quote and consultation (no obligation)</li>
                  <li>• Callout fee: {tradie?.pricing?.calloutFee}</li>
                  <li>• Standard rate: {tradie?.pricing?.hourlyRate}</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-border">
            <Button
              type="button"
              variant="outline"
              className="sm:w-auto"
              onClick={onClose}
              disabled={submitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="flex-1"
              loading={submitting}
              iconName="Send"
              iconPosition="left"
            >
              {submitting ? 'Sending Quote Request...' : 'Send Quote Request'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuoteRequestForm;