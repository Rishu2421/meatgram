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



// import React from 'react';

// function Card({ product }) {
//   const { name, image, quantity, numOfPieces, description, mrp , } = product;
  
//   const addToCart = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const userId = localStorage.getItem("userId");
//       const response = await fetch("/api/cart/addItem", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           userId: userId, // Pass the userId prop
//           itemId: product._id,
//           quantity: 1,
//         }),
//       });

//       if (response.ok) {
//         // Item successfully added to the cart
//         // Perform any additional actions or show a success message
//         console.log('Item added to the cart');
//       } else {
//         // Handle error response
//         console.log('Failed to add item to the cart');
//       }
//     } catch (error) {
//       console.log('Error adding item to the cart:', error);
//     }
//   };

//   return (

//         <div className="box">
//             <div className="image-text">
//             <a href={`/products?ids=${product._id}`}>
//               <div className="image">
//               <img
//         className="card-image"
//         src={`http://localhost:3000/${image}`}
//         style={{ width: '25rem', height: '18rem', borderRadius: '15px' }}
//         alt={name}
//       />
//               </div>
//               </a>
//               <div className="text">
//                 <h5>{name} - Pack Of {numOfPieces}</h5>
//                 <p>{description}</p>
//                 <h6 className="d-inline me-4">Pices {numOfPieces}</h6> 
//                 <h6 className="d-inline">Quantity {quantity}</h6>
//                 {/* <div className="button-text">
                 
//                     <span>MRP :<i className="d-inline fa fa-inr" aria-hidden="true"></i>{mrp}</span>
            
//              <div className="menu-button">
//                 <button
//                 className="d-inline btn btn-danger btn-lg custom-button"
//                       onClick={addToCart}
//                     >
//                       Add to cart
//                     </button> 
                    
//                   </div>
//                 </div> */}
//                 <div className="button-text">
//   <span className="mrp-text">MRP: <i className="fa fa-inr" aria-hidden="true"></i>{mrp}</span>
//   <button
//     className="btn btn-danger btn-lg custom-button"
//     onClick={addToCart}
//   >
//     Add to cart
//   </button>
// </div>
//               </div>
//             </div>
//               </div> 



//  );
// }

// export default Card;


