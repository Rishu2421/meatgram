import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from './Card';

function Items({ showAll, category,hideTitle }) {
  const [products, setProducts] = useState([]);
  const [categoryName,setCategoryName]=useState("");


  useEffect(() => {
    fetchProducts();
  }, [category]);

  const fetchProducts = async () => {
    try {
      let response;
      if (category) {
        response = await axios.get(`/api/categories/${category}`);
        setCategoryName(category)
      } else {
        response = await axios.get('/api/products/allproducts');
      }
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getRandomCards = (array, count) => {
    if (!Array.isArray(array)) {
      return []; // or throw an error, depending on your requirement
    }
  
    const shuffledArray = [...array].sort(() => 0.5 - Math.random());
    return shuffledArray.slice(0, count);
  };

  const renderProducts = () => {
    if (showAll) {
      return products || []; // Return products array or an empty array if it is not defined yet
    } else {
      const randomCards = getRandomCards(products, 3);
      return randomCards || []; // Return randomCards array or an empty array if it is not defined yet
    }
  };

  const getTitle = () => {
    if (showAll || category) {
      return category ? `${category}` : 'All Products';
    } else {
      return 'You may also like';
    }
  };
  return (
    <div>
      <section className="category-info-text">
        <div className="container">
        {hideTitle || 
          <div className="title">
          <h2>{getTitle()}</h2>
          </div>
        }
          <div className="info-text">
          {Array.isArray(renderProducts()) ? (
  renderProducts().map((product) => (
    <Card key={product._id} product={product} />
  ))
) : (
  <p>No products to display.</p>
)}  
          </div>
        </div>
      </section>
    </div>
  );
}

export default Items;
