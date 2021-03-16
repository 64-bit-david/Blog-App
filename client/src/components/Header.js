import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../actions';

const Header = ({ fetchUser, auth }) => {

  useEffect(() => {
    fetchUser();
  }, [])


  const isLoggedIn = () => {
    if (auth) {
      return (
        <div>
          <Link to="/add-story" className=" btn sign-in-btn">Add a Story</Link>
          <Link to="/your-profile" className=" btn sign-in-btn">Your Profile</Link>
          <a href="/api/logout" className="btn sign-in-btn">Log Out</a>
        </div>
      );
    }
    return (
      <a className="btn sign-in-btn" href="/auth/google">Log In With Google</a>
    )
  }


  return (
    <nav>
      <div className="header">
        <div className="header-left">
          <Link to="/"><h2>Writer's Desk</h2></Link>
        </div>
        <div className="header-right">
          {isLoggedIn()}

        </div>


      </div>
    </nav>
  )
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { fetchUser })(Header)
