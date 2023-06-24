import React from 'react';

const RemoveItem = ({ itemId, onDelete }) => {
  const handleDelete = () => {
    // Send a request to the backend API to delete the item
    fetch(`/api/admin/items/${itemId}`, {
      method: 'DELETE',
    })
      .then(response => response.json())
      .then(data => {
        // Item deleted successfully, call the onDelete callback
        onDelete(itemId);
      })
      .catch(error => console.error('Error deleting item:', error));
  };

  return (
    <button onClick={handleDelete}>Remove</button>
  );
};

export default RemoveItem;
