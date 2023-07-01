import React from 'react';
import Items from '../product/Items'
const ChickenProductComponent = () => {
  return (
    <section className="bg-text-wrap">
      <div className="container">
        <div className="row" style={{ textAlign: 'center' }}>
        <Items showAll={false} hideTitle={true} />
        </div>
      </div>
    </section> 
  );
}

export default ChickenProductComponent;
