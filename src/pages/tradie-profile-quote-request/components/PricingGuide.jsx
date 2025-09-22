import React from 'react';
import Icon from '../../../components/AppIcon';

const PricingGuide = ({ pricing, services }) => {
  return (
    <div className="space-y-6">
      {/* Pricing Overview */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground mb-4">Pricing Overview</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{pricing?.calloutFee}</div>
            <div className="text-sm text-muted-foreground">Callout Fee</div>
          </div>
          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{pricing?.hourlyRate}</div>
            <div className="text-sm text-muted-foreground">Standard Rate</div>
          </div>
          <div className="text-center p-4 bg-accent/50 rounded-lg">
            <div className="text-2xl font-bold text-primary">{pricing?.emergencyRate?.split(' ')?.[0]}</div>
            <div className="text-sm text-muted-foreground">Emergency Rate</div>
          </div>
        </div>

        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Icon name="Info" size={20} className="text-blue-600 mt-0.5" />
            <div>
              <h4 className="font-medium text-blue-900 mb-2">Pricing Notes</h4>
              <ul className="text-sm text-blue-800 space-y-1">
                <li>• Callout fee is waived if job proceeds</li>
                <li>• Emergency rates apply after 6PM and weekends</li>
                <li>• Materials are charged separately at cost price</li>
                <li>• All quotes are free with no obligation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* Service Pricing */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Service-Specific Pricing</h3>
        <div className="space-y-4">
          {services?.map((service, index) => (
            <div key={index} className="border border-border rounded-lg p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-medium text-foreground">{service?.name}</h4>
                <span className="text-primary font-semibold">{service?.price}</span>
              </div>
              <div className="flex items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Icon name="Clock" size={14} />
                  <span>{service?.duration}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Payment Terms */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4">Payment Terms</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-medium text-foreground mb-3">Accepted Payment Methods</h4>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Icon name="CreditCard" size={16} className="text-primary" />
                <span className="text-sm">Credit/Debit Cards</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Smartphone" size={16} className="text-primary" />
                <span className="text-sm">PayWave/Tap to Pay</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Banknote" size={16} className="text-primary" />
                <span className="text-sm">Cash</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Building" size={16} className="text-primary" />
                <span className="text-sm">Bank Transfer</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-medium text-foreground mb-3">Payment Schedule</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div>• Small jobs: Payment on completion</div>
              <div>• Medium jobs: 50% deposit, 50% on completion</div>
              <div>• Large jobs: Progressive payments as agreed</div>
              <div>• Emergency jobs: Payment on completion</div>
            </div>
          </div>
        </div>
      </div>
      {/* Warranty & Guarantees */}
      <div className="bg-green-50 border border-green-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <Icon name="Shield" size={24} className="text-green-600 mt-0.5" />
          <div>
            <h3 className="text-lg font-semibold text-green-900 mb-2">Warranty & Guarantees</h3>
            <div className="text-sm text-green-800 space-y-2">
              <div>• 12-month warranty on all workmanship</div>
              <div>• Manufacturer warranty on all parts and materials</div>
              <div>• 24/7 emergency callback service</div>
              <div>• Satisfaction guaranteed or money back</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PricingGuide;