import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Container, Row, Col } from 'react-bootstrap';
import RemoveBanner from './RemoveBanner';

function ViewBanner() {
  const [banners, setBanners] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetchBanners();
  }, []);

  const fetchBanners = async () => {
    try {
      const response = await axios.get('/api/admin/getbanner');
      setBanners(response.data);
    } catch (error) {
      console.log('Failed to fetch banners:', error);
      setBanners([]);
    }
  };
const handleRemoveBanner = (bannerId) => {
    const updatedBanners = banners.filter((banner) => banner._id !== bannerId);
    setBanners(updatedBanners);
    setMessage('Banner removed successfully.');
  };

  return (
    <div>

<Container>
      
      <h1>Banner</h1>
      {Array.isArray(banners) && banners.length > 0 ? (
        <Row className="d-flex">
        {banners.map(banner => (
          <Col key={banner._id} sm={6} md={4} lg={3}>
            <div className="h-100">
              <Card className="mb-4 h-100">
                <div className="card-image-container">
                  <Card.Img 
                    variant="top" 
                    src={`http://localhost:3000/${banner.image}`}
                     alt={banner.altText} 
                    className="img-fluid h-100" 
                  />
                </div>
                <Card.Body>
                  <RemoveBanner bannerId={banner._id} onDelete={handleRemoveBanner} />
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
      ) : (
        <p>No banners available.</p>
      )}
      {message && <p>{message}</p>}
    
      </Container>
    </div>

  );
}

export default ViewBanner;
