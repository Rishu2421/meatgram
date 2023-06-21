import React from 'react';

const CategoryInfoTextComponent = () => {
  return (
    <section className="category-info-text">
      <div className="container">
        <div className="info-text">
          <div className="box">
            <div className="image-text">
              <div className="image">
                <img src="images/Rectangle 78 (1).png" alt="Chicken Drumstick - Pack Of 6" />
              </div>
              <div className="text">
                <h5>Chicken Drumstick - Pack Of 6</h5>
                <p>Juicy, meaty pieces by a dedicated team of Nakhrebaaz</p>
                <h6>Pices 6</h6>
                <div className="button-text">
                  <div className="text">
                    <span>MRP :<a href="#"><i className="fa fa-inr" aria-hidden="true"></i>265</a></span>
                  </div>
                  <div className="button">
                    <a href="#">ADD TO CART</a>
                  </div>
                </div>
                <div className="dilivary-text">
                  <a href="#"><img src="images/express_delivery 2.png" alt="Express Delivery" />Tomorrow 6 AM - 8 AM</a>
                </div>
              </div>
            </div>
          </div>
          <div className="box">
            <div className="image-text">
              <div className="image">
                <img src="images/Rectangle 78.png" alt="Chicken Drumstick - Pack Of 6" />
              </div>
              <div className="text">
                <h5>Chicken Drumstick - Pack Of 6</h5>
                <p>Juicy, meaty pieces by a dedicated team of Nakhrebaaz</p>
                <h6>Pices 6</h6>
                <div className="button-text">
                  <div className="text">
                    <span>MRP :<a href="#"><i className="fa fa-inr" aria-hidden="true"></i>265</a></span>
                  </div>
                  <div className="button">
                    <a href="#">ADD TO CART</a>
                  </div>
                </div>
                <div className="dilivary-text">
                  <a href="#"><img src="images/express_delivery 2.png" alt="Express Delivery" />Tomorrow 6 AM - 8 AM</a>
                </div>
              </div>
            </div>
          </div>
          {/* Add more box components here */}
        </div>
      </div>
    </section>
  );
}

export default CategoryInfoTextComponent;
