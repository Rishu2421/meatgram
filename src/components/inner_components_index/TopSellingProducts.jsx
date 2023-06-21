// import React from "react";

// function TopSellingProducts() {
//   return (
//     <section className="category-wrap selling-product">
//       <div className="container">
//         <div className="title">
//           <h2>Top selling products</h2>
//         </div>
//         <div className="row">
//           <div className="col-md-3">
//             <div className="image">
//               <img src="images/Rectangle 46.png" alt="Product 1" />
//             </div>
//             <div className="text">
//               <h3>Chicken breast boneless</h3>
//             </div>
//           </div>
//           <div className="col-md-3">
//             <div className="image">
//               <img src="images/Rectangle 47.png" alt="Product 2" />
//             </div>
//             <div className="text">
//               <h3>Chicken momos</h3>
//             </div>
//           </div>
//           <div className="col-md-3">
//             <div className="image">
//               <img src="images/Rectangle 48.png" alt="Product 3" />
//             </div>
//             <div className="text">
//               <h3>Chicken seekh kebab</h3>
//             </div>
//           </div>
//           <div className="col-md-3">
//             <div className="image">
//               <img src="images/Rectangle 49.png" alt="Product 4" />
//             </div>
//             <div className="text">
//               <h3>Chicken smoked sousage</h3>
//             </div>
//           </div>
//         </div>
//         <div className="row second-row">
//           <div className="col-md-3">
//             <div className="image">
//               <img src="images/Rectangle 50.png" alt="Product 5" />
//             </div>
//             <div className="text">
//               <h3>Mutton curry cut</h3>
//             </div>
//           </div>
//           <div className="col-md-3">
//             <div className="image">
//               <img src="images/Rectangle 51.png" alt="Product 6" />
//             </div>
//             <div className="text">
//               <h3>Mutton curry cut (shoulder)</h3>
//             </div>
//           </div>
//           <div className="col-md-3">
//             <div className="image">
//               <img src="images/Rectangle 52.png" alt="Product 7" />
//             </div>
//             <div className="text">
//               <h3>Mutton keema</h3>
//             </div>
//           </div>
//           <div className="col-md-3">
//             <div className="image">
//               <img src="images/Rectangle 53.png" alt="Product 8" />
//             </div>
//             <div className="text">
//               <h3>Mutton seekh kebab</h3>
//             </div>
//           </div>
//         </div>
//       </div>
//     </section>
//   );
// }

// export default TopSellingProducts;

import React from "react";

function TopSellingProducts({ products }) {
  return (
    <section className="category-wrap selling-product">
      <div className="container">
        <div className="title">
          <h2>Top selling products</h2>
        </div>
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-3" key={index}>
              <div className="image">
                <img src={product.image} alt={`Product ${index + 1}`} />
              </div>
              <div className="text">
                <h3>{product.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TopSellingProducts;
