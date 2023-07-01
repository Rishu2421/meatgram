import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function ImageListWrap({categories,onCategoryChoice}) {
    const navigate = useNavigate();
    const handleCategoryClick = (categoryName) => {
        onCategoryChoice(categoryName);
        navigate(`/category/${categoryName}`);
    
      };
    
    
  return (
    <section className="image-list-wrap">
      <div className="container">
        <div className="list-img">
          <div className="text-img">
            <a href="/product/allproducts">
              <img src="images/Rectangle 18 (2).png" alt="All" />
              All
            </a>
          </div>
          {categories.map((category) => (
            <div className="text-img" key={category.id}>
              <a href="#" onClick={() => handleCategoryClick(category.name)} >
                <img src={`http://localhost:3000/${category.imageUrl}`} style={{ width: "85px", height: "85px" }}  alt={category.name} />
                {category.name}
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


// import React, { useState, useEffect } from "react";

// export function ImageListWrap() {
//     const [categories, setCategories] = useState([]);

//     useEffect(() => {
//       // Fetch categories from backend API
//       // Replace 'your-backend-api-endpoint' with your actual backend API endpoint
//       fetch('/api/categories')
//         .then(response => response.json())
//         .then(data => setCategories(data))
//         .catch(error => console.error('Error fetching categories:', error));
//     }, []);


//   return (
//     <section class="image-list-wrap">
//     <div class="container">
//     <div className="title">
//           <h2>Categories</h2>
//         </div>
//         <div class="list-img">
//             <div class="text-img">
//                 <a href="#"><img src="images/Rectangle 18 (2).png" alt='nones' />All</a>
//             </div>
//             <div class="text-img">
//                 <a href="#"><img src="images/Rectangle 19.png" alt="none"/>Curry Cuts</a>
//             </div>
//             <div class="text-img">
//                 <a href="#"><img src="images/Rectangle 20.png" alt="none"/>Combo</a>
//             </div>
//             <div class="text-img">
//                 <a href="#"><img src="images/Rectangle 22.png" alt="none"/>Boneless &  Mince</a>
//             </div>
//             <div class="text-img">
//                 <a href="#"><img src="images/Rectangle 23 (1).png" alt="none"/>Specility Cuts</a>
//             </div>
//         </div>
//     </div>
// </section>
//   );
// }
