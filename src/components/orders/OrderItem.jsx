import React from 'react';

const OrderItem = ({ orderDate, orderNumber, totalAmount, products }) => {
  return (
    <div className="order-container align-items-center justify-content-center">
  <div className="order" style={{ backgroundColor: "#c6bec114", borderRadius: "15px", padding: "20px" }}>
        {/* <h3>Order placed on <time dateTime="2021-01-22">{orderDate}</time></h3> */}
        <div className="order-details" >

         <dl className="row justify-content-center align-items-center h-100" style={{ backgroundColor: "#c6bec114",width:"75%" }}>
            <div className="col-sm-4">
                  <dt>Date placed:</dt>
            <dd><time dateTime="2021-01-22">{orderDate}</time></dd>
            </div>
            <div className="col-sm-4">
            <dt>Order number:</dt>
            <dd>{orderNumber}</dd>
            </div>
            <div className="col-sm-4">
            <dt>Total amount:</dt>
            <dd>{totalAmount}</dd>
            </div>
        </dl>
          <table className="table">
            <caption>Products</caption>
            <thead>
              <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
                <th scope="col">Status</th>
                <th scope="col">Info</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product, index) => (
                <tr key={index}>
                  <td>
                    <div className="product-image">
                      <img src={product.imageUrl} alt={product.productName} className="img-fluid" style={{width:"10rem"}} />
                    </div>
                    <div className="product-details">
                      <div className="product-name">{product.productName}</div>
                      <div className="product-price">{product.price}</div>
                    </div>
                  </td>
                  <td>{product.price}</td>
                  <td>{product.status}</td>
                  <td>
                    <a href={`/product`} className="btn btn-primary">
                      View Product
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
