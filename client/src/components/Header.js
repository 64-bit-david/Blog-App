import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchUser } from '../actions';

const Header = ({ fetchUser, auth }) => {

  useEffect(() => {
    fetchUser();
  }, [])


  const isLoggedIn = () => {
    if (auth) {
      return (
        <button className="btn sign-in-btn">Log Out</button>
      );
    }
    return (
      <a href="/auth/google">Log In With Google</a>
    )
  }


  return (
    <div className="header">
      <div className="header-left">
        <h2>Writer's Desk</h2>
      </div>
      <div className="header-right">
        {isLoggedIn()}
      </div>

    </div>
  )
}

const mapStateToProps = ({ auth }) => {
  return { auth }
}

export default connect(mapStateToProps, { fetchUser })(Header)
