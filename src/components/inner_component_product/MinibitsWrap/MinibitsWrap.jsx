import React from 'react';
import './MinibitsWrap.css';

function MinibitsWrap() {
  return (
    <section className="minibits-wrap">
      <div className="container">
        <div className="title">
          <h3>Frequently bought with Chicken Boneless - Mini Bites</h3>
        </div>
        <div className="row">
          <div className="col-md-6">
            <div className="image-text-box">
              <div className="image">
                <img src="/images/Rectangle 93.png" alt="Product" />
              </div>
              <div className="text">
                <h5>Fish Tikka (Mini) | Ready to Cook</h5>
                <p>175 gms</p>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="image-text-box">
              <div className="image">
                <img src="/images/Rectangle 93.png" alt="Product" />
              </div>
              <div className="text">
                <h5>Egg | Ready to cook</h5>
                <p>100 gms</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default MinibitsWrap;
