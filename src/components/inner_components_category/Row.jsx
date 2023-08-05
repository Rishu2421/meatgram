import React from 'react';
import { ImageText } from './ImageText';

export function Row() {
  return (
    <div className="row">
      <div className="col-md-4">
        <ImageText />
      </div>
      <div className="col-md-4">
        <ImageText />
      </div>
      <div className="col-md-4">
        <ImageText />
      </div>
    </div>
  );
}
