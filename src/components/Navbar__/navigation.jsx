import React from 'react';

const Navigation = ({ routeChange, validate }) => {
  if (validate) {
    return (
      <nav
        style={{
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
        }}
      >
        <p
          style={{ color: 'white' }}
          onClick={() => routeChange('signout')}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign Out
        </p>
      </nav>
    );
  } else {
    return (
      <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <p
          style={{ color: 'white' }}
          onClick={() => routeChange('signin')}
          className="f3 link dim black underline pa3 pointer"
        >
          Sign In
        </p>
        <p
          style={{ color: 'white' }}
          onClick={() => routeChange('register')}
          className="f3 link dim black underline pa3 pointer"
        >
          Register
        </p>
      </nav>
    );
  }
};

export default Navigation;
