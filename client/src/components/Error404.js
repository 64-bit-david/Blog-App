import React from 'react';
import { Link } from 'react-router-dom';

const Error404 = () => {
  return (
    <div className="err-pg-not-found">
      <div className="header-container">
        <h1>Error 404: Page not found..</h1>
        <div >
          <Link to="/" className="btn green-btn">Take me home</Link>
        </div>
      </div>
    </div>
  )
}

export default Error404
