import React from 'react';
import Icon from '../../../components/AppIcon';
import { cn } from '../../../utils/cn';

const ReviewSection = ({ reviews }) => {
  const averageRating = reviews?.reduce((sum, review) => sum + review?.rating, 0) / reviews?.length;
  
  const ratingDistribution = [5, 4, 3, 2, 1]?.map(rating => ({
    rating,
    count: reviews?.filter(r => r?.rating === rating)?.length,
    percentage: (reviews?.filter(r => r?.rating === rating)?.length / reviews?.length) * 100
  }));

  const formatDate = (dateString) => {
    // Simple date formatting - in real app would use date-fns
    return dateString;
  };

  return (
    <div className="space-y-6">
      {/* Review Summary */}
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Overall Rating */}
          <div className="text-center">
            <div className="text-5xl font-bold text-primary mb-2">{averageRating?.toFixed(1)}</div>
            <div className="flex items-center justify-center gap-1 mb-2">
              {[...Array(5)]?.map((_, i) => (
                <Icon 
                  key={i} 
                  name="Star" 
                  size={20} 
                  className={cn(
                    "fill-current",
                    i < Math.floor(averageRating) ? "text-yellow-500" : "text-muted-foreground"
                  )}
                />
              ))}
            </div>
            <div className="text-muted-foreground">
              Based on {reviews?.length} reviews
            </div>
          </div>

          {/* Rating Distribution */}
          <div>
            <h3 className="font-semibold text-foreground mb-4">Rating Breakdown</h3>
            <div className="space-y-2">
              {ratingDistribution?.map((item) => (
                <div key={item?.rating} className="flex items-center gap-3">
                  <div className="flex items-center gap-1 w-12">
                    <span className="text-sm">{item?.rating}</span>
                    <Icon name="Star" size={12} className="text-yellow-500 fill-current" />
                  </div>
                  <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary rounded-full transition-all"
                      style={{ width: `${item?.percentage}%` }}
                    />
                  </div>
                  <span className="text-sm text-muted-foreground w-8">{item?.count}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Customer Reviews</h2>
        {reviews?.map((review) => (
          <div key={review?.id} className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-start gap-4">
              <img 
                src={review?.avatar} 
                alt={review?.customerName}
                className="w-12 h-12 rounded-full object-cover"
              />
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <h4 className="font-semibold text-foreground">{review?.customerName}</h4>
                  {review?.verified && (
                    <span className="inline-flex items-center gap-1 px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                      <Icon name="Shield" size={12} />
                      Verified
                    </span>
                  )}
                  <span className="text-sm text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{formatDate(review?.date)}</span>
                </div>
                
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center gap-1">
                    {[...Array(5)]?.map((_, i) => (
                      <Icon 
                        key={i} 
                        name="Star" 
                        size={14} 
                        className={cn(
                          "fill-current",
                          i < review?.rating ? "text-yellow-500" : "text-muted-foreground"
                        )}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-foreground">{review?.jobType}</span>
                </div>
                
                <p className="text-muted-foreground leading-relaxed">{review?.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewSection;