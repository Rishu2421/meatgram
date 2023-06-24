import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';

const AddCategory = () => {
  const [name, setName] = useState('');
  const [image, setImage] = useState(null);
  const token = localStorage.getItem('adminToken');
  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('image', image);

    
    try {
      const requestOptions = {
        method: 'POST',
        body: formData,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await fetch('/api/admin/add-category', requestOptions);

      if (response.ok) {
        // Category added successfully
        // Reset form fields
        setName('');
        setImage(null);
        alert('Category added successfully!');
      } else {
        // Error occurred while adding the category
        const error = await response.json();
        throw new Error(error.error);
      }
    } catch (error) {
      console.error('Error adding category:', error);
      alert('Failed to add category. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Add Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter category name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </Form.Group>

        <Form.Group>
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="file"
            onChange={handleImageChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Add Category
        </Button>
      </Form>
    </div>
  );
};

export default AddCategory;
