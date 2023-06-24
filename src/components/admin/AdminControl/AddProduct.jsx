import React, { useState } from 'react';
import axios from 'axios';

const AddProduct = () => {
  const [product, setProduct] = useState({
    name: '',
    price: '',
    image: null,
    quantity: '',
    numOfPieces: '',
    description: '',
    mrp: '',
    discount: '',
    category: '',
    isTopSelling: false,
    isBoneless: false,
  });

  const handleInputChange = (e) => {
    setProduct({ ...product, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    setProduct({ ...product, image: e.target.files[0] });
  };

  const handleQuantityChange = (e) => {
    setProduct({ ...product, quantity: e.target.value });
  };
  const handleSubmit = async (e) => {
    
    e.preventDefault();
    try {
      const token = localStorage.getItem('adminToken');
      const formData = new FormData();

      formData.append('name', product.name);
      formData.append('price', product.price);
      formData.append('image', product.image);
      formData.append('quantity', product.quantity);
      formData.append('numOfPieces', product.numOfPieces);
      formData.append('description', product.description);
      formData.append('mrp', product.mrp);
      formData.append('discount', product.discount);
      formData.append('category', product.category);
      formData.append('isTopSelling', product.isTopSelling);
      formData.append('isBoneless', product.isBoneless);
      // Send the product data to the backend API
      const response = await axios.post('/api/admin/addproduct', formData, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log(response.data); // Handle the response as needed

      // Reset the form
      setProduct({
        name: '',
        price: '',
        image: null,
        quantity: '',
        numOfPieces: '',
        description: '',
        mrp: '',
        discount: '',
        category: '',
        isTopSelling: false,
        isBoneless: false,
      });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="container">
      <h2>Add Product</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="productName" className="form-label">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={product.name}
            onChange={handleInputChange}
            className="form-control"
            id="productName"
            placeholder="Product Name"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productPrice" className="form-label">
            Price (Discounted)
          </label>
          <input
            type="number"
            name="price"
            value={product.price}
            onChange={handleInputChange}
            className="form-control"
            id="productPrice"
            placeholder="Price"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productImage" className="form-label">
            Product Image
          </label>
          <input
            type="file"
            accept="image/jpeg"
            name="image"
            onChange={handleImageUpload}
            className="form-control"
            id="productImage"
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Quantity</label>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="quantity"
              value="0.5kg"
              checked={product.quantity === '0.5kg'}
              onChange={handleQuantityChange}
              id="quantityHalf"
              required
            />
            <label className="form-check-label" htmlFor="quantityHalf">
              0.5 kg
            </label>
          </div>
          <div className="form-check">
            <input
              className="form-check-input"
              type="radio"
              name="quantity"
              value="1kg"
              checked={product.quantity === '1kg'}
              onChange={handleQuantityChange}
              id="quantityOne"
              required
            />
            <label className="form-check-label" htmlFor="quantityOne">
              1 kg
            </label>
          </div>
        </div>

        <div className="mb-3">
          <label htmlFor="numOfPieces" className="form-label">
            Number of Pieces
          </label>
          <input
            type="number"
            name="numOfPieces"
            value={product.numOfPieces}
            onChange={handleInputChange}
            className="form-control"
            id="numOfPieces"
            placeholder="Number of Pieces"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productDescription" className="form-label">
            Description
          </label>
          <textarea
            name="description"
            value={product.description}
            onChange={handleInputChange}
            className="form-control"
            id="productDescription"
            placeholder="Description"
            required
          ></textarea>
        </div>

        <div className="mb-3">
          <label htmlFor="productMrp" className="form-label">
            MRP
          </label>
          <input
            type="number"
            name="mrp"
            value={product.mrp}
            onChange={handleInputChange}
            className="form-control"
            id="productMrp"
            placeholder="MRP"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productDiscount" className="form-label">
            Discount
          </label>
          <input
            type="number"
            name="discount"
            value={product.discount}
            onChange={handleInputChange}
            className="form-control"
            id="productDiscount"
            placeholder="Discount"
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="productCategory" className="form-label">
            Category
          </label>
          <input
            type="text"
            name="category"
            value={product.category}
            onChange={handleInputChange}
            className="form-control"
            id="productCategory"
            placeholder="Category"
            required
          />
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isTopSelling"
            name="isTopSelling"
            checked={product.isTopSelling}
            onChange={(e) => setProduct({ ...product, isTopSelling: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="isTopSelling">
            Top Selling
          </label>
        </div>

        <div className="mb-3 form-check">
          <input
            type="checkbox"
            className="form-check-input"
            id="isBoneless"
            name="isBoneless"
            checked={product.isBoneless}
            onChange={(e) => setProduct({ ...product, isBoneless: e.target.checked })}
          />
          <label className="form-check-label" htmlFor="isBoneless">
            Boneless
          </label>
        </div>


        <button type="submit" className="btn btn-primary">
          Add Product
        </button>
      </form>
    </div>
  );
};

export default AddProduct;
