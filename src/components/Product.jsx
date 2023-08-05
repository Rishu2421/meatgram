import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import RedBackgroundWrap from "./inner_components_category/RedBackgroundWrap";
import ProductWrap from "./inner_component_product/ProductWrap/ProductWrap";
import MinibitsWrap from "./inner_component_product/MinibitsWrap/MinibitsWrap";
import Sourcing from "./inner_component_product/Sourcing/Sourcing";
import TheWay from "./inner_component_product/TheWay/TheWay";
import Items from './product/Items'
import Banner from "./inner_components_index/Banner";
import "../styles/style.css";

function Product() {
  const location = useLocation();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");
  useEffect(() => {
    // Extract the productId from the URL
    const searchParams = new URLSearchParams(location.search);
    const productId = searchParams.get('ids');

    // Fetch the product details from the backend using the productId
    fetchProduct(productId);
  }, [location.pathname]);

  const fetchProduct = async (productId) => {
    try {
      // Make a request to the backend API to fetch the product details
      const response = await fetch(`/api/products?ids=${productId}`);
  
      const data = await response.json();
      // console.log("logging in product.jsx"+data)
      // Set the fetched product data to the state
      setProduct(data[0]);
      setLoading(false);
    } catch (error) {
      console.log("Error fetching product:", error);
      setLoading(false);
    }
  };

  

  return (
    <div>
      {/* <Banner /> */}
      <RedBackgroundWrap />
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <ProductWrap key={product._id} product={product} userId={userId}/>
          {/* <MinibitsWrap /> */}
          <Sourcing />
          <TheWay />
          <Items showAll={false} />
        </>
      )}
    </div>
  );
}

export default Product;
