import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PortfolioGallery = ({ portfolio }) => {
  const [selectedImage, setSelectedImage] = useState(null);

  const openLightbox = (item) => {
    setSelectedImage(item);
  };

  const closeLightbox = () => {
    setSelectedImage(null);
  };

  const nextImage = () => {
    const currentIndex = portfolio?.findIndex(item => item?.id === selectedImage?.id);
    const nextIndex = (currentIndex + 1) % portfolio?.length;
    setSelectedImage(portfolio?.[nextIndex]);
  };

  const prevImage = () => {
    const currentIndex = portfolio?.findIndex(item => item?.id === selectedImage?.id);
    const prevIndex = currentIndex === 0 ? portfolio?.length - 1 : currentIndex - 1;
    setSelectedImage(portfolio?.[prevIndex]);
  };

  return (
    <div className="space-y-6">
      <div className="bg-card border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">Recent Work</h2>
          <div className="text-sm text-muted-foreground">
            {portfolio?.length} projects completed
          </div>
        </div>

        {portfolio?.length === 0 ? (
          <div className="text-center py-12">
            <Icon name="Image" size={48} className="text-muted-foreground mx-auto mb-4" />
            <h3 className="text-lg font-medium text-foreground mb-2">No portfolio items yet</h3>
            <p className="text-muted-foreground">
              This tradie hasn't uploaded any work examples yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {portfolio?.map((item) => (
              <div 
                key={item?.id}
                className="group cursor-pointer"
                onClick={() => openLightbox(item)}
              >
                <div className="relative overflow-hidden rounded-lg border border-border">
                  <img 
                    src={item?.image} 
                    alt={item?.title}
                    className="w-full h-48 object-cover transition-transform group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-all duration-200 flex items-center justify-center">
                    <Icon 
                      name="Eye" 
                      size={24} 
                      className="text-white opacity-0 group-hover:opacity-100 transition-opacity" 
                    />
                  </div>
                </div>
                
                <div className="mt-3">
                  <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
                    {item?.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mt-1">{item?.description}</p>
                  <div className="flex items-center gap-1 mt-2">
                    <Icon name="MapPin" size={14} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{item?.location}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full">
            {/* Close Button */}
            <button
              onClick={closeLightbox}
              className="absolute top-4 right-4 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
            >
              <Icon name="X" size={20} />
            </button>

            {/* Navigation Buttons */}
            {portfolio?.length > 1 && (
              <>
                <button
                  onClick={prevImage}
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <Icon name="ChevronLeft" size={20} />
                </button>
                <button
                  onClick={nextImage}
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center text-white transition-colors"
                >
                  <Icon name="ChevronRight" size={20} />
                </button>
              </>
            )}

            {/* Image */}
            <img 
              src={selectedImage?.image} 
              alt={selectedImage?.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg"
            />

            {/* Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6">
              <h3 className="text-xl font-semibold text-white mb-2">{selectedImage?.title}</h3>
              <p className="text-white/80 mb-2">{selectedImage?.description}</p>
              <div className="flex items-center gap-2 text-white/60">
                <Icon name="MapPin" size={16} />
                <span>{selectedImage?.location}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PortfolioGallery;