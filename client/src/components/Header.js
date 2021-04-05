import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchUser } from '../actions';

const Header = ({ fetchUser, auth }) => {

  const [dropDown, setDropDown] = useState(false);

  useEffect(() => {
    fetchUser();
  }, [fetchUser])




  const isLoggedIn = () => {
    if (!auth) {
      return (
        <div className={`google-btn ${dropDown && 'active'}`}>
          <a google-btn-link href="/auth/google">
            <div className="google-icon-wrapper">
              <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" />
            </div>
            <p className="google-btn-text">
              Sign In With Google
          </p>
          </a>

        </div>
      )
    }
    return (
      <div>
        <div className={`header-right-menu ${dropDown && 'active'}`}>

          <Link
            to="/add-story"
            className=" btn dd-btn"
            onClick={() => setDropDown(false)}>
            Add a Story
           </Link>
          <Link
            to={`/your-profile`}
            className=" btn dd-btn"
            onClick={() => setDropDown(false)}>
            Your Profile
            </Link>
          <a href="/api/logout"
            className="btn dd-btn"
            onClick={() => setDropDown(false)}>
            Log Out
            </a>
        </div>
        <div className={`burger ${dropDown && 'active'}`}>
          <button
            onClick={() => setDropDown(!dropDown)}
            className="burger-btn"
          >
            <div className="burger-line"></div>
            <div className="burger-line"></div>
            <div className="burger-line"></div>

          </button>
        </div>
      </div>
    );

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
