import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import RemoveItem from './RemoveItem';
import './control.css'
const ViewProducts = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch products from backend API
    // Replace 'your-backend-api-endpoint' with your actual backend API endpoint
    fetch('/api/products')
      .then(response => response.json())
      .then(data => setProducts(data))
      .catch(error => console.error('Error fetching products:', error));
  }, []);

  const appendTimestamp = (url) => {
    const timestamp = Date.now();
    return url + `?timestamp=${timestamp}`;
  };

  const handleDeleteItem = (itemId) => {
    // Remove the deleted item from the products list
    const updatedProducts = products.filter(product => product._id !== itemId);
    setProducts(updatedProducts);
  };

  return (
    <Container>
      <h2>View Products</h2>
      <Row className="d-flex">
        {products.map(product => (
          <Col key={product._id} sm={6} md={4} lg={3}>
            <div className="h-100">
              <Card className="mb-4 h-100">
                <div className="card-image-container">
                  <Card.Img
                    variant="top"
                    src={appendTimestamp(product.image)}
                    alt={product.name}
                    className="img-fluid h-100"
                  />
                </div>
                <Card.Body>
                  <Card.Title>{product.name}</Card.Title>
                  <Card.Text>{product.description}</Card.Text>
                  <Card.Text>Price: {product.price}</Card.Text>
                  <div className="additional-info">
                    <p>Top Selling: {product.isTopSelling ? 'Yes' : 'No'}</p>
                    <p>Boneless: {product.isBoneless ? 'Yes' : 'No'}</p>
                    <p>Category: {product.category}</p>
                  </div>
                  <RemoveItem itemId={product._id} onDelete={handleDeleteItem} />
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default ViewProducts;
