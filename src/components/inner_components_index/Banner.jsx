import React, { useEffect, useState } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import axios from 'axios';

function Banner() {
  const [images, setImages] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('/api/admin/getbanner');
      setImages(response.data);
    } catch (error) {
      console.log('Failed to fetch banner images:', error);
      setImages([]);
    }
  };

  const carouselStyles = {
    position: 'relative',
    maxHeight: '450px', // Adjust the height as needed
    objectFit: 'cover',
    objectPosition: 'center',
    margin: '-9px auto',
    padding: '0',
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
  }, [images.length]);

  return (
    <section className="banner">
      <div id="owl-carousel" className="slider">
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
          {images.map((banner, index) => (
            <div key={index}>
              <img src={`http://localhost:3000/${banner.image}`} className="item" alt={`Banner ${index + 1}`} style={carouselStyles} />
            </div>
          ))}
        </Carousel>
      </div>
    </section>
  );
}

export default Banner;
