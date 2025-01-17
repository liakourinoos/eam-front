import React, { useState, useEffect, useRef } from 'react';

const SlidingImageSlideshow = () => {
  const images = [
    'https://images.pexels.com/photos/6974310/pexels-photo-6974310.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
    'https://www.ziprecruiter.com/svc/fotomat/public-ziprecruiter/cms/829365088InfantNanny.jpg=ws1280x960',
    'https://images.pexels.com/photos/755049/pexels-photo-755049.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1',
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(true);
  const slideshowRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setIsTransitioning(true);
    }, 2500);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleTransitionEnd = () => {
      if (currentIndex === images.length) {
        setIsTransitioning(false);
        setCurrentIndex(0);
      }
    };

    const slideshowElement = slideshowRef.current;
    slideshowElement.addEventListener('transitionend', handleTransitionEnd);

    return () => {
      slideshowElement.removeEventListener('transitionend', handleTransitionEnd);
    };
  }, [currentIndex, images.length]);

  return (
    <div className="relative w-full h-full overflow-hidden">
      {/* Images Container */}
      <div
        ref={slideshowRef}
        className={`flex ${isTransitioning ? 'transition-transform duration-700 ease-in-out' : ''}`}
        style={{
          transform:` translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.concat(images[0]).map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Slide ${index}`}
            className="w-full h-screen object-cover flex-shrink-0"
          />
        ))}
      </div>

      

    </div>
  );
};

export default SlidingImageSlideshow;