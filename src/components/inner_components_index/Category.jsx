import React, { useState, useEffect } from "react";

function Category() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    // Fetch categories from backend API
    // Replace 'your-backend-api-endpoint' with your actual backend API endpoint
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  console.log(categories);
  return (
    <section className="category-wrap">
      <div className="container">
        <div className="title">
          <h2>Categories</h2>
        </div>
        <div className="category-info">
          {categories.map(category => (
            <div className="category" key={category._id}>
              <div className="image">
                <img src={category.imageUrl} alt={category.name} />
              </div>
              <div className="text">
                <h3>{category.name}</h3>
                <h5>
                </h5>
                <a href={`/category/${category._id}`}>View Products</a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Category;



// import React from "react";

// function Category() {
//   return (
//     <section className="category-wrap">
//       <div className="container">
//         <div className="title">
//           <h2>Categories</h2>
//         </div>
//         <div className="category-info">
//           <div className="category">
//             <div className="image">
//               <img src="images/Group 8.png" alt="Category 1" />
//             </div>
//             <div className="text">
//               <h3>chicken</h3>
//               <h5>
//                 <button>
//                   <i className="fa fa-inr" aria-hidden="true"></i>280
//                   </button>
//               </h5>
//             </div>
//           </div>
//           <div className="category">
//             <div className="image">
//               <img src="images/Group 8.png" alt="Category 2" />
//             </div>
//             <div className="text">
//               <h3>chicken</h3>
//               <h5>
//               <button>
//                   <i className="fa fa-inr" aria-hidden="true"></i>280
//                   </button>
//               </h5>
//             </div>
//           </div>
//           {/* Add more category items here */}
//         </div>
//       </div>
//     </section>
//   );
// }

// export default Category;
