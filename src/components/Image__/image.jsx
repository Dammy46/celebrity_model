import React from 'react';
import './image.css';

const Image = ({ imageUrl, box }) => {
  const financial = (x) => {
    let vl = parseFloat(x).toFixed(2);
    if (isNaN(x)) {
      console.log();
    } else {
      return vl;
    }
  };
  return (
    <div className="model ma">
      <div className="absolute mt2">
        <img id="inputImg" alt="" src={imageUrl} width="500px" heigh="auto" />
        <div
          className="bounding-box"
          style={{
            top: box.topRow,
            right: box.rightCol,
            bottom: box.bottomRow,
            left: box.leftCol,
          }}
        >
          <div className="bounding-box-concepts">
            <div className="bounding__concept" title={box.concept__name}>
              <div className="concept__name">{box.concept__name}</div>
              <div className="concept__value">
                {financial(box.concept__value)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image;
