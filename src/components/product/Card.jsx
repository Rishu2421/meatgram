import React from 'react';
import AddToCartButton from './AddToCartButton/AddToCartButton';
function Card({ product }) {
  const { name, image, quantity, numOfPieces, description, mrp } = product;

  return (
    <div className="box">
      <div className="image-text">
        <a href={`/products?ids=${product._id}`}>
          <div className="image">
            <img
              className="card-image"
              src={`http://localhost:3000/${image}`}
              style={{ width: '25rem', height: '18rem', borderRadius: '15px' }}
              alt={name}
            />
          </div>
        </a>
        <div className="text">
          <h5>{name} - Pack Of {numOfPieces}</h5>
          <p>{description}</p>
          <h6 className="d-inline me-4">Pieces {numOfPieces}</h6> 
          <h6 className="d-inline">Quantity {quantity}</h6>
          <div className="button-text">
            <span className="mrp-text">MRP: <i className="fa fa-inr" aria-hidden="true"></i>{mrp}</span>
          
            <AddToCartButton product={product} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;

