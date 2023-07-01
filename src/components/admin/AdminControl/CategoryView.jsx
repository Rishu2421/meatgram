import React, { useEffect, useState } from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import RemoveCategory from './RemoveCategory';

const CategoryView = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await fetch('/api/categories');
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const handleDeleteCategory = (categoryId) => {
    const updatedCategories = categories.filter(category => category._id !== categoryId);
    setCategories(updatedCategories);
  };

  return (
    <Container>
      <h2>View Categories</h2>
      <Row className="d-flex">
        {categories.map(category => (
          <Col key={category._id} sm={6} md={4} lg={3}>
            <div className="h-100">
              <Card className="mb-4 h-100">
                <div className="card-image-container">
                  <Card.Img 
                    variant="top" 
                    src={`http://localhost:3000/${category.imageUrl}`}
                    alt={category.name} 
                    className="img-fluid h-100" 
                  />
                </div>
                <Card.Body>
                  <Card.Title>{category.name}</Card.Title>
                  <RemoveCategory categoryId={category._id} onDelete={handleDeleteCategory} />
                </Card.Body>
              </Card>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default CategoryView;
