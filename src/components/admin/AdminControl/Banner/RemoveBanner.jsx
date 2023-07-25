import React, { useState } from 'react';
import axios from 'axios';
import { Button, Alert } from 'react-bootstrap';

const RemoveBanner = ({ bannerId, onDelete }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleRemoveBanner = async () => {
    setLoading(true);
    setError('');

    try {
        const token = localStorage.getItem('adminToken');
        const data={
        headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        }
      await axios.delete(`/api/admin/removebanner/${bannerId}`,data);
      onDelete(bannerId);
    } catch (error) {
      setError('Failed to remove banner.');
    }

    setLoading(false);
  };

  return (
    <div>
      {loading ? (
        <Button variant="danger" disabled>
          Removing...
        </Button>
      ) : (
        <Button variant="danger" onClick={handleRemoveBanner}>
          Remove
        </Button>
      )}
      {error && <Alert variant="danger">{error}</Alert>}
    </div>
  );
};

export default RemoveBanner;
