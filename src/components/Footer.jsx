import React from "react";

function Footer() {
  return (
    <section className="footer">
      <div className="container">
        <div className="row footbottom">
          <div className="col-md-4">
            <div className="first">
              <img src="/images/logo.png" alt="Logo" />
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
                  <a href="#">refer and earn</a>
                </li>
                <li>
                  <a href="#">about us</a>
                </li>
                <li>
                  <a href="#">our blog</a>
                </li>
                <li>
                  <a href="#">meat gram cash & cash+</a>
                </li>
                <li>
                  <a href="#">refer & earn</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="third">
              <h2>contact us</h2>
              <p>
                Pamper Your Taste Buds With This Rich And Flavourful Chicken!
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
