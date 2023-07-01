import React from 'react';
import './BoxWrap.css';

const BoxWrap = ({ numOfPieces, quantity }) => {
  return (
    <div className="box-wrap">
      <div className="first-div">
        <div className="list1">
        <span>
            <img src="/images/Rectangle 89.png" alt="Pieces" />
            No. of Pieces {numOfPieces}
          </span>
        </div>
        <div className="list1">
        <span>
            <img src="/images/Rectangle 89.png" alt="Serves" />
            Serves 4
          </span>
        </div>
      </div>
      <div className="second-div">
        <div className="list">
        <span>
            <img src="/images/Rectangle 91.png" alt="Weight" />
            {quantity}
          </span>
        </div>
      </div>
    </div>
  );
};

export default BoxWrap;
