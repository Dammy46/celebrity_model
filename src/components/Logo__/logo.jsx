import React from 'react';
import Tilt from 'react-tilt';
import UI from './UI.png';
import './logo.css';

const Logo = () => {
  return (
    <div className="ma4 mt0 logo">
      <Tilt
        className="Tilt br2 shadow-2"
        options={{ max: 55 }}
        style={{ height: 150, width: 150 }}
      >
        <div className="Tilt-inner pa3">
          <img
            style={{ paddingTop: '5px', width: '100px' }}
            alt="logo"
            src={UI}
          />
        </div>
      </Tilt>
    </div>
  );
};

export default Logo;
