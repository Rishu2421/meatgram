import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function CategoryWrap({onCategoryChoice}) {
  const [categories, setCategories] = useState([]);

  useEffect((onCategoryChoice) => {
    // Fetch categories from backend API
    // Replace 'your-backend-api-endpoint' with your actual backend API endpoint
    fetch('/api/categories')
      .then(response => response.json())
      .then(data => setCategories(data))
      .catch(error => console.error('Error fetching categories:', error));
  }, []);

  const navigate = useNavigate();
  const handleCategoryClick = (categoryName) => {
      onCategoryChoice(categoryName);
      navigate(`/category/${categoryName}`);
  
    };
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
              {/* remeber to look when deployed */}
                <img src={`http://localhost:3000/${category.imageUrl}#`} alt={category.name} />
              </div>
              <div className="text">
              <a href="#" onClick={() => handleCategoryClick(category.name)} ><h3>{category.name}</h3></a>
                <h5>
                </h5>
            </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default CategoryWrap;



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
