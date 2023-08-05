import React, { useState } from 'react';
import axios from 'axios';

function AddBanner() {
  const [imageFile, setImageFile] = useState(null);
  const [altText, setAltText] = useState('');
  const [message, setMessage] = useState('');

  const handleAddBanner = async (e) => {
    e.preventDefault();

    try {
      
    const token = localStorage.getItem('adminToken');
      const formData = new FormData();
      formData.append('image', imageFile);
      formData.append('altText', altText);

      const response = await axios.post('/api/admin/addbanner', formData, {
        headers: {
            Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });

      setMessage(response.data.message);
      setImageFile(null);
      setAltText('');
    } catch (error) {
      setMessage('Failed to add banner.');
    }
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0]);
  };

  return (
    <div>
      <h1>Add Banner</h1>
      <form onSubmit={handleAddBanner}>
        <div>
          <label htmlFor="image">Image:</label>
          <input type="file" id="image" onChange={handleImageChange} />
        </div>
        <div>
          <label htmlFor="altText">Alt Text:</label>
          <input type="text" id="altText" value={altText} onChange={(e) => setAltText(e.target.value)} />
        </div>
        <button type="submit">Add Banner</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
}

export default AddBanner;
