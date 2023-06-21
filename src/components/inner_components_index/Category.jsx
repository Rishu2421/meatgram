import React from "react";

function Category() {
  return (
    <section className="category-wrap">
      <div className="container">
        <div className="title">
          <h2>Categories</h2>
        </div>
        <div className="category-info">
          <div className="category">
            <div className="image">
              <img src="images/Group 8.png" alt="Category 1" />
            </div>
            <div className="text">
              <h3>chicken</h3>
              <h5>
                <button>
                  <i className="fa fa-inr" aria-hidden="true"></i>280
                  </button>
              </h5>
            </div>
          </div>
          <div className="category">
            <div className="image">
              <img src="images/Group 8.png" alt="Category 2" />
            </div>
            <div className="text">
              <h3>chicken</h3>
              <h5>
              <button>
                  <i className="fa fa-inr" aria-hidden="true"></i>280
                  </button>
              </h5>
            </div>
          </div>
          {/* Add more category items here */}
        </div>
      </div>
    </section>
  );
}

export default Category;
