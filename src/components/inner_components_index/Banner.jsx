import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

function Banner() {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const images = [
    'images/BANNER IMAGE.png',
    'images/crispy-kentucky-fried-chicken-black-slate-background_123827-22525 (1) 1.png',
    // Add more image URLs as needed
  ];

  const carouselStyles = {
    
    position: 'relative',
    maxHeight: '450px', // Adjust the height as needed
    objectFit: 'cover',
    objectPosition: 'center',
    // margin: '0',s
    margin: '-9px auto',
    
    padding: '0'
  };

  const indicatorStyles = {
    backgroundColor: '#bbb',
    border: 'none',
    width: '12px',
    height: '12px',
    margin: '0 5px',
    borderRadius: '50%',
    cursor: 'pointer',
    transition: 'background-color 0.3s ease-in-out',
  };

  const selectedIndicatorStyles = {
    ...indicatorStyles,
    backgroundColor: '#333',
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 5000); // Change image every 5 seconds

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <section className="banner">
      <div id="owl-carousel" className="slider">
      {/* <div class="owl-carousel owl-theme">  */}
        <Carousel
          selectedItem={currentImageIndex}
          showStatus={false}
          showThumbs={false}
          autoPlay
          interval={5000}
          infiniteLoop
          stopOnHover={false}
          onChange={(index) => setCurrentImageIndex(index)}
          renderIndicator={(clickHandler, isSelected, index, label) => (
            <button
              type="button"
              style={isSelected ? selectedIndicatorStyles : indicatorStyles}
              onClick={clickHandler}
              key={index}
              aria-label={`${label} ${index + 1}`}
              title={`${label} ${index + 1}`}
            />
          )}
        >
          {images.map((imageUrl, index) => (
            <div key={index}>
              <img src={imageUrl} className="item" alt={`Banner ${index + 1}`} style={carouselStyles} />
            </div>
          ))}
        </Carousel>
        {/* </div> */}
      </div>
    </section>
  );
}

export default Banner;
