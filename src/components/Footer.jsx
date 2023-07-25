import React from "react";

function Footer() {
  return (
    <section className="footer">
      <div className="container">
        <div className="row footbottom">
          <div className="col-md-4">
            <div className="first">
              <a href="/"> <img src="/images/logo.png" alt="Logo" /> </a>
              <p>
                Pamper Your Taste Buds With This Rich And Flavourful Chicken
                Curry Recipe!
              </p>
             
            </div>
          </div>
          <div className="col-md-4">
            <div className="second">
              <h2>User link</h2>
              <ul>
                <li>
                  <a href="#">Location area wise outlet</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms &amp; conditions</a>
                </li>
                <li>
                  <a href="#">FaQs</a>
                </li>
                <li>
                  <a href="#">Customer Support</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="third">
              <h2>contact us</h2>
              <p>
              Shop No R-02 Panchwati Complex, Panchwati Colony, Lalghati, Bhopal
              </p>
              <h2>social icon</h2>
              <ul>
                <li>
                  <a href="#">
                    <i className="fa fa-instagram" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-whatsapp" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-comment" aria-hidden="true"></i>
                  </a>
                </li>
                <li>
                  <a href="#">
                    <i className="fa fa-youtube-play" aria-hidden="true"></i>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Footer;
