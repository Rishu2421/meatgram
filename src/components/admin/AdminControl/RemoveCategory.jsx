import React from 'react';

const RemoveCategory = ({ categoryId, onDelete }) => {
    const token = localStorage.getItem('adminToken');
  const handleDelete = () => {
    // Send a request to the backend API to delete the category
    fetch(`/api/categories/${categoryId}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`, // Add your admin authentication token here
      },
    })
      .then(response => {
        if (response.status === 204) {
          // Category deleted successfully, call the onDelete callback
          onDelete(categoryId);
        } else {
          throw new Error('Failed to delete category');
        }
      })
      .catch(error => console.error('Error deleting category:', error));
  };

  return (
    <button onClick={handleDelete}>Remove</button>
  );
};

export default RemoveCategory;
