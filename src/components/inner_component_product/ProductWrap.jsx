import React from 'react';

function ProductWrap() {
  return (
    <section className="product-wrap">
      <div className="container">
        <div className="row">
          <div className="col-md-6">
            <div className="images">
              <img src="images/Rectangle 86.png" alt="Product" />
            </div>
          </div>
          <div className="col-md-6">
            <div className="text-wrap">
              <h3>Chicken Boneless - Mini Bites</h3>
              <div className="list-info">
                <ul>
                  <li>
                    <a href="#">Boneless</a>
                  </li>
                  <li>
                    <a href="#">|</a>
                  </li>
                  <li>
                    <a href="#">Bite size pieces</a>
                  </li>
                </ul>
              </div>
              <p>
                Keep your chopping board aside, we've got the perfect cut of
                chicken for Chicken Popcorn, Garlic Chicken Bites, Chicken
                Nuggets and more!
              </p>
              <p>
                Licious chickens are raised on biosecure farms and are
                antibiotic-residue free. They are cut and cleaned by experts so
                you can cook them straight off the pack. Our chicken is stored
                in temperature-controlled conditions, between 0-4?, to ensure
                that it is chilled, never frozen. Order Licious Chicken Mini
                Bites (Boneless) online and get it home delivered.
              </p>
              <div className="box-wrap">
                <div className="first-div">
                  <div className="list1">
                    <a href="#">
                      <img src="images/Rectangle 89.png" alt="Pieces" />
                      No. of Pieces 30-32
                    </a>
                  </div>
                  <div className="list1">
                    <a href="#">
                      <img src="images/Rectangle 89.png" alt="Serves" />
                      Serves 4
                    </a>
                  </div>
                </div>
                <div className="second-div">
                  <div className="list">
                    <a href="#">
                      <img src="images/Rectangle 91.png" alt="Weight" />
                      250 gm
                    </a>
                  </div>
                </div>
              </div>
              <div className="cart-menu">
                <div className="list">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="fa fa-inr" aria-hidden="true"></i>161
                      </a>
                    </li>
                    <li>
                      <a href="#">
                        <del>MRP 189</del>
                      </a>
                    </li>
                    <li>
                      <a href="#">15 % OFF</a>
                    </li>
                    <li>
                      <a href="#">
                        <button>
                          <span>-</span>1 <span>+</span>
                        </button>
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="menu-button">
                <a href="#">Buy Now</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductWrap;
