import React from 'react';
import './TheWay.css';

function TheWay() {
  return (
    <section className="Theway">
      <div className="container">
        <div className="title">
          <h3><b>The</b> Meat Gram <b>way</b></h3>
        </div>
        <div className="row">
          <div className="col-md-4">
            <div className="image">
              <img src="/images/Rectangle 99.png" alt="1" />
            </div>
            <div className="text">
              <p>Premium produce, sourced directly from the origin</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="image">
              <img src="/images/Rectangle 99.png" alt="2" />
            </div>
            <div className="text">
              <p>Scientifically designed central production Unit</p>
            </div>
          </div>
          <div className="col-md-4">
            <div className="image">
              <img src="/images/Rectangle 99.png" alt="3" />
            </div>
            <div className="text">
              <p>Compliance to stringent quality checks</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default TheWay;
